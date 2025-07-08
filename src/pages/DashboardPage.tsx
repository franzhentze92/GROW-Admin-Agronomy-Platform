import React, { useMemo, useEffect, useState } from 'react';
import Weather from '@/components/satellite/Weather';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart } from '@/components/charts/LineChart';
import { useQuery } from '@tanstack/react-query';
import { getAnalyses } from '@/lib/analysisApi';
import { getFieldVisits } from '@/lib/fieldVisitApi';
import { Badge } from '@/components/ui/badge';
import { 
  Video, 
  MapPin, 
  Package, 
  Target, 
  Calendar, 
  Clock, 
  User, 
  Leaf, 
  FlaskConical,
  TrendingUp,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { getRecentBatches, Batch } from '@/lib/batchApi';
import { fieldTrialsApi, FieldTrial } from '@/lib/fieldTrialsApi';
import { googleCalendarApi } from '@/lib/calendarApi';
import { fetchNutritionFarmRequests, NutritionFarmRequest } from '@/lib/nutritionFarmsApi';
// TODO: Implement getBatches and getTrials APIs or import if available
// import { getBatches } from '@/lib/batchApi';
// import { getTrials } from '@/lib/trialsApi';
// import { getTasks } from '@/lib/tasksApi';

const statusColorMap: Record<string, string> = {
  Pending: 'bg-yellow-500 text-white',
  Prepared: 'bg-blue-500 text-white',
  'In Transit': 'bg-orange-500 text-white',
  Delivered: 'bg-green-500 text-white',
  Completed: 'bg-gray-600 text-white',
};

// Field Visits badge color map (from FieldVisitsPage)
const fieldVisitStatusClassMap: Record<string, string> = {
  Completed: 'bg-green-500',
  Scheduled: 'bg-blue-500',
  'In Progress': 'bg-orange-500',
  Cancelled: 'bg-red-500',
};

// Field Trials badge color map (from TrialDetailsPage)
const fieldTrialStatusColors: Record<string, string> = {
  planned: 'bg-yellow-100 text-yellow-800',
  ongoing: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-gray-100 text-gray-800',
};

// Helper to aggregate analysis counts and test counts per day
function getDailyCounts(analyses: any[], type: string): Record<string, number> {
  const counts: Record<string, number> = {};
  analyses.filter(a => a.analysis_type === type).forEach(a => {
    const date = a.created_at?.slice(0, 10);
    if (!date) return;
    counts[date] = (counts[date] || 0) + 1;
  });
  return counts;
}
function getDailyTestCounts(analyses: any[], type: string): Record<string, number> {
  const counts: Record<string, number> = {};
  analyses.filter(a => a.analysis_type === type).forEach(a => {
    const date = a.created_at?.slice(0, 10);
    if (!date) return;
    counts[date] = (counts[date] || 0) + (a.test_count || 0);
  });
  return counts;
}
function mergeDates(...dateMaps: Record<string, number>[]): string[] {
  const allDates = new Set<string>();
  dateMaps.forEach(map => Object.keys(map).forEach(d => allDates.add(d)));
  return Array.from(allDates).sort();
}

const DashboardPage: React.FC = () => {
  // Soil & Plant Therapy Reports
  const { data: analyses = [], isLoading: loadingAnalyses, error: errorAnalyses } = useQuery({ queryKey: ['analyses'], queryFn: getAnalyses });
  const soilReports = useMemo(() => {
    const soil = analyses.filter((a: any) => a.analysis_type === 'soil');
    const grouped: Record<string, number> = {};
    soil.forEach((a: any) => {
      const date = a.created_at?.slice(0, 10);
      if (date) grouped[date] = (grouped[date] || 0) + 1;
    });
    return Object.entries(grouped).map(([name, count]) => ({ name, count }));
  }, [analyses]);
  const plantReports = useMemo(() => {
    const leaf = analyses.filter((a: any) => a.analysis_type === 'leaf');
    const grouped: Record<string, number> = {};
    leaf.forEach((a: any) => {
      const date = a.created_at?.slice(0, 10);
      if (date) grouped[date] = (grouped[date] || 0) + 1;
    });
    return Object.entries(grouped).map(([name, count]) => ({ name, count }));
  }, [analyses]);

  // Upcoming Field Visits
  const { data: fieldVisits = [], isLoading: loadingVisits, error: errorVisits } = useQuery({ queryKey: ['fieldVisits'], queryFn: getFieldVisits });
  const upcomingFieldVisits = useMemo(() => {
    return fieldVisits
      .filter((v: any) => v.status === 'Scheduled' || v.status === 'In Progress')
      .sort((a: any, b: any) => new Date(a.visit_date).getTime() - new Date(b.visit_date).getTime())
      .slice(0, 5);
  }, [fieldVisits]);

  // TODO: Replace with real API calls
  const upcomingConsultings = [
    { id: 1, title: 'Soil Health Review', date: '2024-06-07', time: '10:00', consultant: 'Dr. Smith', type: 'zoom' },
    { id: 2, title: 'Crop Planning Session', date: '2024-06-08', time: '14:00', consultant: 'Maria Garcia', type: 'zoom' },
    { id: 3, title: 'Fertilizer Strategy', date: '2024-06-09', time: '09:30', consultant: 'Alan Montalbetti', type: 'zoom' },
  ];
  // Recent Batch Production
  const { data: lastBatches = [], isLoading: loadingBatches, error: errorBatches } = useQuery({
    queryKey: ['recentBatches'],
    queryFn: () => getRecentBatches(5),
  });
  // Recent Field Trials (all statuses)
  const { data: allTrials = [], isLoading: loadingTrials, error: errorTrials } = useQuery({
    queryKey: ['recentFieldTrials'],
    queryFn: () => fieldTrialsApi.getFieldTrials(),
  });
  const recentTrials = useMemo(() =>
    allTrials
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 5),
    [allTrials]
  );

  // Prepare data for new charts
  const soilAnalysisCounts = getDailyCounts(analyses, 'soil');
  const leafAnalysisCounts = getDailyCounts(analyses, 'leaf');
  const soilTestCounts = getDailyTestCounts(analyses, 'soil');
  const leafTestCounts = getDailyTestCounts(analyses, 'leaf');
  const allDates = mergeDates(soilAnalysisCounts, leafAnalysisCounts, soilTestCounts, leafTestCounts);
  const analysisCountData = allDates.map(date => ({
    name: date,
    soilTests: soilTestCounts[date] || 0,
    leafTests: leafTestCounts[date] || 0,
  }));

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8">
      {/* Top section: Welcome */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome to the G.R.O.W Admin Platform!</h1>
          <p className="text-muted-foreground mt-1">Your central hub for agronomy, analytics, and management.</p>
        </div>
      </div>

      {/* Analysis counts chart (full width) */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Soil & Leaf Analyses (All Time)</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingAnalyses ? (
              <div>Loading...</div>
            ) : errorAnalyses ? (
              <div className="text-red-500">Error loading data</div>
            ) : (
              <LineChart
                data={analysisCountData}
                lines={[
                  {
                    dataKey: 'soilTests',
                    stroke: '#B07B3C',
                    name: 'Soil Tests',
                    area: { fill: '#B07B3C', fillOpacity: 0.10 },
                  },
                  {
                    dataKey: 'leafTests',
                    stroke: '#4ADE80',
                    name: 'Leaf Tests',
                    area: { fill: '#4ADE80', fillOpacity: 0.10 },
                  },
                ]}
                xAxisDataKey="name"
                height={300}
              />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Upcoming consultings and field visits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-lg">Recent Nutrition Farm Requests</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <FarmRequestsSummary />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-green-600" />
              <CardTitle className="text-lg">Upcoming Field Visits</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {loadingVisits ? (
              <div className="flex items-center justify-center h-32">
                <div className="text-muted-foreground">Loading field visits...</div>
              </div>
            ) : errorVisits ? (
              <div className="flex items-center justify-center h-32">
                <div className="text-red-500">Error loading data</div>
              </div>
            ) : upcomingFieldVisits.length === 0 ? (
              <div className="flex items-center justify-center h-32">
                <div className="text-muted-foreground">No upcoming field visits</div>
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingFieldVisits.map((v: any) => (
                  <div key={v.id} className="flex items-center gap-3 p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
                    <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm truncate">
                          {typeof v.client === 'string'
                            ? v.client
                            : v.client?.name || 'Unknown Client'}
                        </h4>
                        <Badge
                          className={`text-xs text-white font-semibold ${fieldVisitStatusClassMap[v.status] || 'bg-gray-500'}`}
                        >
                          {v.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>{v.consultant || 'TBD'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{v.visit_date?.slice(0, 10) || 'TBD'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Last batches produced and recent trials */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-purple-600" />
              <CardTitle className="text-lg">Recent Batch Production</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {loadingBatches ? (
              <div className="flex items-center justify-center h-32">
                <div className="text-muted-foreground">Loading batches...</div>
              </div>
            ) : errorBatches ? (
              <div className="flex items-center justify-center h-32">
                <div className="text-red-500">Error loading batches</div>
              </div>
            ) : lastBatches.length === 0 ? (
              <div className="flex items-center justify-center h-32">
                <div className="text-muted-foreground">No recent batches</div>
              </div>
            ) : (
              <div className="space-y-3">
                {lastBatches.map(b => (
                  <div key={b.id} className="flex items-center gap-3 p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors">
                    <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <FlaskConical className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm truncate">{b.product_name || 'Unknown Product'}</h4>
                        <Badge
                          className="text-xs bg-green-500 text-white"
                        >
                          Completed
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{b.production_date?.slice(0, 10)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Package className="h-3 w-3" />
                          <span>{b.volume}L</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-orange-600" />
              <CardTitle className="text-lg">Recent Field Trials</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {loadingTrials ? (
              <div className="flex items-center justify-center h-32">
                <div className="text-muted-foreground">Loading trials...</div>
              </div>
            ) : errorTrials ? (
              <div className="flex items-center justify-center h-32">
                <div className="text-red-500">Error loading trials</div>
              </div>
            ) : recentTrials.length === 0 ? (
              <div className="flex items-center justify-center h-32">
                <div className="text-muted-foreground">No field trials</div>
              </div>
            ) : (
              <div className="space-y-3">
                {recentTrials.map(t => (
                  <div key={t.id} className="flex items-center gap-3 p-3 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors">
                    <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <Target className="h-5 w-5 text-orange-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm truncate">{t.name}</h4>
                        <Badge
                          className={`text-xs ${fieldTrialStatusColors[t.status?.toLowerCase()] || 'bg-gray-100 text-gray-800'}`}
                        >
                          {t.status.charAt(0).toUpperCase() + t.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          <Leaf className="h-3 w-3" />
                          <span>{t.crop}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>Ends: {t.end_date?.slice(0, 10)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const FarmRequestsSummary: React.FC = () => {
  const { data: requests = [], isLoading, error } = useQuery({
    queryKey: ['dashboardFarmRequests'],
    queryFn: fetchNutritionFarmRequests,
  });
  if (isLoading) return <div className="flex items-center justify-center h-32 text-muted-foreground">Loading requests...</div>;
  if (error) return <div className="flex items-center justify-center h-32 text-red-500">Error loading requests</div>;
  if (!requests.length) return <div className="flex items-center justify-center h-32 text-muted-foreground">No recent requests</div>;
  return (
    <div className="space-y-3">
      {requests.slice(0, 3).map(req => (
        <div key={req.id} className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
          <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <Package className="h-5 w-5 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-medium text-sm truncate">{req.farm}</h4>
              <span className="text-xs text-muted-foreground">{req.manager}</span>
              <span className="text-xs text-muted-foreground">{req.date}</span>
              <span className={`text-xs px-2 py-0.5 rounded ${statusColorMap[req.status] || 'bg-gray-300 text-black'}`}>{req.status}</span>
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mt-1">
              {req.materials?.slice(0, 2).map((mat, i) => (
                <span key={i} className="bg-blue-200 px-2 py-0.5 rounded">{mat.name} x{mat.quantity}</span>
              ))}
              {req.materials?.length > 2 && <span>+{req.materials.length - 2} more</span>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardPage;
