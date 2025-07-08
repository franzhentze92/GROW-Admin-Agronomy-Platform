import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

// Simple slugify function
function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

const EventDetailsPage: React.FC = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(null);

    supabase
      .from('events')
      .select('*')
      .eq('slug', id)
      .single()
      .then(({ data, error }) => {
        if (data) {
          setEvent(data);
          setLoading(false);
          // Return a resolved promise so the next .then is always called
          return Promise.resolve(null);
        } else {
          // If not found by slug, try by id
          return supabase
            .from('events')
            .select('*')
            .eq('id', id)
            .single();
        }
      })
      .then((result) => {
        if (result && result.data) {
          setEvent(result.data);
        } else if (result && result.error) {
          setEvent(null);
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Could not load event details.');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="w-full flex justify-center bg-gray-50 min-h-screen">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow p-10 my-10 mx-4 text-center text-gray-500">Loading event details...</div>
      </div>
    );
  }
  if (error || !event) {
    return (
      <div className="w-full flex justify-center bg-gray-50 min-h-screen">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow p-10 my-10 mx-4 text-center text-red-500">Event not found.</div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center bg-gray-50 min-h-screen">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow p-10 my-10 mx-4">
        <button onClick={() => navigate(-1)} className="mb-6 text-lime-700 underline">&larr; Back to Events</button>
        <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          {event.image && (
            <img src={event.image} alt={event.title} className="w-full max-w-xs h-48 object-contain rounded-lg border shadow-sm bg-white" />
          )}
          <div className="flex-1">
            <div className="mb-2 text-gray-700">
              <span className="font-semibold">Date:</span>{' '}
              {event.date}
              {event.end_date && ` – ${event.end_date}`}
            </div>
            {event.location && (
              <div className="mb-2 text-gray-700">
                <span className="font-semibold">Location:</span> {event.location}
              </div>
            )}
            {event.cost && (
              <div className="mb-2 text-gray-700">
                <span className="font-semibold">Cost:</span> {event.cost}{event.cost_unit ? ` ${event.cost_unit}` : ''}
              </div>
            )}
            {event.link && (
              <div className="mb-2">
                <a href={event.link} target="_blank" rel="noopener noreferrer" className="text-lime-700 underline">More info</a>
              </div>
            )}
          </div>
        </div>
        <div className="text-gray-800 text-lg text-justify mb-4">
          {event.description?.split(/\n\n+/).map((para: string, idx: number) =>
            <p key={idx} className="mb-4">{para}</p>
          )}
        </div>
        {/* Optionally show notes for super admins here if needed */}
      </div>
    </div>
  );
};

export default EventDetailsPage; 