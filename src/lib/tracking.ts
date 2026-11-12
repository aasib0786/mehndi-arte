/**
 * Ads & Conversion Tracking Orchestrator
 * Integrates Meta Pixel (Facebook Ads), Google Analytics 4 (GA4),
 * and Google Ads Conversion Tag with conditional env loading.
 */

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
    _fbq?: any;
  }
}

export interface TrackLeadParams {
  name?: string;
  mobile?: string;
  occasion?: string;
  service_type?: string;
  serviceType?: string;
  eventDate?: string;
  location?: string;
  preferredPackage?: string;
  value?: number;
  currency?: string;
}

let trackingInitialized = false;

function isMetaActive(): boolean {
  const id = import.meta.env.VITE_META_PIXEL_ID?.trim();
  return Boolean(id && id !== '0000000000000000' && !id.includes('X') && id.length > 5);
}

function isGa4Active(): boolean {
  const id = import.meta.env.VITE_GA4_ID?.trim();
  return Boolean(id && !id.includes('X') && !id.includes('0000') && id.startsWith('G-'));
}

function isGadsActive(): boolean {
  const id = import.meta.env.VITE_GADS_ID?.trim();
  return Boolean(id && !id.includes('0000') && !id.includes('X') && (id.startsWith('AW-') || id.startsWith('DC-')));
}

/**
 * Loads Meta Pixel, GA4 and Google Ads tags dynamically only if valid env IDs exist.
 */
export function initTracking(): void {
  if (typeof window === 'undefined' || trackingInitialized) return;
  trackingInitialized = true;

  const metaPixelId = import.meta.env.VITE_META_PIXEL_ID?.trim();
  const ga4Id = import.meta.env.VITE_GA4_ID?.trim();
  const gadsId = import.meta.env.VITE_GADS_ID?.trim();

  // 1. Meta Pixel Initialization
  if (isMetaActive() && metaPixelId) {
    try {
      (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = true;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = true;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

      window.fbq?.('init', metaPixelId);
      window.fbq?.('track', 'PageView');
      console.info(`[Analytics] Meta Pixel (${metaPixelId}) active`);
    } catch (err) {
      console.warn('[Analytics] Meta Pixel initialization failed:', err);
    }
  }

  // 2. Google Analytics 4 & Google Ads Tag Initialization
  const primaryGoogleId = (isGa4Active() && ga4Id) || (isGadsActive() && gadsId);
  if (primaryGoogleId) {
    try {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${primaryGoogleId}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer?.push(args);
      }
      window.gtag = gtag;
      gtag('js', new Date());

      if (isGa4Active() && ga4Id) {
        gtag('config', ga4Id, { send_page_view: true });
        console.info(`[Analytics] GA4 (${ga4Id}) active`);
      }

      if (isGadsActive() && gadsId) {
        gtag('config', gadsId);
        console.info(`[Analytics] Google Ads (${gadsId}) active`);
      }
    } catch (err) {
      console.warn('[Analytics] Google tags initialization failed:', err);
    }
  }
}

/**
 * Fires on booking form submit:
 * - Meta "Lead" (content_category = service type)
 * - GA4 "generate_lead" (service_type param)
 * - Google Ads conversion with VITE_GADS_CONVERSION_LABEL
 *
 * Accepts either an object (TrackLeadParams) or a string representing service_type.
 */
