import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar, Award, Music, MapPin } from 'lucide-react';

interface Event {
  _id: string;
  title: string;
  description: string;
  image?: string;
  location?: string;
  date?: string;
  link?: string;
}

function RecentEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:4000/api/recent-events')
      .then(res => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-12">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">Recent Happenings & Events</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore the latest cultural events, festivals, and happenings across India!
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map(event => (
            <div key={event._id} className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-6 text-center shadow-lg">
              {event.image && (
                <img src={event.image} alt={event.title} className="w-full h-40 object-cover rounded mb-4" />
              )}
              <div className="mb-2">
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
              {event.link && (
                <a href={event.link} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-700 font-medium">Learn More →</a>
              )}
            </div>
          ))}
        </div>
        {events.length === 0 && !loading && (
          <div className="text-center text-gray-500 mt-12 text-lg">No events found.</div>
        )}
      </div>
    </div>
  );
}

export default RecentEvents; 