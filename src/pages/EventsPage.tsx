import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { eventsApi, Event } from '../lib/eventsApi';

// Simple slugify function
function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

const EventsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    eventsApi.getEvents()
      .then(data => {
        setEvents(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Could not load events.');
        setLoading(false);
      });
  }, []);

  // Filter events by search
  const filteredEvents = events.filter(e =>
    (e.title?.toLowerCase().includes(search.toLowerCase()) ||
    e.description?.toLowerCase().includes(search.toLowerCase()))
  );

  // Group events by month/year
  const grouped: Record<string, Event[]> = filteredEvents.reduce((acc, event) => {
    const date = new Date(event.date);
    const key = isNaN(date.getTime()) ? 'Unknown Date' : date.toLocaleString('default', { month: 'long', year: 'numeric' });
    if (!acc[key]) acc[key] = [];
    acc[key].push(event);
    return acc;
  }, {} as Record<string, Event[]>);

  return (
    <div className="w-full flex justify-center bg-gray-50 min-h-screen">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow p-10 my-10 mx-4">
        <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>
        <hr className="mb-6" />
        {/* Search and controls */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
          <input
            type="text"
            placeholder="Search for events"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 rounded-lg border px-4 py-2 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button className="bg-[#8cb43a] text-white font-semibold rounded-lg px-4 py-2 text-base shadow hover:bg-[#729428] transition">Find Events</button>
        </div>
        {/* Loading/Error */}
        {loading && <div className="text-center text-gray-500 py-10">Loading events...</div>}
        {error && <div className="text-center text-red-500 py-10">{error}</div>}
        {/* Events List */}
        {!loading && !error && Object.entries(grouped).length === 0 && (
          <div className="text-center text-gray-500 py-10">No events found.</div>
        )}
        {!loading && !error && Object.entries(grouped).map(([month, events]) => (
          <div key={month} className="mb-10">
            <div className="text-lg font-semibold text-gray-500 mb-2">{month}</div>
            <hr className="mb-4" />
            {events.map((event: Event) => {
              const date = new Date(event.date);
              const endDate = event.end_date ? new Date(event.end_date) : null;
              const isValidDate = !isNaN(date.getTime());
              const day = isValidDate ? date.getDate() : '';
              const weekday = isValidDate ? date.toLocaleString('default', { weekday: 'short' }).toUpperCase() : '';
              // Use slug for navigation
              const eventUrl = `/app/events/${event.slug || event.id}`;
              return (
                <div key={event.id || event.title + event.date} className="flex flex-col md:flex-row md:items-center gap-6 mb-8 p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer" onClick={() => navigate(eventUrl)}>
                  <div className="flex flex-col items-center md:items-start min-w-[80px]">
                    <div className="text-2xl font-bold text-lime-600">{weekday}</div>
                    <div className="text-3xl font-bold">{day}</div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-gray-500"><i className="fa fa-calendar" /></span>
                      {event.featured && <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-semibold mr-2">Featured</span>}
                      <span className="text-gray-500 text-sm">
                        {isValidDate && date.toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        {endDate && !isNaN(endDate.getTime()) && ` - ${endDate.toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}`}
                      </span>
                    </div>
                    <div className="text-xl font-bold mb-2">{event.title}</div>
                    {event.location && <div className="text-gray-500 text-sm mt-2">Location: {event.location}</div>}
                    {event.cost && <div className="text-gray-500 text-sm">Cost: {event.cost}</div>}
                    {event.link && <a href={event.link} target="_blank" rel="noopener noreferrer" className="text-lime-700 underline text-sm mt-2 inline-block">More info</a>}
                  </div>
                  {event.image && (
                    <img src={event.image} alt="event" className="w-64 h-40 object-contain rounded-lg border shadow-sm bg-white" />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage; 