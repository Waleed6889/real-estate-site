export interface Property {
  id: string;
  title: string;
  slug: string;
  tag: string; // e.g. "Exclusive Listing", "Architectural Trophy", "New Release"
  price: number;
  location: string;
  city: string;
  state: string;
  country: string;
  propertyType: 'Modern Villa' | 'Skyline Penthouse' | 'Architectural Estate' | 'Waterfront Residence' | 'Historic Manor';
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  lotSize: string;
  yearBuilt: number;
  garage: number;
  description: string;
  architecturalStyle: string;
  images: string[];
  features: string[];
  amenities: string[];
  agentId: string;
  featured: boolean;
}

export interface Agent {
  id: string;
  name: string;
  title: string;
  role: string;
  location: string;
  phone: string;
  email: string;
  experienceYears: number;
  careerSales: string;
  image: string;
  bio: string;
  languages: string[];
}

export interface Testimonial {
  id: string;
  clientName: string;
  role: string;
  location: string;
  propertyAcquired: string;
  transactionType: 'Acquisition' | 'Disposal' | 'Advisory';
  rating: number;
  quote: string;
  year: string;
}

export interface PropertyCategory {
  id: string;
  title: string;
  count: number;
  description: string;
  image: string;
  filterType: Property['propertyType'];
}

export interface FilterState {
  search: string;
  location: string;
  propertyType: string;
  maxPrice: number;
  minBedrooms: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'size-desc';
  onlyFavorites: boolean;
}
