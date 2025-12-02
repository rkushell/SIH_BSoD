
CREATE TABLE companies (

    --Company ID : Primary key
    company_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    --Company details
    company_name TEXT NOT NULL,
    industry_sector TEXT,
    hq_location TEXT,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
