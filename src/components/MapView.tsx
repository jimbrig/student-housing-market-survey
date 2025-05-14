import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon, LatLngBounds, LatLng } from 'leaflet';
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

interface Market {
  name: string;
  coordinates: Coordinates;
  properties: (SubjectProperty | CompetitorProperty)[];
  universities: University[];
}

const MapView: React.FC<MapViewProps> = ({
  subjectProperties,
  competitorProperties,
  universities,
  onSelectProperty
}) => {
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
  const [markets, setMarkets] = useState<Market[]>([]);

  // Group properties by market (city)
  useEffect(() => {
    const marketMap = new Map<string, Market>();
    
    // Group properties by city
    [...subjectProperties, ...competitorProperties].forEach(property => {
      const city = property.address.split(',')[1].trim();
      if (!marketMap.has(city)) {
        marketMap.set(city, {
          name: city,
          coordinates: property.coordinates,
          properties: [],
          universities: []
        });
      }
      marketMap.get(city)?.properties.push(property);
    });

    // Add universities to their respective markets
    universities.forEach(university => {
      const city = university.address.split(',')[1].trim();
      if (marketMap.has(city)) {
        marketMap.get(city)?.universities.push(university);
      }
    });

    setMarkets(Array.from(marketMap.values()));
  }, [subjectProperties, competitorProperties, universities]);

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

  const marketIcon = createIcon('#4B5563');
  const subjectIcon = createIcon('#2563EB');
  const competitorIcon = createIcon('#F97316');
  const universityIcon = createIcon('#22C55E');

  // Map bounds updater component
  const BoundsUpdater = () => {
    const map = useMap();
    
    useEffect(() => {
      if (selectedMarket) {
        // Zoom to selected market
        const bounds = new LatLngBounds(
          selectedMarket.properties.map(p => 
            new LatLng(p.coordinates.latitude, p.coordinates.longitude)
          )
        );
        map.fitBounds(bounds, { padding: [50, 50] });
      } else {
        // Show entire US
        const usBounds = new LatLngBounds(
          new LatLng(25.82, -124.39), // Southwest corner
          new LatLng(49.38, -66.94)   // Northeast corner
        );
        map.fitBounds(usBounds);
      }
    }, [selectedMarket, map]);

    return null;
  };

  return (
    <Card className="w-full h-full overflow-hidden">
      <div className="relative w-full h-[600px]">
        <MapContainer
          center={[39.8283, -98.5795]} // Geographic center of the US
          zoom={4}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          <BoundsUpdater />

          {!selectedMarket ? (
            // Show markets
            markets.map((market) => (
              <Marker
                key={market.name}
                position={[market.coordinates.latitude, market.coordinates.longitude]}
                icon={marketIcon}
                eventHandlers={{
                  click: () => setSelectedMarket(market)
                }}
              >
                <Popup>
                  <div className="text-sm">
                    <h3 className="font-semibold">{market.name}</h3>
                    <p className="text-gray-600">
                      {market.properties.length} Properties
                    </p>
                    <button
                      className="mt-2 text-blue-600 hover:text-blue-800 font-medium"
                      onClick={() => setSelectedMarket(market)}
                    >
                      View Market Details
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))
          ) : (
            // Show properties and universities in selected market
            <>
              {selectedMarket.properties.map((property) => {
                const isSubject = subjectProperties.some(p => p.id === property.id);
                return (
                  <Marker
                    key={property.id}
                    position={[property.coordinates.latitude, property.coordinates.longitude]}
                    icon={isSubject ? subjectIcon : competitorIcon}
                    eventHandlers={{
                      click: () => {
                        if (onSelectProperty) {
                          onSelectProperty(property.id, isSubject ? 'subject' : 'competitor');
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
                );
              })}

              {selectedMarket.universities.map((university) => (
                <Marker
                  key={university.id}
                  position={[university.coordinates.latitude, university.coordinates.longitude]}
                  icon={universityIcon}
                  eventHandlers={{
                    click: () => {
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
            </>
          )}
        </MapContainer>

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 bg-white p-2 rounded shadow-md z-[1000]">
          <div className="text-sm font-medium mb-1">Legend</div>
          <div className="flex items-center space-x-4 text-xs">
            {!selectedMarket ? (
              <div className="flex items-center">
                <span className="w-4 h-4 inline-flex items-center justify-center rounded-full bg-gray-100 text-gray-600 mr-1">
                  <MapPin size={12} />
                </span>
                <span>Markets</span>
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>

        {/* Back Button (when market is selected) */}
        {selectedMarket && (
          <div className="absolute top-4 left-4 z-[1000]">
            <button
              className="bg-white px-3 py-2 rounded shadow-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setSelectedMarket(null)}
            >
              ← Back to Markets
            </button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default MapView;