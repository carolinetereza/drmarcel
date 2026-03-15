import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const Navigation = () => {
  const navRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Show nav after scrolling past hero
      ScrollTrigger.create({
        trigger: document.body,
        start: '100vh top',
        onEnter: () => setIsVisible(true),
        onLeaveBack: () => setIsVisible(false),
      });
    });

    return () => ctx.revert();
  }, []);

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    
    if (sectionId === 'calendar') {
      navigate('/agendamento');
      return;
    }

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: 'Home', id: 'hero' },
    { label: 'Filosofia', id: 'philosophy' },
    { label: 'Transformações', id: 'transformations' },
    { label: 'Depoimentos', id: 'testimonials' },
    { label: 'Agendamento', id: 'calendar' },
  ];

  return (
    <>
      {/* Fixed Navigation */}
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        <div className="glass">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <button
                onClick={() => scrollToSection('hero')}
                className="h-10"
                data-cursor-hover
              >
                <img
                  src="/images/logo-header.png"
                  alt="Dr. Marcel Ferreira"
                  className="h-full w-auto object-contain"
                />
              </button>

              {/* Desktop Nav */}
              <div className="hidden lg:flex items-center gap-8">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-off-white/80 hover:text-gold text-sm tracking-wide transition-colors duration-300"
                    data-cursor-hover
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* CTA Button */}
              <button
                onClick={() => scrollToSection('calendar')}
                className="hidden lg:block px-6 py-2 border border-gold/50 text-gold text-sm tracking-wide hover:bg-gold hover:text-deep-black transition-all duration-300"
                data-cursor-hover
              >
                Agendar Consulta
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden text-off-white p-2"
                data-cursor-hover
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden absolute top-full left-0 right-0 glass transition-all duration-500 ${
            isMenuOpen
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
        >
          <div className="px-6 py-8 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left text-off-white/80 hover:text-gold text-lg tracking-wide py-2 transition-colors duration-300"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('calendar')}
              className="w-full mt-6 px-6 py-3 border border-gold/50 text-gold text-sm tracking-wide hover:bg-gold hover:text-deep-black transition-all duration-300"
            >
              Agendar Consulta
            </button>
          </div>
        </div>
      </nav>

      {/* Always visible logo on hero */}
      <div
        className={`fixed top-8 left-6 lg:left-12 z-40 transition-opacity duration-500 ${
          isVisible ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <img
          src="/images/logo-header.png"
          alt="Dr. Marcel Ferreira"
          className="h-12 w-auto object-contain"
        />
      </div>
    </>
  );
};

export default Navigation;
