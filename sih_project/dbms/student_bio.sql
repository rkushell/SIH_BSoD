
CREATE TABLE student_bio (
    -- Student ID for unique identification for this table : Primary key
    student_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name TEXT NOT NULL, -- Name
    email TEXT UNIQUE NOT NULL, -- Email
    password_hash TEXT NOT NULL, -- hashed password(UI team : ****)

    phone_number TEXT NOT NULL CHECK (
        phone_number ~ '^[0-9]{10}$'
    ), -- ASKED RIGHT AFTER ENTERING THE STUDENT PAGE(AFTER HOME PAGE)

    aadhar_number TEXT CHECK (
        aadhar_number ~ '^[2-9][0-9]{11}$'
    ), -- NO NEED TO PARSE AADHAR DATA 

    gender TEXT CHECK (
        gender IN ('Male', 'Female', 'Other')
    ), -- CHECK constraint is necessary 

    reservation_category TEXT CHECK (
        reservation_category IN ('General', 'OBC', 'SC', 'ST', 'EWS')
    ), -- CHECK constraint is necessary in DB level

    -- Address details
    permanent_address TEXT,
    city TEXT,
    state TEXT,
    pincode TEXT,

    highest_qualification TEXT CHECK (
        highest_qualification IN ('10th', '12th', 'ITI', 'Diploma', 'UG')
    ), -- Only allowable education

    gpa NUMERIC, -- AFTER NORMALISATION

    family_income NUMERIC CHECK (
        family_income >= 0 AND family_income <= 800000
    ),

    itr_document_url TEXT CHECK (
        itr_document_url IS NULL OR itr_document_url ~* '\.pdf$'
    ), -- ITR for financial background check

    itr_verified BOOLEAN DEFAULT FALSE, -- To check if the user input and itr report matches

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE student_bio
ADD COLUMN area_type TEXT NOT NULL CHECK (
    area_type IN ('Rural', 'Urban')
);
