import React, { useState, useEffect } from 'react';
import { Search, MapPin, Users, BookOpen, ShoppingBag, Camera, Heart, Star, ArrowRight, Globe, Music, Palette, Utensils, Play, Calendar, Award, Map, Filter } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentEvents, setRecentEvents] = useState<any[]>([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [featuredStories, setFeaturedStories] = useState<any[]>([]);
  const [storiesLoading, setStoriesLoading] = useState(true);
  const [destinations, setDestinations] = useState<any[]>([]);
  const [destLoading, setDestLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:4000/api/recent-events')
      .then(res => {
        setRecentEvents(res.data as any[]);
        setEventsLoading(false);
      })
      .catch(() => setEventsLoading(false));
    axios.get('http://localhost:4000/api/featured-stories')
      .then(res => {
        setFeaturedStories(res.data as any[]);
        setStoriesLoading(false);
      })
      .catch(() => setStoriesLoading(false));
    axios.get('http://localhost:4000/api/destinations')
      .then(res => {
        setDestinations(res.data as any[]);
        setDestLoading(false);
      })
      .catch(() => setDestLoading(false));
  }, []);

  const categories = [
    { id: 'art', name: 'Art & Crafts', icon: <Palette className="w-6 h-6" />, color: 'bg-pink-100 text-pink-600', link: '/artists' },
    { id: 'food', name: 'Food', icon: <Utensils className="w-6 h-6" />, color: 'bg-yellow-100 text-yellow-600', link: '/stories' },
    { id: 'festivals', name: 'Festivals', icon: <Music className="w-6 h-6" />, color: 'bg-green-100 text-green-600', link: '/recent-events' },
    { id: 'monuments', name: 'Monuments', icon: <Globe className="w-6 h-6" />, color: 'bg-blue-100 text-blue-600', link: '/destinations' },
    { id: 'traditions', name: 'Traditions', icon: <BookOpen className="w-6 h-6" />, color: 'bg-purple-100 text-purple-600', link: '/stories' },
    { id: 'shop', name: 'Shop', icon: <ShoppingBag className="w-6 h-6" />, color: 'bg-red-100 text-red-600', link: '/marketplace' },
    { id: 'experiences', name: 'Experiences', icon: <Map className="w-6 h-6" />, color: 'bg-cyan-100 text-cyan-600', link: '/destinations' },
    { id: 'community', name: 'Community', icon: <Users className="w-6 h-6" />, color: 'bg-orange-100 text-orange-600', link: '/artists' },
  ];

  const handleCategoryClick = (link: string) => {
    navigate(link);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-amber-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Discover India's Rich{' '}
              <span className="text-orange-600">Cultural Heritage</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Explore ancient traditions, connect with artisans, and be part of preserving our cultural legacy for future generations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/stories')}
                className="bg-orange-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 hover:bg-orange-700 shadow-lg"
              >
                Start Exploring
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => navigate('/dashboard')}
                className="border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-200"
              >
                Join Community
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Categories</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {categories.map((category) => (
              <div 
                key={category.id} 
                className="text-center group cursor-pointer"
                onClick={() => handleCategoryClick(category.link)}
              >
                <div className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  {category.icon}
                </div>
                <h3 className="font-medium text-gray-900 group-hover:text-orange-600 transition-colors">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Events Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Recent Events</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest cultural events and happenings
            </p>
          </div>
          {eventsLoading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {recentEvents.slice(0, 3).map((event) => (
                  <div key={event._id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                    {event.image && (
                      <img src={event.image} alt={event.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                    )}
                    <div className="mb-4">
                      <Calendar className="w-8 h-8 text-orange-500 mx-auto" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-2">{event.description}</p>
                    {event.location && (
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-2">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </div>
                    )}
                    {event.date && (
                      <div className="text-sm text-gray-500 mb-2">{new Date(event.date).toLocaleDateString()}</div>
                    )}
                    {event.link ? (
                      <a href={event.link} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-700 font-medium">
                        Learn More →
                      </a>
                    ) : (
                      <span className="text-orange-400 font-medium">Learn More →</span>
                    )}
                  </div>
                ))}
              </div>
              {recentEvents.length > 3 && (
                <div className="text-center mt-8">
                  <Link to="/recent-events" className="inline-block bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors font-medium">Show More Events</Link>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Featured Stories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Stories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover incredible stories behind India's cultural traditions
            </p>
          </div>
          {storiesLoading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featuredStories.slice(0, 3).map((story) => (
                  <div key={story._id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
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
              {featuredStories.length > 3 && (
                <div className="text-center mt-8">
                  <Link to="/stories" className="inline-block bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors font-medium">Show More Stories</Link>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Cultural Destinations Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Cultural Destinations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore the most culturally rich places across India
            </p>
          </div>
          {destLoading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {destinations.slice(0, 3).map((destination) => (
                  <div key={destination._id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
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
              {destinations.length > 3 && (
                <div className="text-center mt-8">
                  <Link to="/destinations" className="inline-block bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors font-medium">Show More Destinations</Link>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home; 