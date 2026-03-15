import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, ArrowUpRight, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // CTA reveal
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 60 },
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
              start: 'top 85%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="footer"
      ref={sectionRef}
      className="relative pt-24 lg:pt-32 pb-8"
    >
      {/* CTA Section */}
      <div ref={ctaRef} className="max-w-4xl mx-auto px-6 lg:px-12 text-center mb-24">
        <span className="text-gold text-sm tracking-[0.3em] uppercase">
          Agende Sua Consulta
        </span>
        <h2 className="font-serif text-4xl lg:text-6xl text-off-white mt-6 mb-8 uppercase">
          Agende Sua Consulta
          <span className="text-gold block">Agora</span>
        </h2>
        <p className="text-off-white/60 max-w-xl mx-auto mb-10">
          Entre em contato e descubra como podemos criar o sorriso dos seus sonhos 
          com exclusividade e excelência.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/5511999199200"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-10 py-4 bg-gold text-deep-black font-medium tracking-wide hover:bg-gold-light transition-all duration-300 btn-glow inline-flex items-center justify-center gap-2"
            data-cursor-hover
          >
            <span>Agendar pelo WhatsApp</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </a>
          <a
            href="tel:+551130689947"
            className="px-10 py-4 border border-off-white/30 text-off-white tracking-wide hover:border-gold hover:text-gold transition-all duration-300"
            data-cursor-hover
          >
            Ligar Agora
          </a>
        </div>
      </div>

      {/* Main Footer Content */}
      <div ref={contentRef} className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-off-white/10">
          {/* Brand */}
          <div className="lg:col-span-1 border-r-0 lg:border-r border-off-white/10 pr-6">
            <img src="/images/logo.png" alt="Logo" className="w-[120px] h-auto object-contain mb-4" />
            <p className="text-off-white/40 text-sm mt-4 leading-relaxed">
              Referência nacional em odontologia estética e especialista em 
              lentes de contato dental.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-off-white text-sm tracking-widest uppercase mb-6">
              Contato
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-off-white/60 hover:text-gold transition-colors duration-300"
                  data-cursor-hover
                >
                  <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">
                    Av. Nove de Julho, 3624 Jardim Paulista
                    <br />
                    São Paulo / SP
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+551130689947"
                  className="flex items-center gap-3 text-off-white/60 hover:text-gold transition-colors duration-300"
                  data-cursor-hover
                >
                  <Phone className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">(11) 3068-9947</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/5511999199200"
                  className="flex items-center gap-3 text-off-white/60 hover:text-gold transition-colors duration-300"
                  data-cursor-hover
                >
                  <Phone className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">(11) 9.9919-9200</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:dentalboutiqueadm@gmail.com"
                  className="flex items-center gap-3 text-off-white/60 hover:text-gold transition-colors duration-300"
                  data-cursor-hover
                >
                  <Mail className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">dentalboutiqueadm@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-off-white text-sm tracking-widest uppercase mb-6">
              HORÁRIO DE ATENDIMENTO
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-off-white/60">
                <Clock className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-off-white">Segunda a sexta:</p>
                  <p>09:00AM - 18:00PM</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-off-white/40">
                <Clock className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p>Sábado e Domingo</p>
                  <p>Fechado</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-off-white text-sm tracking-widest uppercase mb-6">
              Newsletter
            </h4>
            <p className="text-off-white/50 text-sm mb-4">
              Receba dicas e novidades sobre odontologia estética.
            </p>
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu e-mail"
                className="w-full bg-transparent border border-off-white/20 px-4 py-3 text-off-white text-sm placeholder:text-off-white/30 focus:border-gold focus:outline-none transition-colors duration-300"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gold hover:text-gold-light transition-colors duration-300"
                data-cursor-hover
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            {isSubmitted && (
              <p className="text-gold text-xs mt-2">Obrigado por se inscrever!</p>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <p className="text-off-white/40 text-sm">
            © {new Date().getFullYear()} Marcel Ferreira. Todos os direitos reservados.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {[
              { icon: Instagram, href: 'https://www.instagram.com/drmarcelferreira/' },
              { icon: Facebook, href: 'https://www.facebook.com/drmarcelferreira' },
              { icon: Phone, href: 'https://wa.me/5511999199200' },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="w-10 h-10 rounded-full border border-off-white/20 flex items-center justify-center text-off-white/60 hover:border-gold hover:text-gold transition-all duration-300"
                data-cursor-hover
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-off-white/40 hover:text-gold transition-colors duration-300 text-sm"
            data-cursor-hover
          >
            <span>Voltar ao topo</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </footer>
  );
};

export default Footer;
