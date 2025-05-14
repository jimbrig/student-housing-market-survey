import React from 'react';
import { GraduationCap, Users, Building, Calendar } from 'lucide-react';
import { University } from '../types';
import { Card, CardContent } from './ui/Card';
import { Badge } from './ui/Badge';

interface UniversityCardProps {
  university: University;
  className?: string;
}

export const UniversityCard: React.FC<UniversityCardProps> = ({ 
  university,
  className = ''
}) => {
  const { 
    name, 
    campusType, 
    totalEnrollment, 
    undergraduateEnrollment, 
    graduateEnrollment, 
    housingRequirement, 
    academicCalendar,
    logoUrl
  } = university;

  return (
    <Card className={`h-full ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0 h-16 w-16 flex items-center justify-center bg-gray-100 rounded overflow-hidden">
            {logoUrl ? (
              <img 
                src={logoUrl} 
                alt={`${name} logo`} 
                className="h-full w-full object-contain"
              />
            ) : (
              <GraduationCap size={32} className="text-gray-400" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
            <Badge 
              variant={campusType === 'public' ? 'primary' : 'secondary'} 
              size="sm"
              className="mt-1"
            >
              {campusType === 'public' ? 'Public Institution' : 'Private Institution'}
            </Badge>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <div className="flex items-center text-sm text-gray-500">
              <Users size={16} className="mr-2 text-blue-600" />
              <span className="font-medium">Enrollment:</span>
            </div>
            <div className="mt-1 pl-6">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-500">Total:</span>{' '}
                  <span className="font-medium">{totalEnrollment.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-500">Undergrad:</span>{' '}
                  <span className="font-medium">{undergraduateEnrollment.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-500">Graduate:</span>{' '}
                  <span className="font-medium">{graduateEnrollment.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="flex items-center text-sm text-gray-500">
              <Building size={16} className="mr-2 text-blue-600" />
              <span className="font-medium">Housing:</span>
            </div>
            <div className="mt-1 pl-6 text-sm">
              {housingRequirement}
            </div>
          </div>
          
          <div>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar size={16} className="mr-2 text-blue-600" />
              <span className="font-medium">Calendar:</span>
            </div>
            <div className="mt-1 pl-6 text-sm">
              {academicCalendar}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};