import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, ArrowRight, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  image: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
}

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const testimonials: Testimonial[] = [
    {
      image: '/images/carolvalenca.webp',
      name: 'Carol Valença',
      role: 'Influenciadora',
      quote: 'Minhas expectativas foram superadas. Achei que meu resultado ficou bem melhor do que eu esperava. Estou muito feliz e amando meu sorriso.',
      rating: 5,
    },
    {
      image: '/images/juliavieira.webp',
      name: 'Julia Vieira',
      role: 'Influenciadora',
      quote: 'Gratidão ao Dr. Marcel e Dra. Carol pelo trabalho impecável na realização das minhas lentes de porcelana. O talento da equipe garantiu um resultado extremamente natural, realçando minha beleza sem perder a naturalidade.',
      rating: 5,
    },
    {
      image: '/images/nicolerocha.webp',
      name: 'Nicole Rocha',
      role: 'Empresária',
      quote: 'Desde a primeira consulta, ficou evidente que ele se destaca pela excelência no atendimento e pelo cuidado que proporciona.',
      rating: 5,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal with cinematic effect
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 80, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Image parallax on scroll
      gsap.to(imageContainerRef.current, {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Auto-advance with progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        goToNext();
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [activeIndex, isAnimating]);

  const animateTransition = (newIndex: number) => {
    if (isAnimating || newIndex === activeIndex) return;
    setIsAnimating(true);

    const tl = gsap.timeline({
      onComplete: () => {
        setActiveIndex(newIndex);
        setIsAnimating(false);
      },
    });

    // Animate out
    tl.to(contentRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.4,
      ease: 'power2.in',
    });

    const currentImg = imageContainerRef.current?.querySelector('img');
    if (currentImg) {
      tl.to(
        currentImg,
        {
          scale: 1.1,
          opacity: 0.5,
          duration: 0.4,
          ease: 'power2.in',
        },
        '<'
      );
    }

    // Switch content
    tl.call(() => setActiveIndex(newIndex));

    // Animate in
    const nextImg = imageContainerRef.current?.querySelector('img');
    if (nextImg) {
      tl.to(nextImg, {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
      });
    }

    tl.to(
      contentRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      },
      '-=0.4'
    );
  };

  const goToNext = () => {
    const nextIndex = (activeIndex + 1) % testimonials.length;
    animateTransition(nextIndex);
  };

  const goToPrev = () => {
    const prevIndex = (activeIndex - 1 + testimonials.length) % testimonials.length;
    animateTransition(prevIndex);
  };

  const currentTestimonial = testimonials[activeIndex];

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative min-h-screen py-24 lg:py-32 overflow-hidden"
    >
      {/* Cinematic background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-deep-black via-charcoal to-deep-black" />

      {/* Ambient light effect */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-gold/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header - Editorial Style */}
        <div ref={headerRef} className="mb-16 lg:mb-24">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-gold/50" />
            <span className="text-gold text-xs tracking-[0.4em] uppercase font-light">
              Depoimentos
            </span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-off-white leading-[1.1]">
            O Que Nossos
            <span className="text-gold italic block mt-2">Pacientes Dizem</span>
          </h2>
        </div>

        {/* Main Content - Split Layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Large Image Side */}
          <div className="relative order-2 lg:order-1">
            {/* Image Container with Glassmorphism Frame */}
            <div className="relative">
              {/* Decorative frame */}
              <div className="absolute -inset-4 border border-gold/20 pointer-events-none" />
              <div className="absolute -inset-8 border border-gold/10 pointer-events-none" />

              {/* Main image container */}
              <div
                ref={imageContainerRef}
                className="relative aspect-[3/4] overflow-hidden glass"
              >
                <img
                  src={currentTestimonial.image}
                  alt={currentTestimonial.name}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-deep-black/60 via-transparent to-transparent" />

                {/* Floating name tag */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="glass px-6 py-4 inline-block">
                    <p className="font-serif text-gold text-xl">{currentTestimonial.name}</p>
                    <p className="text-off-white/60 text-sm">{currentTestimonial.role}</p>
                  </div>
                </div>
              </div>

              {/* Large quote mark */}
              <Quote className="absolute -top-6 -right-6 w-24 h-24 text-gold/10" />
            </div>

            {/* Thumbnail Navigation */}
            <div className="flex gap-4 mt-8">
              {testimonials.map((testimonial, index) => (
                <button
                  key={index}
                  onClick={() => animateTransition(index)}
                  className={`relative w-20 h-20 overflow-hidden transition-all duration-500 ${
                    index === activeIndex
                      ? 'ring-2 ring-gold scale-105'
                      : 'opacity-50 hover:opacity-80'
                  }`}
                  data-cursor-hover
                >
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Content Side */}
          <div className="order-1 lg:order-2 lg:pl-8">
            <div ref={contentRef}>
              {/* Rating */}
              <div className="flex gap-2 mb-8">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                ))}
              </div>

              {/* Quote - Editorial Typography */}
              <blockquote className="relative">
                <span className="absolute -top-8 -left-4 text-8xl text-gold/20 font-serif leading-none">
                  "
                </span>
                <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-off-white/90 leading-[1.4] mb-8">
                  {currentTestimonial.quote}
                </p>
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center gap-4 mb-12">
                <div className="h-px w-12 bg-gold/50" />
                <div>
                  <p className="font-serif text-xl text-off-white">
                    {currentTestimonial.name}
                  </p>
                  <p className="text-off-white/50 text-sm tracking-wide uppercase">
                    {currentTestimonial.role}
                  </p>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-8">
                {/* Progress Bar */}
                <div className="flex-1 max-w-xs">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-gold text-sm font-medium">
                      0{activeIndex + 1}
                    </span>
                    <div className="flex-1 h-px bg-off-white/20 relative overflow-hidden">
                      <div
                        ref={progressRef}
                        className="absolute inset-y-0 left-0 bg-gold transition-all duration-300"
                        style={{ width: `${((activeIndex + 1) / testimonials.length) * 100}%` }}
                      />
                    </div>
                    <span className="text-off-white/40 text-sm">
                      0{testimonials.length}
                    </span>
                  </div>
                </div>

                {/* Arrow Navigation */}
                <div className="flex gap-3">
                  <button
                    onClick={goToPrev}
                    disabled={isAnimating}
                    className="w-14 h-14 border border-off-white/20 flex items-center justify-center
                      text-off-white/60 hover:border-gold hover:text-gold
                      transition-all duration-300 hover:scale-105 disabled:opacity-50"
                    data-cursor-hover
                  >
                    <ArrowRight className="w-5 h-5 rotate-180" />
                  </button>
                  <button
                    onClick={goToNext}
                    disabled={isAnimating}
                    className="w-14 h-14 border border-off-white/20 flex items-center justify-center
                      text-off-white/60 hover:border-gold hover:text-gold
                      transition-all duration-300 hover:scale-105 disabled:opacity-50"
                    data-cursor-hover
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats - Minimalist */}
        <div className="mt-24 lg:mt-32 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {[
            { value: '98%', label: 'Satisfação', desc: 'Dos pacientes' },
            { value: '15K+', label: 'Sorrisos', desc: 'Transformados' },
            { value: '20+', label: 'Anos', desc: 'De excelência' },
            { value: '4.9', label: 'Avaliação', desc: 'Média Google' },
          ].map((stat, index) => (
            <div key={index} className="text-center lg:text-left">
              <p className="font-serif text-4xl lg:text-5xl text-gold mb-2">
                {stat.value}
              </p>
              <p className="text-off-white text-sm tracking-wide uppercase mb-1">
                {stat.label}
              </p>
              <p className="text-off-white/40 text-xs">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
