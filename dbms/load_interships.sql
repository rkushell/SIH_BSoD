

-- *** CORRECTED INTERNSHIPS DATA LOAD SCRIPT (v3) ***

-- 1. Create a TEMPORARY staging table to load the raw CSV data.
DROP TABLE IF EXISTS staging_internships CASCADE;

CREATE TEMPORARY TABLE staging_internships (
    internship_ref_id TEXT,
    sector TEXT,
    tier TEXT,
    capacity INTEGER,
    required_skills TEXT,
    stipend NUMERIC,
    location_type TEXT
);

-- 2. Use the CLIENT-SIDE \copy command to load data from the CSV file.
-- Note the path MUST be correct from your perspective.
\copy staging_internships (internship_ref_id, sector, tier, capacity, required_skills, stipend, location_type) FROM '/Users/srinidhi/SIH_BSoD/dbms/internships_pm_internships.csv' DELIMITER ',' CSV HEADER;

-- 3. Insert the cleaned and transformed data into your main 'internships' table.
-- We use gen_random_uuid() to satisfy the UUID primary key constraint.
INSERT INTO internships (
    internship_id,
    company_id,
    title,
    sector_category,
    tier,
    capacity,
    required_skills,
    stipend,
    location
)
SELECT
    gen_random_uuid() AS internship_id,
    '00000000-0000-0000-0000-000000000001'::UUID AS company_id,
    'Internship ' || s.internship_ref_id AS title,
    s.sector,
    s.tier,
    s.capacity,
    regexp_split_to_array(s.required_skills, E';') AS required_skills,
    s.stipend,
    s.location_type
FROM staging_internships s;

-- 4. Clean up
DROP TABLE staging_internships;