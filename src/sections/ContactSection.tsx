import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { brandConfig } from '@/lib/config';
import { useBooking } from '@/context/BookingContext';
import { MandalaMotif, PaisleyMotif } from '@/components/motifs';

export const ContactSection: React.FC = () => {
  const { selectedItem, clearSelection } = useBooking();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    city: brandConfig.city,
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const generateWhatsAppMessage = () => {
    const itemText = selectedItem
      ? `I am interested in reserving: *${selectedItem.title}* (${selectedItem.price || 'Bespoke Quote'}).`
      : 'I would like to check wedding date availability for bridal mehndi.';

    const details = [
      `Hello ${brandConfig.artistName},`,
      itemText,
      formData.name ? `Name: ${formData.name}` : '',
      formData.phone ? `Phone: ${formData.phone}` : '',
      formData.date ? `Wedding Date: ${formData.date}` : '',
      formData.city ? `Location/City: ${formData.city}` : '',
      formData.notes ? `Notes: ${formData.notes}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    return `https://wa.me/${brandConfig.whatsAppNumber}?text=${encodeURIComponent(details)}`;
  };

  return (
    <section
      id="contact"
      className="py-24 sm:py-32 px-6 lg:px-12 bg-charcoal text-ivory relative overflow-hidden select-none"
    >
      {/* Background Watermarks */}
      <div className="absolute top-0 right-0 text-gold/5 pointer-events-none">
        <MandalaMotif size={420} />
      </div>
      <div className="absolute -bottom-10 -left-10 text-henna/15 pointer-events-none">
        <PaisleyMotif size={240} />
      </div>

      <div className="max-w-5xl mx-auto relative z-10 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold font-medium">
            <span>✦</span>
            <span>Reserve Your Commission</span>
            <span>✦</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-ivory font-normal leading-tight">
            Check Date Availability
          </h2>

          <p className="text-sm sm:text-base text-ivory/70 font-light leading-relaxed">
            {brandConfig.bookingNotice}
          </p>

          <div className="gold-divider max-w-xs mx-auto pt-2" />
        </div>

        {/* Dynamic Selected Service/Package Banner */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              className="bg-henna/40 border border-gold/40 p-5 rounded-none flex flex-col sm:flex-row items-center justify-between gap-4 shadow-editorial"
            >
              <div className="flex items-center gap-3.5 text-center sm:text-left">
                <span className="text-gold text-xl">✦</span>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-gold-light">
                    Pre-selected {selectedItem.type === 'package' ? 'Bridal Package' : 'Ceremonial Service'}
                  </div>
                  <div className="font-serif text-xl sm:text-2xl text-ivory font-medium">
                    {selectedItem.title}{' '}
                    {selectedItem.price && (
                      <span className="text-gold font-sans text-sm ml-1 font-normal">
                        ({selectedItem.price})
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={clearSelection}
                className="text-[11px] uppercase tracking-wider text-ivory/60 hover:text-ivory underline transition-colors px-3 py-1"
              >
                Change Selection
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Booking Form Card */}
        <div className="bg-[#2A2420] border border-gold/30 p-8 sm:p-12 ornate-corners shadow-editorial max-w-3xl mx-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              window.open(generateWhatsAppMessage(), '_blank');
            }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-gold-light block font-medium">
                  Bride / Client Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Radhika Sharma"
                  className="w-full bg-[#1F1B18] border border-gold/30 px-4 py-3 text-sm text-ivory placeholder-ivory/30 focus:border-gold focus:outline-none transition-colors"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-gold-light block font-medium">
                  WhatsApp / Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. +91 98765 43210"
                  className="w-full bg-[#1F1B18] border border-gold/30 px-4 py-3 text-sm text-ivory placeholder-ivory/30 focus:border-gold focus:outline-none transition-colors"
                />
              </div>

              {/* Wedding Date */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-gold-light block font-medium">
                  Ceremony / Wedding Date *
                </label>
                <input
                  type="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full bg-[#1F1B18] border border-gold/30 px-4 py-3 text-sm text-ivory focus:border-gold focus:outline-none transition-colors"
                />
              </div>

              {/* City / Venue */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-gold-light block font-medium">
                  City / Venue Location
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="e.g. Delhi NCR / Udaipur Palace"
                  className="w-full bg-[#1F1B18] border border-gold/30 px-4 py-3 text-sm text-ivory placeholder-ivory/30 focus:border-gold focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Notes / Special Requests */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-gold-light block font-medium">
                Custom Elements &amp; Notes
              </label>
              <textarea
                name="notes"
                rows={3}
                value={formData.notes}
                onChange={handleChange}
                placeholder="Mention personalized motifs (hashtags, portraits, baraat, number of family members)..."
                className="w-full bg-[#1F1B18] border border-gold/30 px-4 py-3 text-sm text-ivory placeholder-ivory/30 focus:border-gold focus:outline-none transition-colors resize-none"
              />
            </div>

            {/* Submit Action */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="submit"
                className="w-full sm:w-auto px-9 py-4 bg-henna text-ivory text-xs uppercase tracking-[0.22em] border border-gold hover:bg-henna-dark transition-all duration-300 shadow-gold font-medium flex items-center justify-center gap-3"
              >
                <span>Send WhatsApp Inquiry</span>
                <span className="text-gold">✦</span>
              </button>

              <span className="text-[11px] text-ivory/50">
                Direct concierge with Master Artist {brandConfig.artistName}
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

