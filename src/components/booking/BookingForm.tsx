import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import {
  bookingFormSchema,
  BookingFormData,
  serviceTypeOptions,
  ServiceTypeOption,
  whereOptions,
  timeSlotOptions,
  peopleOptions,
  normalizeIndianMobile,
} from '@/lib/bookingSchema';
import { services } from '@/data/services';
import { mehndiPackages, makeupPackages, comboPackages } from '@/data/packages';
import { getStoredAttribution } from '@/lib/attribution';
import {
  formatWhatsAppBookingMessage,
  openWhatsAppEnquiry,
  dispatchLeadWebhook,
} from '@/lib/bookingService';
import { trackLead } from '@/lib/tracking';
import { useBooking } from '@/context/BookingContext';
import { MandalaMotif, PaisleyMotif, BrushStrokeFlourish } from '@/components/motifs';

interface BookingFormProps {
  className?: string;
  defaultServiceType?: 'mehndi' | 'makeup' | 'parlour' | 'combo';
  onSuccess?: () => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  className = '',
  defaultServiceType,
  onSuccess,
}) => {
  const navigate = useNavigate();
  const { selectedItem, clearSelection } = useBooking();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Minimum allowed date is today
  const todayStr = new Date().toISOString().split('T')[0];

  // Resolve default service type string
  const resolvedDefaultServiceType: ServiceTypeOption = useMemo(() => {
    if (defaultServiceType === 'makeup') return 'Makeup';
    if (defaultServiceType === 'parlour') return 'Parlour';
    if (defaultServiceType === 'combo') return 'Bridal Combo (Mehndi + Makeup)';
    return 'Mehndi';
  }, [defaultServiceType]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      fullName: '',
      mobile: '',
      serviceType: resolvedDefaultServiceType,
      service: '',
      eventDate: '',
      preferredTimeSlot: '',
      where: resolvedDefaultServiceType === 'Parlour' ? 'At Studio' : 'At Home / Venue',
      location: '',
      numberOfPeople: peopleOptions[0],
      preferredPackage: '',
      notes: '',
      pageUrl: '',
      utm_source: '',
      utm_medium: '',
      utm_campaign: '',
      gclid: '',
      fbclid: '',
    },
  });

  const currentServiceType = watch('serviceType');
  const currentWhere = watch('where');

  // Filter available services based on chosen Service Type
  const availableServices = useMemo(() => {
    if (currentServiceType === 'Mehndi') {
      return services.filter((s) => s.category === 'mehndi');
    }
    if (currentServiceType === 'Makeup') {
      return services.filter((s) => s.category === 'makeup');
    }
    if (currentServiceType === 'Parlour') {
      return services.filter((s) => s.category === 'parlour');
    }
    // Combo
    return [
      { id: 'combo-essentials', title: 'Bridal Essentials Duo (Mehndi + HD Makeup)', startingPrice: '₹32,000' },
      { id: 'combo-imperial', title: 'Imperial Royal Trio (Mehndi + Airbrush + Pre-Bridal)', startingPrice: '₹48,000' },
      { id: 'combo-noor', title: 'Noor-e-Kashish Luxury Trousseau (Full Experience)', startingPrice: '₹75,000' },
      { id: 'combo-custom', title: 'Custom Curated Bridal Combo', startingPrice: 'On Request' },
    ];
  }, [currentServiceType]);

  // Filter available packages based on chosen Service Type
  const availablePackages = useMemo(() => {
    if (currentServiceType === 'Mehndi') {
      return mehndiPackages.map((p) => `${p.name} (${p.price})`);
    }
    if (currentServiceType === 'Makeup') {
      return makeupPackages.map((p) => `${p.name} (${p.price})`);
    }
    if (currentServiceType === 'Parlour') {
      return [
        '7-Day Imperial Pre-Bridal Package (₹24,999)',
        'O3+ Bridal Illumination Facial Ritual (₹4,500)',
        'Full Body Honey & Milk Polishing (₹6,500)',
        'RICA Waxing & Spa Mani-Pedi Bundle (₹4,800)',
        'Custom Parlour Treatment Bundle',
      ];
    }
    return comboPackages.map((p) => `${p.name} (${p.price})`);
  }, [currentServiceType]);

  // Set default service whenever serviceType changes if current service doesn't belong
  useEffect(() => {
    if (availableServices.length > 0) {
      setValue('service', availableServices[0].title);
    }
    if (currentServiceType === 'Parlour') {
      setValue('where', 'At Studio');
    }
  }, [currentServiceType, availableServices, setValue]);

  // Populate hidden attribution parameters on mount
  useEffect(() => {
    const attr = getStoredAttribution();
    setValue('pageUrl', attr.pageUrl);
    setValue('utm_source', attr.utm_source);
    setValue('utm_medium', attr.utm_medium);
    setValue('utm_campaign', attr.utm_campaign);
    setValue('gclid', attr.gclid);
    setValue('fbclid', attr.fbclid);
  }, [setValue]);

  // Sync selectedItem from BookingContext
  useEffect(() => {
    if (selectedItem) {
      // Map category
      if (selectedItem.category === 'parlour' || selectedItem.type === 'parlour') {
        setValue('serviceType', 'Parlour');
        setValue('where', 'At Studio');
      } else if (selectedItem.category === 'makeup') {
        setValue('serviceType', 'Makeup');
      } else if (selectedItem.category === 'combo') {
        setValue('serviceType', 'Bridal Combo (Mehndi + Makeup)');
      } else {
        setValue('serviceType', 'Mehndi');
      }

      // Map package or service
      if (selectedItem.type === 'package') {
        setValue('preferredPackage', `${selectedItem.title} (${selectedItem.price || ''})`);
        setValue('service', selectedItem.title);
      } else {
        setValue('service', selectedItem.title);
        if (selectedItem.price) {
          setValue('preferredPackage', `${selectedItem.title} (${selectedItem.price})`);
        }
      }

      if (selectedItem.tagline) {
        setValue('notes', `Inquiry reference: ${selectedItem.title} - ${selectedItem.tagline}`);
      }
    }
  }, [selectedItem, setValue]);

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);

    try {
      // 1. Fire ads conversion events (Meta Lead with content_category, GA4 generate_lead with service_type, GAds conversion)
      trackLead({
        name: data.fullName,
        mobile: data.mobile,
        occasion: data.serviceType,
        service_type: data.serviceType,
        eventDate: data.eventDate,
        location: data.where === 'At Studio' ? 'At Studio' : data.location,
        preferredPackage: data.preferredPackage || data.service,
      });

      // 2. Build formatted WhatsApp message according to exact template
      const formattedMessage = formatWhatsAppBookingMessage(data);

      // 3. Background POST lead to Google Sheet / CRM webhook (mode: no-cors, silent on error)
      dispatchLeadWebhook(data).catch(() => {});

      // 4. Open WhatsApp link (same tab on mobile, new tab on desktop) with service_type tracking
      openWhatsAppEnquiry(formattedMessage, 'Booking Form Submission', data.serviceType);

      // 5. Invoke optional callback
      if (onSuccess) {
        onSuccess();
      }

      // 6. Navigate to /thank-you with personalized state
      navigate('/thank-you', {
        state: {
          name: data.fullName,
          mobile: `+91 ${normalizeIndianMobile(data.mobile)}`,
          occasion: data.serviceType,
          date: data.eventDate,
          location: data.where === 'At Studio' ? 'At Studio (GK-1, New Delhi)' : data.location,
          pkg: data.preferredPackage || data.service,
        },
      });
    } catch (err) {
      console.error('Submission handling error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      id="booking-form"
      onSubmit={handleSubmit(onSubmit)}
      className={`editorial-card p-4 min-[400px]:p-5 sm:p-8 lg:p-12 ornate-corners bg-ivory-light/95 relative overflow-hidden text-charcoal border border-gold/40 shadow-editorial ${className}`}
      noValidate
    >
      {/* Decorative corner motifs */}
      <div className="absolute -top-10 -right-10 text-gold/10 pointer-events-none">
        <MandalaMotif size={180} />
      </div>
      <div className="absolute -bottom-8 -left-8 text-henna/10 pointer-events-none">
        <PaisleyMotif size={110} />
      </div>

      <div className="relative z-10 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2 border-b border-gold/20 pb-6">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-gold-dark font-medium block">
            Atelier Date Reservation
          </span>
          <h3 className="font-serif text-2xl sm:text-4xl text-henna font-normal">
            Commission Your Bridal Experience
          </h3>
          <div className="flex justify-center pt-0.5">
            <BrushStrokeFlourish width={180} height={12} color="#B8893A" />
          </div>
          <p className="text-xs sm:text-sm text-charcoal-muted font-light max-w-md mx-auto pt-1">
            Direct coordination with Master Artist Kashish. Instant WhatsApp dispatch ensures your celebration date is held provisionally.
          </p>
        </div>

        {/* Selected Item Banner from Context (if user clicked 'Enquire' or 'Book') */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="p-3.5 bg-henna/5 border border-gold/40 flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-2">
                <span className="text-gold font-serif text-sm">✦</span>
                <span className="text-charcoal font-medium">Pre-selected:</span>
                <span className="text-henna font-serif italic text-sm">{selectedItem.title}</span>
                {selectedItem.price && (
                  <span className="text-mehndi text-[11px] font-mono">({selectedItem.price})</span>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  clearSelection();
                  setValue('preferredPackage', '');
                }}
                className="text-[11px] uppercase tracking-wider text-charcoal-muted hover:text-henna transition-colors underline"
              >
                Clear
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form Fields Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Part I Header */}
          <div className="sm:col-span-2 flex items-center gap-3 border-b border-gold/25 pb-2">
            <span className="text-[10px] uppercase tracking-[0.24em] text-gold-dark font-medium">
              Part I · Celebrant &amp; Contact Dossier
            </span>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-gold/30 to-transparent" />
          </div>

          {/* 1. Full Name */}
          <div className="space-y-1.5">
            <label htmlFor="fullName" className="block text-xs uppercase tracking-[0.16em] text-charcoal font-medium">
              Full Name <span className="text-henna">*</span>
            </label>
            <input
              id="fullName"
              type="text"
              placeholder="e.g. Radhika Sharma"
              {...register('fullName')}
              className={`w-full min-h-[48px] px-4 py-3 bg-white/95 border text-base sm:text-sm text-charcoal placeholder:text-charcoal-muted/50 focus:outline-none focus:border-gold transition-colors ${
                errors.fullName ? 'border-red-600 bg-red-50/20' : 'border-gold/30'
              }`}
            />
            <AnimatePresence>
              {errors.fullName && (
                <motion.p
                  initial={{ opacity: 0, height: 0, y: -2 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -2 }}
                  className="text-[11px] text-red-700 font-medium flex items-center gap-1 pt-0.5"
                >
                  <span>⚠</span>
                  <span>{errors.fullName.message}</span>
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* 2. Mobile (10-digit Indian validation) */}
          <div className="space-y-1.5">
            <label htmlFor="mobile" className="block text-xs uppercase tracking-[0.16em] text-charcoal font-medium">
              Mobile Number <span className="text-henna">*</span>
            </label>
            <div className="relative flex">
              <span className="inline-flex items-center px-3.5 bg-ivory-dark/40 border border-r-0 border-gold/30 text-xs text-charcoal-muted font-medium select-none">
                +91
              </span>
              <input
                id="mobile"
                type="tel"
                maxLength={14}
                placeholder="91317 34930"
                {...register('mobile')}
                className={`w-full min-h-[48px] px-4 py-3 bg-white/95 border text-base sm:text-sm text-charcoal placeholder:text-charcoal-muted/50 focus:outline-none focus:border-gold transition-colors ${
                  errors.mobile ? 'border-red-600 bg-red-50/20' : 'border-gold/30'
                }`}
              />
            </div>
            <AnimatePresence>
              {errors.mobile && (
                <motion.p
                  initial={{ opacity: 0, height: 0, y: -2 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -2 }}
                  className="text-[11px] text-red-700 font-medium flex items-center gap-1 pt-0.5"
                >
                  <span>⚠</span>
                  <span>{errors.mobile.message}</span>
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Part II Header */}
          <div className="sm:col-span-2 flex items-center gap-3 border-b border-gold/25 pb-2 pt-2">
            <span className="text-[10px] uppercase tracking-[0.24em] text-gold-dark font-medium">
              Part II · Celebration Logistics &amp; Venue
            </span>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-gold/30 to-transparent" />
          </div>

          {/* 3. Service Type */}
          <div className="space-y-1.5">
            <label htmlFor="serviceType" className="block text-xs uppercase tracking-[0.16em] text-charcoal font-medium">
              Service Type <span className="text-henna">*</span>
            </label>
            <select
              id="serviceType"
              {...register('serviceType')}
              className={`w-full min-h-[48px] px-4 py-3 bg-white/95 border text-base sm:text-sm text-charcoal focus:outline-none focus:border-gold transition-colors cursor-pointer ${
                errors.serviceType ? 'border-red-600' : 'border-gold/30'
              }`}
            >
              {serviceTypeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <AnimatePresence>
              {errors.serviceType && (
                <motion.p
                  initial={{ opacity: 0, height: 0, y: -2 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -2 }}
                  className="text-[11px] text-red-700 font-medium flex items-center gap-1 pt-0.5"
                >
                  <span>⚠</span>
                  <span>{errors.serviceType.message}</span>
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* 4. Service (filtered by Service Type) */}
          <div className="space-y-1.5">
            <label htmlFor="service" className="block text-xs uppercase tracking-[0.16em] text-charcoal font-medium">
              Service Choice <span className="text-henna">*</span>
            </label>
            <select
              id="service"
              {...register('service')}
              className={`w-full min-h-[48px] px-4 py-3 bg-white/95 border text-base sm:text-sm text-charcoal focus:outline-none focus:border-gold transition-colors cursor-pointer ${
                errors.service ? 'border-red-600' : 'border-gold/30'
              }`}
            >
              {availableServices.map((svc) => (
                <option key={svc.id} value={svc.title}>
                  {svc.title} {svc.startingPrice ? `(from ${svc.startingPrice})` : ''}
                </option>
              ))}
            </select>
            <AnimatePresence>
              {errors.service && (
                <motion.p
                  initial={{ opacity: 0, height: 0, y: -2 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -2 }}
                  className="text-[11px] text-red-700 font-medium flex items-center gap-1 pt-0.5"
                >
                  <span>⚠</span>
                  <span>{errors.service.message}</span>
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* 5. Date (no past dates) */}
          <div className="space-y-1.5">
            <label htmlFor="eventDate" className="block text-xs uppercase tracking-[0.16em] text-charcoal font-medium">
              Celebration / Appointment Date <span className="text-henna">*</span>
            </label>
            <input
              id="eventDate"
              type="date"
              min={todayStr}
              {...register('eventDate')}
              className={`w-full min-h-[48px] px-4 py-3 bg-white/95 border text-base sm:text-sm text-charcoal focus:outline-none focus:border-gold transition-colors ${
                errors.eventDate ? 'border-red-600 bg-red-50/20' : 'border-gold/30'
              }`}
            />
            <AnimatePresence>
              {errors.eventDate && (
                <motion.p
                  initial={{ opacity: 0, height: 0, y: -2 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -2 }}
                  className="text-[11px] text-red-700 font-medium flex items-center gap-1 pt-0.5"
                >
                  <span>⚠</span>
                  <span>{errors.eventDate.message}</span>
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* 6. Preferred Time Slot (required for Parlour) */}
          <div className="space-y-1.5">
            <label htmlFor="preferredTimeSlot" className="block text-xs uppercase tracking-[0.16em] text-charcoal font-medium">
              Preferred Time Slot {currentServiceType === 'Parlour' && <span className="text-henna">*</span>}
              {currentServiceType !== 'Parlour' && <span className="text-charcoal-muted font-normal text-[11px]"> (Optional)</span>}
            </label>
            <select
              id="preferredTimeSlot"
              {...register('preferredTimeSlot')}
              className={`w-full min-h-[48px] px-4 py-3 bg-white/95 border text-base sm:text-sm text-charcoal focus:outline-none focus:border-gold transition-colors cursor-pointer ${
                errors.preferredTimeSlot ? 'border-red-600 bg-red-50/20' : 'border-gold/30'
              }`}
            >
              <option value="">Select preferred time slot</option>
              {timeSlotOptions.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
            <AnimatePresence>
              {errors.preferredTimeSlot && (
                <motion.p
                  initial={{ opacity: 0, height: 0, y: -2 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -2 }}
                  className="text-[11px] text-red-700 font-medium flex items-center gap-1 pt-0.5"
                >
                  <span>⚠</span>
                  <span>{errors.preferredTimeSlot.message}</span>
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* 7. Where: At Home / Venue vs At Studio */}
          <div className="space-y-1.5 sm:col-span-2">
            <label className="block text-xs uppercase tracking-[0.16em] text-charcoal font-medium">
              Service Location <span className="text-henna">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {whereOptions.map((opt) => {
                const isSelected = currentWhere === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setValue('where', opt)}
                    className={`min-h-[48px] py-3 px-2 sm:px-4 border text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-[0.16em] transition-all duration-200 font-medium flex items-center justify-center gap-1.5 sm:gap-2 ${
                      isSelected
                        ? 'bg-henna text-ivory border-gold shadow-sm'
                        : 'bg-white text-charcoal border-gold/30 hover:border-gold hover:text-henna'
                    }`}
                  >
                    <span>{isSelected ? '✓' : '○'}</span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>
            <input type="hidden" {...register('where')} />
          </div>

          {/* 8. Location / Area (Conditional if 'At Home / Venue') */}
          <AnimatePresence>
            {currentWhere === 'At Home / Venue' && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -4 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                className="space-y-1.5 sm:col-span-2 overflow-hidden"
              >
                <label htmlFor="location" className="block text-xs uppercase tracking-[0.16em] text-charcoal font-medium">
                  Home / Venue Area <span className="text-henna">*</span>
                </label>
                <input
                  id="location"
                  type="text"
                  placeholder="e.g. Greater Kailash I, DLF Phase 5 Gurugram, Sector 15 Noida, The Leela Palace"
                  {...register('location')}
                  className={`w-full min-h-[48px] px-4 py-3 bg-white/95 border text-base sm:text-sm text-charcoal placeholder:text-charcoal-muted/50 focus:outline-none focus:border-gold transition-colors ${
                    errors.location ? 'border-red-600 bg-red-50/20' : 'border-gold/30'
                  }`}
                />
                <AnimatePresence>
                  {errors.location && (
                    <motion.p
                      initial={{ opacity: 0, height: 0, y: -2 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -2 }}
                      className="text-[11px] text-red-700 font-medium flex items-center gap-1 pt-0.5"
                    >
                      <span>⚠</span>
                      <span>{errors.location.message}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 9. Number of People */}
          <div className="space-y-1.5">
            <label htmlFor="numberOfPeople" className="block text-xs uppercase tracking-[0.16em] text-charcoal font-medium">
              Number of People <span className="text-henna">*</span>
            </label>
            <select
              id="numberOfPeople"
              {...register('numberOfPeople')}
              className={`w-full min-h-[48px] px-4 py-3 bg-white/95 border text-base sm:text-sm text-charcoal focus:outline-none focus:border-gold transition-colors cursor-pointer ${
                errors.numberOfPeople ? 'border-red-600' : 'border-gold/30'
              }`}
            >
              {peopleOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Part III Header */}
          <div className="sm:col-span-2 flex items-center gap-3 border-b border-gold/25 pb-2 pt-2">
            <span className="text-[10px] uppercase tracking-[0.24em] text-gold-dark font-medium">
              Part III · Trousseau Preference &amp; Bespoke Notes
            </span>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-gold/30 to-transparent" />
          </div>

          {/* 10. Preferred Package (Optional, filtered by service type) */}
          <div className="space-y-1.5">
            <label htmlFor="preferredPackage" className="block text-xs uppercase tracking-[0.16em] text-charcoal font-medium">
              Preferred Package <span className="text-charcoal-muted font-normal text-[11px]">(Optional)</span>
            </label>
            <select
              id="preferredPackage"
              {...register('preferredPackage')}
              className="w-full min-h-[48px] px-4 py-3 bg-white/95 border border-gold/30 text-base sm:text-sm text-charcoal focus:outline-none focus:border-gold transition-colors cursor-pointer"
            >
              <option value="">Select package tier or request custom quote</option>
              {availablePackages.map((pkg) => (
                <option key={pkg} value={pkg}>
                  {pkg}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 11. Message / Design or Look Reference (Optional) */}
        <div className="space-y-1.5">
          <label htmlFor="notes" className="block text-xs uppercase tracking-[0.16em] text-charcoal font-medium">
            Message / Design or Look Reference <span className="text-charcoal-muted font-normal text-[11px]">(Optional)</span>
          </label>
          <textarea
            id="notes"
            rows={3}
            placeholder="Tell us about your outfit neckline, preferred motifs (portraits, baraat, pets, monograms), skin concerns, or Instagram reference links..."
            {...register('notes')}
            className="w-full px-4 py-3 bg-white/95 border border-gold/30 text-sm text-charcoal placeholder:text-charcoal-muted/50 focus:outline-none focus:border-gold transition-colors resize-none"
          />
        </div>

        {/* Hidden Tracking & Attribution Fields */}
        <input type="hidden" {...register('pageUrl')} />
        <input type="hidden" {...register('utm_source')} />
        <input type="hidden" {...register('utm_medium')} />
        <input type="hidden" {...register('utm_campaign')} />
        <input type="hidden" {...register('gclid')} />
        <input type="hidden" {...register('fbclid')} />

        {/* Submit Button & Trust Guarantee */}
        <div className="pt-2 space-y-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full min-h-[52px] py-4 bg-henna text-ivory text-xs uppercase tracking-[0.22em] border border-gold font-medium hover:bg-henna-dark transition-all duration-300 shadow-gold disabled:opacity-70 flex items-center justify-center gap-2 group touch-manipulation cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-ivory border-t-transparent rounded-full animate-spin" />
                <span>Opening WhatsApp Concierge...</span>
              </>
            ) : (
              <>
                <span>✦</span>
                <span>Request Reservation via WhatsApp</span>
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </>
            )}
          </button>

          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-charcoal-muted gap-2 text-center sm:text-left pt-1">
            <span className="flex items-center gap-1.5">
              <span className="text-mehndi font-medium">✓</span>
              <span>Direct WhatsApp verification with Master Artist Kashish</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-mehndi font-medium">✓</span>
              <span>100% Organic Sojat Henna &bull; Zero PPD &bull; MAC / Dior</span>
            </span>
          </div>
        </div>
      </div>
    </form>
  );
};
