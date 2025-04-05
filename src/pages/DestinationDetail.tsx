import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { MapPin, Calendar, DollarSign, Globe, Lightbulb } from 'lucide-react';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

type DestinationInfo = {
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

export function DestinationDetail() {
  const { id } = useParams();
  const [destinationInfo, setDestinationInfo] = useState<DestinationInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinationInfo = async () => {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `Generate comprehensive travel information about [Destination Name] including:
          1. Brief overview
          2. Top things to do
          3. Best time to visit
          4. Cost analysis for different budgets
          5. Local culture insights
          6. Essential travel tips
          Format the response in a structured way.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        // Parse the AI response and structure it (simplified for example)
        setDestinationInfo({
          overview: "Sample overview text",
          thingsToDo: ["Activity 1", "Activity 2", "Activity 3"],
          bestTimeToVisit: "Spring and Fall are ideal",
          costAnalysis: {
            budget: "$50-100/day",
            moderate: "$100-200/day",
            luxury: "$200+/day"
          },
          localCulture: "Rich cultural heritage...",
          travelTips: ["Tip 1", "Tip 2", "Tip 3"]
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching destination info:', error);
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

  if (!destinationInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Failed to load destination information.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Overview Section */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="h-6 w-6 text-blue-800" />
            <h1 className="text-3xl font-bold">Destination Overview</h1>
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