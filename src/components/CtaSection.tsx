import React from 'react';
import { ArrowRight, Compass, Shield } from 'lucide-react';

interface CtaSectionProps {
  onOpenConsultation: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onOpenConsultation }) => {
  return (
    <section className="relative py-20 lg:py-24 bg-[#121316] text-white overflow-hidden">
      {/* Subtle decorative radial gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-700/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-stone-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-stone-200 text-xs font-medium tracking-wide mb-6 border border-white/10">
          <Shield className="w-3.5 h-3.5 text-amber-400" />
          <span>Fiduciary Representation & Off-Market Discretion</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.12] tracking-tight [text-wrap:balance]">
          Ready to Acquire or Commission <br />
          <span className="italic text-stone-300">Your Next Architectural Masterpiece?</span>
        </h2>

        <p className="mt-6 text-sm sm:text-base text-stone-400 max-w-2xl mx-auto font-light leading-relaxed">
          Whether seeking an unlisted waterfront estate in Miami Beach, a historic Cotswold country seat, or a Billionaires' Row penthouse, our advisory partners ensure discreet access and flawless execution.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#properties"
            className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-stone-900 bg-[#FAF9F5] hover:bg-white rounded-lg transition-all shadow-md active:scale-[0.98]"
          >
            <span>Explore Current Portfolio</span>
            <ArrowRight className="w-4 h-4 text-amber-800" />
          </a>

          <button
            type="button"
            onClick={onOpenConsultation}
            className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-all active:scale-[0.98]"
          >
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Schedule Private Advisory</span>
          </button>
        </div>
      </div>
    </section>
  );
};
