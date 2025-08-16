import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// POST - Publish a draft (change status from DRAFT to PUBLISHED)
export async function POST(request, { params }) {
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

    // Validate required fields for publishing
    if (!existingDraft.title || !existingDraft.content) {
      return NextResponse.json({ 
        error: 'Title and content are required to publish a post' 
      }, { status: 400 });
    }

    const publishedPost = await prisma.post.update({
      where: { id: params.id },
      data: { 
        status: 'PUBLISHED'
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

    return NextResponse.json({ 
      message: 'Draft published successfully',
      post: publishedPost 
    });
  } catch (error) {
    console.error('Error publishing draft:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
