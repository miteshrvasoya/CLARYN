import nodemailer from 'nodemailer';

export interface SendWarrantyEmailParams {
  registrationId: string;
  customerName: string;
  customerEmail: string;
  customerMobile: string;
  productName: string;
  productModel?: string | null;
  purchaseDate: string;
  purchasePlatform: string;
  orderId?: string | null;
  invoiceUrl?: string | null;
  invoiceFileName?: string | null;
}

/**
 * Creates and returns a Nodemailer transporter instance
 */
function getTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = Number(process.env.SMTP_PORT) || 587;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });
}

/**
 * Sends warranty registration confirmation email to customer & notification to admin
 */
export async function sendWarrantyRegistrationEmails(
  params: SendWarrantyEmailParams
): Promise<{ customerEmailSent: boolean; adminEmailSent: boolean; isSimulated: boolean }> {
  const transporter = getTransporter();

  const formattedDate = new Date(params.purchaseDate).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const supportEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'support@claryn.in';
  const supportPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE || '+91 92748 41287';
  const senderEmail = process.env.SMTP_USER || 'no-reply@claryn.in';

  // ─── 1. Customer HTML Template ──────────────────────────────────────────
  const customerHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CLARYN Warranty Registration Confirmed</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
          
          <!-- Header Banner -->
          <tr>
            <td style="background-color: #071426; padding: 32px 28px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 26px; letter-spacing: 2px; font-weight: 800;">CLARYN</h1>
              <p style="margin: 6px 0 0 0; color: #94a3b8; font-size: 13px; letter-spacing: 1px; text-transform: uppercase;">Product Warranty Registration</p>
            </td>
          </tr>

          <!-- Confirmation Hero -->
          <tr>
            <td style="padding: 28px 28px 16px 28px;">
              <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 16px; margin-bottom: 24px; text-align: center;">
                <span style="display: inline-block; background-color: #22c55e; color: #ffffff; width: 24px; height: 24px; border-radius: 50%; line-height: 24px; font-weight: bold; font-size: 14px; margin-bottom: 6px;">✓</span>
                <h2 style="margin: 4px 0; color: #15803d; font-size: 18px; font-weight: 700;">Warranty Registration Confirmed</h2>
                <p style="margin: 4px 0 0 0; color: #166534; font-size: 13px;">Your product details have been recorded in the CLARYN warranty system.</p>
              </div>

              <p style="font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">Dear <strong>${params.customerName}</strong>,</p>
              <p style="font-size: 14px; line-height: 1.6; color: #475569; margin: 0 0 20px 0;">
                Thank you for registering your CLARYN product. Please keep this email and your Reference ID handy for any future warranty or technical support requests.
              </p>

              <!-- Reference ID Card -->
              <div style="background-color: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px; padding: 14px; text-align: center; margin-bottom: 24px;">
                <div style="font-size: 11px; text-transform: uppercase; color: #64748b; letter-spacing: 1px; font-weight: 600;">Warranty Reference ID</div>
                <div style="font-size: 20px; font-weight: 800; color: #0284c7; letter-spacing: 1px; margin-top: 4px; font-family: monospace;">${params.registrationId}</div>
              </div>

              <!-- Product Details Table -->
              <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; color: #0f172a; margin: 0 0 12px 0; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px;">Registration Summary</h3>
              <table width="100%" cellspacing="0" cellpadding="6" style="font-size: 13px; margin-bottom: 24px;">
                <tr>
                  <td style="color: #64748b; width: 38%; padding: 6px 0; border-bottom: 1px solid #f1f5f9;">Product Name</td>
                  <td style="color: #0f172a; font-weight: 600; padding: 6px 0; border-bottom: 1px solid #f1f5f9;">${params.productName}</td>
                </tr>
                ${params.productModel ? `
                <tr>
                  <td style="color: #64748b; padding: 6px 0; border-bottom: 1px solid #f1f5f9;">Model Code</td>
                  <td style="color: #0f172a; padding: 6px 0; border-bottom: 1px solid #f1f5f9; font-family: monospace;">${params.productModel}</td>
                </tr>` : ''}
                <tr>
                  <td style="color: #64748b; padding: 6px 0; border-bottom: 1px solid #f1f5f9;">Purchase Date</td>
                  <td style="color: #0f172a; padding: 6px 0; border-bottom: 1px solid #f1f5f9;">${formattedDate}</td>
                </tr>
                <tr>
                  <td style="color: #64748b; padding: 6px 0; border-bottom: 1px solid #f1f5f9;">Purchase Platform</td>
                  <td style="color: #0f172a; padding: 6px 0; border-bottom: 1px solid #f1f5f9;">${params.purchasePlatform}</td>
                </tr>
                ${params.orderId ? `
                <tr>
                  <td style="color: #64748b; padding: 6px 0; border-bottom: 1px solid #f1f5f9;">Order / Invoice ID</td>
                  <td style="color: #0f172a; padding: 6px 0; border-bottom: 1px solid #f1f5f9;">${params.orderId}</td>
                </tr>` : ''}
                <tr>
                  <td style="color: #64748b; padding: 6px 0;">Purchase Invoice</td>
                  <td style="color: #0f172a; padding: 6px 0;">${params.invoiceUrl ? '✓ Uploaded to Secure Cloud Storage' : 'Not provided (Optional)'}</td>
                </tr>
              </table>

              <!-- Warranty Claim Policy Notice -->
              <div style="background-color: #f8fafc; border-left: 4px solid #0284c7; padding: 14px 16px; border-radius: 0 8px 8px 0; margin-bottom: 24px;">
                <h4 style="margin: 0 0 6px 0; font-size: 13px; color: #071426;">Need to make a warranty claim?</h4>
                <p style="margin: 0; font-size: 12px; line-height: 1.5; color: #475569;">
                  Please contact CLARYN Support to initiate your claim before dispatching any parcel. Initially, customers arrange sending the product parcel to the CLARYN office address provided by our support team. Upon parcel receipt and claim review, CLARYN will process reimbursement of eligible shipping charges according to the applicable warranty process.
                </p>
              </div>

              <!-- Support Contact Box -->
              <div style="background-color: #f1f5f9; border-radius: 8px; padding: 16px; font-size: 12px; color: #475569; text-align: center;">
                <p style="margin: 0 0 4px 0; font-weight: 600; color: #0f172a;">CLARYN Customer Support</p>
                <p style="margin: 0 0 4px 0;">Email: <a href="mailto:${supportEmail}" style="color: #0284c7; text-decoration: none;">${supportEmail}</a> | Phone: ${supportPhone}</p>
                <p style="margin: 0; color: #64748b;">Monday – Saturday | 9:30 AM – 6:30 PM IST</p>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0f172a; padding: 20px; text-align: center; color: #94a3b8; font-size: 11px;">
              <p style="margin: 0 0 4px 0;">© ${new Date().getFullYear()} CLARYN. All rights reserved.</p>
              <p style="margin: 0;">Pure water solutions engineered for domestic and commercial water purification.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  // ─── 2. Admin HTML Template ─────────────────────────────────────────────
  const adminHtml = `
    <div style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">
      <h2 style="color: #071426;">New Warranty Registration [${params.registrationId}]</h2>
      <p>A new customer has registered their product on the CLARYN website:</p>
      <table style="width: 100%; max-width: 600px; border-collapse: collapse; margin-top: 12px;">
        <tr><td style="padding: 6px; border: 1px solid #ddd; font-weight: bold;">Reference ID:</td><td style="padding: 6px; border: 1px solid #ddd;">${params.registrationId}</td></tr>
        <tr><td style="padding: 6px; border: 1px solid #ddd; font-weight: bold;">Customer Name:</td><td style="padding: 6px; border: 1px solid #ddd;">${params.customerName}</td></tr>
        <tr><td style="padding: 6px; border: 1px solid #ddd; font-weight: bold;">Mobile:</td><td style="padding: 6px; border: 1px solid #ddd;"><a href="tel:${params.customerMobile}">${params.customerMobile}</a></td></tr>
        <tr><td style="padding: 6px; border: 1px solid #ddd; font-weight: bold;">Email:</td><td style="padding: 6px; border: 1px solid #ddd;"><a href="mailto:${params.customerEmail}">${params.customerEmail}</a></td></tr>
        <tr><td style="padding: 6px; border: 1px solid #ddd; font-weight: bold;">Product:</td><td style="padding: 6px; border: 1px solid #ddd;">${params.productName} (${params.productModel || 'N/A'})</td></tr>
        <tr><td style="padding: 6px; border: 1px solid #ddd; font-weight: bold;">Purchase Date:</td><td style="padding: 6px; border: 1px solid #ddd;">${formattedDate}</td></tr>
        <tr><td style="padding: 6px; border: 1px solid #ddd; font-weight: bold;">Platform:</td><td style="padding: 6px; border: 1px solid #ddd;">${params.purchasePlatform}</td></tr>
        <tr><td style="padding: 6px; border: 1px solid #ddd; font-weight: bold;">Order ID:</td><td style="padding: 6px; border: 1px solid #ddd;">${params.orderId || 'N/A'}</td></tr>
        <tr><td style="padding: 6px; border: 1px solid #ddd; font-weight: bold;">Invoice URL:</td><td style="padding: 6px; border: 1px solid #ddd;">${params.invoiceUrl ? `<a href="${params.invoiceUrl}" target="_blank">View Stored Invoice</a> (${params.invoiceFileName || 'File'})` : 'None uploaded'}</td></tr>
      </table>
    </div>
  `;

  // If SMTP is not configured in local environment
  if (!transporter) {
    console.log('[Email Simulated] SMTP credentials not set in .env.local.');
    console.log(`[Email Simulated] Customer confirmation to: ${params.customerEmail} (Ref: ${params.registrationId})`);
    console.log(`[Email Simulated] Admin notification to: ${supportEmail}`);
    return { customerEmailSent: false, adminEmailSent: false, isSimulated: true };
  }

  let customerEmailSent = false;
  let adminEmailSent = false;

  try {
    // 1. Send confirmation to customer
    await transporter.sendMail({
      from: `"CLARYN Support" <${senderEmail}>`,
      to: params.customerEmail,
      replyTo: supportEmail,
      subject: `Your CLARYN Warranty Registration Confirmed [${params.registrationId}]`,
      text: `Hello ${params.customerName},\n\nYour warranty registration for ${params.productName} has been confirmed.\nReference ID: ${params.registrationId}\nPurchase Date: ${formattedDate}\nPlatform: ${params.purchasePlatform}\n\nIf you ever need assistance, contact us at ${supportEmail} or ${supportPhone}.\n\nCLARYN Customer Support`,
      html: customerHtml,
    });
    customerEmailSent = true;
    console.log(`[Email] Customer confirmation sent to ${params.customerEmail}`);
  } catch (err) {
    console.error('[Email] Failed to send customer confirmation:', err);
  }

  try {
    // 2. Send notification to admin / support
    await transporter.sendMail({
      from: `"CLARYN Portal" <${senderEmail}>`,
      to: supportEmail,
      subject: `[New Registration] ${params.productName} - ${params.customerName} [${params.registrationId}]`,
      html: adminHtml,
    });
    adminEmailSent = true;
    console.log(`[Email] Admin notification sent to ${supportEmail}`);
  } catch (err) {
    console.error('[Email] Failed to send admin notification:', err);
  }

  return { customerEmailSent, adminEmailSent, isSimulated: false };
}
