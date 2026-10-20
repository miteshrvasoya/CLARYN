import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { products } from '@/data/products';
import { saveRegistrationToSupabase } from '@/lib/supabase';
import { sendWarrantyRegistrationEmails } from '@/lib/email';

const RegisterSchema = z.object({
  name:              z.string().min(2, 'Name must be at least 2 characters'),
  mobile:            z.string().min(10, 'Mobile number must be at least 10 digits'),
  email:             z.string().email('Please enter a valid email address'),
  productId:         z.string().min(1, 'Please select a product'),
  purchaseDate:      z.string().min(1, 'Please select purchase date'),
  purchasePlatform:  z.string().min(1, 'Please select purchase platform'),
  orderId:           z.string().optional(),
  invoiceUrl:        z.string().optional(),
  invoiceKey:        z.string().optional(),
  invoiceFileName:   z.string().optional(),
  invoiceFileSize:   z.number().optional(),
  invoiceFileType:   z.string().optional(),
  marketingConsent:  z.union([z.boolean(), z.enum(['yes', ''])]).optional().transform(v => v === true || v === 'yes'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = RegisterSchema.parse(body);

    // 1. Resolve product details from official catalog
    const matchedProduct = products.find(p => p.id === data.productId);
    const productName = matchedProduct?.name || data.productId;
    const productModel = matchedProduct?.model || null;

    // 2. Generate unique registration reference ID
    const randomHex = Math.random().toString(36).substring(2, 7).toUpperCase();
    const timestampPart = Date.now().toString(36).slice(-4).toUpperCase();
    const registrationId = `CLR-REG-${timestampPart}${randomHex}`;

    // 3. Store registration in Supabase (PostgreSQL)
    const supabaseResult = await saveRegistrationToSupabase({
      reference_id: registrationId,
      full_name: data.name,
      mobile_number: data.mobile,
      email: data.email,
      product_id: data.productId,
      product_name: productName,
      product_model: productModel,
      purchase_date: data.purchaseDate,
      purchase_platform: data.purchasePlatform,
      order_id: data.orderId || null,
      invoice_url: data.invoiceUrl || null,
      invoice_file_name: data.invoiceFileName || null,
      invoice_file_size: data.invoiceFileSize || null,
      invoice_file_type: data.invoiceFileType || null,
      marketing_consent: data.marketingConsent,
      status: 'verified',
    });

    // 4. Send Confirmation Email to Customer and Internal Alert to Support
    const emailResult = await sendWarrantyRegistrationEmails({
      registrationId,
      customerName: data.name,
      customerEmail: data.email,
      customerMobile: data.mobile,
      productName,
      productModel,
      purchaseDate: data.purchaseDate,
      purchasePlatform: data.purchasePlatform,
      orderId: data.orderId,
      invoiceUrl: data.invoiceUrl,
      invoiceFileName: data.invoiceFileName,
    });

    // 5. Safe audit log (mask sensitive mobile digits)
    console.log('[register-product] Processed registration:', {
      registrationId,
      name: data.name,
      email: data.email,
      mobile: data.mobile.replace(/\d(?=\d{4})/g, '*'),
      product: productName,
      hasInvoiceUrl: Boolean(data.invoiceUrl),
      supabaseSaved: supabaseResult.success,
      emailSent: emailResult.customerEmailSent,
      isEmailSimulated: emailResult.isSimulated,
    });

    return NextResponse.json({
      success: true,
      message: 'Product registered successfully. A confirmation email has been dispatched.',
      registrationId,
      productName,
      registeredAt: new Date().toISOString(),
      emailDispatched: emailResult.customerEmailSent || emailResult.isSimulated,
      invoiceStored: Boolean(data.invoiceUrl),
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid form data', issues: err.issues }, { status: 400 });
    }
    console.error('[register-product] Error:', err);
    return NextResponse.json({ error: 'Registration failed. Please try again.' }, { status: 500 });
  }
}
