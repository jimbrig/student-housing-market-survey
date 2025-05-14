import React from 'react';
import { Building2, Users, MapPin, Info } from 'lucide-react';
import { BaseProperty } from '../types';
import { Badge } from './ui/Badge';
import { Card, CardContent, CardFooter } from './ui/Card';
import { Button } from './ui/Button';

interface PropertyCardProps {
  property: BaseProperty;
  onViewDetails: (id: string) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onViewDetails }) => {
  const { id, name, address, propertyType, classification, totalUnits, totalBeds, distanceToCampus, imageUrl } = property;

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
    <Card className="h-full transition-transform duration-200 hover:translate-y-[-4px] hover:shadow-md">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="primary" size="md" className="font-semibold">
            Class {classification}
          </Badge>
        </div>
      </div>
      <CardContent className="pt-4 pb-2">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{name}</h3>
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <MapPin size={16} className="mr-1" />
          <span className="truncate">{address}</span>
        </div>
        <div className="grid grid-cols-2 gap-y-2 text-sm">
          <div className="flex items-center">
            <Building2 size={16} className="mr-1 text-gray-400" />
            <span>{getPropertyTypeLabel(propertyType)}</span>
          </div>
          <div className="flex items-center">
            <Users size={16} className="mr-1 text-gray-400" />
            <span>{totalBeds} beds</span>
          </div>
          <div className="col-span-2 flex items-center mt-1">
            <span className="text-sm">{totalUnits} units · {distanceToCampus} mi from campus</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 pb-4 bg-white border-t-0">
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => onViewDetails(id)}
          icon={<Info size={16} />}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};