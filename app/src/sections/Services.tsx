import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, CircleDot, Smile, Stethoscope, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const services = [
    {
      icon: Sparkles,
      title: 'Lentes de Contato Dental',
      description: 'Lentes de porcelana ultra-finas que transformam seu sorriso com naturalidade e sofisticação. Design personalizado para cada paciente.',
      features: ['Design Digital do Sorriso', 'Porcelana E-max', 'Mínimo Desgaste', 'Resultado Imediato'],
    },
    {
      icon: CircleDot,
      title: 'Implantodontia',
      description: 'Implantes de última geração para reposição de dentes perdidos com segurança, precisão e resultados previsíveis.',
      features: ['Implantes Premium', 'Carga Imediata', 'Cirurgia Guiada', 'Reabilitação Total'],
    },
    {
      icon: Smile,
      title: 'Harmonização Orofacial',
      description: 'Procedimentos estéticos que equilibram proporções faciais, realçando a beleza natural do seu sorriso.',
      features: ['Preenchimento Facial', 'Toxina Botulínica', 'Bioestimuladores', 'Fios de PDO'],
    },
    {
      icon: Stethoscope,
      title: 'Clínica Geral',
      description: 'Cuidados completos para sua saúde bucal, desde prevenção até tratamentos restauradores de alta qualidade.',
      features: ['Limpeza Profissional', 'Restaurações', 'Tratamento de Canal', 'Periodontia'],
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

      // Cards stagger reveal
      const cards = cardsRef.current?.querySelectorAll('.service-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 80, rotateX: 15 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative min-h-screen py-24 lg:py-32"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-black via-charcoal/30 to-deep-black pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-20">
          <span className="text-gold text-sm tracking-[0.3em] uppercase">
            Nossos Serviços
          </span>
          <h2 className="font-serif text-section text-off-white mt-4">
            Excelência em
            <span className="text-gold block">Odontologia Estética</span>
          </h2>
          <p className="text-off-white/60 max-w-2xl mx-auto mt-6">
            Além das lentes de contato dentais, oferecemos tratamentos completos 
            para saúde e estética bucal com tecnologia de ponta.
          </p>
        </div>

        {/* Services Grid */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 gap-6 lg:gap-8"
          style={{ perspective: '1000px' }}
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card group relative"
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
              data-cursor-hover
            >
              <div 
                className={`relative h-full glass p-8 lg:p-10 transition-all duration-500 ${
                  activeCard === index ? 'border-gold/50' : ''
                }`}
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors duration-300">
                  <service.icon className="w-6 h-6 text-gold" />
                </div>

                {/* Title */}
                <h3 className="font-serif text-2xl lg:text-3xl text-off-white mb-4 group-hover:text-gold transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-off-white/60 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-8">
                  {service.features.map((feature, fIndex) => (
                    <li
                      key={fIndex}
                      className="flex items-center gap-3 text-off-white/70 text-sm"
                    >
                      <span className="w-1 h-1 bg-gold rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button className="inline-flex items-center gap-2 text-gold text-sm tracking-wide group/btn">
                  <span>Saiba Mais</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </button>

                {/* Hover glow */}
                <div className={`absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                  <div className="absolute top-0 right-0 w-px h-8 bg-gradient-to-b from-gold/50 to-transparent transform translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500" />
                  <div className="absolute top-0 right-0 h-px w-8 bg-gradient-to-l from-gold/50 to-transparent transform translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-off-white/60 mb-6">
            Descubra como podemos transformar sua autoestima
          </p>
          <button
            onClick={() => document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-10 py-4 bg-gold text-deep-black font-medium tracking-wide hover:bg-gold-light transition-all duration-300 btn-glow"
            data-cursor-hover
          >
            Agende Sua Avaliação
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
