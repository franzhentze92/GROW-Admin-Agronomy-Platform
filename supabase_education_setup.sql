-- Education Management Database Setup for G.R.O.W Education Platform

-- Events Table for Super Admin Event Management
CREATE TABLE IF NOT EXISTS events (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    slug text GENERATED ALWAYS AS (regexp_replace(lower(title), '[^a-z0-9]+', '-', 'g')) STORED,
    title text NOT NULL,
    description text,
    notes text,
    date date NOT NULL,
    time time,
    end_date date,
    end_time time,
    location text,
    cost text,
    cost_unit text,
    image text,
    link text,
    featured boolean DEFAULT false,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_events_slug ON events(slug);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);

-- RLS: Only super admins can insert/update/delete, all users can select
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow read for all" ON events FOR SELECT USING (true);
CREATE POLICY "Allow super admin write" ON events FOR ALL USING (auth.role() = 'super_admin');
