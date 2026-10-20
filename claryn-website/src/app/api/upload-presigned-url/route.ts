import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createPresignedUploadUrl } from '@/lib/r2';

const PresignRequestSchema = z.object({
  fileName: z.string().min(1, 'File name is required'),
  fileType: z.string().refine(
    (type) => ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'].includes(type.toLowerCase()),
    'Unsupported file format. Please upload JPG, JPEG, or PDF.'
  ),
  fileSize: z.number().max(5 * 1024 * 1024, 'File exceeds 5MB size limit').optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = PresignRequestSchema.parse(body);

    const result = await createPresignedUploadUrl({
      fileName: validated.fileName,
      fileType: validated.fileType,
      fileSize: validated.fileSize,
      prefix: 'invoices',
    });

    return NextResponse.json({
      success: true,
      presignedUrl: result.presignedUrl,
      fileKey: result.fileKey,
      publicUrl: result.publicUrl,
      isSimulated: result.isSimulated,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: err.issues[0]?.message || 'Invalid upload parameters' },
        { status: 400 }
      );
    }
    console.error('[upload-presigned-url] Error:', err);
    return NextResponse.json(
      { success: false, error: 'Could not generate upload URL. Please try again.' },
      { status: 500 }
    );
  }
}
