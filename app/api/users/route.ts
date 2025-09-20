import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (userId) {
      const user = await prisma.user.findUnique({
        where: { userId },
        include: {
          practiceSessions: {
            include: {
              tutorial: true,
              aiFeedbacks: {
                orderBy: { timestamp: 'desc' },
                take: 1,
              },
            },
            orderBy: { startTime: 'desc' },
            take: 10,
          },
          submissions: {
            include: {
              challenge: true,
            },
            orderBy: { timestamp: 'desc' },
            take: 10,
          },
        },
      });

      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      return NextResponse.json(user);
    }

    // Return all users (for finding practice partners)
    const users = await prisma.user.findMany({
      select: {
        userId: true,
        username: true,
        profilePicUrl: true,
      },
      orderBy: { username: 'asc' },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, username, profilePicUrl, walletAddress } = body;

    const user = await prisma.user.upsert({
      where: { userId },
      update: {
        username,
        profilePicUrl,
        walletAddress,
      },
      create: {
        userId,
        username,
        profilePicUrl,
        walletAddress,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error('Error creating/updating user:', error);
    return NextResponse.json(
      { error: 'Failed to create/update user' },
      { status: 500 }
    );
  }
}

