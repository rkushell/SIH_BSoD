CREATE TABLE candidate (
    student_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    internship_id UUID NOT NULL,

    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,

    phone_number TEXT NOT NULL CHECK (
        phone_number ~ '^[0-9]{10}$'
    ),

    aadhar_number TEXT CHECK (
        aadhar_number ~ '^[2-9][0-9]{11}$'
    ),

    gender TEXT CHECK (
        gender IN ('Male', 'Female', 'Other')
    ),

    reservation_category TEXT CHECK (
        reservation_category IN ('General', 'OBC', 'SC', 'ST')
    ),

    
    permanent_address TEXT,
    city TEXT,
    state TEXT,
    pincode TEXT,

    area_type TEXT NOT NULL CHECK (
        area_type IN ('Rural', 'Urban')
    ),

    highest_qualification TEXT CHECK (
        highest_qualification IN ('10th', '12th', 'ITI', 'Diploma', 'UG')
    ),

    gpa NUMERIC,

    family_income NUMERIC CHECK (
        family_income >= 0 AND family_income <= 800000
    ),

    skills TEXT[] DEFAULT ARRAY[]::TEXT[] CHECK (
        skills <@ ARRAY[
            'python','sql','ml','cloud','frontend','backend','networking',
            'java','excel','analysis','presentation','communication',
            'financial_modeling','design','manufacturing','pcb_design',
            'cad_modelling','surveying','construction_management','seo',
            'social_media','writing'
        ]
        AND array_length(skills, 1) <= 6
    ),

    certifications JSONB,
    education_institute TEXT,
    preferred_location TEXT,

    company_preferences UUID[] DEFAULT ARRAY[]::UUID[] CHECK (
        array_length(company_preferences, 1) <= 6
    ),

    CONSTRAINT fk_internship
        FOREIGN KEY (internship_id)
        REFERENCES internships(internship_id)
        ON DELETE CASCADE
);
