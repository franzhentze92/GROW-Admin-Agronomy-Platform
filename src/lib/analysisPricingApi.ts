import { supabase } from './supabaseClient';

export interface AnalysisPricing {
  id: string;
  analysis_type: string;
  category: string;
  base_price: number;
  description?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateAnalysisPricingData {
  analysis_type: string;
  category: string;
  base_price: number;
  description?: string;
}

export interface UpdateAnalysisPricingData {
  analysis_type?: string;
  category?: string;
  base_price?: number;
  description?: string;
  is_active?: boolean;
}

// Fetch all analysis pricing
export const getAnalysisPricing = async (): Promise<AnalysisPricing[]> => {
  const { data, error } = await supabase
    .from('analysis_pricing')
    .select('*')
    .order('analysis_type');

  if (error) {
    console.error('Error fetching analysis pricing:', error);
    throw new Error(error.message);
  }

  return data || [];
};

// Fetch active analysis pricing
export const getActiveAnalysisPricing = async (): Promise<AnalysisPricing[]> => {
  const { data, error } = await supabase
    .from('analysis_pricing')
    .select('*')
    .eq('is_active', true)
    .order('analysis_type');

  if (error) {
    console.error('Error fetching active analysis pricing:', error);
    throw new Error(error.message);
  }

  return data || [];
};

// Fetch pricing by analysis type
export const getAnalysisPricingByType = async (analysisType: string): Promise<AnalysisPricing | null> => {
  const { data, error } = await supabase
    .from('analysis_pricing')
    .select('*')
    .eq('analysis_type', analysisType)
    .eq('is_active', true)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // No rows returned
      return null;
    }
    console.error('Error fetching analysis pricing by type:', error);
    throw new Error(error.message);
  }

  return data;
};

// Create new analysis pricing
export const createAnalysisPricing = async (pricingData: CreateAnalysisPricingData): Promise<AnalysisPricing> => {
  const { data, error } = await supabase
    .from('analysis_pricing')
    .insert([pricingData])
    .select()
    .single();

  if (error) {
    console.error('Error creating analysis pricing:', error);
    throw new Error(error.message);
  }

  return data;
};

// Update analysis pricing
export const updateAnalysisPricing = async (
  id: string, 
  pricingData: UpdateAnalysisPricingData
): Promise<AnalysisPricing> => {
  const { data, error } = await supabase
    .from('analysis_pricing')
    .update({ ...pricingData, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating analysis pricing:', error);
    throw new Error(error.message);
  }

  return data;
};

// Delete analysis pricing (true delete)
export const deleteAnalysisPricing = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('analysis_pricing')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting analysis pricing:', error);
    throw new Error(error.message);
  }
};

// Get pricing summary for invoicing
export const getPricingSummary = async (): Promise<{
  totalTypes: number;
  activeTypes: number;
  averagePrice: number;
  priceRange: { min: number; max: number };
}> => {
  const { data, error } = await supabase
    .from('analysis_pricing')
    .select('base_price, is_active')
    .eq('is_active', true);

  if (error) {
    console.error('Error fetching pricing summary:', error);
    throw new Error(error.message);
  }

  const activePricing = data || [];
  const prices = activePricing.map(p => p.base_price);

  return {
    totalTypes: activePricing.length,
    activeTypes: activePricing.filter(p => p.is_active).length,
    averagePrice: prices.length > 0 ? prices.reduce((a, b) => a + b, 0) / prices.length : 0,
    priceRange: {
      min: prices.length > 0 ? Math.min(...prices) : 0,
      max: prices.length > 0 ? Math.max(...prices) : 0
    }
  };
}; 