import { supabase } from './supabaseClient';

export interface FarmDelivery {
  id: string;
  farm: string;
  date: string;
  delivered_by: string;
  received_by: string;
  produce: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export const fetchFarmDeliveries = async (): Promise<FarmDelivery[]> => {
  const { data, error } = await supabase
    .from('farm_deliveries')
    .select('*')
    .order('date', { ascending: false });
  if (error) throw new Error(error.message);
  return data || [];
};

export const addFarmDelivery = async (delivery: Omit<FarmDelivery, 'id' | 'created_at' | 'updated_at'>): Promise<FarmDelivery> => {
  const { data, error } = await supabase
    .from('farm_deliveries')
    .insert([{ ...delivery }])
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
};

export const updateFarmDelivery = async (id: string, updates: Partial<FarmDelivery>): Promise<FarmDelivery> => {
  const { data, error } = await supabase
    .from('farm_deliveries')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
};

export const deleteFarmDelivery = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('farm_deliveries')
    .delete()
    .eq('id', id);
  if (error) throw new Error(error.message);
}; 