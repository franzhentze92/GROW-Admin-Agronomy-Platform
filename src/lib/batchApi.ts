import { supabase } from './supabaseClient';

export interface Batch {
  id: string;
  product_id: string;
  product_name?: string;
  production_date: string;
  batch_no: string;
  work_order?: string;
  ph?: number;
  conductivity_ms?: number;
  sg?: number;
  volume?: number;
  note?: string;
  created_at: string;
}

export async function getRecentBatches(limit: number = 5): Promise<Batch[]> {
  // Fetch batches with product info, sorted by production_date desc
  const { data, error } = await supabase
    .from('product_batches')
    .select('*, products(name)')
    .order('production_date', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching recent batches:', error);
    throw error;
  }

  // Map product name if joined
  return (data || []).map((batch: any) => ({
    ...batch,
    product_name: batch.products?.name || 'Unknown Product',
  }));
} 