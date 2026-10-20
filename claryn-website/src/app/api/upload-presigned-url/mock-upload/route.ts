import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  // Simulates Cloudflare R2 direct PUT upload during development
  const key = req.nextUrl.searchParams.get('key') || 'mock-invoice-file';
  console.log(`[Cloudflare R2 Dev Simulation] Received mock PUT upload for key: ${key}`);
  
  return new NextResponse(null, {
    status: 200,
    headers: {
      'ETag': `"mock-etag-${Date.now()}"`,
      'Access-Control-Allow-Origin': '*',
    },
  });
}
