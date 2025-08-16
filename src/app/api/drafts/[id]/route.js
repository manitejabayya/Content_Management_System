import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - Fetch a specific draft by ID
export async function GET(request, { params }) {
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

    const draft = await prisma.post.findFirst({
      where: {
        id: params.id,
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

    if (!draft) {
      return NextResponse.json({ error: 'Draft not found' }, { status: 404 });
    }

    return NextResponse.json({ draft });
  } catch (error) {
    console.error('Error fetching draft:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT - Update a specific draft
export async function PUT(request, { params }) {
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

    const { title, content, keywords, catSlug, thumbnail, desc, status } = await request.json();

    // Check if draft exists and belongs to user
    const existingDraft = await prisma.post.findFirst({
      where: {
        id: params.id,
        authorId: user.id,
        status: 'DRAFT'
      }
    });

    if (!existingDraft) {
      return NextResponse.json({ error: 'Draft not found' }, { status: 404 });
    }

    // Update data object
    const updateData = {};
    if (title !== undefined) {
      updateData.title = title;
      // Update slug if title changes
      if (title !== existingDraft.title) {
        updateData.slug = title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '') + '-' + Date.now();
      }
    }
    if (content !== undefined) {
      updateData.content = content;
      updateData.excerpt = content ? content.substring(0, 150) + '...' : '';
    }
    if (keywords !== undefined) updateData.keywords = keywords;
    if (catSlug !== undefined) updateData.catSlug = catSlug;
    if (thumbnail !== undefined) updateData.thumbnail = thumbnail;
    if (desc !== undefined) updateData.desc = desc;
    if (status !== undefined) updateData.status = status;

    const updatedDraft = await prisma.post.update({
      where: { id: params.id },
      data: updateData,
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

    return NextResponse.json({ draft: updatedDraft });
  } catch (error) {
    console.error('Error updating draft:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Delete a specific draft
export async function DELETE(request, { params }) {
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

    // Check if draft exists and belongs to user
    const existingDraft = await prisma.post.findFirst({
      where: {
        id: params.id,
        authorId: user.id,
        status: 'DRAFT'
      }
    });

    if (!existingDraft) {
      return NextResponse.json({ error: 'Draft not found' }, { status: 404 });
    }

    await prisma.post.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ message: 'Draft deleted successfully' });
  } catch (error) {
    console.error('Error deleting draft:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
