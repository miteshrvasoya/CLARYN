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
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

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
      ])
      .select()
      .single();

    if (error) {
      console.error('[Supabase] Insert error:', error.message);
      return { success: false, error: error.message };
    }

    console.log('[Supabase] Registration saved successfully with ID:', data?.id);
    return { success: true, data };
  } catch (err: any) {
    console.error('[Supabase] Unexpected error saving registration:', err);
    return { success: false, error: err?.message || 'Database error' };
  }
}
