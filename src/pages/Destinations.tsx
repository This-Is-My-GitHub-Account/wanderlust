import { useState } from 'react';
import { Filter } from 'lucide-react';
import { DestinationCard } from './DestinationCard';

type Destination = {
  id: number | string;
  name: string;
  country: string;
  price: string;
  region: string;
  season: string;
  activities: string[];
  image: string;
};

type FilterType = {
  price: string[];
  region: string[];
  season: string[];
  activities: string[];
};

const destinations: Destination[] = [
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    price: 'High',
    region: 'Europe',
    season: 'Spring',
    activities: ['Culture', 'Food', 'Art'],
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34'
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    price: 'High',
    region: 'Asia',
    season: 'Spring',
    activities: ['Culture', 'Food', 'Shopping'],
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf'
  },
  {
    id: 'new-york',
    name: 'New York',
    country: 'United States',
    price: 'High',
    region: 'Americas',
    season: 'Fall',
    activities: ['Culture', 'Food', 'Shopping'],
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9'
  },
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    price: 'Moderate',
    region: 'Asia',
    season: 'Summer',
    activities: ['Beach', 'Nature', 'Culture'],
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4'
  },
  // Add more destinations as needed
];

export function Destinations() {
  const [activeFilters, setActiveFilters] = useState<FilterType>({
    price: [],
    region: [],
    season: [],
    activities: []
  });
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilter = (type: keyof FilterType, value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter(item => item !== value)
        : [...prev[type], value]
    }));
  };

  // Filter destinations based on active filters
  const filteredDestinations = destinations.filter(destination => {
    // If no filters are active for a category, include all destinations
    const priceMatch = activeFilters.price.length === 0 || activeFilters.price.includes(destination.price);
    const regionMatch = activeFilters.region.length === 0 || activeFilters.region.includes(destination.region);
    const seasonMatch = activeFilters.season.length === 0 || activeFilters.season.includes(destination.season);
    const activitiesMatch = activeFilters.activities.length === 0 || 
      destination.activities.some(activity => activeFilters.activities.includes(activity));
    
    return priceMatch && regionMatch && seasonMatch && activitiesMatch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Explore Destinations</h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-800 text-white rounded-md"
        >
          <Filter className="h-5 w-5" />
          Filters
        </button>
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 p-4 bg-white rounded-lg shadow">
          {/* Price Filter */}
          <div>
            <h3 className="font-semibold mb-2">Price Range</h3>
            {['Budget', 'Moderate', 'High', 'Luxury'].map(price => (
              <label key={price} className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={activeFilters.price.includes(price)}
                  onChange={() => toggleFilter('price', price)}
                  className="rounded text-blue-800"
                />
                {price}
              </label>
            ))}
          </div>

          {/* Region Filter */}
          <div>
            <h3 className="font-semibold mb-2">Region</h3>
            {['Europe', 'Asia', 'Americas', 'Africa', 'Oceania'].map(region => (
              <label key={region} className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={activeFilters.region.includes(region)}
                  onChange={() => toggleFilter('region', region)}
                  className="rounded text-blue-800"
                />
                {region}
              </label>
            ))}
          </div>

          {/* Season Filter */}
          <div>
            <h3 className="font-semibold mb-2">Best Season</h3>
            {['Spring', 'Summer', 'Fall', 'Winter'].map(season => (
              <label key={season} className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={activeFilters.season.includes(season)}
                  onChange={() => toggleFilter('season', season)}
                  className="rounded text-blue-800"
                />
                {season}
              </label>
            ))}
          </div>

          {/* Activities Filter */}
          <div>
            <h3 className="font-semibold mb-2">Activities</h3>
            {['Culture', 'Nature', 'Adventure', 'Food', 'Beach', 'Art', 'Shopping'].map(activity => (
              <label key={activity} className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={activeFilters.activities.includes(activity)}
                  onChange={() => toggleFilter('activities', activity)}
                  className="rounded text-blue-800"
                />
                {activity}
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredDestinations.map(destination => (
          <DestinationCard
            key={destination.id}
            id={destination.id}
            name={destination.name}
            country={destination.country}
            image={destination.image}
            activities={destination.activities}
          />
        ))}
      </div>
      
      {filteredDestinations.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No destinations match your selected filters.</p>
          <button 
            onClick={() => setActiveFilters({price: [], region: [], season: [], activities: []})}
            className="mt-4 px-4 py-2 bg-blue-800 text-white rounded-md"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}