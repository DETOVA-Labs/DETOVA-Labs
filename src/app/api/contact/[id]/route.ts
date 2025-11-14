import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { contactSubmissions } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Validate ID parameter
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        {
          error: 'Valid ID is required',
          code: 'INVALID_ID',
        },
        { status: 400 }
      );
    }

    const submissionId = parseInt(id);

    // Check if record exists
    const existing = await db
      .select()
      .from(contactSubmissions)
      .where(eq(contactSubmissions.id, submissionId))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json(
        {
          error: 'Submission not found',
          code: 'NOT_FOUND',
        },
        { status: 404 }
      );
    }

    // Parse request body for updates
    const updates = await request.json();

    // Perform update with returning
    const updated = await db
      .update(contactSubmissions)
      .set(updates)
      .where(eq(contactSubmissions.id, submissionId))
      .returning();

    return NextResponse.json(updated[0], { status: 200 });
  } catch (error) {
    console.error('PATCH error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error: ' + (error as Error).message,
      },
      { status: 500 }
    );
  }
}