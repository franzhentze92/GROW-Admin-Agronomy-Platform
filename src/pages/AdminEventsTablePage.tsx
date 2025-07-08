import React, { useEffect, useState } from 'react';
import { eventsApi, Event } from '../lib/eventsApi';
import { useNavigate } from 'react-router-dom';

const AdminEventsTablePage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await eventsApi.getEvents();
      setEvents(data);
    } catch (err: any) {
      setError('Failed to load events.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    setDeletingId(id);
    try {
      await eventsApi.deleteEvent(id);
      await fetchEvents();
    } catch (err: any) {
      setError('Failed to delete event.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="w-full flex justify-center bg-gray-50 min-h-screen">
      <div className="w-full max-w-7xl bg-white rounded-2xl shadow p-10 my-10 mx-4">
        <h1 className="text-2xl font-bold mb-6">All Events (Super Admin)</h1>
        {loading && <div className="text-center text-gray-500 py-10">Loading events...</div>}
        {error && <div className="text-center text-red-500 py-10">{error}</div>}
        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="min-w-full border text-xs md:text-sm">
              <thead>
                <tr className="bg-gray-100">
                  {/* <th className="p-2 border">ID</th> */}
                  <th className="p-2 border">Title</th>
                  {/* <th className="p-2 border">Description</th> */}
                  <th className="p-2 border">Notes</th>
                  <th className="p-2 border">Date</th>
                  <th className="p-2 border">Time</th>
                  <th className="p-2 border">End Date</th>
                  <th className="p-2 border">End Time</th>
                  <th className="p-2 border">Location</th>
                  <th className="p-2 border">Cost</th>
                  <th className="p-2 border">Cost Unit</th>
                  <th className="p-2 border">Image</th>
                  <th className="p-2 border">Link</th>
                  <th className="p-2 border">Featured</th>
                  <th className="p-2 border">Created</th>
                  <th className="p-2 border">Updated</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map(event => (
                  <tr key={event.id} className="border-b hover:bg-gray-50">
                    {/* <td className="p-2 border break-all max-w-[120px]">{event.id}</td> */}
                    <td className="p-2 border">{event.title}</td>
                    {/* <td className="p-2 border whitespace-pre-line max-w-[200px]">{event.description}</td> */}
                    <td className="p-2 border whitespace-pre-line max-w-[120px]">{event.notes}</td>
                    <td className="p-2 border">{event.date}</td>
                    <td className="p-2 border">{event.time}</td>
                    <td className="p-2 border">{event.end_date}</td>
                    <td className="p-2 border">{event.end_time}</td>
                    <td className="p-2 border">{event.location}</td>
                    <td className="p-2 border">{event.cost}</td>
                    <td className="p-2 border">{event.cost_unit}</td>
                    <td className="p-2 border max-w-[100px]">
                      {event.image && <img src={event.image} alt="event" className="w-16 h-10 object-contain rounded border" />}
                    </td>
                    <td className="p-2 border max-w-[100px]">
                      {event.link && <a href={event.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Link</a>}
                    </td>
                    <td className="p-2 border">{event.featured ? 'Yes' : 'No'}</td>
                    <td className="p-2 border">{event.created_at?.slice(0, 16).replace('T', ' ')}</td>
                    <td className="p-2 border">{event.updated_at?.slice(0, 16).replace('T', ' ')}</td>
                    <td className="p-2 border">
                      <button className="text-green-700 underline mr-2" onClick={() => navigate(`/app/events/${event.slug || event.id}`)}>View</button>
                      <button className="text-blue-700 underline mr-2" onClick={() => navigate(`/app/super-admin/edit-event/${event.id}`)}>Edit</button>
                      <button className="text-red-700 underline" disabled={deletingId === event.id} onClick={() => handleDelete(event.id)}>{deletingId === event.id ? 'Deleting...' : 'Delete'}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEventsTablePage; 