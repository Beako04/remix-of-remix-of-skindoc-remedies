"use client";

import { useState, useCallback, useEffect } from 'react';
import { Camera, Upload, Calendar, CheckCircle, ArrowRight, Star, Sparkles, Brain, Shield, Target, Play, ChevronRight, AlertCircle, Clock, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { FloatingNavbar } from '@/components/navbars/floating-navbar';
import { useSession } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface AssessmentData {
  skinType: string;
  concerns: string[];
  lifestyle: {
    sunExposure: string;
    stressLevel: string;
    dietQuality: string;
    sleepQuality: string;
    exerciseFrequency: string;
  };
  currentProducts: string;
  goals: string[];
  preferences: {
    budget: string;
    productTypes: string[];
    sensitivity: string;
  };
}

const skinTypes = [
  { value: 'oily', label: 'Oily', description: 'Shiny, enlarged pores, prone to breakouts' },
  { value: 'dry', label: 'Dry', description: 'Tight, flaky, rough texture' },
  { value: 'combination', label: 'Combination', description: 'Oily T-zone, dry cheeks' },
  { value: 'sensitive', label: 'Sensitive', description: 'Reactive, easily irritated, redness-prone' },
  { value: 'normal', label: 'Normal', description: 'Balanced, healthy-looking, minimal issues' }
];

const skinConcerns = [
  { value: 'acne', label: 'Acne & Breakouts', icon: '🔴' },
  { value: 'aging', label: 'Anti-Aging & Wrinkles', icon: '⏰' },
  { value: 'pigmentation', label: 'Dark Spots & Pigmentation', icon: '🌫️' },
  { value: 'hydration', label: 'Dryness & Dehydration', icon: '💧' },
  { value: 'sensitivity', label: 'Sensitivity & Redness', icon: '🔥' },
  { value: 'texture', label: 'Rough Texture & Pores', icon: '🪨' },
  { value: 'dullness', label: 'Dullness & Uneven Tone', icon: '✨' },
  { value: 'sun-damage', label: 'Sun Damage', icon: '☀️' }
];

const skinGoals = [
  { value: 'clear-skin', label: 'Clear, Blemish-Free Skin' },
  { value: 'anti-aging', label: 'Youthful, Firm Appearance' },
  { value: 'even-tone', label: 'Even Skin Tone' },
  { value: 'hydration', label: 'Deep Hydration' },
  { value: 'glow', label: 'Natural, Healthy Glow' },
  { value: 'prevention', label: 'Prevent Future Damage' }
];

const mockResults = {
  skinScore: 73,
  skinType: 'Combination with Oily T-zone',
  primaryConcerns: ['Acne & Breakouts', 'Enlarged Pores'],
  recommendedProducts: [
    {
      id: 1,
      name: 'Advanced Acne Treatment Serum',
      type: 'Treatment',
      rating: 4.8,
      price: '$45',
      match: '95%'
    },
    {
      id: 2,
      name: 'Gentle Foaming Cleanser',
      type: 'Cleanser',
      rating: 4.6,
      price: '$28',
      match: '92%'
    },
    {
      id: 3,
      name: 'Oil-Free Moisturizer SPF 30',
      type: 'Moisturizer',
      rating: 4.7,
      price: '$35',
      match: '88%'
    }
  ],
  routine: {
    morning: [
      'Gentle Foaming Cleanser',
      'Vitamin C Brightening Serum',
      'Oil-Free Moisturizer SPF 30'
    ],
    evening: [
      'Gentle Foaming Cleanser',
      'Advanced Acne Treatment Serum',
      'Lightweight Night Moisturizer'
    ]
  }
};

// All available products from all categories
const allProducts = [
  // Face Care
  { id: 101, name: "Gentle Cleansing Foam", link: "https://amzn.to/4hbiGJb", description: "Gentle yet effective foam cleanser that removes impurities without stripping natural oils", price: 42, rating: 4.7, image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-a-lu-3102b027-20251014202207.jpg", category: "Cleanser", tags: ["gentle", "sensitive", "normal", "dry"] },
  { id: 102, name: "Vitamin C Brightening Serum", link: "https://amzn.to/479xHqy", description: "Potent vitamin C formula that brightens and evens skin tone", price: 89, rating: 4.8, image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-vita-a9828060-20251014202215.jpg", category: "Serum", tags: ["pigmentation", "dullness", "even-tone", "glow", "aging"] },
  { id: 103, name: "Hyaluronic Acid Moisturizer", link: "https://amzn.to/476IjGr", description: "Deep hydration with hyaluronic acid for plump, dewy skin", price: 67, rating: 4.6, image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-hyal-646afdeb-20251014202222.jpg", category: "Moisturizer", tags: ["hydration", "dry", "normal", "glow"] },
  { id: 104, name: "Night Repair Cream", link: "https://amzn.to/3J8VKOd", description: "Rich night cream that repairs and regenerates skin while you sleep", price: 95, rating: 4.9, image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-nigh-954b6513-20251014202229.jpg", category: "Night Cream", tags: ["aging", "dry", "prevention"] },
  { id: 105, name: "Exfoliating Toner", link: "https://amzn.to/4ojtIhW", description: "Gentle exfoliating toner that refines pores and smooths texture", price: 38, rating: 4.5, image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-exfo-b5716daa-20251014202236.jpg", category: "Toner", tags: ["texture", "oily", "combination", "acne"] },
  { id: 106, name: "Eye Contour Cream", link: "https://amzn.to/48psOvL", description: "Targeted eye cream that reduces dark circles and fine lines", price: 78, rating: 4.7, image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-eye--adc0b4f3-20251014202243.jpg", category: "Eye Care", tags: ["aging", "pigmentation"] },
  { id: 107, name: "Nourishing Facial Oil", link: "https://amzn.to/46TJGcQ", description: "Luxurious facial oil blend that nourishes and restores radiance", price: 85, rating: 4.8, image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-nour-94cc48e1-20251014202250.jpg", category: "Oil", tags: ["dry", "glow", "aging"] },
  { id: 108, name: "Hydrating Sheet Mask Pack", link: "https://amzn.to/3KNKOGo", description: "Intensive hydrating sheet masks for instant glow and moisture", price: 32, rating: 4.6, image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-hydr-3894cada-20251014202258.jpg", category: "Mask", tags: ["hydration", "glow", "dry"] },
  { id: 109, name: "Makeup Remover", link: "https://amzn.to/4qauuj9", description: "Gentle yet effective makeup remover for all skin types", price: 29, rating: 4.5, image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-make-3c5874e7-20251014202305.jpg", category: "Cleanser", tags: ["gentle", "sensitive", "normal"] },
  
  // Body Care
  { id: 201, name: "Nourishing Body Lotion", link: "https://amzn.to/4n0F9tT", description: "Rich, fast-absorbing body lotion that deeply hydrates and softens skin", price: 48, rating: 4.7, image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-nour-28e8b4e4-20251014202312.jpg", category: "Lotion", tags: ["hydration", "dry"] },
  { id: 205, name: "Luxury Body Oil", link: "https://amzn.to/48pcnQ6", description: "Luxurious oil blend that nourishes and leaves skin silky smooth", price: 65, rating: 4.9, image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-luxu-b309ffbe-20251014202342.jpg", category: "Body Oil", tags: ["hydration", "dry", "glow"] },
  { id: 208, name: "Sunscreen Body Lotion SPF 50", link: "https://amzn.to/4o1MUks", description: "Broad-spectrum protection with moisturizing benefits", price: 45, rating: 4.8, image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-suns-242c7c00-20251014202403.jpg", category: "Sunscreen", tags: ["sun-damage", "prevention", "oily", "combination"] },
  
  // Treatments
  { id: 302, name: "Purifying Clay Mask", link: "https://amzn.to/4hgHxf0", description: "Deep-cleansing mask that detoxifies and refines pores", price: 48, rating: 4.7, image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-puri-796367b3-20251014202424.jpg", category: "Mask", tags: ["oily", "acne", "texture", "combination"] },
  { id: 303, name: "Targeted Spot Treatment", link: "https://amzn.to/3Lapcnz", description: "Fast-acting formula that targets blemishes and breakouts", price: 32, rating: 4.6, image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-targ-3c847204-20251014202431.jpg", category: "Spot Treatment", tags: ["acne", "oily", "combination", "clear-skin"] },
  { id: 304, name: "Dark Circle Treatment", link: "https://amzn.to/4nVt6zm", description: "Intensive eye treatment that reduces dark circles and puffiness", price: 68, rating: 4.7, image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-dark-00093417-20251014202437.jpg", category: "Eye Treatment", tags: ["pigmentation", "aging"] },
  { id: 306, name: "Pigmentation Corrector", link: "https://amzn.to/4ojvWhi", description: "Targeted treatment that fades dark spots and evens skin tone", price: 95, rating: 4.8, image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-pigm-b29f9bcd-20251014202451.jpg", category: "Corrector", tags: ["pigmentation", "sun-damage", "even-tone"] },
  { id: 307, name: "Pore Minimizer Serum", link: "https://amzn.to/4nfXbbW", description: "Concentrated serum that visibly reduces pore size", price: 72, rating: 4.6, image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-pore-66a5a74a-20251014202457.jpg", category: "Serum", tags: ["texture", "oily", "combination", "acne"] },
  { id: 308, name: "Redness Relief Serum", link: "https://amzn.to/42Eaf3f", description: "Soothing serum that calms irritation and reduces redness", price: 78, rating: 4.7, image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-redn-b4f6202a-20251014202504.jpg", category: "Serum", tags: ["sensitivity", "sensitive"] },
  
  // Anti-Aging
  { id: 401, name: "Retinol Night Serum", link: "https://amzn.to/3KOtAsq", description: "Powerful retinol formula that reduces wrinkles and fine lines", price: 115, rating: 4.9, image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-reti-f9ab939f-20251014202518.jpg", category: "Serum", tags: ["aging", "anti-aging", "prevention"] },
  { id: 402, name: "Collagen Boost Cream", link: "https://amzn.to/4h7qjjW", description: "Rich cream that boosts collagen for firmer, younger-looking skin", price: 98, rating: 4.8, image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-coll-1df27268-20251014202525.jpg", category: "Cream", tags: ["aging", "anti-aging", "dry"] },
  { id: 403, name: "Peptide Complex Serum", link: "https://amzn.to/4q8cypi", description: "Advanced peptide serum that targets multiple signs of aging", price: 125, rating: 4.7, image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-pept-29da4e10-20251014202531.jpg", category: "Serum", tags: ["aging", "anti-aging", "prevention"] },
  { id: 404, name: "Anti-Wrinkle Eye Cream", link: "https://amzn.to/4q4UQD3", description: "Intensive eye cream that smooths wrinkles and crow's feet", price: 88, rating: 4.8, image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-anti-a4a9c8a7-20251014202539.jpg", category: "Eye Cream", tags: ["aging", "anti-aging"] },
  { id: 407, name: "Antioxidant Face Oil", link: "https://amzn.to/48pehQK", description: "Luxurious oil rich in antioxidants for age-defying benefits", price: 105, rating: 4.7, image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-anti-c01ddd2b-20251014202603.jpg", category: "Oil", tags: ["aging", "prevention", "glow"] },
  
  // Acne Solutions
  { id: 501, name: "Salicylic Acid Cleanser", link: "https://amzn.to/4ofAVzv", description: "Deep-cleansing formula that unclogs pores and prevents breakouts", price: 38, rating: 4.7, image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-sali-b4b57d13-20251014202626.jpg", category: "Cleanser", tags: ["acne", "oily", "combination", "clear-skin"] },
  { id: 502, name: "Benzoyl Peroxide Spot Treatment", link: "https://amzn.to/46PpU2e", description: "Fast-acting spot treatment that targets stubborn acne", price: 28, rating: 4.6, image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-benz-7c886f45-20251014202634.jpg", category: "Spot Treatment", tags: ["acne", "oily", "clear-skin"] },
  { id: 503, name: "Oil-Free Moisturizer", link: "https://amzn.to/4ofXwMn", description: "Lightweight moisturizer that hydrates without clogging pores", price: 42, rating: 4.8, image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-oil--a691a47e-20251014202641.jpg", category: "Moisturizer", tags: ["acne", "oily", "combination", "hydration"] },
  { id: 504, name: "Acne Fighting Serum", link: "https://amzn.to/3KULd9T", description: "Powerful serum that fights acne and prevents future breakouts", price: 65, rating: 4.7, image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-acne-b1c30cc6-20251014202648.jpg", category: "Serum", tags: ["acne", "clear-skin", "prevention"] },
  { id: 508, name: "Acne Scar Fading Treatment", link: "https://amzn.to/4n0WMtL", description: "Targeted treatment that fades acne scars and dark marks", price: 55, rating: 4.8, image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-acne-7db22128-20251014202716.jpg", category: "Treatment", tags: ["acne", "pigmentation", "clear-skin"] },
  
  // Sensitive Skin
  { id: 601, name: "Gentle Micellar Water", link: "https://amzn.to/4haDctD", description: "Ultra-gentle micellar water that removes makeup without irritation", price: 32, rating: 4.8, image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-gent-bd6a2210-20251014202722.jpg", category: "Cleanser", tags: ["sensitive", "sensitivity", "gentle"] },
  { id: 602, name: "Calming Relief Cream", link: "https://amzn.to/4ha5zrP", description: "Soothing cream that calms redness and irritation instantly", price: 58, rating: 4.7, image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-calm-1fce5171-20251014202729.jpg", category: "Cream", tags: ["sensitive", "sensitivity"] },
  { id: 603, name: "Fragrance-Free Moisturizer", link: "https://amzn.to/3J6JQnZ", description: "Gentle, fragrance-free moisturizer perfect for reactive skin", price: 48, rating: 4.9, image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-frag-fddf4177-20251014202737.jpg", category: "Moisturizer", tags: ["sensitive", "sensitivity", "hydration"] },
  { id: 607, name: "Mineral Sunscreen SPF 50", link: "https://amzn.to/47cyZkE", description: "Gentle mineral sunscreen suitable for most sensitive skin", price: 42, rating: 4.8, image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-mine-879e1b09-20251014202804.jpg", category: "Sunscreen", tags: ["sensitive", "sun-damage", "prevention"] }
];

// Function to get personalized product recommendations based on analysis
const getPersonalizedRecommendations = (assessmentData: AssessmentData, resultsData: any) => {
  const { skinType, concerns, goals } = assessmentData;
  const scoredProducts = allProducts.map(product => {
    let score = 0;
    
    // Match skin type
    if (product.tags.some(tag => skinType.toLowerCase().includes(tag) || tag === skinType.toLowerCase())) {
      score += 3;
    }
    
    // Match concerns
    concerns.forEach(concern => {
      if (product.tags.includes(concern)) {
        score += 5;
      }
    });
    
    // Match goals
    goals.forEach(goal => {
      if (product.tags.includes(goal)) {
        score += 4;
      }
    });
    
    // Boost rating score
    score += product.rating;
    
    return { ...product, matchScore: score };
  });
  
  // Sort by score and return top 9 products
  return scoredProducts
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 9);
};

export default function SkinAnalysisPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [activeTab, setActiveTab] = useState('questionnaire');
  const [currentStep, setCurrentStep] = useState(1);
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    skinType: '',
    concerns: [],
    lifestyle: {
      sunExposure: '',
      stressLevel: '',
      dietQuality: '',
      sleepQuality: '',
      exerciseFrequency: ''
    },
    currentProducts: '',
    goals: [],
    preferences: {
      budget: '',
      productTypes: [],
      sensitivity: ''
    }
  });
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [savedAnalysisId, setSavedAnalysisId] = useState<number | null>(null);
  const [aiResults, setAiResults] = useState<any>(null);

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  // Check authentication
  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error('Please login to save your analysis');
    }
  }, [session, isPending]);

  // Load saved analysis from sessionStorage
  useEffect(() => {
    const viewAnalysis = sessionStorage.getItem('viewAnalysis');
    if (viewAnalysis) {
      try {
        const analysis = JSON.parse(viewAnalysis);
        
        // Populate assessment data
        setAssessmentData({
          skinType: analysis.skinType || '',
          concerns: analysis.concerns || [],
          lifestyle: {
            sunExposure: analysis.lifestyleSunExposure || '',
            stressLevel: analysis.lifestyleStressLevel || '',
            dietQuality: analysis.lifestyleDietQuality || '',
            sleepQuality: analysis.lifestyleSleepQuality || '',
            exerciseFrequency: analysis.lifestyleExerciseFrequency || ''
          },
          currentProducts: analysis.currentProducts || '',
          goals: analysis.goals || [],
          preferences: {
            budget: analysis.preferencesBudget || '',
            productTypes: analysis.preferencesProductTypes || [],
            sensitivity: analysis.preferencesSensitivity || ''
          }
        });

        // Set results data
        if (analysis.analysisResults) {
          setAiResults(analysis.analysisResults);
        } else {
          // If no analysis results stored, create basic results from data
          setAiResults({
            skinScore: analysis.skinScore || 70,
            skinType: analysis.skinType || 'Unknown',
            primaryConcerns: analysis.concerns || [],
            recommendedProducts: mockResults.recommendedProducts,
            routine: mockResults.routine
          });
        }

        setSavedAnalysisId(analysis.id);
        setShowResults(true);
        
        // Clear sessionStorage
        sessionStorage.removeItem('viewAnalysis');
        toast.success('Analysis loaded successfully');
      } catch (error) {
        console.error('Error loading saved analysis:', error);
        toast.error('Failed to load analysis');
        sessionStorage.removeItem('viewAnalysis');
      }
    }
  }, []);

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('Image size should be less than 10MB');
        return;
      }
      setUploadedImage(file);
      toast.success('Image uploaded successfully');
    }
  }, []);

  const saveAnalysisToDatabase = async (method: 'questionnaire' | 'photo' | 'professional', analysisData: any) => {
    if (!session?.user) {
      toast.error('Please login to save your analysis');
      return null;
    }

    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch('/api/skin-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          skinType: assessmentData.skinType || null,
          concerns: assessmentData.concerns.length > 0 ? assessmentData.concerns : null,
          lifestyleSunExposure: assessmentData.lifestyle.sunExposure || null,
          lifestyleStressLevel: assessmentData.lifestyle.stressLevel || null,
          lifestyleDietQuality: assessmentData.lifestyle.dietQuality || null,
          lifestyleSleepQuality: assessmentData.lifestyle.sleepQuality || null,
          lifestyleExerciseFrequency: assessmentData.lifestyle.exerciseFrequency || null,
          currentProducts: assessmentData.currentProducts || null,
          goals: assessmentData.goals.length > 0 ? assessmentData.goals : null,
          preferencesBudget: assessmentData.preferences.budget || null,
          preferencesProductTypes: assessmentData.preferences.productTypes.length > 0 ? assessmentData.preferences.productTypes : null,
          preferencesSensitivity: assessmentData.preferences.sensitivity || null,
          analysisMethod: method,
          skinScore: analysisData.skinScore,
          analysisResults: analysisData
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save analysis');
      }

      const savedAnalysis = await response.json();
      return savedAnalysis;
    } catch (error) {
      console.error('Error saving analysis:', error);
      toast.error('Failed to save analysis. Please try again.');
      return null;
    }
  };

  const generateAIAnalysis = async () => {
    try {
      const response = await fetch('/api/generate-skin-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          skinType: assessmentData.skinType,
          concerns: assessmentData.concerns,
          lifestyle: assessmentData.lifestyle,
          currentProducts: assessmentData.currentProducts,
          goals: assessmentData.goals,
          preferences: assessmentData.preferences,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate AI analysis');
      }

      const data = await response.json();
      if (data.success && data.analysis) {
        return data.analysis;
      } else {
        throw new Error('Invalid response from AI service');
      }
    } catch (error) {
      console.error('Error generating AI analysis:', error);
      toast.error('AI analysis unavailable. Using default recommendations.');
      // Return mock data as fallback
      return {
        skinScore: 73,
        scoreExplanation: 'Good foundation with room for improvement',
        skinTypeDetailed: assessmentData.skinType || 'Combination with Oily T-zone',
        primaryConcerns: assessmentData.concerns.length > 0 
          ? assessmentData.concerns.map(c => skinConcerns.find(sc => sc.value === c)?.label || c)
          : ['Acne & Breakouts', 'Enlarged Pores'],
        routine: mockResults.routine,
        recommendedProducts: mockResults.recommendedProducts.map(p => ({
          name: p.name,
          type: p.type,
          reason: 'Recommended for your skin type',
          match: p.match
        })),
        additionalAdvice: 'Continue with a consistent skincare routine for best results.'
      };
    }
  };

  const handleAnalyzeImage = useCallback(async () => {
    if (!uploadedImage) {
      toast.error('Please upload an image first');
      return;
    }
    
    if (!session?.user) {
      toast.error('Please login to save your analysis');
      router.push('/login?redirect=/analysis');
      return;
    }

    setIsAnalyzing(true);
    
    // Generate AI analysis
    const analysis = await generateAIAnalysis();
    setAiResults(analysis);
    
    // Save to database
    const saved = await saveAnalysisToDatabase('photo', analysis);
    setIsAnalyzing(false);
    
    if (saved) {
      setSavedAnalysisId(saved.id);
      setShowResults(true);
      toast.success('Analysis complete and saved!');
    }
  }, [uploadedImage, session, router, assessmentData]);

  const handleQuestionnaireSubmit = useCallback(async () => {
    if (!assessmentData.skinType || assessmentData.concerns.length === 0) {
      toast.error('Please complete all required fields');
      return;
    }

    if (!session?.user) {
      toast.error('Please login to save your analysis');
      router.push('/login?redirect=/analysis');
      return;
    }

    setIsAnalyzing(true);
    
    // Generate AI analysis
    const analysis = await generateAIAnalysis();
    setAiResults(analysis);
    
    // Save to database
    const saved = await saveAnalysisToDatabase('questionnaire', analysis);
    setIsAnalyzing(false);
    
    if (saved) {
      setSavedAnalysisId(saved.id);
      setShowResults(true);
      toast.success('Analysis complete and saved!');
    }
  }, [assessmentData, session, router]);

  const updateAssessmentData = useCallback((field: string, value: any) => {
    setAssessmentData(prev => ({ ...prev, [field]: value }));
  }, []);

  const updateNestedData = useCallback((parent: string, field: string, value: any) => {
    setAssessmentData(prev => ({
      ...prev,
      [parent]: { ...prev[parent as keyof AssessmentData], [field]: value }
    }));
  }, []);

  const nextStep = useCallback(() => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep, totalSteps]);

  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const handleBuyNow = (link: string) => {
    const isInIframe = window.self !== window.top;
    if (isInIframe) {
      window.parent.postMessage({ type: "OPEN_EXTERNAL_URL", data: { url: link } }, "*");
    } else {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  if (showResults) {
    const results = aiResults || mockResults;
    const personalizedProducts = getPersonalizedRecommendations(assessmentData, results);
    
    return (
      <div className="min-h-screen bg-background">
        <FloatingNavbar />
        {/* Results Header */}
        <div className="bg-gradient-to-r from-primary to-secondary border-b">
          <div className="container max-w-6xl mx-auto py-12">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-success mr-3" />
                <h1 className="font-display text-3xl font-bold">Analysis Complete</h1>
              </div>
              <p className="text-muted-foreground text-lg">Your personalized skin analysis and recommendations</p>
              {savedAnalysisId && (
                <p className="text-sm text-muted-foreground mt-2">
                  Saved to your account • <a href="/account" className="text-accent hover:underline">View all analyses</a>
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="container max-w-6xl mx-auto py-8 space-y-8">
          {/* Skin Score */}
          <Card className="p-8 text-center">
            <div className="mb-6">
              <h2 className="font-display text-2xl font-bold mb-2">Your Skin Health Score</h2>
              <div className="relative w-32 h-32 mx-auto mb-4">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-success p-1">
                  <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                    <span className="font-display text-3xl font-bold text-accent">{results.skinScore}</span>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground">{results.scoreExplanation || 'Good foundation with room for improvement'}</p>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Skin Analysis */}
            <Card className="p-6">
              <h3 className="font-display text-xl font-bold mb-4">Skin Analysis</h3>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Skin Type</Label>
                  <p className="text-foreground">{results.skinTypeDetailed || results.skinType}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Primary Concerns</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {results.primaryConcerns?.map((concern: string, index: number) => (
                      <Badge key={index} variant="secondary">{concern}</Badge>
                    ))}
                  </div>
                </div>
                {results.additionalAdvice && (
                  <div>
                    <Label className="text-sm font-medium">Additional Advice</Label>
                    <p className="text-sm text-muted-foreground mt-1">{results.additionalAdvice}</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Recommended Routine */}
            <Card className="p-6">
              <h3 className="font-display text-xl font-bold mb-4">Recommended Routine</h3>
              <Tabs defaultValue="morning">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="morning">Morning</TabsTrigger>
                  <TabsTrigger value="evening">Evening</TabsTrigger>
                </TabsList>
                <TabsContent value="morning" className="mt-4">
                  <div className="space-y-2">
                    {results.routine.morning.map((step: string, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </span>
                        <span className="text-sm">{step}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="evening" className="mt-4">
                  <div className="space-y-2">
                    {results.routine.evening.map((step: string, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </span>
                        <span className="text-sm">{step}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* Recommended Products */}
          <Card className="p-6">
            <h3 className="font-display text-xl font-bold mb-6">Recommended Products</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {results.recommendedProducts?.map((product: any, index: number) => (
                <Card key={index} className="p-4 border-2 hover:border-accent transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <Badge className="bg-success text-white">{product.match || '95%'} Match</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <span className="text-sm font-medium">{product.rating || '4.8'}</span>
                    </div>
                  </div>
                  <h4 className="font-semibold mb-1">{product.name}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{product.type}</p>
                  {product.reason && (
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{product.reason}</p>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-accent">{product.price || '$45'}</span>
                    <Button size="sm">Add to Cart</Button>
                  </div>
                </Card>
              ))}
            </div>
          </Card>

          {/* Expert Consultation CTA */}
          <Card className="p-8 bg-gradient-to-r from-primary to-secondary text-center">
            <h3 className="font-display text-2xl font-bold mb-4">Want Expert Guidance?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Book a consultation with one of our certified dermatologists to discuss your results and get personalized treatment recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent hover:bg-accent/90">
                <Calendar className="w-5 h-5 mr-2" />
                Book Consultation
              </Button>
              <Button variant="outline" size="lg">
                Download Report
              </Button>
            </div>
          </Card>

          {/* Personalized Products Section */}
          <div className="pt-8">
            <div className="text-center mb-8">
              <h2 className="font-display text-3xl font-bold mb-4">Products Tailored For Your Skin</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Based on your {assessmentData.skinType || 'unique'} skin type and specific concerns, we recommend these products
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {personalizedProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="aspect-square overflow-hidden bg-secondary relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-success text-white">Recommended</Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <Badge variant="secondary" className="mb-2">{product.category}</Badge>
                    <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-accent text-accent' : 'text-muted-foreground'}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">({product.rating})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-display font-semibold">${product.price}</span>
                      <Button 
                        onClick={() => handleBuyNow(product.link)}
                        className="bg-accent hover:bg-accent/90"
                      >
                        Buy Now
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button asChild variant="outline" size="lg">
                <Link href="/">
                  <Sparkles className="w-5 h-5 mr-2" />
                  View All Products
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <FloatingNavbar />
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary via-secondary to-primary/50">
        <div className="container max-w-6xl mx-auto py-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Brain className="w-12 h-12 text-accent mr-4" />
              <h1 className="font-display text-4xl md:text-5xl font-bold">AI-Powered Skin Analysis</h1>
            </div>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Get personalized skincare recommendations using advanced AI technology and dermatologist expertise. 
              Analyze your skin, understand your needs, and discover the perfect products for your unique skin journey.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Advanced AI Analysis</h3>
                <p className="text-sm text-muted-foreground">Machine learning algorithms trained on dermatological data</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Dermatologist Approved</h3>
                <p className="text-sm text-muted-foreground">Methods validated by certified skin specialists</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Personalized Results</h3>
                <p className="text-sm text-muted-foreground">Tailored recommendations for your unique skin</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Options */}
      <div className="container max-w-6xl mx-auto py-12">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold mb-4">Choose Your Analysis Method</h2>
          <p className="text-muted-foreground text-lg">Select the approach that works best for you</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto mb-8">
            <TabsTrigger value="questionnaire" className="text-sm">Quick Assessment</TabsTrigger>
            <TabsTrigger value="photo" className="text-sm">Photo Analysis</TabsTrigger>
            <TabsTrigger value="booking" className="text-sm">Professional Visit</TabsTrigger>
          </TabsList>

          <TabsContent value="questionnaire" className="space-y-8">
            {/* Progress Bar */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-xl font-bold">Skin Assessment Questionnaire</h3>
                <Badge variant="outline">Step {currentStep} of {totalSteps}</Badge>
              </div>
              <Progress value={progress} className="mb-4" />
              <p className="text-sm text-muted-foreground">Complete this comprehensive assessment to get personalized recommendations</p>
            </Card>

            {/* Questionnaire Steps */}
            {currentStep === 1 && (
              <Card className="p-8">
                <h3 className="font-display text-2xl font-bold mb-6">What's your skin type?</h3>
                <RadioGroup
                  value={assessmentData.skinType}
                  onValueChange={(value) => updateAssessmentData('skinType', value)}
                  className="space-y-4"
                >
                  {skinTypes.map(type => (
                    <div key={type.value} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value={type.value} id={type.value} />
                        <div>
                          <Label htmlFor={type.value} className="font-medium cursor-pointer">
                            {type.label}
                          </Label>
                          <p className="text-sm text-muted-foreground mt-1">{type.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </Card>
            )}

            {currentStep === 2 && (
              <Card className="p-8">
                <h3 className="font-display text-2xl font-bold mb-6">What are your main skin concerns?</h3>
                <p className="text-muted-foreground mb-6">Select all that apply</p>
                <div className="grid md:grid-cols-2 gap-4">
                  {skinConcerns.map(concern => (
                    <div key={concern.value} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id={concern.value}
                          checked={assessmentData.concerns.includes(concern.value)}
                          onCheckedChange={(checked) => {
                            const newConcerns = checked
                              ? [...assessmentData.concerns, concern.value]
                              : assessmentData.concerns.filter(c => c !== concern.value);
                            updateAssessmentData('concerns', newConcerns);
                          }}
                        />
                        <div>
                          <Label htmlFor={concern.value} className="font-medium cursor-pointer flex items-center gap-2">
                            <span>{concern.icon}</span>
                            {concern.label}
                          </Label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {currentStep === 3 && (
              <Card className="p-8">
                <h3 className="font-display text-2xl font-bold mb-6">Tell us about your lifestyle</h3>
                <div className="space-y-6">
                  <div>
                    <Label className="text-base font-medium mb-3 block">How much sun exposure do you get?</Label>
                    <Select
                      value={assessmentData.lifestyle.sunExposure}
                      onValueChange={(value) => updateNestedData('lifestyle', 'sunExposure', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select sun exposure level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="minimal">Minimal (mostly indoors)</SelectItem>
                        <SelectItem value="moderate">Moderate (some outdoor activities)</SelectItem>
                        <SelectItem value="high">High (frequently outdoors/sports)</SelectItem>
                        <SelectItem value="extreme">Extreme (work outdoors/beach lifestyle)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-base font-medium mb-3 block">What's your stress level?</Label>
                    <Select
                      value={assessmentData.lifestyle.stressLevel}
                      onValueChange={(value) => updateNestedData('lifestyle', 'stressLevel', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select stress level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="very-high">Very High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-base font-medium mb-3 block">How would you rate your diet?</Label>
                    <Select
                      value={assessmentData.lifestyle.dietQuality}
                      onValueChange={(value) => updateNestedData('lifestyle', 'dietQuality', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select diet quality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="poor">Poor (processed foods, sugar)</SelectItem>
                        <SelectItem value="fair">Fair (mixed diet)</SelectItem>
                        <SelectItem value="good">Good (balanced, some healthy foods)</SelectItem>
                        <SelectItem value="excellent">Excellent (whole foods, balanced)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-base font-medium mb-3 block">How many hours do you sleep per night?</Label>
                    <Select
                      value={assessmentData.lifestyle.sleepQuality}
                      onValueChange={(value) => updateNestedData('lifestyle', 'sleepQuality', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select sleep duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="less-than-5">Less than 5 hours</SelectItem>
                        <SelectItem value="5-6">5-6 hours</SelectItem>
                        <SelectItem value="7-8">7-8 hours</SelectItem>
                        <SelectItem value="more-than-8">More than 8 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>
            )}

            {currentStep === 4 && (
              <Card className="p-8">
                <h3 className="font-display text-2xl font-bold mb-6">Current skincare routine</h3>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="current-products" className="text-base font-medium mb-3 block">
                      What products are you currently using?
                    </Label>
                    <Textarea
                      id="current-products"
                      placeholder="List your current skincare products (cleanser, moisturizer, treatments, etc.)"
                      value={assessmentData.currentProducts}
                      onChange={(e) => updateAssessmentData('currentProducts', e.target.value)}
                      rows={4}
                    />
                  </div>
                </div>
              </Card>
            )}

            {currentStep === 5 && (
              <Card className="p-8">
                <h3 className="font-display text-2xl font-bold mb-6">Your skincare goals</h3>
                <div className="space-y-6">
                  <div>
                    <Label className="text-base font-medium mb-4 block">What do you want to achieve?</Label>
                    <div className="space-y-3">
                      {skinGoals.map(goal => (
                        <div key={goal.value} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                          <div className="flex items-center space-x-3">
                            <Checkbox
                              id={goal.value}
                              checked={assessmentData.goals.includes(goal.value)}
                              onCheckedChange={(checked) => {
                                const newGoals = checked
                                  ? [...assessmentData.goals, goal.value]
                                  : assessmentData.goals.filter(g => g !== goal.value);
                                updateAssessmentData('goals', newGoals);
                              }}
                            />
                            <Label htmlFor={goal.value} className="font-medium cursor-pointer">
                              {goal.label}
                            </Label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-medium mb-3 block">What's your budget range?</Label>
                    <Select
                      value={assessmentData.preferences.budget}
                      onValueChange={(value) => updateNestedData('preferences', 'budget', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-50">Under $50/month</SelectItem>
                        <SelectItem value="50-100">$50-100/month</SelectItem>
                        <SelectItem value="100-200">$100-200/month</SelectItem>
                        <SelectItem value="over-200">Over $200/month</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              
              {currentStep < totalSteps ? (
                <Button
                  onClick={nextStep}
                  disabled={
                    (currentStep === 1 && !assessmentData.skinType) ||
                    (currentStep === 2 && assessmentData.concerns.length === 0)
                  }
                >
                  Next Step
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleQuestionnaireSubmit}
                  disabled={isAnalyzing}
                  className="bg-accent hover:bg-accent/90"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Get My Analysis
                      <Sparkles className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </TabsContent>

          <TabsContent value="photo" className="space-y-8">
            <Card className="p-8 text-center">
              <h3 className="font-display text-2xl font-bold mb-4">AI Photo Analysis</h3>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Upload a clear, well-lit photo of your face for our AI to analyze your skin condition, 
                texture, and potential concerns.
              </p>

              {!uploadedImage ? (
                <div className="border-2 border-dashed border-border rounded-lg p-12 hover:border-accent transition-colors">
                  <div className="flex flex-col items-center">
                    <Camera className="w-16 h-16 text-muted-foreground mb-4" />
                    <h4 className="font-semibold mb-2">Upload Your Photo</h4>
                    <p className="text-sm text-muted-foreground mb-6">
                      For best results: natural lighting, clean face, front-facing view
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        onClick={() => document.getElementById('photo-upload')?.click()}
                        className="bg-accent hover:bg-accent/90"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Choose Photo
                      </Button>
                      <Button variant="outline">
                        <Camera className="w-4 h-4 mr-2" />
                        Take Photo
                      </Button>
                    </div>
                    <input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="relative inline-block">
                    <img
                      src={URL.createObjectURL(uploadedImage)}
                      alt="Uploaded photo"
                      className="max-w-md w-full h-auto rounded-lg mx-auto"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => setUploadedImage(null)}
                    >
                      Remove
                    </Button>
                  </div>
                  
                  <div className="flex justify-center">
                    <Button
                      onClick={handleAnalyzeImage}
                      disabled={isAnalyzing}
                      size="lg"
                      className="bg-accent hover:bg-accent/90"
                    >
                      {isAnalyzing ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Analyzing Your Skin...
                        </>
                      ) : (
                        <>
                          <Brain className="w-5 h-5 mr-2" />
                          Analyze My Skin
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {/* Technology Info */}
              <div className="mt-12 grid md:grid-cols-3 gap-6 text-left">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <AlertCircle className="w-8 h-8 text-accent mb-3" />
                  <h4 className="font-semibold mb-2">Privacy Protected</h4>
                  <p className="text-sm text-muted-foreground">
                    Your photos are encrypted and deleted after analysis
                  </p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <Clock className="w-8 h-8 text-accent mb-3" />
                  <h4 className="font-semibold mb-2">Instant Results</h4>
                  <p className="text-sm text-muted-foreground">
                    Get your analysis in under 30 seconds
                  </p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <Users className="w-8 h-8 text-accent mb-3" />
                  <h4 className="font-semibold mb-2">Dermatologist Trained</h4>
                  <p className="text-sm text-muted-foreground">
                    AI trained on thousands of professional assessments
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="booking" className="space-y-8">
            <Card className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-display text-2xl font-bold mb-4">Professional In-Person Analysis</h3>
                  <p className="text-muted-foreground mb-6">
                    Get the most comprehensive skin analysis with our certified dermatologists using 
                    professional equipment and expertise.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                      <div>
                        <h4 className="font-medium">Advanced Diagnostics</h4>
                        <p className="text-sm text-muted-foreground">UV photography, moisture analysis, pore assessment</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                      <div>
                        <h4 className="font-medium">Expert Consultation</h4>
                        <p className="text-sm text-muted-foreground">45-minute session with board-certified dermatologist</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                      <div>
                        <h4 className="font-medium">Custom Treatment Plan</h4>
                        <p className="text-sm text-muted-foreground">Personalized regimen with product recommendations</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                      <div>
                        <h4 className="font-medium">Follow-up Support</h4>
                        <p className="text-sm text-muted-foreground">3-month progress tracking and adjustments</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-accent/10 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-5 h-5 text-accent" />
                      <h4 className="font-medium">Premium Analysis</h4>
                    </div>
                    <p className="text-2xl font-bold text-accent mb-1">$195</p>
                    <p className="text-sm text-muted-foreground">Includes $50 credit toward recommended products</p>
                  </div>

                  <Button size="lg" className="w-full bg-accent hover:bg-accent/90">
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Your Consultation
                  </Button>
                </div>

                <div className="bg-gradient-to-br from-primary to-secondary rounded-lg p-6">
                  <h4 className="font-display text-xl font-bold mb-4">What to Expect</h4>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      <div>
                        <h5 className="font-medium">Skin History Review</h5>
                        <p className="text-sm text-muted-foreground">Discuss your concerns, goals, and past treatments</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold">2</div>
                      <div>
                        <h5 className="font-medium">Professional Analysis</h5>
                        <p className="text-sm text-muted-foreground">Detailed examination using specialized equipment</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold">3</div>
                      <div>
                        <h5 className="font-medium">Treatment Planning</h5>
                        <p className="text-sm text-muted-foreground">Customized skincare routine and product selection</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold">4</div>
                      <div>
                        <h5 className="font-medium">Ongoing Support</h5>
                        <p className="text-sm text-muted-foreground">Follow-up appointments and progress monitoring</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-white/50 rounded-lg">
                    <p className="text-sm text-center">
                      <span className="font-medium">Available at our clinic:</span><br />
                      123 Medical Plaza, Downtown<br />
                      Monday - Friday, 9 AM - 6 PM
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Technology Information */}
      <div className="bg-gradient-to-r from-muted to-secondary border-t">
        <div className="container max-w-6xl mx-auto py-16">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-4">Advanced AI Technology</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Our skin analysis platform combines cutting-edge artificial intelligence with dermatological expertise 
              to provide accurate, personalized skincare recommendations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center">
              <Brain className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Machine Learning</h3>
              <p className="text-sm text-muted-foreground">
                Trained on over 100,000 dermatological images and assessments
              </p>
            </Card>
            <Card className="p-6 text-center">
              <Shield className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Clinical Validation</h3>
              <p className="text-sm text-muted-foreground">
                Algorithms validated by board-certified dermatologists
              </p>
            </Card>
            <Card className="p-6 text-center">
              <Target className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Precision Analysis</h3>
              <p className="text-sm text-muted-foreground">
                95% accuracy in identifying skin conditions and concerns
              </p>
            </Card>
            <Card className="p-6 text-center">
              <Sparkles className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Continuous Learning</h3>
              <p className="text-sm text-muted-foreground">
                AI model updated regularly with new research and data
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}