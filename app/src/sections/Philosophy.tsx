import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Users, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Philosophy = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Line animation
      gsap.fromTo(
        lineRef.current,
        { width: '0%' },
        {
          width: '100%',
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Image reveal with mask
      gsap.fromTo(
        imageRef.current,
        { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
        {
          clipPath: 'inset(0% 0 0 0)',
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      // Content reveal
      const contentElements = contentRef.current?.children;
      if (contentElements) {
        gsap.fromTo(
          contentElements,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 75%',
            },
          }
        );
      }

      // Stats counter animation
      const statElements = statsRef.current?.querySelectorAll('.stat-number');
      statElements?.forEach((stat) => {
        const target = parseInt(stat.getAttribute('data-target') || '0');
        gsap.fromTo(
          stat,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            ease: 'power2.out',
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
            },
          }
        );
      });

      // Stats reveal
      gsap.fromTo(
        statsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: Sparkles, value: 30000, suffix: '+', label: 'Lentes Aplicadas' },
    { icon: Users, value: 20000, suffix: '+', label: 'Implantes Realizados' },
    { icon: Award, value: 20, suffix: '+', label: 'Anos de Experiência' },
  ];

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="relative min-h-screen py-24 lg:py-32"
    >
      {/* Decorative line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-gold/30" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-gold text-sm tracking-[0.3em] uppercase">
            Nossa Filosofia
          </span>
          <div ref={lineRef} className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent mt-4 max-w-md mx-auto" />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div
            ref={imageRef}
            className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0"
          >
            <img
              src="/images/philosophy-dr-marcel.webp"
              alt="Dr. Marcel Ferreira"
              className="w-full h-full object-cover"
            />
            {/* Gold frame */}
            <div className="absolute -inset-4 border border-gold/20 pointer-events-none" />
            <div className="absolute -inset-8 border border-gold/10 pointer-events-none" />
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-6">
            <h2 className="font-serif text-section text-off-white leading-tight">
              A Arte de
              <span className="text-gold block">Sorrir</span>
            </h2>

            <p className="text-off-white/70 text-lg leading-relaxed">
              Com mais de duas décadas de experiência, sou referência nacional em 
              odontologia estética e especialista em lentes de contato dentais e 
              reabilitação estética de alta complexidade.
            </p>

            <p className="text-off-white/60 leading-relaxed">
              Formado pela Universidade Cidade de São Paulo (UNICID) em 2001, 
              possuo especializações em implantes orais, plástica periodontal e 
              sedação com óxido nitroso, garantindo tratamentos seguros e de excelência.
            </p>

            <p className="text-off-white/60 leading-relaxed">
              Com atendimento exclusivo em minha clínica no Jardins/SP, já transformei 
              milhares de sorrisos, consolidando-me como um dos grandes nomes da 
              odontologia estética brasileira.
            </p>

            <div className="pt-4">
              <button
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="group inline-flex items-center gap-3 text-gold hover:text-gold-light transition-colors duration-300"
                data-cursor-hover
              >
                <span className="text-sm tracking-wide uppercase">Conheça Nossos Serviços</span>
                <span className="w-8 h-px bg-gold group-hover:w-12 transition-all duration-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-3 gap-8 mt-24 pt-12 border-t border-off-white/10"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <stat.icon className="w-6 h-6 text-gold mx-auto mb-4" />
              <p className="font-serif text-3xl md:text-4xl lg:text-5xl text-off-white mb-2">
                <span className="stat-number" data-target={stat.value}>
                  0
                </span>
                <span className="text-gold">{stat.suffix}</span>
              </p>
              <p className="text-off-white/50 text-sm tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
