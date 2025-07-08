-- Create farm_deliveries table for weekly farm-to-office deliveries
CREATE TABLE IF NOT EXISTS farm_deliveries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  farm text NOT NULL,
  date date NOT NULL,
  delivered_by text NOT NULL,
  received_by text NOT NULL,
  produce text NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
); 