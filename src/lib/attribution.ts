/**
 * Attribution & Ad-Click Tracking Utility
 * Captures UTM parameters, Google Click ID (gclid), Facebook Click ID (fbclid),
 * and page referral context on first visit and persists them in sessionStorage.
 */

export interface AttributionData {
  pageUrl: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  gclid: string;
  fbclid: string;
  referrer: string;
  capturedAt: string;
}

const STORAGE_KEY = 'kashish_mehndi_attribution';

export function captureAttribution(): AttributionData {
  if (typeof window === 'undefined') {
    return {
      pageUrl: '',
      utm_source: '',
      utm_medium: '',
      utm_campaign: '',
      utm_term: '',
      utm_content: '',
      gclid: '',
      fbclid: '',
      referrer: '',
      capturedAt: new Date().toISOString(),
    };
  }

  try {
    const existing = sessionStorage.getItem(STORAGE_KEY);
    const url = new URL(window.location.href);
    const searchParams = url.searchParams;

    const utmSource = searchParams.get('utm_source') || '';
    const utmMedium = searchParams.get('utm_medium') || '';
    const utmCampaign = searchParams.get('utm_campaign') || '';
    const utmTerm = searchParams.get('utm_term') || '';
    const utmContent = searchParams.get('utm_content') || '';
    const gclid = searchParams.get('gclid') || '';
    const fbclid = searchParams.get('fbclid') || '';

    // If new ad/campaign params are present, or nothing stored yet, save to sessionStorage
    const hasIncomingCampaign = Boolean(utmSource || utmCampaign || gclid || fbclid);

    if (hasIncomingCampaign || !existing) {
      const data: AttributionData = {
        pageUrl: window.location.href,
        utm_source: utmSource || (existing ? JSON.parse(existing).utm_source : 'direct'),
        utm_medium: utmMedium || (existing ? JSON.parse(existing).utm_medium : ''),
        utm_campaign: utmCampaign || (existing ? JSON.parse(existing).utm_campaign : ''),
        utm_term: utmTerm || (existing ? JSON.parse(existing).utm_term : ''),
        utm_content: utmContent || (existing ? JSON.parse(existing).utm_content : ''),
        gclid: gclid || (existing ? JSON.parse(existing).gclid : ''),
        fbclid: fbclid || (existing ? JSON.parse(existing).fbclid : ''),
        referrer: document.referrer || (existing ? JSON.parse(existing).referrer : ''),
        capturedAt: new Date().toISOString(),
      };

      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return data;
    }

    return JSON.parse(existing);
  } catch (err) {
    console.warn('Unable to access sessionStorage for attribution:', err);
    return {
      pageUrl: typeof window !== 'undefined' ? window.location.href : '',
      utm_source: 'direct',
      utm_medium: '',
      utm_campaign: '',
      utm_term: '',
      utm_content: '',
      gclid: '',
      fbclid: '',
      referrer: typeof document !== 'undefined' ? document.referrer : '',
      capturedAt: new Date().toISOString(),
    };
  }
}

export function getStoredAttribution(): AttributionData {
  return captureAttribution();
}

