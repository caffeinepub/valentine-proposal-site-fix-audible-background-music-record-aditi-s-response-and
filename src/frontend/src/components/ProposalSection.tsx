import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

interface ProposalSectionProps {
  onYes: () => void;
  onNo: () => void;
  disabled?: boolean;
}

const noPrompts = [
  "Are you sure?",
  "Are you 1000% sure?",
  "I will always treat you like a princess",
  "I will handle all your tantrums",
  "I will take you on lots of shopping trips",
  "Pretty please?",
  "Say yes, cutie",
  "Come on, say yes now",
  "Just give me one chance"
];

export default function ProposalSection({ onYes, onNo, disabled }: ProposalSectionProps) {
  const [noClickCount, setNoClickCount] = useState(0);
  const [currentPrompt, setCurrentPrompt] = useState<string>("");

  const handleNoClick = () => {
    if (noClickCount < noPrompts.length) {
      setCurrentPrompt(noPrompts[noClickCount]);
      setNoClickCount(prev => prev + 1);
    } else {
      setCurrentPrompt("Please... just say yes! 💔");
    }
    onNo();
  };

  // Calculate YES button size based on NO clicks - grows significantly
  const yesScale = 1 + (noClickCount * 0.2);
  // NO button shrinks but stays visible and clickable (minimum 0.6)
  const noScale = Math.max(0.6, 1 - (noClickCount * 0.04));

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full text-center space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        {/* Heart Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <Heart 
              className="w-24 h-24 md:w-32 md:h-32 text-rose-500 fill-rose-500 animate-pulse" 
              strokeWidth={1.5}
            />
            <div className="absolute inset-0 animate-ping opacity-20">
              <Heart 
                className="w-24 h-24 md:w-32 md:h-32 text-rose-500 fill-rose-500" 
                strokeWidth={1.5}
              />
            </div>
          </div>
        </div>

        {/* Main Message */}
        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold text-rose-600 dark:text-rose-400 leading-tight">
            Aditi
          </h1>
          <p className="text-3xl md:text-5xl font-semibold text-rose-700 dark:text-rose-300 leading-relaxed">
            Will you be my Valentine?
          </p>
          <p className="text-lg md:text-xl text-rose-600/80 dark:text-rose-400/80 max-w-lg mx-auto">
            You make every day brighter, and I can't imagine celebrating this special day without you.
          </p>
        </div>

        {/* Prominent Flashing Prompt Message after NO clicks */}
        {currentPrompt && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-500 py-4">
            <p className="text-2xl md:text-4xl font-bold text-rose-600 dark:text-rose-400 flash-prompt px-4">
              {currentPrompt}
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
          <Button
            onClick={onYes}
            disabled={disabled}
            size="lg"
            style={{
              transform: `scale(${yesScale})`,
              transition: 'transform 0.3s ease-in-out'
            }}
            className="text-xl px-12 py-8 bg-rose-600 hover:bg-rose-700 text-white shadow-2xl hover:shadow-rose-500/50 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Heart className="w-6 h-6 mr-3 fill-white" />
            Yes! 💕
          </Button>
          
          <Button
            onClick={handleNoClick}
            disabled={false}
            size="lg"
            variant="outline"
            style={{
              transform: `scale(${noScale})`,
              transition: 'transform 0.3s ease-in-out'
            }}
            className="text-xl px-12 py-8 border-2 border-rose-400 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 shadow-xl transition-all duration-300 hover:scale-105"
          >
            No 😢
          </Button>
        </div>
      </div>
    </div>
  );
}
