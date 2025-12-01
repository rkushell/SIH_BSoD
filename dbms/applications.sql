

CREATE TABLE applications (

    --Application ID : Primary key
    application_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    student_id UUID NOT NULL, -- Foreign key
    internship_id UUID NOT NULL, -- Foreign key

    application_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    CONSTRAINT fk_student_app
        FOREIGN KEY (student_id)
        REFERENCES student_bio(student_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_internship_app
        FOREIGN KEY (internship_id)
        REFERENCES internships(internship_id)
        ON DELETE CASCADE
);
