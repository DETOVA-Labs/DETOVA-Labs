import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { changelogEntries } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function DELETE(
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

    const entryId = parseInt(id);

    // Check if record exists before deleting
    const existingEntry = await db
      .select()
      .from(changelogEntries)
      .where(eq(changelogEntries.id, entryId))
      .limit(1);

    if (existingEntry.length === 0) {
      return NextResponse.json(
        {
          error: 'Changelog entry not found',
          code: 'NOT_FOUND',
        },
        { status: 404 }
      );
    }

    // Delete the changelog entry
    const deleted = await db
      .delete(changelogEntries)
      .where(eq(changelogEntries.id, entryId))
      .returning();

    return NextResponse.json(
      {
        success: true,
        message: 'Changelog entry deleted successfully',
        data: deleted[0],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error: ' + (error as Error).message,
      },
      { status: 500 }
    );
  }
}