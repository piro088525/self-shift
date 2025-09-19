import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const entry = await prisma.diaryEntry.findUnique({
      where: { id: params.id }
    });

    if (!entry) {
      return NextResponse.json(
        { error: 'Diary entry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(entry);
  } catch (error) {
    console.error('Error fetching diary entry:', error);
    return NextResponse.json(
      { error: 'Failed to fetch diary entry' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { title, content, date, mood, tags } = body;

    const entry = await prisma.diaryEntry.update({
      where: { id: params.id },
      data: {
        title,
        content,
        date: date ? new Date(date) : undefined,
        mood,
        tags: tags || []
      }
    });

    return NextResponse.json(entry);
  } catch (error) {
    console.error('Error updating diary entry:', error);
    return NextResponse.json(
      { error: 'Failed to update diary entry' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.diaryEntry.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ message: 'Diary entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting diary entry:', error);
    return NextResponse.json(
      { error: 'Failed to delete diary entry' },
      { status: 500 }
    );
  }
}