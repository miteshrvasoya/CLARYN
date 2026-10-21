import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * Supabase Client & Database Helper for CLARYN
 * 
 * Required Environment Variables in .env.local:
 * - NEXT_PUBLIC_SUPABASE_URL: e.g. https://xyzcompany.supabase.co
 * - SUPABASE_SERVICE_ROLE_KEY: Service role secret key (for server-side inserts bypassing RLS)
 *   OR NEXT_PUBLIC_SUPABASE_ANON_KEY: Public anon key
 */

let supabaseAdmin: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim();

  // Check if a real service role key is provided (bypasses RLS for server-side inserts)
  const serviceKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();
  const isRealServiceKey =
    serviceKey.length > 0 &&
    !serviceKey.includes('your_supabase') &&
    !serviceKey.includes('REPLACE_WITH');

  // New Supabase projects use NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (starts with sb_publishable_)
  // Older Supabase projects use NEXT_PUBLIC_SUPABASE_ANON_KEY (JWT format)
  const publishableKey = (
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    ''
  ).trim();

  const supabaseKey = isRealServiceKey
    ? serviceKey
    : (publishableKey.length > 0 && !publishableKey.includes('your_supabase') ? publishableKey : null);

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  if (!supabaseAdmin) {
    supabaseAdmin = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }

  return supabaseAdmin;
}

export interface ProductRegistrationRecord {
  reference_id: string;
  full_name: string;
  mobile_number: string;
  email: string;
  product_id: string;
  product_name: string;
  product_model?: string | null;
  purchase_date: string;
  purchase_platform: string;
  order_id?: string | null;
  invoice_url?: string | null;
  invoice_file_name?: string | null;
  invoice_file_size?: number | null;
  invoice_file_type?: string | null;
  marketing_consent?: boolean;
  status?: string;
}

/**
 * Saves a product registration into the Supabase 'product_registrations' table
 */
export async function saveRegistrationToSupabase(
  record: ProductRegistrationRecord
): Promise<{ success: boolean; data?: any; error?: string }> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    console.warn('[Supabase] Supabase credentials not set in .env.local. Skipping direct Supabase insert.');
    return { success: true, error: 'SUPABASE_NOT_CONFIGURED' };
  }

  try {
    const { data, error } = await supabase
      .from('product_registrations')
      .insert([
        {
          reference_id: record.reference_id,
          full_name: record.full_name,
          mobile_number: record.mobile_number,
          email: record.email.toLowerCase().trim(),
          product_id: record.product_id,
          product_name: record.product_name,
          product_model: record.product_model || null,
          purchase_date: record.purchase_date,
          purchase_platform: record.purchase_platform,
          order_id: record.order_id || null,
          invoice_url: record.invoice_url || null,
          invoice_file_name: record.invoice_file_name || null,
          invoice_file_size: record.invoice_file_size || null,
          invoice_file_type: record.invoice_file_type || null,
          marketing_consent: Boolean(record.marketing_consent),
          status: record.status || 'verified',
        },
      ]);

    if (error) {
      console.error('[Supabase] Insert error:', error.message);
      return { success: false, error: error.message };
    }

    console.log('[Supabase] Registration saved successfully with reference:', record.reference_id);
    return { success: true, data: { reference_id: record.reference_id } };
  } catch (err: any) {
    console.error('[Supabase] Unexpected error saving registration:', err);
    return { success: false, error: err?.message || 'Database error' };
  }
}

export interface WarrantyClaimRecord {
  claim_id: string;
  registration_id?: string | null;
  full_name: string;
  mobile_number: string;
  email: string;
  product_id: string;
  product_name: string;
  product_model?: string | null;
  purchase_date: string;
  purchase_platform: string;
  order_id?: string | null;
  issue_category: string;
  issue_description: string;
  source_tds?: string | null;
  purified_tds?: string | null;
  attachment_url?: string | null;
  attachment_file_name?: string | null;
  status?: string;
}

/**
 * Saves a warranty claim into the Supabase 'warranty_claims' table
 */
export async function saveClaimToSupabase(
  record: WarrantyClaimRecord
): Promise<{ success: boolean; data?: any; error?: string }> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    console.warn('[Supabase] Supabase credentials not set in .env.local. Skipping direct Supabase insert.');
    return { success: true, error: 'SUPABASE_NOT_CONFIGURED' };
  }

  try {
    const { data, error } = await supabase
      .from('warranty_claims')
      .insert([
        {
          claim_id: record.claim_id,
          registration_id: record.registration_id || null,
          full_name: record.full_name,
          mobile_number: record.mobile_number,
          email: record.email.toLowerCase().trim(),
          product_id: record.product_id,
          product_name: record.product_name,
          product_model: record.product_model || null,
          purchase_date: record.purchase_date,
          purchase_platform: record.purchase_platform,
          order_id: record.order_id || null,
          issue_category: record.issue_category,
          issue_description: record.issue_description,
          source_tds: record.source_tds || null,
          purified_tds: record.purified_tds || null,
          attachment_url: record.attachment_url || null,
          attachment_file_name: record.attachment_file_name || null,
          status: record.status || 'pending',
        },
      ]);

    if (error) {
      console.warn('[Supabase] Warranty claims table insert notice:', error.message);
      return { success: false, error: error.message };
    }

    console.log('[Supabase] Warranty claim saved successfully with ID:', record.claim_id);
    return { success: true, data: { claim_id: record.claim_id } };
  } catch (err: any) {
    console.warn('[Supabase] Could not save warranty claim to Supabase:', err);
    return { success: false, error: err?.message || 'Database error' };
  }
}
