import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const isLive = searchParams.get('isLive');

    let where: any = {};

    if (userId) {
      where.OR = [
        { userId1: userId },
        { userId2: userId },
      ];
    }

    if (isLive !== null) {
      where.isLive = isLive === 'true';
    }

    const sessions = await prisma.practiceSession.findMany({
      where,
      include: {
        user1: {
          select: {
            userId: true,
            username: true,
            profilePicUrl: true,
          },
        },
        user2: {
          select: {
            userId: true,
            username: true,
            profilePicUrl: true,
          },
        },
        tutorial: {
          select: {
            tutorialId: true,
            title: true,
            thumbnailUrl: true,
          },
        },
        aiFeedbacks: {
          orderBy: { timestamp: 'desc' },
          take: 1,
        },
      },
      orderBy: { startTime: 'desc' },
    });

    return NextResponse.json(sessions);
  } catch (error) {
    console.error('Error fetching practice sessions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch practice sessions' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId1, userId2, tutorialId, sessionType, isLive } = body;

    const session = await prisma.practiceSession.create({
      data: {
        userId1,
        userId2,
        tutorialId,
        sessionType,
        isLive: isLive || false,
      },
      include: {
        user1: {
          select: {
            userId: true,
            username: true,
            profilePicUrl: true,
          },
        },
        user2: {
          select: {
            userId: true,
            username: true,
            profilePicUrl: true,
          },
        },
        tutorial: {
          select: {
            tutorialId: true,
            title: true,
            thumbnailUrl: true,
          },
        },
      },
    });

    return NextResponse.json(session, { status: 201 });
  } catch (error) {
    console.error('Error creating practice session:', error);
    return NextResponse.json(
      { error: 'Failed to create practice session' },
      { status: 500 }
    );
  }
}

