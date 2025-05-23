import type { Slab } from "../types/slab";
import { Link } from "react-router-dom";

interface Props {
  slab: Slab;
}

function SlabCard({ slab }: Props) {
  return (
    <Link
      to={`/inventory/${slab.id}`}
      className="block border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
    >
      <img
        src={slab.imageUrl}
        alt={slab.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{slab.name}</h3>
        <p className="text-sm text-gray-600">
          {slab.material} - {slab.finish}
        </p>
        <p className="text-sm text-gray-700 font-medium mt-1">
          ${slab.pricePerSqFt.toFixed(2)} / sq. ft
        </p>
      </div>
    </Link>
  );
}

export default SlabCard;
