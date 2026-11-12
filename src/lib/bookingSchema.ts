import { z } from 'zod';

export const serviceTypeOptions = [
  'Mehndi',
  'Makeup',
  'Parlour',
  'Bridal Combo (Mehndi + Makeup)',
] as const;

export type ServiceTypeOption = (typeof serviceTypeOptions)[number];

export const whereOptions = [
  'At Home / Venue',
  'At Studio',
] as const;

export type WhereOption = (typeof whereOptions)[number];

export const timeSlotOptions = [
  'Morning (09:00 AM – 12:00 PM)',
  'Afternoon (12:00 PM – 03:00 PM)',
  'Evening (03:00 PM – 06:00 PM)',
  'Night (06:00 PM – 08:30 PM)',
  'Early Dawn Pheras (Before 07:00 AM)',
] as const;

export const peopleOptions = [
  '1 Person (Only Bride / Client)',
  '2–5 People (Bride + Close Family)',
  '6–10 People (Bridal Party)',
  '10–20 People (Sangeet / Haldi Gathering)',
  '20+ People (Large Gathering / Destination)',
] as const;

/**
 * Normalizes Indian phone number by stripping spaces, hyphens, and leading 91 or 0
 */
export function normalizeIndianMobile(raw: string): string {
  const cleaned = raw.replace(/\D/g, '');
  if (cleaned.length === 12 && cleaned.startsWith('91')) {
    return cleaned.slice(2);
  }
  if (cleaned.length === 11 && cleaned.startsWith('0')) {
    return cleaned.slice(1);
  }
  return cleaned;
}

export const bookingFormSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, { message: 'Please enter your full name (at least 2 characters)' })
      .max(80, { message: 'Name cannot exceed 80 characters' }),

    mobile: z
      .string()
      .trim()
      .min(10, { message: 'Please enter a 10-digit mobile number' })
      .refine(
        (val) => {
          const normalized = normalizeIndianMobile(val);
          return /^[6-9]\d{9}$/.test(normalized);
        },
        { message: 'Please enter a valid 10-digit Indian mobile number (starts with 6, 7, 8, or 9)' }
      ),

    serviceType: z.enum(serviceTypeOptions, {
      errorMap: () => ({ message: 'Please select a service type' }),
    }),

    service: z
      .string()
      .min(1, { message: 'Please select a specific service' }),

    eventDate: z
      .string()
      .min(1, { message: 'Please select your celebration date' })
      .refine(
        (val) => {
          if (!val) return false;
          const selected = new Date(val + 'T00:00:00');
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return selected >= today;
        },
        { message: 'Event date cannot be in the past. Please select today or an upcoming date.' }
      ),

    preferredTimeSlot: z.string().optional().default(''),

    where: z.enum(whereOptions, {
      errorMap: () => ({ message: 'Please specify where service is needed' }),
    }),

    location: z.string().optional().default(''),

    numberOfPeople: z
      .string()
      .min(1, { message: 'Please select estimated number of people' }),

    preferredPackage: z.string().optional().default(''),

    notes: z
      .string()
      .max(500, { message: 'Notes cannot exceed 500 characters' })
      .optional()
      .default(''),

    // Hidden tracking & attribution fields
    pageUrl: z.string().optional().default(''),
    utm_source: z.string().optional().default(''),
    utm_medium: z.string().optional().default(''),
    utm_campaign: z.string().optional().default(''),
    gclid: z.string().optional().default(''),
    fbclid: z.string().optional().default(''),
  })
  .superRefine((data, ctx) => {
    // 1. Time slot is strictly required for Parlour services
    if (data.serviceType === 'Parlour' && (!data.preferredTimeSlot || data.preferredTimeSlot.trim() === '')) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['preferredTimeSlot'],
        message: 'Preferred time slot is required for studio parlour appointments',
      });
    }

    // 2. If 'At Home / Venue' is chosen, location field must be provided
    if (data.where === 'At Home / Venue' && (!data.location || data.location.trim().length < 2)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['location'],
        message: 'Please enter your home address or venue area',
      });
    }
  });

export type BookingFormData = z.infer<typeof bookingFormSchema>;
