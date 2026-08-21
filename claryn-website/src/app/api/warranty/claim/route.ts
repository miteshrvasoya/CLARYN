import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const ClaimSchema = z.object({
  name:             z.string().min(2),
  email:            z.string().email(),
  phone:            z.string().min(10),
  productId:        z.string().min(1),
  serialNumber:     z.string().optional(),
  purchaseDate:     z.string().min(1),
  purchasePlatform: z.string().min(1),
  orderId:          z.string().optional(),
  issueDescription: z.string().min(10),
  sourceTDS:        z.string().optional(),
  purifiedTDS:      z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = ClaimSchema.parse(body);

    // TODO: Save to DB
    // const { prisma } = await import('@/lib/prisma');
    // const claim = await prisma.warrantyClaim.create({ data: { ...data, status: 'pending', submittedAt: new Date() } });

    // TODO: Send confirmation email and internal notification
    console.log('[warranty/claim] New claim:', data);

    return NextResponse.json({ success: true, message: 'Warranty claim submitted. We\'ll respond within 2–3 business days.' });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid form data', issues: err.issues }, { status: 400 });
    }
    console.error('[warranty/claim] Error:', err);
    return NextResponse.json({ error: 'Submission failed. Please try again.' }, { status: 500 });
  }
}
