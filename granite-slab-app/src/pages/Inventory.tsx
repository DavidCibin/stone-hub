import { useMemo, useState, useEffect } from "react";
import SlabGrid from "./SlabGrid";
import InventorySidebar from "../components/sidebars/InventorySidebar";
import { useSidebar } from "../context/SidebarContext";
import type { Slab } from "../types/slab";

const mockSlabs: Slab[] = [
  {
    id: "1",
    name: "Alaska White",
    material: "Granite",
    finish: "Polished",
    thickness: 3,
    dimensions: { width: 200, height: 200 },
    country: "Brazil",
    useCases: ["Countertop", "Backsplash"],
    pricePerSqFt: 45,
    imageUrl: "https://picsum.photos/200?1",
    available: true,
    colors: ["White", "Gray"],
    description: "Elegant white granite with gray veining.",
  },
  {
    id: "2",
    name: "Black Galaxy",
    material: "Granite",
    finish: "Polished",
    thickness: 2,
    dimensions: { width: 200, height: 200 },
    country: "India",
    useCases: ["Countertop", "Floor"],
    pricePerSqFt: 55,
    imageUrl: "https://picsum.photos/200?2",
    available: true,
    colors: ["Black", "Gold"],
    description: "Deep black granite with golden specks.",
  },
  {
    id: "3",
    name: "Carrara Marble",
    material: "Marble",
    finish: "Honed",
    thickness: 2,
    dimensions: { width: 200, height: 200 },
    country: "Italy",
    useCases: ["Wall", "Floor"],
    pricePerSqFt: 65,
    imageUrl: "https://picsum.photos/200?3",
    available: false,
    colors: ["White", "Gray"],
    description: "Classic white marble with soft gray veining.",
  },
  {
    id: "4",
    name: "Verde Ubatuba",
    material: "Granite",
    finish: "Honed",
    thickness: 3,
    dimensions: { width: 200, height: 200 },
    country: "Brazil",
    useCases: ["Vanity", "Countertop"],
    pricePerSqFt: 40,
    imageUrl: "https://picsum.photos/200?4",
    available: true,
    colors: ["Green", "Black"],
    description: "Dark green granite with consistent patterning.",
  },
  {
    id: "5",
    name: "Calacatta Gold",
    material: "Marble",
    finish: "Polished",
    thickness: 3,
    dimensions: { width: 200, height: 200 },
    country: "Italy",
    useCases: ["Backsplash", "Wall"],
    pricePerSqFt: 95,
    imageUrl: "https://picsum.photos/200?5",
    available: true,
    colors: ["White", "Gold"],
    description: "Luxurious white marble with bold gold veining.",
  },
  {
    id: "6",
    name: "Absolute Black",
    material: "Granite",
    finish: "Polished",
    thickness: 2,
    dimensions: { width: 200, height: 200 },
    country: "India",
    useCases: ["Countertop", "Fireplace"],
    pricePerSqFt: 50,
    imageUrl: "https://picsum.photos/200?6",
    available: false,
    colors: ["Black"],
    description: "Solid black granite with a smooth finish.",
  },
];

export default function Inventory() {
  const [sort, setSort] = useState("");
  const [filters, setFilters] = useState({
    name: "",
    material: [] as string[],
    finish: [] as string[],
    thickness: "",
    availability: "",
    colors: [] as string[],
  });

  const { setContent } = useSidebar();

  useEffect(() => {
    // Inject sidebar content on mount
    setContent(
      <InventorySidebar
        sort={sort}
        setSort={setSort}
        filters={filters}
        setFilters={setFilters}
      />,
    );

    // Clear sidebar on unmount
    return () => setContent(null);
  }, [sort, filters, setContent]);

  const filteredSlabs = useMemo(() => {
    let result = [...mockSlabs];

    if (filters.name) {
      result = result.filter((s) =>
        s.name.toLowerCase().includes(filters.name.toLowerCase()),
      );
    }

    if (filters.material.length > 0) {
      result = result.filter((s) => filters.material.includes(s.material));
    }

    if (filters.finish.length > 0) {
      result = result.filter((s) => filters.finish.includes(s.finish));
    }

    if (filters.colors.length > 0) {
      result = result.filter((s) =>
        s.colors.some((color) => filters.colors.includes(color)),
      );
    }

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.pricePerSqFt - b.pricePerSqFt);
        break;
      case "price-desc":
        result.sort((a, b) => b.pricePerSqFt - a.pricePerSqFt);
        break;
      case "thickness":
        result.sort((a, b) => a.thickness - b.thickness);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }

    return result;
  }, [filters, sort]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Available Slabs</h1>
      <SlabGrid slabs={filteredSlabs} />
    </div>
  );
}
