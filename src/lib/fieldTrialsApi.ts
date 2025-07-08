import { supabase } from './supabaseClient';

export interface FieldTrial {
  id: string;
  name: string;
  trial_code: string;
  crop: string;
  variety_hybrid?: string;
  trial_type: string;
  season: string;
  start_date: string;
  end_date: string;
  status: 'planned' | 'ongoing' | 'completed' | 'cancelled';
  objective: string;
  farm_name: string;
  field_location: string;
  gps_coordinates?: string;
  trial_area?: number;
  responsible_agronomist_id?: string;
  responsible_agronomist_ids?: string[];
  created_at: string;
  updated_at: string;
  tags?: string[];
  trial_category?: string;
  budget?: number;
  spent?: number;
  completion_percentage?: number;
  notifications_enabled?: boolean;
  is_draft?: boolean;
  design_type?: string;
  replications?: number;
  plot_width?: number;
  plot_length?: number;
  plot_unit?: string;
  row_spacing?: number;
  total_plots?: number;
}

export interface FieldTrialTeam {
  id: string;
  trial_id: string;
  user_id: string;
  role: 'viewer' | 'editor' | 'admin';
  added_at: string;
  user?: {
    id: string;
    name: string;
    email: string;
    avatar_url?: string;
  };
}

export interface FieldTrialTask {
  id: string;
  trial_id: string;
  title: string;
  description?: string;
  due_date: string;
  status: 'pending' | 'in_progress' | 'completed';
  responsible_person_id: string;
  priority: 'low' | 'medium' | 'high';
  created_at: string;
  updated_at: string;
  responsible_person?: {
    id: string;
    name: string;
    email: string;
    avatar_url?: string;
  };
}

export interface FieldTrialAttachment {
  id: string;
  trial_id: string;
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  uploaded_by: string;
  uploaded_at: string;
  description?: string;
  attachment_type?: 'protocol' | 'pre_trial_data' | 'document' | 'image';
}

export interface FieldTrialPlot {
  id: string;
  trial_id: string;
  plot_number: string;
  treatment?: string;
  repetition?: string;
  geojson?: any;
  area?: number;
  created_at: string;
}

export interface FieldTrialTreatment {
  id: string;
  trial_id: string;
  name: string;
  description?: string;
  application_method?: string;
  rate?: string;
  timing?: string;
  color?: string;
  created_at: string;
  updated_at: string;
}

export interface FieldTrialVariable {
  id: string;
  trial_id: string;
  name: string;
  unit?: string;
  frequency?: string;
  description?: string;
  data_type?: string;
  created_at: string;
  updated_at: string;
}

export interface FieldTrialData {
  id: string;
  trial_id: string;
  plot_id: string;
  variable_id: string;
  value: string;
  measurement_date: string;
  recorded_by: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface FieldTrialNote {
  id: string;
  trial_id: string;
  title: string;
  content: string;
  author_id: string;
  created_at: string;
  updated_at: string;
  author?: {
    id: string;
    name: string;
    email: string;
    avatar_url?: string;
  };
}

// Field Trials CRUD Operations
export const fieldTrialsApi = {
  // Get all field trials - Simplified version
  async getFieldTrials(userId?: string): Promise<FieldTrial[]> {
    try {
      console.log('🔍 Fetching field trials...');
      
      let query = supabase
        .from('field_trials')
        .select('*')
        .order('created_at', { ascending: false });

      // Only add user filter if userId is provided and RLS is enabled
      if (userId) {
        console.log('👤 Filtering by user ID:', userId);
        query = query.or(`responsible_agronomist_id.eq.${userId},id.in.(select trial_id from field_trial_teams where user_id = ${userId})`);
      }

      const { data, error } = await query;
      
      if (error) {
        console.error('❌ Error fetching field trials:', error);
        throw error;
      }
      
      console.log('✅ Successfully fetched', data?.length || 0, 'trials');
      return data || [];
      
    } catch (error) {
      console.error('💥 Field trials fetch failed:', error);
      throw error;
    }
  },

  // Get all field trials - Public version (no RLS restrictions)
  async getFieldTrialsPublic(): Promise<FieldTrial[]> {
    try {
      console.log('🔍 Fetching field trials (public)...');
      
      const { data, error } = await supabase
        .from('field_trials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Error fetching field trials:', error);
        throw error;
      }
      
      console.log('✅ Successfully fetched', data?.length || 0, 'trials');
      return data || [];
      
    } catch (error) {
      console.error('💥 Field trials fetch failed:', error);
      throw error;
    }
  },

