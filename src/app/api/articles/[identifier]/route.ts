import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { articles } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { identifier: string } }
) {
  try {
    const { identifier } = params;

    if (!identifier) {
      return NextResponse.json(
        { error: 'Identifier is required', code: 'MISSING_IDENTIFIER' },
        { status: 400 }
      );
    }

    // Try parsing as integer ID first
    const parsedId = parseInt(identifier);
    const isNumeric = !isNaN(parsedId);

    let article;

    if (isNumeric) {
      // Query by ID
      const result = await db
        .select()
        .from(articles)
        .where(eq(articles.id, parsedId))
        .limit(1);
      article = result[0];
    } else {
      // Query by slug
      const result = await db
        .select()
        .from(articles)
        .where(eq(articles.slug, identifier))
        .limit(1);
      article = result[0];
    }

    if (!article) {
      return NextResponse.json(
        { error: 'Article not found', code: 'ARTICLE_NOT_FOUND' },
        { status: 404 }
      );
    }

    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { identifier: string } }
) {
  try {
    const { identifier } = params;

    if (!identifier) {
      return NextResponse.json(
        { error: 'ID is required', code: 'MISSING_ID' },
        { status: 400 }
      );
    }

    // Validate ID is a valid integer
    const id = parseInt(identifier);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    // Check if record exists
    const existingArticle = await db
      .select()
      .from(articles)
      .where(eq(articles.id, id))
      .limit(1);

    if (existingArticle.length === 0) {
      return NextResponse.json(
        { error: 'Article not found', code: 'ARTICLE_NOT_FOUND' },
        { status: 404 }
      );
    }

    const body = await request.json();

    // If slug is being updated, validate uniqueness
    if (body.slug && body.slug !== existingArticle[0].slug) {
      const slugCheck = await db
        .select()
        .from(articles)
        .where(eq(articles.slug, body.slug))
        .limit(1);

      if (slugCheck.length > 0) {
        return NextResponse.json(
          { error: 'Slug already exists', code: 'SLUG_EXISTS' },
          { status: 409 }
        );
      }
    }

    // Prepare update data
    const updateData: Record<string, any> = {};

    if (body.title !== undefined) updateData.title = body.title.trim();
    if (body.slug !== undefined) updateData.slug = body.slug.trim();
    if (body.summary !== undefined) updateData.summary = body.summary.trim();
    if (body.content !== undefined) updateData.content = body.content;
    if (body.author !== undefined) updateData.author = body.author.trim();
    if (body.status !== undefined) updateData.status = body.status;

    // Update the article
    const updated = await db
      .update(articles)
      .set(updateData)
      .where(eq(articles.id, id))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json(
        { error: 'Article not found', code: 'ARTICLE_NOT_FOUND' },
        { status: 404 }
      );
    }

    return NextResponse.json(updated[0], { status: 200 });
  } catch (error) {
    console.error('PATCH error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { identifier: string } }
) {
  try {
    const { identifier } = params;

    if (!identifier) {
      return NextResponse.json(
        { error: 'ID is required', code: 'MISSING_ID' },
        { status: 400 }
      );
    }

    // Validate ID is a valid integer
    const id = parseInt(identifier);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    // Check if record exists before deleting
    const existingArticle = await db
      .select()
      .from(articles)
      .where(eq(articles.id, id))
      .limit(1);

    if (existingArticle.length === 0) {
      return NextResponse.json(
        { error: 'Article not found', code: 'ARTICLE_NOT_FOUND' },
        { status: 404 }
      );
    }

    // Delete the article
    await db.delete(articles).where(eq(articles.id, id));

    return NextResponse.json(
      { success: true, message: 'Article deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}