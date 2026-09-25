/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Property, Agent, FilterState } from './types';
import { PROPERTIES, AGENTS } from './data/mockData';

// Components
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PropertyGrid } from './components/PropertyGrid';
import { PropertyDetailsModal } from './components/PropertyDetailsModal';
import { PropertyCategories } from './components/PropertyCategories';
import { WhyChooseUs } from './components/WhyChooseUs';
import { AboutSection } from './components/AboutSection';
import { AgentsSection } from './components/AgentsSection';
import { MortgageCalculator } from './components/MortgageCalculator';
import { TestimonialsSection } from './components/TestimonialsSection';
import { CtaSection } from './components/CtaSection';
import { ContactSection } from './components/ContactSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { LegalModal } from './components/LegalModal';
import { ArrowUp, Bookmark } from 'lucide-react';

const INITIAL_FILTERS: FilterState = {
  search: '',
  location: 'All',
  propertyType: 'All',
  maxPrice: 60000000,
  minBedrooms: 'All',
  sortBy: 'featured',
  onlyFavorites: false,
};

export default function App() {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('veyra_favorites');
      return stored ? JSON.parse(stored) : ['prop-1', 'prop-3'];
    } catch {
      return ['prop-1', 'prop-3'];
    }
  });

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationAgent, setConsultationAgent] = useState<Agent | null>(null);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<'privacy' | 'terms'>('privacy');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('properties');

  // Save favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('veyra_favorites', JSON.stringify(favorites));
    } catch {
      // Ignore if localStorage unavailable
    }
  }, [favorites]);

  // Handle scroll-to-top button visibility and active section tracking
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);

      // Section spy
      const sections = ['properties', 'categories', 'why-us', 'agents', 'about', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Show temporary toast
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Toggle favorite property
  const handleToggleFavorite = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFavorites((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        triggerToast('Removed from saved residences');
        return prev.filter((item) => item !== id);
      } else {
        triggerToast('Added to confidential registry');
        return [...prev, id];
      }
    });
  };

  // Clear all favorites
  const handleClearFavorites = () => {
    setFavorites([]);
    triggerToast('All saved residences cleared');
  };

  // Update filters partial
  const handleUpdateFilters = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  // Reset filters
  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
    triggerToast('Filter criteria reset');
  };

  // Hero Search trigger
  const handleHeroSearch = ({
    location,
    propertyType,
    priceBucket,
    bedrooms,
  }: {
    location: string;
    propertyType: string;
    priceBucket: string;
    bedrooms: string;
  }) => {
    let maxPrice = 60000000;
    if (priceBucket === 'under-20m') maxPrice = 20000000;
    else if (priceBucket === '20m-25m') maxPrice = 25000000;

    setFilters((prev) => ({
      ...prev,
      location,
      propertyType,
      minBedrooms: bedrooms,
      maxPrice,
      search: '',
    }));
  };

  // Filtered & Sorted Properties List
  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter((item) => {
      // Favorites filter
      if (filters.onlyFavorites && !favorites.includes(item.id)) {
        return false;
      }

      // Location filter
      if (filters.location !== 'All') {
        const locLower = filters.location.toLowerCase();
        const matchesCity = item.city.toLowerCase().includes(locLower);
        const matchesLoc = item.location.toLowerCase().includes(locLower);
        if (!matchesCity && !matchesLoc) return false;
      }

      // Property Type filter
      if (filters.propertyType !== 'All' && item.propertyType !== filters.propertyType) {
        return false;
      }

      // Bedrooms filter
      if (filters.minBedrooms !== 'All') {
        const minBeds = parseInt(filters.minBedrooms, 10);
        if (item.bedrooms < minBeds) return false;
      }

      // Search keyword filter
      if (filters.search.trim()) {
        const query = filters.search.toLowerCase();
        const inTitle = item.title.toLowerCase().includes(query);
        const inDesc = item.description.toLowerCase().includes(query);
        const inStyle = item.architecturalStyle.toLowerCase().includes(query);
        const inFeatures = item.features.some((f) => f.toLowerCase().includes(query));
        if (!inTitle && !inDesc && !inStyle && !inFeatures) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'newest') return b.yearBuilt - a.yearBuilt;
      if (filters.sortBy === 'size-desc') return b.sqft - a.sqft;
      // Default: featured first
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [filters, favorites]);

  // Saved properties array for drawer
  const savedPropertiesList = useMemo(() => {
    return PROPERTIES.filter((p) => favorites.includes(p.id));
  }, [favorites]);

  const assignedAgentForModal = useMemo(() => {
    if (!selectedProperty) return undefined;
    return AGENTS.find((a) => a.id === selectedProperty.agentId) || AGENTS[0];
  }, [selectedProperty]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-stone-900 font-sans selection:bg-amber-800/15 selection:text-amber-900 flex flex-col">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 py-2.5 px-4 rounded-xl bg-stone-900 text-white text-xs font-medium tracking-wide shadow-xl flex items-center gap-2 animate-fade-in border border-stone-700">
          <Bookmark className="w-3.5 h-3.5 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Primary Sticky Top Bar */}
      <Navbar
        favoritesCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenConsultation={() => {
          setConsultationAgent(null);
          setIsConsultationOpen(true);
        }}
        activeSection={activeSection}
      />

      {/* Main Hero Viewport */}
      <Hero
        onSearch={handleHeroSearch}
        onOpenConsultation={() => {
          setConsultationAgent(null);
          setIsConsultationOpen(true);
        }}
      />

      {/* Curated Properties Portfolio */}
      <PropertyGrid
        properties={filteredProperties}
        allProperties={PROPERTIES}
        filters={filters}
        onUpdateFilters={handleUpdateFilters}
        onResetFilters={handleResetFilters}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
        onSelectProperty={(property) => setSelectedProperty(property)}
      />

      {/* Architectural Typology Collections */}
      <PropertyCategories
        onSelectCategory={(categoryType) => {
          setFilters((prev) => ({
            ...prev,
            propertyType: categoryType,
            onlyFavorites: false,
          }));
        }}
      />

      {/* Why Choose Us: The Veyra Standard */}
      <WhyChooseUs
        onOpenConsultation={() => {
          setConsultationAgent(null);
          setIsConsultationOpen(true);
        }}
      />

      {/* Heritage & Ethos (About Section) */}
      <AboutSection />

      {/* Real Estate Advisory Partners */}
      <AgentsSection
        onSelectAgent={(agent) => {
          setConsultationAgent(agent);
          setIsConsultationOpen(true);
        }}
      />

      {/* Mortgage & Private Financial Calculator */}
      <MortgageCalculator />

      {/* Authentic Client Testimonials */}
      <TestimonialsSection />

      {/* Conversion Call to Action */}
      <CtaSection
        onOpenConsultation={() => {
          setConsultationAgent(null);
          setIsConsultationOpen(true);
        }}
      />

      {/* Confidential Contact Section */}
      <ContactSection />

      {/* Frequently Addressed Questions */}
      <FaqSection />

      {/* Quiet Luxury Footer */}
      <Footer
        onOpenPrivacy={() => {
          setLegalTab('privacy');
          setIsLegalOpen(true);
        }}
        onOpenTerms={() => {
          setLegalTab('terms');
          setIsLegalOpen(true);
        }}
        onOpenConsultation={() => {
          setConsultationAgent(null);
          setIsConsultationOpen(true);
        }}
      />

      {/* Floating Scroll To Top Button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-stone-900 text-white shadow-xl hover:bg-stone-800 transition-all hover:scale-105 active:scale-95 border border-stone-700"
        >
          <ArrowUp className="w-4 h-4 text-amber-400" />
        </button>
      )}

      {/* Property Details Modal */}
      <PropertyDetailsModal
        property={selectedProperty}
        agent={assignedAgentForModal}
        isFavorite={selectedProperty ? favorites.includes(selectedProperty.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onClose={() => setSelectedProperty(null)}
      />

      {/* Saved Residences Drawer */}
      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        savedProperties={savedPropertiesList}
        onClose={() => setIsFavoritesOpen(false)}
        onSelectProperty={(property) => setSelectedProperty(property)}
        onRemoveFavorite={handleToggleFavorite}
        onClearAll={handleClearFavorites}
      />

      {/* Private Advisory Consultation Appointment Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        selectedAgent={consultationAgent}
        onClose={() => setIsConsultationOpen(false)}
      />

      {/* Legal & Compliance Modal (Privacy & Terms) */}
      <LegalModal
        isOpen={isLegalOpen}
        initialTab={legalTab}
        onClose={() => setIsLegalOpen(false)}
      />
    </div>
  );
}
