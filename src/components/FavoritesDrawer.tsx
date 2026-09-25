import React, { useEffect } from 'react';
import { Property } from '../types';
import { X, Bookmark, Trash2, ArrowUpRight, Bed, Bath, Maximize2 } from 'lucide-react';

interface FavoritesDrawerProps {
  isOpen: boolean;
  savedProperties: Property[];
  onClose: () => void;
  onSelectProperty: (property: Property) => void;
  onRemoveFavorite: (id: string, e: React.MouseEvent) => void;
  onClearAll: () => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  savedProperties,
  onClose,
  onSelectProperty,
  onRemoveFavorite,
  onClearAll,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF9F5] shadow-2xl flex flex-col justify-between border-l border-stone-200">
          {/* Header */}
          <div className="p-6 border-b border-stone-200 bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-amber-700 fill-current" />
              <h2 className="font-serif text-xl font-medium text-stone-900">
                Saved Residences
              </h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 tabular-nums">
                {savedProperties.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {savedProperties.length > 0 && (
                <button
                  type="button"
                  onClick={onClearAll}
                  className="text-xs text-stone-500 hover:text-red-700 transition-colors"
                >
                  Clear All
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* List Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {savedProperties.length > 0 ? (
              savedProperties.map((property) => {
                const formattedPrice = new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 0,
                }).format(property.price);

                return (
                  <div
                    key={property.id}
                    className="group bg-white p-3.5 rounded-xl border border-stone-200 shadow-xs hover:shadow-md transition-shadow flex gap-3.5"
                  >
                    <div
                      onClick={() => {
                        onClose();
                        onSelectProperty(property);
                      }}
                      className="w-24 h-24 rounded-lg overflow-hidden shrink-0 bg-stone-100 cursor-pointer"
                    >
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4
                            onClick={() => {
                              onClose();
                              onSelectProperty(property);
                            }}
                            className="font-serif text-base text-stone-900 font-medium hover:text-amber-800 transition-colors cursor-pointer line-clamp-1"
                          >
                            {property.title}
                          </h4>
                          <button
                            type="button"
                            onClick={(e) => onRemoveFavorite(property.id, e)}
                            className="text-stone-400 hover:text-red-700 p-1 rounded"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-xs text-stone-500">{property.city}</p>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-100 text-xs">
                        <span className="font-semibold text-stone-950 tabular-nums">
                          {formattedPrice}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            onSelectProperty(property);
                          }}
                          className="text-amber-800 font-medium hover:underline flex items-center gap-0.5"
                        >
                          View
                          <ArrowUpRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-16 space-y-3">
                <Bookmark className="w-10 h-10 text-stone-300 mx-auto" />
                <h3 className="font-serif text-lg text-stone-800">
                  Your portfolio registry is empty
                </h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Click the bookmark icon on any residence card to curate your confidential short list.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-4 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 rounded-lg hover:bg-stone-800"
                >
                  Browse Residences
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          {savedProperties.length > 0 && (
            <div className="p-6 border-t border-stone-200 bg-white">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  const target = document.getElementById('contact');
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-3 px-4 rounded-lg bg-stone-900 text-white text-xs uppercase font-semibold tracking-wider hover:bg-stone-800 transition-colors text-center"
              >
                Inquire on Curated Portfolio ({savedProperties.length})
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
