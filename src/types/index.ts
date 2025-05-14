// Common Types
export type Coordinates = {
  latitude: number;
  longitude: number;
};

// Property Types
export type PropertyStatus = 'active' | 'inactive' | 'development';
export type PropertyType = 'garden' | 'mid-rise' | 'high-rise' | 'townhome' | 'house';
export type PropertyClassification = 'A' | 'B' | 'C' | 'D';

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
}

export interface SubjectProperty extends BaseProperty {
  description?: string;
  amenities: string[];
  averageRent: number;
  occupancyRate: number;
  preleaseRate: number;
}

export interface CompetitorProperty extends BaseProperty {
  competitiveSetId: string;
  marketPosition: number; // 1-10 scale
  averageRent?: number;
  occupancyRate?: number;
  preleaseRate?: number;
}

// University Types
export type CampusType = 'public' | 'private';

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
}

// Metrics Types
export interface FinancialMetrics {
  baseRent: number;
  effectiveRent: number;
  pricePerSqFt: number;
  pricePerBed: number;
  operatingExpenses?: number;
  revenuePerUnit?: number;
}

export interface OccupancyMetrics {
  currentOccupancy: number; // percentage
  preleasePercentage: number;
  retentionRate?: number;
}

export interface MarketMetrics {
  concessionValue?: number;
  marketPenetrationRate?: number;
  competitiveIndex?: number;
}

// Feature Types
export interface PropertyFeature {
  id: string;
  category: string;
  name: string;
  description?: string;
}

export interface UnitConfiguration {
  id: string;
  floorPlanName: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  baseRent: number;
  amenities: string[];
  imageUrl?: string;
}