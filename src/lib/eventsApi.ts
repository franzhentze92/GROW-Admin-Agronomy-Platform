import { supabase } from './supabaseClient';

export interface Event {
  id: string;
  slug: string;
  title: string;
  description: string;
  notes?: string;
  date: string;
  time?: string;
  end_date?: string;
  end_time?: string;
  location?: string;
  cost?: string;
  cost_unit?: string;
  image?: string;
  link?: string;
  featured?: boolean;
  created_at?: string;
  updated_at?: string;
}

export const eventsApi = {
  async getEvents(): Promise<Event[]> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true });
    if (error) throw error;
    return data || [];
  },
  async getEventByIdOrSlug(idOrSlug: string): Promise<Event | null> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .or(`id.eq.${idOrSlug},slug.eq.${idOrSlug}`)
      .single();
    if (error) return null;
    return data;
  },
  async addEvent(event: Partial<Event>): Promise<Event> {
    const { data, error } = await supabase
      .from('events')
      .insert([event])
      .select()
      .single();
    if (error) throw error;
    return data;
  },
  async updateEvent(id: string, updates: Partial<Event>): Promise<Event> {
    const { slug, ...rest } = updates;
    const { data, error } = await supabase
      .from('events')
      .update(rest)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
  async deleteEvent(id: string): Promise<void> {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }
}; 