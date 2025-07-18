-- Field Trials Database Setup

-- Create field_trials table
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
  trial_area DECIMAL(10,2),
  responsible_agronomist_id UUID REFERENCES auth.users(id),
  tags TEXT[],
  trial_category VARCHAR(100),
  budget DECIMAL(12,2),
  spent DECIMAL(12,2),
  completion_percentage INTEGER DEFAULT 0 CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create field_trial_teams table
CREATE TABLE IF NOT EXISTS field_trial_teams (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  trial_id UUID REFERENCES field_trials(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role VARCHAR(20) DEFAULT 'viewer' CHECK (role IN ('viewer', 'editor', 'admin')),
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(trial_id, user_id)
);

-- Create field_trial_tasks table
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

-- Create field_trial_attachments table
CREATE TABLE IF NOT EXISTS field_trial_attachments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  trial_id UUID REFERENCES field_trials(id) ON DELETE CASCADE,
  file_name VARCHAR(255) NOT NULL,
  file_path TEXT NOT NULL,
  file_type VARCHAR(100),
  file_size BIGINT,
  uploaded_by UUID REFERENCES auth.users(id),
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  description TEXT
);

-- Create field_trial_plots table
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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_field_trials_responsible_agronomist ON field_trials(responsible_agronomist_id);
CREATE INDEX IF NOT EXISTS idx_field_trials_status ON field_trials(status);
CREATE INDEX IF NOT EXISTS idx_field_trials_crop ON field_trials(crop);
CREATE INDEX IF NOT EXISTS idx_field_trial_teams_trial_id ON field_trial_teams(trial_id);
CREATE INDEX IF NOT EXISTS idx_field_trial_teams_user_id ON field_trial_teams(user_id);
CREATE INDEX IF NOT EXISTS idx_field_trial_tasks_trial_id ON field_trial_tasks(trial_id);
CREATE INDEX IF NOT EXISTS idx_field_trial_attachments_trial_id ON field_trial_attachments(trial_id);
CREATE INDEX IF NOT EXISTS idx_field_trial_plots_trial_id ON field_trial_plots(trial_id);

-- Enable Row Level Security
ALTER TABLE field_trials ENABLE ROW LEVEL SECURITY;
ALTER TABLE field_trial_teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE field_trial_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE field_trial_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE field_trial_plots ENABLE ROW LEVEL SECURITY;

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

-- Insert sample data
INSERT INTO field_trials (name, trial_code, crop, trial_type, season, start_date, end_date, status, objective, farm_name, field_location, trial_area, budget, completion_percentage) VALUES
('Corn Yield Optimization Trial', 'TRIAL-0001', 'Corn', 'Yield Trial', 'Spring 2024', '2024-03-15', '2024-09-15', 'ongoing', 'Optimize corn yield through improved fertilization practices', 'Green Acres Farm', 'Field A, Section 3', 25.5, 15000.00, 45),
('Soybean Disease Resistance Study', 'TRIAL-0002', 'Soybeans', 'Disease Resistance', 'Spring 2024', '2024-04-01', '2024-10-01', 'planned', 'Evaluate soybean varieties for disease resistance', 'Sunset Valley Farm', 'Field B, Section 1', 18.0, 12000.00, 0),
('Wheat Nutrient Management', 'TRIAL-0003', 'Wheat', 'Nutrient Management', 'Fall 2023', '2023-09-01', '2024-06-01', 'completed', 'Study optimal nutrient application rates for wheat', 'Prairie View Farm', 'Field C, Section 2', 30.0, 18000.00, 100),
('Cotton Irrigation Efficiency', 'TRIAL-0004', 'Cotton', 'Irrigation Study', 'Summer 2024', '2024-05-01', '2024-11-01', 'ongoing', 'Improve irrigation efficiency for cotton production', 'Delta Farm', 'Field D, Section 4', 22.5, 14000.00, 30)
ON CONFLICT (trial_code) DO NOTHING;
