-- Field Trials Database Setup - Manual Execution Script
-- This script creates all necessary tables for the field trials system
-- Run this in your Supabase SQL Editor

-- Create field_trials table (main trial information)
CREATE TABLE IF NOT EXISTS field_trials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  trial_code VARCHAR(50) UNIQUE NOT NULL,
  crop VARCHAR(100) NOT NULL,
  variety_hybrid VARCHAR(100),
  trial_type VARCHAR(100) NOT NULL,
  season VARCHAR(50) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status VARCHAR(20) DEFAULT 'planned' CHECK (status IN ('planned', 'ongoing', 'completed', 'cancelled')),
  objective TEXT,
  farm_name VARCHAR(255) NOT NULL,
  field_location VARCHAR(255) NOT NULL,
  gps_coordinates VARCHAR(100),
  trial_area DECIMAL(10,2),
  responsible_agronomist_id UUID REFERENCES auth.users(id),
  tags TEXT[],
  trial_category VARCHAR(100),
  budget DECIMAL(12,2),
  spent DECIMAL(12,2) DEFAULT 0,
  completion_percentage INTEGER DEFAULT 0 CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
  notifications_enabled BOOLEAN DEFAULT false,
  is_draft BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create field_trial_teams table (collaborators and roles)
CREATE TABLE IF NOT EXISTS field_trial_teams (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  trial_id UUID REFERENCES field_trials(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role VARCHAR(20) DEFAULT 'viewer' CHECK (role IN ('viewer', 'editor', 'admin')),
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(trial_id, user_id)
);

-- Create field_trial_tasks table (tasks and milestones)
CREATE TABLE IF NOT EXISTS field_trial_tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  trial_id UUID REFERENCES field_trials(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  due_date DATE NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
  responsible_person_id UUID REFERENCES auth.users(id),
  priority VARCHAR(10) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create field_trial_attachments table (protocols, documents, etc.)
CREATE TABLE IF NOT EXISTS field_trial_attachments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  trial_id UUID REFERENCES field_trials(id) ON DELETE CASCADE,
  file_name VARCHAR(255) NOT NULL,
  file_path TEXT NOT NULL,
  file_type VARCHAR(100),
  file_size BIGINT,
  uploaded_by UUID REFERENCES auth.users(id),
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  description TEXT,
  attachment_type VARCHAR(50) DEFAULT 'document' CHECK (attachment_type IN ('protocol', 'pre_trial_data', 'document', 'image'))
);

-- Create field_trial_plots table (field layout and plots)
CREATE TABLE IF NOT EXISTS field_trial_plots (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  trial_id UUID REFERENCES field_trials(id) ON DELETE CASCADE,
  plot_number VARCHAR(50) NOT NULL,
  treatment VARCHAR(100),
  repetition VARCHAR(50),
  geojson JSONB,
  area DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(trial_id, plot_number)
);

-- Create field_trial_treatments table (treatments and variables)
CREATE TABLE IF NOT EXISTS field_trial_treatments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  trial_id UUID REFERENCES field_trials(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  application_method VARCHAR(100),
  rate VARCHAR(100),
  timing VARCHAR(100),
  color VARCHAR(7) DEFAULT '#6b7280',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create field_trial_variables table (measurement variables)
CREATE TABLE IF NOT EXISTS field_trial_variables (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  trial_id UUID REFERENCES field_trials(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  unit VARCHAR(50),
  frequency VARCHAR(100),
  description TEXT,
  data_type VARCHAR(50) DEFAULT 'numeric',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create field_trial_data table (actual measurements)
CREATE TABLE IF NOT EXISTS field_trial_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  trial_id UUID REFERENCES field_trials(id) ON DELETE CASCADE,
  plot_id UUID REFERENCES field_trial_plots(id) ON DELETE CASCADE,
  variable_id UUID REFERENCES field_trial_variables(id) ON DELETE CASCADE,
  value TEXT NOT NULL,
  measurement_date DATE NOT NULL,
  recorded_by UUID REFERENCES auth.users(id),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create field_trial_notes table (trial notes and observations)
CREATE TABLE IF NOT EXISTS field_trial_notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  trial_id UUID REFERENCES field_trials(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_field_trials_responsible_agronomist ON field_trials(responsible_agronomist_id);
CREATE INDEX IF NOT EXISTS idx_field_trials_status ON field_trials(status);
CREATE INDEX IF NOT EXISTS idx_field_trials_crop ON field_trials(crop);
CREATE INDEX IF NOT EXISTS idx_field_trials_trial_code ON field_trials(trial_code);
CREATE INDEX IF NOT EXISTS idx_field_trial_teams_trial_id ON field_trial_teams(trial_id);
CREATE INDEX IF NOT EXISTS idx_field_trial_teams_user_id ON field_trial_teams(user_id);
CREATE INDEX IF NOT EXISTS idx_field_trial_tasks_trial_id ON field_trial_tasks(trial_id);
CREATE INDEX IF NOT EXISTS idx_field_trial_tasks_responsible ON field_trial_tasks(responsible_person_id);
CREATE INDEX IF NOT EXISTS idx_field_trial_attachments_trial_id ON field_trial_attachments(trial_id);
CREATE INDEX IF NOT EXISTS idx_field_trial_plots_trial_id ON field_trial_plots(trial_id);
CREATE INDEX IF NOT EXISTS idx_field_trial_treatments_trial_id ON field_trial_treatments(trial_id);
CREATE INDEX IF NOT EXISTS idx_field_trial_variables_trial_id ON field_trial_variables(trial_id);
CREATE INDEX IF NOT EXISTS idx_field_trial_data_trial_id ON field_trial_data(trial_id);
CREATE INDEX IF NOT EXISTS idx_field_trial_data_plot_id ON field_trial_data(plot_id);
CREATE INDEX IF NOT EXISTS idx_field_trial_data_variable_id ON field_trial_data(variable_id);
CREATE INDEX IF NOT EXISTS idx_field_trial_notes_trial_id ON field_trial_notes(trial_id);

-- Enable Row Level Security
ALTER TABLE field_trials ENABLE ROW LEVEL SECURITY;
ALTER TABLE field_trial_teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE field_trial_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE field_trial_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE field_trial_plots ENABLE ROW LEVEL SECURITY;
ALTER TABLE field_trial_treatments ENABLE ROW LEVEL SECURITY;
ALTER TABLE field_trial_variables ENABLE ROW LEVEL SECURITY;
ALTER TABLE field_trial_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE field_trial_notes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for field_trials
CREATE POLICY "Users can view field trials they are responsible for or team members of" ON field_trials
  FOR SELECT USING (
    responsible_agronomist_id = auth.uid() OR
    id IN (SELECT trial_id FROM field_trial_teams WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can create field trials" ON field_trials
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update field trials they are responsible for" ON field_trials
  FOR UPDATE USING (responsible_agronomist_id = auth.uid());

CREATE POLICY "Users can delete field trials they are responsible for" ON field_trials
  FOR DELETE USING (responsible_agronomist_id = auth.uid());

-- RLS Policies for field_trial_teams
CREATE POLICY "Team members can view team data" ON field_trial_teams
  FOR SELECT USING (
    user_id = auth.uid() OR
    trial_id IN (SELECT id FROM field_trials WHERE responsible_agronomist_id = auth.uid())
  );

CREATE POLICY "Trial owners can manage team members" ON field_trial_teams
  FOR ALL USING (
    trial_id IN (SELECT id FROM field_trials WHERE responsible_agronomist_id = auth.uid())
  );

-- RLS Policies for field_trial_tasks
CREATE POLICY "Users can view tasks for trials they have access to" ON field_trial_tasks
  FOR SELECT USING (
    trial_id IN (
      SELECT id FROM field_trials 
      WHERE responsible_agronomist_id = auth.uid() OR
            id IN (SELECT trial_id FROM field_trial_teams WHERE user_id = auth.uid())
    )
  );

CREATE POLICY "Users can manage tasks for trials they own" ON field_trial_tasks
  FOR ALL USING (
    trial_id IN (SELECT id FROM field_trials WHERE responsible_agronomist_id = auth.uid())
  );

-- RLS Policies for field_trial_attachments
CREATE POLICY "Users can view attachments for trials they have access to" ON field_trial_attachments
  FOR SELECT USING (
    trial_id IN (
      SELECT id FROM field_trials 
      WHERE responsible_agronomist_id = auth.uid() OR
            id IN (SELECT trial_id FROM field_trial_teams WHERE user_id = auth.uid())
    )
  );

CREATE POLICY "Users can manage attachments for trials they own" ON field_trial_attachments
  FOR ALL USING (
    trial_id IN (SELECT id FROM field_trials WHERE responsible_agronomist_id = auth.uid())
  );

-- RLS Policies for field_trial_plots
CREATE POLICY "Users can view plots for trials they have access to" ON field_trial_plots
  FOR SELECT USING (
    trial_id IN (
      SELECT id FROM field_trials 
      WHERE responsible_agronomist_id = auth.uid() OR
            id IN (SELECT trial_id FROM field_trial_teams WHERE user_id = auth.uid())
    )
  );

CREATE POLICY "Users can manage plots for trials they own" ON field_trial_plots
  FOR ALL USING (
    trial_id IN (SELECT id FROM field_trials WHERE responsible_agronomist_id = auth.uid())
  );

-- RLS Policies for field_trial_treatments
CREATE POLICY "Users can view treatments for trials they have access to" ON field_trial_treatments
  FOR SELECT USING (
    trial_id IN (
      SELECT id FROM field_trials 
      WHERE responsible_agronomist_id = auth.uid() OR
            id IN (SELECT trial_id FROM field_trial_teams WHERE user_id = auth.uid())
    )
  );

CREATE POLICY "Users can manage treatments for trials they own" ON field_trial_treatments
  FOR ALL USING (
    trial_id IN (SELECT id FROM field_trials WHERE responsible_agronomist_id = auth.uid())
  );

-- RLS Policies for field_trial_variables
CREATE POLICY "Users can view variables for trials they have access to" ON field_trial_variables
  FOR SELECT USING (
    trial_id IN (
      SELECT id FROM field_trials 
      WHERE responsible_agronomist_id = auth.uid() OR
            id IN (SELECT trial_id FROM field_trial_teams WHERE user_id = auth.uid())
    )
  );

CREATE POLICY "Users can manage variables for trials they own" ON field_trial_variables
  FOR ALL USING (
    trial_id IN (SELECT id FROM field_trials WHERE responsible_agronomist_id = auth.uid())
  );

-- RLS Policies for field_trial_data
CREATE POLICY "Users can view data for trials they have access to" ON field_trial_data
  FOR SELECT USING (
    trial_id IN (
      SELECT id FROM field_trials 
      WHERE responsible_agronomist_id = auth.uid() OR
            id IN (SELECT trial_id FROM field_trial_teams WHERE user_id = auth.uid())
    )
  );

CREATE POLICY "Users can manage data for trials they own" ON field_trial_data
  FOR ALL USING (
    trial_id IN (SELECT id FROM field_trials WHERE responsible_agronomist_id = auth.uid())
  );

-- RLS Policies for field_trial_notes
CREATE POLICY "Users can view notes for trials they have access to" ON field_trial_notes
  FOR SELECT USING (
    trial_id IN (
      SELECT id FROM field_trials 
      WHERE responsible_agronomist_id = auth.uid() OR
            id IN (SELECT trial_id FROM field_trial_teams WHERE user_id = auth.uid())
    )
  );

CREATE POLICY "Users can manage notes for trials they own" ON field_trial_notes
  FOR ALL USING (
    trial_id IN (SELECT id FROM field_trials WHERE responsible_agronomist_id = auth.uid())
  );

-- Insert sample data
INSERT INTO field_trials (name, trial_code, crop, trial_type, season, start_date, end_date, status, objective, farm_name, field_location, trial_area, budget, completion_percentage, notifications_enabled, is_draft) VALUES
('Corn Yield Optimization Trial', 'TRIAL-0001', 'Corn', 'Yield Trial', 'Spring 2024', '2024-03-15', '2024-09-15', 'ongoing', 'Optimize corn yield through improved fertilization practices', 'Green Acres Farm', 'Field A, Section 3', 25.5, 15000.00, 45, true, false),
('Soybean Disease Resistance Study', 'TRIAL-0002', 'Soybeans', 'Disease Resistance', 'Spring 2024', '2024-04-01', '2024-10-01', 'planned', 'Evaluate soybean varieties for disease resistance', 'Sunset Valley Farm', 'Field B, Section 1', 18.0, 12000.00, 0, false, true),
('Wheat Nutrient Management', 'TRIAL-0003', 'Wheat', 'Nutrient Management', 'Fall 2023', '2023-09-01', '2024-06-01', 'completed', 'Study optimal nutrient application rates for wheat', 'Prairie View Farm', 'Field C, Section 2', 30.0, 18000.00, 100, true, false),
('Cotton Irrigation Efficiency', 'TRIAL-0004', 'Cotton', 'Irrigation Study', 'Summer 2024', '2024-05-01', '2024-11-01', 'ongoing', 'Improve irrigation efficiency for cotton production', 'Delta Farm', 'Field D, Section 4', 22.5, 14000.00, 30, true, false)
ON CONFLICT (trial_code) DO NOTHING;

-- Create storage bucket for field trial attachments
INSERT INTO storage.buckets (id, name, public) VALUES ('field-trial-attachments', 'field-trial-attachments', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for field trial attachments
CREATE POLICY "Users can view attachments for trials they have access to" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'field-trial-attachments' AND
    (storage.foldername(name))[1] IN (
      SELECT id::text FROM field_trials 
      WHERE responsible_agronomist_id = auth.uid() OR
            id IN (SELECT trial_id FROM field_trial_teams WHERE user_id = auth.uid())
    )
  );

CREATE POLICY "Users can upload attachments for trials they own" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'field-trial-attachments' AND
    (storage.foldername(name))[1] IN (
      SELECT id::text FROM field_trials WHERE responsible_agronomist_id = auth.uid()
    )
  );

CREATE POLICY "Users can update attachments for trials they own" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'field-trial-attachments' AND
    (storage.foldername(name))[1] IN (
      SELECT id::text FROM field_trials WHERE responsible_agronomist_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete attachments for trials they own" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'field-trial-attachments' AND
    (storage.foldername(name))[1] IN (
      SELECT id::text FROM field_trials WHERE responsible_agronomist_id = auth.uid()
    )
  );

-- Create function to automatically generate trial codes
CREATE OR REPLACE FUNCTION generate_trial_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.trial_code IS NULL OR NEW.trial_code = '' THEN
    SELECT 'TRIAL-' || LPAD(COALESCE(MAX(CAST(SUBSTRING(trial_code FROM 7) AS INTEGER)), 0) + 1::TEXT, 4, '0')
    INTO NEW.trial_code
    FROM field_trials
    WHERE trial_code ~ '^TRIAL-\d{4}$';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-generate trial codes
CREATE TRIGGER auto_generate_trial_code
  BEFORE INSERT ON field_trials
  FOR EACH ROW
  EXECUTE FUNCTION generate_trial_code();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_field_trials_updated_at
  BEFORE UPDATE ON field_trials
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_field_trial_tasks_updated_at
  BEFORE UPDATE ON field_trial_tasks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_field_trial_treatments_updated_at
  BEFORE UPDATE ON field_trial_treatments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_field_trial_variables_updated_at
  BEFORE UPDATE ON field_trial_variables
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_field_trial_data_updated_at
  BEFORE UPDATE ON field_trial_data
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_field_trial_notes_updated_at
  BEFORE UPDATE ON field_trial_notes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
