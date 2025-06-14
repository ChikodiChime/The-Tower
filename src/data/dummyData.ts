// Centralized dummy data for towers, floors, apartments, and layouts

export interface Tower {
  id: number;
  name: string;
  height: string;
  color: string;
  floors: number;
  apartments: number;
  occupancy: string;
}

export const towersData: Tower[] = [
  {
    id: 1,
    name: "Apex Tower",
    height: "16rem",
    color: "var(--color-primary)",
    floors: 10,
    apartments: 128,
    occupancy: "95%",
  },
  {
    id: 2,
    name: "Elusian Tower",
    height: "20rem",
    color: "var(--foreground)",
    floors: 14,
    apartments: 160,
    occupancy: "88%",
  },
  {
    id: 3,
    name: "Loquac Tower",
    height: "16rem",
    color: "var(--color-primary)",
    floors: 12,
    apartments: 128,
    occupancy: "99%",
  },
];

export interface Floor {
  id: string;
  number: number;
  apartments: number;
  occupancy: string;
  height: string;
}

export function getFloorsForTower(towerId: number): Floor[] {
  const tower = towersData.find(t => t.id === towerId);
  const floorCount = tower ? tower.floors : 10;
  return Array.from({ length: floorCount }, (_, i) => ({
    id: `floor-${i + 1}`,
    number: i + 1,
    apartments: 4, // consistent across all floors for demo
    occupancy: `${90 - i}%`, // decreasing occupancy for demo
    height: "16rem", // consistent height for demo
  }));
}

export interface Layout {
  id: string;
  name: string;
  area: string;
  unitType: string;
  roomCount: number;
  layout?: string;
  thumbnail?: string;
  image: string;
  description?: string;
  height?: string;
  balcony?: boolean;
  bathCount?: number | string;
}

export const layouts: Layout[] = [
  {
    id: `unit-${1}`,
    name: "Type A",
    area: "120 sqm",
    unitType: "2 Bedroom",
    roomCount: 2,
    layout:"/images/Type-A.png",
    thumbnail: "/images/Type-A.jpeg",
    image: "/images/Type-A.jpeg",
    description: "Spacious 2-bedroom layout with open living area and balcony.",
    height: "120 sqm",
    balcony: true,
    bathCount: 2,
  },
  {
    id: `unit-${2}`,
    name: "Type B",
    area: "95 sqm",
    unitType: "Studio",
    roomCount: 1,
    layout:"/images/Type-D.png",
    thumbnail: "/images/Type-B.jpg",
    image: "/images/Type-B.jpg",
    description: "Cozy 1-bedroom unit, ideal for singles or couples.",
    height: "95 sqm",
    balcony: false,
    bathCount: 2,
      },
  {
    id: `unit-${3}`,
    name: "Type C",
    area: "150 sqm",
    unitType: "3 Bedroom",
    roomCount: 3,
    layout:"/images/Type-A.png",
    thumbnail: "/images/Type-C.jpg",
    image: "/images/Type-C.jpg",
    description: "Large family apartment with 3 bedrooms and a study.",
    height: "150 sqm",
    balcony: true,
    bathCount: 3,
  },
  {
    id: `unit-${4}`,
    name: "Type D",
    area: "110 sqm",
    unitType: "Penthouse",
    roomCount: 4,
    layout:"/images/Type-D.png",
    thumbnail: "/images/Type-D.jpg",
    image: "/images/Type-D.jpg",
    description: "Modern 2-bedroom with lots of natural light.",
    height: "110 sqm",
    balcony: false,
    bathCount: 2,
  },
];
