import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Layout } from '@/components/common/Layout';
import { Preloader } from '@/components/common/Preloader';
import { PageTransition } from '@/components/common/PageTransition';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { BookingProvider } from '@/context/BookingContext';

import { HomePage } from '@/pages/HomePage';
import { GalleryPage } from '@/pages/GalleryPage';
import { BridalMehndiPage } from '@/pages/BridalMehndiPage';
import { ThankYouPage } from '@/pages/ThankYouPage';

// Register GSAP ScrollTrigger plugin once globally
gsap.registerPlugin(ScrollTrigger);

// Scroll to top on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Smooth scrolling orchestrator: Lenis connected with GSAP ScrollTrigger
const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // If user prefers reduced motion, disable custom smooth scrolling
    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    // Synchronize Lenis scroll position with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Sync GSAP ticker with Lenis raf
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, [prefersReducedMotion]);

  return <>{children}</>;
};

// Animated route transitions with Maroon Curtain Wipe
const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <HomePage />
            </PageTransition>
          }
        />
        <Route
          path="/gallery"
          element={
            <PageTransition>
              <GalleryPage />
            </PageTransition>
          }
        />
        <Route
          path="/services/bridal-mehndi"
          element={
            <PageTransition>
              <BridalMehndiPage />
            </PageTransition>
          }
        />
        <Route
          path="/thank-you"
          element={
            <PageTransition>
              <ThankYouPage />
            </PageTransition>
          }
        />
        <Route
          path="*"
          element={
            <PageTransition>
              <HomePage />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export const App: React.FC = () => {
  return (
    <HelmetProvider>
      <BookingProvider>
        <SmoothScroll>
          <Preloader />
          <Router>
            <ScrollToTop />
            <Layout>
              <AnimatedRoutes />
            </Layout>
          </Router>
        </SmoothScroll>
      </BookingProvider>
    </HelmetProvider>
  );
};

export default App;
