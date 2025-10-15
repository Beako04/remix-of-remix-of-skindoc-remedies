import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { db } from '@/db';
import { skinAnalysis } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { auth } from '@/lib/auth';

const VALID_SKIN_TYPES = ['oily', 'dry', 'combination', 'sensitive', 'normal'];
const VALID_ANALYSIS_METHODS = ['questionnaire', 'photo', 'professional'];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    const id = params.id;
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const analysis = await db
      .select()
      .from(skinAnalysis)
      .where(
        and(
          eq(skinAnalysis.id, parseInt(id)),
          eq(skinAnalysis.userId, session.user.id)
        )
      )
      .limit(1);

    if (analysis.length === 0) {
      return NextResponse.json(
        { error: 'Analysis not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    return NextResponse.json(analysis[0], { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    const id = params.id;
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const body = await request.json();

    if ('userId' in body || 'user_id' in body) {
      return NextResponse.json(
        {
          error: 'User ID cannot be provided in request body',
          code: 'USER_ID_NOT_ALLOWED'
        },
        { status: 400 }
      );
    }

    const existingAnalysis = await db
      .select()
      .from(skinAnalysis)
      .where(eq(skinAnalysis.id, parseInt(id)))
      .limit(1);

    if (existingAnalysis.length === 0) {
      return NextResponse.json(
        { error: 'Analysis not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    if (existingAnalysis[0].userId !== session.user.id) {
      return NextResponse.json(
        {
          error: 'You do not have permission to modify this analysis',
          code: 'FORBIDDEN'
        },
        { status: 403 }
      );
    }

    if (body.skinType && !VALID_SKIN_TYPES.includes(body.skinType)) {
      return NextResponse.json(
        {
          error: `Invalid skin type. Must be one of: ${VALID_SKIN_TYPES.join(', ')}`,
          code: 'INVALID_SKIN_TYPE'
        },
        { status: 400 }
      );
    }

    if (body.analysisMethod && !VALID_ANALYSIS_METHODS.includes(body.analysisMethod)) {
      return NextResponse.json(
        {
          error: `Invalid analysis method. Must be one of: ${VALID_ANALYSIS_METHODS.join(', ')}`,
          code: 'INVALID_ANALYSIS_METHOD'
        },
        { status: 400 }
      );
    }

    if (body.concerns && (!Array.isArray(body.concerns))) {
      return NextResponse.json(
        { error: 'Concerns must be an array', code: 'INVALID_CONCERNS' },
        { status: 400 }
      );
    }

    if (body.goals && (!Array.isArray(body.goals))) {
      return NextResponse.json(
        { error: 'Goals must be an array', code: 'INVALID_GOALS' },
        { status: 400 }
      );
    }

    if (body.preferencesProductTypes && (!Array.isArray(body.preferencesProductTypes))) {
      return NextResponse.json(
        {
          error: 'Preferences product types must be an array',
          code: 'INVALID_PREFERENCES_PRODUCT_TYPES'
        },
        { status: 400 }
      );
    }

    const updateData: any = {
      ...body,
      updatedAt: new Date().toISOString()
    };

    delete updateData.id;
    delete updateData.userId;
    delete updateData.user_id;
    delete updateData.createdAt;

    const updated = await db
      .update(skinAnalysis)
      .set(updateData)
      .where(
        and(
          eq(skinAnalysis.id, parseInt(id)),
          eq(skinAnalysis.userId, session.user.id)
        )
      )
      .returning();

    if (updated.length === 0) {
      return NextResponse.json(
        { error: 'Failed to update analysis', code: 'UPDATE_FAILED' },
        { status: 500 }
      );
    }

    return NextResponse.json(updated[0], { status: 200 });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    const id = params.id;
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const existingAnalysis = await db
      .select()
      .from(skinAnalysis)
      .where(eq(skinAnalysis.id, parseInt(id)))
      .limit(1);

    if (existingAnalysis.length === 0) {
      return NextResponse.json(
        { error: 'Analysis not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    if (existingAnalysis[0].userId !== session.user.id) {
      return NextResponse.json(
        {
          error: 'You do not have permission to delete this analysis',
          code: 'FORBIDDEN'
        },
        { status: 403 }
      );
    }

    await db
      .delete(skinAnalysis)
      .where(
        and(
          eq(skinAnalysis.id, parseInt(id)),
          eq(skinAnalysis.userId, session.user.id)
        )
      );

    return NextResponse.json(
      {
        message: 'Analysis deleted successfully',
        id: parseInt(id)
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error },
      { status: 500 }
    );
  }
}