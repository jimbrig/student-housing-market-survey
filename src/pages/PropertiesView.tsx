import React, { useState } from 'react';
import { subjectProperties, competitorProperties } from '../data/mockData';
import { PropertyCard } from '../components/PropertyCard';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { Grid, List, Search, Filter, ArrowUpDown } from 'lucide-react';

interface PropertiesViewProps {
  onViewPropertyDetails: (id: string) => void;
}

type ViewMode = 'grid' | 'list';
type PropertyFilter = 'all' | 'subject' | 'competitor';
type SortOption = 'name' | 'distance' | 'rent' | 'occupancy';

export const PropertiesView: React.FC<PropertiesViewProps> = ({ onViewPropertyDetails }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [filter, setFilter] = useState<PropertyFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filterOptions = [
    { value: 'all', label: 'All Properties' },
    { value: 'subject', label: 'Subject Properties' },
    { value: 'competitor', label: 'Competitor Properties' }
  ];
  
  const sortOptions = [
    { value: 'name', label: 'Property Name' },
    { value: 'distance', label: 'Distance to Campus' },
    { value: 'rent', label: 'Average Rent' },
    { value: 'occupancy', label: 'Occupancy Rate' }
  ];
  
  // Combine and filter properties based on the current filter
  const filteredProperties = [
    ...(filter === 'all' || filter === 'subject' ? subjectProperties : []),
    ...(filter === 'all' || filter === 'competitor' ? competitorProperties : [])
  ].filter(property => 
    property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.address.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Sort properties based on the selected sort option
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'distance':
        return a.distanceToCampus - b.distanceToCampus;
      case 'rent':
        // @ts-ignore - We know these properties exist on our objects
        return (b.averageRent || 0) - (a.averageRent || 0);
      case 'occupancy':
        // @ts-ignore - We know these properties exist on our objects
        return (b.occupancyRate || 0) - (a.occupancyRate || 0);
      default:
        return 0;
    }
  });
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 md:items-center md:justify-between">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
            placeholder="Search properties..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <Select
            options={filterOptions}
            value={filter}
            onChange={(value) => setFilter(value as PropertyFilter)}
            className="w-48"
          />
          
          <div className="flex space-x-2 items-center">
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={(value) => setSortBy(value as SortOption)}
              className="w-48"
            />
            <Button
              variant="outline"
              className="p-2"
              onClick={() => {
                // Toggle sort direction logic would go here
              }}
              icon={<ArrowUpDown size={16} />}
            />
          </div>
          
          <div className="flex space-x-2 border-l pl-2 ml-2">
            <Button
              variant={viewMode === 'grid' ? 'primary' : 'outline'}
              className="p-2"
              onClick={() => setViewMode('grid')}
              icon={<Grid size={16} />}
            />
            <Button
              variant={viewMode === 'list' ? 'primary' : 'outline'}
              className="p-2"
              onClick={() => setViewMode('list')}
              icon={<List size={16} />}
            />
          </div>
        </div>
      </div>
      
      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
          : 'grid-cols-1'
      }`}>
        {sortedProperties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onViewDetails={onViewPropertyDetails}
          />
        ))}
      </div>
      
      {sortedProperties.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
          <p className="text-sm text-gray-500">
            Try adjusting your search or filter criteria to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
};