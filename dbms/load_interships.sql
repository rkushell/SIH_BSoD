
-- 1. Safely drop and recreate the final, simplified table
DROP TABLE IF EXISTS pm_internship_data CASCADE;

CREATE TABLE pm_internship_data (
    -- Using the original text ID as the Primary Key
    internship_id TEXT PRIMARY KEY,
    sector TEXT,
    tier TEXT,
    capacity INTEGER,
    required_skills TEXT[], -- Final destination for the array of skills
    stipend NUMERIC,
    location_type TEXT
);

-- 2. Safely drop and recreate the TEMPORARY staging table
DROP TABLE IF EXISTS staging_internships CASCADE;

CREATE TEMPORARY TABLE staging_internships (
    internship_ref_id TEXT,
    sector TEXT,
    tier TEXT,
    capacity INTEGER,
    required_skills TEXT, -- Load raw semicolon-delimited string here
    stipend NUMERIC,
    location_type TEXT
);

-- 3. Use the CLIENT-SIDE \copy command to load data from the CSV file.
-- Update the path as necessary.
-- Use this line if your file is in the 'data/' subdirectory:
\copy staging_internships (internship_ref_id, sector, tier, capacity, required_skills, stipend, location_type) FROM '/Users/srinidhi/SIH_BSoD/dbms/data/internships_pm_internships.csv' DELIMITER ',' CSV HEADER

-- 4. Insert the cleaned and transformed data into the new final table.
INSERT INTO pm_internship_data (
    internship_id,
    sector,
    tier,
    capacity,
    required_skills,
    stipend,
    location_type
)
SELECT
    s.internship_ref_id AS internship_id,
    s.sector,
    -- Transformation: Fix 'TierX' to 'Tier X' for readability/consistency
    REPLACE(s.tier, 'Tier', 'Tier ') AS tier,
    s.capacity,
    -- Transformation: Convert semicolon-delimited string to a PostgreSQL TEXT array
    regexp_split_to_array(s.required_skills, E';') AS required_skills,
    s.stipend,
    s.location_type
FROM staging_internships s;

-- 5. Clean up the temporary staging table.
DROP TABLE staging_internships;

-- 6. Check the result
SELECT COUNT(*) FROM pm_internship_data;