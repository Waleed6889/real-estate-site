import React, { useState } from 'react';
import { Search, MapPin, Home, DollarSign, Bed, ArrowRight, ShieldCheck, Compass, Sparkles, Image as ImageIcon } from 'lucide-react';
import heroBrightVilla from '../assets/images/hero_bright_luxury_villa_1790337789066.jpg';
import heroBrightWaterfront from '../assets/images/hero_bright_waterfront_1790337805777.jpg';

interface HeroProps {
  onSearch: (filters: {
    location: string;
    propertyType: string;
    priceBucket: string;
    bedrooms: string;
  }) => void;
  onOpenConsultation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch, onOpenConsultation }) => {
  const [location, setLocation] = useState('All');
  const [propertyType, setPropertyType] = useState('All');
  const [priceBucket, setPriceBucket] = useState('All');
  const [bedrooms, setBedrooms] = useState('All');
  const [activeHeroView, setActiveHeroView] = useState<'villa' | 'waterfront'>('villa');

  const currentHeroImg = activeHeroView === 'villa' ? heroBrightVilla : heroBrightWaterfront;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ location, propertyType, priceBucket, bedrooms });
    const target = document.getElementById('properties');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-between pt-10 pb-16 lg:pt-14 lg:pb-20 overflow-hidden bg-[#FAF9F5]">
      {/* Background Architectural Canvas - High Clarity & Bright Sunlit Atmosphere */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          key={activeHeroView}
          src={currentHeroImg}
          alt={
            activeHeroView === 'villa'
              ? 'Bright sunlit ultra-luxury modern architectural pavilion villa with infinity pool and clear sky'
              : 'Sun-drenched luxury modern oceanfront residence terrace with azure water'
          }
          className="w-full h-full object-cover object-center transition-all duration-700 ease-out"
          loading="eager"
          referrerPolicy="no-referrer"
        />

        {/* Soft daylight architectural scrim: Keeps the sky & pool bright and sun-drenched while ensuring 100% typography contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF9F5]/92 via-[#FAF9F5]/65 to-transparent md:w-3/4 lg:w-3/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F5] via-transparent to-transparent h-40 bottom-0 top-auto" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="max-w-2xl">
          {/* Subtle editorial kicker */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-stone-200/90 text-stone-800 text-xs font-medium tracking-wide mb-6 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
            <span className="font-semibold text-amber-900">Private Off-Market Registry</span>
            <span className="text-stone-400">·</span>
            <span className="text-stone-600">2026 Global Curations</span>
          </div>

          {/* Main Display Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-stone-950 leading-[1.08] tracking-tight [text-wrap:balance]">
            Architectural Distinction. <br />
            <span className="italic font-light text-amber-900">Sunlit Horizons.</span>
          </h1>

          {/* Supporting Copy */}
          <p className="mt-6 text-base sm:text-lg text-stone-700 font-light leading-relaxed max-w-xl">
            Representing rare architectural trophies, sun-drenched waterfront sanctuaries, and confidential off-market estates across Beverly Hills, Miami Beach, Manhattan, and the Côte d'Azur.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#properties"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-xs font-semibold tracking-wider uppercase text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-all shadow-md hover:shadow-lg active:scale-[0.98] border border-stone-800 focus-visible:outline-2 focus-visible:outline-stone-900"
            >
              <span>Explore Residences</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </a>

            <button
              type="button"
              onClick={onOpenConsultation}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold tracking-wider uppercase text-stone-900 bg-white/95 hover:bg-white backdrop-blur-md border border-stone-300 rounded-lg transition-all shadow-xs hover:shadow-md active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-stone-900"
            >
              <Compass className="w-4 h-4 text-amber-700" />
              <span>Private Advisory</span>
            </button>

            {/* Interactive Viewport Switcher: lets client view the estate in two bright sunlit settings */}
            <div className="hidden sm:inline-flex items-center gap-1 p-1 bg-white/90 backdrop-blur-md rounded-lg border border-stone-200 text-[11px] shadow-xs">
              <button
                type="button"
                onClick={() => setActiveHeroView('villa')}
                className={`px-2.5 py-1 rounded font-medium transition-all ${
                  activeHeroView === 'villa'
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Bel-Air Pavilion
              </button>
              <button
                type="button"
                onClick={() => setActiveHeroView('waterfront')}
                className={`px-2.5 py-1 rounded font-medium transition-all ${
                  activeHeroView === 'waterfront'
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Cap d'Antibes Coast
              </button>
            </div>
          </div>
        </div>

        {/* Floating Architectural Search Console */}
        <div className="mt-12 lg:mt-16 w-full">
          <form
            onSubmit={handleSearchSubmit}
            className="bg-white/95 backdrop-blur-md p-4 sm:p-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-stone-200/90 text-stone-900"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 items-end">
              {/* Location Select */}
              <div className="space-y-1.5">
                <label
                  htmlFor="hero-location"
                  className="block text-xs font-semibold uppercase tracking-wider text-stone-600 flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-700" />
                  <span>Metropolis / Region</span>
                </label>
                <div className="relative">
                  <select
                    id="hero-location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full h-11 px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/40 focus:border-amber-700 transition-all font-medium"
                  >
                    <option value="All">All Locations</option>
                    <option value="Beverly Hills">Beverly Hills, CA</option>
                    <option value="Miami Beach">Miami Beach, FL</option>
                    <option value="Manhattan">Manhattan, NY</option>
                    <option value="Bel Air">Bel Air, CA</option>
                    <option value="Aspen">Aspen, CO</option>
                    <option value="The Cotswolds">The Cotswolds, UK</option>
                    <option value="Cap Ferrat">Cap Ferrat, France</option>
                    <option value="London">Mayfair, London</option>
                  </select>
                </div>
              </div>

              {/* Property Type Select */}
              <div className="space-y-1.5">
                <label
                  htmlFor="hero-type"
                  className="block text-xs font-semibold uppercase tracking-wider text-stone-600 flex items-center gap-1.5"
                >
                  <Home className="w-3.5 h-3.5 text-amber-700" />
                  <span>Property Type</span>
                </label>
                <div className="relative">
                  <select
                    id="hero-type"
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full h-11 px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/40 focus:border-amber-700 transition-all font-medium"
                  >
                    <option value="All">All Architecture</option>
                    <option value="Architectural Estate">Architectural Estate</option>
                    <option value="Modern Villa">Modern Villa</option>
                    <option value="Waterfront Residence">Waterfront Residence</option>
                    <option value="Skyline Penthouse">Skyline Penthouse</option>
                    <option value="Historic Manor">Historic Manor</option>
                  </select>
                </div>
              </div>

              {/* Price Range Select */}
              <div className="space-y-1.5">
                <label
                  htmlFor="hero-price"
                  className="block text-xs font-semibold uppercase tracking-wider text-stone-600 flex items-center gap-1.5"
                >
                  <DollarSign className="w-3.5 h-3.5 text-amber-700" />
                  <span>Price Range</span>
                </label>
                <div className="relative">
                  <select
                    id="hero-price"
                    value={priceBucket}
                    onChange={(e) => setPriceBucket(e.target.value)}
                    className="w-full h-11 px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/40 focus:border-amber-700 transition-all font-medium"
                  >
                    <option value="All">All Price Tiers</option>
                    <option value="under-20m">Under $20,000,000</option>
                    <option value="20m-25m">$20,000,000 – $25,000,000</option>
                    <option value="over-25m">$25,000,000+</option>
                  </select>
                </div>
              </div>

              {/* Bedrooms Select */}
              <div className="space-y-1.5">
                <label
                  htmlFor="hero-beds"
                  className="block text-xs font-semibold uppercase tracking-wider text-stone-600 flex items-center gap-1.5"
                >
                  <Bed className="w-3.5 h-3.5 text-amber-700" />
                  <span>Bedrooms</span>
                </label>
                <div className="relative">
                  <select
                    id="hero-beds"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                    className="w-full h-11 px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/40 focus:border-amber-700 transition-all font-medium"
                  >
                    <option value="All">Any Bedrooms</option>
                    <option value="4">4+ Bedrooms</option>
                    <option value="5">5+ Bedrooms</option>
                    <option value="6">6+ Bedrooms</option>
                    <option value="7">7+ Bedrooms</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full h-11 inline-flex items-center justify-center gap-2 px-5 text-xs font-semibold tracking-wider uppercase text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-all shadow-sm active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-stone-900 whitespace-nowrap"
                >
                  <Search className="w-4 h-4 text-amber-400" />
                  <span>Find Residences</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Trust & Quantitative Proof Ribbon - Clean, Architectural White & Cream styling */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-10">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-stone-200/90 p-5 sm:p-6 shadow-sm">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-stone-900">
            <div className="flex flex-col border-r border-stone-200/60 last:border-r-0 pr-4">
              <span className="font-serif text-2xl sm:text-3xl text-stone-950 font-semibold tabular-nums">$4.8B+</span>
              <span className="text-[11px] text-stone-500 uppercase tracking-wider font-medium mt-0.5">Career Volume Transacted</span>
            </div>
            <div className="flex flex-col border-r border-stone-200/60 last:border-r-0 pr-4">
              <span className="font-serif text-2xl sm:text-3xl text-stone-950 font-semibold tabular-nums">350+</span>
              <span className="text-[11px] text-stone-500 uppercase tracking-wider font-medium mt-0.5">Represented Estates</span>
            </div>
            <div className="flex flex-col sm:border-r border-stone-200/60 last:border-r-0 pr-4">
              <span className="font-serif text-2xl sm:text-3xl text-stone-950 font-semibold tabular-nums">18</span>
              <span className="text-[11px] text-stone-500 uppercase tracking-wider font-medium mt-0.5">Global Metropolitan Hubs</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl sm:text-3xl text-amber-800 font-semibold tabular-nums">99.4%</span>
              <span className="text-[11px] text-stone-500 uppercase tracking-wider font-medium mt-0.5">Off-Market Discretion</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
