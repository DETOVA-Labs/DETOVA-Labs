import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { internshipApplications } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { 
          error: 'Valid ID is required',
          code: 'INVALID_ID' 
        },
        { status: 400 }
      );
    }

    const existingRecord = await db
      .select()
      .from(internshipApplications)
      .where(eq(internshipApplications.id, parseInt(id)))
      .limit(1);

    if (existingRecord.length === 0) {
      return NextResponse.json(
        { 
          error: 'Application not found',
          code: 'NOT_FOUND' 
        },
        { status: 404 }
      );
    }

    const body = await request.json();

    const allowedFields = ['status', 'name', 'email', 'location', 'skills', 'portfolio', 'why', 'availability'];
    const updates: Record<string, any> = {};

    for (const [key, value] of Object.entries(body)) {
      if (allowedFields.includes(key)) {
        if (typeof value === 'string') {
          updates[key] = value.trim();
        } else {
          updates[key] = value;
        }
      }
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { 
          error: 'No valid fields to update',
          code: 'NO_UPDATES' 
        },
        { status: 400 }
      );
    }

    const updatedApplication = await db
      .update(internshipApplications)
      .set(updates)
      .where(eq(internshipApplications.id, parseInt(id)))
      .returning();

    return NextResponse.json(updatedApplication[0], { status: 200 });

  } catch (error) {
    console.error('PATCH error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}