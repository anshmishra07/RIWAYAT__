import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapPin } from 'lucide-react';

interface Story {
  _id: string;
  title: string;
  description: string;
  image?: string;
  category?: string;
  region?: string;
  author?: string;
  readTime?: string;
  link?: string;
}

function Stories() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:4000/api/featured-stories')
      .then(res => {
        setStories(res.data as Story[]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-12">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">Featured Stories</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover incredible stories behind India's cultural traditions
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map(story => (
            <div key={story._id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-200 cultural-hover">
              <div className="relative h-48">
                {story.image && (
                  <img 
                    src={story.image} 
                    alt={story.title}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {story.category}
                </div>
                <div className="absolute top-4 right-4 bg-white/90 text-gray-700 px-2 py-1 rounded text-xs">
                  {story.readTime}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <MapPin className="w-4 h-4" />
                  {story.region}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{story.title}</h3>
                <p className="text-gray-600 mb-4">{story.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Author: {story.author}</span>
                  {story.link ? (
                    <a href={story.link} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-700 font-medium">
                      Read More →
                    </a>
                  ) : (
                    <span className="text-orange-400 font-medium">Read More →</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {stories.length === 0 && !loading && (
          <div className="text-center text-gray-500 mt-12 text-lg">No stories found.</div>
        )}
      </div>
    </div>
  );
}

export default Stories; 