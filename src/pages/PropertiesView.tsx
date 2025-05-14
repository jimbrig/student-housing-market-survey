import React, { useState } from 'react';
import { subjectProperties, competitorProperties } from '../data/mockData';
import { PropertyCard } from '../components/PropertyCard';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { Grid, List, Search, Filter, ArrowUpDown, Download, Building, Info, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

interface PropertiesViewProps {
  onViewPropertyDetails: (id: string) => void;
}

type ViewMode = 'grid' | 'list' | 'comparison';
type PropertyFilter = 'all' | 'subject' | 'competitor';
type SortOption = 'name' | 'distance' | 'rent' | 'occupancy';

export const PropertiesView: React.FC<PropertiesViewProps> = ({ onViewPropertyDetails }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('comparison');
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
  
  const allProperties = [
    ...subjectProperties,
    ...competitorProperties
  ];

  const filteredProperties = allProperties.filter(property => 
    property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.address.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'distance':
        return a.distanceToCampus - b.distanceToCampus;
      case 'rent':
        return (b.averageRent || 0) - (a.averageRent || 0);
      case 'occupancy':
        return ((b as any).occupancyRate || 0) - ((a as any).occupancyRate || 0);
      default:
        return 0;
    }
  });

  const getOccupancyColor = (rate: number) => {
    if (rate >= 0.95) return 'bg-green-600';
    if (rate >= 0.90) return 'bg-blue-600';
    if (rate >= 0.85) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const renderComparisonView = () => (
    <Card className="mt-6">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left font-medium text-gray-500">Property</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">Management</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">Distance</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">Units/Beds</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">Occupancy</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">Pre-lease</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">Avg. Rent</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">Class</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedProperties.map((property) => (
              <tr 
                key={property.id}
                className="hover:bg-gray-50 group"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <div className="h-12 w-12 flex-shrink-0">
                      <img 
                        src={property.imageUrl} 
                        alt={property.name}
                        className="h-12 w-12 rounded-md object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="font-medium text-gray-900">{property.name}</div>
                      <div className="text-gray-500 text-xs truncate max-w-xs">{property.address}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-500">
                  {property.managementCompany}
                </td>
                <td className="px-4 py-3 text-gray-500">
                  {property.distanceToCampus.toFixed(1)} mi
                </td>
                <td className="px-4 py-3">
                  <div className="text-gray-900">{property.totalUnits} units</div>
                  <div className="text-gray-500 text-xs">{property.totalBeds} beds</div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`${getOccupancyColor((property as any).occupancyRate)} h-2 rounded-full transition-all duration-300`}
                        style={{ width: `${(property as any).occupancyRate * 100}%` }}
                      />
                    </div>
                    <span className="text-gray-700 font-medium">
                      {((property as any).occupancyRate * 100).toFixed(1)}%
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(property as any).preleaseRate * 100}%` }}
                      />
                    </div>
                    <span className="text-gray-700 font-medium">
                      {((property as any).preleaseRate * 100).toFixed(1)}%
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="font-medium text-gray-900">
                    {formatCurrency((property as any).averageRent)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Badge 
                    variant={property.classification === 'A' ? 'primary' : 'secondary'}
                    size="sm"
                  >
                    Class {property.classification}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1"
                      onClick={() => onViewPropertyDetails(property.id)}
                      icon={<Info size={16} />}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1"
                      onClick={() => window.open(property.imageUrl, '_blank')}
                      icon={<ExternalLink size={16} />}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:items-center md:justify-between">
        <div className="flex-1 max-w-2xl flex items-center space-x-4">
          <div className="relative flex-1">
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
          <Select
            options={filterOptions}
            value={filter}
            onChange={(value) => setFilter(value as PropertyFilter)}
            className="w-48"
          />
        </div>
        
        <div className="flex items-center space-x-3">
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={(value) => setSortBy(value as SortOption)}
            className="w-48"
          />
          
          <Button
            variant="outline"
            icon={<Download size={16} />}
          >
            Export
          </Button>
          
          <div className="border-l pl-3 flex items-center space-x-2">
            <Button
              variant={viewMode === 'comparison' ? 'primary' : 'outline'}
              className="p-2"
              onClick={() => setViewMode('comparison')}
              icon={<Building size={16} />}
            />
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

      {viewMode === 'comparison' ? (
        renderComparisonView()
      ) : (
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
      )}
      
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