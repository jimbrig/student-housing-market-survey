// Common Types
export type Coordinates = {
  latitude: number;
  longitude: number;
};

// Property Types
type PropertyStatus = 'active' | 'inactive' | 'development';
type PropertyType = 'garden' | 'mid-rise' | 'high-rise' | 'townhome' | 'house' | 'cottage';
type PropertyClassification = 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'C-' | 'D';

export interface BaseProperty {
  id: string;
  name: string;
  address: string;
  coordinates: Coordinates;
  managementCompany: string;
  propertyType: PropertyType;
  classification: PropertyClassification;
  totalUnits: number;
  totalBeds: number;
  yearBuilt: number;
  yearRenovated?: number;
  distanceToCampus: number; // in miles
  status: PropertyStatus;
  imageUrl: string;
  market: string;
}

export interface SubjectProperty extends BaseProperty {
  description?: string;
  amenities: string[];
  averageRent: number;
  occupancyRate: number;
  preleaseRate: number;
  competitiveSetId: string;
}

export interface CompetitorProperty extends BaseProperty {
  competitiveSetId: string;
  marketPosition: number; // 1-10 scale
  averageRent: number;
  occupancyRate: number;
  preleaseRate: number;
  associatedSubjectPropertyId: string;
}

// University Types
type CampusType = 'public' | 'private';

export interface University {
  id: string;
  name: string;
  address: string;
  coordinates: Coordinates;
  campusType: CampusType;
  totalEnrollment: number;
  undergraduateEnrollment: number;
  graduateEnrollment: number;
  housingRequirement: string;
  academicCalendar: string;
  logoUrl: string;
  market: string;
}

// Metrics Types
interface FinancialMetrics {
  baseRent: number;
  effectiveRent: number;
  pricePerSqFt: number;
  pricePerBed: number;
  operatingExpenses?: number;
  revenuePerUnit?: number;
}

interface OccupancyMetrics {
  currentOccupancy: number; // percentage
  preleasePercentage: number;
  retentionRate?: number;
}

interface MarketMetrics {
  concessionValue?: number;
  marketPenetrationRate?: number;
  competitiveIndex?: number;
}

// Feature Types
interface PropertyFeature {
  id: string;
  category: string;
  name: string;
  description?: string;
}

interface UnitConfiguration {
  id: string;
  floorPlanName: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  baseRent: number;
  amenities: string[];
  imageUrl?: string;
}