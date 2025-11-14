import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { changelogEntries } from '@/db/schema';
import { like, or, desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const search = searchParams.get('search');

    let query = db.select().from(changelogEntries);

    if (search) {
      const searchTerm = `%${search}%`;
      query = query.where(
        or(
          like(changelogEntries.title, searchTerm),
          like(changelogEntries.content, searchTerm)
        )
      );
    }

    const results = await query
      .orderBy(desc(changelogEntries.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content } = body;

    // Validate required fields
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return NextResponse.json(
        { 
          error: 'Title is required and must be a non-empty string',
          code: 'MISSING_TITLE'
        },
        { status: 400 }
      );
    }

    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return NextResponse.json(
        { 
          error: 'Content is required and must be a non-empty string',
          code: 'MISSING_CONTENT'
        },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedTitle = title.trim();
    const sanitizedContent = content.trim();

    // Create new changelog entry
    const newEntry = await db.insert(changelogEntries)
      .values({
        title: sanitizedTitle,
        content: sanitizedContent,
        createdAt: new Date().toISOString()
      })
      .returning();

    return NextResponse.json(newEntry[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}