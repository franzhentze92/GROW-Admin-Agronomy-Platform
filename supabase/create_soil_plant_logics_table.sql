-- SQL script to create the Soil & Plant Logics table in Supabase
CREATE TYPE soil_plant_status AS ENUM ('Deficient', 'Optimal', 'Excess', 'Toxic', 'Unknown');

CREATE TABLE soil_plant_logics (
    id BIGSERIAL PRIMARY KEY,
    category TEXT NOT NULL,
    nutrient TEXT NOT NULL,
    status soil_plant_status NOT NULL DEFAULT 'Unknown',
    explanation TEXT
); 