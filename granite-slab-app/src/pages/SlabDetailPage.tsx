import { useParams, useNavigate } from "react-router-dom";
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

function SlabDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const slab = mockSlabs.find((s) => s.id === id);

  if (!slab) {
    return (
      <div className="p-6">
        <p className="text-red-600">Slab not found.</p>
        <button
          onClick={() => navigate("/inventory")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Back to Inventory
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 underline"
      >
        ← Back
      </button>
      <div className="grid md:grid-cols-2 gap-6">
        <img
          src={slab.imageUrl}
          alt={slab.name}
          className="w-full h-auto object-cover rounded shadow"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">{slab.name}</h1>
          <p className="text-gray-700 mb-4">{slab.description}</p>
          <ul className="text-sm space-y-1">
            <li>
              <strong>Material:</strong> {slab.material}
            </li>
            <li>
              <strong>Finish:</strong> {slab.finish}
            </li>
            <li>
              <strong>Thickness:</strong> {slab.thickness} cm
            </li>
            <li>
              <strong>Dimensions:</strong> {slab.dimensions.width}″ x{" "}
              {slab.dimensions.height}″
            </li>
            <li>
              <strong>Country of Origin:</strong> {slab.country}
            </li>
            <li>
              <strong>Use Cases:</strong> {slab.useCases.join(", ")}
            </li>
            <li>
              <strong>Price:</strong> ${slab.pricePerSqFt.toFixed(2)} / sq. ft
            </li>
            <li>
              <strong>Availability:</strong>{" "}
              {slab.available ? "In Stock" : "Out of Stock"}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SlabDetailPage;
