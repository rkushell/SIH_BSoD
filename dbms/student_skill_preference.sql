

CREATE TABLE student_skills_preferences (
    -- Preference ID for future reference : Primary key
    pref_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    student_id UUID NOT NULL, -- Foreign key from "student_bio" table

    skills TEXT[] DEFAULT '{}' CHECK (
        -- All elements in the array must be in the allowed list
        skills <@ ARRAY[
            'Research',
            'Writing',
            'Presentation',
            'Analytical Thinking',
            'Project Participation',
            'Communication',
            'Data Analysis',
            'Report Preparation',
            'Problem Solving',
            'Event Coordination',
            'Policy Understanding',
            'Computer Literacy',
            'All'
        ]
        AND array_length(skills, 1) <= 6 -- Limiting to 6 skills only that the user can input
    ),

    certifications JSONB, -- Certifications will be for the company
    education_institute TEXT, -- Company purpose

    preferred_location_1 TEXT,
    preferred_location_2 TEXT,

    company_preferences UUID[] DEFAULT '{}' CHECK (
        array_length(company_preferences, 1) <= 6
    ), -- We are limiting company preferences to 6

    CONSTRAINT fk_student
        FOREIGN KEY (student_id)
        REFERENCES student_bio(student_id)
        ON DELETE CASCADE
);

