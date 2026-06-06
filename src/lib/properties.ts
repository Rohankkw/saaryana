export type PropertyStatus = "For Sale" | "For Rent" | "New";
export type PropertyType = "Residential" | "Commercial" | "Plot" | "Industrial";

export interface Property {
  id: string;
  name: string;
  location: string;
  city: string;
  price: string;            // formatted with ₹
  priceValue: number;       // numeric value in INR for sorting/filter
  status: PropertyStatus;
  type: PropertyType;
  bhk?: string;             // e.g. "3BHK"
  beds?: number;
  baths?: number;
  parking?: number;
  floor?: string;
  totalFloors?: number;
  builtUp?: string;
  carpet?: string;
  plotSize?: string;
  age?: string;
  possession?: string;
  furnishing?: "Furnished" | "Semi-Furnished" | "Unfurnished";
  facing?: string;
  area: number;             // sqft for filtering
  description: string;
  amenities: string[];
  images: string[];
  video?: string;           // youtube embed id
  agent: { name: string; designation: string; phone: string; email: string; photo: string };
  nearby: { label: string; distance: string }[];
}

const agents = [
  { name: "Aarav Mehta", designation: "Senior Property Advisor", phone: "+91 98765 43210", email: "aarav@estate.in", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
  { name: "Priya Sharma", designation: "Luxury Homes Specialist",  phone: "+91 98123 45678", email: "priya@estate.in", photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80" },
  { name: "Rohan Kapoor",  designation: "Commercial Lead",          phone: "+91 99887 76655", email: "rohan@estate.in", photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80" },
];

const baseAmenities = ["Lift", "Parking", "Power Backup", "24/7 Security", "CCTV", "Gym", "Swimming Pool", "Garden", "Club House", "Kids Play Area"];

const baseNearby = [
  { label: "Metro Station", distance: "1.2 km" },
  { label: "International School", distance: "0.8 km" },
  { label: "Multispeciality Hospital", distance: "2.1 km" },
  { label: "Highway Access", distance: "3.4 km" },
  { label: "Daily Market", distance: "0.6 km" },
];

const img = (id: string, w = 1600) => `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

const gallery1 = ["photo-1600585154340-be6161a56a0c", "photo-1600566753190-17f0baa2a6c3", "photo-1600607687939-ce8a6c25118c", "photo-1600566753086-00f18fb6b3ea", "photo-1600210492486-724fe5c67fb0"].map((p) => img(p));
const gallery2 = ["photo-1613490493576-7fde63acd811", "photo-1600596542815-ffad4c1539a9", "photo-1600573472556-e636c2acda88", "photo-1600585154526-990dced4db0d", "photo-1600121848594-d8644e57abab"].map((p) => img(p));
const gallery3 = ["photo-1582407947304-fd86f028f716", "photo-1505691938895-1758d7feb511", "photo-1502672260266-1c1ef2d93688", "photo-1493809842364-78817add7ffb", "photo-1484154218962-a197022b5858"].map((p) => img(p));
const galleryCom = ["photo-1497366216548-37526070297c", "photo-1497366811353-6870744d04b2", "photo-1531973576160-7125cd663d86", "photo-1556761175-5973dc0f32e7", "photo-1604328698692-f76ea9498e76"].map((p) => img(p));
const galleryPlot = ["photo-1500382017468-9049fed747ef", "photo-1416879595882-3373a0480b5b", "photo-1469474968028-56623f02e42e", "photo-1501785888041-af3ef285b470", "photo-1502082553048-f009c37129b9"].map((p) => img(p));

export const properties: Property[] = [
  {
    id: "the-marigold-residences",
    name: "The Marigold Residences",
    location: "Bandra West, Mumbai",
    city: "Mumbai",
    price: "₹4.85 Cr",
    priceValue: 48500000,
    status: "For Sale",
    type: "Residential",
    bhk: "3BHK",
    beds: 3, baths: 3, parking: 2,
    floor: "12 / 24", totalFloors: 24,
    builtUp: "1,820 sqft", carpet: "1,540 sqft",
    age: "2 years", possession: "Ready to Move",
    furnishing: "Semi-Furnished", facing: "East",
    area: 1820,
    description: "A refined three-bedroom residence on the twelfth floor with uninterrupted Arabian Sea views. Wide-plank oak flooring, Italian marble in the living areas, and a private deck off the principal suite.",
    amenities: baseAmenities,
    images: gallery1,
    video: "dQw4w9WgXcQ",
    agent: agents[1],
    nearby: baseNearby,
  },
  {
    id: "evershine-heights",
    name: "Evershine Heights",
    location: "Koregaon Park, Pune",
    city: "Pune",
    price: "₹1.95 Cr",
    priceValue: 19500000,
    status: "For Sale",
    type: "Residential",
    bhk: "2BHK",
    beds: 2, baths: 2, parking: 1,
    floor: "8 / 14", totalFloors: 14,
    builtUp: "1,180 sqft", carpet: "980 sqft",
    age: "New", possession: "Ready to Move",
    furnishing: "Unfurnished", facing: "North-East",
    area: 1180,
    description: "Quiet two-bedroom apartment within walking distance of Koregaon Park's cafés. Floor-to-ceiling glazing, an open kitchen, and a building gym overlooking the courtyard.",
    amenities: ["Lift", "Parking", "Power Backup", "24/7 Security", "Gym", "Garden"],
    images: gallery2,
    video: "dQw4w9WgXcQ",
    agent: agents[0],
    nearby: baseNearby,
  },
  {
    id: "the-cedar-villa",
    name: "The Cedar Villa",
    location: "Whitefield, Bengaluru",
    city: "Bengaluru",
    price: "₹6.20 Cr",
    priceValue: 62000000,
    status: "New",
    type: "Residential",
    bhk: "4BHK",
    beds: 4, baths: 5, parking: 3,
    floor: "G + 2", totalFloors: 3,
    builtUp: "4,200 sqft", carpet: "3,650 sqft", plotSize: "5,400 sqft",
    age: "New", possession: "Ready to Move",
    furnishing: "Semi-Furnished", facing: "South",
    area: 4200,
    description: "An independent bungalow set on a leafy plot in Whitefield. Double-height entrance, lap pool, and a landscaped lawn — designed for a family that values privacy.",
    amenities: baseAmenities,
    images: gallery3,
    video: "dQw4w9WgXcQ",
    agent: agents[1],
    nearby: baseNearby,
  },
  {
    id: "lotus-crest-towers",
    name: "Lotus Crest Towers",
    location: "Gachibowli, Hyderabad",
    city: "Hyderabad",
    price: "₹2.45 Cr",
    priceValue: 24500000,
    status: "For Sale",
    type: "Residential",
    bhk: "3BHK",
    beds: 3, baths: 3, parking: 2,
    floor: "18 / 30", totalFloors: 30,
    builtUp: "1,650 sqft", carpet: "1,380 sqft",
    age: "1 year", possession: "Ready to Move",
    furnishing: "Furnished", facing: "West",
    area: 1650,
    description: "High-floor three-bedroom in Gachibowli with sweeping city views, a chef's kitchen, and access to a residents-only sky lounge.",
    amenities: baseAmenities,
    images: gallery1,
    video: "dQw4w9WgXcQ",
    agent: agents[0],
    nearby: baseNearby,
  },
  {
    id: "the-aurum-office-suites",
    name: "The Aurum Office Suites",
    location: "Cyber City, Gurugram",
    city: "Delhi NCR",
    price: "₹3.10 Cr",
    priceValue: 31000000,
    status: "For Sale",
    type: "Commercial",
    floor: "9 / 18", totalFloors: 18,
    builtUp: "2,400 sqft", carpet: "2,050 sqft",
    age: "3 years", possession: "Ready to Move",
    furnishing: "Furnished", facing: "North",
    area: 2400,
    description: "Grade-A office floor in the Cyber City corridor with raised flooring, dedicated reception, and twelve covered parking bays.",
    amenities: ["Lift", "Parking", "Power Backup", "24/7 Security", "CCTV"],
    images: galleryCom,
    video: "dQw4w9WgXcQ",
    agent: agents[2],
    nearby: baseNearby,
  },
  {
    id: "sunridge-plot",
    name: "Sunridge Residential Plot",
    location: "Devanahalli, Bengaluru",
    city: "Bengaluru",
    price: "₹85 L",
    priceValue: 8500000,
    status: "For Sale",
    type: "Plot",
    plotSize: "2,400 sqft",
    possession: "Ready to Move",
    facing: "East",
    area: 2400,
    description: "Corner residential plot in a gated layout near the airport corridor, with metalled internal roads and clear title.",
    amenities: ["24/7 Security", "Power Backup"],
    images: galleryPlot,
    agent: agents[0],
    nearby: baseNearby,
  },
  {
    id: "rosewood-rental-3bhk",
    name: "Rosewood Apartments",
    location: "Powai, Mumbai",
    city: "Mumbai",
    price: "₹1,40,000 / mo",
    priceValue: 140000,
    status: "For Rent",
    type: "Residential",
    bhk: "3BHK",
    beds: 3, baths: 3, parking: 2,
    floor: "16 / 28", totalFloors: 28,
    builtUp: "1,720 sqft", carpet: "1,460 sqft",
    age: "4 years", possession: "Ready to Move",
    furnishing: "Furnished", facing: "South-East",
    area: 1720,
    description: "Fully furnished three-bedroom apartment in Powai with lake-facing balconies, a private study, and a building swimming pool.",
    amenities: baseAmenities,
    images: gallery2,
    agent: agents[1],
    nearby: baseNearby,
  },
  {
    id: "the-galleria-retail",
    name: "The Galleria Retail Space",
    location: "Connaught Place, Delhi",
    city: "Delhi NCR",
    price: "₹4,50,000 / mo",
    priceValue: 450000,
    status: "For Rent",
    type: "Commercial",
    floor: "G / 4", totalFloors: 4,
    builtUp: "1,800 sqft", carpet: "1,520 sqft",
    age: "Heritage building",
    furnishing: "Unfurnished", facing: "West",
    area: 1800,
    description: "Ground-floor retail in Connaught Place's inner circle with a fourteen-foot frontage and steady walk-in footfall.",
    amenities: ["Lift", "Power Backup", "24/7 Security", "CCTV"],
    images: galleryCom,
    agent: agents[2],
    nearby: baseNearby,
  },
  {
    id: "the-orchid-residency",
    name: "The Orchid Residency",
    location: "Baner, Pune",
    city: "Pune",
    price: "₹65,000 / mo",
    priceValue: 65000,
    status: "For Rent",
    type: "Residential",
    bhk: "2BHK",
    beds: 2, baths: 2, parking: 1,
    floor: "6 / 12", totalFloors: 12,
    builtUp: "1,100 sqft", carpet: "920 sqft",
    age: "2 years", possession: "Ready to Move",
    furnishing: "Semi-Furnished", facing: "North",
    area: 1100,
    description: "Bright two-bedroom rental in Baner, ten minutes from Hinjewadi IT park, with a modular kitchen and a private balcony.",
    amenities: ["Lift", "Parking", "Power Backup", "Gym", "24/7 Security"],
    images: gallery1,
    agent: agents[0],
    nearby: baseNearby,
  },
  {
    id: "ivory-court-4bhk",
    name: "Ivory Court Penthouse",
    location: "Jubilee Hills, Hyderabad",
    city: "Hyderabad",
    price: "₹7.50 Cr",
    priceValue: 75000000,
    status: "New",
    type: "Residential",
    bhk: "4BHK",
    beds: 4, baths: 4, parking: 3,
    floor: "Penthouse / 22", totalFloors: 22,
    builtUp: "3,800 sqft", carpet: "3,200 sqft",
    age: "New", possession: "Ready to Move",
    furnishing: "Semi-Furnished", facing: "South-West",
    area: 3800,
    description: "Duplex penthouse with a private terrace, plunge pool, and panoramic views of Jubilee Hills — finished in travertine and brushed brass.",
    amenities: baseAmenities,
    images: gallery3,
    video: "dQw4w9WgXcQ",
    agent: agents[1],
    nearby: baseNearby,
  },
  {
    id: "greenfield-industrial",
    name: "Greenfield Industrial Land",
    location: "Chakan, Pune",
    city: "Pune",
    price: "₹3.40 Cr",
    priceValue: 34000000,
    status: "For Sale",
    type: "Industrial",
    plotSize: "1.2 acre",
    possession: "Ready to Move",
    facing: "North",
    area: 52000,
    description: "Industrial parcel in Chakan with approved zoning, three-phase power connection, and frontage on the main approach road.",
    amenities: ["Power Backup", "24/7 Security"],
    images: galleryPlot,
    agent: agents[2],
    nearby: baseNearby,
  },
  {
    id: "the-banyan-bungalow",
    name: "The Banyan Bungalow",
    location: "Sainik Farms, Delhi",
    city: "Delhi NCR",
    price: "₹9.20 Cr",
    priceValue: 92000000,
    status: "For Sale",
    type: "Residential",
    bhk: "4BHK",
    beds: 4, baths: 5, parking: 4,
    floor: "G + 1", totalFloors: 2,
    builtUp: "5,400 sqft", carpet: "4,700 sqft", plotSize: "8,000 sqft",
    age: "5 years", possession: "Ready to Move",
    furnishing: "Furnished", facing: "East",
    area: 5400,
    description: "Sprawling bungalow framed by a century-old banyan tree, with a wood-panelled library, staff quarters, and a landscaped rear garden.",
    amenities: baseAmenities,
    images: gallery3,
    video: "dQw4w9WgXcQ",
    agent: agents[1],
    nearby: baseNearby,
  },
];

export function getProperty(id: string) {
  return properties.find((p) => p.id === id);
}
