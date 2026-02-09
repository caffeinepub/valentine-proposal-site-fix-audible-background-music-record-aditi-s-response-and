import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-10 py-6 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <p className="text-sm text-rose-600/70 dark:text-rose-400/70 flex items-center justify-center gap-2 flex-wrap">
          <span>© 2026. Built with</span>
          <Heart className="w-4 h-4 fill-rose-500 text-rose-500 inline-block animate-pulse" />
          <span>using</span>
          <a 
            href="https://caffeine.ai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-semibold hover:text-rose-700 dark:hover:text-rose-300 transition-colors underline decoration-rose-400 underline-offset-2"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}
