import { NextRequest } from 'next/server';
import { initSocket } from '@/lib/socket/server';

export async function GET(request: NextRequest) {
  // This route is handled by Socket.IO
  return new Response('Socket.IO server', { status: 200 });
}

