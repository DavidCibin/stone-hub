import { Link } from "react-router-dom";
import { type Slabs } from "../hooks/apiHook";

interface Props {
  slab: Slabs;
}

function SlabCard({ slab }: Props) {
  return (
    <Link
      to={`/inventory/${slab.slug}&${slab.Material}`}
      className="block rounded-b overflow-hidden shadow-xs hover:shadow-md transition"
    >
      <img
        src={`https://slabcloud.com/scdata/textures/600/${slab.texture}.jpg`}
        alt={slab.Name}
        className="w-full h-48 object-cover"
      />
      <div className="text-teal-500 p-1 px-2 flex items-baseline justify-between">
        <h3 className="text-lg font-semibold">{slab.Name}</h3>
        <p className="text-xs text-blue-950">{slab.Material}</p>
      </div>
    </Link>
  );
}

export default SlabCard;
