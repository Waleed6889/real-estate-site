import React from 'react';
import { ShieldCheck, EyeOff, Globe2, Sparkles, ArrowRight } from 'lucide-react';

interface WhyChooseUsProps {
  onOpenConsultation: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onOpenConsultation }) => {
  const pillars = [
    {
      num: '01',
      icon: ShieldCheck,
      title: 'Architectural & Title Verification',
      description:
        'Every estate represented undergoes exhaustive structural diagnostics, historical provenance investigation, and zoning covenant audits before inclusion in our private registry.',
    },
    {
      num: '02',
      icon: EyeOff,
      title: 'Private Off-Market Discretion',
      description:
        'Protecting principal privacy is paramount. Over 40% of our transactions conclude under strict non-disclosure covenants, shielding sensitive negotiations from public gaze.',
    },
    {
      num: '03',
      icon: Globe2,
      title: 'Cross-Border Wealth Integration',
      description:
        'Our advisory team coordinates directly with family offices, private banks, and international tax counsel to structure clean multi-jurisdictional acquisitions across the US, UK, and EU.',
    },
    {
      num: '04',
      icon: Sparkles,
      title: 'End-to-End Private Stewardship',
      description:
        'From private jet charter coordination for viewings to post-acquisition architectural restoration management, our client concierge provides white-glove stewardship indefinitely.',
    },
  ];

  return (
    <section id="why-us" className="py-20 lg:py-28 bg-[#FAF9F5] border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column Narrative */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-800">
              The Veyra Standard
            </div>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight leading-[1.15]">
              Redefining Prime Advisory Through Architectural Integrity.
            </h2>
            <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed font-light">
              We reject the volume-driven approach of conventional brokerages. Veyra Estates operates as a boutique private practice, pairing architectural connoisseurship with institutional financial rigor.
            </p>

            <div className="mt-8 pt-6 border-t border-stone-200">
              <button
                type="button"
                onClick={onOpenConsultation}
                className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-all shadow-sm active:scale-[0.98]"
              >
                <span>Engage Private Advisory</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              </button>
            </div>
          </div>

          {/* Right Column Pillars */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.num}
                  className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-serif text-xl text-amber-800 font-semibold">
                        {pillar.num}
                      </span>
                      <div className="p-2 rounded-lg bg-stone-100 text-stone-700">
                        <Icon className="w-4 h-4 text-amber-800" />
                      </div>
                    </div>

                    <h3 className="font-serif text-xl text-stone-900 font-normal mb-2.5">
                      {pillar.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-stone-100 text-[11px] uppercase tracking-wider text-stone-400 font-medium">
                    Verified Standard
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
