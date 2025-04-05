import { useState } from 'react';
import { Search } from 'lucide-react';

type Destination = {
  id: number;
  name: string;
  country: string;
  metrics: {
    accommodation: number;
    food: number;
    attractions: number;
    activities: number;
    cost: number;
  };
};

const metrics = ['Accommodation', 'Food', 'Attractions', 'Activities', 'Cost'];

export function Compare() {
  const [selectedDestinations, setSelectedDestinations] = useState<Destination[]>([]);
  const [selectedMetric, setSelectedMetric] = useState('Accommodation');
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddDestination = (destination: Destination) => {
    if (selectedDestinations.length < 4) {
      setSelectedDestinations([...selectedDestinations, destination]);
    }
  };

  const handleRemoveDestination = (id: number) => {
    setSelectedDestinations(selectedDestinations.filter(d => d.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Compare Destinations</h1>

      {/* Destination Selection */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Search className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search destinations..."
            className="w-full max-w-md px-4 py-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {selectedDestinations.map((destination) => (
            <div
              key={destination.id}
              className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
            >
              <span>{destination.name}</span>
              <button
                onClick={() => handleRemoveDestination(destination.id)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          {Array.from({ length: 4 - selectedDestinations.length }).map((_, i) => (
            <div
              key={i}
              className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center text-gray-500"
            >
              Add Destination
            </div>
          ))}
        </div>
      </div>

      {/* Metric Selection */}
      <div className="flex gap-4 mb-8">
        {metrics.map((metric) => (
          <button
            key={metric}
            onClick={() => setSelectedMetric(metric)}
            className={`px-4 py-2 rounded-md ${
              selectedMetric === metric
                ? 'bg-blue-800 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {metric}
          </button>
        ))}
      </div>

      {/* Comparison View */}
      {selectedDestinations.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-6">{selectedMetric} Comparison</h2>
          <div className="space-y-6">
            {selectedDestinations.map((destination) => (
              <div key={destination.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{destination.name}</span>
                  <span className="text-blue-800 font-semibold">
                    {destination.metrics[selectedMetric.toLowerCase() as keyof typeof destination.metrics]}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-800 h-2.5 rounded-full"
                    style={{
                      width: `${
                        (destination.metrics[
                          selectedMetric.toLowerCase() as keyof typeof destination.metrics
                        ] /
                          5) *
                        100
                      }%`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}