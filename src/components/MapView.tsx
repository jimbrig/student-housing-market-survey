import React, { useState, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from 'react-leaflet';
import { Icon, LatLngBounds, LatLng } from 'leaflet';
import { Building, MapPin, GraduationCap, ChevronLeft } from 'lucide-react';
import { Coordinates, SubjectProperty, CompetitorProperty, University } from '../types';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
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
  metrics: {
    totalUnits: number;
    averageOccupancy: number;
    averageRent: number;
  };
}

const MapView: React.FC<MapViewProps> = ({
  subjectProperties,
  competitorProperties,
  universities,
  onSelectProperty
}) => {
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
  const [markets, setMarkets] = useState<Market[]>([]);

  // Group properties by market
  useEffect(() => {
    const marketMap = new Map<string, Market>();
    
    [...subjectProperties, ...competitorProperties].forEach(property => {
      const market = property.market;
      if (!marketMap.has(market)) {
        const marketProperties = [...subjectProperties, ...competitorProperties].filter(p => 
          p.market === market
        );
        
        const marketUniversities = universities.filter(u => 
          u.market === market
        );

        // Calculate market metrics
        const totalUnits = marketProperties.reduce((sum, p) => sum + p.totalUnits, 0);
        const averageOccupancy = marketProperties.reduce((sum, p) => sum + p.occupancyRate, 0) / marketProperties.length;
        const averageRent = marketProperties.reduce((sum, p) => sum + p.averageRent, 0) / marketProperties.length;

        // Use coordinates of the first subject property as market center
        const subjectProperty = subjectProperties.find(p => p.market === market);
        
        marketMap.set(market, {
          name: market,
          coordinates: subjectProperty?.coordinates || property.coordinates,
          properties: marketProperties,
          universities: marketUniversities,
          metrics: {
            totalUnits,
            averageOccupancy,
            averageRent
          }
        });
      }
    });

    setMarkets(Array.from(marketMap.values()));
  }, [subjectProperties, competitorProperties, universities]);

  // Create marker icons
  const createMarkerIcon = (type: 'subject' | 'competitor' | 'university' | 'market') => {
    const bgColors = {
      subject: '#2563EB',
      competitor: '#F97316',
      university: '#22C55E',
      market: '#7C3AED'
    };

    const size = type === 'market' ? 40 : 32;
    const color = bgColors[type];
    
    const svg = `
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="${size/2}" cy="${size/2}" r="${size/2-2}" fill="white"/>
        <circle cx="${size/2}" cy="${size/2}" r="${size/2-4}" fill="${color}"/>
      </svg>
    `;

    return new Icon({
      iconUrl: `data:image/svg+xml;base64,${btoa(svg)}`,
      iconSize: [size, size],
      iconAnchor: [size/2, size/2],
      popupAnchor: [0, -size/2],
      className: `marker-${type}`
    });
  };

  const subjectIcon = createMarkerIcon('subject');
  const competitorIcon = createMarkerIcon('competitor');
  const universityIcon = createMarkerIcon('university');
  const marketIcon = createMarkerIcon('market');

  // Map bounds updater component
  const BoundsUpdater = () => {
    const map = useMap();
    
    useEffect(() => {
      if (selectedMarket) {
        const bounds = new LatLngBounds(
          [...selectedMarket.properties, ...selectedMarket.universities].map(p => 
            new LatLng(p.coordinates.latitude, p.coordinates.longitude)
          )
        );
        map.fitBounds(bounds.pad(0.2));
      } else {
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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

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
            // Show markets overview
            markets.map((market) => (
              <Marker
                key={market.name}
                position={[market.coordinates.latitude, market.coordinates.longitude]}
                icon={marketIcon}
                eventHandlers={{
                  click: () => handleMarketClick(market)
                }}
              >
                <Popup className="custom-popup">
                  <div className="p-3">
                    <h3 className="font-semibold text-gray-900 mb-2">{market.name} Market</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Properties:</span>
                        <span className="font-medium">{market.properties.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Units:</span>
                        <span className="font-medium">{market.metrics.totalUnits}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Avg. Occupancy:</span>
                        <span className="font-medium">
                          {(market.metrics.averageOccupancy * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Avg. Rent:</span>
                        <span className="font-medium">
                          {formatCurrency(market.metrics.averageRent)}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full mt-3"
                      onClick={() => handleMarketClick(market)}
                    >
                      View Market Details
                    </Button>
                  </div>
                </Popup>
              </Marker>
            ))
          ) : (
            // Show detailed market view
            <>
              {selectedMarket.properties.map((property) => {
                const isSubject = !('associatedSubjectPropertyId' in property);
                return (
                  <Marker
                    key={property.id}
                    position={[property.coordinates.latitude, property.coordinates.longitude]}
                    icon={isSubject ? subjectIcon : competitorIcon}
                    eventHandlers={{
                      click: () => onSelectProperty?.(property.id, isSubject ? 'subject' : 'competitor')
                    }}
                  >
                    <Popup className="custom-popup">
                      <div className="p-3">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900">{property.name}</h3>
                          <Badge
                            variant={isSubject ? 'primary' : 'secondary'}
                            size="sm"
                          >
                            {isSubject ? 'Subject' : 'Competitor'}
                          </Badge>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="text-gray-600">{property.address}</div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <span className="text-gray-500">Units:</span>
                              <span className="font-medium ml-1">{property.totalUnits}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Beds:</span>
                              <span className="font-medium ml-1">{property.totalBeds}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Class:</span>
                              <span className="font-medium ml-1">{property.classification}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Distance:</span>
                              <span className="font-medium ml-1">{property.distanceToCampus} mi</span>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="primary"
                          size="sm"
                          className="w-full mt-3"
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
                    click: () => onSelectProperty?.(university.id, 'university')
                  }}
                >
                  <Popup className="custom-popup">
                    <div className="p-3">
                      <h3 className="font-semibold text-gray-900 mb-2">{university.name}</h3>
                      <div className="space-y-2 text-sm">
                        <div className="text-gray-600">{university.address}</div>
                        <div>
                          <span className="text-gray-500">Enrollment:</span>
                          <span className="font-medium ml-1">
                            {university.totalEnrollment.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="primary"
                        size="sm"
                        className="w-full mt-3"
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
              className="shadow-lg bg-white"
              onClick={handleBackToMarkets}
              icon={<ChevronLeft size={16} />}
            >
              Back to National View
            </Button>
          )}
        </div>

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg z-[1000]">
          <div className="text-sm font-medium text-gray-900 mb-2">Legend</div>
          <div className="space-y-2 text-sm">
            {!selectedMarket ? (
              <div className="flex items-center text-gray-600">
                <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                  <MapPin size={14} className="text-purple-600" />
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