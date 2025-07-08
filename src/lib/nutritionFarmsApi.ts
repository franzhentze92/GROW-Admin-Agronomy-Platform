import { supabase } from './supabaseClient';

export interface NutritionFarmRequest {
  id: string;
  farm: string;
  manager: string;
  date: string;
  status: string;
  materials: { name: string; quantity: number; notes?: string }[];
  created_at?: string;
  updated_at?: string;
}

export const fetchNutritionFarmRequests = async (): Promise<NutritionFarmRequest[]> => {
  const { data, error } = await supabase
    .from('nutrition_farm_requests')
    .select('*')
    .order('date', { ascending: false });
  if (error) throw new Error(error.message);
  return data || [];
};

export const addNutritionFarmRequest = async (request: Omit<NutritionFarmRequest, 'id' | 'created_at' | 'updated_at'>): Promise<NutritionFarmRequest> => {
  const { data, error } = await supabase
    .from('nutrition_farm_requests')
    .insert([{ ...request }])
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
};

export const updateNutritionFarmRequest = async (id: string, updates: Partial<NutritionFarmRequest>): Promise<NutritionFarmRequest> => {
  const { data, error } = await supabase
    .from('nutrition_farm_requests')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
};

export const deleteNutritionFarmRequest = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('nutrition_farm_requests')
    .delete()
    .eq('id', id);
  if (error) throw new Error(error.message);
}; 