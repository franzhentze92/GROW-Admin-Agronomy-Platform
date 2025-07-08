import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getAnalysisPricing, 
  createAnalysisPricing, 
  updateAnalysisPricing, 
  deleteAnalysisPricing,
  getPricingSummary,
  AnalysisPricing,
  CreateAnalysisPricingData,
  UpdateAnalysisPricingData
} from '@/lib/analysisPricingApi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Plus, 
  Edit, 
  Trash2, 
  DollarSign, 
  TrendingUp, 
  Package, 
  Settings
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const AnalysisPricingPage: React.FC = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingPricing, setEditingPricing] = useState<AnalysisPricing | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deletingPricing, setDeletingPricing] = useState<AnalysisPricing | null>(null);

  const queryClient = useQueryClient();

  // Fetch pricing data
  const { data: pricingData = [], isLoading, error } = useQuery({
    queryKey: ['analysis-pricing'],
    queryFn: getAnalysisPricing,
  });

  // Fetch pricing summary
  const { data: pricingSummary } = useQuery({
    queryKey: ['pricing-summary'],
    queryFn: getPricingSummary,
  });

  // Create pricing mutation
  const createMutation = useMutation({
    mutationFn: createAnalysisPricing,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analysis-pricing'] });
      queryClient.invalidateQueries({ queryKey: ['pricing-summary'] });
      setIsCreateDialogOpen(false);
      toast({
        title: "Success",
        description: "Analysis pricing created successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to create pricing: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Update pricing mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAnalysisPricingData }) =>
      updateAnalysisPricing(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analysis-pricing'] });
      queryClient.invalidateQueries({ queryKey: ['pricing-summary'] });
      setIsEditDialogOpen(false);
      setEditingPricing(null);
      toast({
        title: "Success",
        description: "Analysis pricing updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update pricing: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Delete pricing mutation
  const deleteMutation = useMutation({
    mutationFn: deleteAnalysisPricing,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analysis-pricing'] });
      queryClient.invalidateQueries({ queryKey: ['pricing-summary'] });
      setDeletingPricing(null);
      toast({
        title: "Success",
        description: "Analysis pricing deleted successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete pricing: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Form state for create dialog
  const [createForm, setCreateForm] = useState({
    analysis_type: '',
    category: '',
    base_price: 0,
    description: '',
  });

  // Form state for edit dialog
  const [editForm, setEditForm] = useState({
    analysis_type: '',
    category: '',
    base_price: 0,
    description: '',
    is_active: true,
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!createForm.analysis_type || createForm.base_price <= 0) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields with valid values.",
        variant: "destructive",
      });
      return;
    }
    createMutation.mutate(createForm);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPricing || editForm.base_price! <= 0) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields with valid values.",
        variant: "destructive",
      });
      return;
    }
    updateMutation.mutate({ id: editingPricing.id, data: editForm });
  };

  const handleEdit = (pricing: AnalysisPricing) => {
    setEditingPricing(pricing);
    setEditForm({
      analysis_type: pricing.analysis_type,
      category: pricing.category || '',
      base_price: pricing.base_price,
      description: pricing.description || '',
      is_active: pricing.is_active,
    });
    setIsEditDialogOpen(true);
  };

  const handleDelete = (pricing: AnalysisPricing) => {
    setDeletingPricing(pricing);
  };

  const confirmDelete = () => {
    if (deletingPricing) {
      deleteMutation.mutate(deletingPricing.id);
    }
  };

  const resetCreateForm = () => {
    setCreateForm({
      analysis_type: '',
      category: '',
      base_price: 0,
      description: '',
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading pricing data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-lg text-red-600 mb-4">Error loading pricing data</div>
            <div className="text-sm text-muted-foreground mb-4">
              {error.message}
            </div>
            <div className="text-xs text-muted-foreground">
              This might be because the analysis_pricing table hasn't been created yet.
              <br />
              Please run the SQL setup in your Supabase dashboard.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Analysis Pricing Management</h1>
          <p className="text-muted-foreground">
            Manage pricing for different analysis types and track revenue
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetCreateForm}>
              <Plus className="mr-2 h-4 w-4" />
              Add Pricing Type
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Analysis Pricing</DialogTitle>
              <DialogDescription>
                Create a new pricing entry for an analysis type.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <Label htmlFor="analysis_type">Analysis Type *</Label>
                <Input
                  id="analysis_type"
                  value={createForm.analysis_type}
                  onChange={(e) => setCreateForm(prev => ({ ...prev, analysis_type: e.target.value }))}
                  placeholder="e.g., soil, leaf, water"
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={createForm.category}
                  onChange={(e) => setCreateForm(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="e.g., soil, leaf, water"
                />
              </div>
              <div>
                <Label htmlFor="base_price">Base Price ($) *</Label>
                <Input
                  id="base_price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={createForm.base_price}
                  onChange={(e) => setCreateForm(prev => ({ ...prev, base_price: parseFloat(e.target.value) || 0 }))}
                  placeholder="150.00"
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={createForm.description}
                  onChange={(e) => setCreateForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of this analysis type"
                  rows={3}
                />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={createMutation.isPending}>
                  {createMutation.isPending ? 'Creating...' : 'Create Pricing'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Pricing Types</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pricingSummary?.activeTypes || 0}</div>
            <p className="text-xs text-muted-foreground">
              Currently active pricing types
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Price</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${pricingSummary?.averagePrice.toFixed(2) || '0.00'}
            </div>
            <p className="text-xs text-muted-foreground">
              Average price across all types
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Price Range</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${pricingSummary?.priceRange.min.toFixed(2) || '0.00'} - ${pricingSummary?.priceRange.max.toFixed(2) || '0.00'}
            </div>
            <p className="text-xs text-muted-foreground">
              Min to max price range
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Types</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pricingSummary?.totalTypes || 0}</div>
            <p className="text-xs text-muted-foreground">
              All pricing types (active + inactive)
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Pricing Table */}
      <Card>
        <CardHeader>
          <CardTitle>Analysis Pricing</CardTitle>
          <CardDescription>
            Manage pricing for different analysis types. Prices are used for invoicing and revenue tracking.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Analysis Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Base Price</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pricingData.map((pricing) => (
                <TableRow key={pricing.id}>
                  <TableCell className="font-medium capitalize">
                    {pricing.analysis_type}
                  </TableCell>
                  <TableCell>
                    {pricing.category || '-'}
                  </TableCell>
                  <TableCell>
                    <span className="font-mono">${pricing.base_price.toFixed(2)}</span>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {pricing.description || '-'}
                  </TableCell>
                  <TableCell>
                    <Badge variant={pricing.is_active ? "default" : "secondary"}>
                      {pricing.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(pricing.updated_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(pricing)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(pricing)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Pricing</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete the pricing for "{pricing.analysis_type}"? 
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={confirmDelete}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Analysis Pricing</DialogTitle>
            <DialogDescription>
              Update the pricing for {editingPricing?.analysis_type}.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div>
              <Label htmlFor="edit_analysis_type">Analysis Type *</Label>
              <Input
                id="edit_analysis_type"
                value={editForm.analysis_type}
                onChange={(e) => setEditForm(prev => ({ ...prev, analysis_type: e.target.value }))}
                placeholder="e.g., soil, leaf, water"
                required
              />
            </div>
            <div>
              <Label htmlFor="edit_category">Category</Label>
              <Input
                id="edit_category"
                value={editForm.category}
                onChange={(e) => setEditForm(prev => ({ ...prev, category: e.target.value }))}
                placeholder="e.g., soil, leaf, water"
              />
            </div>
            <div>
              <Label htmlFor="edit_base_price">Base Price ($) *</Label>
              <Input
                id="edit_base_price"
                type="number"
                step="0.01"
                min="0"
                value={editForm.base_price}
                onChange={(e) => setEditForm(prev => ({ ...prev, base_price: parseFloat(e.target.value) || 0 }))}
                placeholder="150.00"
                required
              />
            </div>
            <div>
              <Label htmlFor="edit_description">Description</Label>
              <Textarea
                id="edit_description"
                value={editForm.description}
                onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of this analysis type"
                rows={3}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="edit_is_active"
                checked={editForm.is_active}
                onCheckedChange={(checked) => setEditForm(prev => ({ ...prev, is_active: checked }))}
              />
              <Label htmlFor="edit_is_active">Active</Label>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={updateMutation.isPending}>
                {updateMutation.isPending ? 'Updating...' : 'Update Pricing'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AnalysisPricingPage; 