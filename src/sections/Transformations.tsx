import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Transformations = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const transformations = [
    {
      image: '/images/transform-1.png',
      name: 'Ana Carolina',
      treatment: 'Lentes de Contato',
      description: 'Transformação completa com 10 lentes de porcelana',
    },
    {
      image: '/images/transform-2.png',
      name: 'Maria Helena',
      treatment: 'Reabilitação Total',
      description: 'Implantes e coroas de porcelana',
    },
    {
      image: '/images/transform-3.png',
      name: 'Ricardo Almeida',
      treatment: 'Harmonização Orofacial',
      description: 'Combinação de lentes e preenchimento',
    },
    {
      image: '/images/transform-4.jpg',
      name: 'Juliana Martins',
      treatment: 'Lentes de Contato',
      description: 'Design de sorriso personalizado',
    },
    {
      image: '/images/transform-5.webp',
      name: 'Fernanda Lima',
      treatment: 'Clareamento + Lentes',
      description: 'Protocolo completo de estética dental',
    },
    {
      image: '/images/transform-6.webp',
      name: 'Carolina Dias',
      treatment: 'Reabilitação Estética',
      description: 'Transformação digital planejada',
    },
    {
      image: '/images/transform-7.png',
      name: 'Patrícia Souza',
      treatment: 'Lentes de Contato',
      description: 'Sorriso harmonioso e natural',
    },
    {
      image: '/images/transform-8.webp',
      name: 'Amanda Rocha',
      treatment: 'Design de Sorriso',
      description: 'Lentes de porcelana ultra finas',
    },
    {
      image: '/images/transform-9.webp',
      name: 'Bruna Mendes',
      treatment: 'Reabilitação Total',
      description: 'Coroas e implantes integrados',
    },
    {
      image: '/images/transform-10.webp',
      name: 'Camila Torres',
      treatment: 'Lentes de Contato',
      description: 'Estética minimalista e sofisticada',
    },
    {
      image: '/images/transform-11.webp',
      name: 'Larissa Costa',
      treatment: 'Harmonização Orofacial',
      description: 'Equilíbrio facial e dental',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Horizontal scroll animation
      const cards = cardsRef.current;
      if (!cards) return;

      const totalWidth = cards.scrollWidth - window.innerWidth + 200;

      gsap.to(cards, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Individual card animations
      const cardElements = cards.querySelectorAll('.transformation-card');
      cardElements.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, rotateY: -15 },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="transformations"
      ref={sectionRef}
      className="relative py-24"
    >
      {/* Section Header */}
      <div ref={headerRef} className="text-center mb-16 px-6">
        <span className="text-gold text-sm tracking-[0.3em] uppercase">
          Resultados
        </span>
        <h2 className="font-serif text-section text-off-white mt-4">
          Transformações que
          <span className="text-gold block">Fazem Sorrir</span>
        </h2>
        <p className="text-off-white/60 max-w-2xl mx-auto mt-6">
          Cada sorriso tem uma história. Aqui você confere algumas das incríveis 
          transformações realizadas com técnica refinada e olhar estético apurado.
        </p>
      </div>

      {/* Horizontal Scroll Container */}
      <div ref={containerRef} className="relative h-screen">
        <div
          ref={cardsRef}
          className="absolute top-1/2 -translate-y-1/2 left-0 flex gap-8 px-12 lg:px-24"
          style={{ perspective: '1000px' }}
        >
          {transformations.map((item, index) => (
            <div
              key={index}
              className="transformation-card group relative flex-shrink-0 w-[300px] md:w-[400px] lg:w-[450px]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Card */}
              <div className="relative overflow-hidden bg-charcoal">
                {/* Image */}
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Hover border effect */}
                <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/50 transition-all duration-500 pointer-events-none" />
              </div>

              {/* 3D shadow */}
              <div className="absolute -bottom-4 left-4 right-4 h-8 bg-gold/10 blur-xl -z-10 group-hover:bg-gold/20 transition-all duration-500" />
            </div>
          ))}

          {/* End CTA Card */}
          <div className="transformation-card flex-shrink-0 w-[300px] md:w-[400px] lg:w-[450px] flex items-center justify-center">
            <div className="text-center p-8">
              <p className="font-serif text-3xl text-off-white mb-4">
                Sua História
              </p>
              <p className="text-off-white/60 mb-8">
                Pode ser a próxima transformação
              </p>
              <button
                onClick={() => document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 border border-gold text-gold hover:bg-gold hover:text-deep-black transition-all duration-300"
                data-cursor-hover
              >
                Agende Sua Consulta
              </button>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 text-off-white/40">
          <span className="text-sm tracking-widest uppercase">Scroll Horizontal</span>
          <div className="w-12 h-px bg-off-white/20" />
        </div>
      </div>
    </section>
  );
};

export default Transformations;
