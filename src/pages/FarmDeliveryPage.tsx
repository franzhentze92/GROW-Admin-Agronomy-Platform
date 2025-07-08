import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Filter, Search, Truck, Package, Calendar, CheckCircle2, Eye, Edit, Trash } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { format, startOfMonth, endOfMonth, isWithinInterval, parseISO } from 'date-fns';
import KpiCard from '@/components/metrics/KpiCard';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchFarmDeliveries, addFarmDelivery, updateFarmDelivery, deleteFarmDelivery, FarmDelivery } from '@/lib/farmDeliveriesApi';

// Add staff options for dropdowns
const staff = [
  'Karl', 'Claudia', 'Adrian Minotto', 'Graeme Sait', 'Office Staff', 'Other'
];

const farms = [
  { id: 1, name: 'Nutrition Farms Yandina' },
  { id: 2, name: 'Nutrition Farms Stanthorpe' }
];

const initialDeliveries = [
  {
    id: '1',
    farm: 'Nutrition Farms Yandina',
    date: '2024-07-01',
    produce: 'Ginger 50kg, Pumpkin 30kg',
    deliveredBy: 'Karl',
    receivedBy: 'Office Staff',
    notes: 'All fresh',
  },
  {
    id: '2',
    farm: 'Nutrition Farms Stanthorpe',
    date: '2024-07-02',
    produce: 'Tomato 20kg',
    deliveredBy: 'Claudia',
    receivedBy: 'Office Staff',
    notes: '',
  },
];

// Helper functions for produce serialization
function serializeProduce(produceArr: { name: string; quantity: string }[]): string {
  return produceArr
    .filter(p => p.name && p.quantity)
    .map(p => `${p.name} ${p.quantity}`)
    .join(', ');
}
function parseProduce(produceStr: string): { name: string; quantity: string }[] {
  if (!produceStr) return [{ name: '', quantity: '' }];
  return produceStr.split(',').map(item => {
    const match = item.trim().match(/^(.*?)\s+(\S+)$/);
    return match ? { name: match[1], quantity: match[2] } : { name: item.trim(), quantity: '' };
  });
}

// Define types for form state
interface DeliveryFormState {
  farm: string;
  date: string;
  produce: { name: string; quantity: string }[];
  delivered_by: string;
  received_by: string;
  notes: string;
}

