import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAnalyses } from '@/lib/analysisApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, CheckCircle2, CircleDot, FileText, Leaf, DollarSign, TrendingUp } from 'lucide-react';
import KpiCard from '@/components/metrics/KpiCard';
import { BarChart } from '@/components/charts/BarChart';
import DonutChart from '@/components/charts/DonutChart';
import AreaChart from '@/components/charts/AreaChart';
import { format, parseISO, isWithinInterval } from 'date-fns';
import { Analysis } from '@/lib/types';

const AnalysisDashboardPage: React.FC = () => {
  const { data: analyses = [], isLoading, isError, error } = useQuery({
    queryKey: ['analyses'],
    queryFn: getAnalyses,
  });

  // Filters
  const [consultant, setConsultant] = useState('all');
  const [client, setClient] = useState('all');
  const [type, setType] = useState('all');
  const [status, setStatus] = useState('all');
  const [dateRange, setDateRange] = useState('30'); // Default to 30 days

  // Unique values for filters
  const consultants = useMemo(() => [...new Set(analyses.map(a => a.consultant).filter(Boolean))], [analyses]);
  const clients = useMemo(() => [...new Set(analyses.map(a => a.client_name).filter(Boolean))], [analyses]);
  const types = useMemo(() => [...new Set(analyses.map(a => a.analysis_type).filter(Boolean))], [analyses]);
  const statuses = useMemo(() => [...new Set(analyses.map(a => a.status).filter(Boolean))], [analyses]);

  // Filtered analyses
  const filtered = useMemo(() => analyses.filter(a => {
    const matchesConsultant = consultant === 'all' || a.consultant === consultant;
    const matchesClient = client === 'all' || a.client_name === client;
    const matchesType = type === 'all' || a.analysis_type === type;
    const matchesStatus = status === 'all' || a.status === status;
    
    let matchesDateRange = true;
    if (dateRange && dateRange !== 'all') {
      const daysAgo = parseInt(dateRange);
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysAgo);
      matchesDateRange = new Date(a.created_at).getTime() >= cutoffDate.getTime();
    }
    
    return matchesConsultant && matchesClient && matchesType && matchesStatus && matchesDateRange;
  }), [analyses, consultant, client, type, status, dateRange]);

  // KPIs
  const total = filtered.length;
  const thisMonth = filtered.filter(a => format(parseISO(a.created_at), 'yyyy-MM') === format(new Date(), 'yyyy-MM')).length;
  const byStatus = Object.fromEntries(statuses.map(s => [s, filtered.filter(a => a.status === s).length]));
  const byType = Object.fromEntries(types.map(t => [t, filtered.filter(a => a.analysis_type === t).length]));
  const byConsultant = Object.fromEntries(consultants.map(c => [c, filtered.filter(a => a.consultant === c).length]));
  const byClient = Object.fromEntries(clients.map(c => [c, filtered.filter(a => a.client_name === c).length]));
  const byCategory = Object.fromEntries([...new Set(analyses.map(a => a.category).filter(Boolean))].map(cat => [cat, filtered.filter(a => a.category === cat).length]));

  // Turnaround time (in days)
  const turnaroundTimes = filtered.map(a => {
    if (!a.emailed_date) return null;
    const start = parseISO(a.created_at);
    const end = parseISO(a.emailed_date);
    return (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
  }).filter(Boolean) as number[];
  const avgTurnaround = turnaroundTimes.length ? (turnaroundTimes.reduce((a, b) => a + b, 0) / turnaroundTimes.length).toFixed(1) : '—';

  // Average time per soil/leaf test
  const avgSoil = (() => {
    const soil = filtered.filter(a => a.analysis_type === 'soil' && a.emailed_date);
    if (!soil.length) return '—';
    const days = soil.map(a => (parseISO(a.emailed_date).getTime() - parseISO(a.created_at).getTime()) / (1000 * 60 * 60 * 24));
    return (days.reduce((a, b) => a + b, 0) / days.length).toFixed(1);
  })();
  const avgLeaf = (() => {
    const leaf = filtered.filter(a => a.analysis_type === 'leaf' && a.emailed_date);
    if (!leaf.length) return '—';
    const days = leaf.map(a => (parseISO(a.emailed_date).getTime() - parseISO(a.created_at).getTime()) / (1000 * 60 * 60 * 24));
    return (days.reduce((a, b) => a + b, 0) / days.length).toFixed(1);
  })();

  // Analyses per month
  const analysesPerMonth = useMemo(() => {
    const counts: {[month: string]: number} = {};
    filtered.forEach(a => {
      const month = format(parseISO(a.created_at), 'yyyy-MM');
      counts[month] = (counts[month] || 0) + 1;
    });
    return Object.entries(counts).map(([month, count]) => ({ name: month, value: count }));
  }, [filtered]);

  // Top consultants/clients
  const topConsultants = Object.entries(byConsultant).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const topClients = Object.entries(byClient).sort((a, b) => b[1] - a[1]).slice(0, 5);

  // Financial metrics
  const totalRevenue = filtered.reduce((sum, analysis) => sum + (analysis.total_price || 0), 0);
  const avgRevenue = filtered.length > 0 ? totalRevenue / filtered.length : 0;
  const thisMonthRevenue = filtered.filter(analysis => {
    const now = new Date();
    const analysisDate = new Date(analysis.created_at);
    return analysisDate.getMonth() === now.getMonth() && 
           analysisDate.getFullYear() === now.getFullYear();
  }).reduce((sum, analysis) => sum + (analysis.total_price || 0), 0);

  // Test metrics
  const totalTests = filtered.reduce((sum, analysis) => sum + (analysis.test_count || 1), 0);
  const thisMonthTests = filtered.filter(analysis => {
    const now = new Date();
    const analysisDate = new Date(analysis.created_at);
    return analysisDate.getMonth() === now.getMonth() && 
           analysisDate.getFullYear() === now.getFullYear();
  }).reduce((sum, analysis) => sum + (analysis.test_count || 1), 0);

  // Chart data
  const monthlyData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyCounts = new Array(12).fill(0);
    const monthlyRevenue = new Array(12).fill(0);

    filtered.forEach(analysis => {
      const date = new Date(analysis.created_at);
      const month = date.getMonth();
      monthlyCounts[month]++;
      monthlyRevenue[month] += analysis.total_price || 0;
    });

    return months.map((month, index) => ({
      name: month,
      analyses: monthlyCounts[index],
      revenue: monthlyRevenue[index],
    }));
  }, [filtered]);

  const typeData = useMemo(() => {
    const soilCount = filtered.filter(a => a.analysis_type === 'soil').length;
    const leafCount = filtered.filter(a => a.analysis_type === 'leaf').length;

    return [
      { name: 'Soil', value: soilCount, color: '#10b981' },
      { name: 'Leaf', value: leafCount, color: '#3b82f6' },
    ];
  }, [filtered]);

  const testData = useMemo(() => {
    const soilTests = filtered.filter(a => a.analysis_type === 'soil').reduce((sum, a) => sum + (a.test_count || 1), 0);
    const leafTests = filtered.filter(a => a.analysis_type === 'leaf').reduce((sum, a) => sum + (a.test_count || 1), 0);

    return [
      { name: 'Soil Tests', value: soilTests, color: '#10b981' },
      { name: 'Leaf Tests', value: leafTests, color: '#3b82f6' },
    ];
  }, [filtered]);

  const statusData = useMemo(() => {
    const statusCounts = statuses.reduce((acc, status) => {
      acc[status] = filtered.filter(a => a.status === status).length;
      return acc;
    }, {} as Record<string, number>);

    const colors = ['#10b981', '#f59e0b', '#3b82f6', '#ef4444'];
    return Object.entries(statusCounts).map(([status, count], index) => ({
      name: status,
      value: count,
      color: colors[index % colors.length],
    }));
  }, [filtered, statuses]);

  const revenueData = useMemo(() => {
    const revenueByType = {
      soil: filtered.filter(a => a.analysis_type === 'soil').reduce((sum, a) => sum + (a.total_price || 0), 0),
      leaf: filtered.filter(a => a.analysis_type === 'leaf').reduce((sum, a) => sum + (a.total_price || 0), 0),
    };

    return [
      { name: 'Soil Revenue', value: revenueByType.soil, color: '#10b981' },
      { name: 'Leaf Revenue', value: revenueByType.leaf, color: '#3b82f6' },
    ];
  }, [filtered]);

  const consultantRevenueData = useMemo(() => {
    const consultantRevenue = consultants.reduce((acc, consultant) => {
      acc[consultant] = filtered
        .filter(a => a.consultant === consultant)
        .reduce((sum, a) => sum + (a.total_price || 0), 0);
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(consultantRevenue).map(([consultant, revenue]) => ({
      name: consultant,
      revenue: revenue,
    }));
  }, [filtered, consultants]);

  if (isLoading) return <div className="p-8 text-gray-500">Loading...</div>;
  if (isError) return <div className="p-8 text-red-600">{error.message}</div>;

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analysis Report</h1>
        <p className="text-muted-foreground mt-1">Comprehensive analytics and financial insights for the analysis department.</p>
      </div>
      {/* Filters - moved above KPIs */}
      <Card>
        <CardHeader><CardTitle>Filters</CardTitle></CardHeader>
        <CardContent className="flex flex-wrap gap-4 items-center">
          <div>
            <span>Date Range:</span>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-32"><SelectValue placeholder="30 days" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="60">Last 60 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="180">Last 180 days</SelectItem>
                <SelectItem value="360">Last 360 days</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <span>Consultant:</span>
            <Select value={consultant} onValueChange={setConsultant}>
              <SelectTrigger className="w-32"><SelectValue placeholder="All" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {consultants.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <span>Client:</span>
            <Select value={client} onValueChange={setClient}>
              <SelectTrigger className="w-32"><SelectValue placeholder="All" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {clients.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <span>Type:</span>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="w-32"><SelectValue placeholder="All" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {types.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <span>Status:</span>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-32"><SelectValue placeholder="All" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {statuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <KpiCard title="Total Analyses" value={total} icon={<Calendar className="h-6 w-6 text-muted-foreground" />} />
        <KpiCard title="Total Tests" value={totalTests} icon={<FileText className="h-6 w-6 text-orange-500" />} />
        <KpiCard title="This Month" value={thisMonth} icon={<Calendar className="h-6 w-6 text-blue-500" />} />
        <KpiCard title="Avg Turnaround (days)" value={avgTurnaround} icon={<CheckCircle2 className="h-6 w-6 text-green-500" />} />
        <KpiCard title="Avg Soil (days)" value={avgSoil} icon={<Leaf className="h-6 w-6 text-green-700" />} />
        <KpiCard title="Avg Leaf (days)" value={avgLeaf} icon={<Leaf className="h-6 w-6 text-lime-500" />} />
        <KpiCard title="Total Revenue" value={`$${totalRevenue.toLocaleString()}`} icon={<DollarSign className="h-6 w-6 text-green-600" />} />
        <KpiCard title="This Month Revenue" value={`$${thisMonthRevenue.toLocaleString()}`} icon={<TrendingUp className="h-6 w-6 text-blue-600" />} />
        <KpiCard title="Avg Revenue/Analysis" value={`$${avgRevenue.toFixed(2)}`} icon={<DollarSign className="h-6 w-6 text-purple-600" />} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Analyses Per Month</CardTitle></CardHeader>
          <CardContent><BarChart data={Array.isArray(analysesPerMonth) ? analysesPerMonth : []} bars={[{ dataKey: 'value', fill: '#3b82f6', name: 'Analyses' }]} xAxisDataKey="name" /></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>By Status</CardTitle></CardHeader>
          <CardContent><DonutChart data={Array.isArray(Object.entries(byStatus)) ? Object.entries(byStatus).map(([name, value]) => ({ name, value })) : []} /></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>By Type</CardTitle></CardHeader>
          <CardContent><DonutChart data={Array.isArray(Object.entries(byType)) ? Object.entries(byType).map(([name, value]) => ({ name, value })) : []} /></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>By Consultant</CardTitle></CardHeader>
          <CardContent><BarChart data={Array.isArray(Object.entries(byConsultant)) ? Object.entries(byConsultant).map(([name, value]) => ({ name, value })) : []} bars={[{ dataKey: 'value', fill: '#10b981', name: 'Analyses' }]} xAxisDataKey="name" /></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>By Client</CardTitle></CardHeader>
          <CardContent><BarChart data={Array.isArray(Object.entries(byClient)) ? Object.entries(byClient).map(([name, value]) => ({ name, value })) : []} bars={[{ dataKey: 'value', fill: '#f59e42', name: 'Analyses' }]} xAxisDataKey="name" /></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>By Category</CardTitle></CardHeader>
          <CardContent><DonutChart data={Array.isArray(Object.entries(byCategory)) ? Object.entries(byCategory).map(([name, value]) => ({ name, value })) : []} /></CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Top Consultants</CardTitle></CardHeader>
          <CardContent>
            <ul>
              {topConsultants.map(([name, value]) => (
                <li key={name}>{name}: <b>{value}</b></li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Top Clients</CardTitle></CardHeader>
          <CardContent>
            <ul>
              {topClients.map(([name, value]) => (
                <li key={name}>{name}: <b>{value}</b></li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Analyses & Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart 
              data={monthlyData} 
              bars={[
                { dataKey: 'analyses', fill: '#3b82f6', name: 'Analyses' },
                { dataKey: 'revenue', fill: '#10b981', name: 'Revenue ($)' }
              ]}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <DonutChart data={statusData} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Type</CardTitle>
          </CardHeader>
          <CardContent>
            <DonutChart data={revenueData} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tests by Type</CardTitle>
          </CardHeader>
          <CardContent>
            <DonutChart data={testData} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Consultant</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart 
              data={consultantRevenueData} 
              bars={[
                { dataKey: 'revenue', fill: '#10b981', name: 'Revenue ($)' }
              ]}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top Clients by Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {clients.slice(0, 5).map(clientName => {
                const clientRevenue = filtered
                  .filter(a => a.client_name === clientName)
                  .reduce((sum, a) => sum + (a.total_price || 0), 0);
                return (
                  <div key={clientName} className="flex justify-between items-center p-2 bg-muted rounded">
                    <span className="font-medium">{clientName}</span>
                    <span className="text-green-600 font-semibold">${clientRevenue.toLocaleString()}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalysisDashboardPage; 