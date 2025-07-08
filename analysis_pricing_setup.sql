-- Analysis Pricing Setup
-- This script creates the pricing management system for analysis types

-- Create analysis_pricing table
CREATE TABLE IF NOT EXISTS analysis_pricing (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    analysis_type VARCHAR(50) NOT NULL,
    category VARCHAR(100) NOT NULL,
    base_price DECIMAL(10,2) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(analysis_type, category)
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_analysis_pricing_type ON analysis_pricing(analysis_type);
CREATE INDEX IF NOT EXISTS idx_analysis_pricing_active ON analysis_pricing(is_active);

-- Insert sample pricing data
INSERT INTO analysis_pricing (analysis_type, category, base_price, description) VALUES
    ('soil', 'Soil Chart Creation', 150.00, 'Soil analysis chart creation service'),
    ('soil', 'Soil Report Creation', 200.00, 'Soil analysis report creation service'),
    ('leaf', 'Leaf Chart Creation', 120.00, 'Leaf analysis chart creation service'),
    ('leaf', 'Leaf Report Creation', 180.00, 'Leaf analysis report creation service')
ON CONFLICT (analysis_type, category) DO NOTHING;

-- Add pricing fields to existing analysis_tracker table
ALTER TABLE analysis_tracker 
ADD COLUMN IF NOT EXISTS unit_price DECIMAL(10,2) DEFAULT 0.00,
ADD COLUMN IF NOT EXISTS total_price DECIMAL(10,2) DEFAULT 0.00;

-- Create function to update total price based on unit price and test count
CREATE OR REPLACE FUNCTION update_analysis_total_price()
RETURNS TRIGGER AS $$
BEGIN
    -- Calculate total price based on unit price and test count
    NEW.total_price = COALESCE(NEW.unit_price, 0) * COALESCE(NEW.test_count, 1);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update total price
DROP TRIGGER IF EXISTS trigger_update_analysis_total_price ON analysis_tracker;
CREATE TRIGGER trigger_update_analysis_total_price
    BEFORE INSERT OR UPDATE ON analysis_tracker
    FOR EACH ROW
    EXECUTE FUNCTION update_analysis_total_price();

-- Enable Row Level Security
ALTER TABLE analysis_pricing ENABLE ROW LEVEL SECURITY;

-- Create policies for analysis_pricing
CREATE POLICY "Enable read access for all users" ON analysis_pricing
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users" ON analysis_pricing
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users" ON analysis_pricing
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users" ON analysis_pricing
    FOR DELETE USING (auth.role() = 'authenticated');

-- Grant necessary permissions
GRANT ALL ON analysis_pricing TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;

-- Update existing analyses with default pricing
UPDATE analysis_tracker 
SET unit_price = (
    SELECT base_price 
    FROM analysis_pricing 
    WHERE analysis_type = analysis_tracker.analysis_type AND category = analysis_tracker.category
    LIMIT 1
)
WHERE unit_price = 0 OR unit_price IS NULL;

-- Update total prices for existing records
UPDATE analysis_tracker 
SET total_price = COALESCE(unit_price, 0) * COALESCE(test_count, 1)
WHERE total_price = 0 OR total_price IS NULL; 