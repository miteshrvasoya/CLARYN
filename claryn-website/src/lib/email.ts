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
  warrantyPeriodMonths?: number;
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
 * Generates modern, clean HTML email template for Product Warranty Registration
 */
export function generateWarrantyConfirmationHtml(params: SendWarrantyEmailParams): string {
  const purchase = new Date(params.purchaseDate);
  const warrantyMonths = params.warrantyPeriodMonths || 6;

  const startDate = isNaN(purchase.getTime()) ? new Date() : purchase;
  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + warrantyMonths);

  const formattedStartDate = startDate.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const formattedEndDate = endDate.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://claryn.in').replace(/\/$/, '');
  const claimUrl = `${siteUrl}/warranty/claim`;
  const supportEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'udartawatertech@gmail.com';
  const supportPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE || '+91 92748 41287';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CLARYN — Warranty Registration Confirmed [${params.registrationId}]</title>
  <style>
    @media only screen and (max-width: 620px) {
      .container-table { width: 100% !important; border-radius: 0 !important; }
      .content-padding { padding: 20px 16px !important; }
      .timeline-box { display: block !important; width: 100% !important; margin-bottom: 8px !important; }
      .timeline-arrow { display: none !important; }
      .meta-row { display: block !important; width: 100% !important; padding: 6px 0 !important; }
      .meta-label { display: block !important; width: 100% !important; font-size: 11px !important; margin-bottom: 2px !important; }
      .meta-value { display: block !important; width: 100% !important; font-size: 13px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; -webkit-font-smoothing: antialiased;">

  <!-- Outer wrapper -->
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; padding: 36px 12px;">
    <tr>
      <td align="center">

        <!-- Main Card -->
        <table role="presentation" width="100%" class="container-table" style="max-width: 620px; background-color: #ffffff; border-radius: 14px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 4px 6px -2px rgba(15, 23, 42, 0.03); border: 1px solid #e2e8f0;">

          <!-- Top Brand Header -->
          <tr>
            <td style="background-color: #071426; background-image: linear-gradient(135deg, #071426 0%, #0d2238 100%); padding: 36px 32px 30px 32px; text-align: center; border-bottom: 3px solid #0284c7;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <span style="display: inline-block; font-size: 26px; font-weight: 800; letter-spacing: 3px; color: #ffffff; text-decoration: none;">CLARYN</span>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top: 6px;">
                    <span style="display: inline-block; font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: #94a3b8; font-weight: 600;">Product Warranty Certificate</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Confirmation Hero Card -->
          <tr>
            <td class="content-padding" style="padding: 32px 32px 24px 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 18px 20px; text-align: center;">
                    <div style="display: inline-block; background-color: #16a34a; color: #ffffff; width: 28px; height: 28px; border-radius: 50%; line-height: 28px; font-weight: bold; font-size: 15px; margin-bottom: 8px;">✓</div>
                    <h2 style="margin: 0 0 4px 0; color: #15803d; font-size: 19px; font-weight: 700; letter-spacing: -0.3px;">Warranty Registration Confirmed</h2>
                    <p style="margin: 0; color: #166534; font-size: 13px; line-height: 1.5;">Your CLARYN product and purchase details have been securely recorded in our warranty system.</p>
                  </td>
                </tr>
              </table>

              <!-- Greeting -->
              <p style="font-size: 15px; line-height: 1.6; color: #1e293b; margin: 24px 0 16px 0;">
                Dear <strong>${params.customerName}</strong>,
              </p>
              <p style="font-size: 14px; line-height: 1.6; color: #475569; margin: 0 0 24px 0;">
                Thank you for choosing CLARYN. Below is your official warranty registration record. Please retain this email or your Reference ID for any future warranty assistance or technical support.
              </p>

              <!-- Reference Badge Card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px; margin-bottom: 28px;">
                <tr>
                  <td align="center">
                    <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.2px; color: #64748b; font-weight: 600; margin-bottom: 4px;">Official Warranty Reference ID</div>
                    <div style="font-size: 22px; font-weight: 800; color: #071426; font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; letter-spacing: 1.5px; margin-bottom: 8px;">${params.registrationId}</div>
                    <span style="display: inline-block; background-color: #dcfce7; color: #15803d; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 12px; letter-spacing: 0.5px;">● ACTIVE & VERIFIED</span>
                  </td>
                </tr>
              </table>

              <!-- ─── SECTION 1: PRODUCT DETAILS ─────────────────────────────── -->
              <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #071426; font-weight: 700; margin: 0 0 12px 0; padding-bottom: 6px; border-bottom: 1px solid #e2e8f0;">
                Product & Purchase Details
              </h3>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="8" style="font-size: 13px; margin-bottom: 28px;">
                <tr class="meta-row">
                  <td class="meta-label" style="color: #64748b; width: 35%; padding: 8px 0; border-bottom: 1px solid #f1f5f9;">Product Name</td>
                  <td class="meta-value" style="color: #0f172a; font-weight: 600; padding: 8px 0; border-bottom: 1px solid #f1f5f9;">${params.productName}</td>
                </tr>
                ${params.productModel ? `
                <tr class="meta-row">
                  <td class="meta-label" style="color: #64748b; padding: 8px 0; border-bottom: 1px solid #f1f5f9;">Model Number</td>
                  <td class="meta-value" style="color: #0f172a; font-weight: 500; font-family: monospace; padding: 8px 0; border-bottom: 1px solid #f1f5f9;">${params.productModel}</td>
                </tr>` : ''}
                <tr class="meta-row">
                  <td class="meta-label" style="color: #64748b; padding: 8px 0; border-bottom: 1px solid #f1f5f9;">Purchase Platform</td>
                  <td class="meta-value" style="color: #0f172a; font-weight: 500; padding: 8px 0; border-bottom: 1px solid #f1f5f9;">${params.purchasePlatform}</td>
                </tr>
                ${params.orderId ? `
                <tr class="meta-row">
                  <td class="meta-label" style="color: #64748b; padding: 8px 0; border-bottom: 1px solid #f1f5f9;">Order ID / Invoice No.</td>
                  <td class="meta-value" style="color: #0f172a; font-weight: 500; padding: 8px 0; border-bottom: 1px solid #f1f5f9;">${params.orderId}</td>
                </tr>` : ''}
                <tr class="meta-row">
                  <td class="meta-label" style="color: #64748b; padding: 8px 0; border-bottom: 1px solid #f1f5f9;">Purchase Invoice</td>
                  <td class="meta-value" style="color: #0f172a; padding: 8px 0; border-bottom: 1px solid #f1f5f9;">
                    ${params.invoiceUrl ? `<a href="${params.invoiceUrl}" target="_blank" style="color: #0284c7; font-weight: 600; text-decoration: none;">📄 View Invoice (${params.invoiceFileName || 'Uploaded'})</a>` : '<span style="color: #64748b;">Not provided</span>'}
                  </td>
                </tr>
              </table>

              <!-- ─── SECTION 2: WARRANTY COVERAGE TIMELINE ────────────────── -->
              <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #071426; font-weight: 700; margin: 0 0 12px 0; padding-bottom: 6px; border-bottom: 1px solid #e2e8f0;">
                Warranty Coverage Validity
              </h3>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; margin-bottom: 28px; overflow: hidden;">
                <tr>
                  <td style="padding: 16px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <!-- Start Date -->
                        <td align="center" class="timeline-box" style="width: 38%; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 8px;">
                          <div style="font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 600;">Warranty Start</div>
                          <div style="font-size: 14px; font-weight: 700; color: #071426; margin-top: 4px;">${formattedStartDate}</div>
                          <div style="font-size: 10px; color: #94a3b8; margin-top: 2px;">Purchase Date</div>
                        </td>

                        <!-- Duration Arrow -->
                        <td align="center" class="timeline-arrow" style="width: 24%; padding: 0 4px;">
                          <div style="font-size: 11px; font-weight: 700; color: #0284c7; background-color: #e0f2fe; padding: 3px 6px; border-radius: 10px;">${warrantyMonths} Months</div>
                          <div style="color: #cbd5e1; font-size: 14px; margin-top: 2px;">──────►</div>
                        </td>

                        <!-- End Date -->
                        <td align="center" class="timeline-box" style="width: 38%; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 8px;">
                          <div style="font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 600;">Warranty Expires</div>
                          <div style="font-size: 14px; font-weight: 700; color: #0f766e; margin-top: 4px;">${formattedEndDate}</div>
                          <div style="font-size: 10px; color: #14b8a6; font-weight: 600; margin-top: 2px;">${warrantyMonths} Months Validity</div>
                        </td>
                      </tr>
                    </table>

                    <div style="margin-top: 12px; font-size: 11px; color: #64748b; text-align: center; line-height: 1.4;">
                      Covers manufacturing defects and performance conformity in accordance with CLARYN warranty policy.
                    </div>
                  </td>
                </tr>
              </table>

              <!-- ─── SECTION 3: WARRANTY CLAIM & SUPPORT ────────────────────── -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f0f9ff; border: 1px solid #bae6fd; border-radius: 10px; padding: 20px; margin-bottom: 28px;">
                <tr>
                  <td>
                    <h4 style="margin: 0 0 8px 0; color: #0369a1; font-size: 15px; font-weight: 700;">
                      Need to Make a Warranty Claim?
                    </h4>
                    <p style="margin: 0 0 14px 0; font-size: 13px; line-height: 1.5; color: #0c4a6e;">
                      If you experience any performance concerns or need to submit a claim during your warranty validity period, you can easily initiate a claim through our online portal:
                    </p>

                    <!-- Prominent CTA Button -->
                    <table role="presentation" cellspacing="0" cellpadding="0" style="margin-bottom: 16px;">
                      <tr>
                        <td style="background-color: #0284c7; border-radius: 6px;">
                          <a href="${claimUrl}" target="_blank" style="display: inline-block; padding: 11px 22px; font-size: 13px; font-weight: 700; color: #ffffff; text-decoration: none; letter-spacing: 0.5px;">
                            Initiate Warranty Claim Online &rarr;
                          </a>
                        </td>
                      </tr>
                    </table>

                    <!-- 4-Step Shipping Process Notice -->
                    <div style="background-color: #ffffff; border: 1px solid #e0f2fe; border-radius: 8px; padding: 14px;">
                      <div style="font-size: 12px; font-weight: 700; color: #071426; margin-bottom: 6px;">
                        Warranty Claim Parcel Shipping Process:
                      </div>
                      <ol style="margin: 0; padding-left: 18px; font-size: 12px; color: #475569; line-height: 1.6;">
                        <li><strong>Contact Support:</strong> Reach out to initiate your claim and receive specific return instructions.</li>
                        <li><strong>Pack & Dispatch:</strong> Securely pack the unit and courier it to the CLARYN office address provided by support.</li>
                        <li><strong>Retain Receipt:</strong> Pay courier fees at booking and keep proof of payment.</li>
                        <li><strong>Reimbursement:</strong> Eligible courier charges are reimbursed upon parcel receipt and claim review.</li>
                      </ol>
                    </div>

                  </td>
                </tr>
              </table>

              <!-- ─── SECTION 4: CUSTOMER SUPPORT CONTACT ────────────────────── -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px; text-align: center;">
                <tr>
                  <td>
                    <div style="font-size: 13px; font-weight: 700; color: #071426; margin-bottom: 4px;">Have Questions or Need Help?</div>
                    <div style="font-size: 12px; color: #475569; margin-bottom: 8px;">Our customer support team is here to assist you:</div>
                    <div style="font-size: 12px; color: #0284c7; font-weight: 600;">
                      <a href="mailto:${supportEmail}" style="color: #0284c7; text-decoration: none;">${supportEmail}</a>
                      &nbsp;|&nbsp;
                      <a href="tel:${supportPhone}" style="color: #0284c7; text-decoration: none;">${supportPhone}</a>
                    </div>
                    <div style="font-size: 11px; color: #94a3b8; margin-top: 6px;">
                      Monday &ndash; Saturday &bull; 9:30 AM &ndash; 6:30 PM IST
                    </div>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #071426; padding: 24px 32px; text-align: center; color: #94a3b8; font-size: 11px; line-height: 1.6;">
              <p style="margin: 0 0 6px 0; color: #cbd5e1; font-weight: 600;">CLARYN Water Solutions &bull; Better Water Starts With Understanding It</p>
              <p style="margin: 0 0 10px 0;">Surat, Gujarat, India &ndash; 394107</p>
              <p style="margin: 0; color: #64748b; font-size: 10px;">
                This is an automated confirmation of your product registration. For terms, visit <a href="${siteUrl}/warranty" style="color: #38bdf8; text-decoration: none;">Warranty Policy</a> or <a href="${siteUrl}/privacy" style="color: #38bdf8; text-decoration: none;">Privacy Policy</a>.
              </p>
            </td>
          </tr>

        </table>
        <!-- End Main Card -->

      </td>
    </tr>
  </table>

</body>
</html>`;
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

  const supportEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'udartawatertech@gmail.com';
  const senderEmail = process.env.SMTP_USER || 'udartawatertech@gmail.com';
  const customerHtml = generateWarrantyConfirmationHtml(params);

  // ─── Admin Alert Template ────────────────────────────────────────────────
  const adminHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; color: #1e293b; max-width: 600px; padding: 20px;">
      <h2 style="color: #071426; border-bottom: 2px solid #0284c7; padding-bottom: 8px;">New Product Warranty Registration</h2>
      <p>A new customer has registered their CLARYN product:</p>
      <table style="width: 100%; border-collapse: collapse; margin-top: 14px; font-size: 13px;">
        <tr><td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold; background: #f8fafc;">Reference ID:</td><td style="padding: 8px; border: 1px solid #e2e8f0; font-family: monospace; font-weight: bold; color: #0284c7;">${params.registrationId}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold; background: #f8fafc;">Customer:</td><td style="padding: 8px; border: 1px solid #e2e8f0;">${params.customerName}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold; background: #f8fafc;">Mobile:</td><td style="padding: 8px; border: 1px solid #e2e8f0;"><a href="tel:${params.customerMobile}">${params.customerMobile}</a></td></tr>
        <tr><td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold; background: #f8fafc;">Email:</td><td style="padding: 8px; border: 1px solid #e2e8f0;"><a href="mailto:${params.customerEmail}">${params.customerEmail}</a></td></tr>
        <tr><td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold; background: #f8fafc;">Product:</td><td style="padding: 8px; border: 1px solid #e2e8f0;">${params.productName}${params.productModel ? ` (${params.productModel})` : ''}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold; background: #f8fafc;">Purchase Date:</td><td style="padding: 8px; border: 1px solid #e2e8f0;">${formattedDate}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold; background: #f8fafc;">Platform:</td><td style="padding: 8px; border: 1px solid #e2e8f0;">${params.purchasePlatform}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold; background: #f8fafc;">Order ID:</td><td style="padding: 8px; border: 1px solid #e2e8f0;">${params.orderId || 'None'}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold; background: #f8fafc;">Invoice Storage:</td><td style="padding: 8px; border: 1px solid #e2e8f0;">${params.invoiceUrl ? `<a href="${params.invoiceUrl}" target="_blank" style="color: #0284c7; font-weight: bold;">View Cloudflare Invoice</a>` : 'Not uploaded'}</td></tr>
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
      from: `"CLARYN Warranty Support" <${senderEmail}>`,
      to: params.customerEmail,
      replyTo: supportEmail,
      subject: `Your CLARYN Warranty Registration Confirmed [${params.registrationId}]`,
      text: `Dear ${params.customerName},\n\nYour warranty registration for ${params.productName} has been confirmed.\n\nRegistration Reference ID: ${params.registrationId}\nPurchase Date: ${formattedDate}\nPlatform: ${params.purchasePlatform}\n\nTo view or submit a warranty claim, visit: ${process.env.NEXT_PUBLIC_SITE_URL || 'https://claryn.in'}/warranty/claim\n\nIf you have any questions, reach our support team at ${supportEmail}.\n\nCLARYN Customer Support`,
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

export interface SendWarrantyClaimEmailParams {
  claimId: string;
  registrationId?: string | null;
  customerName: string;
  customerEmail: string;
  customerMobile: string;
  productName: string;
  productModel?: string | null;
  purchaseDate: string;
  purchasePlatform: string;
  orderId?: string | null;
  issueCategory: string;
  issueDescription: string;
  sourceTDS?: string | null;
  purifiedTDS?: string | null;
  attachmentUrl?: string | null;
}

/**
 * Sends warranty claim acknowledgement to customer and internal alert to support
 */
export async function sendWarrantyClaimEmails(
  params: SendWarrantyClaimEmailParams
): Promise<{ customerEmailSent: boolean; adminEmailSent: boolean; isSimulated: boolean }> {
  const transporter = getTransporter();
  const supportEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'udartawatertech@gmail.com';
  const supportPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE || '+91 92748 41287';
  const senderEmail = process.env.SMTP_USER || 'udartawatertech@gmail.com';
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://claryn.in').replace(/\/$/, '');

  const customerHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>CLARYN Warranty Claim Received [${params.claimId}]</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding: 32px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 14px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 16px rgba(0,0,0,0.06);">
          <tr>
            <td style="background-color: #071426; padding: 32px; text-align: center; border-bottom: 3px solid #0284c7;">
              <span style="font-size: 24px; font-weight: 800; letter-spacing: 2.5px; color: #ffffff;">CLARYN</span>
              <p style="margin: 6px 0 0 0; color: #94a3b8; font-size: 11px; letter-spacing: 1px; text-transform: uppercase;">Warranty Claim Acknowledgement</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 28px;">
              <div style="background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 14px 18px; margin-bottom: 20px;">
                <h3 style="margin: 0 0 4px 0; color: #1e40af; font-size: 16px;">Warranty Claim Received</h3>
                <p style="margin: 0; color: #1e3a8a; font-size: 13px;">Our technical support team is reviewing your claim details.</p>
              </div>

              <p style="font-size: 15px; margin: 0 0 16px 0;">Dear <strong>${params.customerName}</strong>,</p>
              <p style="font-size: 14px; color: #475569; line-height: 1.6; margin: 0 0 20px 0;">
                We have received your warranty claim for the <strong>${params.productName}</strong>. Your claim has been assigned a unique tracking number below:
              </p>

              <div style="background-color: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px; padding: 14px; text-align: center; margin-bottom: 24px;">
                <div style="font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 600;">Claim Tracking Number</div>
                <div style="font-size: 20px; font-weight: 800; color: #0284c7; font-family: monospace; margin-top: 4px;">${params.claimId}</div>
              </div>

              <h4 style="font-size: 12px; text-transform: uppercase; color: #071426; margin: 0 0 10px 0; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px;">Claim Summary</h4>
              <table width="100%" cellspacing="0" cellpadding="6" style="font-size: 13px; margin-bottom: 24px;">
                <tr><td style="color: #64748b; width: 35%;">Product:</td><td style="color: #0f172a; font-weight: 600;">${params.productName}</td></tr>
                <tr><td style="color: #64748b;">Primary Issue:</td><td style="color: #0f172a; font-weight: 600;">${params.issueCategory}</td></tr>
                <tr><td style="color: #64748b;">Purchase Date:</td><td style="color: #0f172a;">${params.purchaseDate}</td></tr>
                ${params.sourceTDS ? `<tr><td style="color: #64748b;">Source / Purified TDS:</td><td style="color: #0f172a;">${params.sourceTDS} ppm / ${params.purifiedTDS || 'N/A'} ppm</td></tr>` : ''}
              </table>

              <!-- Shipping Process Box -->
              <div style="background-color: #f8fafc; border-left: 4px solid #0284c7; padding: 14px 16px; border-radius: 0 8px 8px 0; margin-bottom: 24px;">
                <h5 style="margin: 0 0 6px 0; font-size: 13px; color: #071426;">Warranty Claim — Next Steps & Parcel Shipping</h5>
                <ol style="margin: 0; padding-left: 18px; font-size: 12px; color: #475569; line-height: 1.55;">
                  <li><strong>Wait for instructions:</strong> Our team will review your claim within 1–2 business days and provide the return authorization and shipping address.</li>
                  <li><strong>Pack securely:</strong> Pack the product safely and book courier dispatch.</li>
                  <li><strong>Keep proof of payment:</strong> Retain the shipping receipt. Eligible courier charges are reimbursed upon claim review.</li>
                </ol>
              </div>

              <!-- Support Box -->
              <div style="background-color: #f1f5f9; border-radius: 8px; padding: 14px; font-size: 12px; color: #475569; text-align: center;">
                <p style="margin: 0 0 4px 0; font-weight: 600; color: #0f172a;">CLARYN Support Helpline</p>
                <p style="margin: 0;">Email: <a href="mailto:${supportEmail}" style="color: #0284c7;">${supportEmail}</a> | Phone: ${supportPhone}</p>
              </div>

            </td>
          </tr>
          <tr>
            <td style="background-color: #071426; padding: 18px; text-align: center; color: #94a3b8; font-size: 11px;">
              © ${new Date().getFullYear()} CLARYN. All rights reserved. Surat, Gujarat, India.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const adminHtml = `
    <div style="font-family: sans-serif; font-size: 14px; color: #1e293b; max-width: 600px;">
      <h2 style="color: #071426; border-bottom: 2px solid #0284c7; padding-bottom: 6px;">New Warranty Claim [${params.claimId}]</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 13px;">
        <tr><td style="padding: 6px; border: 1px solid #ddd; font-weight: bold;">Claim ID:</td><td style="padding: 6px; border: 1px solid #ddd; font-weight: bold; color: #0284c7;">${params.claimId}</td></tr>
        <tr><td style="padding: 6px; border: 1px solid #ddd; font-weight: bold;">Customer:</td><td style="padding: 6px; border: 1px solid #ddd;">${params.customerName}</td></tr>
        <tr><td style="padding: 6px; border: 1px solid #ddd; font-weight: bold;">Phone:</td><td style="padding: 6px; border: 1px solid #ddd;"><a href="tel:${params.customerMobile}">${params.customerMobile}</a></td></tr>
        <tr><td style="padding: 6px; border: 1px solid #ddd; font-weight: bold;">Email:</td><td style="padding: 6px; border: 1px solid #ddd;"><a href="mailto:${params.customerEmail}">${params.customerEmail}</a></td></tr>
        <tr><td style="padding: 6px; border: 1px solid #ddd; font-weight: bold;">Product:</td><td style="padding: 6px; border: 1px solid #ddd;">${params.productName}${params.productModel ? ` (${params.productModel})` : ''}</td></tr>
        <tr><td style="padding: 6px; border: 1px solid #ddd; font-weight: bold;">Purchase Date / Platform:</td><td style="padding: 6px; border: 1px solid #ddd;">${params.purchaseDate} (${params.purchasePlatform})</td></tr>
        <tr><td style="padding: 6px; border: 1px solid #ddd; font-weight: bold;">Order ID:</td><td style="padding: 6px; border: 1px solid #ddd;">${params.orderId || 'None'}</td></tr>
        <tr><td style="padding: 6px; border: 1px solid #ddd; font-weight: bold;">Registration Ref:</td><td style="padding: 6px; border: 1px solid #ddd;">${params.registrationId || 'Not provided'}</td></tr>
        <tr><td style="padding: 6px; border: 1px solid #ddd; font-weight: bold;">Issue Category:</td><td style="padding: 6px; border: 1px solid #ddd; font-weight: bold;">${params.issueCategory}</td></tr>
        <tr><td style="padding: 6px; border: 1px solid #ddd; font-weight: bold;">Issue Description:</td><td style="padding: 6px; border: 1px solid #ddd;">${params.issueDescription}</td></tr>
        <tr><td style="padding: 6px; border: 1px solid #ddd; font-weight: bold;">TDS Measurements:</td><td style="padding: 6px; border: 1px solid #ddd;">Raw: ${params.sourceTDS || 'N/A'} ppm | Purified: ${params.purifiedTDS || 'N/A'} ppm</td></tr>
        <tr><td style="padding: 6px; border: 1px solid #ddd; font-weight: bold;">Attachment:</td><td style="padding: 6px; border: 1px solid #ddd;">${params.attachmentUrl ? `<a href="${params.attachmentUrl}" target="_blank">View Stored File</a>` : 'None'}</td></tr>
      </table>
    </div>
  `;

  if (!transporter) {
    console.log('[Email Simulated] Claim confirmation to:', params.customerEmail, `(${params.claimId})`);
    console.log('[Email Simulated] Admin claim notification to:', supportEmail);
    return { customerEmailSent: false, adminEmailSent: false, isSimulated: true };
  }

  let customerEmailSent = false;
  let adminEmailSent = false;

  try {
    await transporter.sendMail({
      from: `"CLARYN Warranty Support" <${senderEmail}>`,
      to: params.customerEmail,
      replyTo: supportEmail,
      subject: `Your CLARYN Warranty Claim Has Been Received [${params.claimId}]`,
      html: customerHtml,
    });
    customerEmailSent = true;
  } catch (e) {
    console.error('[Email] Failed to send customer claim confirmation:', e);
  }

  try {
    await transporter.sendMail({
      from: `"CLARYN Portal" <${senderEmail}>`,
      to: supportEmail,
      subject: `[New Warranty Claim] ${params.productName} - ${params.customerName} [${params.claimId}]`,
      html: adminHtml,
    });
    adminEmailSent = true;
  } catch (e) {
    console.error('[Email] Failed to send admin claim alert:', e);
  }

  return { customerEmailSent, adminEmailSent, isSimulated: false };
}
