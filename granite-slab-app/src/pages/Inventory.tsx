import SlabGrid from "../pages/SlabGrid";
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
    imageUrl: "https://picsum.photos/200",
    available: true,
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
    imageUrl: "https://picsum.photos/200",
    available: true,
    description: "Deep black granite with golden specks.",
  },
];

function Inventory() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Available Slabs</h1>
      <SlabGrid slabs={mockSlabs} />
    </div>
  );
}

export default Inventory;
