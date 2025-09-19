import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const entries = await prisma.diaryEntry.findMany({
      orderBy: [
        { date: 'desc' },
        { createdAt: 'desc' }
      ]
    });
    return NextResponse.json(entries);
  } catch (error) {
    console.error('Error fetching diary entries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch diary entries' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, date, mood, tags } = body;

    const entry = await prisma.diaryEntry.create({
      data: {
        title,
        content,
        date: date ? new Date(date) : new Date(),
        mood,
        tags: tags || []
      }
    });

    return NextResponse.json(entry, { status: 201 });
  } catch (error) {
    console.error('Error creating diary entry:', error);
    return NextResponse.json(
      { error: 'Failed to create diary entry' },
      { status: 500 }
    );
  }
}