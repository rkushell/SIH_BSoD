

CREATE TABLE internships (

    --Internship ID: Primary key
    internship_id TEXT PRIMARY KEY,

    company_id TEXT NOT NULL, --Foreign key

    -- Internship details
    title TEXT NOT NULL,
    description TEXT,

    --Requirements[Based on the internship]
    required_skills TEXT[], -- A CHECK CONSTRAINT NEEDS TO BE ADDED
    gpa_requirement NUMERIC,

    sector_category TEXT,
    location TEXT,
    capacity INTEGER, -- VACANCIES(VERY VERY IMPORTANT)

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    CONSTRAINT fk_company
        FOREIGN KEY (company_id)
        REFERENCES companies(company_id)
        ON DELETE CASCADE
);


-- 1. Add missing column: tier
ALTER TABLE internships
ADD COLUMN tier TEXT;

-- Add CHECK constraint on tier
ALTER TABLE internships
ADD CONSTRAINT chk_internship_tier
CHECK (tier IN ('Tier 1', 'Tier 2', 'Tier 3'));


-- 2. Add missing column: stipend
ALTER TABLE internships
ADD COLUMN stipend NUMERIC;

-- Add CHECK constraint on stipend
ALTER TABLE internships
ADD CONSTRAINT chk_internship_stipend
CHECK (stipend >= 0);


-- 3. Add CHECK for sector_category
ALTER TABLE internships
ADD CONSTRAINT chk_internship_sector_category
CHECK (
    sector_category IN (
        'Finance', 'Marketing', 'Electronics', 'Mechanical',
        'IT Services', 'Healthcare', 'Automobile'
    )
);


-- 4. Add CHECK for location
ALTER TABLE internships
ADD CONSTRAINT chk_internship_location
CHECK (
    location IN ('Office', 'Factory', 'Remote')
);

DROP TABLE internships;
DROP TABLE companies;

