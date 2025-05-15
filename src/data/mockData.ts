import { 
  SubjectProperty, 
  CompetitorProperty, 
  University 
} from '../types';

// Subject Properties
export const subjectProperties: SubjectProperty[] = [
  {
    id: "P641240",
    name: "Academy 65",
    address: "1325 65th St, Sacramento, CA 95819",
    coordinates: { latitude: 38.5568, longitude: -121.4929 },
    managementCompany: "GMH Communities",
    propertyType: "mid-rise",
    classification: "A",
    totalUnits: 90,
    totalBeds: 225,
    yearBuilt: 2022,
    distanceToCampus: 0.8,
    status: "active",
    imageUrl: "https://images1.apartments.com/i2/sdkYdNnW-l2pPnQrZ42jwj3PZfOw2P2QvycQa4DctgE/111/academy-65-sacramento-ca-view-from-65th-street.jpg",
    amenities: ["Modern Appliances", "Hardwood-style Flooring", "Flat-screen TV", "Furnished Units"],
    averageRent: 1200,
    occupancyRate: 0.95,
    preleaseRate: 0.72
  },
  {
    id: "P518041",
    name: "The Academy at Frisco",
    address: "413 N. West Ave. Fayetteville, AR 72701",
    coordinates: { latitude: 36.0679, longitude: -94.1737 },
    managementCompany: "GMH Communities",
    propertyType: "mid-rise",
    classification: "A",
    totalUnits: 180,
    totalBeds: 495,
    yearBuilt: 2020,
    distanceToCampus: 0.5,
    status: "active",
    imageUrl: "https://storage.googleapis.com/gmh-images/properties/518041/property/academy_at_frisco.jpg",
    amenities: ["Designer-inspired Finishes", "Study Spaces", "Fitness Center", "Co-working Areas"],
    averageRent: 1100,
    occupancyRate: 0.97,
    preleaseRate: 0.68
  },
  {
    id: "P1197887",
    name: "The Dean Reno",
    address: "1475 N. Virginia Street, Reno, NV 89503",
    coordinates: { latitude: 39.5296, longitude: -119.8138 },
    managementCompany: "GMH Communities",
    propertyType: "high-rise",
    classification: "A",
    totalUnits: 200,
    totalBeds: 600,
    yearBuilt: 2023,
    distanceToCampus: 0.2,
    status: "active",
    imageUrl: "https://images1.apartments.com/i2/Mpl_xoRkEGvYAW5dM42yTMpc0oOLfq1tm8D5ZMyDdo8/111/the-dean-reno-reno-nv-building-photo.jpg",
    amenities: ["Rooftop Pool", "Fitness Center", "Study Lounges", "Furnished Units"],
    averageRent: 1400,
    occupancyRate: 0.98,
    preleaseRate: 0.85
  }
];

// Competitor Properties
export const competitorProperties: CompetitorProperty[] = [
  {
    id: "C641240-001",
    name: "Hornet Commons",
    address: "3001 State University Dr, Sacramento, CA 95826",
    coordinates: { latitude: 38.5589, longitude: -121.4221 },
    managementCompany: "American Campus Communities",
    propertyType: "mid-rise",
    classification: "A",
    totalUnits: 150,
    totalBeds: 385,
    yearBuilt: 2021,
    distanceToCampus: 0.1,
    status: "active",
    imageUrl: "https://storage.googleapis.com/gmh-images/competitors/hornet-commons/hornet-commons.webp",
    competitiveSetId: "CS1",
    marketPosition: 1,
    averageRent: 1250,
    occupancyRate: 0.96,
    preleaseRate: 0.75
  },
  {
    id: "C518041-001",
    name: "The Retreat at Fayetteville",
    address: "1369 W Stadium Dr., Fayetteville, AR 72701",
    coordinates: { latitude: 36.0673, longitude: -94.1891 },
    managementCompany: "Landmark Properties",
    propertyType: "cottage",
    classification: "A",
    totalUnits: 160,
    totalBeds: 420,
    yearBuilt: 2019,
    distanceToCampus: 0.8,
    status: "active",
    imageUrl: "https://storage.googleapis.com/gmh-images/competitors/the-retreat/the-retreat.webp",
    competitiveSetId: "CS2",
    marketPosition: 2,
    averageRent: 1150,
    occupancyRate: 0.94,
    preleaseRate: 0.70
  },
  {
    id: "C1197887-001",
    name: "Park Place",
    address: "1651 N Virginia St, Reno, NV 89503",
    coordinates: { latitude: 39.5297, longitude: -119.8140 },
    managementCompany: "Peak Living",
    propertyType: "mid-rise",
    classification: "A",
    totalUnits: 180,
    totalBeds: 450,
    yearBuilt: 2020,
    distanceToCampus: 0.3,
    status: "active",
    imageUrl: "https://medialibrarycfo.entrata.com/17994/MLv3/10/41/2023/06/16/012017/648cb5f1564357.69825295391.jpg",
    competitiveSetId: "CS3",
    marketPosition: 3,
    averageRent: 1350,
    occupancyRate: 0.95,
    preleaseRate: 0.73
  }
];

// Universities data remains the same since we don't have detailed university information in the provided data
export const universities = [
  {
    id: "u1",
    name: "Sacramento State University",
    address: "6000 J St, Sacramento, CA 95819",
    coordinates: { latitude: 38.5568, longitude: -121.4929 },
    campusType: "public",
    totalEnrollment: 31000,
    undergraduateEnrollment: 27000,
    graduateEnrollment: 4000,
    housingRequirement: "First-year students only",
    academicCalendar: "Semester",
    logoUrl: "https://www.csus.edu/brand/assets/images/primary-logo.png"
  }
];

// Performance metrics data
export const performanceData = {
  occupancy: [
    { month: 'Jan', year: 2024, rate: 0.95 },
    { month: 'Feb', year: 2024, rate: 0.96 },
    { month: 'Mar', year: 2024, rate: 0.97 }
  ],
  preleasing: [
    { month: 'Jan', year: 2024, rate: 0.25 },
    { month: 'Feb', year: 2024, rate: 0.40 },
    { month: 'Mar', year: 2024, rate: 0.55 }
  ],
  rents: [
    { year: 2024, studio: 950, oneBed: 1150, twoBed: 1800, threeBed: 2500, fourBed: 3350 }
  ]
};

// Unit configurations data
export const unitConfigurations = [
  {
    id: '1',
    floorPlanName: 'Studio',
    bedrooms: 0,
    bathrooms: 1,
    squareFeet: 450,
    baseRent: 950,
    amenities: ['Kitchenette', 'Built-in Desk', 'Smart TV']
  },
  {
    id: '2',
    floorPlanName: '1 Bedroom',
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 650,
    baseRent: 1150,
    amenities: ['Full Kitchen', 'Walk-in Closet', 'Private Balcony']
  },
  {
    id: '3',
    floorPlanName: '2 Bedroom',
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 900,
    baseRent: 1800,
    amenities: ['In-Unit Laundry', 'Dual Vanities', 'Smart Thermostat']
  },
  {
    id: '4',
    floorPlanName: '4 Bedroom',
    bedrooms: 4,
    bathrooms: 4,
    squareFeet: 1400,
    baseRent: 3350,
    amenities: ['Private Bathrooms', 'Common Living Area', 'Kitchen Island']
  }
];