import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, userId, videoDescription, isPremium = false } = body;

    // For MVP, we'll simulate AI analysis based on video description
    // In production, this would analyze actual video content
    const analysis = await analyzeDancePerformance(videoDescription, isPremium);

    const feedback = {
      feedbackId: `feedback_${Date.now()}`,
      sessionId,
      userId,
      overallScore: analysis.overallScore,
      rhythmScore: analysis.rhythmScore,
      formScore: analysis.formScore,
      energyScore: analysis.energyScore,
      suggestions: JSON.stringify(analysis.suggestions),
      timestamp: new Date(),
      isPremium,
    };

    return NextResponse.json(feedback, { status: 201 });
  } catch (error) {
    console.error('Error generating AI feedback:', error);
    return NextResponse.json(
      { error: 'Failed to generate AI feedback' },
      { status: 500 }
    );
  }
}

async function analyzeDancePerformance(videoDescription: string, isPremium: boolean) {
  try {
    const prompt = `Analyze this dance performance description and provide feedback. Description: "${videoDescription}"

Provide a JSON response with:
- overallScore: number (0-100)
- rhythmScore: number (0-100)
- formScore: number (0-100)
- energyScore: number (0-100)
- suggestions: array of strings with improvement tips

${isPremium ? 'Provide detailed, professional feedback.' : 'Provide basic feedback suitable for free tier.'}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an expert dance instructor providing constructive feedback. Always respond with valid JSON.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('No response from OpenAI');
    }

    return JSON.parse(response);
  } catch (error) {
    console.error('OpenAI analysis failed, using fallback:', error);

    // Fallback analysis for MVP
    return {
      overallScore: Math.floor(Math.random() * 40) + 60, // 60-100
      rhythmScore: Math.floor(Math.random() * 40) + 60,
      formScore: Math.floor(Math.random() * 40) + 60,
      energyScore: Math.floor(Math.random() * 40) + 60,
      suggestions: [
        'Keep practicing to improve your timing',
        'Focus on maintaining proper posture',
        'Try to add more expression to your movements',
        'Work on smoother transitions between moves',
      ],
    };
  }
}

