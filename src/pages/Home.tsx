import { Search } from 'lucide-react';

const featuredDestinations = [
  {
    id: 1,
    title: 'London',
    description: 'Experience the perfect blend of history and modernity',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad'
  },
  {
    id: 2,
    title: 'New York',
    description: 'The city that never sleeps awaits your adventure',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9'
  },
  {
    id: 3,
    title: 'Tokyo',
    description: 'Immerse yourself in Japanese culture and innovation',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf'
  },
  {
    id: 4,
    title: 'Rome',
    description: 'Walk through centuries of art and architecture',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5'
  }
];

export function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="relative h-screen flex items-center justify-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1469474968028-56623f02e42e)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Discover Extraordinary Travel Stories
          </h1>
          <p className="text-xl text-white mb-8">
            Explore destinations through the eyes of real travelers and create your perfect story
          </p>
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center bg-white rounded-lg p-2">
              <Search className="h-6 w-6 text-gray-400 ml-2" />
              <input
                type="text"
                placeholder="Where would you like to go?"
                className="w-full px-4 py-2 outline-none"
              />
              <button className="bg-blue-800 text-white px-6 py-2 rounded-md">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why WanderLust Canvas?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Curated Experiences',
                description: 'Hand-picked destinations and experiences for authentic travel'
              },
              {
                title: 'Local Insights',
                description: 'Get tips and recommendations from local experts'
              },
              {
                title: 'Smart Planning',
                description: 'AI-powered tools to help plan your perfect trip'
              },
              {
                title: 'Travel Community',
                description: 'Connect with fellow travelers and share experiences'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg shadow-lg text-center"
              >
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Featured Destinations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredDestinations.map((destination) => (
              <div
                key={destination.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg"
              >
                <img
                  src={destination.image}
                  alt={destination.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {destination.title}
                  </h3>
                  <p className="text-gray-600">{destination.description}</p>
                  <button className="mt-4 text-blue-800 font-semibold">
                    Learn More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}