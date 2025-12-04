
CREATE TABLE policies (

    --Policy_ID : primary key
    policy_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    gpa_weight NUMERIC DEFAULT 0, -- Can be changed; the default value 
    skills_weight NUMERIC DEFAULT 0,
    experience_weight NUMERIC DEFAULT 0,

    location_penalty NUMERIC DEFAULT 0,
    reservation_quota JSONB,
    gender_quota JSONB,

    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
