import React from 'react';
import { ArrowLeft, Building2, Users, MapPin, DollarSign, Calendar, Info, Maximize2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ChartContainer } from '../components/ChartContainer';
import { OccupancyChart } from '../components/charts/OccupancyChart';
import { performanceData, unitConfigurations } from '../data/mockData';
import { SubjectProperty } from '../types';

interface PropertyDetailsProps {
  property: SubjectProperty;
  onBack: () => void;
}

export const PropertyDetails: React.FC<PropertyDetailsProps> = ({ property, onBack }) => {
  const {
    name,
    address,
    propertyType,
    classification,
    totalUnits,
    totalBeds,
    yearBuilt,
    yearRenovated,
    distanceToCampus,
    status,
    imageUrl,
    amenities,
    averageRent,
    occupancyRate,
    preleaseRate
  } = property;
  
  const getPropertyTypeLabel = (type: string) => {
    switch (type) {
      case 'garden': return 'Garden-style';
      case 'mid-rise': return 'Mid-rise';
      case 'high-rise': return 'High-rise';
      case 'townhome': return 'Townhome';
      case 'house': return 'House';
      default: return type;
    }
  };
  
  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        className="mb-4"
        onClick={onBack}
        icon={<ArrowLeft size={16} />}
      >
        Back to Properties
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Property Details */}
        <div className="lg:col-span-2">
          <Card>
            <div className="relative h-64 overflow-hidden rounded-t-lg">
              <img 
                src={imageUrl} 
                alt={name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h1 className="text-2xl font-bold text-white">{name}</h1>
                <div className="flex items-center text-white/90 mt-1">
                  <MapPin size={16} className="mr-1" />
                  <span>{address}</span>
                </div>
              </div>
              <div className="absolute top-4 right-4 flex space-x-2">
                <Badge variant="primary" size="md" className="font-semibold">
                  Class {classification}
                </Badge>
                <Badge 
                  variant={status === 'active' ? 'success' : 'warning'} 
                  size="md"
                >
                  {status === 'active' ? 'Active' : 'Inactive'}
                </Badge>
              </div>
            </div>
            
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                <div>
                  <div className="text-sm text-gray-500">Property Type</div>
                  <div className="font-medium flex items-center mt-1">
                    <Building2 size={16} className="mr-1 text-blue-600" />
                    {getPropertyTypeLabel(propertyType)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Total Units</div>
                  <div className="font-medium flex items-center mt-1">
                    <Building2 size={16} className="mr-1 text-blue-600" />
                    {totalUnits} units
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Total Beds</div>
                  <div className="font-medium flex items-center mt-1">
                    <Users size={16} className="mr-1 text-blue-600" />
                    {totalBeds} beds
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Distance to Campus</div>
                  <div className="font-medium flex items-center mt-1">
                    <MapPin size={16} className="mr-1 text-blue-600" />
                    {distanceToCampus} miles
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-gray-200 pt-6">
                <div>
                  <div className="text-sm text-gray-500">Year Built</div>
                  <div className="font-medium mt-1">
                    {yearBuilt}
                  </div>
                </div>
                {yearRenovated && (
                  <div>
                    <div className="text-sm text-gray-500">Year Renovated</div>
                    <div className="font-medium mt-1">
                      {yearRenovated}
                    </div>
                  </div>
                )}
                <div>
                  <div className="text-sm text-gray-500">Average Rent</div>
                  <div className="font-medium flex items-center mt-1">
                    <DollarSign size={16} className="mr-1 text-green-600" />
                    ${averageRent.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Occupancy Rate</div>
                  <div className="font-medium mt-1">
                    {(occupancyRate * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
              
              {amenities && amenities.length > 0 && (
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium mb-3">Featured Amenities</h3>
                  <div className="flex flex-wrap gap-2">
                    {amenities.map((amenity, index) => (
                      <Badge key={index} variant="secondary">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <ChartContainer 
            title="Occupancy Trends" 
            description="Monthly occupancy rates over time"
            className="mt-6"
          >
            <OccupancyChart data={performanceData.occupancy} height={250} />
          </ChartContainer>
        </div>
        
        {/* Performance Metrics */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Current Occupancy</div>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-semibold">
                      {(occupancyRate * 100).toFixed(1)}%
                    </div>
                    <Badge variant="success">
                      +2.1% vs last month
                    </Badge>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500 mb-1">Pre-lease Rate</div>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-semibold">
                      {(preleaseRate * 100).toFixed(1)}%
                    </div>
                    <Badge variant="success">
                      +5.2% vs last year
                    </Badge>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500 mb-1">Average Rent</div>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-semibold">
                      ${averageRent.toLocaleString()}
                    </div>
                    <Badge variant="success">
                      +3.5% vs last year
                    </Badge>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500 mb-1">Price per Bed</div>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-semibold">
                      ${(averageRent / (totalBeds / totalUnits)).toFixed(0)}
                    </div>
                    <Badge variant="success">
                      +4.1% vs last year
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Unit Mix</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {unitConfigurations.slice(0, 4).map((unit) => (
                  <div key={unit.id} className="flex items-center justify-between p-3 rounded-md hover:bg-gray-50 transition-colors">
                    <div>
                      <h4 className="font-medium">{unit.floorPlanName}</h4>
                      <p className="text-sm text-gray-500">
                        {unit.bedrooms} bed | {unit.bathrooms} bath | {unit.squareFeet} sq ft
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${unit.baseRent}</div>
                      <div className="text-xs text-gray-500">
                        ${(unit.baseRent / unit.squareFeet).toFixed(2)}/sq ft
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};