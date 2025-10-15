"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import { FloatingNavbar } from '@/components/navbars/floating-navbar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { User, Mail, Calendar, FileText, Trash2, Eye, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

interface SkinAnalysis {
  id: number;
  skinType: string | null;
  concerns: string[] | null;
  lifestyleSunExposure: string | null;
  lifestyleStressLevel: string | null;
  lifestyleDietQuality: string | null;
  lifestyleSleepQuality: string | null;
  currentProducts: string | null;
  goals: string[] | null;
  preferencesBudget: string | null;
  analysisMethod: string | null;
  skinScore: number | null;
  analysisResults: any | null;
  createdAt: string;
  updatedAt: string;
}

export default function AccountPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [analyses, setAnalyses] = useState<SkinAnalysis[]>([]);
  const [isLoadingAnalyses, setIsLoadingAnalyses] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push('/login?redirect=/account');
    }
  }, [session, isPending, router]);

  useEffect(() => {
    if (session?.user) {
      fetchAnalyses();
    }
  }, [session]);

  const fetchAnalyses = async () => {
    try {
      setIsLoadingAnalyses(true);
      const response = await fetch('/api/skin-analysis?sort=createdAt&order=desc', {
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to fetch analyses');
      }

      const data = await response.json();
      setAnalyses(data);
    } catch (error) {
      console.error('Error fetching analyses:', error);
      toast.error('Failed to load your skin analyses');
    } finally {
      setIsLoadingAnalyses(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this analysis?')) {
      return;
    }

    try {
      setDeletingId(id);
      const response = await fetch(`/api/skin-analysis/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to delete analysis');
      }

      toast.success('Analysis deleted successfully');
      setAnalyses(analyses.filter(a => a.id !== id));
    } catch (error) {
      console.error('Error deleting analysis:', error);
      toast.error('Failed to delete analysis');
    } finally {
      setDeletingId(null);
    }
  };

  const handleView = async (id: number) => {
    try {
      const response = await fetch(`/api/skin-analysis/${id}`, {
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to fetch analysis');
      }

      const analysisData = await response.json();
      
      // Store in sessionStorage for the analysis page to display
      sessionStorage.setItem('viewAnalysis', JSON.stringify(analysisData));
      
      // Navigate to analysis page
      router.push('/analysis');
    } catch (error) {
      console.error('Error fetching analysis:', error);
      toast.error('Failed to load analysis');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getAnalysisMethodLabel = (method: string | null) => {
    if (!method) return 'Unknown';
    const labels: Record<string, string> = {
      'questionnaire': 'Quick Assessment',
      'photo': 'Photo Analysis',
      'professional': 'Professional Visit'
    };
    return labels[method] || method;
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-background">
        <FloatingNavbar />
        <div className="container max-w-6xl mx-auto py-32">
          <div className="space-y-8">
            <Skeleton className="h-12 w-64" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <FloatingNavbar />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary border-b">
        <div className="container max-w-6xl mx-auto py-12">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-2xl font-display font-bold">
              {session.user.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold">My Account</h1>
              <p className="text-muted-foreground">Manage your profile and skin analysis history</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-6xl mx-auto py-8 space-y-8">
        {/* Account Details */}
        <Card className="p-6">
          <h2 className="font-display text-2xl font-bold mb-6">Account Details</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-accent mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{session.user.name || 'Not provided'}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-accent mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{session.user.email}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Skin Analysis History */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display text-2xl font-bold">Skin Analysis History</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {analyses.length} {analyses.length === 1 ? 'analysis' : 'analyses'} completed
              </p>
            </div>
            <Button 
              onClick={() => router.push('/analysis')}
              className="bg-accent hover:bg-accent/90"
            >
              <FileText className="w-4 h-4 mr-2" />
              New Analysis
            </Button>
          </div>

          {isLoadingAnalyses ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-32 w-full" />
              ))}
            </div>
          ) : analyses.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">No analyses yet</h3>
              <p className="text-muted-foreground mb-6">
                Start your skin journey by completing your first analysis
              </p>
              <Button 
                onClick={() => router.push('/analysis')}
                className="bg-accent hover:bg-accent/90"
              >
                Get Started
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {analyses.map((analysis) => (
                <Card key={analysis.id} className="p-6 hover:border-accent/50 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge variant="outline" className="font-medium">
                          {getAnalysisMethodLabel(analysis.analysisMethod)}
                        </Badge>
                        {analysis.skinScore && (
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-4 h-4 text-accent" />
                            <span className="font-medium">Score: {analysis.skinScore}</span>
                          </div>
                        )}
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-3">
                        {analysis.skinType && (
                          <div>
                            <p className="text-sm text-muted-foreground">Skin Type</p>
                            <p className="font-medium capitalize">{analysis.skinType}</p>
                          </div>
                        )}
                        {analysis.concerns && analysis.concerns.length > 0 && (
                          <div>
                            <p className="text-sm text-muted-foreground">Main Concerns</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {analysis.concerns.slice(0, 3).map((concern, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {concern}
                                </Badge>
                              ))}
                              {analysis.concerns.length > 3 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{analysis.concerns.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(analysis.createdAt)}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleView(analysis.id)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(analysis.id)}
                        disabled={deletingId === analysis.id}
                        className="text-destructive hover:text-destructive"
                      >
                        {deletingId === analysis.id ? (
                          <div className="w-4 h-4 border-2 border-destructive border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}