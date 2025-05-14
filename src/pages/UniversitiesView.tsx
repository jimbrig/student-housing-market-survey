import React from 'react';
import { universities } from '../data/mockData';
import { UniversityCard } from '../components/UniversityCard';
import { Search, Filter } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const UniversitiesView: React.FC = () => {
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
            placeholder="Search universities..."
          />
        </div>
        
        <Button
          variant="outline"
          icon={<Filter size={16} />}
        >
          Filters
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {universities.map((university) => (
          <UniversityCard
            key={university.id}
            university={university}
          />
        ))}
      </div>
    </div>
  );
};