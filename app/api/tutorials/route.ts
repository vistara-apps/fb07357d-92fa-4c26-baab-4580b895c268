import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const style = searchParams.get('style');
    const difficulty = searchParams.get('difficulty');
    const search = searchParams.get('search');

    let where: any = {};

    if (style && style !== 'all') {
      where.danceStyle = style.toLowerCase();
    }

    if (difficulty && difficulty !== 'all') {
      where.difficulty = difficulty;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { instructor: { contains: search, mode: 'insensitive' } },
      ];
    }

    const tutorials = await prisma.danceTutorial.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(tutorials);
  } catch (error) {
    console.error('Error fetching tutorials:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tutorials' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, videoUrl, danceStyle, difficulty, duration, thumbnailUrl, instructor, tags } = body;

    const tutorial = await prisma.danceTutorial.create({
      data: {
        title,
        description,
        videoUrl,
        danceStyle,
        difficulty,
        duration: parseInt(duration),
        thumbnailUrl,
        instructor,
        tags: JSON.stringify(tags || []),
      },
    });

    return NextResponse.json(tutorial, { status: 201 });
  } catch (error) {
    console.error('Error creating tutorial:', error);
    return NextResponse.json(
      { error: 'Failed to create tutorial' },
      { status: 500 }
    );
  }
}

