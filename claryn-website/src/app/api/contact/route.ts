import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import nodemailer from 'nodemailer';

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

    console.log('[contact] New message:', data);

    // Ensure SMTP environment variables are defined
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: `"${data.name}" <${process.env.SMTP_USER}>`, // Sent from the authenticated user
        replyTo: data.email,
        to: process.env.NEXT_PUBLIC_CONTACT_EMAIL || process.env.SMTP_USER, // Send to contact email or self
        subject: `[CLARYN Contact] ${data.subject} - from ${data.name}`,
        text: `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || 'N/A'}\nSubject: ${data.subject}\n\nMessage:\n${data.message}`,
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
          <p><strong>Subject:</strong> ${data.subject}</p>
          <br/>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${data.message}</p>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log('[contact] Email sent successfully via SMTP.');
    } else {
      console.warn('[contact] SMTP variables not configured. Skipping email send. Simulated success.');
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
    console.error('[contact] Error processing request:', err);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
