import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { LineChart } from '@/components/charts/LineChart';
import { BarChart } from '@/components/charts/BarChart';
import DonutChart from '@/components/charts/DonutChart';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { fieldTrialsApi, fieldTrialVariableApi, fieldTrialTreatmentApi, fieldTrialDataApi, fieldTrialPlotApi } from '@/lib/fieldTrialsApi';
import { fieldTrialLayoutApi } from '@/lib/fieldTrialsApi';
import * as ss from 'simple-statistics';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AnalysisPage = () => {
  const [trials, setTrials] = useState<any[]>([]);
  const [selectedTrialId, setSelectedTrialId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const trialsData = await fieldTrialsApi.getFieldTrialsPublic();
        // For each trial, fetch variables, treatments, plots, data entries, and layout
        const trialsWithDetails = await Promise.all(trialsData.map(async (trial: any) => {
          const [variables, treatments, plots, entries, layout] = await Promise.all([
            fieldTrialVariableApi.getVariables(trial.id),
            fieldTrialTreatmentApi.getTreatments(trial.id),
            fieldTrialPlotApi.getPlots(trial.id),
            fieldTrialDataApi.getData(trial.id),
            fieldTrialLayoutApi.getLayout(trial.id)
          ]);
          return {
            ...trial,
            variables,
            treatments,
            plots,
            entries,
            layout
          };
        }));
        setTrials(trialsWithDetails);
        if (trialsWithDetails.length > 0) {
          setSelectedTrialId(String(trialsWithDetails[0].id));
        }
      } catch (e: any) {
        setError(e.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const trial = trials.find(t => String(t.id) === selectedTrialId);

  // Helper: get variable name by id
  const getVariableName = (id: string) => trial?.variables.find((v: any) => v.id === id)?.name || id;
  // Helper: get treatment name by plot_id
  const getTreatmentName = (plot_id: string) => {
    const plot = trial?.plots?.find((p: any) => p.id === plot_id);
    return plot?.treatment || plot_id;
  };

  // Transform entries for analytics
  const analyticsData: Record<string, any[]> = {};
  if (trial) {
    trial.variables.forEach((variable: any) => {
      const entries = trial.entries.filter((e: any) => e.variable_id === variable.id);
      // Group by date
      const byDate: Record<string, any> = {};
      entries.forEach((e: any) => {
        if (!byDate[e.measurement_date]) byDate[e.measurement_date] = {};
        const treatment = getTreatmentName(e.plot_id);
        byDate[e.measurement_date][treatment] = Number(e.value);
      });
      // Convert to array for chart
      analyticsData[variable.name] = Object.entries(byDate).map(([date, treatments]) => ({
        date,
        ...treatments
      }));
    });
  }

  if (loading) {
    return <div className="p-8 text-gray-500">Loading...</div>;
  }
  if (error) {
    return <div className="p-8 text-red-600">{error}</div>;
  }
  if (!trial) {
    return <div className="p-8 text-gray-500">No trial selected or no data available.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <h1 className="text-3xl font-bold">Field Trials Analysis</h1>
        <div className="w-full md:w-72">
          <Select value={selectedTrialId} onValueChange={v => setSelectedTrialId(v)}>
            <SelectTrigger>
              <SelectValue placeholder="Select trial" />
            </SelectTrigger>
            <SelectContent>
              {trials.map(trial => (
                <SelectItem key={trial.id} value={String(trial.id)}>{trial.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Variables</CardTitle>
            <CardDescription>Total variables measured</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{trial.variables.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Treatments</CardTitle>
            <CardDescription>Number of treatments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{trial.treatments.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Replications</CardTitle>
            <CardDescription>Replications per treatment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {trial.layout?.replications ??
                trial.replications ??
                (trial.plots && trial.plots.length > 0 && trial.plots[0].repetition !== undefined
                  ? new Set(trial.plots.map(p => p.repetition)).size
                  : '—')}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Design</CardTitle>
            <CardDescription>Experimental design</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{trial.layout?.design_type ?? trial.designType ?? trial.design_type ?? 'Not specified'}</div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics for each variable */}
      <div className="space-y-10 mt-8">
        {trial.variables.map((variable, variableIndex) => {
          const variableData = analyticsData[variable.name] || [];
          const treatments = trial.treatments.map(t => t.name);
          // Prepare data for charts
          const lineChartData = variableData
            .slice()
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .map(row => ({
              name: row.date,
              ...treatments.reduce((acc, t) => { acc[t] = row[t]; return acc; }, {})
            }));
          const barChartData = treatments.map(treatment => {
            const values = variableData.map(row => row[treatment]).filter(v => v !== undefined && v !== null && !isNaN(v));
            let mean = values.length ? values.reduce((a, b) => a + b, 0) / values.length : null;
            if (typeof mean !== 'number' || isNaN(mean)) mean = null;
            return {
              name: treatment,
              value: mean
            };
          });
          console.log('barChartData for', variable.name, barChartData);
          
          // Different colors for each variable
          const variableColors = ['#2e7d32', '#795548', '#4caf50', '#8884d8', '#ff9800', '#e91e63', '#9c27b0', '#607d8b'];
          const barColor = variableColors[variableIndex % variableColors.length];
          
          // Prepare summary stats for each treatment
          const treatmentStats = treatments.map(treatment => {
            const values = variableData.map(row => row[treatment]).filter(v => v !== undefined && v !== null && !isNaN(v));
            return {
              treatment,
              n: values.length,
              mean: values.length ? ss.mean(values) : null,
              median: values.length ? ss.median(values) : null,
              min: values.length ? Math.min(...values) : null,
              max: values.length ? Math.max(...values) : null,
              stddev: values.length > 1 ? ss.standardDeviation(values) : null
            };
          });
          
          return (
            <Card key={variable.name} className="shadow-lg">
              <CardHeader>
                <CardTitle>{variable.name} <span className="text-base text-gray-500 font-normal">({variable.unit})</span></CardTitle>
                <CardDescription>{variable.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold mb-2">Time Series</h3>
                    <LineChart
                      data={lineChartData}
                      lines={treatments.map((t, i) => ({ dataKey: t, stroke: ['#2e7d32', '#795548', '#4caf50', '#8884d8'][i % 4], name: t }))}
                      xAxisDataKey="name"
                      height={260}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Treatment Comparison</h3>
                    <div style={{ width: '100%', height: 260 }}>
                      <ResponsiveContainer width="100%" height={260}>
                        <RechartsBarChart data={barChartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="value" fill={barColor}>
                            {
                              // Add percentage difference labels above each bar
                              barChartData.length > 1 && barChartData.map((entry, index) => {
                                if (index === 0) return null; // Reference bar, no label
                                const refValue = barChartData[0].value;
                                const diff = refValue !== 0 && refValue !== null && refValue !== undefined
                                  ? ((entry.value - refValue) / Math.abs(refValue)) * 100
                                  : 0;
                                return (
                                  <text
                                    key={entry.name + '-pct'}
                                    x={index * (400 / barChartData.length) + 60}
                                    y={40}
                                    fill="#333"
                                    fontSize={14}
                                    textAnchor="middle"
                                  >
                                    {diff >= 0 ? '+' : ''}{diff.toFixed(1)}%
                                  </text>
                                );
                              })
                            }
                          </Bar>
                        </RechartsBarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <h3 className="font-semibold mb-2">Summary Statistics</h3>
                  <div className="overflow-x-auto mb-6">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Treatment</TableHead>
                          <TableHead>n</TableHead>
                          <TableHead>Mean</TableHead>
                          <TableHead>Median</TableHead>
                          <TableHead>Min</TableHead>
                          <TableHead>Max</TableHead>
                          <TableHead>Std Dev</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {treatmentStats.map(stat => (
                          <TableRow key={stat.treatment}>
                            <TableCell>{stat.treatment}</TableCell>
                            <TableCell>{stat.n}</TableCell>
                            <TableCell>{stat.mean !== null ? stat.mean.toFixed(2) : '—'}</TableCell>
                            <TableCell>{stat.median !== null ? stat.median.toFixed(2) : '—'}</TableCell>
                            <TableCell>{stat.min !== null ? stat.min : '—'}</TableCell>
                            <TableCell>{stat.max !== null ? stat.max : '—'}</TableCell>
                            <TableCell>{stat.stddev !== null ? stat.stddev.toFixed(2) : '—'}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  <h3 className="font-semibold mb-2">Raw Data Table</h3>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          {treatments.map(t => <TableHead key={t}>{t}</TableHead>)}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {variableData.map((row, i) => (
                          <TableRow key={i}>
                            <TableCell>{row.date}</TableCell>
                            {treatments.map(t => <TableCell key={t}>{row[t]}</TableCell>)}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AnalysisPage;
