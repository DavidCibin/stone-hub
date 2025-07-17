import { Link } from "react-router-dom";
import { type Slabs } from "../hooks/apiHook";

interface Props {
  slab: Slabs;
}

function SlabCard({ slab }: Props) {
  // Construct the relative path to the image within the assets folder
  const imageRelativePath = `/src/assets/images/main-slabs/${slab.texture}.jpg`;

  // Use new URL and import.meta.url for Vite to correctly resolve the asset
  const imageUrl = new URL(imageRelativePath, import.meta.url).href;

  return (
    <Link
      to={`/inventory/${slab.slug}&${slab.Material}`}
      className="block rounded-b overflow-hidden shadow-xs hover:shadow-md transition"
    >
      <img
        src={imageUrl}
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
