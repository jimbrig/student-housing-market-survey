import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Building, MapPin, GraduationCap } from 'lucide-react';
import { Coordinates, SubjectProperty, CompetitorProperty, University } from '../types';
import { Card } from './ui/Card';
import 'leaflet/dist/leaflet.css';

interface MapViewProps {
  subjectProperties: SubjectProperty[];
  competitorProperties: CompetitorProperty[];
  universities: University[];
  onSelectProperty?: (id: string, type: string) => void;
}

export const MapView: React.FC<MapViewProps> = ({
  subjectProperties,
  competitorProperties,
  universities,
  onSelectProperty
}) => {
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);

  // Find map bounds
  const allCoordinates = [
    ...subjectProperties.map(p => p.coordinates),
    ...competitorProperties.map(p => p.coordinates),
    ...universities.map(u => u.coordinates)
  ];

  const bounds = allCoordinates.reduce(
    (acc, coord) => {
      return {
        minLat: Math.min(acc.minLat, coord.latitude),
        maxLat: Math.max(acc.maxLat, coord.latitude),
        minLng: Math.min(acc.minLng, coord.longitude),
        maxLng: Math.max(acc.maxLng, coord.longitude)
      };
    },
    {
      minLat: Infinity,
      maxLat: -Infinity,
      minLng: Infinity,
      maxLng: -Infinity
    }
  );

  const center: Coordinates = {
    latitude: (bounds.minLat + bounds.maxLat) / 2,
    longitude: (bounds.minLng + bounds.maxLng) / 2
  };

  // Custom icons
  const createIcon = (color: string) => new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" width="24" height="24">
        <path d="M12 0C7.6 0 4 3.6 4 8c0 5.4 8 16 8 16s8-10.6 8-16c0-4.4-3.6-8-8-8z"/>
      </svg>
    `)}`,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24]
  });

  const subjectIcon = createIcon('#2563EB');
  const competitorIcon = createIcon('#F97316');
  const universityIcon = createIcon('#22C55E');

  return (
    <Card className="w-full h-full overflow-hidden">
      <div className="relative w-full h-[500px]">
        <MapContainer
          center={[center.latitude, center.longitude]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Subject Properties */}
          {subjectProperties.map(property => (
            <Marker
              key={property.id}
              position={[property.coordinates.latitude, property.coordinates.longitude]}
              icon={subjectIcon}
              eventHandlers={{
                click: () => {
                  setSelectedMarker(property.id);
                  if (onSelectProperty) {
                    onSelectProperty(property.id, 'subject');
                  }
                }
              }}
            >
              <Popup>
                <div className="text-sm">
                  <h3 className="font-semibold">{property.name}</h3>
                  <p className="text-gray-600">{property.address}</p>
                  <p className="mt-1">
                    {property.totalUnits} units · {property.totalBeds} beds
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Competitor Properties */}
          {competitorProperties.map(property => (
            <Marker
              key={property.id}
              position={[property.coordinates.latitude, property.coordinates.longitude]}
              icon={competitorIcon}
              eventHandlers={{
                click: () => {
                  setSelectedMarker(property.id);
                  if (onSelectProperty) {
                    onSelectProperty(property.id, 'competitor');
                  }
                }
              }}
            >
              <Popup>
                <div className="text-sm">
                  <h3 className="font-semibold">{property.name}</h3>
                  <p className="text-gray-600">{property.address}</p>
                  <p className="mt-1">
                    {property.totalUnits} units · {property.totalBeds} beds
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Universities */}
          {universities.map(university => (
            <Marker
              key={university.id}
              position={[university.coordinates.latitude, university.coordinates.longitude]}
              icon={universityIcon}
              eventHandlers={{
                click: () => {
                  setSelectedMarker(university.id);
                  if (onSelectProperty) {
                    onSelectProperty(university.id, 'university');
                  }
                }
              }}
            >
              <Popup>
                <div className="text-sm">
                  <h3 className="font-semibold">{university.name}</h3>
                  <p className="text-gray-600">{university.address}</p>
                  <p className="mt-1">
                    {university.totalEnrollment.toLocaleString()} students
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 bg-white p-2 rounded shadow-md z-[1000]">
          <div className="text-sm font-medium mb-1">Legend</div>
          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center">
              <span className="w-4 h-4 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-1">
                <Building size={12} />
              </span>
              <span>Subject Properties</span>
            </div>
            <div className="flex items-center">
              <span className="w-4 h-4 inline-flex items-center justify-center rounded-full bg-orange-100 text-orange-600 mr-1">
                <MapPin size={12} />
              </span>
              <span>Competitors</span>
            </div>
            <div className="flex items-center">
              <span className="w-4 h-4 inline-flex items-center justify-center rounded-full bg-green-100 text-green-600 mr-1">
                <GraduationCap size={12} />
              </span>
              <span>Universities</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};