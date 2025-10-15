import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { db } from '@/db';
import { skinAnalysis } from '@/db/schema';
import { eq, desc, asc, and } from 'drizzle-orm';
import { auth } from '@/lib/auth';

const VALID_SKIN_TYPES = ['oily', 'dry', 'combination', 'sensitive', 'normal'];
const VALID_ANALYSIS_METHODS = ['questionnaire', 'photo', 'professional'];

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    const user = session?.user;

    if (!user) {
      return NextResponse.json({ error: 'Authentication required', code: 'UNAUTHORIZED' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Single record by ID
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json({ error: 'Valid ID is required', code: 'INVALID_ID' }, { status: 400 });
      }

      const record = await db.select()
        .from(skinAnalysis)
        .where(and(eq(skinAnalysis.id, parseInt(id)), eq(skinAnalysis.userId, user.id)))
        .limit(1);

      if (record.length === 0) {
        return NextResponse.json({ error: 'Skin analysis not found', code: 'NOT_FOUND' }, { status: 404 });
      }

      return NextResponse.json(record[0], { status: 200 });
    }

    // List with pagination and sorting
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');
    const sortField = searchParams.get('sort') || 'createdAt';
    const order = searchParams.get('order') || 'desc';

    let query = db.select()
      .from(skinAnalysis)
      .where(eq(skinAnalysis.userId, user.id))
      .limit(limit)
      .offset(offset);

    if (sortField === 'createdAt') {
      query = order === 'asc' 
        ? query.orderBy(asc(skinAnalysis.createdAt))
        : query.orderBy(desc(skinAnalysis.createdAt));
    } else if (sortField === 'updatedAt') {
      query = order === 'asc'
        ? query.orderBy(asc(skinAnalysis.updatedAt))
        : query.orderBy(desc(skinAnalysis.updatedAt));
    } else if (sortField === 'skinScore') {
      query = order === 'asc'
        ? query.orderBy(asc(skinAnalysis.skinScore))
        : query.orderBy(desc(skinAnalysis.skinScore));
    }

    const results = await query;

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: 'Internal server error: ' + error }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    const user = session?.user;

    if (!user) {
      return NextResponse.json({ error: 'Authentication required', code: 'UNAUTHORIZED' }, { status: 401 });
    }

    const requestBody = await request.json();

    // Security check: reject if userId provided in body
    if ('userId' in requestBody || 'user_id' in requestBody) {
      return NextResponse.json({ 
        error: "User ID cannot be provided in request body",
        code: "USER_ID_NOT_ALLOWED" 
      }, { status: 400 });
    }

    const {
      skinType,
      concerns,
      lifestyleSunExposure,
      lifestyleStressLevel,
      lifestyleDietQuality,
      lifestyleSleepQuality,
      lifestyleExerciseFrequency,
      currentProducts,
      goals,
      preferencesBudget,
      preferencesProductTypes,
      preferencesSensitivity,
      analysisMethod,
      skinScore,
      analysisResults
    } = requestBody;

    // Validate skinType if provided
    if (skinType && !VALID_SKIN_TYPES.includes(skinType)) {
      return NextResponse.json({ 
        error: `Invalid skin type. Must be one of: ${VALID_SKIN_TYPES.join(', ')}`,
        code: 'INVALID_SKIN_TYPE' 
      }, { status: 400 });
    }

    // Validate analysisMethod if provided
    if (analysisMethod && !VALID_ANALYSIS_METHODS.includes(analysisMethod)) {
      return NextResponse.json({ 
        error: `Invalid analysis method. Must be one of: ${VALID_ANALYSIS_METHODS.join(', ')}`,
        code: 'INVALID_ANALYSIS_METHOD' 
      }, { status: 400 });
    }

    // Validate concerns is array if provided
    if (concerns !== undefined && concerns !== null && !Array.isArray(concerns)) {
      return NextResponse.json({ 
        error: 'Concerns must be an array',
        code: 'INVALID_CONCERNS_FORMAT' 
      }, { status: 400 });
    }

    // Validate goals is array if provided
    if (goals !== undefined && goals !== null && !Array.isArray(goals)) {
      return NextResponse.json({ 
        error: 'Goals must be an array',
        code: 'INVALID_GOALS_FORMAT' 
      }, { status: 400 });
    }

    // Validate preferencesProductTypes is array if provided
    if (preferencesProductTypes !== undefined && preferencesProductTypes !== null && !Array.isArray(preferencesProductTypes)) {
      return NextResponse.json({ 
        error: 'Preferences product types must be an array',
        code: 'INVALID_PRODUCT_TYPES_FORMAT' 
      }, { status: 400 });
    }

    // Validate skinScore is integer if provided
    if (skinScore !== undefined && skinScore !== null && !Number.isInteger(skinScore)) {
      return NextResponse.json({ 
        error: 'Skin score must be an integer',
        code: 'INVALID_SKIN_SCORE' 
      }, { status: 400 });
    }

    const now = new Date().toISOString();

    const newAnalysis = await db.insert(skinAnalysis)
      .values({
        userId: user.id,
        skinType: skinType || null,
        concerns: concerns || null,
        lifestyleSunExposure: lifestyleSunExposure || null,
        lifestyleStressLevel: lifestyleStressLevel || null,
        lifestyleDietQuality: lifestyleDietQuality || null,
        lifestyleSleepQuality: lifestyleSleepQuality || null,
        lifestyleExerciseFrequency: lifestyleExerciseFrequency || null,
        currentProducts: currentProducts || null,
        goals: goals || null,
        preferencesBudget: preferencesBudget || null,
        preferencesProductTypes: preferencesProductTypes || null,
        preferencesSensitivity: preferencesSensitivity || null,
        analysisMethod: analysisMethod || null,
        skinScore: skinScore || null,
        analysisResults: analysisResults || null,
        createdAt: now,
        updatedAt: now
      })
      .returning();

    return NextResponse.json(newAnalysis[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ error: 'Internal server error: ' + error }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    const user = session?.user;

    if (!user) {
      return NextResponse.json({ error: 'Authentication required', code: 'UNAUTHORIZED' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ error: 'Valid ID is required', code: 'INVALID_ID' }, { status: 400 });
    }

    const requestBody = await request.json();

    // Security check: reject if userId provided in body
    if ('userId' in requestBody || 'user_id' in requestBody) {
      return NextResponse.json({ 
        error: "User ID cannot be modified",
        code: "USER_ID_NOT_ALLOWED" 
      }, { status: 400 });
    }

    // Check if record exists and belongs to user
    const existingRecord = await db.select()
      .from(skinAnalysis)
      .where(and(eq(skinAnalysis.id, parseInt(id)), eq(skinAnalysis.userId, user.id)))
      .limit(1);

    if (existingRecord.length === 0) {
      return NextResponse.json({ error: 'Skin analysis not found', code: 'NOT_FOUND' }, { status: 404 });
    }

    const {
      skinType,
      concerns,
      lifestyleSunExposure,
      lifestyleStressLevel,
      lifestyleDietQuality,
      lifestyleSleepQuality,
      lifestyleExerciseFrequency,
      currentProducts,
      goals,
      preferencesBudget,
      preferencesProductTypes,
      preferencesSensitivity,
      analysisMethod,
      skinScore,
      analysisResults
    } = requestBody;

    // Validate skinType if provided
    if (skinType !== undefined && skinType !== null && !VALID_SKIN_TYPES.includes(skinType)) {
      return NextResponse.json({ 
        error: `Invalid skin type. Must be one of: ${VALID_SKIN_TYPES.join(', ')}`,
        code: 'INVALID_SKIN_TYPE' 
      }, { status: 400 });
    }

    // Validate analysisMethod if provided
    if (analysisMethod !== undefined && analysisMethod !== null && !VALID_ANALYSIS_METHODS.includes(analysisMethod)) {
      return NextResponse.json({ 
        error: `Invalid analysis method. Must be one of: ${VALID_ANALYSIS_METHODS.join(', ')}`,
        code: 'INVALID_ANALYSIS_METHOD' 
      }, { status: 400 });
    }

    // Validate concerns is array if provided
    if (concerns !== undefined && concerns !== null && !Array.isArray(concerns)) {
      return NextResponse.json({ 
        error: 'Concerns must be an array',
        code: 'INVALID_CONCERNS_FORMAT' 
      }, { status: 400 });
    }

    // Validate goals is array if provided
    if (goals !== undefined && goals !== null && !Array.isArray(goals)) {
      return NextResponse.json({ 
        error: 'Goals must be an array',
        code: 'INVALID_GOALS_FORMAT' 
      }, { status: 400 });
    }

    // Validate preferencesProductTypes is array if provided
    if (preferencesProductTypes !== undefined && preferencesProductTypes !== null && !Array.isArray(preferencesProductTypes)) {
      return NextResponse.json({ 
        error: 'Preferences product types must be an array',
        code: 'INVALID_PRODUCT_TYPES_FORMAT' 
      }, { status: 400 });
    }

    // Validate skinScore is integer if provided
    if (skinScore !== undefined && skinScore !== null && !Number.isInteger(skinScore)) {
      return NextResponse.json({ 
        error: 'Skin score must be an integer',
        code: 'INVALID_SKIN_SCORE' 
      }, { status: 400 });
    }

    const updates: any = {
      updatedAt: new Date().toISOString()
    };

    if (skinType !== undefined) updates.skinType = skinType;
    if (concerns !== undefined) updates.concerns = concerns;
    if (lifestyleSunExposure !== undefined) updates.lifestyleSunExposure = lifestyleSunExposure;
    if (lifestyleStressLevel !== undefined) updates.lifestyleStressLevel = lifestyleStressLevel;
    if (lifestyleDietQuality !== undefined) updates.lifestyleDietQuality = lifestyleDietQuality;
    if (lifestyleSleepQuality !== undefined) updates.lifestyleSleepQuality = lifestyleSleepQuality;
    if (lifestyleExerciseFrequency !== undefined) updates.lifestyleExerciseFrequency = lifestyleExerciseFrequency;
    if (currentProducts !== undefined) updates.currentProducts = currentProducts;
    if (goals !== undefined) updates.goals = goals;
    if (preferencesBudget !== undefined) updates.preferencesBudget = preferencesBudget;
    if (preferencesProductTypes !== undefined) updates.preferencesProductTypes = preferencesProductTypes;
    if (preferencesSensitivity !== undefined) updates.preferencesSensitivity = preferencesSensitivity;
    if (analysisMethod !== undefined) updates.analysisMethod = analysisMethod;
    if (skinScore !== undefined) updates.skinScore = skinScore;
    if (analysisResults !== undefined) updates.analysisResults = analysisResults;

    const updated = await db.update(skinAnalysis)
      .set(updates)
      .where(and(eq(skinAnalysis.id, parseInt(id)), eq(skinAnalysis.userId, user.id)))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json({ error: 'Skin analysis not found', code: 'NOT_FOUND' }, { status: 404 });
    }

    return NextResponse.json(updated[0], { status: 200 });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ error: 'Internal server error: ' + error }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    const user = session?.user;

    if (!user) {
      return NextResponse.json({ error: 'Authentication required', code: 'UNAUTHORIZED' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ error: 'Valid ID is required', code: 'INVALID_ID' }, { status: 400 });
    }

    // Check if record exists and belongs to user
    const existingRecord = await db.select()
      .from(skinAnalysis)
      .where(and(eq(skinAnalysis.id, parseInt(id)), eq(skinAnalysis.userId, user.id)))
      .limit(1);

    if (existingRecord.length === 0) {
      return NextResponse.json({ error: 'Skin analysis not found', code: 'NOT_FOUND' }, { status: 404 });
    }

    const deleted = await db.delete(skinAnalysis)
      .where(and(eq(skinAnalysis.id, parseInt(id)), eq(skinAnalysis.userId, user.id)))
      .returning();

    if (deleted.length === 0) {
      return NextResponse.json({ error: 'Skin analysis not found', code: 'NOT_FOUND' }, { status: 404 });
    }

    return NextResponse.json({ 
      message: 'Skin analysis deleted successfully',
      deletedRecord: deleted[0]
    }, { status: 200 });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ error: 'Internal server error: ' + error }, { status: 500 });
  }
}