import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { labFeed } from '@/db/schema';
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

    const itemId = parseInt(id);

    // Check if record exists before deleting
    const existingRecord = await db
      .select()
      .from(labFeed)
      .where(eq(labFeed.id, itemId))
      .limit(1);

    if (existingRecord.length === 0) {
      return NextResponse.json(
        {
          error: 'Lab feed item not found',
          code: 'NOT_FOUND',
        },
        { status: 404 }
      );
    }

    // Delete the lab feed item
    await db.delete(labFeed).where(eq(labFeed.id, itemId)).returning();

    return NextResponse.json(
      {
        success: true,
        message: 'Lab feed item deleted successfully',
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