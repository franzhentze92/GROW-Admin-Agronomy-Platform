import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { eventsApi, Event } from '../lib/eventsApi';
import { supabase } from '../lib/supabaseClient';

const AdminEditEventPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Partial<Event> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    eventsApi.getEventByIdOrSlug(id)
      .then(data => {
        setEvent(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Could not load event.');
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!event) return;
    const { name, value, type } = e.target;
    let fieldValue: any = value;
    if (type === 'checkbox') {
      fieldValue = (e.target as HTMLInputElement).checked;
    }
    setEvent(prev => prev ? ({ ...prev, [name]: fieldValue }) : prev);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadProgress(0);
    setError(null);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `event-${Date.now()}.${fileExt}`;
      const { error } = await supabase.storage.from('event-images').upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            setUploadProgress(Math.round((progressEvent.loaded / progressEvent.total) * 100));
          }
        }
      });
      if (error) throw error;
      // Get public URL
      const { data: publicUrlData } = supabase.storage.from('event-images').getPublicUrl(fileName);
      setEvent(prev => prev ? ({ ...prev, image: publicUrlData.publicUrl }) : prev);
      setSuccess('Image uploaded!');
    } catch (err: any) {
      setError('Image upload failed.');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event || !id) return;
    setSaving(true);
    setSuccess(null);
    setError(null);
    try {
      await eventsApi.updateEvent(id, event);
      setSuccess('Event updated successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to update event.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="w-full flex justify-center bg-gray-50 min-h-screen"><div className="w-full max-w-2xl bg-white rounded-2xl shadow p-10 my-10 mx-4 text-center text-gray-500">Loading event...</div></div>;
  }
  if (error || !event) {
    return <div className="w-full flex justify-center bg-gray-50 min-h-screen"><div className="w-full max-w-2xl bg-white rounded-2xl shadow p-10 my-10 mx-4 text-center text-red-500">{error || 'Event not found.'}</div></div>;
  }

  return (
    <div className="w-full flex justify-center bg-gray-50 min-h-screen">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow p-10 my-10 mx-4">
        <h1 className="text-2xl font-bold mb-6">Edit Event (Super Admin)</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="title" value={event.title || ''} onChange={handleChange} required placeholder="Title" className="w-full border rounded px-3 py-2" />
          <textarea name="description" value={event.description || ''} onChange={handleChange} required placeholder="Description (use two paragraphs separated by an empty line)" className="w-full border rounded px-3 py-2" />
          <textarea name="notes" value={event.notes || ''} onChange={handleChange} placeholder="Admin Notes (not shown to users)" className="w-full border rounded px-3 py-2" />
          <div className="flex gap-2">
            <input name="date" type="date" value={event.date || ''} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
            <input name="time" type="time" value={event.time || ''} onChange={handleChange} placeholder="Start Time" className="w-full border rounded px-3 py-2" />
          </div>
          <div className="flex gap-2">
            <input name="end_date" type="date" value={event.end_date || ''} onChange={handleChange} placeholder="End Date (optional)" className="w-full border rounded px-3 py-2" />
            <input name="end_time" type="time" value={event.end_time || ''} onChange={handleChange} placeholder="End Time (optional)" className="w-full border rounded px-3 py-2" />
          </div>
          <input name="location" value={event.location || ''} onChange={handleChange} placeholder="Location" className="w-full border rounded px-3 py-2" />
          <div className="flex gap-2">
            <input name="cost" value={event.cost || ''} onChange={handleChange} placeholder="Cost" className="w-full border rounded px-3 py-2" />
            <input name="cost_unit" value={event.cost_unit || ''} onChange={handleChange} placeholder="Currency (e.g. USD, AUD)" className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Event Image</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full border rounded px-3 py-2" />
            {uploading && <div className="text-xs text-gray-500 mt-1">Uploading... {uploadProgress}%</div>}
            {event.image && <img src={event.image} alt="preview" className="w-32 h-20 object-contain rounded border mt-2" />}
          </div>
          <input name="link" value={event.link || ''} onChange={handleChange} placeholder="External Link" className="w-full border rounded px-3 py-2" />
          <label className="flex items-center gap-2">
            <input name="featured" type="checkbox" checked={!!event.featured} onChange={handleChange} />
            Featured
          </label>
          <button type="submit" disabled={saving} className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button type="button" onClick={() => navigate(-1)} className="ml-4 text-gray-600 underline">Cancel</button>
        </form>
        {success && <div className="mt-4 text-green-600">{success}</div>}
        {error && <div className="mt-4 text-red-600">{error}</div>}
      </div>
    </div>
  );
};

export default AdminEditEventPage; 