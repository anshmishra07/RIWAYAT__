import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Search, Star, MapPin, Palette, Music, Users } from 'lucide-react';

const filters = [
  { id: 'all', label: 'All', icon: <Users className="w-4 h-4" /> },
  { id: 'painting', label: 'Painting', icon: <Palette className="w-4 h-4" /> },
  { id: 'music', label: 'Music', icon: <Music className="w-4 h-4" /> },
  { id: 'dance', label: 'Dance', icon: <Users className="w-4 h-4" /> },
];

function Artists() {
  const [artists, setArtists] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:4000/api/artists')
      .then((res: any) => {
        setArtists(res.data as any[]);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching artists:', err);
        setLoading(false);
      });
  }, []);

  const filteredArtists = artists.filter((artist) => {
    const matchesSearch =
      artist.name.toLowerCase().includes(search.toLowerCase()) ||
      (artist.specialties && artist.specialties.join(' ').toLowerCase().includes(search.toLowerCase())) ||
      (artist.location && artist.location.toLowerCase().includes(search.toLowerCase()));
    const matchesFilter =
      selectedFilter === 'all' ||
      (artist.specialties && artist.specialties.map((s: string) => s.toLowerCase()).includes(selectedFilter));
    return matchesSearch && matchesFilter;
  });

  if (loading) return <div className="text-center py-12">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">Meet Our Artists</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover talented artists preserving traditional crafts and arts across India.
          </p>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg border transition-colors duration-200 font-medium text-sm ${
                  selectedFilter === filter.id
                    ? 'bg-orange-100 border-orange-500 text-orange-700'
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-orange-50 hover:text-orange-700'
                }`}
              >
                {filter.icon}
                {filter.label}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search artists, art forms, or regions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredArtists.map((artist) => (
            <div key={artist._id} className="bg-white rounded-lg shadow-lg p-6 text-center flex flex-col items-center">
              <img
                src={artist.image}
                alt={artist.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow mb-4"
              />
              <h2 className="text-xl font-bold mb-1">{artist.name}</h2>
              <p className="text-orange-600 font-medium mb-2">{artist.specialties && artist.specialties.join(', ')}</p>
              <div className="flex items-center justify-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  />
                ))}
                {/* Optionally display rating if available */}
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-2">
                <MapPin className="w-4 h-4" />
                {artist.location}
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4 w-full px-4">
                {/* You can add more artist info here if available */}
              </div>
              <button className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors">
                Book Session
              </button>
            </div>
          ))}
        </div>
        {filteredArtists.length === 0 && !loading && (
          <div className="text-center text-gray-500 mt-12 text-lg">No artists found.</div>
        )}
      </div>
    </div>
  );
}

export default Artists; 