  // Get single field trial with all related data
  async getFieldTrial(id: string): Promise<FieldTrial | null> {
    const { data, error } = await supabase
      .from('field_trials')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  // Get field trial with all related data
  async getFieldTrialWithDetails(id: string): Promise<any> {
    const { data: trial, error: trialError } = await supabase
      .from('field_trials')
      .select('*')
      .eq('id', id)
      .single();

    if (trialError) throw trialError;

    // Get related data
    const [teams, tasks, attachments, plots, treatments, variables, notes] = await Promise.all([
      fieldTrialTeamApi.getTeamMembers(id),
      fieldTrialTaskApi.getTasks(id),
      fieldTrialAttachmentApi.getAttachments(id),
      fieldTrialPlotApi.getPlots(id),
      fieldTrialTreatmentApi.getTreatments(id),
      fieldTrialVariableApi.getVariables(id),
      fieldTrialNoteApi.getNotes(id)
    ]);

    return {
      ...trial,
      teams,
      tasks,
      attachments,
      plots,
      treatments,
      variables,
      notes
    };
  },

  // Create field trial - Simplified version
  async createFieldTrial(trial: Omit<FieldTrial, 'id' | 'created_at' | 'updated_at'>): Promise<FieldTrial> {
    try {
      console.log('🚀 Creating trial with data:', trial);
      
      // Clean up the data to only include valid fields
      const cleanTrialData = {
        name: trial.name,
        trial_code: trial.trial_code || await fieldTrialsApi.generateTrialCode(),
        crop: trial.crop,
        variety_hybrid: trial.variety_hybrid,
        trial_type: trial.trial_type,
        season: trial.season,
        start_date: trial.start_date,
        end_date: trial.end_date,
        status: trial.status,
        objective: trial.objective,
        farm_name: trial.farm_name,
        field_location: trial.field_location,
        gps_coordinates: trial.gps_coordinates,
        trial_area: trial.trial_area,
        responsible_agronomist_ids: trial.responsible_agronomist_ids || [],
        tags: trial.tags,
        trial_category: trial.trial_category,
        budget: trial.budget,
        spent: trial.spent || 0,
        completion_percentage: trial.completion_percentage || 0,
        notifications_enabled: trial.notifications_enabled || false,
        is_draft: trial.is_draft !== undefined ? trial.is_draft : true
      };

      // Remove any undefined values to avoid database errors
      Object.keys(cleanTrialData).forEach(key => {
        if (cleanTrialData[key] === undefined) {
          delete cleanTrialData[key];
        }
      });

      console.log('🧹 Cleaned trial data:', cleanTrialData);

      // First insert without select to avoid the columns parameter issue
      const { data: insertResult, error: insertError } = await supabase
        .from('field_trials')
        .insert([cleanTrialData]);

      if (insertError) {
        console.error('❌ Database error:', insertError);
        throw insertError;
      }

      // Then fetch the created trial using the trial_code
      const { data: createdTrial, error: fetchError } = await supabase
        .from('field_trials')
        .select('*')
        .eq('trial_code', cleanTrialData.trial_code)
        .single();

      if (fetchError) {
        console.error('❌ Fetch created trial error:', fetchError);
        throw fetchError;
      }

      console.log('✅ Trial created successfully:', createdTrial);
      return createdTrial;
      
    } catch (error) {
      console.error('💥 Trial creation failed:', error);
      throw error;
    }
  },

  // Create field trial with related data
  async createFieldTrialWithDetails(trialData: any): Promise<FieldTrial> {
    const { collaborators, roles, tasks, attachments, ...trial } = trialData;

    // Create the main trial
    const createdTrial = await fieldTrialsApi.createFieldTrial(trial);

    // Add team members
    if (collaborators && collaborators.length > 0) {
      for (const userId of collaborators) {
        try {
          console.log('👥 Adding team member:', { trialId: createdTrial.id, userId, role: roles[userId] || 'viewer' });
          await fieldTrialTeamApi.addTeamMember(createdTrial.id, userId, roles[userId] || 'viewer');
          console.log('✅ Team member added:', userId);
        } catch (err) {
          console.error('❌ Failed to add team member:', { trialId: createdTrial.id, userId, error: err });
        }
      }
    }

    // Add tasks
    if (tasks && tasks.length > 0) {
      for (const task of tasks) {
        if (task.name && task.date) {
          await fieldTrialTaskApi.createTask(createdTrial.id, {
            title: task.name,
            due_date: task.date,
            status: task.status || 'pending',
            responsible_person_id: task.responsible || trial.responsible_agronomist_id,
            priority: 'medium'
          });
        }
      }
    }

    // Add attachments (if any files were uploaded)
    if (attachments && attachments.length > 0) {
      for (const attachment of attachments) {
        if (attachment.file) {
          await fieldTrialAttachmentApi.uploadAttachment(createdTrial.id, attachment.file, attachment.description);
        }
      }
    }

    return createdTrial;
  },

  // Update field trial
  async updateFieldTrial(id: string, updates: Partial<FieldTrial>): Promise<FieldTrial> {
    const { data, error } = await supabase
      .from('field_trials')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete field trial
  async deleteFieldTrial(id: string): Promise<void> {
    const { error } = await supabase
      .from('field_trials')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Generate trial code
  async generateTrialCode(): Promise<string> {
    const { data } = await supabase
      .from('field_trials')
      .select('trial_code')
      .order('created_at', { ascending: false })
      .limit(1);

    const lastCode = data?.[0]?.trial_code || 'TRIAL-0000';
    
    // Handle cases where the last code might not be in the expected format
    if (!lastCode.includes('-')) {
      return `TRIAL-0001`;
    }
    
    const parts = lastCode.split('-');
    if (parts.length < 2) {
      return `TRIAL-0001`;
    }
    
    const lastNumber = parseInt(parts[1]) || 0;
    const newNumber = lastNumber + 1;
    return `TRIAL-${newNumber.toString().padStart(4, '0')}`;
  }
};

// Team Management
export const fieldTrialTeamApi = {
  // Get team members for a trial
  async getTeamMembers(trialId: string): Promise<FieldTrialTeam[]> {
    const { data, error } = await supabase
      .from('field_trial_teams')
      .select('*')
      .eq('trial_id', trialId);

    if (error) {
      console.warn('Failed to fetch team members:', error);
      return [];
    }
    
    // For now, return team members without user details to avoid the join issue
    // User details can be fetched separately if needed
    return data || [];
  },

  // Add team member
  async addTeamMember(trialId: string, userId: string, role: 'viewer' | 'editor' | 'admin'): Promise<FieldTrialTeam> {
    const { data, error } = await supabase
      .from('field_trial_teams')
      .insert([{
        trial_id: trialId,
        user_id: userId,
        role
      }])
      .select('*')
      .single();

    if (error) throw error;
    return data;
  },

  // Update team member role
  async updateTeamMemberRole(trialId: string, userId: string, role: 'viewer' | 'editor' | 'admin'): Promise<FieldTrialTeam> {
    const { data, error } = await supabase
      .from('field_trial_teams')
      .update({ role })
      .eq('trial_id', trialId)
      .eq('user_id', userId)
      .select('*')
      .single();

    if (error) throw error;
    return data;
  },

  // Remove team member
  async removeTeamMember(trialId: string, userId: string): Promise<void> {
    const { error } = await supabase
      .from('field_trial_teams')
      .delete()
      .eq('trial_id', trialId)
      .eq('user_id', userId);

    if (error) throw error;
  }
};

// Task Management
export const fieldTrialTaskApi = {
  // Get tasks for a trial
  async getTasks(trialId: string): Promise<FieldTrialTask[]> {
    const { data, error } = await supabase
      .from('field_trial_tasks')
      .select('*')
      .eq('trial_id', trialId)
      .order('due_date', { ascending: true });
    if (error) throw error;
    return data || [];
  },

  // Create task
  async createTask(trialId: string, task: Omit<FieldTrialTask, 'id' | 'trial_id' | 'created_at' | 'updated_at'>): Promise<FieldTrialTask> {
    const { data, error } = await supabase
      .from('field_trial_tasks')
      .insert([{ ...task, trial_id: trialId }])
      .select('*')
      .single();
    if (error) throw error;
    return data;
  },

  // Update task
  async updateTask(id: string, updates: Partial<FieldTrialTask>): Promise<FieldTrialTask> {
    const { data, error } = await supabase
      .from('field_trial_tasks')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select('*')
      .single();
    if (error) throw error;
    return data;
  },

  // Delete task
  async deleteTask(id: string): Promise<void> {
    const { error } = await supabase
      .from('field_trial_tasks')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};

// File Attachments
export const fieldTrialAttachmentApi = {
  // Get attachments for a trial
  async getAttachments(trialId: string): Promise<FieldTrialAttachment[]> {
    const { data, error } = await supabase
      .from('field_trial_attachments')
      .select('*')
      .eq('trial_id', trialId)
      .order('uploaded_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Upload attachment
  async uploadAttachment(
    trialId: string,
    file: File,
    description?: string,
    attachmentType: 'protocol' | 'pre_trial_data' | 'document' | 'image' = 'document'
  ): Promise<FieldTrialAttachment> {
    const fileName = `${trialId}/${Date.now()}-${file.name}`;
    
    // Upload file to storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('field-trial-attachments')
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    // Create attachment record
    const { data, error } = await supabase
      .from('field_trial_attachments')
      .insert([{
        trial_id: trialId,
        file_name: file.name,
        file_path: fileName,
        file_type: file.type,
        file_size: file.size,
        description,
        attachment_type: attachmentType
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete attachment
  async deleteAttachment(id: string): Promise<void> {
    const { data: attachment, error: fetchError } = await supabase
      .from('field_trial_attachments')
      .select('file_path')
      .eq('id', id)
      .single();

    if (fetchError) throw fetchError;

    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from('field-trial-attachments')
      .remove([attachment.file_path]);

    if (storageError) throw storageError;

    // Delete from database
    const { error: deleteError } = await supabase
      .from('field_trial_attachments')
      .delete()
      .eq('id', id);

    if (deleteError) throw deleteError;
  },

  // Get download URL
  async getDownloadUrl(filePath: string): Promise<string> {
    const { data } = await supabase.storage
      .from('field-trial-attachments')
      .createSignedUrl(filePath, 3600); // 1 hour expiry

    return data?.signedUrl || '';
  }
};

// Plot Management
export const fieldTrialPlotApi = {
  // Get plots for a trial
  async getPlots(trialId: string): Promise<FieldTrialPlot[]> {
    const { data, error } = await supabase
      .from('field_trial_plots')
      .select('*')
      .eq('trial_id', trialId)
      .order('plot_number', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  // Create plot
  async createPlot(plot: Omit<FieldTrialPlot, 'id' | 'created_at'>): Promise<FieldTrialPlot> {
    const { data, error } = await supabase
      .from('field_trial_plots')
      .insert([plot])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update plot
  async updatePlot(id: string, updates: Partial<FieldTrialPlot>): Promise<FieldTrialPlot> {
    const { data, error } = await supabase
      .from('field_trial_plots')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete plot
  async deletePlot(id: string): Promise<void> {
    const { error } = await supabase
      .from('field_trial_plots')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};

// Treatment Management
export const fieldTrialTreatmentApi = {
  // Get treatments for a trial
  async getTreatments(trialId: string): Promise<FieldTrialTreatment[]> {
    const { data, error } = await supabase
      .from('field_trial_treatments')
      .select('*')
      .eq('trial_id', trialId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  // Create treatment
  async createTreatment(treatment: Omit<FieldTrialTreatment, 'id' | 'created_at' | 'updated_at'>): Promise<FieldTrialTreatment> {
    const { data, error } = await supabase
      .from('field_trial_treatments')
      .insert([treatment])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update treatment
  async updateTreatment(id: string, updates: Partial<FieldTrialTreatment>): Promise<FieldTrialTreatment> {
    const { data, error } = await supabase
      .from('field_trial_treatments')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete treatment
  async deleteTreatment(id: string): Promise<void> {
    const { error } = await supabase
      .from('field_trial_treatments')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};

// Variable Management
export const fieldTrialVariableApi = {
  // Get variables for a trial
  async getVariables(trialId: string): Promise<FieldTrialVariable[]> {
    const { data, error } = await supabase
      .from('field_trial_variables')
      .select('*')
      .eq('trial_id', trialId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  // Create variable
  async createVariable(variable: Omit<FieldTrialVariable, 'id' | 'created_at' | 'updated_at'>): Promise<FieldTrialVariable> {
    const { data, error } = await supabase
      .from('field_trial_variables')
      .insert([variable])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update variable
  async updateVariable(id: string, updates: Partial<FieldTrialVariable>): Promise<FieldTrialVariable> {
    const { data, error } = await supabase
      .from('field_trial_variables')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete variable
  async deleteVariable(id: string): Promise<void> {
    const { error } = await supabase
      .from('field_trial_variables')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};

// Data Management
export const fieldTrialDataApi = {
  // Get data for a trial
  async getData(trialId: string): Promise<FieldTrialData[]> {
    const { data, error } = await supabase
      .from('field_trial_data')
      .select('*')
      .eq('trial_id', trialId)
      .order('measurement_date', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Create data entry
  async createData(dataEntry: Omit<FieldTrialData, 'id' | 'created_at' | 'updated_at'>): Promise<FieldTrialData> {
    const { data, error } = await supabase
      .from('field_trial_data')
      .insert([dataEntry])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update data entry
  async updateData(id: string, updates: Partial<FieldTrialData>): Promise<FieldTrialData> {
    const { data, error } = await supabase
      .from('field_trial_data')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete data entry
  async deleteData(id: string): Promise<void> {
    const { error } = await supabase
      .from('field_trial_data')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};

// Notes Management
export const fieldTrialNoteApi = {
  // Get notes for a trial
  async getNotes(trialId: string): Promise<FieldTrialNote[]> {
    const { data, error } = await supabase
      .from('field_trial_notes')
      .select('*')
      .eq('trial_id', trialId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  // Create note
  async createNote(note: Omit<FieldTrialNote, 'id' | 'created_at' | 'updated_at'>): Promise<FieldTrialNote> {
    const { data, error } = await supabase
      .from('field_trial_notes')
      .insert([note])
      .select('*')
      .single();
    if (error) throw error;
    return data;
  },

  // Update note
  async updateNote(id: string, updates: Partial<FieldTrialNote>): Promise<FieldTrialNote> {
    const { data, error } = await supabase
      .from('field_trial_notes')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select('*')
      .single();
    if (error) throw error;
    return data;
  },

  // Delete note
  async deleteNote(id: string): Promise<void> {
    const { error } = await supabase
      .from('field_trial_notes')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};

// Layout Management
export const fieldTrialLayoutApi = {
  // Get layout for a trial
  async getLayout(trialId: string) {
    const { data, error } = await supabase
      .from('field_trial_layouts')
      .select('*')
      .eq('trial_id', trialId)
      .single();
    if (error) throw error;
    return data;
  },

  // Create layout for a trial
  async createLayout(trialId, layoutData) {
    const { data, error } = await supabase
      .from('field_trial_layouts')
      .insert([{ trial_id: trialId, ...layoutData }])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // Update layout for a trial
  async updateLayout(layoutId, layoutData) {
    const { data, error } = await supabase
      .from('field_trial_layouts')
      .update({ ...layoutData, updated_at: new Date().toISOString() })
      .eq('id', layoutId)
      .select()
      .single();
    if (error) throw error;
    return data;
  }
};