const FarmDeliveryPage = () => {
  const queryClient = useQueryClient();
  const { data: deliveries = [], isLoading, error } = useQuery({
    queryKey: ['farmDeliveries'],
    queryFn: fetchFarmDeliveries,
  });

  // Add mutation for creating deliveries
  const addDeliveryMutation = useMutation({
    mutationFn: addFarmDelivery,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['farmDeliveries'] });
    },
  });

  const [farmFilter, setFarmFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newDelivery, setNewDelivery] = useState<DeliveryFormState>({
    farm: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    produce: [{ name: '', quantity: '' }],
    delivered_by: '',
    received_by: '',
    notes: '',
  });

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState<(FarmDelivery & { produce: { name: string; quantity: string }[] }) | null>(null);

  const updateDeliveryMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<FarmDelivery> }) => updateFarmDelivery(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['farmDeliveries'] });
    },
  });

  const deleteDeliveryMutation = useMutation({
    mutationFn: (id: string) => deleteFarmDelivery(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['farmDeliveries'] });
    },
  });

  // Filtered deliveries
  const filteredDeliveries = deliveries.filter(delivery =>
    (farmFilter === 'all' || delivery.farm === farmFilter) &&
    (!search || delivery.delivered_by.toLowerCase().includes(search.toLowerCase()) || delivery.produce.toLowerCase().includes(search.toLowerCase()))
  );

  // Calculate total deliveries and deliveries this month
  const now = new Date();
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);
  const deliveriesThisMonth = deliveries.filter(d => {
    const date = parseISO(d.date);
    return isWithinInterval(date, { start: monthStart, end: monthEnd });
  });

  // Calculate deliveries for this month per farm
  const deliveriesPerFarm = farms.map(farm => ({
    farm: farm.name,
    count: deliveriesThisMonth.filter(d => d.farm === farm.name).length
  }));

  const handleAddDelivery = async () => {
    try {
      await addDeliveryMutation.mutateAsync({
        ...newDelivery,
        produce: serializeProduce(newDelivery.produce),
      });
      setAddDialogOpen(false);
      setNewDelivery({
        farm: '',
        date: format(new Date(), 'yyyy-MM-dd'),
        produce: [{ name: '', quantity: '' }],
        delivered_by: '',
        received_by: '',
        notes: '',
      });
    } catch (error) {
      console.error('Failed to add delivery:', error);
      // You might want to show a toast notification here
    }
  };

  const openEditDialog = (delivery: FarmDelivery) => {
    setSelectedDelivery({ ...delivery, produce: parseProduce(typeof delivery.produce === 'string' ? delivery.produce : '') });
    setEditDialogOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <h1 className="text-3xl font-bold">Farm Delivery</h1>
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="default" className="flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add New
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Add Farm Delivery</DialogTitle>
              <DialogDescription>Fill in the details for the new delivery</DialogDescription>
            </DialogHeader>
            <div>
              <label className="block text-sm font-medium mb-1">Farm</label>
              <Select value={newDelivery.farm} onValueChange={v => setNewDelivery({ ...newDelivery, farm: v })}>
                <SelectTrigger><SelectValue placeholder="Select farm" /></SelectTrigger>
                <SelectContent>
                  {farms.map(farm => <SelectItem key={farm.id} value={farm.name}>{farm.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <Input type="date" value={newDelivery.date} onChange={e => setNewDelivery({ ...newDelivery, date: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Delivered By</label>
              <Select value={newDelivery.delivered_by} onValueChange={v => setNewDelivery({ ...newDelivery, delivered_by: v })}>
                <SelectTrigger><SelectValue placeholder="Select staff" /></SelectTrigger>
                <SelectContent>
                  {staff.map(name => <SelectItem key={name} value={name}>{name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Received By</label>
              <Select value={newDelivery.received_by} onValueChange={v => setNewDelivery({ ...newDelivery, received_by: v })}>
                <SelectTrigger><SelectValue placeholder="Select staff" /></SelectTrigger>
                <SelectContent>
                  {staff.map(name => <SelectItem key={name} value={name}>{name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Produce</label>
              {Array.isArray(newDelivery.produce) && newDelivery.produce.map((item, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <Input
                    type="text"
                    placeholder="Produce name"
                    value={item.name}
                    onChange={e => {
                      const arr = [...newDelivery.produce];
                      arr[idx].name = e.target.value;
                      setNewDelivery({ ...newDelivery, produce: arr });
                    }}
                    className="w-1/2"
                  />
                  <Input
                    type="text"
                    placeholder="Quantity (e.g. 50kg)"
                    value={item.quantity}
                    onChange={e => {
                      const arr = [...newDelivery.produce];
                      arr[idx].quantity = e.target.value;
                      setNewDelivery({ ...newDelivery, produce: arr });
                    }}
                    className="w-1/2"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setNewDelivery({ ...newDelivery, produce: newDelivery.produce.filter((_, i) => i !== idx) })}
                    disabled={newDelivery.produce.length === 1}
                  >Remove</Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => setNewDelivery({ ...newDelivery, produce: [...newDelivery.produce, { name: '', quantity: '' }] })}
              >Add Produce</Button>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Notes</label>
              <Input type="text" value={newDelivery.notes} onChange={e => setNewDelivery({ ...newDelivery, notes: e.target.value })} />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="secondary" onClick={() => setAddDialogOpen(false)}>Cancel</Button>
              <Button variant="default" onClick={handleAddDelivery} disabled={!newDelivery.farm || !newDelivery.delivered_by || !newDelivery.received_by || !newDelivery.produce.some(p => p.name && p.quantity)}>
                Add Delivery
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* KPI Cards: Total Deliveries This Month Per Farm */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total Deliveries"
          value={deliveries.length}
          description="All deliveries logged"
          icon={<Truck className="h-5 w-5 text-muted-foreground" />}
        />
        <KpiCard
          title="Deliveries This Month"
          value={deliveriesThisMonth.length}
          description="All farms"
          icon={<Calendar className="h-5 w-5 text-blue-500" />}
        />
      </div>

      {/* Filters (removed All Produce filter) */}
      <div className="flex flex-wrap gap-4 items-center mb-4">
        <Select value={farmFilter} onValueChange={setFarmFilter}>
          <SelectTrigger className="w-48"><SelectValue placeholder="Filter by Farm" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Farms</SelectItem>
            {farms.map(farm => <SelectItem key={farm.id} value={farm.name}>{farm.name}</SelectItem>)}
          </SelectContent>
        </Select>
        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Search delivered by or produce..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-64"
          />
          <Search className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Deliveries Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Deliveries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Farm</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Delivered By</TableHead>
                  <TableHead>Received By</TableHead>
                  <TableHead>Produce</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDeliveries.map(delivery => (
                  <TableRow key={delivery.id}>
                    <TableCell>{delivery.id}</TableCell>
                    <TableCell>{delivery.farm}</TableCell>
                    <TableCell>{delivery.date}</TableCell>
                    <TableCell>{delivery.delivered_by}</TableCell>
                    <TableCell>{delivery.received_by}</TableCell>
                    <TableCell>{typeof delivery.produce === 'string' ? delivery.produce : ''}</TableCell>
                    <TableCell>{delivery.notes}</TableCell>
                    <TableCell>
                      <Button size="icon" variant="ghost" onClick={() => { openEditDialog(delivery); }}><Edit className="w-4 h-4" /></Button>
                      <Button size="icon" variant="ghost" onClick={() => { setSelectedDelivery(delivery); setDeleteDialogOpen(true); }}><Trash className="w-4 h-4 text-red-500" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredDeliveries.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-gray-500">No deliveries found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Delivery Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Delivery</DialogTitle>
          </DialogHeader>
          {selectedDelivery && Array.isArray(selectedDelivery.produce) && selectedDelivery.produce.map((item, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <Input
                type="text"
                placeholder="Produce name"
                value={item.name}
                onChange={e => {
                  const arr = [...selectedDelivery.produce];
                  arr[idx].name = e.target.value;
                  setSelectedDelivery({ ...selectedDelivery, produce: arr });
                }}
                className="w-1/2"
              />
              <Input
                type="text"
                placeholder="Quantity (e.g. 50kg)"
                value={item.quantity}
                onChange={e => {
                  const arr = [...selectedDelivery.produce];
                  arr[idx].quantity = e.target.value;
                  setSelectedDelivery({ ...selectedDelivery, produce: arr });
                }}
                className="w-1/2"
              />
              <Button
                type="button"
                variant="ghost"
                onClick={() => setSelectedDelivery({ ...selectedDelivery, produce: selectedDelivery.produce.filter((_, i) => i !== idx) })}
                disabled={selectedDelivery.produce.length === 1}
              >Remove</Button>
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium mb-1">Notes</label>
            <Input type="text" value={selectedDelivery?.notes} onChange={e => setSelectedDelivery({ ...selectedDelivery, notes: e.target.value })} />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="secondary" onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={async () => {
              await updateDeliveryMutation.mutateAsync({
                id: selectedDelivery.id,
                updates: {
                  ...selectedDelivery,
                  produce: serializeProduce(selectedDelivery.produce),
                },
              });
              setEditDialogOpen(false);
            }}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Delivery</DialogTitle>
            <DialogDescription>Are you sure you want to delete this delivery?</DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={async () => {
              if (selectedDelivery) {
                await deleteDeliveryMutation.mutateAsync(selectedDelivery.id);
                setDeleteDialogOpen(false);
              }
            }}>Delete</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FarmDeliveryPage; 