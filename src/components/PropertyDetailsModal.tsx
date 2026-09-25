import React, { useState, useEffect } from 'react';
import { Property, Agent } from '../types';
import {
  X,
  Bookmark,
  Share2,
  Bed,
  Bath,
  Maximize2,
  Calendar,
  Warehouse,
  Shield,
  CheckCircle2,
  Phone,
  Mail,
  Compass,
  DollarSign,
  Calculator,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface PropertyDetailsModalProps {
  property: Property | null;
  agent?: Agent;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onClose: () => void;
}

export const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({
  property,
  agent,
  isFavorite,
  onToggleFavorite,
  onClose,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryDate, setInquiryDate] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState(
    'I would like to request the private architectural dossier and schedule a confidential viewing of this property.'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (property) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [property, onClose]);

  if (!property) return null;

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(property.price);

  const formattedSqft = new Intl.NumberFormat('en-US').format(property.sqft);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!inquiryName.trim() || !inquiryEmail.trim() || !inquiryPhone.trim()) {
      setErrorMessage('Please fill in your name, email, and contact phone number.');
      return;
    }

    if (!inquiryEmail.includes('@') || !inquiryEmail.includes('.')) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative bg-[#FAF9F5] w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden z-10 my-auto max-h-[92vh] flex flex-col border border-stone-200">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-white sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
              {property.tag}
            </span>
            <span className="text-stone-300">·</span>
            <span className="text-xs text-stone-500 font-medium">Ref: {property.id.toUpperCase()}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="p-2 text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
              title="Copy share link"
            >
              <Share2 className="w-4 h-4" />
            </button>
            {copiedLink && (
              <span className="text-xs text-amber-800 font-medium px-2 py-1 bg-amber-50 rounded">
                Link Copied!
              </span>
            )}

            <button
              type="button"
              onClick={(e) => onToggleFavorite(property.id, e)}
              className={`p-2 rounded-lg transition-colors ${
                isFavorite
                  ? 'text-amber-800 bg-amber-50 hover:bg-amber-100'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
              title={isFavorite ? 'Remove from saved' : 'Save residence'}
            >
              <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors ml-2"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Gallery Viewport */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-stone-900">
              <img
                src={property.images[activeImageIndex] || property.images[0]}
                alt={`${property.title} view ${activeImageIndex + 1}`}
                className="w-full h-full object-cover object-center"
              />

              {property.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveImageIndex((prev) =>
                        prev === 0 ? property.images.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/75 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveImageIndex((prev) =>
                        prev === property.images.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/75 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-black/60 text-white text-xs tabular-nums">
                {activeImageIndex + 1} / {property.images.length}
              </div>
            </div>

            {/* Thumbnail Selectors */}
            {property.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                      activeImageIndex === idx
                        ? 'border-amber-700 opacity-100 scale-95'
                        : 'border-transparent opacity-60 hover:opacity-90'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Primary Header & Price */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-stone-200">
            <div>
              <div className="flex items-center gap-2 text-xs text-stone-500 font-medium tracking-wide">
                <span>{property.propertyType}</span>
                <span aria-hidden="true">·</span>
                <span>{property.architecturalStyle}</span>
              </div>
              <h1 className="mt-1 font-serif text-3xl sm:text-4xl text-stone-900 font-normal">
                {property.title}
              </h1>
              <p className="mt-1.5 text-sm text-stone-600">
                {property.location}, {property.city}, {property.state || property.country}
              </p>
            </div>

            <div className="flex flex-col md:items-end">
              <span className="text-xs uppercase tracking-wider text-stone-500">Offered At</span>
              <span className="font-serif text-3xl sm:text-4xl font-semibold text-stone-950 tabular-nums">
                {formattedPrice}
              </span>
              <span className="text-xs text-stone-500 mt-0.5">USD · Confidential Escrow</span>
            </div>
          </div>

          {/* Key Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 py-4 px-5 bg-white rounded-xl border border-stone-200">
            <div className="flex flex-col">
              <span className="text-[11px] uppercase tracking-wider text-stone-500 flex items-center gap-1">
                <Bed className="w-3.5 h-3.5 text-amber-700" /> Bedrooms
              </span>
              <span className="mt-1 font-serif text-lg font-semibold text-stone-900 tabular-nums">
                {property.bedrooms} Suites
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-[11px] uppercase tracking-wider text-stone-500 flex items-center gap-1">
                <Bath className="w-3.5 h-3.5 text-amber-700" /> Bathrooms
              </span>
              <span className="mt-1 font-serif text-lg font-semibold text-stone-900 tabular-nums">
                {property.bathrooms} Full
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-[11px] uppercase tracking-wider text-stone-500 flex items-center gap-1">
                <Maximize2 className="w-3.5 h-3.5 text-amber-700" /> Living Area
              </span>
              <span className="mt-1 font-serif text-lg font-semibold text-stone-900 tabular-nums">
                {formattedSqft} sq ft
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-[11px] uppercase tracking-wider text-stone-500 flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-amber-700" /> Lot Size
              </span>
              <span className="mt-1 font-serif text-lg font-semibold text-stone-900 tabular-nums">
                {property.lotSize}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-[11px] uppercase tracking-wider text-stone-500 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-700" /> Year Built
              </span>
              <span className="mt-1 font-serif text-lg font-semibold text-stone-900 tabular-nums">
                {property.yearBuilt}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-[11px] uppercase tracking-wider text-stone-500 flex items-center gap-1">
                <Warehouse className="w-3.5 h-3.5 text-amber-700" /> Motor Gallery
              </span>
              <span className="mt-1 font-serif text-lg font-semibold text-stone-900 tabular-nums">
                {property.garage} Vehicles
              </span>
            </div>
          </div>

          {/* Architectural Narrative */}
          <div className="space-y-3">
            <h3 className="font-serif text-2xl text-stone-900 font-normal">
              Architectural Statement & Provenance
            </h3>
            <p className="text-stone-700 leading-relaxed text-sm sm:text-base font-light">
              {property.description}
            </p>
          </div>

          {/* Features and Amenities Two-Column */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="bg-white p-6 rounded-xl border border-stone-200">
              <h4 className="font-serif text-lg text-stone-900 font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-700" />
                Signature Architecture Highlights
              </h4>
              <ul className="space-y-2.5">
                {property.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700">
                    <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl border border-stone-200">
              <h4 className="font-serif text-lg text-stone-900 font-semibold mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-700" />
                Bespoke Amenities & Security
              </h4>
              <ul className="space-y-2.5">
                {property.amenities.map((amenity, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700">
                    <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <span>{amenity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Private Advisor & Direct Inquiry Section */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Agent Profile Left Column */}
              <div className="lg:col-span-5 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-stone-200 pb-6 lg:pb-0 lg:pr-8">
                <div>
                  <span className="text-xs uppercase tracking-wider text-amber-800 font-semibold">
                    Listing Partner
                  </span>
                  <div className="mt-4 flex items-center gap-4">
                    <img
                      src={agent?.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
                      alt={agent?.name || 'Veyra Partner'}
                      className="w-16 h-16 rounded-full object-cover border-2 border-stone-200"
                    />
                    <div>
                      <h4 className="font-serif text-xl font-semibold text-stone-900">
                        {agent?.name || 'Julian Vance-Moreau'}
                      </h4>
                      <p className="text-xs text-stone-500">{agent?.title || 'Senior Managing Partner'}</p>
                      <p className="text-xs text-stone-400 mt-0.5">{agent?.location || 'Beverly Hills, CA'}</p>
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-stone-600 leading-relaxed font-light">
                    {agent?.bio ||
                      'Specializing in architecturally significant trophy properties and confidential acquisitions.'}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 space-y-2 text-xs text-stone-600">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-amber-700" />
                    <span className="font-mono">{agent?.phone || '+1 (310) 555-0142'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-amber-700" />
                    <span>{agent?.email || 'advisory@veyraestates.com'}</span>
                  </div>
                </div>
              </div>

              {/* Inquiry Form Right Column */}
              <div className="lg:col-span-7">
                <h4 className="font-serif text-xl text-stone-900 font-semibold mb-1">
                  Schedule Private Viewing & Dossier Request
                </h4>
                <p className="text-xs text-stone-500 mb-4">
                  All requests are processed confidentially under institutional non-disclosure standards.
                </p>

                {isSubmitted ? (
                  <div className="p-6 bg-stone-50 border border-stone-200 rounded-xl text-center space-y-3">
                    <CheckCircle2 className="w-8 h-8 text-amber-700 mx-auto" />
                    <h5 className="font-serif text-lg text-stone-900">Request Confirmed</h5>
                    <p className="text-xs text-stone-600 max-w-md mx-auto">
                      Thank you, {inquiryName}. Senior Partner {agent?.name || 'Julian Vance'} has received
                      your inquiry for <em>{property.title}</em>. You will receive the comprehensive
                      architectural dossier via secure portal within 4 business hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="mt-2 text-xs text-amber-800 font-semibold hover:underline"
                    >
                      Send another request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="space-y-3.5">
                    {errorMessage && (
                      <div className="p-2.5 text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg">
                        {errorMessage}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-600 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={inquiryName}
                          onChange={(e) => setInquiryName(e.target.value)}
                          placeholder="Lord Arthur Sterling"
                          className="w-full h-10 px-3 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/40"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-600 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={inquiryEmail}
                          onChange={(e) => setInquiryEmail(e.target.value)}
                          placeholder="arthur@sterling-family.com"
                          className="w-full h-10 px-3 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/40"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-600 mb-1">
                          Direct Telephone *
                        </label>
                        <input
                          type="tel"
                          required
                          value={inquiryPhone}
                          onChange={(e) => setInquiryPhone(e.target.value)}
                          placeholder="+1 (310) 555-0199"
                          className="w-full h-10 px-3 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/40"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-600 mb-1">
                          Preferred Showing Date
                        </label>
                        <input
                          type="date"
                          value={inquiryDate}
                          onChange={(e) => setInquiryDate(e.target.value)}
                          className="w-full h-10 px-3 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/40"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-600 mb-1">
                        Confidential Notes / Representation
                      </label>
                      <textarea
                        rows={2}
                        value={inquiryMessage}
                        onChange={(e) => setInquiryMessage(e.target.value)}
                        className="w-full p-3 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/40 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 px-4 rounded-lg bg-stone-900 text-white text-xs uppercase font-semibold tracking-wider hover:bg-stone-800 transition-all shadow-md disabled:opacity-50"
                    >
                      {isSubmitting ? 'Transmitting to Private Advisor...' : 'Request Showing & Dossier'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
