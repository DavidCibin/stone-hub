import SlabCard from "./SlabCard";
import { type Slabs } from "../hooks/apiHook";

type SlabGridProps = {
  slabs: Slabs[];
};

const SlabGrid = ({ slabs }: SlabGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {slabs.map((slab: Slabs) => (
        <SlabCard key={slab.slug} slab={slab} />
      ))}
    </div>
  );
};

export default SlabGrid;
