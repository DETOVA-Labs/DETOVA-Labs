import { NextRequest, NextResponse } from "next/server"
import { db } from '@/db';
import { contactSubmissions } from '@/db/schema';
import { eq, like, or } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, type, message } = body

    // Validation
    if (!name || !email || !type || !message) {
      return NextResponse.json(
        { error: "All fields are required", code: "MISSING_REQUIRED_FIELDS" },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address", code: "INVALID_EMAIL" },
        { status: 400 }
      )
    }

    // Save to database
    const newSubmission = await db.insert(contactSubmissions).values({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      type: type.trim(),
      message: message.trim(),
      status: "unread",
      createdAt: new Date().toISOString(),
    }).returning();

    return NextResponse.json(newSubmission[0], { status: 201 })
  } catch (error) {
    console.error("POST error:", error)
    return NextResponse.json(
      { error: "Internal server error: " + error },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');
    const search = searchParams.get('search');
    const status = searchParams.get('status');

    let query = db.select().from(contactSubmissions);

    // Apply filters
    if (search) {
      query = query.where(
        or(
          like(contactSubmissions.name, `%${search}%`),
          like(contactSubmissions.email, `%${search}%`),
          like(contactSubmissions.type, `%${search}%`),
          like(contactSubmissions.message, `%${search}%`)
        )
      );
    }

    if (status) {
      query = query.where(eq(contactSubmissions.status, status));
    }

    const results = await query.limit(limit).offset(offset);
    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { error: "Internal server error: " + error },
      { status: 500 }
    );
  }
}