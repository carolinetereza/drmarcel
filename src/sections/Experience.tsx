import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Clock, Phone, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const images = [
  '/images/clinic-interior-new.png',
  '/images/boutique-1.png',
  '/images/boutique-2.png',
  '/images/boutique-3.png',
];

const Experience = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const textMaskRef = useRef<HTMLDivElement>(null);

  const features = [
    { icon: MapPin, label: 'Localização Privilegiada', value: 'Jardins, São Paulo' },
    { icon: Clock, label: 'Atendimento Exclusivo', value: 'Seg-Sex: 9h às 18h' },
    { icon: Phone, label: 'Agendamento', value: '(11) 3068-9947' },
    { icon: Mail, label: 'Contato', value: 'dentalboutiqueadm@gmail.com' },
  ];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  useEffect(() => {
    // Auto slide
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text mask expand animation
      gsap.fromTo(
        textMaskRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Image parallax
      imagesRef.current.forEach((img) => {
        if (img) {
          gsap.to(img, {
            y: '-20%',
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          });
        }
      });

      // Content reveal
      const contentElements = contentRef.current?.children;
      if (contentElements) {
        gsap.fromTo(
          contentElements,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      // Features reveal
      const featureElements = featuresRef.current?.children;
      if (featureElements) {
        gsap.fromTo(
          featureElements,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: featuresRef.current,
              start: 'top 85%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative min-h-screen py-24 lg:py-32 overflow-hidden"
    >
      {/* Text Mask Background */}
      <div
        ref={textMaskRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
      >
        <h2 className="font-serif text-[20vw] text-off-white/[0.02] whitespace-nowrap tracking-tight">
          DENTAL BOUTIQUE
        </h2>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-gold text-sm tracking-[0.3em] uppercase">
            A Experiência
          </span>
          <h2 className="font-serif text-section text-off-white mt-4">
            Dental
            <span className="text-gold"> Boutique</span>
          </h2>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Slider */}
          <div className="relative h-[500px] lg:h-[600px] overflow-hidden rounded-sm group cursor-pointer" onClick={nextImage}>
            {images.map((src, index) => (
              <div
                key={src}
                className="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out"
                style={{ opacity: currentImage === index ? 1 : 0, zIndex: currentImage === index ? 10 : 0 }}
              >
                  <img
                    ref={(el) => { imagesRef.current[index] = el; }}
                    src={src}
                    alt={`Dental Boutique View ${index + 1}`}
                    className="w-full h-[120%] object-cover scale-105 group-hover:scale-100 transition-transform duration-[2s] ease-out"
                  />
              </div>
            ))}

            {/* Overlay */}
            <div className="absolute inset-0 z-20 bg-gradient-to-t from-deep-black/90 via-deep-black/20 to-transparent pointer-events-none" />
            
            {/* Sliding Controls/Indicators */}
            <div className="absolute bottom-6 inset-x-0 flex justify-center gap-3 z-30">
               {images.map((_, index) => (
                 <button 
                    key={index} 
                    onClick={(e) => { e.stopPropagation(); setCurrentImage(index); }}
                    className={`h-1 rounded-full transition-all duration-500 ${currentImage === index ? 'w-8 bg-gold' : 'w-4 bg-off-white/30'}`}
                    aria-label={`Show image ${index + 1}`}
                 />
               ))}
            </div>

          </div>

          {/* Content */}
          <div className="space-y-8">
            <div ref={contentRef}>
              <h3 className="font-serif text-3xl lg:text-4xl text-off-white mb-6">
                Um Ambiente Criado para o Seu
                <span className="text-gold"> Bem-Estar</span>
              </h3>

              <p className="text-off-white/70 leading-relaxed mb-6">
                A Dental Boutique une tecnologia de ponta, um design moderno e um 
                atendimento humanizado para garantir que cada paciente receba um 
                tratamento exclusivo e personalizado.
              </p>

              <p className="text-off-white/60 leading-relaxed">
                Cada detalhe foi cuidadosamente pensado para proporcionar conforto, 
                acolhimento e a melhor experiência em odontologia estética. Desde 
                a recepção até o pós-tratamento, você será tratado com exclusividade 
                e atenção personalizada.
              </p>
            </div>

            {/* Features */}
            <div ref={featuresRef} className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="glass p-4 group hover:border-gold/30 transition-all duration-300"
                >
                  <feature.icon className="w-5 h-5 text-gold mb-3" />
                  <p className="text-off-white/50 text-xs uppercase tracking-wide mb-1">
                    {feature.label}
                  </p>
                  <p className="text-off-white text-sm">{feature.value}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-4">
              <button
                onClick={() => document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-4 border border-gold text-gold hover:bg-gold hover:text-deep-black transition-all duration-300"
                data-cursor-hover
              >
                Conheça Nossa Clínica
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Quote */}
        <div className="mt-24 text-center">
          <blockquote className="font-serif text-2xl lg:text-3xl text-off-white/80 italic max-w-3xl mx-auto">
            "Seu sorriso merece o melhor. Cada detalhe importa quando se trata da sua 
            <span className="text-gold"> autoestima</span>."
          </blockquote>
          <p className="text-gold mt-6 text-sm tracking-widest uppercase">
            — Dr. Marcel Ferreira
          </p>
        </div>
      </div>
    </section>
  );
};

export default Experience;
