import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAnalyses } from '@/lib/analysisApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import KpiCard from '@/components/metrics/KpiCard';
import { Calendar, FileText, DollarSign, TrendingUp, Leaf } from 'lucide-react';
import { BarChart } from '@/components/charts/BarChart';
import DonutChart from '@/components/charts/DonutChart';
import { format, parseISO } from 'date-fns';

const AnalysisReportsPage: React.FC = () => {
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
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
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

  if (isLoading) return <div className="p-8 text-gray-500">Loading...</div>;
  if (isError) return <div className="p-8 text-red-600">{error.message}</div>;

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analysis Report</h1>
        <p className="text-muted-foreground mt-1">Comprehensive analytics and financial insights for the analysis department.</p>
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
          <CardContent><BarChart data={analysesPerMonth} bars={[{ dataKey: 'value', fill: '#3b82f6', name: 'Analyses' }]} xAxisDataKey="name" /></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>By Status</CardTitle></CardHeader>
          <CardContent><DonutChart data={byStatus} /></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>By Type</CardTitle></CardHeader>
          <CardContent><DonutChart data={byType} /></CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalysisReportsPage; 