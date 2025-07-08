import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

const API_URL = 'https://crop.kindwise.com/api/v1/identification'; // <-- Replace with actual endpoint if different
const CROP_HEALTH_API_KEY = 'pfI6WyDdBrKP6feTQOb2OTwJYZmoZBbaH8d8Ym7Z5MlMjeP9cp'; // <-- Replace with actual crop health API key

const CropHealthPage: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [includeLocation, setIncludeLocation] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
      setResult(null);
      setError(null);
    }
  };

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

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string); // data URL
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleIdentify = async () => {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      let body: any = {};
      if (image) {
        const dataUrl = await fileToBase64(image);
        body.images = [dataUrl];
      } else {
        body.images = [
          "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/..."
        ];
      }
      if (includeLocation && location) {
        body.latitude = location.lat;
        body.longitude = location.lng;
      }
      body.similar_images = true;
      
      console.log('Request body:', JSON.stringify(body, null, 2));
      
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Api-Key': CROP_HEALTH_API_KEY,
        },
        body: JSON.stringify(body),
      });
      
      console.log('Response status:', res.status);
      console.log('Response headers:', Object.fromEntries(res.headers.entries()));
      
      let data;
      try {
        data = await res.json();
        console.log('Response data:', data);
      } catch (e) {
        data = await res.text();
        console.log('Response text:', data);
      }
      if (!res.ok) throw new Error('API error: ' + (data && data.error ? data.error : res.status));
      setResult(data);
    } catch (err: any) {
      console.error('Error:', err);
      setError(err.message || 'Failed to identify crop health issue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-muted py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-1">Crop Health</h1>
        <div className="text-muted-foreground text-lg mb-6 font-normal">
          Use this tool to identify crop health issues and diseases from a photo and get more information about your sample.
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
              src="https://images.unsplash.com/photo-1543257580-7269da773bf5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
        {result && result.result && (
          <div className="bg-white rounded-xl shadow p-6 mt-6">
            <h2 className="text-lg font-semibold mb-4">Crop Health Analysis Results</h2>
            
            {/* Plant Identification */}
            {result.result.is_plant && result.result.is_plant.suggestions && result.result.is_plant.suggestions.length > 0 && (
              <div className="mb-6">
                <h3 className="text-md font-semibold mb-3 text-green-700">Plant Identification</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.result.is_plant.suggestions.map((s: any, idx: number) => (
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

            {/* Disease Identification */}
            {result.result.disease && result.result.disease.suggestions && result.result.disease.suggestions.length > 0 && (
              <div className="mb-6">
                <h3 className="text-md font-semibold mb-3 text-red-700">Disease Detection</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.result.disease.suggestions.map((s: any, idx: number) => (
                    <div
                      key={idx}
                      className={`border rounded-lg p-4 flex flex-col md:flex-row gap-4 items-center shadow-sm ${
                        idx === 0 ? 'bg-red-50 border-red-400' : 'bg-white'
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

            {/* Crop Identification */}
            {result.result.crop && result.result.crop.suggestions && result.result.crop.suggestions.length > 0 && (
              <div className="mb-6">
                <h3 className="text-md font-semibold mb-3 text-blue-700">Crop Identification</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.result.crop.suggestions.map((s: any, idx: number) => (
                    <div
                      key={idx}
                      className={`border rounded-lg p-4 flex flex-col md:flex-row gap-4 items-center shadow-sm ${
                        idx === 0 ? 'bg-blue-50 border-blue-400' : 'bg-white'
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

            {/* No results message */}
            {(!result.result.is_plant || !result.result.is_plant.suggestions || result.result.is_plant.suggestions.length === 0) &&
             (!result.result.disease || !result.result.disease.suggestions || result.result.disease.suggestions.length === 0) &&
             (!result.result.crop || !result.result.crop.suggestions || result.result.crop.suggestions.length === 0) && (
              <div className="text-center text-gray-500 py-8">
                <p>No specific identifications found. Try uploading a clearer image or a different crop/plant sample.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CropHealthPage; 