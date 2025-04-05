import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Calendar, DollarSign, Globe, Lightbulb } from 'lucide-react';

type DestinationInfo = {
  id: string;
  name: string;
  overview: string;
  thingsToDo: string[];
  bestTimeToVisit: string;
  costAnalysis: {
    budget: string;
    moderate: string;
    luxury: string;
  };
  localCulture: string;
  travelTips: string[];
};

// Set your backend URL
const API_BASE_URL = 'http://localhost:5000/api';

export function DestinationDetail() {
  const { id } = useParams();
  const [destinationInfo, setDestinationInfo] = useState<DestinationInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDestinationInfo = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/destinations/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch destination information');
        }
        
        const data = await response.json();
        setDestinationInfo(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching destination info:', error);
        setError('Failed to load destination information');
      } finally {
        setLoading(false);
      }
    };

    fetchDestinationInfo();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800"></div>
      </div>
    );
  }

  if (error || !destinationInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>{error || 'Failed to load destination information.'}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-6 text-center">{destinationInfo.name}</h1>
        
        {/* Overview Section */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="h-6 w-6 text-blue-800" />
            <h2 className="text-3xl font-bold">Destination Overview</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">{destinationInfo.overview}</p>
        </section>

        {/* Things to Do */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Things to Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {destinationInfo.thingsToDo.map((activity, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold mb-2">{activity}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Best Time to Visit */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-6 w-6 text-blue-800" />
            <h2 className="text-2xl font-bold">Best Time to Visit</h2>
          </div>
          <p className="text-gray-700">{destinationInfo.bestTimeToVisit}</p>
        </section>

        {/* Cost Analysis */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="h-6 w-6 text-blue-800" />
            <h2 className="text-2xl font-bold">Cost Analysis</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(destinationInfo.costAnalysis).map(([level, cost]) => (
              <div key={level} className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold mb-2 capitalize">{level}</h3>
                <p className="text-gray-700">{cost}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Local Culture */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="h-6 w-6 text-blue-800" />
            <h2 className="text-2xl font-bold">Local Culture</h2>
          </div>
          <p className="text-gray-700">{destinationInfo.localCulture}</p>
        </section>

        {/* Travel Tips */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="h-6 w-6 text-blue-800" />
            <h2 className="text-2xl font-bold">Travel Tips</h2>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <ul className="space-y-4">
              {destinationInfo.travelTips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-blue-800">•</span>
                  <span className="text-gray-700">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}