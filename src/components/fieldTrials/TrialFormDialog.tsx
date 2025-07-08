import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, X, MapPin, FileText, Users, Calendar, DollarSign } from 'lucide-react';

// Placeholder/mock data
const crops = [
  'Corn', 'Soybeans', 'Wheat', 'Cotton', 'Barley', 'Oats', 'Rye', 'Sorghum', 'Rice', 'Canola', 'Sunflower', 'Peanut', 'Sugarcane', 'Potato', 'Tomato', 'Onion', 'Carrot', 'Lettuce', 'Cabbage', 'Broccoli', 'Cauliflower', 'Spinach', 'Peas', 'Beans', 'Chickpea', 'Lentil', 'Alfalfa', 'Clover', 'Pasture', 'Grapes', 'Apple', 'Citrus', 'Banana', 'Pineapple', 'Coffee', 'Tea', 'Other'
];
const trialTypes = [
  'Fertility Trial', 'Product Comparison', 'Nutrient Rate Test', 'Planting Date Trial', 'Foliar Application Trial', 'Soil Amendment Trial', 'Biostimulant Trial', 'Microbial Inoculant Trial', 'Seed Treatment Trial', 'Irrigation/Fertigation Trial', 'Residue/Carryover Trial', 'Herbicide Tolerance', 'Fungicide/Biocontrol Efficacy', 'Growth Regulator Trial', 'Starter Fertilizer Trial', 'Slow/Controlled Release Fertilizer', 'Organic vs Conventional', 'Other'
];
const seasons = ['2024', '2025', '2026'];
const statuses = [
  { value: 'planned', label: 'Planned' },
  { value: 'ongoing', label: 'Ongoing' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' }
];
const farms = ['Green Acres', 'Sunset Valley', 'Riverbend'];
const fieldBlocks = ['Block A', 'Block B', 'Block C'];
const categories = ['Standard', 'Enterprise', 'Demo'];

export const TrialFormDialog = ({ open, onOpenChange, onSave, users = [], initialData }) => {
  console.log('👤 Available users for Team tab:', users);
  // Form state
  const [tab, setTab] = useState('details');
  const [trialName, setTrialName] = useState(initialData?.name || '');
  const [trialCode, setTrialCode] = useState(initialData?.trial_code || '');
  const [crop, setCrop] = useState(initialData?.crop || '');
  const [variety, setVariety] = useState(initialData?.variety_hybrid || '');
  const [trialType, setTrialType] = useState(initialData?.trial_type || '');
  const [season, setSeason] = useState(initialData?.season || '');
  const [startDate, setStartDate] = useState(initialData?.start_date || '');
  const [endDate, setEndDate] = useState(initialData?.end_date || '');
  const [status, setStatus] = useState(initialData?.status || 'planned');
  const [objective, setObjective] = useState(initialData?.objective || '');
  const [farm, setFarm] = useState(initialData?.farm_name || '');
  const [fieldBlock, setFieldBlock] = useState(initialData?.field_location || '');
  const [gps, setGps] = useState(initialData?.gps_coordinates || '');
  const [trialArea, setTrialArea] = useState(initialData?.trial_area?.toString() || '');
  const [collaborators, setCollaborators] = useState([]);
  const [tasks, setTasks] = useState(initialData?.tasks || [{ name: '', date: '', status: 'pending', responsible: '' }]);
  const [notifications, setNotifications] = useState(initialData?.notifications_enabled || false);
  const [attachments, setAttachments] = useState(initialData?.attachments || []);
  const [tags, setTags] = useState(initialData?.tags || []);
  const [customTag, setCustomTag] = useState('');
  const [category, setCategory] = useState(initialData?.trial_category || '');
  const [isDraft, setIsDraft] = useState(initialData?.is_draft || false);
  const [customCrop, setCustomCrop] = useState('');
  const [customTrialType, setCustomTrialType] = useState('');

  // Add effect to re-initialize state when initialData changes
  useEffect(() => {
    setTrialName(initialData?.name || '');
    setTrialCode(initialData?.trial_code || '');
    setCrop(initialData?.crop || '');
    setVariety(initialData?.variety_hybrid || '');
    setTrialType(initialData?.trial_type || '');
    setSeason(initialData?.season || '');
    setStartDate(initialData?.start_date || '');
    setEndDate(initialData?.end_date || '');
    setStatus(initialData?.status || 'planned');
    setObjective(initialData?.objective || '');
    setFarm(initialData?.farm_name || '');
    setFieldBlock(initialData?.field_location || '');
    setGps(initialData?.gps_coordinates || '');
    setTrialArea(initialData?.trial_area?.toString() || '');
    setTasks(initialData?.tasks || [{ name: '', date: '', status: 'pending', responsible: '' }]);
    setNotifications(initialData?.notifications_enabled || false);
    setAttachments(initialData?.attachments || []);
    setTags(initialData?.tags || []);
    setCategory(initialData?.trial_category || '');
    setIsDraft(initialData?.is_draft || false);
    setCustomCrop(initialData?.custom_crop || '');
    setCustomTrialType(initialData?.custom_trial_type || '');
  }, [initialData]);

  // Handlers for dynamic fields
  const handleAddTask = () => setTasks([...tasks, { name: '', date: '', status: 'pending', responsible: '' }]);
  const handleTaskChange = (idx, field, value) => {
    setTasks(tasks.map((t, i) => i === idx ? { ...t, [field]: value } : t));
  };
  const handleRemoveTask = (idx) => setTasks(tasks.filter((_, i) => i !== idx));
  const handleAddTag = () => {
    if (customTag && !tags.includes(customTag)) {
      setTags([...tags, customTag]);
      setCustomTag('');
    }
  };
  const handleRemoveTag = (tag) => setTags(tags.filter(t => t !== tag));

  // Main form submit
  const handleSubmit = (launch = false) => {
    console.log('📝 Form data being submitted:', {
      trialName,
      trialCode,
      crop,
      variety,
      trialType,
      season,
      startDate,
      endDate,
      status,
      objective,
      farm,
      fieldBlock,
      trialArea,
      tasks,
      notifications,
      attachments,
      tags,
      category,
      is_draft: !launch
    });

    // Validate required fields
    if (!trialName || !crop || !trialType || !season || !startDate || !endDate || !farm || !fieldBlock) {
      alert('Please fill in all required fields');
      return;
    }

    // Get current user ID if lead is not selected
    const getCurrentUserId = () => {
      // Try to get from localStorage or auth context
      const userStr = localStorage.getItem('currentUser');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          return user.id;
        } catch (e) {
          console.error('Failed to parse user data:', e);
        }
      }
      return null;
    };

    const trialData = {
      name: trialName,
      trial_code: trialCode || '',
      crop: crop === 'Other' ? customCrop : crop,
      variety_hybrid: variety,
      trial_type: trialType === 'Other' ? customTrialType : trialType,
      season,
      start_date: startDate,
      end_date: endDate,
      status,
      objective,
      farm_name: farm,
      field_location: fieldBlock,
      gps_coordinates: gps,
      trial_area: parseFloat(trialArea) || 0,
      responsible_agronomist_ids: initialData?.responsible_agronomist_ids || [],
      tasks,
      notifications_enabled: notifications,
      attachments,
      tags,
      trial_category: category,
      is_draft: !launch
    };
    
    console.log('🚀 Submitting trial data:', trialData);
    onSave(trialData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>New Field Trial</DialogTitle>
          <DialogDescription>Fill in all required details to create a new trial.</DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="location">Location</TabsTrigger>
            <TabsTrigger value="attachments">Attachments</TabsTrigger>
            <TabsTrigger value="tags">Tags</TabsTrigger>
          </TabsList>

          {/* Trial Details */}
          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Trial Name</Label>
                <Input value={trialName} onChange={e => setTrialName(e.target.value)} placeholder="e.g. N Test – Corn 2025" />
              </div>
              <div>
                <Label>Trial Code</Label>
                <Input value={trialCode} onChange={e => setTrialCode(e.target.value)} placeholder="Auto or manual" />
              </div>
              <div>
                <Label>Crop</Label>
                <Select value={crop} onValueChange={value => {
                  setCrop(value);
                  if (value !== 'Other') setCustomCrop('');
                }}>
                  <SelectTrigger><SelectValue placeholder="Select crop" /></SelectTrigger>
                  <SelectContent>{crops.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
                {crop === 'Other' && (
                  <Input className="mt-2" value={customCrop} onChange={e => setCustomCrop(e.target.value)} placeholder="Enter crop name" />
                )}
              </div>
              <div>
                <Label>Variety / Hybrid</Label>
                <Input value={variety} onChange={e => setVariety(e.target.value)} placeholder="Optional" />
              </div>
              <div>
                <Label>Trial Type</Label>
                <Select value={trialType} onValueChange={value => {
                  setTrialType(value);
                  if (value !== 'Other') setCustomTrialType('');
                }}>
                  <SelectTrigger><SelectValue placeholder="Select trial type" /></SelectTrigger>
                  <SelectContent>{trialTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                </Select>
                {trialType === 'Other' && (
                  <Input className="mt-2" value={customTrialType} onChange={e => setCustomTrialType(e.target.value)} placeholder="Enter trial type" />
                )}
              </div>
              <div>
                <Label>Season</Label>
                <Select value={season} onValueChange={setSeason}>
                  <SelectTrigger><SelectValue placeholder="Select season" /></SelectTrigger>
                  <SelectContent>{seasons.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label>Start Date</Label>
                <Input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
              </div>
              <div>
                <Label>End Date</Label>
                <Input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
              </div>
              <div>
                <Label>Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{statuses.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label>Objective / Purpose</Label>
                <Textarea value={objective} onChange={e => setObjective(e.target.value)} placeholder="Describe the trial objectives and methodology" rows={3} />
              </div>
            </div>
          </TabsContent>

          {/* Location & Mapping */}
          <TabsContent value="location" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Farm / Project Location</Label>
                <Input value={farm} onChange={e => setFarm(e.target.value)} placeholder="Enter farm or project location" />
              </div>
              <div>
                <Label>Paddock / Block</Label>
                <Input value={fieldBlock} onChange={e => setFieldBlock(e.target.value)} placeholder="Enter paddock or block" />
              </div>
              <div>
                <Label>GPS Coordinates</Label>
                <Input value={gps} onChange={e => setGps(e.target.value)} placeholder="Enter GPS coordinates" />
              </div>
            </div>
          </TabsContent>

          {/* Attachments */}
          <TabsContent value="attachments" className="space-y-4">
            <div>
              <Label>Upload Protocol</Label>
              <Input type="file" accept=".pdf,.doc,.docx" />
            </div>
            <div>
              <Label>Upload Pre-Trial Data</Label>
              <Input type="file" accept=".xlsx,.csv,.pdf" />
            </div>
            <div>
              <Label>Additional Documents</Label>
              <Input type="file" multiple accept=".pdf,.doc,.docx,.xlsx,.jpg,.png" />
            </div>
            <div className="text-sm text-gray-500">
              Supported formats: PDF, Word, Excel, Images (JPG, PNG)
            </div>
          </TabsContent>

          {/* Tags & Metadata */}
          <TabsContent value="tags" className="space-y-4">
            <div>
              <Label>Custom Tags</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={customTag}
                  onChange={e => setCustomTag(e.target.value)}
                  placeholder="Add custom tag"
                  onKeyPress={e => e.key === 'Enter' && handleAddTag()}
                />
                <Button onClick={handleAddTag}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => handleRemoveTag(tag)}>
                    {tag} <X className="w-3 h-3 ml-1" />
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <Label>Trial Category (Optional)</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>{categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="outline" onClick={() => handleSubmit(false)}>
            Save as Draft
          </Button>
          <Button onClick={() => handleSubmit(true)}>
            Launch Trial
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 