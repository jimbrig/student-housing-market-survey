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
    preleaseRate: 0.72,
    competitiveSetId: "CS1",
    market: "Sacramento"
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
    preleaseRate: 0.68,
    competitiveSetId: "CS2",
    market: "Fayetteville"
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
    preleaseRate: 0.85,
    competitiveSetId: "CS3",
    market: "Reno"
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
    preleaseRate: 0.75,
    market: "Sacramento",
    associatedSubjectPropertyId: "P641240"
  },
  {
    id: "C641240-002",
    name: "The Union",
    address: "2901 University Ave, Sacramento, CA 95826",
    coordinates: { latitude: 38.5582, longitude: -121.4225 },
    managementCompany: "Peak Campus",
    propertyType: "mid-rise",
    classification: "A",
    totalUnits: 130,
    totalBeds: 350,
    yearBuilt: 2019,
    distanceToCampus: 0.3,
    status: "active",
    imageUrl: "https://placehold.co/600x400.png",
    competitiveSetId: "CS1",
    marketPosition: 2,
    averageRent: 1180,
    occupancyRate: 0.94,
    preleaseRate: 0.71,
    market: "Sacramento",
    associatedSubjectPropertyId: "P641240"
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
    preleaseRate: 0.70,
    market: "Fayetteville",
    associatedSubjectPropertyId: "P518041"
  },
  {
    id: "C518041-002",
    name: "The Vue on Stadium",
    address: "1455 W Stadium Dr., Fayetteville, AR 72701",
    coordinates: { latitude: 36.0675, longitude: -94.1895 },
    managementCompany: "American Campus Communities",
    propertyType: "mid-rise",
    classification: "A",
    totalUnits: 180,
    totalBeds: 450,
    yearBuilt: 2020,
    distanceToCampus: 0.9,
    status: "active",
    imageUrl: "https://placehold.co/600x400.png",
    competitiveSetId: "CS2",
    marketPosition: 3,
    averageRent: 1170,
    occupancyRate: 0.93,
    preleaseRate: 0.68,
    market: "Fayetteville",
    associatedSubjectPropertyId: "P518041"
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
    imageUrl: "https://placehold.co/600x400.png",
    competitiveSetId: "CS3",
    marketPosition: 3,
    averageRent: 1350,
    occupancyRate: 0.95,
    preleaseRate: 0.73,
    market: "Reno",
    associatedSubjectPropertyId: "P1197887"
  },
  {
    id: "C1197887-002",
    name: "Wolf Run Student Living",
    address: "1675 N Virginia St, Reno, NV 89503",
    coordinates: { latitude: 39.5299, longitude: -119.8142 },
    managementCompany: "Asset Living",
    propertyType: "garden",
    classification: "B+",
    totalUnits: 160,
    totalBeds: 400,
    yearBuilt: 2018,
    distanceToCampus: 0.4,
    status: "active",
    imageUrl: "https://placehold.co/600x400.png",
    competitiveSetId: "CS3",
    marketPosition: 4,
    averageRent: 1280,
    occupancyRate: 0.92,
    preleaseRate: 0.69,
    market: "Reno",
    associatedSubjectPropertyId: "P1197887"
  }
];

// Universities data
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
    logoUrl: "https://www.csus.edu/newcsus2019-global-assets/_internal/images/logo/primary-vertical/primary_vertical_2_color_gld_hnd.png",
    market: "Sacramento"
  },
  {
    id: "u2",
    name: "University of Arkansas",
    address: "340 N Campus Dr, Fayetteville, AR 72701",
    coordinates: { latitude: 36.0679, longitude: -94.1737 },
    campusType: "public",
    totalEnrollment: 29000,
    undergraduateEnrollment: 24000,
    graduateEnrollment: 5000,
    housingRequirement: "First-year students only",
    academicCalendar: "Semester",
    logoUrl: "https://brand.uark.edu/_resources/images/UA_Logo.png",
    market: "Fayetteville"
  },
  {
    id: "u3",
    name: "University of Nevada, Reno",
    address: "1664 N Virginia St, Reno, NV 89557",
    coordinates: { latitude: 39.5296, longitude: -119.8138 },
    campusType: "public",
    totalEnrollment: 21000,
    undergraduateEnrollment: 17000,
    graduateEnrollment: 4000,
    housingRequirement: "First-year students only",
    academicCalendar: "Semester",
    logoUrl: "https://www.unr.edu/Assets/Icons/logos/university-logo.svg",
    market: "Reno"
  }
];

// Helper function to get competitors for a subject property
export const getCompetitorsForSubjectProperty = (subjectPropertyId: string): CompetitorProperty[] => {
  return competitorProperties.filter(comp => comp.associatedSubjectPropertyId === subjectPropertyId);
};

// Helper function to get all properties in a market
export const getPropertiesInMarket = (market: string): (SubjectProperty | CompetitorProperty)[] => {
  const subjectProps = subjectProperties.filter(prop => prop.market === market);
  const competitorProps = competitorProperties.filter(prop => prop.market === market);
  return [...subjectProps, ...competitorProps];
};

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