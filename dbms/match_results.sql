

CREATE TABLE match_results (

    --MAtch_ID : Primary key
    match_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    student_id UUID NOT NULL, -- Foreign key
    internship_id UUID NOT NULL,  -- Foreign key

    match_score NUMERIC, -- FROM THE ML MODEL
    explanation TEXT, -- Breakdown of how we get it 

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    CONSTRAINT fk_student_match
        FOREIGN KEY (student_id)
        REFERENCES student_bio(student_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_internship_match
        FOREIGN KEY (internship_id)
        REFERENCES internships(internship_id)
        ON DELETE CASCADE
);

