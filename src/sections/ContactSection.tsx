import React from 'react';
import { brandConfig, getWhatsAppBookingLink } from '@/lib/config';
import { trackWhatsAppClick } from '@/lib/tracking';
import { BookingForm } from '@/components/booking/BookingForm';
import {
  MandalaMotif,
  PaisleyMotif,
  LotusFloretMotif,
  OrnateCornerFlourish,
  JharokhaArchMotif,
  BrushStrokeFlourish,
  AtelierSealMotif,
} from '@/components/motifs';

export const ContactSection: React.FC = () => {
  return (
    <section
      id="contact"
      className="py-20 sm:py-32 px-4 sm:px-6 lg:px-12 bg-[#1C1816] text-ivory relative overflow-hidden select-none border-t border-gold/25"
    >
      {/* Background Watermarks */}
      <div className="absolute top-0 right-0 text-gold/5 pointer-events-none">
        <MandalaMotif size={560} />
      </div>
      <div className="absolute -bottom-16 -left-16 text-henna/15 pointer-events-none">
        <PaisleyMotif size={320} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        {/* Editorial Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-gold/20 pb-8">
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-gold font-medium">
              <span>✦</span>
              <span>Atelier Date Reservation · Autumn / Winter 2026</span>
              <span>✦</span>
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-ivory font-normal leading-[1.1]">
                Reserve Your Bridal Date <br className="hidden sm:inline" />
                <span className="italic font-light text-gold-light">with Master Artist {brandConfig.artistName}</span>
              </h2>
              <BrushStrokeFlourish width={210} height={14} color="#B8893A" />
            </div>

            <p className="text-sm sm:text-base text-ivory/70 font-light leading-relaxed max-w-2xl">
              {brandConfig.bookingNotice} To protect the unhurried quality of our heirloom artistry, we accept only one bridal commission per calendar day.
            </p>
          </div>

          <div className="lg:col-span-4 flex justify-start lg:justify-end items-end">
            <div className="text-left lg:text-right space-y-1">
              <span className="font-vibes text-2xl sm:text-3xl text-gold block">
                Doorstep Atelier Service
              </span>
              <span className="text-xs text-ivory/60 font-light block">
                {brandConfig.city} · Pan-India &amp; Destination Suites
              </span>
            </div>
          </div>
        </div>

        {/* 2-Column Editorial Grid: Left Atelier Concierge Dossier + Right BookingForm */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (5 cols): Atelier Concierge Dossier */}
          <div className="lg:col-span-5 space-y-8">
            {/* The Bespoke Protocol Card with Wax Seal */}
            <div className="p-7 sm:p-8 bg-[#25201D] border border-gold/40 shadow-fine relative double-hairline-gold">
              {/* Ornate Corners */}
              <div className="absolute top-2 left-2 text-gold/30 pointer-events-none">
                <OrnateCornerFlourish size={24} />
              </div>
              <div className="absolute top-2 right-2 text-gold/30 pointer-events-none rotate-90">
                <OrnateCornerFlourish size={24} />
              </div>
              <div className="absolute bottom-2 left-2 text-gold/30 pointer-events-none -rotate-90">
                <OrnateCornerFlourish size={24} />
              </div>
              <div className="absolute bottom-2 right-2 text-gold/30 pointer-events-none rotate-180">
                <OrnateCornerFlourish size={24} />
              </div>

              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between border-b border-gold/20 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-gold">
                      <LotusFloretMotif size={32} />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.24em] text-gold-dark font-medium block">
                        Atelier Protocol
                      </span>
                      <h3 className="font-serif text-xl text-ivory font-medium">
                        What Happens Next
                      </h3>
                    </div>
                  </div>
                  <AtelierSealMotif size={60} sealColor="#B8893A" textColor="#FAF5ED" />
                </div>

                {/* 3 Step Protocol Timeline */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3.5">
                    <span className="font-serif text-sm text-gold border border-gold/40 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      1
                    </span>
                    <div className="space-y-0.5">
                      <strong className="text-xs uppercase tracking-wider text-ivory font-medium block">
                        Instant WhatsApp Dispatch
                      </strong>
                      <p className="text-xs text-ivory/60 font-light leading-relaxed">
                        Submitting this reservation dispatches your date request directly to Kashish's personal concierge phone.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <span className="font-serif text-sm text-gold border border-gold/40 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      2
                    </span>
                    <div className="space-y-0.5">
                      <strong className="text-xs uppercase tracking-wider text-ivory font-medium block">
                        Design Consultation Call
                      </strong>
                      <p className="text-xs text-ivory/60 font-light leading-relaxed">
                        We review your wedding lehenga embroidery, jewelry sleeve length, and personal love-story elements.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <span className="font-serif text-sm text-gold border border-gold/40 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      3
                    </span>
                    <div className="space-y-0.5">
                      <strong className="text-xs uppercase tracking-wider text-ivory font-medium block">
                        Exclusive Date Lock
                      </strong>
                      <p className="text-xs text-ivory/60 font-light leading-relaxed">
                        Your wedding date is formally reserved with our single-bride-per-day commitment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Artist WhatsApp Hotlink Card */}
            <div className="p-6 bg-[#25201D] border border-gold/30 space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between text-xs border-b border-gold/20 pb-3">
                <span className="uppercase tracking-[0.2em] text-gold font-medium">
                  Direct WhatsApp Hotline
                </span>
                <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Available Now
                </span>
              </div>

              <p className="text-xs text-ivory/60 font-light leading-relaxed">
                Have urgent questions about date availability, destination travel rates, or customization?
              </p>

              <div>
                <a
                  href={getWhatsAppBookingLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick('Contact Section Direct Hotline')}
                  className="inline-flex items-center gap-2.5 text-gold-light hover:text-ivory font-serif text-xl transition-colors underline underline-offset-4"
                >
                  <span>{brandConfig.phoneDisplay}</span>
                  <span>↗</span>
                </a>
              </div>
            </div>

            {/* Coverage Zones */}
            <div className="p-6 bg-[#25201D] border border-gold/25 space-y-3">
              <span className="text-[10px] uppercase tracking-[0.24em] text-gold-dark font-medium block">
                Primary Doorstep Coverage
              </span>
              <div className="flex flex-wrap gap-2">
                {brandConfig.coverageAreas.map((area, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-3 py-1 bg-ivory/5 border border-gold/25 text-ivory/80 font-light"
                  >
                    {area}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-ivory/50 font-light pt-1">
                ✦ Outstation &amp; Destination weddings: Travel &amp; stay arranged by client.
              </p>
            </div>

            <div className="hidden lg:block text-gold/15">
              <JharokhaArchMotif size={100} />
            </div>
          </div>

          {/* Right Column (7 cols): Reusable BookingForm Component */}
          <div className="lg:col-span-7">
            <BookingForm />
          </div>
        </div>
      </div>
    </section>
  );
};
