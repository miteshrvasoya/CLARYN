import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

/**
 * Cloudflare R2 Client and Presigned URL Generator
 * 
 * Required Environment Variables in .env.local:
 * - R2_ACCOUNT_ID: Cloudflare Account ID
 * - R2_ACCESS_KEY_ID: Cloudflare R2 API Token Access Key
 * - R2_SECRET_ACCESS_KEY: Cloudflare R2 API Token Secret Key
 * - R2_BUCKET_NAME: Name of your R2 bucket (e.g. claryn-invoices)
 * - R2_PUBLIC_DOMAIN: (Optional) Public URL prefix, e.g. https://invoices.claryn.in or https://pub-xxx.r2.dev
 */

export interface PresignedUrlResult {
  presignedUrl: string;
  fileKey: string;
  publicUrl: string;
  isSimulated: boolean;
}

let r2ClientInstance: S3Client | null = null;

export function getR2Client(): S3Client | null {
  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

  if (!accountId || !accessKeyId || !secretAccessKey) {
    return null;
  }

  if (!r2ClientInstance) {
    r2ClientInstance = new S3Client({
      region: 'auto',
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }

  return r2ClientInstance;
}

/**
 * Generates an S3 presigned PUT URL for direct browser-to-Cloudflare-R2 upload
 */
export async function createPresignedUploadUrl(params: {
  fileName: string;
  fileType: string;
  fileSize?: number;
  prefix?: string;
}): Promise<PresignedUrlResult> {
  const { fileName, fileType, prefix = 'invoices' } = params;

  // Sanitize filename to avoid path injection
  const sanitizedName = fileName
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, '_')
    .slice(-50);

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const uniqueId = Math.random().toString(36).substring(2, 10);
  const fileKey = `${prefix}/${year}/${month}/${uniqueId}-${sanitizedName}`;

  const client = getR2Client();
  const bucket = process.env.R2_BUCKET_NAME || 'claryn-invoices';
  const publicDomain = process.env.R2_PUBLIC_DOMAIN?.replace(/\/$/, '') || '';

  // If Cloudflare R2 is configured
  if (client) {
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: fileKey,
      ContentType: fileType,
    });

    // 5 minutes expiry for presigned PUT URL
    const presignedUrl = await getSignedUrl(client, command, { expiresIn: 300 });

    let publicUrl = `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${bucket}/${fileKey}`;
    if (publicDomain) {
      if (publicDomain.includes('cloudflarestorage.com')) {
        publicUrl = `${publicDomain}/${bucket}/${fileKey}`;
      } else {
        publicUrl = `${publicDomain}/${fileKey}`;
      }
    }

    return {
      presignedUrl,
      fileKey,
      publicUrl,
      isSimulated: false,
    };
  }

  // Graceful development fallback when R2 credentials are not yet set
  console.warn('[Cloudflare R2] Credentials not configured in .env.local. Using local simulated upload fallback.');
  
  return {
    presignedUrl: `/api/upload-presigned-url/mock-upload?key=${encodeURIComponent(fileKey)}`,
    fileKey,
    publicUrl: `/mock-storage/${fileKey}`,
    isSimulated: true,
  };
}
