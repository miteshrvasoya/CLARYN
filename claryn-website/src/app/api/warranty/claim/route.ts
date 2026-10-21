import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { products } from '@/data/products';
import { saveClaimToSupabase } from '@/lib/supabase';
import { sendWarrantyClaimEmails } from '@/lib/email';

const ClaimSchema = z.object({
  name:               z.string().min(2, 'Name must be at least 2 characters'),
  email:              z.string().email('Please enter a valid email address'),
  phone:              z.string().min(10, 'Mobile number must be at least 10 digits'),
  productId:          z.string().min(1, 'Please select your product'),
  purchaseDate:       z.string().min(1, 'Please select purchase date'),
  purchasePlatform:   z.string().min(1, 'Please select purchase platform'),
  orderId:            z.string().optional(),
  registrationId:     z.string().optional(),
  issueCategory:      z.string().min(1, 'Please select the issue category'),
  issueDescription:   z.string().min(10, 'Please describe the issue in at least 10 characters'),
  sourceTDS:          z.string().optional(),
  purifiedTDS:        z.string().optional(),
  attachmentUrl:      z.string().optional(),
  attachmentFileName: z.string().optional(),
  attachmentFileSize: z.number().optional(),
  attachmentFileType: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = ClaimSchema.parse(body);

    // 1. Resolve product details
    const matchedProduct = products.find(p => p.id === data.productId);
    const productName = matchedProduct?.name || data.productId;
    const productModel = matchedProduct?.model || null;

    // 2. Generate unique Claim Reference ID
    const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
    const timestampPart = Date.now().toString(36).slice(-4).toUpperCase();
    const claimId = `CLR-CLM-${timestampPart}${randomHex}`;

    // 3. Save to Supabase
    const supabaseResult = await saveClaimToSupabase({
      claim_id: claimId,
      registration_id: data.registrationId || null,
      full_name: data.name,
      mobile_number: data.phone,
      email: data.email,
      product_id: data.productId,
      product_name: productName,
      product_model: productModel,
      purchase_date: data.purchaseDate,
      purchase_platform: data.purchasePlatform,
      order_id: data.orderId || null,
      issue_category: data.issueCategory,
      issue_description: data.issueDescription,
      source_tds: data.sourceTDS || null,
      purified_tds: data.purifiedTDS || null,
      attachment_url: data.attachmentUrl || null,
      attachment_file_name: data.attachmentFileName || null,
      status: 'pending',
    });

    // 4. Send Confirmation Emails
    const emailResult = await sendWarrantyClaimEmails({
      claimId,
      registrationId: data.registrationId,
      customerName: data.name,
      customerEmail: data.email,
      customerMobile: data.phone,
      productName,
      productModel,
      purchaseDate: data.purchaseDate,
      purchasePlatform: data.purchasePlatform,
      orderId: data.orderId,
      issueCategory: data.issueCategory,
      issueDescription: data.issueDescription,
      sourceTDS: data.sourceTDS,
      purifiedTDS: data.purifiedTDS,
      attachmentUrl: data.attachmentUrl,
    });

    // 5. Audit Log (Mask phone digits for privacy)
    console.log('[warranty/claim] Processed claim:', {
      claimId,
      customer: data.name,
      email: data.email,
      phone: data.phone.replace(/\d(?=\d{4})/g, '*'),
      product: productName,
      issue: data.issueCategory,
      hasAttachment: Boolean(data.attachmentUrl),
      supabaseSaved: supabaseResult.success,
      emailSent: emailResult.customerEmailSent,
    });

    return NextResponse.json({
      success: true,
      claimId,
      productName,
      message: 'Warranty claim received. Our support team will review it within 1–2 business days.',
      submittedAt: new Date().toISOString(),
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid form data', issues: err.issues }, { status: 400 });
    }
    console.error('[warranty/claim] Error processing claim:', err);
    return NextResponse.json({ error: 'Claim submission failed. Please try again.' }, { status: 500 });
  }
}
