import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - Fetch all drafts for the authenticated user
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const drafts = await prisma.post.findMany({
      where: {
        authorId: user.id,
        status: 'DRAFT'
      },
      include: {
        category: true,
        author: {
          select: {
            name: true,
            email: true,
            username: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({ drafts });
  } catch (error) {
    console.error('Error fetching drafts:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Create a new draft
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { title, content, keywords, catSlug, thumbnail, desc } = await request.json();

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') + '-' + Date.now();

    const draft = await prisma.post.create({
      data: {
        title,
        slug,
        content: content || '',
        keywords: keywords || '',
        catSlug: catSlug || null,
        thumbnail: thumbnail || null,
        desc: desc || '',
        excerpt: content ? content.substring(0, 150) + '...' : '',
        authorId: user.id,
        status: 'DRAFT'
      },
      include: {
        category: true,
        author: {
          select: {
            name: true,
            email: true,
            username: true
          }
        }
      }
    });

    return NextResponse.json({ draft }, { status: 201 });
  } catch (error) {
    console.error('Error creating draft:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
