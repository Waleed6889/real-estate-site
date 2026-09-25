import React from 'react';
import { COMPANY_STATS } from '../data/mockData';
import estateImg from '../assets/images/estate_beverly_hills_1790337356401.jpg';
import { Award, CheckCircle } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-[#F4EFE6] border-t border-stone-300/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual with refined badge */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-stone-900 aspect-[4/3]">
              <img
                src={estateImg}
                alt="Veyra Estates private architectural pavilion in Beverly Hills"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Quiet trust badge */}
            <div className="absolute -bottom-6 -right-4 sm:bottom-6 sm:right-6 bg-white p-5 rounded-xl shadow-xl border border-stone-200 max-w-xs">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-stone-100 text-amber-800">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-stone-900">
                    AD100 Partner Brokerage
                  </div>
                  <div className="text-[11px] text-stone-500 mt-0.5">
                    Global Architectural Heritage Advisory
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Mission */}
          <div className="lg:col-span-6">
            <div className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-800">
              Our Ethos & Heritage
            </div>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight leading-[1.12]">
              Curating Homes as Enduring Works of Art.
            </h2>

            <p className="mt-6 text-stone-700 text-sm sm:text-base leading-relaxed font-light">
              Founded in 2012 by architectural scholars and private wealth fiduciaries, Veyra Estates was established on a single principle: that architecturally significant residences are rare cultural artifacts deserving of connoisseurship, rigorous provenance, and absolute discretion.
            </p>

            <p className="mt-4 text-stone-600 text-sm leading-relaxed font-light">
              Over the past decade, our advisory partners have transacted some of the most celebrated residential estates across North America, the United Kingdom, and the French Riviera. We eschew mass-market aggregation in favor of an intensely curated portfolio where every residence represents structural excellence and timeless distinction.
            </p>

            {/* Checklist */}
            <div className="mt-6 space-y-2.5">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-stone-800 font-medium">
                <CheckCircle className="w-4 h-4 text-amber-800 shrink-0" />
                <span>Private registry representation across 18 world metropolises</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-stone-800 font-medium">
                <CheckCircle className="w-4 h-4 text-amber-800 shrink-0" />
                <span>Direct collaboration with Pritzker Prize and AD100 master architects</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-stone-800 font-medium">
                <CheckCircle className="w-4 h-4 text-amber-800 shrink-0" />
                <span>Strict confidentiality covenants safeguarding principal anonymity</span>
              </div>
            </div>

            {/* Stats row */}
            <div className="mt-10 pt-8 border-t border-stone-300/80 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {COMPANY_STATS.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="font-serif text-2xl sm:text-3xl text-stone-950 font-semibold tabular-nums">
                    {stat.value}
                  </span>
                  <span className="text-[11px] text-stone-500 uppercase tracking-wider mt-1">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
