import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, DollarSign, Users, FileText, Tag, ChevronLeft, Edit, Plus, CheckCircle, AlertCircle, Clock, Map, Package, Database, BarChart3, Calculator, Target } from 'lucide-react';
import { fieldTrialsApi, FieldTrial } from '@/lib/fieldTrialsApi';
import { fieldTrialLayoutApi } from '@/lib/fieldTrialsApi';

const statusColors = {
  planned: 'bg-yellow-100 text-yellow-800',
  ongoing: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-gray-100 text-gray-800'
};

const TrialDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trial, setTrial] = useState<any>(null);
  const [layout, setLayout] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log('🔍 TrialDetailsPage rendered with ID:', id);

  useEffect(() => {
    const fetchTrial = async () => {
      if (!id) {
        console.log('❌ No ID provided');
        return;
      }
      
      try {
        setLoading(true);
        setError(null);
        
        console.log('🔍 Fetching trial details for ID:', id);
        const trialData = await fieldTrialsApi.getFieldTrialWithDetails(id);
        
        if (trialData) {
          console.log('✅ Trial data fetched:', trialData);
          setTrial(trialData);
          // Fetch layout if available
          try {
            const layoutData = await fieldTrialLayoutApi.getLayout(id);
            setLayout(layoutData);
          } catch {}
        } else {
          console.log('❌ Trial not found');
          setError('Trial not found');
        }
      } catch (err: any) {
        console.error('❌ Error fetching trial:', err);
        setError(err.message || 'Failed to fetch trial details');
      } finally {
        setLoading(false);
      }
    };

    fetchTrial();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading trial details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !trial) {
    return (
      <div className="max-w-6xl mx-auto py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
          <ChevronLeft className="w-4 h-4 mr-1" />Back to Trials
        </Button>
        <Card>
          <CardContent className="text-center py-8">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Trial Not Found</h2>
            <p className="text-gray-600 mb-4">
              {error || 'The trial you are looking for does not exist or has been removed.'}
            </p>
            <Button onClick={() => navigate('/agronomist/field-trials')}>
              Return to Field Trials
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 space-y-8">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-2">
        <ChevronLeft className="w-4 h-4 mr-1" />Back to Trials
      </Button>
      
      {/* Header */}
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2">
          <div>
            <CardTitle className="text-2xl flex items-center gap-2">
              {trial.name} 
              <Badge className={statusColors[trial.status] || 'bg-gray-100 text-gray-800'}>
                {trial.status}
              </Badge>
            </CardTitle>
            <CardDescription>
              Trial Code: {trial.trial_code} | Category: {(trial.trial_category && trial.trial_category !== 'null' && trial.trial_category !== 'undefined' && trial.trial_category.trim() !== '') ? trial.trial_category : 'Not specified'}
            </CardDescription>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {trial.farm_name}
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {trial.field_location}
              </div>
              {trial.gps_coordinates && (
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  GPS: {trial.gps_coordinates}
                </div>
              )}
              {trial.trial_area && (
                <div className="flex items-center">
                  <Map className="w-4 h-4 mr-1" />
                  Area: {trial.trial_area} ha
                </div>
              )}
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {trial.start_date} - {trial.end_date}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="outline">Crop: {trial.crop}</Badge>
              {trial.variety_hybrid && (
                <Badge variant="outline">Variety: {trial.variety_hybrid}</Badge>
              )}
              <Badge variant="outline">Type: {trial.trial_type}</Badge>
              <Badge variant="outline">Season: {trial.season}</Badge>
            </div>
            <div className="text-xs text-gray-700 mt-2">
              <span className="font-medium">Objective:</span> {trial.objective}
            </div>
            {trial.tags && trial.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {trial.tags.map(tag => (
                  <Badge key={tag} variant="secondary">
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Trial Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-blue-600">{trial.treatments?.length ?? 0}</CardTitle>
            <CardDescription>Treatments</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-green-600">{trial.variables?.length ?? 0}</CardTitle>
            <CardDescription>Variables</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-purple-600">{layout?.replications ?? trial.replications ?? 0}</CardTitle>
            <CardDescription>Replications</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-orange-600">{trial.plots?.length ?? 0}</CardTitle>
            <CardDescription>Total Plots</CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Treatments & Variables */}
      <Card>
        <CardHeader>
          <CardTitle>Treatments & Variables</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div>
              <div className="font-semibold mb-1">Treatments:</div>
              {trial.treatments?.length > 0 ? (
                <ul className="list-disc ml-5">
                  {trial.treatments.map((t: any) => (
                    <li key={t.id}>{t.name}</li>
                  ))}
                </ul>
              ) : <span className="text-gray-500">None</span>}
            </div>
            <div>
              <div className="font-semibold mb-1">Variables:</div>
              {trial.variables?.length > 0 ? (
                <ul className="list-disc ml-5">
                  {trial.variables.map((v: any) => (
                    <li key={v.id}>{v.name} {v.unit && <span className="text-xs text-gray-500">({v.unit})</span>}</li>
                  ))}
                </ul>
              ) : <span className="text-gray-500">None</span>}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Layout Details */}
      {layout && (
        <Card>
          <CardHeader>
            <CardTitle>Layout Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div>Design Type: <span className="font-semibold">{layout.design_type || '-'}</span></div>
              <div>Replications: <span className="font-semibold">{layout.replications ?? '-'}</span></div>
              <div>Plot Size: <span className="font-semibold">{layout.plot_width} × {layout.plot_length} {layout.plot_unit}</span></div>
              <div>Row Spacing: <span className="font-semibold">{layout.row_spacing ?? '-'}</span></div>
              <div>Total Plots: <span className="font-semibold">{layout.total_plots ?? '-'}</span></div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Plots */}
      <Card>
        <CardHeader>
          <CardTitle>Plots</CardTitle>
        </CardHeader>
        <CardContent>
          {trial.plots?.length > 0 ? (
            <ul className="list-disc ml-5">
              {trial.plots.map((p: any) => (
                <li key={p.id}>Plot #{p.plot_number} {p.treatment && <span>- Treatment: {p.treatment}</span>} {p.repetition && <span>- Rep: {p.repetition}</span>}</li>
              ))}
            </ul>
          ) : <span className="text-gray-500">No plots defined</span>}
        </CardContent>
      </Card>

      {/* Team */}
      {trial.teams && trial.teams.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Team</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc ml-5">
              {trial.teams.map((member: any) => (
                <li key={member.id}>{member.user?.name || member.user_id} <span className="text-xs text-gray-500">({member.role})</span></li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Attachments */}
      {trial.attachments && trial.attachments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Attachments</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc ml-5">
              {trial.attachments.map((a: any) => (
                <li key={a.id}><a href={a.file_path} target="_blank" rel="noopener noreferrer">{a.file_name}</a> <span className="text-xs text-gray-500">({a.file_type}, {a.file_size} bytes)</span></li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Notes */}
      {trial.notes && trial.notes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc ml-5">
              {trial.notes.map((n: any) => (
                <li key={n.id}><span className="font-semibold">{n.title}</span>: {n.content}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Navigation to Modules */}
      <Card>
        <CardHeader>
          <CardTitle>Field Trial Modules</CardTitle>
          <CardDescription>Access all trial management and analysis tools</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-24 flex flex-col items-center justify-center gap-2"
              onClick={() => navigate(`/app/agronomist/field-trials/${trial.id}/treatments`)}
            >
              <Package className="w-6 h-6" />
              <span className="text-sm font-medium">Variables & Treatments</span>
              <span className="text-xs text-gray-500">Design & Manage</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-24 flex flex-col items-center justify-center gap-2"
              onClick={() => navigate(`/app/agronomist/field-trials/${trial.id}/data-collection`)}
            >
              <Database className="w-6 h-6" />
              <span className="text-sm font-medium">Data Collection</span>
              <span className="text-xs text-gray-500">Enter & Manage Data</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-24 flex flex-col items-center justify-center gap-2"
              onClick={() => navigate(`/app/agronomist/field-trials/${trial.id}/analytics/analysis`)}
            >
              <BarChart3 className="w-6 h-6" />
              <span className="text-sm font-medium">Analytics</span>
              <span className="text-xs text-gray-500">Charts & Visualizations</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-24 flex flex-col items-center justify-center gap-2"
              onClick={() => navigate(`/app/agronomist/field-trials/${trial.id}/reports`)}
            >
              <Calculator className="w-6 h-6" />
              <span className="text-sm font-medium">Reports</span>
              <span className="text-xs text-gray-500">Generate Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrialDetailsPage; 