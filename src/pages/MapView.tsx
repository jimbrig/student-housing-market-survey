import React, { useState } from 'react';
import { subjectProperties, competitorProperties, universities } from '../data/mockData';
import { MapView as MapComponent } from '../components/MapView';
import { PropertyCard } from '../components/PropertyCard';
import { UniversityCard } from '../components/UniversityCard';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { Search, Filter, X } from 'lucide-react';

interface MapViewProps {
  onViewPropertyDetails: (id: string) => void;
}

export const MapViewPage: React.FC<MapViewProps> = ({ onViewPropertyDetails }) => {
  const [selectedEntityType, setSelectedEntityType] = useState<string>('');
  const [selectedEntity, setSelectedEntity] = useState<string | null>(null);
  
  const filterOptions = [
    { value: '', label: 'All Properties' },
    { value: 'subject', label: 'Subject Properties' },
    { value: 'competitor', label: 'Competitor Properties' },
    { value: 'university', label: 'Universities' }
  ];
  
  const handleEntitySelection = (id: string, type: string) => {
    setSelectedEntityType(type);
    setSelectedEntity(id);
  };
  
  const clearSelection = () => {
    setSelectedEntityType('');
    setSelectedEntity(null);
  };
  
  // Find the selected entity data
  const getSelectedEntityData = () => {
    if (!selectedEntity) return null;
    
    switch (selectedEntityType) {
      case 'subject':
        return subjectProperties.find(p => p.id === selectedEntity);
      case 'competitor':
        return competitorProperties.find(p => p.id === selectedEntity);
      case 'university':
        return universities.find(u => u.id === selectedEntity);
      default:
        return null;
    }
  };
  
  const selectedEntityData = getSelectedEntityData();
  
  return (
    <div className="h-full flex flex-col">
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
            placeholder="Search locations..."
          />
        </div>
        <div className="flex space-x-3">
          <Select
            options={filterOptions}
            value={filterOptions[0].value}
            onChange={(value) => console.log(value)}
            placeholder="Filter properties"
            className="w-48"
          />
          <Button
            variant="outline"
            icon={<Filter size={16} />}
          >
            Filters
          </Button>
        </div>
      </div>
      
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-full">
          <MapComponent
            subjectProperties={subjectProperties}
            competitorProperties={competitorProperties}
            universities={universities}
            onSelectProperty={handleEntitySelection}
          />
        </div>
        
        <div className="h-full">
          {selectedEntityData ? (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden h-full">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">
                  {selectedEntityType === 'university' ? 'University Details' : 'Property Details'}
                </h3>
                <Button
                  variant="ghost"
                  className="p-1"
                  onClick={clearSelection}
                  icon={<X size={16} />}
                />
              </div>
              <div className="p-4">
                {selectedEntityType === 'university' ? (
                  <UniversityCard university={selectedEntityData} />
                ) : (
                  <div className="space-y-4">
                    <PropertyCard 
                      property={selectedEntityData}
                      onViewDetails={onViewPropertyDetails}
                    />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm h-full flex items-center justify-center p-6">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a property</h3>
                <p className="text-sm text-gray-500">
                  Click on a marker on the map to view details about properties and universities.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};