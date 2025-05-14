import React, { useState, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from 'react-leaflet';
import { Icon, LatLngBounds, LatLng, DivIcon } from 'leaflet';
import { Building, MapPin, GraduationCap, ChevronLeft } from 'lucide-react';
import { Coordinates, SubjectProperty, CompetitorProperty, University } from '../types';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import * as turf from '@turf/turf';
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
  center: Coordinates;
  radius: number;
}

const MapView: React.FC<MapViewProps> = ({
  subjectProperties,
  competitorProperties,
  universities,
  onSelectProperty
}) => {
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
  const [markets, setMarkets] = useState<Market[]>([]);
  const [hoveredMarket, setHoveredMarket] = useState<string | null>(null);

  // Group properties by market (city)
  useEffect(() => {
    const marketMap = new Map<string, Market>();
    
    // Group properties by city
    [...subjectProperties, ...competitorProperties].forEach(property => {
      const city = property.address.split(',')[1].trim();
      if (!marketMap.has(city)) {
        const properties = [...subjectProperties, ...competitorProperties].filter(p => 
          p.address.split(',')[1].trim() === city
        );
        
        // Calculate market center and radius using turf.js
        const points = properties.map(p => turf.point([p.coordinates.longitude, p.coordinates.latitude]));
        const collection = turf.featureCollection(points);
        const center = turf.center(collection);
        
        // Calculate radius as the distance between center and the furthest point
        const distances = points.map(point => turf.distance(center, point));
        const radius = Math.max(...distances) * 1000; // Convert to meters

        marketMap.set(city, {
          name: city,
          coordinates: property.coordinates,
          properties: [],
          universities: [],
          center: {
            latitude: center.geometry.coordinates[1],
            longitude: center.geometry.coordinates[0]
          },
          radius: radius || 5000 // fallback radius in meters
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
  const createIcon = (color: string, size: number = 24) => new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" width="${size}" height="${size}">
        <path d="M12 0C7.6 0 4 3.6 4 8c0 5.4 8 16 8 16s8-10.6 8-16c0-4.4-3.6-8-8-8z"/>
      </svg>
    `)}`,
    iconSize: [size, size],
    iconAnchor: [size/2, size],
    popupAnchor: [0, -size]
  });

  const createMarketIcon = (count: number) => {
    const size = Math.min(40 + count * 2, 60);
    return new DivIcon({
      html: `
        <div class="relative flex items-center justify-center">
          <div class="absolute w-${size} h-${size} bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
          <div class="relative bg-white rounded-lg shadow-lg px-2 py-1 text-sm font-semibold">
            ${count} Properties
          </div>
        </div>
      `,
      className: 'custom-market-icon',
      iconSize: [size, size],
      iconAnchor: [size/2, size/2]
    });
  };

  const subjectIcon = createIcon('#2563EB', 32);
  const competitorIcon = createIcon('#F97316', 28);
  const universityIcon = createIcon('#22C55E', 32);

  // Map bounds updater component
  const BoundsUpdater = () => {
    const map = useMap();
    
    useEffect(() => {
      if (selectedMarket) {
        // Zoom to selected market with padding
        const bounds = new LatLngBounds(
          selectedMarket.properties.map(p => 
            new LatLng(p.coordinates.latitude, p.coordinates.longitude)
          )
        );
        map.fitBounds(bounds.pad(0.2));
      } else {
        // Show entire US with slight padding
        const usBounds = new LatLngBounds(
          new LatLng(25.82, -124.39),
          new LatLng(49.38, -66.94)
        );
        map.fitBounds(usBounds.pad(0.1));
      }
    }, [selectedMarket, map]);

    return null;
  };

  const handleMarketClick = useCallback((market: Market) => {
    setSelectedMarket(market);
  }, []);

  const handleBackToMarkets = useCallback(() => {
    setSelectedMarket(null);
  }, []);

  return (
    <Card className="w-full h-full overflow-hidden">
      <div className="relative w-full h-[700px]">
        <MapContainer
          center={[39.8283, -98.5795]}
          zoom={4}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
          
          <ZoomControl position="bottomright" />
          <BoundsUpdater />

          {!selectedMarket ? (
            // Show markets with clustering
            markets.map((market) => (
              <Marker
                key={market.name}
                position={[market.center.latitude, market.center.longitude]}
                icon={createMarketIcon(market.properties.length)}
                eventHandlers={{
                  click: () => handleMarketClick(market),
                  mouseover: () => setHoveredMarket(market.name),
                  mouseout: () => setHoveredMarket(null)
                }}
              >
                <Popup className="custom-popup">
                  <div className="text-sm p-1">
                    <h3 className="font-semibold text-gray-900">{market.name}</h3>
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center text-gray-600">
                        <Building size={14} className="mr-1" />
                        <span>{market.properties.length} Properties</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <GraduationCap size={14} className="mr-1" />
                        <span>{market.universities.length} Universities</span>
                      </div>
                    </div>
                    <Button
                      variant="primary"
                      size="sm"
                      className="mt-3 w-full"
                      onClick={() => handleMarketClick(market)}
                    >
                      View Market Details
                    </Button>
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
                    <Popup className="custom-popup">
                      <div className="text-sm p-1">
                        <div className="flex items-start justify-between">
                          <h3 className="font-semibold text-gray-900">{property.name}</h3>
                          <Badge
                            variant={isSubject ? 'primary' : 'secondary'}
                            size="sm"
                          >
                            {isSubject ? 'Subject' : 'Competitor'}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mt-1">{property.address}</p>
                        <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                          <div className="text-gray-600">
                            <span className="font-medium">{property.totalUnits}</span> units
                          </div>
                          <div className="text-gray-600">
                            <span className="font-medium">{property.totalBeds}</span> beds
                          </div>
                          <div className="text-gray-600">
                            Class <span className="font-medium">{property.classification}</span>
                          </div>
                          <div className="text-gray-600">
                            <span className="font-medium">{property.distanceToCampus}</span> mi
                          </div>
                        </div>
                        <Button
                          variant="primary"
                          size="sm"
                          className="mt-3 w-full"
                          onClick={() => onSelectProperty?.(property.id, isSubject ? 'subject' : 'competitor')}
                        >
                          View Details
                        </Button>
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
                  <Popup className="custom-popup">
                    <div className="text-sm p-1">
                      <h3 className="font-semibold text-gray-900">{university.name}</h3>
                      <p className="text-gray-600 mt-1">{university.address}</p>
                      <div className="mt-2 space-y-1">
                        <div className="text-gray-600">
                          <span className="font-medium">
                            {university.totalEnrollment.toLocaleString()}
                          </span> total students
                        </div>
                        <div className="text-gray-600">
                          <span className="font-medium">
                            {university.undergraduateEnrollment.toLocaleString()}
                          </span> undergrad
                        </div>
                      </div>
                      <Button
                        variant="primary"
                        size="sm"
                        className="mt-3 w-full"
                        onClick={() => onSelectProperty?.(university.id, 'university')}
                      >
                        View Details
                      </Button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </>
          )}
        </MapContainer>

        {/* Map Controls */}
        <div className="absolute top-4 left-4 z-[1000] space-y-2">
          {selectedMarket && (
            <Button
              variant="white"
              size="sm"
              className="shadow-lg"
              onClick={handleBackToMarkets}
              icon={<ChevronLeft size={16} />}
            >
              Back to Markets
            </Button>
          )}
        </div>

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg z-[1000]">
          <div className="text-sm font-medium text-gray-900 mb-2">Legend</div>
          <div className="space-y-2 text-sm">
            {!selectedMarket ? (
              <div className="flex items-center text-gray-600">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                  <MapPin size={14} className="text-blue-600" />
                </div>
                <span>Market Location</span>
              </div>
            ) : (
              <>
                <div className="flex items-center text-gray-600">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                    <Building size={14} className="text-blue-600" />
                  </div>
                  <span>Subject Properties</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center mr-2">
                    <MapPin size={14} className="text-orange-600" />
                  </div>
                  <span>Competitors</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
                    <GraduationCap size={14} className="text-green-600" />
                  </div>
                  <span>Universities</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MapView;