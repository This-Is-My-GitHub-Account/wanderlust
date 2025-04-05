import { useState } from 'react';
import { Filter, MapPin } from 'lucide-react';

const destinations = [
  {
    id: 1,
    name: 'Paris',
    country: 'France',
    price: 'High',
    region: 'Europe',
    season: 'Spring',
    activities: ['Culture', 'Food', 'Art'],
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34'
  },
  // Add more destinations...
];

type FilterType = {
  price: string[];
  region: string[];
  season: string[];
  activities: string[];
};

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
            {['Culture', 'Nature', 'Adventure', 'Food', 'Beach'].map(activity => (
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
        {destinations.map(destination => (
          <div key={destination.id} className="bg-white rounded-lg overflow-hidden shadow-lg">
            <img
              src={destination.image}
              alt={destination.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-5 w-5 text-blue-800" />
                <h3 className="text-xl font-semibold">{destination.name}</h3>
              </div>
              <p className="text-gray-600 mb-2">{destination.country}</p>
              <div className="flex flex-wrap gap-2">
                {destination.activities.map(activity => (
                  <span
                    key={activity}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                  >
                    {activity}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}