import { NextRequest, NextResponse } from 'next/server';
import { generateWarrantyConfirmationHtml } from '@/lib/email';

export async function GET(req: NextRequest) {
  // Allows testing with custom query params or default sample registration
  const customerName = req.nextUrl.searchParams.get('name') || 'Vikram Malhotra';
  const productName = req.nextUrl.searchParams.get('product') || 'CLARYN 100 GPD RO Membrane (2500 TDS)';
  const productModel = req.nextUrl.searchParams.get('model') || 'CLR-RO-100-15L-2500';
  const purchaseDate = req.nextUrl.searchParams.get('date') || new Date().toISOString().split('T')[0];
  const purchasePlatform = req.nextUrl.searchParams.get('platform') || 'Amazon India';
  const orderId = req.nextUrl.searchParams.get('orderId') || 'AMZ-403-9182371-12';
  const registrationId = req.nextUrl.searchParams.get('ref') || 'CLR-REG-7K8J29A';

  const html = generateWarrantyConfirmationHtml({
    registrationId,
    customerName,
    customerEmail: 'vikram.malhotra@example.com',
    customerMobile: '+91 98234 56789',
    productName,
    productModel,
    purchaseDate,
    purchasePlatform,
    orderId,
    invoiceUrl: 'https://invoices.claryn.in/sample-invoice.pdf',
    invoiceFileName: 'Invoice_AMZ_4039182.pdf',
    warrantyPeriodMonths: 12,
  });

  return new NextResponse(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}
