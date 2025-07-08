import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Custom green marker icon
const greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface Distributor {
  id: string;
  name: string;
  region: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  services: string[];
  type: string;
  coordinates: [number, number]; // [latitude, longitude]
}

interface DistributorMapProps {
  distributors: Distributor[];
}

const DistributorMap: React.FC<DistributorMapProps> = ({ distributors }) => {
  // Calculate bounds from all distributor coordinates
  const bounds = L.latLngBounds(distributors.map(d => d.coordinates));

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden">
      <MapContainer
        bounds={bounds}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a> | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        {distributors.map((distributor) => (
          <Marker
            key={distributor.id}
            position={distributor.coordinates}
            icon={greenIcon}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-sm mb-1">{distributor.name}</h3>
                <p className="text-xs text-gray-600 mb-1">{distributor.address}</p>
                <p className="text-xs text-gray-600 mb-1">
                  <strong>Phone:</strong> {distributor.phone}
                </p>
                <p className="text-xs text-gray-600 mb-1">
                  <strong>Email:</strong> {distributor.email}
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {distributor.services.slice(0, 3).map((service, index) => (
                    <span
                      key={index}
                      className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default DistributorMap; 