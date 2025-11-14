import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { labFeed } from '@/db/schema';
import { like, desc } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, link } = body;

    // Validate required field
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return NextResponse.json(
        { 
          error: 'Text is required',
          code: 'MISSING_REQUIRED_FIELD'
        },
        { status: 400 }
      );
    }

    // Sanitize text
    const sanitizedText = text.trim();

    // Validate and sanitize link if provided
    let sanitizedLink = null;
    if (link && typeof link === 'string' && link.trim().length > 0) {
      const trimmedLink = link.trim();
      try {
        new URL(trimmedLink);
        sanitizedLink = trimmedLink;
      } catch (error) {
        return NextResponse.json(
          {
            error: 'Invalid URL format for link',
            code: 'INVALID_URL'
          },
          { status: 400 }
        );
      }
    }

    // Insert new lab feed item
    const newLabFeed = await db.insert(labFeed)
      .values({
        text: sanitizedText,
        link: sanitizedLink,
        createdAt: new Date().toISOString()
      })
      .returning();

    return NextResponse.json(newLabFeed[0], { status: 201 });

  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error instanceof Error ? error.message : String(error)) },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Parse pagination parameters
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const search = searchParams.get('search');

    // Build query
    let query = db.select().from(labFeed);

    // Apply search filter if provided
    if (search && search.trim().length > 0) {
      query = query.where(like(labFeed.text, `%${search.trim()}%`));
    }

    // Apply sorting (newest first) and pagination
    const results = await query
      .orderBy(desc(labFeed.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(results, { status: 200 });

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error instanceof Error ? error.message : String(error)) },
      { status: 500 }
    );
  }
}