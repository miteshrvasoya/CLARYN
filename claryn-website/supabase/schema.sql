-- ==============================================================================
-- CLARYN Product Warranty Registrations Table Schema for Supabase (PostgreSQL)
-- ==============================================================================

-- 1. Create product_registrations table
CREATE TABLE IF NOT EXISTS public.product_registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference_id TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    mobile_number TEXT NOT NULL,
    email TEXT NOT NULL,
    product_id TEXT NOT NULL,
    product_name TEXT NOT NULL,
    product_model TEXT,
    purchase_date DATE NOT NULL,
    purchase_platform TEXT NOT NULL,
    order_id TEXT,
    invoice_url TEXT,
    invoice_file_name TEXT,
    invoice_file_size INTEGER,
    invoice_file_type TEXT,
    marketing_consent BOOLEAN DEFAULT FALSE,
    status TEXT DEFAULT 'verified',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Indexes for fast lookups and reporting
CREATE INDEX IF NOT EXISTS idx_product_reg_reference_id ON public.product_registrations(reference_id);
CREATE INDEX IF NOT EXISTS idx_product_reg_mobile ON public.product_registrations(mobile_number);
CREATE INDEX IF NOT EXISTS idx_product_reg_email ON public.product_registrations(email);
CREATE INDEX IF NOT EXISTS idx_product_reg_product_id ON public.product_registrations(product_id);
CREATE INDEX IF NOT EXISTS idx_product_reg_created_at ON public.product_registrations(created_at DESC);

-- 3. Row-Level Security (RLS) configuration
ALTER TABLE public.product_registrations ENABLE ROW LEVEL SECURITY;

-- Allow server-side service role full read/write access
CREATE POLICY "Allow service role full access"
    ON public.product_registrations
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Allow public anon users to insert new registrations
CREATE POLICY "Allow public insert registrations"
    ON public.product_registrations
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Restrict direct public read access (protect customer personal data)
-- Only authenticated admins or service role can select all records
CREATE POLICY "Allow authenticated staff to read registrations"
    ON public.product_registrations
    FOR SELECT
    TO authenticated
    USING (true);

-- 4. Comment annotations
COMMENT ON TABLE public.product_registrations IS 'Stores official customer warranty registrations for CLARYN water solution products.';
COMMENT ON COLUMN public.product_registrations.reference_id IS 'Unique registration reference number formatted as CLR-REG-XXXXXXXX';
COMMENT ON COLUMN public.product_registrations.invoice_url IS 'Direct URL to purchase invoice stored in Cloudflare R2 bucket';

-- ==============================================================================
-- 2. Create warranty_claims table
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.warranty_claims (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    claim_id TEXT NOT NULL UNIQUE,
    registration_id TEXT,
    full_name TEXT NOT NULL,
    mobile_number TEXT NOT NULL,
    email TEXT NOT NULL,
    product_id TEXT NOT NULL,
    product_name TEXT NOT NULL,
    product_model TEXT,
    purchase_date DATE NOT NULL,
    purchase_platform TEXT NOT NULL,
    order_id TEXT,
    issue_category TEXT NOT NULL,
    issue_description TEXT NOT NULL,
    source_tds TEXT,
    purified_tds TEXT,
    attachment_url TEXT,
    attachment_file_name TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indexes for fast lookups
CREATE INDEX IF NOT EXISTS idx_warranty_claim_id ON public.warranty_claims(claim_id);
CREATE INDEX IF NOT EXISTS idx_warranty_claim_mobile ON public.warranty_claims(mobile_number);
CREATE INDEX IF NOT EXISTS idx_warranty_claim_email ON public.warranty_claims(email);
CREATE INDEX IF NOT EXISTS idx_warranty_claim_created ON public.warranty_claims(created_at DESC);

-- RLS for warranty_claims
ALTER TABLE public.warranty_claims ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow service role full access on claims"
    ON public.warranty_claims
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Allow public insert claims"
    ON public.warranty_claims
    FOR INSERT
    TO anon
    WITH CHECK (true);

CREATE POLICY "Allow authenticated staff to read claims"
    ON public.warranty_claims
    FOR SELECT
    TO authenticated
    USING (true);

