import { 
  SubjectProperty, 
  CompetitorProperty, 
  University, 
  PropertyFeature,
  UnitConfiguration
} from '../types';

// Mock subject properties
export const subjectProperties: SubjectProperty[] = [
  {
    id: "sp1",
    name: "The Quarters",
    address: "200 University Ave, Ann Arbor, MI 48104",
    coordinates: { latitude: 42.278210, longitude: -83.738080 },
    managementCompany: "Campus Advantage",
    propertyType: "mid-rise",
    classification: "A",
    totalUnits: 120,
    totalBeds: 350,
    yearBuilt: 2015,
    distanceToCampus: 0.5,
    status: "active",
    imageUrl: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
    amenities: ["Fitness Center", "Pool", "Study Rooms", "Game Room"],
    averageRent: 1200,
    occupancyRate: 0.95,
    preleaseRate: 0.75
  },
  {
    id: "sp2",
    name: "The Hub",
    address: "603 Church St, Ann Arbor, MI 48104",
    coordinates: { latitude: 42.276310, longitude: -83.741240 },
    managementCompany: "Core Spaces",
    propertyType: "high-rise",
    classification: "A",
    totalUnits: 200,
    totalBeds: 500,
    yearBuilt: 2018,
    distanceToCampus: 0.7,
    status: "active",
    imageUrl: "https://images.pexels.com/photos/1838640/pexels-photo-1838640.jpeg",
    amenities: ["Rooftop Pool", "Fitness Center", "Study Lounge", "Coffee Bar"],
    averageRent: 1400,
    occupancyRate: 0.98,
    preleaseRate: 0.85
  },
  {
    id: "sp3",
    name: "Landmark",
    address: "423 Thompson St, Ann Arbor, MI 48104",
    coordinates: { latitude: 42.279415, longitude: -83.739861 },
    managementCompany: "Landmark Properties",
    propertyType: "mid-rise",
    classification: "B",
    totalUnits: 150,
    totalBeds: 400,
    yearBuilt: 2012,
    yearRenovated: 2019,
    distanceToCampus: 0.3,
    status: "active",
    imageUrl: "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg",
    amenities: ["Fitness Center", "Game Room", "Computer Lab"],
    averageRent: 1100,
    occupancyRate: 0.92,
    preleaseRate: 0.70
  }
];

// Mock competitor properties
export const competitorProperties: CompetitorProperty[] = [
  {
    id: "cp1",
    name: "Varsity",
    address: "425 E Washington St, Ann Arbor, MI 48104",
    coordinates: { latitude: 42.280290, longitude: -83.743170 },
    managementCompany: "American Campus Communities",
    propertyType: "high-rise",
    classification: "A",
    totalUnits: 180,
    totalBeds: 415,
    yearBuilt: 2016,
    distanceToCampus: 0.8,
    status: "active",
    imageUrl: "https://images.pexels.com/photos/1546166/pexels-photo-1546166.jpeg",
    competitiveSetId: "cs1",
    marketPosition: 8,
    averageRent: 1250,
    occupancyRate: 0.94,
    preleaseRate: 0.72
  },
  {
    id: "cp2",
    name: "Six11",
    address: "611 S Forest Ave, Ann Arbor, MI 48104",
    coordinates: { latitude: 42.274180, longitude: -83.733100 },
    managementCompany: "Capstone",
    propertyType: "mid-rise",
    classification: "A",
    totalUnits: 140,
    totalBeds: 350,
    yearBuilt: 2017,
    distanceToCampus: 0.4,
    status: "active",
    imageUrl: "https://images.pexels.com/photos/2119713/pexels-photo-2119713.jpeg",
    competitiveSetId: "cs1",
    marketPosition: 7,
    averageRent: 1300,
    occupancyRate: 0.93,
    preleaseRate: 0.68
  },
  {
    id: "cp3",
    name: "The Yard",
    address: "740 S Forest Ave, Ann Arbor, MI 48104",
    coordinates: { latitude: 42.273050, longitude: -83.734320 },
    managementCompany: "EdR",
    propertyType: "mid-rise",
    classification: "B",
    totalUnits: 120,
    totalBeds: 300,
    yearBuilt: 2014,
    distanceToCampus: 0.6,
    status: "active",
    imageUrl: "https://images.pexels.com/photos/3746214/pexels-photo-3746214.jpeg",
    competitiveSetId: "cs1",
    marketPosition: 6,
    averageRent: 1150,
    occupancyRate: 0.91,
    preleaseRate: 0.65
  }
];

// Mock universities
export const universities: University[] = [
  {
    id: "u1",
    name: "University of Michigan",
    address: "500 S State St, Ann Arbor, MI 48109",
    coordinates: { latitude: 42.278030, longitude: -83.738040 },
    campusType: "public",
    totalEnrollment: 48000,
    undergraduateEnrollment: 31000,
    graduateEnrollment: 17000,
    housingRequirement: "First-year students only",
    academicCalendar: "Semester",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Michigan_Wolverines_Logo.svg/1200px-Michigan_Wolverines_Logo.svg.png"
  },
  {
    id: "u2",
    name: "Eastern Michigan University",
    address: "900 Oakwood St, Ypsilanti, MI 48197",
    coordinates: { latitude: 42.251080, longitude: -83.623770 },
    campusType: "public",
    totalEnrollment: 18000,
    undergraduateEnrollment: 15000,
    graduateEnrollment: 3000,
    housingRequirement: "None",
    academicCalendar: "Semester",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Eastern_Michigan_University_seal.svg/1200px-Eastern_Michigan_University_seal.svg.png"
  }
];

