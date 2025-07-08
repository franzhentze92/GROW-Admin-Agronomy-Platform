import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Plus, Edit, Trash2, Droplets, Thermometer, Leaf, Target, Calendar, Tag, Save, X as Close, Info } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { fieldTrialsApi, fieldTrialTreatmentApi, fieldTrialVariableApi, fieldTrialLayoutApi, fieldTrialPlotApi } from '@/lib/fieldTrialsApi';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Shared mockTrials object (should be imported from a central file in a real app)
const initialTrials = [
  {
    id: 5,
    name: 'Nitrogen Rate Trial – Corn 2025',
    trial_code: 'N-CORN-2025',
    crop: 'Corn',
    season: 'Wet 2025',
    status: 'ongoing',
    treatments: [
      { name: 'Control', description: 'No nitrogen applied', application: 'Soil', rate: '0 kg N/ha', timing: 'Pre-sowing' },
      { name: 'Low N', description: 'Low nitrogen rate', application: 'Soil', rate: '60 kg N/ha', timing: 'Pre-sowing' },
      { name: 'Medium N', description: 'Medium nitrogen rate', application: 'Soil', rate: '120 kg N/ha', timing: 'Pre-sowing' },
      { name: 'High N', description: 'High nitrogen rate', application: 'Soil', rate: '180 kg N/ha', timing: 'Pre-sowing' }
    ],
    variables: [
      { 
        name: 'Yield', 
        unit: 'kg/ha', 
        frequency: 'At harvest',
        description: 'Total grain yield per hectare at physiological maturity'
      },
      { 
        name: 'Plant Height', 
        unit: 'cm', 
        frequency: 'Weekly',
        description: 'Height from soil surface to the tip of the highest leaf'
      },
      { 
        name: 'Leaf Color', 
        unit: 'Score 1–5', 
        frequency: 'Biweekly',
        description: 'Visual assessment of leaf greenness using standardized color chart'
      },
      { 
        name: 'Lodging', 
        unit: '%', 
        frequency: 'At harvest',
        description: 'Percentage of plants that have fallen over or are leaning significantly'
      }
    ],
    replications: 3,
    designType: 'RCBD',
    plotSize: { width: 3, length: 5, unit: 'm' },
    rowSpacing: 75, // cm
    totalPlots: 12
  },
  // ...add more trials as needed
];

const TREATMENT_TYPES = [
  { value: 'control', label: 'Control' },
  { value: 'fertilizer', label: 'Fertilizer' },
  { value: 'pesticide', label: 'Pesticide' },
  { value: 'irrigation', label: 'Irrigation' },
  { value: 'other', label: 'Other' },
];

const VARIABLE_TYPES = [
  { value: 'growth', label: 'Growth' },
  { value: 'yield', label: 'Yield' },
  { value: 'quality', label: 'Quality' },
  { value: 'environmental', label: 'Environmental' },
  { value: 'other', label: 'Other' },
];

const FREQUENCIES = [
  'Daily', 'Weekly', 'Bi-weekly', 'Monthly', 'At planting', 'At harvest', 'Seasonal'
];

const DESIGN_TYPES = ['RCBD', 'Split-Plot', 'Latin Square', 'Factorial', 'Custom'];

const STATUS_OPTIONS = [
  { value: 'ongoing', label: 'Ongoing', color: 'default' },
  { value: 'completed', label: 'Completed', color: 'green' },
  { value: 'cancelled', label: 'Cancelled', color: 'red' },
];

const DESIGN_TYPE_INFO = {
  RCBD: "Randomized Complete Block Design: Good for controlling field variability. Plots are grouped into blocks.",
  "Split-Plot": "Split-Plot Design: Used when one factor is harder to change than others. Main plots and subplots.",
  "Latin Square": "Latin Square Design: Controls for two sources of variation (rows and columns).",
  Factorial: "Factorial Design: Tests combinations of two or more factors simultaneously.",
  Custom: "Custom Design: For unique or non-standard layouts."
};

