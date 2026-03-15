import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Sections
import Hero from '../sections/Hero';
import Philosophy from '../sections/Philosophy';
import Transformations from '../sections/Transformations';
import Services from '../sections/Services';
import Experience from '../sections/Experience';
import Testimonials from '../sections/Testimonials';
import CalendarSection from '../sections/Calendar';
import Footer from '../sections/Footer';
import CustomCursor from '../components/CustomCursor';
import LoadingScreen from '../components/LoadingScreen';
import Navigation from '../components/Navigation';
import FloatingWhatsApp from '../components/FloatingWhatsApp';

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate loading time for assets
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      // Initialize smooth scroll animations
      const ctx = gsap.context(() => {
        // Refresh ScrollTrigger after loading
        ScrollTrigger.refresh();
      }, mainRef);

      return () => ctx.revert();
    }
  }, [isLoading]);

  return (
    <>
      {isLoading && <LoadingScreen />}
      
      <CustomCursor />
      
      <div ref={mainRef} className="relative bg-deep-black min-h-screen">
        {/* Noise overlay for texture */}
        <div className="noise-overlay" />
        
        {/* Navigation */}
        <Navigation />

        <FloatingWhatsApp />
        
        {/* Main content */}
        <main className="relative">
          <Hero />
          <Philosophy />
          <Transformations />
          <Services />
          <Experience />
          <Testimonials />
          <CalendarSection />
          <Footer />
        </main>
      </div>
    </>
  );
};

export default HomePage;
