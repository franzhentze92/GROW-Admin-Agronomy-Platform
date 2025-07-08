import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Filter, Search, Edit, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { format } from 'date-fns';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchNutritionFarmRequests, addNutritionFarmRequest, updateNutritionFarmRequest, deleteNutritionFarmRequest, NutritionFarmRequest } from '@/lib/nutritionFarmsApi';
import KpiCard from '@/components/metrics/KpiCard';
import { MapPin, AlertCircle, CheckCircle2, CircleDot, Truck, Package } from 'lucide-react';

// Mock data
const farms = [
  { id: 1, name: 'Nutrition Farms Yandina' },
  { id: 2, name: 'Nutrition Farms Stanthorpe' }
];
const managers = [
  { id: 1, name: 'Adrian Minotto', farmId: 1 },
  { id: 2, name: 'Graeme Sait', farmId: 1 },
  { id: 3, name: 'Claudia', farmId: 2 },
];
const materials = [
  'Fertilizer', 'Seeds', 'Irrigation Pipe', 'Fuel', 'Pesticide', 'Herbicide', 'Tractor Oil', 'Gloves', 'Twine', 'Other'
];
const statusOptions = ['Pending', 'Prepared', 'In Transit', 'Delivered'];

// Add a color map for status badges
const statusColorMap: Record<string, string> = {
  Pending: 'bg-yellow-500 text-white',
  Prepared: 'bg-blue-500 text-white',
  'In Transit': 'bg-orange-500 text-white',
  Delivered: 'bg-green-500 text-white',
  Completed: 'bg-gray-600 text-white',
};