const TreatmentVariableManager = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [trial, setTrial] = useState(null);
  const [treatments, setTreatments] = useState([]);
  const [variables, setVariables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allTrials, setAllTrials] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [cropFilter, setCropFilter] = useState("all");

  // Dialog state
  const [showTreatmentDialog, setShowTreatmentDialog] = useState(false);
  const [editingTreatment, setEditingTreatment] = useState(null);
  const [showVariableDialog, setShowVariableDialog] = useState(false);
  const [editingVariable, setEditingVariable] = useState(null);

  // Layout editing state
  const [isEditingLayout, setIsEditingLayout] = useState(false);
  const [layout, setLayout] = useState(null);
  const [layoutData, setLayoutData] = useState({
    designType: '',
    replications: 0,
    plotSize: { width: 0, length: 0, unit: 'm' },
    rowSpacing: 0,
    totalPlots: 0
  });

  // Plot state
  const [plots, setPlots] = useState([]);
  const [showPlotDialog, setShowPlotDialog] = useState(false);
  const [editingPlot, setEditingPlot] = useState(null);

  // Fetch all trials if no id
  useEffect(() => {
    if (!id) {
      setLoading(true);
      fieldTrialsApi.getFieldTrialsPublic()
        .then(async data => {
          // For each trial, fetch layout, treatments, and variables count
          const trialsWithExtras = await Promise.all(data.map(async trial => {
            const [layout, treatments, variables] = await Promise.all([
              fieldTrialLayoutApi.getLayout(trial.id).catch(() => null),
              fieldTrialTreatmentApi.getTreatments(trial.id).catch(() => []),
              fieldTrialVariableApi.getVariables(trial.id).catch(() => [])
            ]);
            return {
              ...trial,
              layout,
              treatments_count: treatments.length,
              variables_count: variables.length
            };
          }));
          setAllTrials(trialsWithExtras);
        })
        .catch(e => setError(e.message))
        .finally(() => setLoading(false));
      return;
    }
  }, [id]);

  // Fetch trial, treatments, variables, and layout
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    Promise.all([
      fieldTrialsApi.getFieldTrial(id),
      fieldTrialTreatmentApi.getTreatments(id),
      fieldTrialVariableApi.getVariables(id),
      fieldTrialLayoutApi.getLayout(id).catch(() => null)
    ]).then(([trialData, treatmentsData, variablesData, layoutDataFromDb]) => {
      setTrial(trialData);
      setTreatments(treatmentsData);
      setVariables(variablesData);
      setLayout(layoutDataFromDb);
      setLayoutData(layoutDataFromDb ? {
        designType: layoutDataFromDb.design_type || '',
        replications: layoutDataFromDb.replications || 0,
        plotSize: {
          width: layoutDataFromDb.plot_width || 0,
          length: layoutDataFromDb.plot_length || 0,
          unit: layoutDataFromDb.plot_unit || 'm'
        },
        rowSpacing: layoutDataFromDb.row_spacing || 0,
        totalPlots: layoutDataFromDb.total_plots || 0
      } : {
        designType: '',
        replications: 0,
        plotSize: { width: 0, length: 0, unit: 'm' },
        rowSpacing: 0,
        totalPlots: 0
      });
    }).catch(e => setError(e.message)).finally(() => setLoading(false));
  }, [id]);

  // Fetch plots for the trial
  useEffect(() => {
    if (!id) return;
    fieldTrialPlotApi.getPlots(id)
      .then(setPlots)
      .catch(() => setPlots([]));
  }, [id]);

  // Layout handlers (update layout fields)
  const handleLayoutSave = async () => {
    if (!id) return;
    const layoutPayload = {
      design_type: layoutData.designType,
      replications: layoutData.replications,
      plot_width: layoutData.plotSize.width,
      plot_length: layoutData.plotSize.length,
      plot_unit: layoutData.plotSize.unit,
      row_spacing: layoutData.rowSpacing,
      total_plots: layoutData.totalPlots
    };
    let updatedLayout;
    if (layout && layout.id) {
      updatedLayout = await fieldTrialLayoutApi.updateLayout(layout.id, layoutPayload);
    } else {
      updatedLayout = await fieldTrialLayoutApi.createLayout(id, layoutPayload);
    }
    setLayout(updatedLayout);
    setLayoutData({
      designType: updatedLayout.design_type || '',
      replications: updatedLayout.replications || 0,
      plotSize: {
        width: updatedLayout.plot_width || 0,
        length: updatedLayout.plot_length || 0,
        unit: updatedLayout.plot_unit || 'm'
      },
      rowSpacing: updatedLayout.row_spacing || 0,
      totalPlots: updatedLayout.total_plots || 0
    });
    setIsEditingLayout(false);
  };
  const handleLayoutCancel = () => {
    setLayoutData(layout ? {
      designType: layout.design_type || '',
      replications: layout.replications || 0,
      plotSize: {
        width: layout.plot_width || 0,
        length: layout.plot_length || 0,
        unit: layout.plot_unit || 'm'
      },
      rowSpacing: layout.row_spacing || 0,
      totalPlots: layout.total_plots || 0
    } : {
      designType: '',
      replications: 0,
      plotSize: { width: 0, length: 0, unit: 'm' },
      rowSpacing: 0,
      totalPlots: 0
    });
    setIsEditingLayout(false);
  };

  // Treatment handlers
  const handleAddTreatment = () => {
    setEditingTreatment({ name: '', description: '', application_method: '', rate: '', timing: '' });
    setShowTreatmentDialog(true);
  };
  const handleEditTreatment = (t) => {
    setEditingTreatment({ ...t });
    setShowTreatmentDialog(true);
  };
  const handleDeleteTreatment = async (treatmentId) => {
    await fieldTrialTreatmentApi.deleteTreatment(treatmentId);
    setTreatments(treatments.filter(t => t.id !== treatmentId));
  };
  const handleSaveTreatment = async () => {
    // For edits, use the existing data structure; for new treatments, map application to application_method
    let treatmentToSave;
    
    if (editingTreatment.id) {
      // Edit mode - treatment already has the correct structure from database
      treatmentToSave = { ...editingTreatment };
      delete treatmentToSave.application; // remove any UI field if present
      delete treatmentToSave._editIdx; // remove UI tracking field
    } else {
      // New treatment - map application to application_method
      treatmentToSave = {
        ...editingTreatment,
        application_method: editingTreatment.application, // map UI field
        trial_id: trial.id,
      };
      delete treatmentToSave.application; // remove invalid field
      delete treatmentToSave._editIdx; // remove UI tracking field
    }

    if (editingTreatment.id) {
      const updated = await fieldTrialTreatmentApi.updateTreatment(editingTreatment.id, treatmentToSave);
      setTreatments(treatments.map(t => t.id === updated.id ? updated : t));
    } else {
      const created = await fieldTrialTreatmentApi.createTreatment(treatmentToSave);
      setTreatments([...treatments, created]);
    }
    setShowTreatmentDialog(false);
    setEditingTreatment(null);
  };

  // Variable handlers
  const handleAddVariable = () => {
    setEditingVariable({ name: '', unit: '', frequency: '', description: '' });
    setShowVariableDialog(true);
  };
  const handleEditVariable = (v) => {
    setEditingVariable({ ...v });
    setShowVariableDialog(true);
  };
  const handleDeleteVariable = async (variableId) => {
    await fieldTrialVariableApi.deleteVariable(variableId);
    setVariables(variables.filter(v => v.id !== variableId));
  };
  const handleSaveVariable = async () => {
    // Remove any UI-only fields before sending to database
    const variableToSave = { ...editingVariable };
    delete variableToSave._editIdx; // remove UI tracking field

    if (editingVariable.id) {
      const updated = await fieldTrialVariableApi.updateVariable(editingVariable.id, variableToSave);
      setVariables(variables.map(v => v.id === updated.id ? updated : v));
    } else {
      const created = await fieldTrialVariableApi.createVariable({ ...variableToSave, trial_id: trial.id });
      setVariables([...variables, created]);
    }
    setShowVariableDialog(false);
    setEditingVariable(null);
  };

  // Status update handler
  const handleStatusChange = async (newStatus) => {
    if (!trial) return;
    await fieldTrialsApi.updateFieldTrial(trial.id, { status: newStatus });
    setTrial({ ...trial, status: newStatus });
  };

  // Plot handlers
  const handleAddPlot = () => {
    setEditingPlot({ plot_number: '', treatment: '', repetition: '' });
    setShowPlotDialog(true);
  };
  const handleEditPlot = (plot) => {
    setEditingPlot({ ...plot });
    setShowPlotDialog(true);
  };
  const handleDeletePlot = async (plotId) => {
    await fieldTrialPlotApi.deletePlot(plotId);
    setPlots(plots.filter(p => p.id !== plotId));
  };
  const handleSavePlot = async () => {
    if (editingPlot.id) {
      const updated = await fieldTrialPlotApi.updatePlot(editingPlot.id, editingPlot);
      setPlots(plots.map(p => p.id === updated.id ? updated : p));
    } else {
      const created = await fieldTrialPlotApi.createPlot({ ...editingPlot, trial_id: trial.id });
      setPlots([...plots, created]);
    }
    setShowPlotDialog(false);
    setEditingPlot(null);
  };

  // Show trial picker if no id
  if (!id) {
    if (loading) return <div className="p-8 text-gray-500">Loading...</div>;
    if (error) return <div className="p-8 text-red-600">{error}</div>;
    
    // Get unique values for filters
    const uniqueTypes = [...new Set(allTrials.map(t => t.trial_type).filter(Boolean))];
    const uniqueCrops = [...new Set(allTrials.map(t => t.crop).filter(Boolean))];
    
    const filteredTrials = allTrials.filter(trial => {
      const q = search.toLowerCase();
      const matchesSearch = (
        trial.name?.toLowerCase().includes(q) ||
        trial.trial_code?.toLowerCase().includes(q) ||
        trial.crop?.toLowerCase().includes(q) ||
        trial.variety_hybrid?.toLowerCase().includes(q)
      );
      const matchesStatus = statusFilter === "all" || trial.status === statusFilter;
      const matchesType = typeFilter === "all" || trial.trial_type === typeFilter;
      const matchesCrop = cropFilter === "all" || trial.crop === cropFilter;
      
      return matchesSearch && matchesStatus && matchesType && matchesCrop;
    });
    
    return (
      <div className="max-w-5xl mx-auto py-8 space-y-8">
        <h1 className="text-2xl font-bold mb-6">Select a Trial</h1>
        
        {/* Search Bar */}
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Search by name, code, crop, or variety..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full max-w-md"
          />
        </div>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Label htmlFor="status-filter" className="text-sm font-medium">Status:</Label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger id="status-filter" className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <Label htmlFor="type-filter" className="text-sm font-medium">Type:</Label>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger id="type-filter" className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {uniqueTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <Label htmlFor="crop-filter" className="text-sm font-medium">Crop:</Label>
            <Select value={cropFilter} onValueChange={setCropFilter}>
              <SelectTrigger id="crop-filter" className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Crops</SelectItem>
                {uniqueCrops.map(crop => (
                  <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearch("");
              setStatusFilter("all");
              setTypeFilter("all");
              setCropFilter("all");
            }}
          >
            Clear Filters
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTrials.map(trial => (
            <Card key={trial.id} className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-gray-200 rounded-xl p-4 bg-white flex flex-col justify-between min-h-[220px]" onClick={() => navigate(`/app/agronomist/field-trials/${trial.id}/treatments`)}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-bold">{trial.name}</CardTitle>
                  <Badge variant={trial.status === 'completed' ? 'success' : trial.status === 'cancelled' ? 'destructive' : 'default'}>
                    {trial.status.charAt(0).toUpperCase() + trial.status.slice(1)}
                  </Badge>
                </div>
                <CardDescription className="text-xs mt-1">
                  <div>Code: <span className="font-mono">{trial.trial_code}</span></div>
                  <div>Crop: {trial.crop} | Variety: {trial.variety_hybrid || '—'}</div>
                  <div>Type: {trial.trial_type || '—'} | Season: {trial.season}</div>
                  <div>Location: {trial.farm_name || '—'}, {trial.field_location || ''}</div>
                  <div>Dates: {trial.start_date} – {trial.end_date}</div>
                  <div>Lead Agronomist: {trial.responsible_agronomist_name || '—'}</div>
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 text-xs">
                <div className="flex flex-wrap gap-2 mb-1">
                  <span className="bg-blue-50 px-2 py-1 rounded">Treatments: <b>{trial.treatments_count}</b></span>
                  <span className="bg-green-50 px-2 py-1 rounded">Variables: <b>{trial.variables_count}</b></span>
                  <span className="bg-yellow-50 px-2 py-1 rounded">Layout: {trial.layout?.design_type || '—'} | {trial.layout?.replications || '—'} reps | {trial.layout?.plot_width || '—'}×{trial.layout?.plot_length || '—'} {trial.layout?.plot_unit || ''}</span>
                </div>
              </CardContent>
            </Card>
          ))}
          {filteredTrials.length === 0 && (
            <div className="col-span-2 text-center text-gray-400 py-12">No trials found.</div>
          )}
        </div>
      </div>
    );
  }

  if (loading) return <div className="p-8 text-gray-500">Loading...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;
  if (!trial) return <div className="p-8 text-red-600">Trial not found.</div>;

  return (
    <div className="max-w-5xl mx-auto py-8 space-y-8">
      <Button variant="ghost" onClick={() => navigate('/app/agronomist/field-trials/treatments')} className="mb-4">Back to All Trials</Button>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>{trial.name} – Treatments & Variables</CardTitle>
          <CardDescription>Manage all treatments and variables for this trial.</CardDescription>
          <div className="flex items-center gap-4 mt-2">
            <span>Status:</span>
            <Select value={trial.status} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map(opt => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Badge variant={trial.status === 'completed' ? 'success' : trial.status === 'cancelled' ? 'destructive' : 'default'}>
              {trial.status.charAt(0).toUpperCase() + trial.status.slice(1)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {/* Replications & Layout Section */}
          <div className="mb-6 p-4 border-2 border-blue-200 rounded-lg bg-blue-50">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-lg text-blue-800">📐 Replications & Layout</h3>
              {!isEditingLayout ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditingLayout(true)}
                  className="flex items-center gap-1"
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLayoutSave}
                    className="flex items-center gap-1"
                  >
                    <Save className="h-4 w-4" />
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLayoutCancel}
                    className="flex items-center gap-1"
                  >
                    <Close className="h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              )}
            </div>
            
            {!isEditingLayout ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium text-gray-600">Design Type</div>
                  <div className="text-lg font-semibold">{layoutData.designType}</div>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium text-gray-600">Replications</div>
                  <div className="text-lg font-semibold">{layoutData.replications}</div>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium text-gray-600">Plot Size</div>
                  <div className="text-lg font-semibold">{layoutData.plotSize.width} × {layoutData.plotSize.length} {layoutData.plotSize.unit}</div>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium text-gray-600">Row Spacing</div>
                  <div className="text-lg font-semibold">{layoutData.rowSpacing} cm</div>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium text-gray-600">Total Plots</div>
                  <div className="text-lg font-semibold">{layoutData.totalPlots}</div>
                </div>
              </div>
            ) : (
              <div className="space-y-4 p-4 border rounded-lg bg-white">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="designType">Design Type</Label>
                    <Select
                      value={layoutData.designType}
                      onValueChange={(value) => setLayoutData({ ...layoutData, designType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select design type" />
                      </SelectTrigger>
                      <SelectContent>
                        {DESIGN_TYPES.map((type) => (
                          <SelectItem key={type} value={type} className="flex items-center gap-2">
                            <span>{type}</span>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span tabIndex={0}>
                                    <Info className="w-4 h-4 text-blue-500 ml-1" />
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent side="right" className="max-w-xs">
                                  {DESIGN_TYPE_INFO[type]}
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="replications">Replications</Label>
                    <Input
                      id="replications"
                      type="number"
                      min="1"
                      value={layoutData.replications}
                      onChange={(e) => setLayoutData({ ...layoutData, replications: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>
                
                <div>
                  <Label>Plot Size</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="plotWidth">Plot Width</Label>
                      <Input
                        id="plotWidth"
                        type="number"
                        min="0"
                        value={layoutData.plotSize.width}
                        onChange={e => setLayoutData({
                          ...layoutData,
                          plotSize: { ...layoutData.plotSize, width: parseFloat(e.target.value) || 0 }
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="plotLength">Plot Length</Label>
                      <Input
                        id="plotLength"
                        type="number"
                        min="0"
                        value={layoutData.plotSize.length}
                        onChange={e => setLayoutData({
                          ...layoutData,
                          plotSize: { ...layoutData.plotSize, length: parseFloat(e.target.value) || 0 }
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="plotUnit">Unit</Label>
                      <Select
                        value={layoutData.plotSize.unit}
                        onValueChange={unit => setLayoutData({
                          ...layoutData,
                          plotSize: { ...layoutData.plotSize, unit }
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="m">m</SelectItem>
                          <SelectItem value="ft">ft</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="rowSpacing">Row Spacing (cm)</Label>
                    <Input
                      id="rowSpacing"
                      type="number"
                      step="0.1"
                      value={layoutData.rowSpacing}
                      onChange={(e) => setLayoutData({ ...layoutData, rowSpacing: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="totalPlots">Total Plots</Label>
                    <Input
                      id="totalPlots"
                      type="number"
                      min="1"
                      value={layoutData.totalPlots}
                      onChange={(e) => setLayoutData({ ...layoutData, totalPlots: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Treatments</h3>
              <Button onClick={handleAddTreatment}>Add Treatment</Button>
            </div>
            <table className="min-w-full text-sm border mb-4">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Description</th>
                  <th className="p-2 border">Application</th>
                  <th className="p-2 border">Rate</th>
                  <th className="p-2 border">Timing</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {treatments.map((t, i) => (
                  <tr key={i}>
                    <td className="p-2 border">{t.name}</td>
                    <td className="p-2 border">{t.description}</td>
                    <td className="p-2 border">{t.application_method}</td>
                    <td className="p-2 border">{t.rate}</td>
                    <td className="p-2 border">{t.timing}</td>
                    <td className="p-2 border">
                      <Button size="sm" variant="outline" onClick={() => { setEditingTreatment({ ...t, _editIdx: i }); setShowTreatmentDialog(true); }}>Edit</Button>
                      <Button size="sm" variant="destructive" className="ml-2" onClick={() => handleDeleteTreatment(t.id)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Treatment Dialog */}
            <Dialog open={showTreatmentDialog} onOpenChange={setShowTreatmentDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingTreatment && editingTreatment._editIdx !== undefined ? 'Edit Treatment' : 'Add Treatment'}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Label>Name</Label>
                  <Input value={editingTreatment?.name || ''} onChange={e => setEditingTreatment({ ...editingTreatment, name: e.target.value })} />
                  <Label>Description</Label>
                  <Input value={editingTreatment?.description || ''} onChange={e => setEditingTreatment({ ...editingTreatment, description: e.target.value })} />
                  <Label>Application</Label>
                  <Input value={editingTreatment?.application_method || ''} onChange={e => setEditingTreatment({ ...editingTreatment, application_method: e.target.value })} />
                  <Label>Rate</Label>
                  <Input value={editingTreatment?.rate || ''} onChange={e => setEditingTreatment({ ...editingTreatment, rate: e.target.value })} />
                  <Label>Timing</Label>
                  <Input value={editingTreatment?.timing || ''} onChange={e => setEditingTreatment({ ...editingTreatment, timing: e.target.value })} />
                  <Button onClick={handleSaveTreatment}>Save</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Variables</h3>
              <Button onClick={handleAddVariable}>Add Variable</Button>
            </div>
            <table className="min-w-full text-sm border mb-4">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border">Variable</th>
                  <th className="p-2 border">Unit</th>
                  <th className="p-2 border">Frequency</th>
                  <th className="p-2 border">Description</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {variables.map((v, i) => (
                  <tr key={i}>
                    <td className="p-2 border font-medium">{v.name}</td>
                    <td className="p-2 border">{v.unit}</td>
                    <td className="p-2 border">{v.frequency}</td>
                    <td className="p-2 border text-gray-700">{v.description}</td>
                    <td className="p-2 border">
                      <Button size="sm" variant="outline" onClick={() => { setEditingVariable({ ...v, _editIdx: i }); setShowVariableDialog(true); }}>Edit</Button>
                      <Button size="sm" variant="destructive" className="ml-2" onClick={() => handleDeleteVariable(v.id)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Variable Dialog */}
            <Dialog open={showVariableDialog} onOpenChange={setShowVariableDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingVariable && editingVariable._editIdx !== undefined ? 'Edit Variable' : 'Add Variable'}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Label>Name</Label>
                  <Input value={editingVariable?.name || ''} onChange={e => setEditingVariable({ ...editingVariable, name: e.target.value })} />
                  <Label>Unit</Label>
                  <Input value={editingVariable?.unit || ''} onChange={e => setEditingVariable({ ...editingVariable, unit: e.target.value })} />
                  <Label>Frequency</Label>
                  <Input value={editingVariable?.frequency || ''} onChange={e => setEditingVariable({ ...editingVariable, frequency: e.target.value })} />
                  <Label>Description</Label>
                  <Textarea 
                    value={editingVariable?.description || ''} 
                    onChange={e => setEditingVariable({ ...editingVariable, description: e.target.value })}
                    placeholder="Explain what this variable measures and how it should be collected..."
                  />
                  <Button onClick={handleSaveVariable}>Save</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <Separator className="my-8" />
          {/* Plots Section */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Plots</CardTitle>
              <CardDescription>Manage all plots for this trial. Plots are used for data collection and layout.</CardDescription>
              <Button variant="outline" size="sm" onClick={handleAddPlot} className="mt-2">
                <Plus className="h-4 w-4 mr-1" /> Add Plot
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Plot Number</TableHead>
                    <TableHead>Treatment</TableHead>
                    <TableHead>Repetition</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {plots.map(plot => (
                    <TableRow key={plot.id}>
                      <TableCell>{plot.plot_number}</TableCell>
                      <TableCell>{plot.treatment}</TableCell>
                      <TableCell>{plot.repetition}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => handleEditPlot(plot)}><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeletePlot(plot.id)}><Trash2 className="h-4 w-4" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {plots.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-gray-400">No plots added yet.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          {/* Plot Dialog */}
          <Dialog open={showPlotDialog} onOpenChange={setShowPlotDialog}>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>{editingPlot?.id ? 'Edit Plot' : 'Add Plot'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Plot Number</Label>
                  <Input value={editingPlot?.plot_number || ''} onChange={e => setEditingPlot({ ...editingPlot, plot_number: e.target.value })} />
                </div>
                <div>
                  <Label>Treatment</Label>
                  <Select value={editingPlot?.treatment || ''} onValueChange={val => setEditingPlot({ ...editingPlot, treatment: val })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select treatment" />
                    </SelectTrigger>
                    <SelectContent>
                      {treatments.map(t => (
                        <SelectItem key={t.id} value={t.name}>{t.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Repetition</Label>
                  <Input value={editingPlot?.repetition || ''} onChange={e => setEditingPlot({ ...editingPlot, repetition: e.target.value })} />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setShowPlotDialog(false)}>Cancel</Button>
                <Button onClick={handleSavePlot}>{editingPlot?.id ? 'Update' : 'Save'} Plot</Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
};

export default TreatmentVariableManager; 