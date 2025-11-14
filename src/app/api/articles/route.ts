import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { articles } from '@/db/schema';
import { eq, like, or, and } from 'drizzle-orm';

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const slug = searchParams.get('slug');

    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json(
          { error: 'Valid ID is required', code: 'INVALID_ID' },
          { status: 400 }
        );
      }

      const article = await db
        .select()
        .from(articles)
        .where(eq(articles.id, parseInt(id)))
        .limit(1);

      if (article.length === 0) {
        return NextResponse.json(
          { error: 'Article not found', code: 'NOT_FOUND' },
          { status: 404 }
        );
      }

      return NextResponse.json(article[0], { status: 200 });
    }

    if (slug) {
      const article = await db
        .select()
        .from(articles)
        .where(eq(articles.slug, slug))
        .limit(1);

      if (article.length === 0) {
        return NextResponse.json(
          { error: 'Article not found', code: 'NOT_FOUND' },
          { status: 404 }
        );
      }

      return NextResponse.json(article[0], { status: 200 });
    }

    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const search = searchParams.get('search');
    const status = searchParams.get('status');

    let query = db.select().from(articles);

    const conditions = [];

    if (search) {
      conditions.push(
        or(
          like(articles.title, `%${search}%`),
          like(articles.summary, `%${search}%`),
          like(articles.author, `%${search}%`)
        )
      );
    }

    if (status) {
      conditions.push(eq(articles.status, status));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const results = await query.limit(limit).offset(offset);

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
    const { title, slug: providedSlug, summary, content, author, status } = body;

    if (!title || !summary || !content || !author) {
      return NextResponse.json(
        {
          error: 'Missing required fields: title, summary, content, and author are required',
          code: 'MISSING_REQUIRED_FIELDS',
        },
        { status: 400 }
      );
    }

    const sanitizedTitle = title.trim();
    const sanitizedSummary = summary.trim();
    const sanitizedContent = content.trim();
    const sanitizedAuthor = author.trim();
    const sanitizedStatus = status ? status.trim() : 'draft';

    if (!sanitizedTitle || !sanitizedSummary || !sanitizedContent || !sanitizedAuthor) {
      return NextResponse.json(
        {
          error: 'Fields cannot be empty after trimming',
          code: 'EMPTY_FIELDS',
        },
        { status: 400 }
      );
    }

    const slug = providedSlug ? providedSlug.trim() : generateSlug(sanitizedTitle);

    const existingArticle = await db
      .select()
      .from(articles)
      .where(eq(articles.slug, slug))
      .limit(1);

    if (existingArticle.length > 0) {
      return NextResponse.json(
        {
          error: 'An article with this slug already exists',
          code: 'DUPLICATE_SLUG',
        },
        { status: 409 }
      );
    }

    const newArticle = await db
      .insert(articles)
      .values({
        title: sanitizedTitle,
        slug: slug,
        summary: sanitizedSummary,
        content: sanitizedContent,
        author: sanitizedAuthor,
        status: sanitizedStatus,
        createdAt: new Date().toISOString(),
      })
      .returning();

    return NextResponse.json(newArticle[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}