
CREATE TABLE internships (

    --Internship ID: Primary key
    internship_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    company_id UUID NOT NULL, --Foreign key

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
