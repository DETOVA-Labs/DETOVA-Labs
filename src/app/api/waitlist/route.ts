import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { waitlist } from '@/db/schema';
import { eq, like } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, source } = body;

    // Validate email is required
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required', code: 'MISSING_EMAIL' },
        { status: 400 }
      );
    }

    // Sanitize: trim and lowercase email
    const sanitizedEmail = email.trim().toLowerCase();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format', code: 'INVALID_EMAIL' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingEntry = await db
      .select()
      .from(waitlist)
      .where(eq(waitlist.email, sanitizedEmail))
      .limit(1);

    if (existingEntry.length > 0) {
      return NextResponse.json(
        { error: 'Email already on waitlist', code: 'DUPLICATE_EMAIL' },
        { status: 409 }
      );
    }

    // Insert new waitlist entry
    const newEntry = await db
      .insert(waitlist)
      .values({
        email: sanitizedEmail,
        source: source?.trim() || null,
        createdAt: new Date().toISOString(),
      })
      .returning();

    return NextResponse.json(newEntry[0], { status: 201 });
  } catch (error: any) {
    console.error('POST error:', error);

    // Handle unique constraint violation
    if (error.message?.includes('UNIQUE constraint failed')) {
      return NextResponse.json(
        { error: 'Email already on waitlist', code: 'DUPLICATE_EMAIL' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Pagination
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');

    // Search and filter parameters
    const search = searchParams.get('search');
    const source = searchParams.get('source');

    // Build query
    let query = db.select().from(waitlist);

    // Apply search filter (search by email)
    if (search) {
      const searchTerm = search.trim().toLowerCase();
      query = query.where(like(waitlist.email, `%${searchTerm}%`));
    }

    // Apply source filter
    if (source) {
      const sourceTerm = source.trim();
      query = query.where(eq(waitlist.source, sourceTerm));
    }

    // Apply pagination
    const results = await query.limit(limit).offset(offset);

    return NextResponse.json(results, { status: 200 });
  } catch (error: any) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}