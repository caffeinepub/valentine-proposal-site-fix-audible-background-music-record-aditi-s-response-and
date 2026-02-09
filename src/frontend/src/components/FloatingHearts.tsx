import { useEffect, useState } from 'react';

interface HeartParticle {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<HeartParticle[]>([]);

  useEffect(() => {
    const newHearts: HeartParticle[] = [];
    for (let i = 0; i < 30; i++) {
      newHearts.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2,
        size: 20 + Math.random() * 40
      });
    }
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute bottom-0 animate-float-up opacity-0"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            animationIterationCount: 'infinite'
          }}
        >
          <img 
            src="/assets/generated/floating-hearts-transparent.dim_400x400.png"
            alt=""
            className="drop-shadow-lg"
            style={{
              width: `${heart.size}px`,
              height: `${heart.size}px`
            }}
          />
        </div>
      ))}
    </div>
  );
}
