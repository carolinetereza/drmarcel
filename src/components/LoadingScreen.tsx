import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const LoadingScreen = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<SVGPathElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate logo drawing
      gsap.fromTo(
        logoRef.current,
        { strokeDashoffset: 300 },
        { strokeDashoffset: 0, duration: 1.5, ease: 'power2.inOut' }
      );

      // Fade in text
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: 'power2.out' }
      );

      // Exit animation
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.8,
        delay: 2,
        ease: 'power2.inOut',
        onComplete: () => {
          if (containerRef.current) {
            containerRef.current.style.display = 'none';
          }
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="loading-screen"
    >
      <div className="flex flex-col items-center gap-8">
        {/* MF Monogram Logo */}
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          className="loading-logo"
        >
          <path
            ref={logoRef}
            d="M20 100V20H40L60 50L80 20H100V100H85V45L60 75L35 45V100H20Z"
            stroke="#C9A962"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ strokeDasharray: 300 }}
          />
        </svg>

        {/* Brand text */}
        <div ref={textRef} className="text-center opacity-0">
          <p className="font-serif text-gold text-lg tracking-[0.3em] uppercase">
            Marcel Ferreira
          </p>
          <p className="text-off-white/60 text-sm tracking-widest mt-2">
            Odontologia Estética
          </p>
        </div>

        {/* Loading bar */}
        <div className="w-32 h-[1px] bg-off-white/20 overflow-hidden">
          <div className="h-full bg-gold animate-shimmer" 
            style={{ 
              backgroundImage: 'linear-gradient(90deg, transparent, #C9A962, transparent)',
              backgroundSize: '200% 100%'
            }} 
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
