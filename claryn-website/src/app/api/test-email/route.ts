import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function GET(req: NextRequest) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = Number(process.env.SMTP_PORT) || 587;
  const to = req.nextUrl.searchParams.get('to') || user;

  if (!host || !user || !pass) {
    return NextResponse.json(
      {
        success: false,
        error: 'SMTP credentials missing in .env / .env.local',
        configured: {
          SMTP_HOST: Boolean(host),
          SMTP_PORT: port,
          SMTP_USER: Boolean(user),
          SMTP_PASS: Boolean(pass),
        },
        guidance: 'Please set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS in .env or .env.local',
      },
      { status: 400 }
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    });

    // 1. Verify connection and credentials
    await transporter.verify();

    // 2. If a recipient email is provided, send a test email
    let messageId: string | null = null;
    if (to) {
      const info = await transporter.sendMail({
        from: `"CLARYN SMTP Test" <${user}>`,
        to,
        subject: '✓ CLARYN SMTP Test Email Successful',
        text: `Congratulations! Your SMTP configuration is working correctly with Nodemailer.\n\nHost: ${host}\nPort: ${port}\nSent At: ${new Date().toISOString()}`,
        html: `
          <div style="font-family: -apple-system, sans-serif; padding: 24px; background: #f8fafc; border-radius: 8px;">
            <h2 style="color: #15803d; margin: 0 0 12px 0;">✓ SMTP Configuration Successful</h2>
            <p style="color: #334155; font-size: 14px;">Your CLARYN email transporter is connected and sending emails successfully via Nodemailer.</p>
            <table style="font-size: 13px; color: #475569; margin-top: 16px;">
              <tr><td style="padding: 4px 12px 4px 0; font-weight: bold;">Host:</td><td>${host}</td></tr>
              <tr><td style="padding: 4px 12px 4px 0; font-weight: bold;">Port:</td><td>${port}</td></tr>
              <tr><td style="padding: 4px 12px 4px 0; font-weight: bold;">User:</td><td>${user}</td></tr>
              <tr><td style="padding: 4px 12px 4px 0; font-weight: bold;">Recipient:</td><td>${to}</td></tr>
            </table>
          </div>
        `,
      });
      messageId = info.messageId;
    }

    return NextResponse.json({
      success: true,
      message: 'SMTP connection verified successfully!',
      testEmailSentTo: to,
      messageId,
      host,
      port,
    });
  } catch (err: any) {
    console.error('[SMTP Test Error]:', err);
    return NextResponse.json(
      {
        success: false,
        error: err.message || 'SMTP connection failed',
        code: err.code,
        command: err.command,
        response: err.response,
        hint: getSmtpHint(err),
      },
      { status: 500 }
    );
  }
}

function getSmtpHint(err: any): string {
  const msg = (err.message || '').toLowerCase();
  const code = (err.code || '').toLowerCase();

  if (code === 'eauth' || msg.includes('invalid login') || msg.includes('authentication failed')) {
    return 'Authentication failed. If using Gmail, make sure you created and pasted a 16-character App Password (not your normal Gmail password).';
  }
  if (code === 'esocket' || msg.includes('timeout') || msg.includes('connect')) {
    return 'Connection timed out. Check SMTP_HOST or try switching port between 587 (TLS) and 465 (SSL).';
  }
  return 'Please verify your SMTP credentials and ensure your provider allows SMTP relay.';
}
