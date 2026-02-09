import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Clock, CheckCircle, XCircle, Lock } from 'lucide-react';
import { useGetAllResponses, useIsCallerAdmin } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function ResultsScreen() {
  const { data: isAdmin, isLoading: isCheckingAdmin } = useIsCallerAdmin();
  const { data: responses, isLoading: isLoadingResponses, error } = useGetAllResponses();

  // Show loading state while checking admin status
  if (isCheckingAdmin) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div 
          className="fixed inset-0 z-0"
          style={{
            backgroundImage: 'url(/assets/generated/valentine-background.dim_1920x1080.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-rose-50/80 via-pink-50/70 to-red-50/80 dark:from-rose-950/80 dark:via-pink-950/70 dark:to-red-950/80" />
        </div>
        
        <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
          <Card className="w-full max-w-2xl border-2 border-rose-200 dark:border-rose-800 bg-white/90 dark:bg-rose-950/90 backdrop-blur-sm shadow-2xl">
            <CardHeader>
              <Skeleton className="h-8 w-48" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-24 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Show access denied if not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div 
          className="fixed inset-0 z-0"
          style={{
            backgroundImage: 'url(/assets/generated/valentine-background.dim_1920x1080.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-rose-50/80 via-pink-50/70 to-red-50/80 dark:from-rose-950/80 dark:via-pink-950/70 dark:to-red-950/80" />
        </div>
        
        <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
          <Card className="w-full max-w-2xl border-2 border-rose-200 dark:border-rose-800 bg-white/90 dark:bg-rose-950/90 backdrop-blur-sm shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-rose-600 dark:text-rose-400">
                <Lock className="w-8 h-8" />
                Access Denied
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="border-rose-300 dark:border-rose-700">
                <AlertTitle className="text-rose-900 dark:text-rose-100">
                  Owner Access Only
                </AlertTitle>
                <AlertDescription className="text-rose-700 dark:text-rose-300">
                  This page is only accessible to the owner of this Valentine's proposal.
                </AlertDescription>
              </Alert>
              
              <Button
                onClick={() => window.location.href = '/'}
                className="w-full bg-rose-600 hover:bg-rose-700 text-white"
              >
                Go Back to Proposal
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Format timestamp
  const formatTimestamp = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000); // Convert nanoseconds to milliseconds
    return date.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(/assets/generated/valentine-background.dim_1920x1080.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-rose-50/80 via-pink-50/70 to-red-50/80 dark:from-rose-950/80 dark:via-pink-950/70 dark:to-red-950/80" />
      </div>
      
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-2xl border-2 border-rose-200 dark:border-rose-800 bg-white/90 dark:bg-rose-950/90 backdrop-blur-sm shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-3xl text-rose-600 dark:text-rose-400">
              <Heart className="w-8 h-8 fill-rose-500" />
              Valentine's Response Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {isLoadingResponses ? (
              <div className="space-y-4">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
            ) : error ? (
              <Alert className="border-rose-300 dark:border-rose-700">
                <AlertTitle className="text-rose-900 dark:text-rose-100">
                  Error Loading Responses
                </AlertTitle>
                <AlertDescription className="text-rose-700 dark:text-rose-300">
                  {error instanceof Error ? error.message : 'Failed to load responses'}
                </AlertDescription>
              </Alert>
            ) : !responses || responses.length === 0 ? (
              <Alert className="border-rose-300 dark:border-rose-700">
                <AlertTitle className="text-rose-900 dark:text-rose-100">
                  No Response Yet
                </AlertTitle>
                <AlertDescription className="text-rose-700 dark:text-rose-300">
                  Aditi hasn't responded to your Valentine's proposal yet. Keep your fingers crossed! 🤞
                </AlertDescription>
              </Alert>
            ) : (
              <div className="space-y-4">
                {responses.map((response, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-lg border-2 ${
                      response.answer
                        ? 'bg-green-50 dark:bg-green-950/30 border-green-300 dark:border-green-700'
                        : 'bg-red-50 dark:bg-red-950/30 border-red-300 dark:border-red-700'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {response.answer ? (
                        <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-8 h-8 text-red-600 dark:text-red-400 flex-shrink-0" />
                      )}
                      
                      <div className="flex-1 space-y-2">
                        <h3 className={`text-2xl font-bold ${
                          response.answer
                            ? 'text-green-700 dark:text-green-300'
                            : 'text-red-700 dark:text-red-300'
                        }`}>
                          {response.answer ? 'YES! 💕' : 'No 😢'}
                        </h3>
                        
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className={`w-4 h-4 ${
                            response.answer
                              ? 'text-green-600 dark:text-green-400'
                              : 'text-red-600 dark:text-red-400'
                          }`} />
                          <span className={
                            response.answer
                              ? 'text-green-700 dark:text-green-300'
                              : 'text-red-700 dark:text-red-300'
                          }>
                            {formatTimestamp(response.timestamp)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {responses.length > 1 && (
                  <p className="text-sm text-rose-600/70 dark:text-rose-400/70 text-center">
                    Showing {responses.length} response{responses.length > 1 ? 's' : ''}
                  </p>
                )}
              </div>
            )}
            
            <Button
              onClick={() => window.location.href = '/'}
              variant="outline"
              className="w-full border-rose-300 dark:border-rose-700 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900"
            >
              Back to Proposal
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
