import type { Slab } from "../types/slab";
import SlabCard from "./SlabCard";

interface Props {
  slabs: Slab[];
}

function SlabGrid({ slabs }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {slabs.map((slab) => (
        <SlabCard key={slab.id} slab={slab} />
      ))}
    </div>
  );
}

export default SlabGrid;
