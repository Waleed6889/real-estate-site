import React from 'react';
import { TESTIMONIALS } from '../data/mockData';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-[#FAF9F5] border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-800">
            Client Provenance
          </div>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight">
            Client Transacting Experiences
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            Representing family offices, cultural foundations, and private collectors with utmost confidentiality and fidelity.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-7 sm:p-9 rounded-2xl border border-stone-200/90 shadow-sm flex flex-col justify-between relative"
            >
              <div>
                {/* Rating stars & Quote mark */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1 text-amber-700">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-stone-300" />
                </div>

                {/* Quote */}
                <blockquote className="text-sm sm:text-base text-stone-800 leading-relaxed font-light italic">
                  "{testimonial.quote}"
                </blockquote>
              </div>

              {/* Attribution */}
              <div className="mt-8 pt-6 border-t border-stone-100 flex items-start justify-between">
                <div>
                  <h4 className="font-serif text-lg font-medium text-stone-950">
                    {testimonial.clientName}
                  </h4>
                  <p className="text-xs text-stone-500">{testimonial.role}</p>
                  <p className="text-xs text-amber-800 font-medium mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Acquired: {testimonial.propertyAcquired}</span>
                  </p>
                </div>

                <span className="text-xs text-stone-400 tabular-nums">
                  {testimonial.year}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
