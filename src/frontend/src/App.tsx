import { useState } from 'react';
import ProposalSection from './components/ProposalSection';
import PhotoCarousel from './components/PhotoCarousel';
import FloatingHearts from './components/FloatingHearts';
import SadHeartAnimation from './components/SadHeartAnimation';
import MusicPlayer from './components/MusicPlayer';
import Footer from './components/Footer';
import ResultsScreen from './screens/ResultsScreen';
import { useSubmitResponse } from './hooks/useQueries';

function App() {
  const [response, setResponse] = useState<'yes' | 'no' | null>(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const submitResponse = useSubmitResponse();

  // Check if we're on the results route
  const isResultsRoute = window.location.pathname === '/results';

  const handleYes = async () => {
    setResponse('yes');
    setShowAnimation(true);
    
    // Submit YES response to backend
    try {
      await submitResponse.mutateAsync(true);
    } catch (error) {
      console.error('Failed to submit response:', error);
    }
  };

  const handleNo = async () => {
    // Submit NO response to backend
    try {
      await submitResponse.mutateAsync(false);
    } catch (error) {
      console.error('Failed to submit response:', error);
    }
    
    // Show sad animation briefly but don't disable buttons
    setResponse('no');
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
      setResponse(null);
    }, 2000);
  };

  // Show results screen if on /results route
  if (isResultsRoute) {
    return <ResultsScreen />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
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

      {/* Music Player */}
      <MusicPlayer />

      {/* Main Content */}
      <main className="relative z-10 min-h-screen flex flex-col">
        {response !== 'yes' ? (
          <ProposalSection 
            onYes={handleYes} 
            onNo={handleNo}
            disabled={false}
          />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
            <div className="max-w-4xl w-full space-y-12">
              <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <h1 className="text-4xl md:text-6xl font-bold text-rose-600 dark:text-rose-400">
                  Yay! You made my Valentine's Day perfect ❤️
                </h1>
                <p className="text-xl md:text-2xl text-rose-700 dark:text-rose-300">
                  I'm the happiest person alive right now!
                </p>
              </div>
              
              <PhotoCarousel />
            </div>
          </div>
        )}

        <Footer />
      </main>

      {/* Animations */}
      {showAnimation && response === 'yes' && <FloatingHearts />}
      {showAnimation && response === 'no' && <SadHeartAnimation />}
    </div>
  );
}

export default App;
