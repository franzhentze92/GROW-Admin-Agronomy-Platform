import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Save, X as Close, Calendar, User, Target, FileText, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { fieldTrialsApi, fieldTrialTreatmentApi, fieldTrialVariableApi, fieldTrialLayoutApi, fieldTrialDataApi, fieldTrialPlotApi } from '@/lib/fieldTrialsApi';
import { supabase } from '@/lib/supabaseClient';

const STATUS_OPTIONS = [
  { value: 'active', label: 'Active', color: 'default' },
  { value: 'completed', label: 'Completed', color: 'green' },
  { value: 'cancelled', label: 'Cancelled', color: 'red' },
];

const ENTRIES_PER_PAGE = 10;

const DataCollectionManager = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [trial, setTrial] = useState(null);
  const [treatments, setTreatments] = useState([]);
  const [variables, setVariables] = useState([]);
  const [dataEntries, setDataEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allTrials, setAllTrials] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [cropFilter, setCropFilter] = useState("all");

  // Dialog state
  const [showEntryDialog, setShowEntryDialog] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);

  // Data Summary filter state
  const [filterDate, setFilterDate] = useState('__all__');
  const [filterPlot, setFilterPlot] = useState('__all__');
  const [filterVariable, setFilterVariable] = useState('__all__');
  const [filterCollector, setFilterCollector] = useState('__all__');

  const [currentPage, setCurrentPage] = useState(1);

  const [plots, setPlots] = useState([]);

  // Add/Edit Entry Dialog state: add selectedVariableId and selectedValue
  const [selectedVariableId, setSelectedVariableId] = useState('');
  const [selectedValue, setSelectedValue] = useState('');

  // Fetch all trials if no id
  useEffect(() => {
    if (!id) {
      setLoading(true);
      fieldTrialsApi.getFieldTrialsPublic()
        .then(async data => {
          // For each trial, fetch layout, treatments, variables, and data entries count
          const trialsWithExtras = await Promise.all(data.map(async trial => {
            const [layout, treatments, variables, dataEntriesData] = await Promise.all([
              fieldTrialLayoutApi.getLayout(trial.id).catch(() => null),
              fieldTrialTreatmentApi.getTreatments(trial.id).catch(() => []),
              fieldTrialVariableApi.getVariables(trial.id).catch(() => []),
              fieldTrialDataApi.getData(trial.id).catch(() => [])
            ]);
            return {
              ...trial,
              layout,
              treatments_count: treatments.length,
              variables_count: variables.length,
              data_entries_count: dataEntriesData.length
            };
          }));
          setAllTrials(trialsWithExtras);
        })
        .catch(e => setError(e.message))
        .finally(() => setLoading(false));
      return;
    }
  }, [id]);

  // Fetch trial, treatments, variables, and data entries
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    Promise.all([
      fieldTrialsApi.getFieldTrial(id),
      fieldTrialTreatmentApi.getTreatments(id),
      fieldTrialVariableApi.getVariables(id),
      fieldTrialDataApi.getData(id)
    ]).then(([trialData, treatmentsData, variablesData, dataEntriesData]) => {
      setTrial(trialData);
      setTreatments(treatmentsData);
      setVariables(variablesData);
      setDataEntries(dataEntriesData);
    }).catch(e => setError(e.message)).finally(() => setLoading(false));
  }, [id]);

  // Fetch plots for the trial
  useEffect(() => {
    if (!id) return;
    fieldTrialPlotApi.getPlots(id)
      .then(setPlots)
      .catch(() => setPlots([]));
  }, [id]);

  // Entry handlers
  const handleAddEntry = () => {
    setEditingEntry({ 
      trial_id: id,
      plot_id: '', 
      measurement_date: new Date().toISOString().split('T')[0], 
      notes: '',
    });
    setSelectedVariableId('');
    setSelectedValue('');
    setShowEntryDialog(true);
  };

  const handleEditEntry = (entry) => {
    setEditingEntry({ ...entry });
    setSelectedVariableId(entry.variable_id);
    setSelectedValue(entry.value);
    setShowEntryDialog(true);
  };

  const handleDeleteEntry = async (entryId) => {
    try {
      await fieldTrialDataApi.deleteData(entryId);
      setDataEntries(prev => prev.filter(e => e.id !== entryId));
    } catch (e) {
      setError(e.message);
    }
  };

  const isValidUUID = (str) => /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(str);

  const handleSaveEntry = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const userId = user?.id || '';
      if (!userId) throw new Error('User not authenticated');
      const { plot_id, measurement_date, notes } = editingEntry;
      if (!plot_id || !isValidUUID(plot_id)) {
        setError('Please select a valid plot.');
        return;
      }
      if (!measurement_date) {
        setError('Please select a measurement date.');
        return;
      }
      if (!selectedVariableId || !isValidUUID(selectedVariableId)) {
        setError('Please select a variable.');
        return;
      }
      if (!selectedValue || selectedValue.toString().trim() === '') {
        const variable = variables.find(v => v.id === selectedVariableId);
        setError(`Please enter a value for ${variable?.name || 'the variable'}.`);
        return;
      }
      const entryToSave = {
        trial_id: id,
        plot_id,
        variable_id: selectedVariableId,
        value: selectedValue,
        measurement_date,
        notes,
        recorded_by: userId
      };
      if (editingEntry.id) {
        // Update existing entry
        const updatedEntry = await fieldTrialDataApi.updateData(editingEntry.id, entryToSave);
        setDataEntries(prev => prev.map(e => (e.id === editingEntry.id ? updatedEntry : e)));
      } else {
        // Create new entry
        const createdEntry = await fieldTrialDataApi.createData(entryToSave);
        setDataEntries(prev => [...prev, createdEntry]);
      }
      setShowEntryDialog(false);
      setEditingEntry(null);
      setSelectedVariableId('');
      setSelectedValue('');
      setError(null);
    } catch (e) {
      setError(e.message);
      console.error('Error saving entry:', e);
      alert('Error saving entry: ' + (e.message || e));
    }
  };

  // Helper functions to map IDs to names/units
  const getPlotName = (id) => plots.find(p => p.id === id)?.plot_number || id;
  const getPlotTreatment = (id) => {
    const plot = plots.find(p => p.id === id);
    return plot?.treatment || '';
  };
  const getVariable = (id) => variables.find(v => v.id === id) || {};

  if (!id) {
    if (loading) return <div className="p-8 text-gray-500">Loading...</div>;
    if (error) return <div className="p-8 text-red-600">{error}</div>;
    
    // Calculate KPIs
    const totalTrials = allTrials.length;
    const activeTrials = allTrials.filter(t => t.status === 'active').length;
    const completedTrials = allTrials.filter(t => t.status === 'completed').length;
    const trialsWithData = allTrials.filter(t => t.data_entries_count > 0).length;
    
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
        <h1 className="text-2xl font-bold mb-6">Data Collection & Entry Management</h1>
        
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
            <Card key={trial.id} className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-gray-200 rounded-xl p-4 bg-white flex flex-col justify-between min-h-[220px]" onClick={() => navigate(`/app/agronomist/field-trials/${trial.id}/data-collection`)}>
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
                  <span className="bg-purple-50 px-2 py-1 rounded">Data Entries: <b>{trial.data_entries_count}</b></span>
                  <span className="bg-yellow-50 px-2 py-1 rounded">Layout: {trial.layout?.design_type || '—'} | {trial.layout?.replications || '—'} reps</span>
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

  // Compute unique filter options for data entries
  const uniqueDates = Array.from(new Set(dataEntries.map(e => e.measurement_date)));
  const uniquePlots = Array.from(new Set(dataEntries.map(e => e.plot_id)));
  const uniqueVariables = Array.from(new Set(dataEntries.map(e => e.variable_id)));
  const uniqueCollectors = Array.from(new Set(dataEntries.map(e => e.collector_name)));

  // Filtered entries for summary
  const filteredEntries = dataEntries.filter(e =>
    (filterDate === '__all__' || e.measurement_date === filterDate) &&
    (filterPlot === '__all__' || e.plot_id === filterPlot) &&
    (filterVariable === '__all__' || e.variable_id === filterVariable) &&
    (filterCollector === '__all__' || e.collector_name === filterCollector)
  );

  // Sort entries by date descending
  const sortedEntries = [...filteredEntries].sort((a, b) => new Date(b.measurement_date).getTime() - new Date(a.measurement_date).getTime());
  const totalPages = Math.ceil(sortedEntries.length / ENTRIES_PER_PAGE);

  return (
    <div className="max-w-6xl mx-auto py-8 space-y-8">
      <Button variant="ghost" onClick={() => navigate('/app/agronomist/field-trials/data-collection')} className="mb-4">
        Back to All Trials
      </Button>
      
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>{trial.name} – Data Collection & Entry Management</CardTitle>
          <CardDescription>Manage data collection entries for this trial.</CardDescription>
          <div className="flex items-center gap-4 mt-2">
            <span>Status:</span>
            <Badge variant={trial.status === 'completed' ? 'success' : trial.status === 'cancelled' ? 'destructive' : 'default'}>
              {trial.status.charAt(0).toUpperCase() + trial.status.slice(1)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {/* Trial Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="p-4">
              <div className="text-2xl font-bold text-blue-600">{treatments.length}</div>
              <div className="text-sm text-gray-600">Treatments</div>
            </Card>
            <Card className="p-4">
              <div className="text-2xl font-bold text-green-600">{variables.length}</div>
              <div className="text-sm text-gray-600">Variables</div>
            </Card>
            <Card className="p-4">
              <div className="text-2xl font-bold text-purple-600">{dataEntries.length}</div>
              <div className="text-sm text-gray-600">Data Entries</div>
            </Card>
            <Card className="p-4">
              <div className="text-2xl font-bold text-orange-600">{uniqueDates.length}</div>
              <div className="text-sm text-gray-600">Collection Dates</div>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Data Collection Entries */}
      <Card>
        <CardHeader>
          <CardTitle>Data Collection Entries</CardTitle>
          <CardDescription>Manage data collection entries for {trial.name}</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filter Bar for Data Summary */}
          <div className="flex flex-wrap gap-4 mb-4">
            <div>
              <Label className="text-sm font-medium">Date</Label>
              <Select value={filterDate} onValueChange={setFilterDate}>
                <SelectTrigger className="w-32">
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
              <Label className="text-sm font-medium">Plot</Label>
              <Select value={filterPlot} onValueChange={setFilterPlot}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="All plots" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__all__">All plots</SelectItem>
                  {uniquePlots.map(plotId => {
                    const plot = plots.find(p => p.id === plotId);
                    return (
                      <SelectItem key={plotId} value={plotId}>
                        {plot ? plot.plot_number : plotId}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium">Variable</Label>
              <Select value={filterVariable} onValueChange={setFilterVariable}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="All variables" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__all__">All variables</SelectItem>
                  {uniqueVariables.map(variableId => {
                    const variable = variables.find(v => v.id === variableId);
                    return (
                      <SelectItem key={variableId} value={variableId}>
                        {variable ? `${variable.name} (${variable.unit})` : variableId}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button onClick={handleAddEntry}>Add Entry</Button>
            </div>
          </div>

          {/* Data Summary Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Plot</TableHead>
                  <TableHead>Variable</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedEntries.slice((currentPage - 1) * ENTRIES_PER_PAGE, currentPage * ENTRIES_PER_PAGE).map((entry, idx) => (
                  <TableRow key={entry.id}>
                    <TableCell>{entry.measurement_date}</TableCell>
                    <TableCell>{getPlotName(entry.plot_id)}</TableCell>
                    <TableCell>{getVariable(entry.variable_id).name}</TableCell>
                    <TableCell>{entry.value}</TableCell>
                    <TableCell>{getVariable(entry.variable_id).unit}</TableCell>
                    <TableCell className="max-w-xs truncate">{entry.notes}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditEntry(entry)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteEntry(entry.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-600">
                Showing {((currentPage - 1) * ENTRIES_PER_PAGE) + 1} to {Math.min(currentPage * ENTRIES_PER_PAGE, sortedEntries.length)} of {sortedEntries.length} entries
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Entry Dialog */}
      <Dialog open={showEntryDialog} onOpenChange={setShowEntryDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Data Entry for All Variables</DialogTitle>
            <DialogDescription>
              Enter data for all variables for a single plot and date
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Plot</Label>
                <Select
                  value={editingEntry?.plot_id || ''}
                  onValueChange={val => setEditingEntry({ ...editingEntry, plot_id: val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select plot" />
                  </SelectTrigger>
                  <SelectContent>
                    {plots.map(plot => (
                      <SelectItem key={plot.id} value={plot.id}>
                        {plot.plot_number} {plot.treatment ? `(${plot.treatment})` : ''}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Measurement Date</Label>
                <Input
                  type="date"
                  value={editingEntry?.measurement_date || ''}
                  onChange={e => setEditingEntry({ ...editingEntry, measurement_date: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Notes</Label>
                <Textarea
                  value={editingEntry?.notes || ''}
                  onChange={e => setEditingEntry({ ...editingEntry, notes: e.target.value })}
                  placeholder="Enter any additional notes"
                  rows={2}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Variable</Label>
              <Select
                value={selectedVariableId}
                onValueChange={val => setSelectedVariableId(val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select variable" />
                </SelectTrigger>
                <SelectContent>
                  {variables.map(variable => (
                    <SelectItem key={variable.id} value={variable.id}>
                      {variable.name} ({variable.unit})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Label>Value</Label>
              <Input
                type="text"
                value={selectedValue}
                onChange={e => setSelectedValue(e.target.value)}
                placeholder="Enter value"
                disabled={!selectedVariableId}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowEntryDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEntry}>
              Save All Entries
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DataCollectionManager;
