import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { brandConfig, getWhatsAppBookingLink } from '@/lib/config';
import { trackWhatsAppClick } from '@/lib/tracking';
import { PaisleyMotif, MandalaMotif } from '@/components/motifs';

interface NavLinkItem {
  label: string;
  path: string;
}

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

  // Monitor scroll state for compact ivory blur transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  // Close mobile menu upon route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname, location.hash]);

  // Check if current route is the dedicated Ad Landing Page
  const isAdLandingPage = location.pathname === '/services/bridal-mehndi';

  const navLinks: NavLinkItem[] = [
    { label: 'Home', path: '/' },
    { label: 'Mehndi', path: '/mehndi' },
    { label: 'Makeup', path: '/makeup' },
    { label: 'Parlour', path: '/parlour' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Packages', path: '/#packages' },
    { label: 'Contact', path: '/#contact' },
  ];

  // Helper for scroll to anchor if on current page
  const handleAnchorClick = (path: string) => {
    setIsMobileOpen(false);
    if (path.includes('#')) {
      const [routePath, anchor] = path.split('#');
      if (location.pathname === routePath || (routePath === '' && location.pathname === '/')) {
        const el = document.getElementById(anchor);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  // Framer Motion variants for mobile menu
  const menuVariants = {
    closed: {
      opacity: 0,
      y: '-100%',
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
      },
    },
    open: {
      opacity: 1,
      y: '0%',
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  const navListVariants = {
    closed: {
      transition: { staggerChildren: 0.04, staggerDirection: -1 },
    },
    open: {
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, y: 25 },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.25, 1, 0.5, 1] },
    },
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-ivory/90 backdrop-blur-md shadow-fine py-3.5 border-b border-gold/30'
            : 'bg-ivory/70 backdrop-blur-sm py-5 border-b border-gold/15'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
          {/* Logo Left */}
          <Link
            to="/"
            onClick={() => handleAnchorClick('/')}
            className="group flex items-center gap-3 text-left focus:outline-none"
            aria-label={`${brandConfig.brandName} Atelier`}
          >
            <PaisleyMotif
              size={isScrolled ? 30 : 36}
              className="text-gold transition-all duration-500 group-hover:rotate-6 group-hover:scale-105"
            />
            <div>
              <span
                className={`block font-serif text-henna font-medium tracking-tight leading-none max-w-[190px] min-[400px]:max-w-[240px] sm:max-w-none truncate sm:overflow-visible transition-all duration-300 ${
                  isScrolled ? 'text-lg sm:text-xl' : 'text-lg sm:text-2xl'
                }`}
              >
                {brandConfig.brandName}
              </span>
              <span className="block font-vibes text-sm text-gold-dark mt-0.5 leading-none">
                Mehndi &bull; Makeup &bull; Parlour
              </span>
            </div>
          </Link>

          {/* Navigation Controls: Either Minimal Ad Header or Full Atelier Nav */}
          {isAdLandingPage ? (
            /* Minimal Header for Meta / Google Ads Traffic: WhatsApp Only (No Nav Links) */
            <div className="flex items-center gap-3">
              <a
                href={getWhatsAppBookingLink('Bridal Mehndi Ad Offer')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('Ad Header WhatsApp Button')}
                className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 text-[11px] sm:text-xs uppercase tracking-[0.18em] text-ivory bg-henna hover:bg-henna-dark border border-gold transition-all duration-300 shadow-fine group"
              >
                <span className="text-gold">✦</span>
                <span className="hidden sm:inline">WhatsApp Concierge</span>
                <span className="sm:hidden">WhatsApp</span>
                <span className="text-gold group-hover:translate-x-0.5 transition-transform duration-300">↗</span>
              </a>
            </div>
          ) : (
            <>
              {/* Desktop Navigation Links */}
              <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
                {navLinks.map((link) => {
                  const isBaseRoute = !link.path.includes('#');
                  const isActive = isBaseRoute && location.pathname === link.path;

                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => handleAnchorClick(link.path)}
                      className={`text-xs uppercase tracking-[0.2em] transition-colors duration-300 relative py-1 ${
                        isActive
                          ? 'text-henna font-semibold'
                          : 'text-charcoal-muted hover:text-henna'
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gold" />
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* Desktop "Book Now" Gold-Outlined Button */}
              <div className="hidden sm:flex items-center gap-4">
                <a
                  href={getWhatsAppBookingLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick('Navbar Book Now Button')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-henna bg-transparent hover:bg-henna hover:text-ivory border border-gold hover:border-henna transition-all duration-300 shadow-fine group"
                >
                  <span>Book Now</span>
                  <span className="text-gold group-hover:text-gold-light group-hover:translate-x-0.5 transition-transform duration-300">
                    ✦
                  </span>
                </a>
              </div>

              {/* Mobile Hamburger Toggle Button (48px accessible touch target) */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden relative z-50 p-2 min-w-[48px] min-h-[48px] flex items-center justify-center text-charcoal hover:text-henna focus:outline-none touch-manipulation"
                aria-label="Toggle navigation menu"
                aria-expanded={isMobileOpen}
              >
                <div className="w-6 h-5 flex flex-col justify-between items-end">
                  <span
                    className={`h-[1.5px] bg-charcoal transition-all duration-300 origin-right ${
                      isMobileOpen ? '-rotate-45 -translate-x-0.5 -translate-y-1 bg-ivory w-6' : 'w-6'
                    }`}
                  />
                  <span
                    className={`h-[1.5px] bg-charcoal transition-all duration-300 ${
                      isMobileOpen ? 'opacity-0' : 'w-4'
                    }`}
                  />
                  <span
                    className={`h-[1.5px] bg-charcoal transition-all duration-300 origin-right ${
                      isMobileOpen ? 'rotate-45 -translate-x-0.5 translate-y-1 bg-ivory w-6' : 'w-5'
                    }`}
                  />
                </div>
              </button>
            </>
          )}
        </div>
      </header>

      {/* Full-Screen Maroon Mobile Menu (only on non-ad pages) */}
      {!isAdLandingPage && (
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed inset-0 z-40 bg-henna text-ivory flex flex-col justify-between p-6 sm:p-12 overflow-y-auto lg:hidden"
            >
              {/* Background Watermark Mandala */}
              <div className="absolute -right-24 -bottom-24 text-gold/10 pointer-events-none rotate-12">
                <MandalaMotif size={380} />
              </div>

              {/* Mobile Top Header Spacer */}
              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center gap-3">
                  <PaisleyMotif size={32} className="text-gold" />
                  <span className="font-serif text-xl text-ivory">{brandConfig.brandName}</span>
                </div>
              </div>

              {/* Staggered Navigation Links */}
              <motion.nav
                variants={navListVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="py-12 space-y-5"
              >
                {navLinks.map((link) => (
                  <motion.div key={link.path} variants={itemVariants}>
                    <Link
                      to={link.path}
                      onClick={() => handleAnchorClick(link.path)}
                      className="group block font-serif text-3xl sm:text-4xl text-ivory hover:text-gold transition-colors duration-300 tracking-wide"
                    >
                      <span className="inline-flex items-center gap-3">
                        <span className="text-xs font-sans text-gold/50 group-hover:text-gold transition-colors">
                          —
                        </span>
                        <span>{link.label}</span>
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>

              {/* Mobile Footer & Book Now CTA */}
              <div className="space-y-5 pt-6 border-t border-gold/25 relative z-10">
                <a
                  href={getWhatsAppBookingLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick('Mobile Menu Book Now Button')}
                  className="w-full block py-3.5 text-center text-xs uppercase tracking-[0.22em] text-ivory bg-transparent hover:bg-ivory hover:text-henna border border-gold transition-all duration-300"
                >
                  Book Now via WhatsApp ↗
                </a>

                {/* Studio Address & Timings */}
                <div className="p-3.5 bg-black/20 border border-gold/20 text-xs space-y-1.5 font-light">
                  <div className="flex items-center gap-1.5 text-gold text-[11px] uppercase tracking-wider font-medium">
                    <span>✦</span>
                    <span>Studio Address</span>
                  </div>
                  <p className="text-[11px] text-ivory/80 leading-relaxed">
                    {brandConfig.studioAddress}
                  </p>
                  <div className="text-[10px] text-gold-light/90 pt-0.5">
                    Timings: {brandConfig.studioTimings}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-ivory/60 gap-1.5 pt-1">
                  <span>{brandConfig.city} &bull; Home &amp; Venue Visits</span>
                  <span className="text-gold/90 font-medium">{brandConfig.phoneDisplay}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
};
