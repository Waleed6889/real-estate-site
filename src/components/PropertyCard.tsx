import React from 'react';
import { Bookmark, ArrowUpRight, Bed, Bath, Maximize2 } from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelectProperty: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isFavorite,
  onToggleFavorite,
  onSelectProperty,
}) => {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(property.price);

  const formattedSqft = new Intl.NumberFormat('en-US').format(property.sqft);

  return (
    <div
      onClick={() => onSelectProperty(property)}
      className="group relative flex flex-col bg-white rounded-xl overflow-hidden border border-stone-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:border-stone-300 transition-all duration-300 cursor-pointer"
    >
      {/* Visual Slot */}
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Quiet editorial tag top left */}
        <div className="absolute top-3 left-3 bg-[#121316]/85 backdrop-blur-md text-stone-200 text-[11px] font-medium tracking-wider uppercase px-2.5 py-1 rounded">
          {property.tag}
        </div>

        {/* Favorite button top right */}
        <button
          type="button"
          onClick={(e) => onToggleFavorite(property.id, e)}
          aria-label={isFavorite ? 'Remove from saved residences' : 'Save residence to favorites'}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
            isFavorite
              ? 'bg-amber-800 text-white shadow-md'
              : 'bg-black/40 text-white hover:bg-black/70 hover:scale-105'
          }`}
        >
          <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Bottom subtle gradient on image */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
        <div className="absolute bottom-3 left-3 text-white text-xs font-light tracking-wide drop-shadow-sm">
          {property.city}, {property.state || property.country}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          {/* Unboxed category / architectural style kicker */}
          <div className="flex items-center gap-2 text-xs text-stone-500 font-medium tracking-wide">
            <span>{property.propertyType}</span>
            <span aria-hidden="true">·</span>
            <span>{property.architecturalStyle}</span>
          </div>

          {/* Primary Title */}
          <h3 className="mt-1.5 font-serif text-xl sm:text-2xl text-stone-900 group-hover:text-amber-800 transition-colors line-clamp-1">
            {property.title}
          </h3>

          {/* Location line */}
          <p className="mt-1 text-xs text-stone-500 line-clamp-1">
            {property.location}
          </p>

          {/* Price */}
          <div className="mt-3.5 flex items-baseline gap-2">
            <span className="font-serif text-2xl font-semibold text-stone-950 tabular-nums">
              {formattedPrice}
            </span>
          </div>

          {/* Clean Unboxed Metadata Specs with dividers */}
          <div className="mt-4 pt-3.5 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600 font-medium tabular-nums">
            <div className="flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-stone-400" />
              <span>{property.bedrooms} Beds</span>
            </div>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <div className="flex items-center gap-1.5">
              <Bath className="w-3.5 h-3.5 text-stone-400" />
              <span>{property.bathrooms} Baths</span>
            </div>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-stone-400" />
              <span>{formattedSqft} sq ft</span>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
          <span className="text-amber-800 font-semibold group-hover:text-amber-900 flex items-center gap-1">
            View Architectural Dossier
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
          <span className="text-stone-400 font-light">Built {property.yearBuilt}</span>
        </div>
      </div>
    </div>
  );
};
