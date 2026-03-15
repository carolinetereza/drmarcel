import { useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../sections/Footer';
import CustomCursor from '../components/CustomCursor';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import { Calendar } from '../components/ui/calendar';

const BookingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <CustomCursor />
      
      <div className="relative bg-deep-black min-h-screen pt-24">
        {/* Noise overlay for texture */}
        <div className="noise-overlay" />
        
        {/* Navigation */}
        <Navigation />

        <FloatingWhatsApp />
        
        {/* Main content */}
        <main className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-24 animate-in fade-in duration-1000">
          <div className="mb-12">
             <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-12 bg-gold/50" />
                <span className="text-gold text-xs tracking-[0.4em] uppercase font-light">
                  Agendamento Exclusivo
                </span>
             </div>
             <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl text-off-white mb-6">
               O Seu Sorriso, <br/>
               <span className="text-gold italic mt-2 inline-block">Nossa Prioridade</span>
             </h1>
          </div>

          <div className="mb-24">
            <Calendar />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BookingPage;
