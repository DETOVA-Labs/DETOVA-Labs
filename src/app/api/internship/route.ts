import { NextRequest, NextResponse } from "next/server"
import { db } from '@/db';
import { internshipApplications } from '@/db/schema';
import { eq, like, or } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, location, skills, portfolio, why, availability } = body

    // Validation
    if (!name || !email || !portfolio || !why) {
      return NextResponse.json(
        { error: "Required fields: name, email, portfolio, why", code: "MISSING_REQUIRED_FIELDS" },
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

    // URL validation for portfolio
    try {
      new URL(portfolio)
    } catch {
      return NextResponse.json(
        { error: "Invalid portfolio URL", code: "INVALID_URL" },
        { status: 400 }
      )
    }

    // Save to database
    const newApplication = await db.insert(internshipApplications).values({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      location: location?.trim() || null,
      skills: skills?.trim() || null,
      portfolio: portfolio.trim(),
      why: why.trim(),
      availability: availability?.trim() || null,
      status: "pending",
      createdAt: new Date().toISOString(),
    }).returning();

    return NextResponse.json(newApplication[0], { status: 201 })
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

    let query = db.select().from(internshipApplications);

    // Apply filters
    if (search) {
      query = query.where(
        or(
          like(internshipApplications.name, `%${search}%`),
          like(internshipApplications.email, `%${search}%`),
          like(internshipApplications.skills, `%${search}%`)
        )
      );
    }

    if (status) {
      query = query.where(eq(internshipApplications.status, status));
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