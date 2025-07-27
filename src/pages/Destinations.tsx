import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapPin } from 'lucide-react';

interface Destination {
  _id: string;
  name: string;
  englishName?: string;
  description: string;
  image?: string;
  region?: string;
  bestTime?: string;
  heritage?: string;
  entryFee?: string;
  link?: string;
}

function Destinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:4000/api/destinations')
      .then(res => {
        setDestinations(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-12">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">Cultural Destinations</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore the most culturally rich places across India
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {destinations.map(destination => (
            <div key={destination._id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-200 cultural-hover">
              <div className="relative h-48">
                {destination.image && (
                  <img 
                    src={destination.image} 
                    alt={destination.name}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-4 right-4 bg-orange-500 text-white px-2 py-1 rounded text-xs">
                  {destination.heritage}
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center gap-2 text-sm mb-1">
                    <MapPin className="w-4 h-4" />
                    {destination.region}
                  </div>
                  <h3 className="text-xl font-bold">{destination.name}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">{destination.description}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Best Time:</span>
                    <span className="font-medium">{destination.bestTime}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Entry Fee:</span>
                    <span className="font-medium">{destination.entryFee}</span>
                  </div>
                </div>
                {destination.link ? (
                  <a href={destination.link} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-700 font-medium">
                    Learn More →
                  </a>
                ) : (
                  <span className="text-orange-400 font-medium">Learn More →</span>
                )}
              </div>
            </div>
          ))}
        </div>
        {destinations.length === 0 && !loading && (
          <div className="text-center text-gray-500 mt-12 text-lg">No destinations found.</div>
        )}
      </div>
    </div>
  );
}

export default Destinations; 