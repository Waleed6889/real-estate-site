import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/mockData';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-[#F4EFE6] border-t border-stone-300/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-800 flex items-center justify-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
            <span>Advisory Protocols</span>
          </div>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-normal text-stone-900 tracking-tight">
            Frequently Addressed Questions
          </h2>
          <p className="mt-3 text-stone-600 text-sm leading-relaxed">
            Essential information regarding our private off-market registry, fiduciary verification, and cross-border transactions.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-stone-50 transition-colors"
                >
                  <span className="font-serif text-base sm:text-lg text-stone-900 font-medium">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-500 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-amber-800' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed font-light border-t border-stone-100">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
