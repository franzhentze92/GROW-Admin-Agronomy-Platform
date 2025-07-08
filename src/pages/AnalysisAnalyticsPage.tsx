import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAnalyses } from '@/lib/analysisApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import KpiCard from '@/components/metrics/KpiCard';
import { Calendar, FileText, DollarSign, TrendingUp, Leaf } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const AnalysisAnalyticsPage: React.FC = () => {
  const { data: analyses = [], isLoading, isError, error } = useQuery({
    queryKey: ['analyses'],
    queryFn: getAnalyses,
  });

  // KPIs
  const total = analyses.length;
  const thisMonth = analyses.filter(a => format(parseISO(a.created_at), 'yyyy-MM') === format(new Date(), 'yyyy-MM')).length;
  const totalTests = analyses.reduce((sum, a) => sum + (a.test_count || 1), 0);
  const totalRevenue = analyses.reduce((sum, a) => sum + (a.total_price || 0), 0);
  const avgRevenue = analyses.length ? (totalRevenue / analyses.length) : 0;
  const thisMonthRevenue = analyses.filter(a => format(parseISO(a.created_at), 'yyyy-MM') === format(new Date(), 'yyyy-MM')).reduce((sum, a) => sum + (a.total_price || 0), 0);
  const avgSoil = (() => {
    const soil = analyses.filter(a => a.analysis_type === 'soil' && a.emailed_date);
    if (!soil.length) return '—';
    const days = soil.map(a => (parseISO(a.emailed_date).getTime() - parseISO(a.created_at).getTime()) / (1000 * 60 * 60 * 24));
    return (days.reduce((a, b) => a + b, 0) / days.length).toFixed(1);
  })();
  const avgLeaf = (() => {
    const leaf = analyses.filter(a => a.analysis_type === 'leaf' && a.emailed_date);
    if (!leaf.length) return '—';
    const days = leaf.map(a => (parseISO(a.emailed_date).getTime() - parseISO(a.created_at).getTime()) / (1000 * 60 * 60 * 24));
    return (days.reduce((a, b) => a + b, 0) / days.length).toFixed(1);
  })();

  // Chart data
  const analysesPerMonth = useMemo(() => {
    const counts: {[month: string]: number} = {};
    analyses.forEach(a => {
      const month = format(parseISO(a.created_at), 'yyyy-MM');
      counts[month] = (counts[month] || 0) + 1;
    });
    return Object.entries(counts)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([name, value]) => ({ name, value }));
  }, [analyses]);

  const byStatus = useMemo(() => {
    const counts: Record<string, number> = {};
    analyses.forEach(a => { counts[a.status] = (counts[a.status] || 0) + 1; });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [analyses]);

  const byType = useMemo(() => {
    const counts: Record<string, number> = {};
    analyses.forEach(a => { counts[a.analysis_type] = (counts[a.analysis_type] || 0) + 1; });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [analyses]);

  // Chart.js data
  const barData = {
    labels: analysesPerMonth.map(d => d.name),
    datasets: [
      {
        label: 'Analyses',
        data: analysesPerMonth.map(d => d.value),
        backgroundColor: '#3b82f6',
      },
    ],
  };
  const doughnutStatusData = {
    labels: byStatus.map(d => d.name),
    datasets: [
      {
        data: byStatus.map(d => d.value),
        backgroundColor: ['#10b981', '#f59e0b', '#3b82f6', '#ef4444'],
      },
    ],
  };
  const doughnutTypeData = {
    labels: byType.map(d => d.name),
    datasets: [
      {
        data: byType.map(d => d.value),
        backgroundColor: ['#10b981', '#3b82f6'],
      },
    ],
  };

  if (isLoading) return <div className="p-8 text-gray-500">Loading...</div>;
  if (isError) return <div className="p-8 text-red-600">{error.message}</div>;

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analysis Analytics</h1>
        <p className="text-muted-foreground mt-1">Comprehensive analytics and financial insights for the analysis management section.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <KpiCard title="Total Analyses" value={total} icon={<Calendar className="h-6 w-6 text-muted-foreground" />} />
        <KpiCard title="Total Tests" value={totalTests} icon={<FileText className="h-6 w-6 text-orange-500" />} />
        <KpiCard title="This Month" value={thisMonth} icon={<Calendar className="h-6 w-6 text-blue-500" />} />
        <KpiCard title="Avg Soil (days)" value={avgSoil} icon={<Leaf className="h-6 w-6 text-green-700" />} />
        <KpiCard title="Avg Leaf (days)" value={avgLeaf} icon={<Leaf className="h-6 w-6 text-lime-500" />} />
        <KpiCard title="Total Revenue" value={`$${totalRevenue.toLocaleString()}`} icon={<DollarSign className="h-6 w-6 text-green-600" />} />
        <KpiCard title="This Month Revenue" value={`$${thisMonthRevenue.toLocaleString()}`} icon={<TrendingUp className="h-6 w-6 text-blue-600" />} />
        <KpiCard title="Avg Revenue/Analysis" value={`$${avgRevenue.toFixed(2)}`} icon={<DollarSign className="h-6 w-6 text-purple-600" />} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Analyses Per Month</CardTitle></CardHeader>
          <CardContent style={{ width: '100%', height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>By Status</CardTitle></CardHeader>
          <CardContent style={{ width: '100%', height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Doughnut data={doughnutStatusData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>By Type</CardTitle></CardHeader>
          <CardContent style={{ width: '100%', height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Doughnut data={doughnutTypeData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }} />
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Revenue by Month */}
        <Card>
          <CardHeader><CardTitle>Revenue by Month</CardTitle></CardHeader>
          <CardContent style={{ width: '100%', height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {(() => {
              const revenueCounts: {[month: string]: number} = {};
              analyses.forEach(a => {
                const month = format(parseISO(a.created_at), 'yyyy-MM');
                revenueCounts[month] = (revenueCounts[month] || 0) + (a.total_price || 0);
              });
              const sortedMonths = Object.keys(revenueCounts).sort();
              return (
                <Bar
                  data={{
                    labels: sortedMonths,
                    datasets: [{
                      label: 'Revenue',
                      data: sortedMonths.map(month => revenueCounts[month]),
                      backgroundColor: '#10b981',
                    }],
                  }}
                  options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }}
                />
              );
            })()}
          </CardContent>
        </Card>
        {/* Revenue by Analysis Type */}
        <Card>
          <CardHeader><CardTitle>Revenue by Analysis Type</CardTitle></CardHeader>
          <CardContent style={{ width: '100%', height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Doughnut data={{
              labels: Object.keys(analyses.reduce((acc, a) => {
                acc[a.analysis_type] = true;
                return acc;
              }, {})),
              datasets: [{
                data: Object.entries(analyses.reduce((acc, a) => {
                  acc[a.analysis_type] = (acc[a.analysis_type] || 0) + (a.total_price || 0);
                  return acc;
                }, {})).map(([_, value]) => value),
                backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'],
              }],
            }} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }} />
          </CardContent>
        </Card>
        {/* Top Clients by Number of Analyses */}
        <Card>
          <CardHeader><CardTitle>Top Clients by Number of Analyses</CardTitle></CardHeader>
          <CardContent style={{ width: '100%', height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {(() => {
              const clientCounts: { [client: string]: number } = {};
              analyses.forEach(a => {
                if (a.client_name) clientCounts[a.client_name] = (clientCounts[a.client_name] || 0) + 1;
              });
              const sorted = Object.entries(clientCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
              return (
                <Bar
                  data={{
                    labels: sorted.map(([name]) => name),
                    datasets: [{
                      label: 'Analyses',
                      data: sorted.map(([_, value]) => value),
                      backgroundColor: '#3b82f6',
                    }],
                  }}
                  options={{
                    responsive: true,
                    indexAxis: 'y',
                    plugins: { legend: { display: false } },
                    scales: { x: { beginAtZero: true } },
                  }}
                />
              );
            })()}
          </CardContent>
        </Card>
        {/* Monthly Soil and Leaf Analyses Chart */}
        <Card>
          <CardHeader><CardTitle>Monthly Soil and Leaf Analyses</CardTitle></CardHeader>
          <CardContent style={{ width: '100%', height: 220, padding: 0 }}>
            {(() => {
              // Get all months in the data
              const monthsSet = new Set<string>();
              analyses.forEach(a => {
                monthsSet.add(format(parseISO(a.created_at), 'yyyy-MM'));
              });
              const months = Array.from(monthsSet).sort();
              // Count per type per month
              const soilCounts = months.map(month => analyses.filter(a => format(parseISO(a.created_at), 'yyyy-MM') === month && a.analysis_type === 'soil').length);
              const leafCounts = months.map(month => analyses.filter(a => format(parseISO(a.created_at), 'yyyy-MM') === month && a.analysis_type === 'leaf').length);
              return (
                <Bar
                  data={{
                    labels: months,
                    datasets: [
                      { label: 'Soil', data: soilCounts, backgroundColor: '#3b82f6' },
                      { label: 'Leaf', data: leafCounts, backgroundColor: '#10b981' },
                    ],
                  }}
                  options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }}
                />
              );
            })()}
          </CardContent>
        </Card>
        {/* Monthly Revenue for Soil and Leaf Chart */}
        <Card>
          <CardHeader><CardTitle>Monthly Revenue by Type</CardTitle></CardHeader>
          <CardContent style={{ width: '100%', height: 220, padding: 0 }}>
            {(() => {
              // Get all months in the data
              const monthsSet = new Set<string>();
              analyses.forEach(a => {
                monthsSet.add(format(parseISO(a.created_at), 'yyyy-MM'));
              });
              const months = Array.from(monthsSet).sort();
              // Revenue per type per month
              const soilRevenue = months.map(month => analyses.filter(a => format(parseISO(a.created_at), 'yyyy-MM') === month && a.analysis_type === 'soil').reduce((sum, a) => sum + (a.total_price || 0), 0));
              const leafRevenue = months.map(month => analyses.filter(a => format(parseISO(a.created_at), 'yyyy-MM') === month && a.analysis_type === 'leaf').reduce((sum, a) => sum + (a.total_price || 0), 0));
              return (
                <Bar
                  data={{
                    labels: months,
                    datasets: [
                      { label: 'Soil Revenue', data: soilRevenue, backgroundColor: '#3b82f6' },
                      { label: 'Leaf Revenue', data: leafRevenue, backgroundColor: '#10b981' },
                    ],
                  }}
                  options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }}
                />
              );
            })()}
          </CardContent>
        </Card>
        {/* Consultant Pie Charts Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Revenue by Consultant Pie Chart */}
          <Card>
            <CardHeader><CardTitle>Revenue by Consultant</CardTitle></CardHeader>
            <CardContent style={{ width: '100%', height: 220, padding: 0 }}>
              {(() => {
                const consultantRevenue: { [consultant: string]: number } = {};
                analyses.forEach(a => {
                  if (a.consultant) consultantRevenue[a.consultant] = (consultantRevenue[a.consultant] || 0) + (a.total_price || 0);
                });
                const consultants = Object.keys(consultantRevenue);
                const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#6366f1', '#a21caf', '#eab308', '#14b8a6'];
                return (
                  <Doughnut
                    data={{
                      labels: consultants,
                      datasets: [
                        {
                          data: consultants.map(c => consultantRevenue[c]),
                          backgroundColor: colors,
                        },
                      ],
                    }}
                    options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }}
                  />
                );
              })()}
            </CardContent>
          </Card>
          {/* Number of Analyses by Consultant Pie Chart */}
          <Card>
            <CardHeader><CardTitle>Analyses by Consultant</CardTitle></CardHeader>
            <CardContent style={{ width: '100%', height: 220, padding: 0 }}>
              {(() => {
                const consultantCounts: { [consultant: string]: number } = {};
                analyses.forEach(a => {
                  if (a.consultant) consultantCounts[a.consultant] = (consultantCounts[a.consultant] || 0) + 1;
                });
                const consultants = Object.keys(consultantCounts);
                const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#6366f1', '#a21caf', '#eab308', '#14b8a6'];
                return (
                  <Doughnut
                    data={{
                      labels: consultants,
                      datasets: [
                        {
                          data: consultants.map(c => consultantCounts[c]),
                          backgroundColor: colors,
                        },
                      ],
                    }}
                    options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }}
                  />
                );
              })()}
            </CardContent>
          </Card>
        </div>
        {/* Top Crops Pie Chart */}
        <Card>
          <CardHeader><CardTitle>Top Crops</CardTitle></CardHeader>
          <CardContent style={{ width: '100%', height: 220, padding: 0 }}>
            {(() => {
              const cropCounts: { [crop: string]: number } = {};
              analyses.forEach(a => {
                if (a.crop) cropCounts[a.crop] = (cropCounts[a.crop] || 0) + 1;
              });
              const sorted = Object.entries(cropCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
              const crops = sorted.map(([crop]) => crop);
              const counts = sorted.map(([_, count]) => count);
              const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#6366f1'];
              return (
                <Doughnut
                  data={{
                    labels: crops,
                    datasets: [
                      {
                        data: counts,
                        backgroundColor: colors,
                      },
                    ],
                  }}
                  options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }}
                />
              );
            })()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalysisAnalyticsPage; 