export function trackLead(params?: TrackLeadParams | string): void {
  let p: TrackLeadParams = {};
  if (typeof params === 'string') {
    p = { service_type: params, occasion: params };
  } else if (params) {
    p = params;
  }

  const serviceType = p.service_type || p.serviceType || p.occasion || 'Bridal';

  // Estimate lead monetary value in INR based on package or category benchmark
  let leadValue = 25000;
  if (p.preferredPackage) {
    if (p.preferredPackage.includes('55,000')) leadValue = 55000;
    else if (p.preferredPackage.includes('35,000')) leadValue = 35000;
    else if (p.preferredPackage.includes('32,000')) leadValue = 32000;
    else if (p.preferredPackage.includes('25,000')) leadValue = 25000;
    else if (p.preferredPackage.includes('22,000')) leadValue = 22000;
    else if (p.preferredPackage.includes('21,000')) leadValue = 21000;
    else if (p.preferredPackage.includes('15,000')) leadValue = 15000;
    else if (p.preferredPackage.includes('8,500')) leadValue = 8500;
  } else if (serviceType.toLowerCase().includes('parlour')) {
    leadValue = 4500;
  }

  const payload = {
    content_name: p.preferredPackage || p.occasion || `${serviceType} Commission`,
    content_category: serviceType, // content_category = service type
    currency: p.currency || 'INR',
    value: p.value || leadValue,
  };

  // 1. Meta Pixel Lead
  if (window.fbq && isMetaActive()) {
    try {
      window.fbq('track', 'Lead', payload);
      console.info('[Tracking] Meta Pixel "Lead" event dispatched', payload);
    } catch (e) {
      console.warn('[Tracking] Meta Pixel Lead error:', e);
    }
  }

  // 2. GA4 generate_lead
  if (window.gtag && isGa4Active()) {
    try {
      window.gtag('event', 'generate_lead', {
        event_category: 'Leads',
        event_label: p.preferredPackage || p.occasion || serviceType,
        service_type: serviceType, // service_type param
        value: payload.value,
        currency: payload.currency,
      });
      console.info('[Tracking] GA4 "generate_lead" event dispatched with service_type:', serviceType);
    } catch (e) {
      console.warn('[Tracking] GA4 generate_lead error:', e);
    }
  }

  // 3. Google Ads Conversion
  const gadsId = import.meta.env.VITE_GADS_ID?.trim();
  const conversionLabel = import.meta.env.VITE_GADS_CONVERSION_LABEL?.trim();
  if (window.gtag && isGadsActive() && gadsId && conversionLabel) {
    try {
      window.gtag('event', 'conversion', {
        send_to: `${gadsId}/${conversionLabel}`,
        value: payload.value,
        currency: payload.currency,
      });
      console.info(`[Tracking] Google Ads conversion dispatched to ${gadsId}/${conversionLabel}`);
    } catch (e) {
      console.warn('[Tracking] Google Ads conversion error:', e);
    }
  }

  // Local development debug log
  if (import.meta.env.DEV) {
    console.log('[Dev Analytics] trackLead() fired:', {
      ...payload,
      service_type: serviceType,
    });
  }
}

/**
 * Fires on every WhatsApp button click:
 * - Meta "Contact" (content_category = service_type)
 * - GA4 "whatsapp_click" (with service_type)
 */
export function trackWhatsAppClick(
  label: string = 'WhatsApp Button',
  service_type?: string
): void {
  const serviceType = service_type || 'General Inquiry';

  // 1. Meta Pixel Contact
  if (window.fbq && isMetaActive()) {
    try {
      window.fbq('track', 'Contact', {
        content_name: label,
        content_category: serviceType,
      });
      console.info(`[Tracking] Meta Pixel "Contact" dispatched (${label}, service_type: ${serviceType})`);
    } catch (e) {
      console.warn('[Tracking] Meta Contact error:', e);
    }
  }

  // 2. GA4 whatsapp_click
  if (window.gtag && isGa4Active()) {
    try {
      window.gtag('event', 'whatsapp_click', {
        event_category: 'engagement',
        event_label: label,
        service_type: serviceType,
      });
      console.info(`[Tracking] GA4 "whatsapp_click" dispatched (${label}, service_type: ${serviceType})`);
    } catch (e) {
      console.warn('[Tracking] GA4 whatsapp_click error:', e);
    }
  }

  if (import.meta.env.DEV) {
    console.log(`[Dev Analytics] trackWhatsAppClick(): label="${label}", service_type="${serviceType}"`);
  }
}

/**
 * Fires PageView on route changes (usable as URL-based conversion on /thank-you)
 */
export function trackPageView(pagePath?: string): void {
  const currentPath = pagePath || (typeof window !== 'undefined' ? window.location.pathname : '');

  if (window.fbq && isMetaActive()) {
    try {
      window.fbq('track', 'PageView');
      console.info(`[Tracking] Meta PageView dispatched for ${currentPath}`);
    } catch (e) {
      console.warn('[Tracking] Meta PageView error:', e);
    }
  }

  if (window.gtag && isGa4Active()) {
    try {
      window.gtag('event', 'page_view', {
        page_path: currentPath,
      });
      console.info(`[Tracking] GA4 page_view dispatched for ${currentPath}`);
    } catch (e) {
      console.warn('[Tracking] GA4 PageView error:', e);
    }
  }

  if (import.meta.env.DEV) {
    console.log(`[Dev Analytics] trackPageView(): "${currentPath}"`);
  }
}