const NutritionFarmsRequestPage = () => {
  const queryClient = useQueryClient();
  const { data: requests = [], isLoading, error } = useQuery({
    queryKey: ['nutritionFarmRequests'],
    queryFn: fetchNutritionFarmRequests,
  });

  const addMutation = useMutation({
    mutationFn: addNutritionFarmRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['nutritionFarmRequests'] }),
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string, updates: Partial<NutritionFarmRequest> }) => updateNutritionFarmRequest(id, updates),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['nutritionFarmRequests'] }),
  });
  const deleteMutation = useMutation({
    mutationFn: deleteNutritionFarmRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['nutritionFarmRequests'] }),
  });

  const [farmFilter, setFarmFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newRequest, setNewRequest] = useState({
    farm: '',
    manager: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    materials: [{ name: '', quantity: 1, notes: '' }],
    status: 'Pending',
  });
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Filtered requests (exclude 'Completed')
  const filteredRequests = requests.filter(req =>
    req.status !== 'Completed' &&
    (farmFilter === 'all' || req.farm === farmFilter) &&
    (statusFilter === 'all' || req.status === statusFilter) &&
    (!search || req.manager.toLowerCase().includes(search.toLowerCase()) || req.materials.some(m => m.name.toLowerCase().includes(search.toLowerCase())))
  );

  // Calculate KPIs dynamically from requests (exclude 'Completed')
  const visibleRequests = requests.filter(r => r.status !== 'Completed');
  const pendingCount = visibleRequests.filter(r => r.status === 'Pending').length;
  const preparedCount = visibleRequests.filter(r => r.status === 'Prepared').length;
  const inTransitCount = visibleRequests.filter(r => r.status === 'In Transit').length;
  const deliveredCount = visibleRequests.filter(r => r.status === 'Delivered').length;
  const totalRequests = visibleRequests.length;

  const handleAddMaterial = () => {
    setNewRequest({
      ...newRequest,
      materials: [...newRequest.materials, { name: '', quantity: 1, notes: '' }],
    });
  };

  const handleMaterialChange = (idx, field, value) => {
    const updated = [...newRequest.materials];
    updated[idx][field] = value;
    setNewRequest({ ...newRequest, materials: updated });
  };

  const handleRemoveMaterial = (idx) => {
    const updated = [...newRequest.materials];
    updated.splice(idx, 1);
    setNewRequest({ ...newRequest, materials: updated });
  };

  const handleAddRequest = async () => {
    await addMutation.mutateAsync(newRequest);
    setAddDialogOpen(false);
    setNewRequest({
      farm: '',
      manager: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      materials: [{ name: '', quantity: 1, notes: '' }],
      status: 'Pending',
    });
  };

  const handleView = (req) => {
    setSelectedRequest(req);
    setViewDialogOpen(true);
  };
  const handleEdit = (req) => {
    setSelectedRequest({ ...req });
    setEditDialogOpen(true);
  };
  const handleEditChange = (field, value) => {
    setSelectedRequest({ ...selectedRequest, [field]: value });
  };
  const handleEditMaterialChange = (idx, field, value) => {
    const updated = [...selectedRequest.materials];
    updated[idx][field] = value;
    setSelectedRequest({ ...selectedRequest, materials: updated });
  };
  const handleEditSave = async () => {
    if (selectedRequest?.id) {
      await updateMutation.mutateAsync({ id: selectedRequest.id, updates: selectedRequest });
      setEditDialogOpen(false);
      setSelectedRequest(null);
    }
  };

  const handleDelete = async (reqId) => {
    await deleteMutation.mutateAsync(reqId);
    setViewDialogOpen(false);
    setEditDialogOpen(false);
    setSelectedRequest(null);
  };

  // Add these handlers for the edit dialog
  const handleEditAddMaterial = () => {
    setSelectedRequest({
      ...selectedRequest,
      materials: [...selectedRequest.materials, { name: '', quantity: 1, notes: '' }],
    });
  };
  const handleEditRemoveMaterial = (idx) => {
    const updated = [...selectedRequest.materials];
    updated.splice(idx, 1);
    setSelectedRequest({ ...selectedRequest, materials: updated });
  };

  return (
    <div className="max-w-7xl mx-auto py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <h1 className="text-3xl font-bold">Nutrition Farms Request</h1>
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="default" className="flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add Request
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Add Farm Material Request</DialogTitle>
              <DialogDescription>Fill in the details for the new request</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Farm</label>
                <Select value={newRequest.farm} onValueChange={v => setNewRequest({ ...newRequest, farm: v, manager: '' })}>
                  <SelectTrigger><SelectValue placeholder="Select farm" /></SelectTrigger>
                  <SelectContent>
                    {farms.map(farm => <SelectItem key={farm.id} value={farm.name}>{farm.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Manager</label>
                <Select value={newRequest.manager} onValueChange={v => setNewRequest({ ...newRequest, manager: v })}>
                  <SelectTrigger><SelectValue placeholder="Select manager" /></SelectTrigger>
                  <SelectContent>
                    {managers.map(manager => (
                      <SelectItem key={manager.id} value={manager.name}>{manager.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <Input type="date" value={newRequest.date} onChange={e => setNewRequest({ ...newRequest, date: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <Select value={newRequest.status} onValueChange={v => setNewRequest({ ...newRequest, status: v })}>
                  <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                  <SelectContent>
                    {statusOptions.map(status => <SelectItem key={status} value={status}>{status}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Materials</label>
                <div className="space-y-2">
                  {newRequest.materials.map((mat, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <Input type="text" className="w-40" value={mat.name} onChange={e => handleMaterialChange(idx, 'name', e.target.value)} placeholder="Material" />
                      <Input type="number" min={1} className="w-20" value={mat.quantity} onChange={e => handleMaterialChange(idx, 'quantity', e.target.value)} placeholder="Qty" />
                      <Input type="text" className="w-32" value={mat.notes} onChange={e => handleMaterialChange(idx, 'notes', e.target.value)} placeholder="Notes" />
                      {newRequest.materials.length > 1 && (
                        <Button size="icon" variant="ghost" onClick={() => handleRemoveMaterial(idx)}><span className="text-lg">&times;</span></Button>
                      )}
                    </div>
                  ))}
                  <Button size="sm" variant="outline" onClick={handleAddMaterial} className="mt-1">+ Add Material</Button>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="secondary" onClick={() => setAddDialogOpen(false)}>Cancel</Button>
                <Button variant="default" onClick={handleAddRequest} disabled={!newRequest.farm || !newRequest.manager || newRequest.materials.some(m => !m.name)}>
                  Add Request
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <KpiCard
          title="Total Requests"
          value={totalRequests}
          description="All active requests"
          icon={<MapPin className="h-5 w-5 text-muted-foreground" />}
        />
        <KpiCard
          title="Pending"
          value={pendingCount}
          description="Awaiting action"
          icon={<AlertCircle className="h-5 w-5 text-yellow-500" />}
        />
        <KpiCard
          title="Prepared"
          value={preparedCount}
          description="Ready for delivery"
          icon={<Package className="h-5 w-5 text-blue-500" />}
        />
        <KpiCard
          title="In Transit"
          value={inTransitCount}
          description="On the way"
          icon={<Truck className="h-5 w-5 text-orange-500" />}
        />
        <KpiCard
          title="Delivered"
          value={deliveredCount}
          description="Delivered to farm"
          icon={<CheckCircle2 className="h-5 w-5 text-green-500" />}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center mb-4">
        <Select value={farmFilter} onValueChange={setFarmFilter}>
          <SelectTrigger className="w-48"><SelectValue placeholder="Filter by Farm" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Farms</SelectItem>
            {farms.map(farm => <SelectItem key={farm.id} value={farm.name}>{farm.name}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48"><SelectValue placeholder="Filter by Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {statusOptions.map(status => <SelectItem key={status} value={status}>{status}</SelectItem>)}
          </SelectContent>
        </Select>
        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Search manager or material..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-64"
          />
          <Search className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Farm</TableHead>
                  <TableHead>Manager</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Materials</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map(req => (
                  <TableRow key={req.id}>
                    <TableCell>{req.id}</TableCell>
                    <TableCell>{req.farm}</TableCell>
                    <TableCell>{req.manager}</TableCell>
                    <TableCell>{req.date}</TableCell>
                    <TableCell>
                      <ul className="list-disc pl-4">
                        {req.materials.map((mat, idx) => (
                          <li key={idx} className="text-xs">
                            <span className="font-medium">{mat.name}</span> x{mat.quantity} {mat.notes && <span className="text-gray-500">({mat.notes})</span>}
                          </li>
                        ))}
                      </ul>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColorMap[req.status] || 'bg-gray-300 text-gray-800'}>
                        {req.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="icon" variant="ghost" onClick={() => handleView(req)}><Eye className="w-4 h-4" /></Button>
                      <Button size="icon" variant="ghost" onClick={() => handleEdit(req)}><Edit className="w-4 h-4" /></Button>
                      <Button size="icon" variant="ghost" onClick={() => handleDelete(req.id)}><span className="text-red-500">&#10005;</span></Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredRequests.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-gray-500">No requests found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* View Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Request Details</DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-2">
              <div><b>Farm:</b> {selectedRequest.farm}</div>
              <div><b>Manager:</b> {selectedRequest.manager}</div>
              <div><b>Date:</b> {selectedRequest.date}</div>
              <div><b>Status:</b> <Badge>{selectedRequest.status}</Badge></div>
              <div>
                <b>Materials:</b>
                <ul className="list-disc pl-4">
                  {selectedRequest.materials.map((mat, idx) => (
                    <li key={idx} className="text-xs">
                      <span className="font-medium">{mat.name}</span> x{mat.quantity} {mat.notes && <span className="text-gray-500">({mat.notes})</span>}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Request</DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Farm</label>
                <Select value={selectedRequest.farm} onValueChange={v => handleEditChange('farm', v)}>
                  <SelectTrigger><SelectValue placeholder="Select farm" /></SelectTrigger>
                  <SelectContent>
                    {farms.map(farm => <SelectItem key={farm.id} value={farm.name}>{farm.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Manager</label>
                <Select value={selectedRequest.manager} onValueChange={v => handleEditChange('manager', v)}>
                  <SelectTrigger><SelectValue placeholder="Select manager" /></SelectTrigger>
                  <SelectContent>
                    {managers.filter(m => !selectedRequest.farm || farms.find(f => f.name === selectedRequest.farm)?.id === m.farmId).map(manager => (
                      <SelectItem key={manager.id} value={manager.name}>{manager.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <Input type="date" value={selectedRequest.date} onChange={e => handleEditChange('date', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <Select value={selectedRequest.status} onValueChange={v => handleEditChange('status', v)}>
                  <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
                  <SelectContent>
                    {statusOptions.map(status => <SelectItem key={status} value={status}>{status}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Materials</label>
                <div className="space-y-2">
                  {selectedRequest.materials.map((mat, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <Input type="text" className="w-40" value={mat.name} onChange={e => handleEditMaterialChange(idx, 'name', e.target.value)} placeholder="Material" />
                      <Input type="number" min={1} className="w-20" value={mat.quantity} onChange={e => handleEditMaterialChange(idx, 'quantity', e.target.value)} placeholder="Qty" />
                      <Input type="text" className="w-32" value={mat.notes} onChange={e => handleEditMaterialChange(idx, 'notes', e.target.value)} placeholder="Notes" />
                      {selectedRequest.materials.length > 1 && (
                        <Button size="icon" variant="ghost" onClick={() => handleEditRemoveMaterial(idx)}><span className="text-lg">&times;</span></Button>
                      )}
                    </div>
                  ))}
                  <Button size="sm" variant="outline" onClick={handleEditAddMaterial} className="mt-1">+ Add Material</Button>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="secondary" onClick={() => setEditDialogOpen(false)}>Cancel</Button>
                <Button variant="destructive" onClick={() => handleDelete(selectedRequest.id)}>Delete</Button>
                <Button variant="default" onClick={handleEditSave}>Save Changes</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NutritionFarmsRequestPage; 