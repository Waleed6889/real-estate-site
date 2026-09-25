import React from 'react';
import { Property, FilterState } from '../types';
import { PropertyCard } from './PropertyCard';
import { SlidersHorizontal, RotateCcw, Bookmark, Search, ArrowUpDown } from 'lucide-react';

interface PropertyGridProps {
  properties: Property[];
  allProperties: Property[];
  filters: FilterState;
  onUpdateFilters: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  favorites: string[];
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelectProperty: (property: Property) => void;
}

export const PropertyGrid: React.FC<PropertyGridProps> = ({
  properties,
  allProperties,
  filters,
  onUpdateFilters,
  onResetFilters,
  favorites,
  onToggleFavorite,
  onSelectProperty,
}) => {
  const propertyTypes = [
    'All',
    'Modern Villa',
    'Waterfront Residence',
    'Skyline Penthouse',
    'Architectural Estate',
    'Historic Manor',
  ];

  const locations = [
    'All',
    'Beverly Hills',
    'Miami Beach',
    'Manhattan',
    'Bel Air',
    'Aspen',
    'The Cotswolds',
    'Cap Ferrat',
    'London',
  ];

  return (
    <section id="properties" className="py-20 lg:py-28 bg-[#FAF9F5] border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-stone-200">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-800">
              The Portfolio
            </div>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight">
              Curated Prime Residences
            </h2>
            <p className="mt-2 text-stone-600 text-sm sm:text-base max-w-xl">
              Each residence in our portfolio undergoes rigorous architectural verification, provenance appraisal, and title authenticity review.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-stone-500 font-medium">
              Showing <strong className="text-stone-900 tabular-nums">{properties.length}</strong> of{' '}
              <strong className="text-stone-900 tabular-nums">{allProperties.length}</strong> trophies
            </span>

            {/* Favorites filter toggle */}
            <button
              type="button"
              onClick={() => onUpdateFilters({ onlyFavorites: !filters.onlyFavorites })}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all border ${
                filters.onlyFavorites
                  ? 'bg-amber-800 text-white border-amber-800 shadow-sm'
                  : 'bg-white text-stone-700 border-stone-300 hover:border-stone-400'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Favorites ({favorites.length})</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="mt-8 space-y-4">
          {/* Category Tabs (Segmented Control) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {propertyTypes.map((type) => {
              const isActive = filters.propertyType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => onUpdateFilters({ propertyType: type })}
                  className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? 'bg-stone-900 text-white shadow-sm'
                      : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50 hover:text-stone-900'
                  }`}
                >
                  {type === 'All' ? 'All Residences' : type}
                </button>
              );
            })}
          </div>

          {/* Secondary Filter Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-white p-4 rounded-xl border border-stone-200 shadow-sm">
            {/* Search keyword */}
            <div className="relative">
              <label htmlFor="grid-search" className="sr-only">Search by title or feature</label>
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="grid-search"
                type="text"
                value={filters.search}
                onChange={(e) => onUpdateFilters({ search: e.target.value })}
                placeholder="Search name, feature, or style..."
                className="w-full h-10 pl-9 pr-3 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/40 focus:border-amber-700"
              />
            </div>

            {/* Location Filter */}
            <div>
              <label htmlFor="grid-location" className="sr-only">Location filter</label>
              <select
                id="grid-location"
                value={filters.location}
                onChange={(e) => onUpdateFilters({ location: e.target.value })}
                className="w-full h-10 px-3 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-700/40 focus:border-amber-700"
              >
                <option value="All">All Locations</option>
                {locations.filter((l) => l !== 'All').map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Bedrooms Filter */}
            <div>
              <label htmlFor="grid-bedrooms" className="sr-only">Bedrooms filter</label>
              <select
                id="grid-bedrooms"
                value={filters.minBedrooms}
                onChange={(e) => onUpdateFilters({ minBedrooms: e.target.value })}
                className="w-full h-10 px-3 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-700/40 focus:border-amber-700"
              >
                <option value="All">Any Bedrooms</option>
                <option value="4">4+ Bedrooms</option>
                <option value="5">5+ Bedrooms</option>
                <option value="6">6+ Bedrooms</option>
                <option value="7">7+ Bedrooms</option>
              </select>
            </div>

            {/* Sorting Options */}
            <div className="flex items-center gap-2">
              <div className="relative flex-grow">
                <label htmlFor="grid-sort" className="sr-only">Sort properties</label>
                <select
                  id="grid-sort"
                  value={filters.sortBy}
                  onChange={(e) =>
                    onUpdateFilters({
                      sortBy: e.target.value as FilterState['sortBy'],
                    })
                  }
                  className="w-full h-10 pl-3 pr-8 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-700/40 focus:border-amber-700"
                >
                  <option value="featured">Featured Curations</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="newest">Year Built (Newest)</option>
                  <option value="size-desc">Size: Largest Interior</option>
                </select>
                <ArrowUpDown className="w-3.5 h-3.5 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Reset button */}
              <button
                type="button"
                onClick={onResetFilters}
                title="Reset all filters"
                className="h-10 px-3 flex items-center justify-center text-xs text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors border border-stone-200"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        {properties.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isFavorite={favorites.includes(property.id)}
                onToggleFavorite={onToggleFavorite}
                onSelectProperty={onSelectProperty}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="mt-16 text-center py-16 px-4 bg-white rounded-2xl border border-stone-200 max-w-xl mx-auto shadow-sm">
            <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-500 mb-4">
              <SlidersHorizontal className="w-6 h-6 text-stone-400" />
            </div>
            <h3 className="font-serif text-2xl text-stone-900 font-normal">
              No matching residences found
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-stone-500 max-w-sm mx-auto">
              We couldn’t find any properties matching your current filter criteria.
              Try adjusting the location, budget, or clearing your filters.
            </p>
            <button
              type="button"
              onClick={onResetFilters}
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
