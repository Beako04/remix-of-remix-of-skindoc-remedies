import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { skinType, concerns, lifestyle, currentProducts, goals, preferences } = data;

    // Temporarily returning mock data until Gemini API issue is resolved
    // The Gemini models are returning 404 errors for all model names tried
    
    const mockAnalysis = {
      skinScore: calculateSkinScore(concerns, lifestyle),
      scoreExplanation: getScoreExplanation(concerns, lifestyle),
      skinTypeDetailed: getSkinTypeDescription(skinType),
      primaryConcerns: concerns?.map((c: string) => formatConcern(c)) || ['General Skin Health'],
      routine: generateRoutine(skinType, concerns),
      recommendedProducts: generateProducts(skinType, concerns),
      additionalAdvice: generateAdvice(skinType, concerns, lifestyle)
    };

    return NextResponse.json({ 
      success: true, 
      analysis: mockAnalysis 
    });

    /* Original Gemini API code - commented out until API issue resolved
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    
    if (!apiKey) {
      throw new Error('Google Generative AI API key not configured');
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `...`;
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not extract JSON from AI response');
    }
    
    const analysis = JSON.parse(jsonMatch[0]);
    return NextResponse.json({ success: true, analysis });
    */

  } catch (error) {
    console.error('Error generating skin analysis:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to generate skin analysis: ' + (error as Error).message,
        details: error instanceof Error ? error.stack : String(error)
      },
      { status: 500 }
    );
  }
}

function calculateSkinScore(concerns: string[], lifestyle: any): number {
  let baseScore = 85;
  
  // Deduct points for concerns
  if (concerns?.length) {
    baseScore -= concerns.length * 3;
  }
  
  // Adjust for lifestyle
  if (lifestyle?.stressLevel === 'high' || lifestyle?.stressLevel === 'very-high') {
    baseScore -= 5;
  }
  if (lifestyle?.sleepQuality === 'less-than-5') {
    baseScore -= 5;
  }
  if (lifestyle?.dietQuality === 'poor') {
    baseScore -= 5;
  }
  
  return Math.max(50, Math.min(95, baseScore));
}

function getScoreExplanation(concerns: string[], lifestyle: any): string {
  const score = calculateSkinScore(concerns, lifestyle);
  
  if (score >= 80) return 'Excellent skin health with minor areas for improvement';
  if (score >= 70) return 'Good foundation with room for targeted treatment';
  if (score >= 60) return 'Fair condition - consistent routine will show improvement';
  return 'Needs attention - professional consultation recommended';
}

function getSkinTypeDescription(skinType: string): string {
  const descriptions: Record<string, string> = {
    'oily': 'Oily skin with enlarged pores and shine-prone areas',
    'dry': 'Dry skin requiring enhanced hydration and moisture',
    'combination': 'Combination skin with oily T-zone and dry cheeks',
    'sensitive': 'Sensitive skin prone to irritation and redness',
    'normal': 'Normal, well-balanced skin type'
  };
  return descriptions[skinType] || 'Mixed skin characteristics';
}

function formatConcern(concern: string): string {
  const formatted: Record<string, string> = {
    'acne': 'Acne & Breakouts',
    'aging': 'Anti-Aging & Fine Lines',
    'pigmentation': 'Dark Spots & Hyperpigmentation',
    'hydration': 'Dryness & Dehydration',
    'sensitivity': 'Sensitivity & Redness',
    'texture': 'Rough Texture & Large Pores',
    'dullness': 'Dullness & Uneven Tone',
    'sun-damage': 'Sun Damage & Photo-Aging'
  };
  return formatted[concern] || concern;
}

function generateRoutine(skinType: string, concerns: string[]) {
  const hasAcne = concerns?.includes('acne');
  const hasAging = concerns?.includes('aging');
  const hasDryness = concerns?.includes('hydration') || skinType === 'dry';
  
  return {
    morning: [
      'Gentle Cleanser',
      hasAcne ? 'Salicylic Acid Toner' : 'Hydrating Toner',
      hasAging ? 'Vitamin C Serum' : 'Niacinamide Serum',
      'Lightweight Moisturizer',
      'Broad Spectrum SPF 50 Sunscreen'
    ],
    evening: [
      'Oil-Based Cleanser (if wearing makeup)',
      'Gentle Foaming Cleanser',
      hasAcne ? 'BHA Treatment' : hasAging ? 'Retinol Serum' : 'Hydrating Serum',
      hasDryness ? 'Rich Night Cream' : 'Night Moisturizer'
    ]
  };
}

function generateProducts(skinType: string, concerns: string[]) {
  const hasAcne = concerns?.includes('acne');
  const hasAging = concerns?.includes('aging');
  
  const products = [
    {
      name: hasAcne ? 'Acne Treatment Serum with Salicylic Acid' : 'Anti-Aging Retinol Serum',
      type: 'Treatment',
      reason: hasAcne ? 'Targets breakouts and prevents new blemishes' : 'Reduces fine lines and improves skin texture',
      rating: 4.7,
      price: '$48',
      match: '94%'
    },
    {
      name: 'Gentle Foaming Cleanser',
      type: 'Cleanser',
      reason: 'Effectively cleanses without stripping natural oils',
      rating: 4.6,
      price: '$28',
      match: '92%'
    },
    {
      name: skinType === 'oily' ? 'Oil-Free Moisturizer SPF 30' : 'Hydrating Day Cream SPF 30',
      type: 'Moisturizer + Sunscreen',
      reason: 'Provides hydration and essential sun protection',
      rating: 4.8,
      price: '$42',
      match: '90%'
    }
  ];
  
  return products;
}

function generateAdvice(skinType: string, concerns: string[], lifestyle: any): string {
  const tips = [];
  
  if (lifestyle?.sleepQuality === 'less-than-5' || lifestyle?.sleepQuality === '5-6') {
    tips.push('Prioritize 7-8 hours of sleep for skin regeneration');
  }
  
  if (lifestyle?.sunExposure === 'high' || lifestyle?.sunExposure === 'extreme') {
    tips.push('Reapply sunscreen every 2 hours when outdoors');
  }
  
  if (concerns?.includes('acne')) {
    tips.push('Avoid touching your face and change pillowcases regularly');
  }
  
  if (lifestyle?.stressLevel === 'high' || lifestyle?.stressLevel === 'very-high') {
    tips.push('Manage stress through meditation or exercise for clearer skin');
  }
  
  return tips.join('. ') + '.' || 'Maintain consistency with your skincare routine for best results.';
}