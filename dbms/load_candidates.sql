

-- *** CORRECTED CANDIDATES DATA LOAD SCRIPT (v3) ***

-- 1. Safely drop and recreate the final table
DROP TABLE IF EXISTS pm_internship_candidates_data CASCADE;

CREATE TABLE pm_internship_candidates_data (
    student_id TEXT PRIMARY KEY,
    gpa NUMERIC,
    skills TEXT[],
    reservation_category TEXT,
    area_type TEXT,
    gender TEXT,
    company_preferences TEXT[]
);

-- 2. Safely drop and recreate the TEMPORARY staging table
DROP TABLE IF EXISTS staging_candidates CASCADE;

CREATE TEMPORARY TABLE staging_candidates (
    student_id TEXT,
    gpa NUMERIC,
    skills TEXT,
    reservation TEXT,
    rural INTEGER,
    gender TEXT,
    pref_1 TEXT, pref_2 TEXT, pref_3 TEXT, pref_4 TEXT, pref_5 TEXT, pref_6 TEXT
);

-- 3. Use the CLIENT-SIDE \copy command to load data from the CSV file.
-- Note the path MUST be correct from your perspective, as the client reads it.
\copy staging_candidates FROM '/Users/srinidhi/SIH_BSoD/dbms/pm_internship_candidates_6000.csv' DELIMITER ',' CSV HEADER;

-- 4. Insert the cleaned and transformed data into the final table.
INSERT INTO pm_internship_candidates_data (
    student_id,
    gpa,
    skills,
    reservation_category,
    area_type,
    gender,
    company_preferences
)
SELECT
    s.student_id,
    s.gpa,
    regexp_split_to_array(s.skills, E';') AS skills,
    s.reservation,
    CASE s.rural WHEN 0 THEN 'Urban' WHEN 1 THEN 'Rural' ELSE NULL END AS area_type,
    s.gender,
    ARRAY[s.pref_1, s.pref_2, s.pref_3, s.pref_4, s.pref_5, s.pref_6]::TEXT[] AS company_preferences
FROM staging_candidates s;

-- 5. Clean up
DROP TABLE staging_candidates;