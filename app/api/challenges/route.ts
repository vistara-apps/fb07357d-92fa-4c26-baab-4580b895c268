import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const challenges = await prisma.challenge.findMany({
      include: {
        creator: {
          select: {
            userId: true,
            username: true,
            profilePicUrl: true,
          },
        },
        submissions: {
          select: {
            submissionId: true,
            userId: true,
            videoUrl: true,
            likes: true,
            views: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(challenges);
  } catch (error) {
    console.error('Error fetching challenges:', error);
    return NextResponse.json(
      { error: 'Failed to fetch challenges' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, startDate, endDate, creatorId, prize, difficulty, tags } = body;

    const challenge = await prisma.challenge.create({
      data: {
        title,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        creatorId,
        prize,
        difficulty,
        tags: JSON.stringify(tags || []),
      },
      include: {
        creator: {
          select: {
            userId: true,
            username: true,
            profilePicUrl: true,
          },
        },
      },
    });

    return NextResponse.json(challenge, { status: 201 });
  } catch (error) {
    console.error('Error creating challenge:', error);
    return NextResponse.json(
      { error: 'Failed to create challenge' },
      { status: 500 }
    );
  }
}

