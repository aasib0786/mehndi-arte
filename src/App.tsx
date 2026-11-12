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
import { captureAttribution } from '@/lib/attribution';
import { initTracking, trackPageView } from '@/lib/tracking';

import { HomePage } from '@/pages/HomePage';

// Lazy-loaded routes for code-splitting and faster initial page performance
const GalleryPage = React.lazy(() =>
  import('@/pages/GalleryPage').then((m) => ({ default: m.GalleryPage }))
);
const BridalMehndiPage = React.lazy(() =>
  import('@/pages/BridalMehndiPage').then((m) => ({ default: m.BridalMehndiPage }))
);
const MehndiPage = React.lazy(() =>
  import('@/pages/MehndiPage').then((m) => ({ default: m.MehndiPage }))
);
const MakeupPage = React.lazy(() =>
  import('@/pages/MakeupPage').then((m) => ({ default: m.MakeupPage }))
);
const ParlourPage = React.lazy(() =>
  import('@/pages/ParlourPage').then((m) => ({ default: m.ParlourPage }))
);
const BridalMakeupPage = React.lazy(() =>
  import('@/pages/BridalMakeupPage').then((m) => ({ default: m.BridalMakeupPage }))
);
const BridalComboPage = React.lazy(() =>
  import('@/pages/BridalComboPage').then((m) => ({ default: m.BridalComboPage }))
);
const ThankYouPage = React.lazy(() =>
  import('@/pages/ThankYouPage').then((m) => ({ default: m.ThankYouPage }))
);

// Fallback loader while route chunk loads
const RouteLoadingFallback: React.FC = () => (
  <div className="min-h-[50vh] flex items-center justify-center p-12" aria-label="Loading page">
    <div className="w-7 h-7 rounded-full border-2 border-gold/30 border-t-gold animate-spin" />
  </div>
);

// Register GSAP ScrollTrigger plugin once globally
gsap.registerPlugin(ScrollTrigger);

// Scroll to top and track page view on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    trackPageView(pathname);
  }, [pathname]);

  return null;
};

// Smooth scrolling orchestrator: Lenis connected with GSAP ScrollTrigger
const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // On touch devices / mobile, disable Lenis to ensure native 120Hz/60Hz hardware momentum scrolling without touch lag or CPU overhead
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
    if (prefersReducedMotion || isMobile) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.0,
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
      <React.Suspense fallback={<RouteLoadingFallback />}>
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
            path="/mehndi"
            element={
              <PageTransition>
                <MehndiPage />
              </PageTransition>
            }
          />
          <Route
            path="/makeup"
            element={
              <PageTransition>
                <MakeupPage />
              </PageTransition>
            }
          />
          <Route
            path="/parlour"
            element={
              <PageTransition>
                <ParlourPage />
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
            path="/services/bridal-makeup"
            element={
              <PageTransition>
                <BridalMakeupPage />
              </PageTransition>
            }
          />
          <Route
            path="/services/bridal-combo"
            element={
              <PageTransition>
                <BridalComboPage />
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
      </React.Suspense>
    </AnimatePresence>
  );
};

export const App: React.FC = () => {
  useEffect(() => {
    // Capture and persist UTMs, gclid, fbclid on first page visit
    captureAttribution();
    // Initialize Meta Pixel, GA4, and Google Ads tags conditionally
    initTracking();
  }, []);

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
