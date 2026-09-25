import React from 'react';
import { CATEGORIES } from '../data/mockData';
import { PropertyCategory, Property } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface PropertyCategoriesProps {
  onSelectCategory: (type: Property['propertyType']) => void;
}

export const PropertyCategories: React.FC<PropertyCategoriesProps> = ({ onSelectCategory }) => {
  const handleCategoryClick = (category: PropertyCategory) => {
    onSelectCategory(category.filterType);
    const target = document.getElementById('properties');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="categories" className="py-20 lg:py-28 bg-[#F4EFE6] border-t border-stone-300/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-800">
            Architectural Typologies
          </div>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight">
            Curated Collections
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            Discover residences categorized by distinct architectural philosophies, waterfront topographies, and metropolitan vantage points.
          </p>
        </div>

        {/* Categories Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, idx) => {
            // Give first card 2 columns on lg screens for visual bento balance
            const isSpan2 = idx === 0;
            return (
              <div
                key={cat.id}
                onClick={() => handleCategoryClick(cat)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-500 bg-stone-900 ${
                  isSpan2 ? 'lg:col-span-2 min-h-[340px]' : 'min-h-[340px]'
                }`}
              >
                {/* Background Image */}
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#121316]/90 via-[#121316]/40 to-transparent" />

                {/* Card Content */}
                <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between text-white">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-widest text-amber-300 font-medium">
                      Collection {idx + 1}
                    </span>
                    <span className="text-xs font-mono text-stone-300 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full">
                      {cat.count} Residences
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal group-hover:text-amber-200 transition-colors flex items-center justify-between">
                      <span>{cat.title}</span>
                      <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center group-hover:bg-amber-700 group-hover:text-white transition-all">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-stone-300 line-clamp-2 font-light max-w-lg">
                      {cat.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
