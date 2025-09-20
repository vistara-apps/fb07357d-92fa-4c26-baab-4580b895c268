import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const challengeId = searchParams.get('challengeId');
    const userId = searchParams.get('userId');

    let where: any = {};

    if (challengeId) {
      where.challengeId = challengeId;
    }

    if (userId) {
      where.userId = userId;
    }

    const submissions = await prisma.submission.findMany({
      where,
      include: {
        user: {
          select: {
            userId: true,
            username: true,
            profilePicUrl: true,
          },
        },
        challenge: {
          select: {
            challengeId: true,
            title: true,
            description: true,
          },
        },
      },
      orderBy: { timestamp: 'desc' },
    });

    return NextResponse.json(submissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { challengeId, userId, videoUrl, title, description } = body;

    const submission = await prisma.submission.create({
      data: {
        challengeId,
        userId,
        videoUrl,
        title,
        description,
      },
      include: {
        user: {
          select: {
            userId: true,
            username: true,
            profilePicUrl: true,
          },
        },
        challenge: {
          select: {
            challengeId: true,
            title: true,
            description: true,
          },
        },
      },
    });

    // Update challenge participant count
    await prisma.challenge.update({
      where: { challengeId },
      data: {
        participantCount: {
          increment: 1,
        },
      },
    });

    return NextResponse.json(submission, { status: 201 });
  } catch (error) {
    console.error('Error creating submission:', error);
    return NextResponse.json(
      { error: 'Failed to create submission' },
      { status: 500 }
    );
  }
}

