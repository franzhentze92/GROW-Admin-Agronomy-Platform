import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

const API_URL = 'https://api.plant.id/v3/identification';
const API_KEY = 'cqbvmbWy8uQTkSc77lBWpBsgk3tyfydGjNgoxXyfWrxcvIi5PP';

const PlantIDPage: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [includeLocation, setIncludeLocation] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
      setResult(null);
      setError(null);
    }
  };

  // Handle location toggle
  const handleLocationToggle = async () => {
    setIncludeLocation(!includeLocation);
    if (!includeLocation && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        },
        () => {
          setLocation(null);
        }
      );
    } else {
      setLocation(null);
    }
  };

  // Convert image to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Call Plant.id API
  const handleIdentify = async () => {
    if (!image) return;
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      let body: any = {};
      if (image) {
        const base64 = await fileToBase64(image);
        console.log('Base64 string length:', base64.length);
        body.images = [base64];
      } else {
        // fallback to test image URL if no image uploaded
        body.images = ["https://plant.id/media/imgs/a3662ae4b74444ebba0334a97f0c3271.jpg"];
      }
      if (includeLocation && location) {
        body.latitude = location.lat;
        body.longitude = location.lng;
        body.similar_images = true;
      }
      console.log('PlantID API request body (final):', body); // DEBUG LOG
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Api-Key': API_KEY,
        },
        body: JSON.stringify(body),
      });
      let data;
      try {
        data = await res.json();
      } catch (e) {
        data = await res.text();
      }
      console.log('PlantID API response (final):', data); // DEBUG LOG
      if (!res.ok) throw new Error('API error: ' + (data && data.error ? data.error : res.status));
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Failed to identify plant');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-muted py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-1">Plant ID</h1>
        <div className="text-muted-foreground text-lg mb-6 font-normal">
          Use this tool to identify plant species from a photo and get more information about your sample.
        </div>
        {/* Controls Card */}
        <div className="bg-white rounded-xl shadow p-6 mb-6 flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex gap-4">
            <Button variant="default" onClick={() => fileInputRef.current?.click()}>Upload</Button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <Button variant="secondary" onClick={handleIdentify} disabled={!image || loading}>
              {loading ? 'Identifying...' : 'Identify'}
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="include-location"
              className="accent-green-600"
              checked={includeLocation}
              onChange={handleLocationToggle}
            />
            <label htmlFor="include-location" className="font-medium">Include location</label>
          </div>
        </div>
        {/* Demo Image Preview Card (before upload) */}
        {!imagePreview && (
          <div className="bg-white rounded-xl shadow p-6 mb-6 flex flex-col items-center">
            <img
              src="https://images.unsplash.com/photo-1547070078-442aa97f595a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Demo preview"
              className="w-full h-64 object-cover rounded-2xl shadow-lg border mb-2"
            />
          </div>
        )}
        {/* Image Preview Card (after upload) */}
        {imagePreview && (
          <div className="bg-white rounded-xl shadow p-6 mb-6 flex flex-col items-center">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full max-h-[400px] object-contain rounded-2xl shadow-lg border mb-2"
            />
          </div>
        )}
        {error && <div className="text-red-600 mb-4">{error}</div>}
        {/* Results Card */}
        {result && result.result && result.result.classification && Array.isArray(result.result.classification.suggestions) && result.result.classification.suggestions.length > 0 && (
          <div className="bg-white rounded-xl shadow p-6 mt-6">
            <h2 className="text-lg font-semibold mb-4">Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.result.classification.suggestions.map((s: any, idx: number) => (
                <div
                  key={idx}
                  className={`border rounded-lg p-4 flex flex-col md:flex-row gap-4 items-center shadow-sm ${
                    idx === 0 ? 'bg-green-50 border-green-400' : 'bg-white'
                  }`}
                >
                  {/* Similar images */}
                  {s.similar_images && s.similar_images.length > 0 && (
                    <div className="flex gap-2">
                      {s.similar_images.slice(0, 3).map((img: any, i: number) => (
                        <img
                          key={i}
                          src={img.url_small || img.url}
                          alt={s.name}
                          className="h-16 w-16 object-cover rounded border"
                        />
                      ))}
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="font-bold text-lg">{s.name}</div>
                    <div className="text-sm text-gray-600 mb-1">
                      Confidence: {(s.probability * 100).toFixed(1)}%
                    </div>
                    {s.details && s.details.common_names && (
                      <div className="text-xs text-gray-500 mb-1">
                        <span className="font-semibold">Common names:</span> {s.details.common_names.join(', ')}
                      </div>
                    )}
                    {s.details && s.details.wiki_description && s.details.wiki_description.value && (
                      <div className="text-xs text-gray-500 mb-1">
                        {s.details.wiki_description.value}
                      </div>
                    )}
                    <div className="flex gap-3 mt-1">
                      <a
                        href={`https://www.google.com/search?q=${encodeURIComponent(s.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 text-xs underline"
                      >
                        Google
                      </a>
                      {s.details && s.details.url && (
                        <a
                          href={s.details.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 text-xs underline"
                        >
                          Details
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlantIDPage; 