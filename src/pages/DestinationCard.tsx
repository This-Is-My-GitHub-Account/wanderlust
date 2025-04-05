import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

type DestinationCardProps = {
  id: number | string;
  name: string;
  country: string;
  image: string;
  activities: string[];
};

export function DestinationCard({name, country, image, activities }: DestinationCardProps) {
  // Convert the name to a URL-friendly slug
  const destinationSlug = name.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <Link to={`/destination/${destinationSlug}`} className="block bg-white rounded-lg overflow-hidden shadow-lg transition-all hover:shadow-xl">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="h-5 w-5 text-blue-800" />
          <h3 className="text-xl font-semibold">{name}</h3>
        </div>
        <p className="text-gray-600 mb-2">{country}</p>
        <div className="flex flex-wrap gap-2">
          {activities.map(activity => (
            <span
              key={activity}
              className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
            >
              {activity}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}