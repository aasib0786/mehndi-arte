import { brandConfig } from './config';
import { BookingFormData, normalizeIndianMobile } from './bookingSchema';
import { trackWhatsAppClick } from './tracking';

/**
 * Formats booking enquiry data into the required WhatsApp message template:
 *
 * New Booking Enquiry
 * Service Type: ...
 * Service: ...
 * Name: ...
 * Mobile: ...
 * Date: ... | Time: ...
 * Where: ...
 * Location: ...
 * People: ...
 * Package: ...
 * Message: ...
 * Source: utm_source / utm_campaign
 */
export function formatWhatsAppBookingMessage(data: BookingFormData): string {
  const normalizedMobile = normalizeIndianMobile(data.mobile);
  const sourcePart = data.utm_campaign
    ? `${data.utm_source || 'direct'} / ${data.utm_campaign}`
    : data.utm_source || 'direct';

  const timeDisplay = data.preferredTimeSlot?.trim() || 'Flexible';
  const locationDisplay =
    data.where === 'At Studio'
      ? 'At Studio (Greater Kailash I, New Delhi)'
      : data.location?.trim() || 'To be shared';

  const lines = [
    'New Booking Enquiry',
    `Service Type: ${data.serviceType}`,
    `Service: ${data.service || 'General Enquiry'}`,
    `Name: ${data.fullName.trim()}`,
    `Mobile: +91 ${normalizedMobile}`,
    `Date: ${data.eventDate} | Time: ${timeDisplay}`,
    `Where: ${data.where}`,
    `Location: ${locationDisplay}`,
    `People: ${data.numberOfPeople}`,
    `Package: ${data.preferredPackage?.trim() || 'Not specified'}`,
    `Message: ${data.notes?.trim() || 'None'}`,
    `Source: ${sourcePart}`,
  ];

  return lines.join('\n');
}

/**
 * Opens WhatsApp with the pre-filled encoded message.
 * Opens in same tab on mobile devices (for native app handoff) and new tab on desktop.
 */
export function openWhatsAppEnquiry(
  message: string,
  label: string = 'WhatsApp Enquiry',
  service_type?: string
): void {
  // Fire Meta "Contact" & GA4 "whatsapp_click" with service_type
  trackWhatsAppClick(label, service_type);

  const url = `https://wa.me/${brandConfig.whatsAppNumber}?text=${encodeURIComponent(message)}`;

  if (typeof window === 'undefined') return;

  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    window.innerWidth < 768;

  if (isMobile) {
    // On mobile, navigating the current tab reliably triggers the installed WhatsApp app
    window.location.href = url;
  } else {
    // On desktop, open WhatsApp Web in a separate tab
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}

/**
 * Dispatches lead payload to the Google Sheet or CRM webhook URL in the background.
 * Uses mode 'no-cors' so cross-origin Google Apps Script webhooks succeed without CORS blocking.
 * If VITE_LEADS_WEBHOOK_URL is unset or contains 'example.com', skips silently.
 */
export async function dispatchLeadWebhook(data: BookingFormData): Promise<void> {
  const webhookUrl = import.meta.env.VITE_LEADS_WEBHOOK_URL;

  if (!webhookUrl || typeof webhookUrl !== 'string' || webhookUrl.trim() === '' || webhookUrl.includes('example.com')) {
    return;
  }

  try {
    const payload = {
      Timestamp: new Date().toISOString(),
      Name: data.fullName.trim(),
      Mobile: `+91 ${normalizeIndianMobile(data.mobile)}`,
      ServiceType: data.serviceType,
      Service: data.service,
      Occasion: data.serviceType,
      EventDate: data.eventDate,
      TimeSlot: data.preferredTimeSlot || 'Flexible',
      Where: data.where,
      Location: data.where === 'At Studio' ? 'At Studio (GK-1, New Delhi)' : (data.location?.trim() || ''),
      People: data.numberOfPeople,
      Package: data.preferredPackage || '',
      Message: data.notes?.trim() || '',
      PageUrl: data.pageUrl || window.location.href,
      utm_source: data.utm_source || '',
      utm_medium: data.utm_medium || '',
      utm_campaign: data.utm_campaign || '',
      gclid: data.gclid || '',
      fbclid: data.fbclid || '',
    };

    await fetch(webhookUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    // Fail silently in background as required
    console.info('Webhook background dispatch notice (handled):', error);
  }
}
