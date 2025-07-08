import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar, MapPin, Users, TrendingUp, Plus, Search, Filter, MoreHorizontal, DollarSign, Clock, CheckCircle, AlertCircle, Edit, Trash2, Map, FileText, Package, Database, BarChart3, Calculator, Target } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import FieldDesigner from '@/components/fieldTrials/FieldDesigner';
import { TrialFormDialog } from '@/components/fieldTrials/TrialFormDialog';
import { useNavigate } from 'react-router-dom';
import { fieldTrialsApi, fieldTrialTreatmentApi, fieldTrialVariableApi, fieldTrialPlotApi, fieldTrialTeamApi, fieldTrialLayoutApi } from '@/lib/fieldTrialsApi';
import { fetchAllUsers } from '@/lib/userApi';

const FieldTrialsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [cropFilter, setCropFilter] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedTrial, setSelectedTrial] = useState(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [collaboratorIds, setCollaboratorIds] = useState<number[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showTaskDialog, setShowTaskDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    assignee: '',
    priority: 'medium',
    status: 'pending'
  });
  const [showFieldDesigner, setShowFieldDesigner] = useState(false);
  const [selectedTrialForDesign, setSelectedTrialForDesign] = useState(null);
  const navigate = useNavigate();
  const [trials, setTrials] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [editTrial, setEditTrial] = useState(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [deleteTrial, setDeleteTrial] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Full crop list for filter
  const cropOptions = [
    'Corn', 'Soybeans', 'Wheat', 'Cotton', 'Barley', 'Oats', 'Rye', 'Sorghum', 'Rice', 'Canola', 'Sunflower', 'Peanut', 'Sugarcane', 'Potato', 'Tomato', 'Onion', 'Carrot', 'Lettuce', 'Cabbage', 'Broccoli', 'Cauliflower', 'Spinach', 'Peas', 'Beans', 'Chickpea', 'Lentil', 'Alfalfa', 'Clover', 'Pasture', 'Grapes', 'Apple', 'Citrus', 'Banana', 'Pineapple', 'Coffee', 'Tea', 'Other'
  ];

  const cropColors = [
    '#f59e42', // orange
    '#10b981', // green
    '#3b82f6', // blue
    '#f43f5e', // red
    '#6366f1', // indigo
    '#eab308', // yellow
    '#8b5cf6', // purple
    '#14b8a6', // teal
    '#f472b6', // pink
    '#a3e635', // lime
    '#facc15', // amber
    '#38bdf8', // sky
    '#fb7185', // rose
    '#34d399', // emerald
    '#f87171', // light red
    '#818cf8', // violet
    '#fbbf24', // gold
    '#4ade80', // light green
    '#fcd34d', // light yellow
    '#60a5fa', // light blue
  ];

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    // Fetch trials with all related data
    const fetchTrialsWithDetails = async () => {
      try {
        const basicTrials = await fieldTrialsApi.getFieldTrialsPublic();
        console.log('✅ Loaded basic trials:', basicTrials);
        
        // For each trial, fetch related data (treatments, variables, plots, etc.)
        const trialsWithDetails = await Promise.all(
          basicTrials.map(async (trial) => {
            try {
              const [treatments, variables, plots, teamMembers, layout] = await Promise.all([
                fieldTrialTreatmentApi.getTreatments(trial.id).catch(() => []),
                fieldTrialVariableApi.getVariables(trial.id).catch(() => []),
                fieldTrialPlotApi.getPlots(trial.id).catch(() => []),
                fieldTrialTeamApi.getTeamMembers(trial.id).catch(() => []),
                fieldTrialLayoutApi.getLayout(trial.id).catch(() => null)
              ]);
              
              return {
                ...trial,
                treatments,
                variables,
                plots,
                layout,
                collaborators: teamMembers.map(member => ({
                  id: member.user_id,
                  name: member.user?.name || `User ${member.user_id?.slice(0, 8)}`,
                  role: member.role,
                  avatar: member.user?.avatar_url
                }))
              };
            } catch (error) {
              console.warn(`⚠️ Failed to fetch details for trial ${trial.id}:`, error);
              return {
                ...trial,
                treatments: [],
                variables: [],
                plots: [],
                layout: null,
                collaborators: []
              };
            }
          })
        );
        
        console.log('✅ Loaded trials with details:', trialsWithDetails);
        setTrials(trialsWithDetails);
      } catch (err) {
        console.error('❌ Failed to load trials:', err);
        setError(err.message || 'Failed to load trials');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTrialsWithDetails();
  }, []);

  useEffect(() => {
    fetchAllUsers()
      .then(setUsers)
      .catch(() => setUsers([]));
  }, []);

  const filteredTrials = trials.filter(trial => {
    const matchesSearch = (trial.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (trial.location || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || trial.status === statusFilter;
    const matchesCrop = cropFilter === 'all' || trial.crop === cropFilter;
    return matchesSearch && matchesStatus && matchesCrop;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return '🟢';
      case 'planning': return '🟡';
      case 'completed': return '🔵';
      default: return '⚪';
    }
  };

  // Handler for opening trial details
  const handleViewDetails = (trial: any) => {
    setSelectedTrial(trial);
    setShowDetailDialog(true);
  };

  // Handler for collaborator selection (mocked as checkboxes for now)
  const handleCollaboratorToggle = (id: number) => {
    setCollaboratorIds(prev => prev.includes(id) ? prev.filter(cid => cid !== id) : [...prev, id]);
  };

  // Handler for tag selection (mocked as checkboxes for now)
  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const handleAddTask = (trialId: number) => {
    setSelectedTrial(trials.find(t => t.id === trialId));
    setShowTaskDialog(true);
  };

  const handleEditTask = (task: any) => {
    setSelectedTask(task);
    setNewTask({
      title: task.title,
      description: task.description || '',
      dueDate: task.dueDate,
      assignee: task.assignee,
      priority: task.priority,
      status: task.status
    });
    setShowTaskDialog(true);
  };

  const handleSaveTask = () => {
    // Mock save task logic
    setShowTaskDialog(false);
    setSelectedTask(null);
    setNewTask({
      title: '',
      description: '',
      dueDate: '',
      assignee: '',
      priority: 'medium',
      status: 'pending'
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDesignField = (trial: any) => {
    setSelectedTrialForDesign(trial);
    setShowFieldDesigner(true);
  };

  const handleSaveFieldDesign = (design: any) => {
    // Mock save field design logic
    console.log('Saving field design:', design);
    setShowFieldDesigner(false);
    setSelectedTrialForDesign(null);
  };

  // Calculate real data for charts
  const getStatusChartData = () => {
    const statusCounts = trials.reduce((acc, trial) => {
      const status = trial.status || 'unknown';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const colors = {
      ongoing: '#10b981',
      planned: '#f59e0b',
      completed: '#3b82f6',
      unknown: '#6b7280',
      default: '#6b7280'
    };

    return Object.entries(statusCounts).map(([status, count]) => ({
      name: status.charAt(0).toUpperCase() + status.slice(1),
      value: count,
      color: colors[status as keyof typeof colors] || colors.default
    }));
  };

  const getCropChartData = () => {
    const cropCounts = trials.reduce((acc, trial) => {
      const crop = trial.crop || 'Unknown';
      acc[crop] = (acc[crop] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Assign a color to each crop
    return Object.entries(cropCounts).map(([crop, count], idx) => ({
      name: crop,
      trials: count,
      color: cropColors[idx % cropColors.length],
    }));
  };

  // Show loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Field Trials</h1>
            <p className="text-gray-600 mt-1">Manage and track your agricultural research trials</p>
          </div>
          <Button disabled className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            Create Trial
          </Button>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading field trials...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Field Trials</h1>
            <p className="text-gray-600 mt-1">Manage and track your agricultural research trials</p>
          </div>
          <Button onClick={() => setShowCreateDialog(true)} className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            Create Trial
          </Button>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="text-red-600 mb-4">
              <AlertCircle className="w-12 h-12 mx-auto mb-2" />
              <p className="text-lg font-semibold">Error Loading Trials</p>
              <p className="text-sm text-gray-600 mt-1">{error}</p>
            </div>
            <Button onClick={() => window.location.reload()} variant="outline">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Field Trials</h1>
          <p className="text-gray-600 mt-1">Manage and track your agricultural research trials</p>
        </div>
        <Button
          variant="default"
          onClick={() => setShowCreateDialog(true)}
        >
          <Plus className="w-4 h-4 mr-1" /> Create Trial
        </Button>
      </div>

      {/* Enhanced Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-teal-500 to-teal-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Crops</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{
              Array.from(new Set(trials.map(t => t.crop).filter(Boolean))).length
            }</div>
            <p className="text-teal-100 text-sm">Across all trials</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Trials</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{trials.length}</div>
            <p className="text-blue-100 text-sm">Across all crops</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Active Trials</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {trials.filter(t => t.status === 'ongoing').length}
            </div>
            <p className="text-green-100 text-sm">Currently running</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Plots</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {trials.reduce((sum, trial) => sum + (trial.plots?.length || 0), 0)}
            </div>
            <p className="text-orange-100 text-sm">Across all trials</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section - Using Real Data */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Trial Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={getStatusChartData()}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {getStatusChartData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            {/* Custom Legend */}
            <div className="flex gap-4 justify-center mt-4">
              {getStatusChartData().map((entry) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <span style={{
                    display: 'inline-block',
                    width: 16,
                    height: 16,
                    backgroundColor: entry.color,
                    borderRadius: '50%',
                  }} />
                  <span className="text-sm">{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Trials by Crop</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={getCropChartData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="trials">
                  {getCropChartData().map((entry, index) => (
                    <Cell key={`bar-cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            {/* Custom Legend for Crop Colors */}
            <div className="flex gap-4 justify-center mt-4">
              {getCropChartData().map((entry) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <span style={{
                    display: 'inline-block',
                    width: 16,
                    height: 16,
                    backgroundColor: entry.color,
                    borderRadius: '50%',
                  }} />
                  <span className="text-sm">{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Trial Management</CardTitle>
          <CardDescription>Search and filter your field trials</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search trials by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="planning">Planning</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={cropFilter} onValueChange={setCropFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="All Crops" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Crops</SelectItem>
                {cropOptions.map(crop => (
                  <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Enhanced Trials Table */}
          <div className="space-y-4">
            {filteredTrials.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Target className="w-16 h-16 mx-auto mb-4" />
                  <p className="text-lg font-semibold">No Field Trials Found</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {searchTerm || statusFilter !== 'all' || cropFilter !== 'all' 
                      ? 'Try adjusting your search or filters' 
                      : 'Get started by creating your first field trial'}
                  </p>
                </div>
                {!searchTerm && statusFilter === 'all' && cropFilter === 'all' && (
                  <Button onClick={() => setShowCreateDialog(true)} className="bg-green-600 hover:bg-green-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Trial
                  </Button>
                )}
              </div>
            ) : (
              filteredTrials.map((trial) => (
              <Card key={trial.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{trial.name || 'Unnamed Trial'}</h3>
                        <Badge className={getStatusColor(trial.status || 'pending')}>{trial.status || 'pending'}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {trial.farm_name || trial.field_location || 'No location'}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {trial.start_date || 'No start date'} - {trial.end_date || 'No end date'}
                        </div>
                      </div>
                      
                      {/* Trial Details */}
                      <div className="flex flex-wrap gap-2 mb-2">
                        <Badge variant="outline">Code: {trial.trial_code}</Badge>
                        <Badge variant="outline">Crop: {trial.crop}</Badge>
                        {trial.variety_hybrid && <Badge variant="outline">Variety: {trial.variety_hybrid}</Badge>}
                        <Badge variant="outline">Type: {trial.trial_type}</Badge>
                        <Badge variant="outline">Season: {trial.season}</Badge>
                        {trial.trial_category && <Badge variant="outline">Category: {trial.trial_category}</Badge>}
                      </div>

                      {/* Trial Details */}
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <div className="text-lg font-bold text-teal-600">{
                            Array.from(new Set(trials.map(t => t.crop).filter(Boolean))).length
                          }</div>
                          <div className="text-xs text-gray-600">Total Crops</div>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <div className="text-lg font-bold text-blue-600">{trial.treatments?.length || 0}</div>
                          <div className="text-xs text-gray-600">Treatments</div>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <div className="text-lg font-bold text-green-600">{trial.variables?.length || 0}</div>
                          <div className="text-xs text-gray-600">Variables</div>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <div className="text-lg font-bold text-purple-600">{trial.layout?.replications ?? 0}</div>
                          <div className="text-xs text-gray-600">Replications</div>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <div className="text-lg font-bold text-orange-600">{trial.plots?.length || 0}</div>
                          <div className="text-xs text-gray-600">Total Plots</div>
                        </div>
                      </div>

                      {/* Treatments Preview */}
                      {trial.treatments && trial.treatments.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold mb-2">Treatments:</h4>
                          <div className="flex flex-wrap gap-1">
                            {trial.treatments.slice(0, 3).map((treatment, index) => (
                              <Badge key={treatment?.id || index} variant="outline" className="text-xs">
                                {treatment?.name || 'Untitled Treatment'}
                              </Badge>
                            ))}
                            {trial.treatments.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{trial.treatments.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Variables Preview */}
                      {trial.variables && trial.variables.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold mb-2">Variables:</h4>
                          <div className="flex flex-wrap gap-1">
                            {trial.variables.slice(0, 3).map((variable, index) => (
                              <Badge key={variable?.id || index} variant="secondary" className="text-xs">
                                {variable?.name || 'Untitled Variable'} ({variable?.unit || 'N/A'})
                              </Badge>
                            ))}
                            {trial.variables.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{trial.variables.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Navigation Buttons */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => navigate(`/app/agronomist/field-trials/${trial.id}/treatments`)}
                          className="text-xs"
                        >
                          <Package className="w-3 h-3 mr-1" />
                          Variables & Treatments
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => navigate(`/app/agronomist/field-trials/${trial.id}/data-collection`)}
                          className="text-xs"
                        >
                          <Database className="w-3 h-3 mr-1" />
                          Data Collection
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => navigate(`/app/agronomist/field-trials/${trial.id}/analytics/analysis`)}
                          className="text-xs"
                        >
                          <BarChart3 className="w-3 h-3 mr-1" />
                          Analytics
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => navigate(`/app/agronomist/field-trials/${trial.id}/analytics/statistics`)}
                          className="text-xs"
                        >
                          <Calculator className="w-3 h-3 mr-1" />
                          Statistics
                        </Button>
                      </div>
                    </div>
                    {/* Right: Team, Attachments */}
                    <div className="flex flex-col items-end gap-2 min-w-[180px]">
                      {/* Team */}
                      <div className="text-right mb-1">
                        <div className="text-xs font-medium text-gray-900">Team</div>
                        <div className="flex flex-wrap gap-1 justify-end">
                          {(trial.collaborators || []).map((c, index) => (
                            <div key={c?.id || index} className="flex items-center gap-1">
                              <Avatar className="w-5 h-5">
                                <AvatarImage src={c?.avatar} />
                                <AvatarFallback className="text-xs">{c?.name?.split(' ').map(n => n[0]).join('') || 'U'}</AvatarFallback>
                              </Avatar>
                              <span className="text-xs text-gray-600">{c?.name || 'Unknown'}</span>
                              {c?.role && <Badge variant="outline" className="text-[10px]">{c.role}</Badge>}
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* Attachments */}
                      {trial.attachments && trial.attachments.length > 0 ? (
                        <div className="flex items-center gap-1 mt-1">
                          <FileText className="w-4 h-4 text-gray-500" />
                          <span className="text-xs text-gray-600">{trial.attachments.length} attachment{trial.attachments.length > 1 ? 's' : ''}</span>
                        </div>
                      ) : null}
                    </div>
                    {/* Edit/Delete Buttons */}
                    <div className="flex flex-col gap-2 items-end">
                      <Button size="icon" variant="ghost" onClick={() => { setEditTrial(trial); setShowEditDialog(true); }} title="Edit">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => { setDeleteTrial(trial); setShowDeleteDialog(true); }} title="Delete">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button variant="secondary" onClick={() => navigate(`/app/agronomist/field-trials/${trial.id}`)}>
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
          </div>
        </CardContent>
      </Card>

      {/* Create Trial Dialog - Using New Comprehensive Form */}
      <TrialFormDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onSave={async (trialData) => {
          console.log('🚀 Creating trial with data:', trialData);
          setLoading(true);
          setError(null);
          try {
            // Use the detailed creation method to save all related data
            const createdTrial = await fieldTrialsApi.createFieldTrialWithDetails(trialData);
            console.log('✅ Trial created successfully:', createdTrial);
            
            // Refresh trials list with full details
            const basicTrials = await fieldTrialsApi.getFieldTrialsPublic();
            const trialsWithDetails = await Promise.all(
              basicTrials.map(async (trial) => {
                try {
                  const [treatments, variables, plots, teamMembers, layout] = await Promise.all([
                    fieldTrialTreatmentApi.getTreatments(trial.id).catch(() => []),
                    fieldTrialVariableApi.getVariables(trial.id).catch(() => []),
                    fieldTrialPlotApi.getPlots(trial.id).catch(() => []),
                    fieldTrialTeamApi.getTeamMembers(trial.id).catch(() => []),
                    fieldTrialLayoutApi.getLayout(trial.id).catch(() => null)
                  ]);
                  
                  return {
                    ...trial,
                    treatments,
                    variables,
                    plots,
                    layout,
                    collaborators: teamMembers.map(member => ({
                      id: member.user_id,
                      name: member.user?.name || `User ${member.user_id?.slice(0, 8)}`,
                      role: member.role,
                      avatar: member.user?.avatar_url
                    }))
                  };
                } catch (error) {
                  console.warn(`⚠️ Failed to fetch details for trial ${trial.id}:`, error);
                  return {
                    ...trial,
                    treatments: [],
                    variables: [],
                    plots: [],
                    layout: null,
                    collaborators: []
                  };
                }
              })
            );
            setTrials(trialsWithDetails);
            setShowCreateDialog(false);
            
            // Show success message
            console.log('🎉 Trial created and list refreshed!');
          } catch (err: any) {
            console.error('❌ Failed to create trial:', err);
            setError(err.message || 'Failed to create trial');
          } finally {
            setLoading(false);
          }
        }}
        users={users}
        initialData={undefined}
      />

      {/* Task Management Dialog */}
      <Dialog open={showTaskDialog} onOpenChange={setShowTaskDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedTask ? 'Edit Task' : 'Add New Task'}</DialogTitle>
            <DialogDescription>
              {selectedTrial && `Add a task for ${selectedTrial.name}`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="taskTitle">Task Title</Label>
              <Input
                id="taskTitle"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                placeholder="e.g., Weekly soil pH monitoring"
              />
            </div>
            <div>
              <Label htmlFor="taskDescription">Description</Label>
              <Textarea
                id="taskDescription"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                placeholder="Task description..."
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="taskDueDate">Due Date</Label>
                <Input
                  id="taskDueDate"
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="taskAssignee">Assignee</Label>
                <Select value={newTask.assignee} onValueChange={(value) => setNewTask({ ...newTask, assignee: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map(user => (
                      <SelectItem key={user.id} value={user.name}>{user.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="taskPriority">Priority</Label>
                <Select value={newTask.priority} onValueChange={(value) => setNewTask({ ...newTask, priority: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="taskStatus">Status</Label>
                <Select value={newTask.status} onValueChange={(value) => setNewTask({ ...newTask, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <Button variant="outline" onClick={() => setShowTaskDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveTask}>
                {selectedTask ? 'Update Task' : 'Add Task'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Field Designer Dialog */}
      <Dialog open={showFieldDesigner} onOpenChange={setShowFieldDesigner}>
        <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Field Layout Designer</DialogTitle>
            <DialogDescription>
              {selectedTrialForDesign && `Design field layout for ${selectedTrialForDesign.name}`}
            </DialogDescription>
          </DialogHeader>
          {selectedTrialForDesign && (
            <FieldDesigner
              trialId={selectedTrialForDesign.id}
              onSave={handleSaveFieldDesign}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      {showEditDialog && editTrial && (
        <TrialFormDialog
          open={showEditDialog}
          onOpenChange={(open) => { setShowEditDialog(open); if (!open) setEditTrial(null); }}
          onSave={async (updates) => {
            // Only keep valid columns for update
            const validFields = [
              'name', 'trial_code', 'crop', 'variety_hybrid', 'trial_type', 'season',
              'start_date', 'end_date', 'status', 'objective', 'farm_name', 'field_location',
              'gps_coordinates', 'trial_area', 'responsible_agronomist_ids', 'tags',
              'trial_category', 'budget', 'spent', 'completion_percentage',
              'notifications_enabled', 'is_draft'
            ];
            const cleanUpdates = {};
            for (const key of validFields) {
              if (updates[key] !== undefined) cleanUpdates[key] = updates[key];
            }
            await fieldTrialsApi.updateFieldTrial(editTrial.id, cleanUpdates);
            setShowEditDialog(false);
            setEditTrial(null);
            // Refresh trials with full details
            const basicTrials = await fieldTrialsApi.getFieldTrialsPublic();
            const trialsWithDetails = await Promise.all(
              basicTrials.map(async (trial) => {
                try {
                  const [treatments, variables, plots, teamMembers, layout] = await Promise.all([
                    fieldTrialTreatmentApi.getTreatments(trial.id).catch(() => []),
                    fieldTrialVariableApi.getVariables(trial.id).catch(() => []),
                    fieldTrialPlotApi.getPlots(trial.id).catch(() => []),
                    fieldTrialTeamApi.getTeamMembers(trial.id).catch(() => []),
                    fieldTrialLayoutApi.getLayout(trial.id).catch(() => null)
                  ]);
                  
                  return {
                    ...trial,
                    treatments,
                    variables,
                    plots,
                    layout,
                    collaborators: teamMembers.map(member => ({
                      id: member.user_id,
                      name: member.user?.name || `User ${member.user_id?.slice(0, 8)}`,
                      role: member.role,
                      avatar: member.user?.avatar_url
                    }))
                  };
                } catch (error) {
                  console.warn(`⚠️ Failed to fetch details for trial ${trial.id}:`, error);
                  return {
                    ...trial,
                    treatments: [],
                    variables: [],
                    plots: [],
                    layout: null,
                    collaborators: []
                  };
                }
              })
            );
            setTrials(trialsWithDetails);
          }}
          users={users}
          initialData={editTrial}
        />
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && deleteTrial && (
        <Dialog open={showDeleteDialog} onOpenChange={(open) => { setShowDeleteDialog(open); if (!open) setDeleteTrial(null); }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Trial</DialogTitle>
              <DialogDescription>Are you sure you want to delete the trial "{deleteTrial.name}"? This action cannot be undone.</DialogDescription>
            </DialogHeader>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
              <Button variant="destructive" onClick={async () => {
                await fieldTrialsApi.deleteFieldTrial(deleteTrial.id);
                setShowDeleteDialog(false);
                setDeleteTrial(null);
                // Refresh trials with full details
                const basicTrials = await fieldTrialsApi.getFieldTrialsPublic();
                const trialsWithDetails = await Promise.all(
                  basicTrials.map(async (trial) => {
                    try {
                      const [treatments, variables, plots, teamMembers, layout] = await Promise.all([
                        fieldTrialTreatmentApi.getTreatments(trial.id).catch(() => []),
                        fieldTrialVariableApi.getVariables(trial.id).catch(() => []),
                        fieldTrialPlotApi.getPlots(trial.id).catch(() => []),
                        fieldTrialTeamApi.getTeamMembers(trial.id).catch(() => []),
                        fieldTrialLayoutApi.getLayout(trial.id).catch(() => null)
                      ]);
                      
                      return {
                        ...trial,
                        treatments,
                        variables,
                        plots,
                        layout,
                        collaborators: teamMembers.map(member => ({
                          id: member.user_id,
                          name: member.user?.name || `User ${member.user_id?.slice(0, 8)}`,
                          role: member.role,
                          avatar: member.user?.avatar_url
                        }))
                      };
                    } catch (error) {
                      console.warn(`⚠️ Failed to fetch details for trial ${trial.id}:`, error);
                      return {
                        ...trial,
                        treatments: [],
                        variables: [],
                        plots: [],
                        layout: null,
                        collaborators: []
                      };
                    }
                  })
                );
                setTrials(trialsWithDetails);
              }}>Delete</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default FieldTrialsPage;