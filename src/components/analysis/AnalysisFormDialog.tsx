import React, { useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { createAnalysis, updateAnalysis } from '@/lib/analysisApi';
import { getClients } from '@/lib/clientsApi';
import { getActiveAnalysisPricing, getAnalysisPricingByType } from '@/lib/analysisPricingApi';
import { toast } from 'sonner';
import { useAppContext } from '@/contexts/AppContext';
import { Analysis, AnalysisForCreate, Client } from '@/lib/types';
import { CONSULTANTS, CROP_OPTIONS, CATEGORY_OPTIONS } from '@/lib/constants';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

const analysisSchema = z.object({
  client_name: z.string().min(1, "Client is required"),
  consultant: z.string().min(1, "Consultant is required"),
  analysis_type: z.enum(['soil', 'leaf']),
  crop: z.string().optional(),
  category: z.string().optional(),
  eal_lab_no: z.string().optional(),
  test_count: z.coerce.number().optional(),
  unit_price: z.coerce.number().optional(),
  total_price: z.coerce.number().optional(),
  notes: z.string().optional(),
  pdf_file_path: z.string().optional(),
  sample_no: z.string().optional(),
  // Step tracking fields
  draft_by: z.string().optional(),
  draft_date: z.string().optional(),
  ready_check_by: z.string().optional(),
  ready_check_date: z.string().optional(),
  checked_by: z.string().optional(),
  checked_date: z.string().optional(),
  emailed_by: z.string().optional(),
  emailed_date: z.string().optional(),
});

type AnalysisFormData = z.infer<typeof analysisSchema>;

interface AnalysisFormDialogProps {
  children: React.ReactNode;
  analysis?: Analysis | null;
  mode: 'create' | 'edit';
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const AnalysisFormDialog: React.FC<AnalysisFormDialogProps> = ({ 
  children, 
  analysis, 
  mode,
  open: externalOpen,
  onOpenChange: externalOnOpenChange
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const queryClient = useQueryClient();
  const { currentUser } = useAppContext();

  // Fetch clients
  const { data: clients = [], isLoading: clientsLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: getClients,
  });

  // Fetch pricing data
  const { data: pricingData = [] } = useQuery({
    queryKey: ['analysis-pricing'],
    queryFn: getActiveAnalysisPricing,
  });

  // Use external state if provided, otherwise use internal state
  const open = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen = externalOnOpenChange || setInternalOpen;

  const form = useForm<AnalysisFormData>({
    resolver: zodResolver(analysisSchema),
    defaultValues: {
      client_name: analysis?.client_name || '',
      consultant: analysis?.consultant || '',
      analysis_type: analysis?.analysis_type || 'soil',
      crop: analysis?.crop || '',
      category: analysis?.category || '',
      eal_lab_no: analysis?.eal_lab_no || '',
      test_count: analysis?.test_count ?? 0,
      unit_price: analysis?.unit_price ?? 0,
      total_price: analysis?.total_price ?? 0,
      notes: analysis?.notes || '',
      pdf_file_path: analysis?.pdf_file_path || '',
      sample_no: analysis?.sample_no || '',
      draft_by: analysis?.draft_by || '',
      draft_date: analysis?.draft_date ? new Date(analysis.draft_date).toISOString().slice(0, 16) : '',
      ready_check_by: analysis?.ready_check_by || '',
      ready_check_date: analysis?.ready_check_date ? new Date(analysis.ready_check_date).toISOString().slice(0, 16) : '',
      checked_by: analysis?.checked_by || '',
      checked_date: analysis?.checked_date ? new Date(analysis.checked_date).toISOString().slice(0, 16) : '',
      emailed_by: analysis?.emailed_by || '',
      emailed_date: analysis?.emailed_date ? new Date(analysis.emailed_date).toISOString().slice(0, 16) : '',
    },
  });

  // Get current analysis type and pricing
  const currentAnalysisType = form.watch('analysis_type');
  const currentCategory = form.watch('category');
  const currentTestCount = form.watch('test_count') || 1;

  // Get pricing for current analysis type and category
  const currentPricing = pricingData.find(p => {
    const typeMatch = p.analysis_type === currentAnalysisType;
    const categoryMatch = p.category === currentCategory;
    return typeMatch && categoryMatch;
  });

  // Calculate total price when test count changes
  useEffect(() => {
    if (currentPricing) {
      const totalPrice = currentPricing.base_price * currentTestCount;
      form.setValue('unit_price', currentPricing.base_price);
      form.setValue('total_price', totalPrice);
    }
  }, [currentPricing, currentTestCount, form]);

  // Auto-set pricing when category changes
  useEffect(() => {
    if (currentPricing && currentCategory) {
      form.setValue('unit_price', currentPricing.base_price);
      const totalPrice = currentPricing.base_price * currentTestCount;
      form.setValue('total_price', totalPrice);
    }
  }, [currentCategory, currentPricing, currentTestCount, form]);

  // Update form values when analysis changes
  React.useEffect(() => {
    if (analysis) {
      // Helper function to format date for datetime-local input
      const formatDateForInput = (dateString: string | null | undefined) => {
        if (!dateString) return '';
        try {
          const date = new Date(dateString);
          // Format as YYYY-MM-DDTHH:mm for datetime-local input
          return date.toISOString().slice(0, 16);
        } catch {
          return '';
        }
      };

      form.reset({
        client_name: analysis.client_name,
        consultant: analysis.consultant,
        analysis_type: analysis.analysis_type,
        crop: analysis.crop,
        category: analysis.category,
        eal_lab_no: analysis.eal_lab_no || '',
        test_count: analysis.test_count || undefined,
        unit_price: analysis.unit_price ?? 0,
        total_price: analysis.total_price ?? 0,
        notes: analysis.notes || '',
        pdf_file_path: analysis.pdf_file_path || '',
        sample_no: analysis.sample_no || '',
        draft_by: analysis.draft_by || '',
        draft_date: formatDateForInput(analysis.draft_date),
        ready_check_by: analysis.ready_check_by || '',
        ready_check_date: formatDateForInput(analysis.ready_check_date),
        checked_by: analysis.checked_by || '',
        checked_date: formatDateForInput(analysis.checked_date),
        emailed_by: analysis.emailed_by || '',
        emailed_date: formatDateForInput(analysis.emailed_date),
      });
    }
  }, [analysis, form]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setUploadedFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const uploadFile = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `analysis-reports/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('analysis-reports')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Supabase upload error:', uploadError);
      throw new Error(uploadError.message || 'Error uploading file');
    }

    return filePath;
  };

  const createMutation = useMutation({
    mutationFn: createAnalysis,
    onSuccess: () => {
      toast.success("Analysis created successfully");
      queryClient.invalidateQueries({ queryKey: ['analyses'] });
      setOpen(false);
      form.reset();
      setUploadedFile(null);
    },
    onError: (error) => {
      toast.error('Failed to create analysis: ' + error.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: AnalysisFormData) => {
      if (!analysis) throw new Error('No analysis to update');
      return updateAnalysis(analysis.id, data);
    },
    onSuccess: () => {
      toast.success("Analysis updated successfully");
      queryClient.invalidateQueries({ queryKey: ['analyses'] });
      setOpen(false);
      setUploadedFile(null);
    },
    onError: (error) => {
      toast.error('Failed to update analysis: ' + error.message);
    },
  });

  const onSubmit = async (values: AnalysisFormData) => {
    if (!currentUser) {
      toast.error("You must be logged in to perform this action");
      return;
    }

    // Validate required fields
    if (!values.client_name || !values.consultant || !values.analysis_type) {
      toast.error("Client, consultant, and analysis type are required");
      return;
    }

    // Determine status based on workflow step
    const getStatus = () => {
      if (values.emailed_date && values.emailed_date.trim() !== "") return "Emailed";
      if (values.checked_date && values.checked_date.trim() !== "") return "Checked Ready to be Emailed";
      if (values.ready_check_date && values.ready_check_date.trim() !== "") return "Ready to be Checked";
      return "Draft";
    };

    console.log('Form values on submit:', values);

    setUploading(true);
    try {
      let pdfPath = values.pdf_file_path;

      // Upload new file if one was selected
      if (uploadedFile) {
        pdfPath = await uploadFile(uploadedFile);
      }

      // Helper function to convert empty strings to null for date fields
      const cleanDateField = (dateString: string | undefined) => {
        return dateString && dateString.trim() !== '' ? dateString : null;
      };

      const formData = {
        ...values,
        pdf_file_path: pdfPath,
        updated_by: currentUser.id,
        status: getStatus(),
      };

      if (mode === 'create') {
        const newAnalysis: AnalysisForCreate = {
          client_name: values.client_name,
          consultant: values.consultant,
          analysis_type: values.analysis_type,
          crop: values.crop || '',
          category: values.category || '',
          status: getStatus(),
          eal_lab_no: values.eal_lab_no,
          test_count: values.test_count,
          unit_price: values.unit_price,
          total_price: values.total_price,
          notes: values.notes,
          pdf_file_path: pdfPath,
          sample_no: values.sample_no,
          draft_by: values.draft_by || null,
          draft_date: cleanDateField(values.draft_date),
          ready_check_by: values.ready_check_by || null,
          ready_check_date: cleanDateField(values.ready_check_date),
          checked_by: values.checked_by || null,
          checked_date: cleanDateField(values.checked_date),
          emailed_by: values.emailed_by || null,
          emailed_date: cleanDateField(values.emailed_date),
          updated_by: currentUser.id,
        };
        console.log('Analysis object to be saved:', newAnalysis);
        createMutation.mutate(newAnalysis);
      } else {
        // Clean date fields for update as well
        const cleanedFormData = {
          ...formData,
          draft_date: cleanDateField(values.draft_date),
          ready_check_date: cleanDateField(values.ready_check_date),
          checked_date: cleanDateField(values.checked_date),
          emailed_date: cleanDateField(values.emailed_date),
        };
        console.log('Analysis object to be updated:', cleanedFormData);
        updateMutation.mutate(cleanedFormData);
      }
    } catch (error) {
      console.error('File upload/save error:', error);
      toast.error('Error processing file upload: ' + (error instanceof Error ? error.message : String(error)));
    } finally {
      setUploading(false);
    }
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending || uploading;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Add New Analysis' : 'Edit Analysis'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'create' 
              ? 'Fill in the details below to create a new analysis record.' 
              : 'Update the analysis record details.'
            }
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Basic Information */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Basic Information</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="client_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select client" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {clientsLoading ? (
                            <SelectItem value="loading" disabled>Loading clients...</SelectItem>
                          ) : (
                            clients.map((client) => (
                              <SelectItem key={client.id} value={client.name}>
                                {client.name}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="consultant"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Consultant</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select consultant" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {CONSULTANTS.map((consultant) => (
                            <SelectItem key={consultant.id} value={consultant.name}>
                              {consultant.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="analysis_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Analysis Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="soil">Soil</SelectItem>
                          <SelectItem value="leaf">Leaf</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {CATEGORY_OPTIONS.map((category) => (
                            <SelectItem key={category.id} value={category.name}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="crop"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Crop</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select crop" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {CROP_OPTIONS.map((crop) => (
                            <SelectItem key={crop.id} value={crop.name}>
                              {crop.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="eal_lab_no"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>EAL Lab No.</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 1234" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="test_count"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Tests</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="e.g., 1" 
                        {...field}
                        onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Additional Information */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Additional Information</h3>
              
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Add any relevant notes..." {...field} className="min-h-[60px]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* PDF Upload */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Report PDF</h3>
              
              <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
                isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
              }`}>
                <input {...getInputProps()} />
                <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                {uploadedFile ? (
                  <div className="space-y-1">
                    <div className="flex items-center justify-center space-x-2">
                      <FileText className="h-4 w-4 text-green-500" />
                      <span className="font-medium text-sm">{uploadedFile.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setUploadedFile(null);
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Click to replace or drag and drop a new file
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm font-medium">Upload Analysis Report</p>
                    <p className="text-xs text-muted-foreground">
                      Drag and drop a PDF file here, or click to select
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Maximum file size: 10MB
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Step Tracking */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Workflow Steps</h3>
              
              <div className="space-y-3">
                {/* Draft Stage */}
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-2 text-sm">1. Draft</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <FormField
                      control={form.control}
                      name="draft_by"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Draft By</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select consultant" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {CONSULTANTS.map((consultant) => (
                                <SelectItem key={consultant.id} value={consultant.name}>
                                  {consultant.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="draft_date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Draft Date</FormLabel>
                          <FormControl>
                            <Input type="datetime-local" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Ready to be Checked Stage */}
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-2 text-sm">2. Ready to be Checked</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <FormField
                      control={form.control}
                      name="ready_check_by"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ready Check By</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select consultant" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {CONSULTANTS.map((consultant) => (
                                <SelectItem key={consultant.id} value={consultant.name}>
                                  {consultant.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="ready_check_date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ready Check Date</FormLabel>
                          <FormControl>
                            <Input type="datetime-local" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Checked Ready to be Emailed Stage */}
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-2 text-sm">3. Checked Ready to be Emailed</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <FormField
                      control={form.control}
                      name="checked_by"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Checked By</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select consultant" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {CONSULTANTS.map((consultant) => (
                                <SelectItem key={consultant.id} value={consultant.name}>
                                  {consultant.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="checked_date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Checked Date</FormLabel>
                          <FormControl>
                            <Input type="datetime-local" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Emailed Stage */}
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-2 text-sm">4. Emailed</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <FormField
                      control={form.control}
                      name="emailed_by"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Emailed By</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select consultant" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {CONSULTANTS.map((consultant) => (
                                <SelectItem key={consultant.id} value={consultant.name}>
                                  {consultant.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="emailed_date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Emailed Date</FormLabel>
                          <FormControl>
                            <Input type="datetime-local" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : mode === 'create' ? 'Create Analysis' : 'Update Analysis'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}; 