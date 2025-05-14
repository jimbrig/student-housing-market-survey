import React from 'react';
import { Users, DollarSign, Building, TrendingUp, ArrowUpRight } from 'lucide-react';
import { MetricsCard } from '../components/MetricsCard';
import { OccupancyChart } from '../components/charts/OccupancyChart';
import { RentTrendsChart } from '../components/charts/RentTrendsChart';
import { ChartContainer } from '../components/ChartContainer';
import { PropertyCard } from '../components/PropertyCard';
import { performanceData, subjectProperties } from '../data/mockData';

interface DashboardProps {
  onViewPropertyDetails: (id: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onViewPropertyDetails }) => {
  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricsCard
          title="Total Properties"
          value="6"
          icon={<Building size={20} className="text-blue-600" />}
          iconBackground="bg-blue-100"
        />
        <MetricsCard
          title="Average Occupancy"
          value="94.2%"
          change={2.1}
          changeLabel="vs last month"
          icon={<Users size={20} className="text-teal-600" />}
          iconBackground="bg-teal-100"
        />
        <MetricsCard
          title="Average Rent"
          value="$1,250"
          change={3.5}
          changeLabel="vs last year"
          icon={<DollarSign size={20} className="text-orange-600" />}
          iconBackground="bg-orange-100"
        />
        <MetricsCard
          title="Pre-lease Rate"
          value="75.3%"
          change={5.2}
          changeLabel="vs last year"
          icon={<TrendingUp size={20} className="text-green-600" />}
          iconBackground="bg-green-100"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer
          title="Occupancy Trends"
          description="Monthly occupancy rates over time"
        >
          <OccupancyChart data={performanceData.occupancy} height={250} />
        </ChartContainer>
        <ChartContainer
          title="Rent Analysis"
          description="Yearly rent trends by unit type"
        >
          <RentTrendsChart data={performanceData.rents} height={250} />
        </ChartContainer>
      </div>

      {/* Top Performing Properties */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">Subject Properties</h2>
          <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center">
            View All <ArrowUpRight size={16} className="ml-1" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjectProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onViewDetails={onViewPropertyDetails}
            />
          ))}
        </div>
      </div>
    </div>
  );
};