import React, { useState, useEffect } from 'react';
import { Bookmark, Menu, X, ArrowUpRight, Phone, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  favoritesCount: number;
  onOpenFavorites: () => void;
  onOpenConsultation: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  favoritesCount,
  onOpenFavorites,
  onOpenConsultation,
  activeSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Residences', href: '#properties' },
    { label: 'Collections', href: '#categories' },
    { label: 'The Standard', href: '#why-us' },
    { label: 'Advisors', href: '#agents' },
    { label: 'Ethos', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Top Advisory Micro-Bar: Gives an immediate high-end boutique agency authority */}
      <div className="bg-[#1C1917] text-stone-300 text-[11px] py-1.5 px-4 hidden sm:block border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-stone-300">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
              <span className="tracking-wide">Private Wealth & Architectural Fiduciary</span>
            </span>
            <span className="text-stone-600">·</span>
            <span className="text-stone-400 font-light">Beverly Hills · Miami · Manhattan · London · Geneva</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="tel:+13105550198"
              className="flex items-center gap-1.5 text-stone-300 hover:text-amber-300 transition-colors font-mono"
            >
              <Phone className="w-3 h-3 text-amber-500" />
              <span>Direct Concierge: +1 (310) 555-0198</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Luxury Header */}
      <header
        className={`sticky top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF9F5]/95 backdrop-blur-md shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] border-b border-stone-200/90 py-3.5'
            : 'bg-[#FAF9F5]/90 backdrop-blur-md border-b border-stone-200/70 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Zone 1: Distinctive Luxury Wordmark with Architectural Monogram */}
            <a
              href="#"
              className="group flex items-center gap-3 text-decoration-none focus-visible:outline-2 focus-visible:outline-stone-900 rounded"
            >
              <div className="w-9 h-9 rounded-lg bg-stone-900 text-amber-400 flex items-center justify-center font-serif text-lg font-normal tracking-tighter shadow-xs group-hover:bg-amber-900 group-hover:text-amber-200 transition-colors border border-stone-800">
                V
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl tracking-[0.18em] font-normal text-stone-950 group-hover:text-amber-900 transition-colors leading-none">
                  VEYRA
                </span>
                <span className="text-[9px] uppercase tracking-[0.32em] font-sans font-medium text-amber-800 mt-1 leading-none">
                  Estates
                </span>
              </div>
            </a>

            {/* Zone 2: Editorial Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7 text-[13px] font-medium tracking-wide">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className={`relative py-1.5 transition-colors ${
                      isActive
                        ? 'text-stone-950 font-semibold'
                        : 'text-stone-600 hover:text-stone-950'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-amber-700" />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Zone 3: Actions (Saved Residences & Private Advisory) */}
            <div className="flex items-center gap-3">
              {/* Saved / Favorites action */}
              <button
                type="button"
                onClick={onOpenFavorites}
                aria-label={`View saved residences (${favoritesCount})`}
                className="relative flex items-center gap-2 px-3 py-2 text-xs font-medium text-stone-700 hover:text-stone-950 bg-stone-100/90 hover:bg-stone-200/70 border border-stone-200 rounded-lg transition-all focus-visible:outline-2 focus-visible:outline-stone-900"
              >
                <Bookmark className="w-3.5 h-3.5 text-amber-700" />
                <span className="hidden sm:inline font-medium">Saved</span>
                {favoritesCount > 0 ? (
                  <span className="flex items-center justify-center min-w-5 h-5 px-1.5 text-[11px] font-semibold text-white bg-stone-900 rounded-full tabular-nums">
                    {favoritesCount}
                  </span>
                ) : (
                  <span className="text-[11px] text-stone-400 tabular-nums">0</span>
                )}
              </button>

              {/* Private Advisory Button */}
              <button
                type="button"
                onClick={onOpenConsultation}
                className="hidden sm:inline-flex items-center gap-2 px-4.5 py-2 text-xs font-semibold tracking-wider uppercase text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-all shadow-sm active:scale-[0.98] border border-stone-800 focus-visible:outline-2 focus-visible:outline-stone-900"
              >
                <span>Private Advisory</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
              </button>

              {/* Mobile menu toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle mobile menu"
                className="lg:hidden p-2 rounded-lg text-stone-800 hover:bg-stone-100 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed right-0 top-0 bottom-0 w-full max-w-xs bg-[#FAF9F5] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-stone-200">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-stone-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-stone-900 text-amber-400 flex items-center justify-center font-serif text-base">
                    V
                  </div>
                  <div>
                    <span className="font-serif text-xl text-stone-950 font-normal tracking-wider block">
                      VEYRA
                    </span>
                    <span className="text-[9px] uppercase tracking-widest text-amber-800 font-semibold block">
                      Estates
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-stone-600 hover:text-stone-900"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-8 flex flex-col gap-3 text-sm font-medium">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2.5 px-3 rounded-lg text-stone-700 hover:text-stone-950 hover:bg-stone-100 transition-colors flex items-center justify-between"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-4 h-4 text-stone-400" />
                  </a>
                ))}
              </nav>

              <div className="mt-6 pt-4 border-t border-stone-200 space-y-3">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenFavorites();
                  }}
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg bg-stone-100 text-stone-800 text-xs font-medium"
                >
                  <span className="flex items-center gap-2">
                    <Bookmark className="w-4 h-4 text-amber-700" />
                    Saved Residences
                  </span>
                  <span className="text-xs font-semibold bg-stone-900 text-white px-2 py-0.5 rounded-full tabular-nums">
                    {favoritesCount}
                  </span>
                </button>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-stone-200 space-y-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-stone-900 text-white text-xs uppercase font-semibold tracking-wider hover:bg-stone-800 transition-colors"
              >
                <span>Book Private Advisory</span>
                <ArrowUpRight className="w-4 h-4 text-amber-400" />
              </button>

              <div className="text-center text-xs text-stone-500 pt-2 flex items-center justify-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-700" />
                <span>Concierge: +1 (310) 555-0198</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
