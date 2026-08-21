import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const RegisterSchema = z.object({
  name:              z.string().min(2),
  mobile:            z.string().min(10),
  email:             z.string().email(),
  productId:         z.string().min(1),
  serialNumber:      z.string().optional(),
  purchaseDate:      z.string().min(1),
  purchasePlatform:  z.string().min(1),
  orderId:           z.string().optional(),
  pincode:           z.string().optional(),
  waterSource:       z.string().optional(),
  notes:             z.string().optional(),
  marketingConsent:  z.enum(['yes', '']).optional().transform(v => v === 'yes'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = RegisterSchema.parse(body);

    // TODO: Save to database via Prisma
    // const { prisma } = await import('@/lib/prisma');
    // await prisma.productRegistration.create({ data: { ...data, registeredAt: new Date() } });

    // TODO: Send confirmation email
    // await sendConfirmationEmail(data.email, data.name, data.productId);

    console.log('[register-product] New registration:', data);

    return NextResponse.json({ success: true, message: 'Product registered successfully.' });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid form data', issues: err.issues }, { status: 400 });
    }
    console.error('[register-product] Error:', err);
    return NextResponse.json({ error: 'Registration failed. Please try again.' }, { status: 500 });
  }
}
