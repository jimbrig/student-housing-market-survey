import React from 'react';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { Card, CardContent } from './ui/Card';

interface MetricsCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: React.ReactNode;
  iconBackground?: string;
}

export const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  value,
  change,
  changeLabel,
  icon,
  iconBackground = 'bg-blue-100',
}) => {
  const renderChangeIndicator = () => {
    if (change === undefined || change === 0) {
      return (
        <span className="flex items-center text-gray-500">
          <Minus size={14} className="mr-1" /> No change
        </span>
      );
    }

    if (change > 0) {
      return (
        <span className="flex items-center text-green-600">
          <ArrowUp size={14} className="mr-1" /> {`${change.toFixed(1)}%`} {changeLabel}
        </span>
      );
    }

    return (
      <span className="flex items-center text-red-600">
        <ArrowDown size={14} className="mr-1" /> {`${Math.abs(change).toFixed(1)}%`} {changeLabel}
      </span>
    );
  };

  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <div className="mt-1 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">{value}</p>
            </div>
            {(change !== undefined || changeLabel) && (
              <div className="mt-2 text-xs">{renderChangeIndicator()}</div>
            )}
          </div>
          <div className={`${iconBackground} p-3 rounded-full`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};