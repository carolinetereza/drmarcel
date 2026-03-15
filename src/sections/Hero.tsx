import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const heroImages = [
  '/images/hero-smile.jpg',
  '/images/hero-marcel.png'
];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Auto slide images
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial reveal animation
      const tl = gsap.timeline({ delay: 2.5 }); // Wait for loading screen

      // Reveal title with character animation
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
      );

      // Reveal subtitle
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        '-=0.7'
      );

      // Reveal tagline
      tl.fromTo(
        taglineRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      );

      // Reveal CTA
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.3'
      );

      // Parallax scroll effect
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Image parallax (slower)
      imagesRef.current.forEach((img) => {
        if (img) {
          scrollTl.to(
            img,
            { y: '30%', scale: 1.1, ease: 'none' },
            0
          );
        }
      });

      // Title parallax (faster)
      scrollTl.to(
        titleRef.current,
        { y: '-50%', opacity: 0, ease: 'none' },
        0
      );

      // Subtitle parallax
      scrollTl.to(
        subtitleRef.current,
        { y: '-30%', opacity: 0, ease: 'none' },
        0
      );

      // Overlay darkening
      scrollTl.to(
        overlayRef.current,
        { opacity: 0.9, ease: 'none' },
        0
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToPhilosophy = () => {
    const section = document.getElementById('philosophy');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background Image Slider with Parallax */}
      <div className="absolute inset-0 w-full h-[120%] -top-[10%]">
        {heroImages.map((src, index) => (
          <div
            key={src}
            className="absolute inset-0 w-full h-full transition-opacity duration-[1.5s] ease-in-out"
            style={{ opacity: currentImage === index ? 1 : 0, zIndex: currentImage === index ? 10 : 0 }}
          >
            <img
              ref={(el) => { imagesRef.current[index] = el; }}
              src={src}
              alt="Marcel Ferreira"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Dark overlay with gradient */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-b from-deep-black/60 via-deep-black/40 to-deep-black"
      />

      {/* Vignette effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_40%,rgba(5,5,5,0.8)_100%)]" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        {/* Main Title */}
        <h1
          ref={titleRef}
          className="font-serif text-hero text-off-white text-center leading-none tracking-tight opacity-0"
        >
          MARCEL
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-serif text-2xl md:text-4xl lg:text-5xl text-gold mt-4 tracking-[0.2em] opacity-0"
        >
          FERREIRA
        </p>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="text-off-white/70 text-sm md:text-base tracking-[0.3em] uppercase mt-8 opacity-0"
        >
          A Arte do Sorriso
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 mt-12 opacity-0">
          <button
            onClick={scrollToPhilosophy}
            className="group px-8 py-4 bg-gold text-deep-black font-medium tracking-wide hover:bg-gold-light transition-all duration-300 btn-glow"
            data-cursor-hover
          >
            <span className="relative z-10">Conheça Nossa Filosofia</span>
          </button>
          <button
            onClick={() => navigate('/agendamento')}
            className="px-8 py-4 border border-off-white/30 text-off-white tracking-wide hover:border-gold hover:text-gold transition-all duration-300"
            data-cursor-hover
          >
            Agendar Consulta
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-off-white/40 text-xs tracking-widest uppercase">
            Scroll
          </span>
          <ChevronDown className="text-gold animate-bounce" size={20} />
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-8 w-[1px] h-32 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
      <div className="absolute bottom-1/4 right-8 w-[1px] h-32 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
    </section>
  );
};

export default Hero;