// Mock property features
export const propertyFeatures: PropertyFeature[] = [
  { id: "f1", category: "Amenity", name: "Fitness Center", description: "State-of-the-art fitness equipment" },
  { id: "f2", category: "Amenity", name: "Pool", description: "Resort-style swimming pool" },
  { id: "f3", category: "Amenity", name: "Study Rooms", description: "Private study spaces" },
  { id: "f4", category: "Amenity", name: "Game Room", description: "Entertainment space with games" },
  { id: "f5", category: "Utility", name: "Internet", description: "High-speed internet included" },
  { id: "f6", category: "Utility", name: "Water", description: "Water utility included" },
  { id: "f7", category: "Utility", name: "Electricity", description: "Electricity included with cap" },
  { id: "f8", category: "Service", name: "Package Receiving", description: "Package management service" },
  { id: "f9", category: "Service", name: "Maintenance", description: "24/7 emergency maintenance" },
  { id: "f10", category: "Parking", name: "Garage Parking", description: "Covered garage parking" }
];

// Mock unit configurations
export const unitConfigurations: UnitConfiguration[] = [
  {
    id: "uc1",
    floorPlanName: "Studio Deluxe",
    bedrooms: 0,
    bathrooms: 1,
    squareFeet: 450,
    baseRent: 900,
    amenities: ["High-Speed Internet", "Modern Appliances", "Hardwood Floors"],
    imageUrl: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"
  },
  {
    id: "uc2",
    floorPlanName: "1BR Classic",
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 650,
    baseRent: 1100,
    amenities: ["High-Speed Internet", "Modern Appliances", "Walk-in Closet"],
    imageUrl: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg"
  },
  {
    id: "uc3",
    floorPlanName: "2BR Shared",
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 950,
    baseRent: 1700,
    amenities: ["High-Speed Internet", "Modern Appliances", "Balcony"],
    imageUrl: "https://images.pexels.com/photos/1648768/pexels-photo-1648768.jpeg"
  },
  {
    id: "uc4",
    floorPlanName: "3BR Deluxe",
    bedrooms: 3,
    bathrooms: 3,
    squareFeet: 1200,
    baseRent: 2400,
    amenities: ["High-Speed Internet", "Modern Appliances", "Balcony", "In-Unit Laundry"],
    imageUrl: "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg"
  },
  {
    id: "uc5",
    floorPlanName: "4BR Shared",
    bedrooms: 4,
    bathrooms: 4,
    squareFeet: 1600,
    baseRent: 3200,
    amenities: ["High-Speed Internet", "Modern Appliances", "Balcony", "In-Unit Laundry", "Multiple Living Areas"],
    imageUrl: "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg"
  }
];

// Mock performance metrics
export const performanceData = {
  occupancy: [
    { month: 'Jan', year: 2023, rate: 0.92 },
    { month: 'Feb', year: 2023, rate: 0.93 },
    { month: 'Mar', year: 2023, rate: 0.94 },
    { month: 'Apr', year: 2023, rate: 0.95 },
    { month: 'May', year: 2023, rate: 0.93 },
    { month: 'Jun', year: 2023, rate: 0.90 },
    { month: 'Jul', year: 2023, rate: 0.88 },
    { month: 'Aug', year: 2023, rate: 0.95 },
    { month: 'Sep', year: 2023, rate: 0.97 },
    { month: 'Oct', year: 2023, rate: 0.96 },
    { month: 'Nov', year: 2023, rate: 0.95 },
    { month: 'Dec', year: 2023, rate: 0.94 },
    { month: 'Jan', year: 2024, rate: 0.94 },
    { month: 'Feb', year: 2024, rate: 0.95 },
    { month: 'Mar', year: 2024, rate: 0.96 }
  ],
  preleasing: [
    { month: 'Nov', year: 2022, rate: 0.05 },
    { month: 'Dec', year: 2022, rate: 0.12 },
    { month: 'Jan', year: 2023, rate: 0.20 },
    { month: 'Feb', year: 2023, rate: 0.35 },
    { month: 'Mar', year: 2023, rate: 0.50 },
    { month: 'Apr', year: 2023, rate: 0.65 },
    { month: 'May', year: 2023, rate: 0.75 },
    { month: 'Jun', year: 2023, rate: 0.82 },
    { month: 'Jul', year: 2023, rate: 0.90 },
    { month: 'Aug', year: 2023, rate: 0.97 },
    { month: 'Nov', year: 2023, rate: 0.08 },
    { month: 'Dec', year: 2023, rate: 0.15 },
    { month: 'Jan', year: 2024, rate: 0.25 },
    { month: 'Feb', year: 2024, rate: 0.40 },
    { month: 'Mar', year: 2024, rate: 0.55 }
  ],
  rents: [
    { year: 2020, studio: 800, oneBed: 950, twoBed: 1400, threeBed: 2100, fourBed: 2800 },
    { year: 2021, studio: 850, oneBed: 1000, twoBed: 1500, threeBed: 2200, fourBed: 2900 },
    { year: 2022, studio: 875, oneBed: 1050, twoBed: 1600, threeBed: 2300, fourBed: 3050 },
    { year: 2023, studio: 900, oneBed: 1100, twoBed: 1700, threeBed: 2400, fourBed: 3200 },
    { year: 2024, studio: 950, oneBed: 1150, twoBed: 1800, threeBed: 2500, fourBed: 3350 }
  ]
};