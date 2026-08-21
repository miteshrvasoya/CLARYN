import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const ContactSchema = z.object({
  name:    z.string().min(2),
  email:   z.string().email(),
  phone:   z.string().optional(),
  subject: z.string().min(2),
  message: z.string().min(10),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = ContactSchema.parse(body);
    // TODO: Send email notification
    console.log('[contact] New message:', data);
    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
