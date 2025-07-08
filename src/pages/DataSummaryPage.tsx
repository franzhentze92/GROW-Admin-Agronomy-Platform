import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Eye, BarChart } from 'lucide-react';
import { fieldTrialsApi, fieldTrialVariableApi, fieldTrialDataApi, fieldTrialPlotApi } from '@/lib/fieldTrialsApi';

const DataSummaryPage = () => {
  const [trials, setTrials] = useState<any[]>([]);
  const [selectedTrialId, setSelectedTrialId] = useState('');
  const [openVariable, setOpenVariable] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states for summary table
  const [filterDate, setFilterDate] = useState('__all__');
  const [filterPlot, setFilterPlot] = useState('__all__');
  const [filterVariable, setFilterVariable] = useState('__all__');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const trialsData = await fieldTrialsApi.getFieldTrialsPublic();
        // For each trial, fetch variables, plots, and data entries
        const trialsWithDetails = await Promise.all(trialsData.map(async (trial: any) => {
          const [variables, entries, plots] = await Promise.all([
            fieldTrialVariableApi.getVariables(trial.id),
            fieldTrialDataApi.getData(trial.id),
            fieldTrialPlotApi.getPlots(trial.id)
          ]);
          return {
            ...trial,
            variables,
            entries,
            plots
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

  const selectedTrial = trials.find(t => String(t.id) === selectedTrialId);

  // Helper functions
  const getVariable = (id: string) => selectedTrial?.variables.find((v: any) => v.id === id) || {};
  const getPlot = (id: string) => selectedTrial?.plots.find((p: any) => p.id === id) || {};

  // Compute unique filter options
  const uniqueDates = selectedTrial ? Array.from(new Set(selectedTrial.entries.map((e: any) => e.measurement_date))) : [];
  const uniquePlots = selectedTrial ? Array.from(new Set(selectedTrial.entries.map((e: any) => e.plot_id))) : [];
  const uniqueVariables = selectedTrial ? Array.from(new Set(selectedTrial.entries.map((e: any) => e.variable_id))) : [];

  // Filtered entries for summary table
  const filteredEntries = selectedTrial ? selectedTrial.entries.filter((e: any) =>
    (filterDate === '__all__' || e.measurement_date === filterDate) &&
    (filterPlot === '__all__' || e.plot_id === filterPlot) &&
    (filterVariable === '__all__' || e.variable_id === filterVariable)
  ) : [];

  // Entries for the open variable
  const variableEntries = selectedTrial && openVariable
    ? selectedTrial.entries.filter((e: any) => e.variable_id === openVariable)
    : [];

  return (
    <div className="max-w-7xl mx-auto py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Data Summary</h1>
          <p className="text-gray-600 mt-2">View and analyze field trial data across all variables</p>
        </div>
        <div className="flex items-center gap-2">
          <BarChart className="h-6 w-6 text-primary" />
        </div>
      </div>

      {/* Trial Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Trial Selection</CardTitle>
          <CardDescription>Select a trial to view its data summary</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <label className="font-semibold">Select Trial:</label>
            <Select value={selectedTrialId} onValueChange={setSelectedTrialId}>
              <SelectTrigger className="w-80">
                <SelectValue placeholder="Select a trial" />
              </SelectTrigger>
              <SelectContent>
                {trials.map(trial => (
                  <SelectItem key={trial.id} value={String(trial.id)}>
                    {trial.name} ({trial.code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedTrial && (
              <Badge variant={selectedTrial.status === 'Ongoing' ? 'default' : 'secondary'}>
                {selectedTrial.status}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {selectedTrial ? (
        <>
          {/* Variables by Section */}
          <Card>
            <CardHeader>
              <CardTitle>Data by Variable</CardTitle>
              <CardDescription>Click on a variable to view all entries for that variable</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {uniqueVariables.map(variable => {
                  const variableData = getVariable(variable);
                  const entryCount = selectedTrial.entries.filter(e => e.variable_id === variable).length;
                  
                  return (
                    <Card key={variable} className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-lg">{variableData.name}</h4>
                        <Badge variant="outline">{entryCount} entries</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{variableData.description}</p>
                      <div className="text-xs text-gray-500 mb-3">Unit: {variableData.unit}</div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => setOpenVariable(variable)}
                        className="w-full"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View All Entries
                      </Button>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Summary Table */}
          <Card>
            <CardHeader>
              <CardTitle>Data Summary Table</CardTitle>
              <CardDescription>All data entries for {selectedTrial.name}</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <label className="text-sm font-medium">Date</label>
                  <Select value={filterDate} onValueChange={setFilterDate}>
                    <SelectTrigger>
                      <SelectValue placeholder="All dates" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__all__">All dates</SelectItem>
                      {uniqueDates.map(date => (
                        <SelectItem key={date} value={date}>{date}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Plot</label>
                  <Select value={filterPlot} onValueChange={setFilterPlot}>
                    <SelectTrigger>
                      <SelectValue placeholder="All plots" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__all__">All plots</SelectItem>
                      {uniquePlots.map(plot => (
                        <SelectItem key={plot} value={plot}>{getPlot(plot).plot_number}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Variable</label>
                  <Select value={filterVariable} onValueChange={setFilterVariable}>
                    <SelectTrigger>
                      <SelectValue placeholder="All variables" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__all__">All variables</SelectItem>
                      {uniqueVariables.map(variable => (
                        <SelectItem key={variable} value={variable}>{getVariable(variable).name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Summary Table */}
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Plot</TableHead>
                      <TableHead>Variable</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEntries.map((entry, index) => (
                      <TableRow key={index}>
                        <TableCell>{entry.measurement_date}</TableCell>
                        <TableCell className="font-medium">{getPlot(entry.plot_id).plot_number}</TableCell>
                        <TableCell>{getVariable(entry.variable_id).name}</TableCell>
                        <TableCell>{entry.value}</TableCell>
                        <TableCell>{getVariable(entry.variable_id).unit}</TableCell>
                        <TableCell className="max-w-xs truncate">{entry.notes}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Variable Modal */}
          <Dialog open={!!openVariable} onOpenChange={(open) => !open && setOpenVariable(null)}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>All Entries for {openVariable}</DialogTitle>
              </DialogHeader>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Plot</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {variableEntries.map((entry, index) => (
                      <TableRow key={index}>
                        <TableCell>{entry.measurement_date}</TableCell>
                        <TableCell className="font-medium">{getPlot(entry.plot_id).plot_number}</TableCell>
                        <TableCell className="font-semibold">{entry.value}</TableCell>
                        <TableCell>{getVariable(entry.variable_id).unit}</TableCell>
                        <TableCell className="max-w-xs">{entry.notes}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                Total entries: {variableEntries.length}
              </div>
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-600">Please select a trial to view data summary</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DataSummaryPage; 