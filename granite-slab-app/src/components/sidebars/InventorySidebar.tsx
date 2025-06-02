import { type Dispatch, type SetStateAction } from "react";
import { useMainContext } from "../../context/MainContext";
import arrowDown from "../../../public/images/caret-down.svg";

type Filters = {
  name: string;
  material: string[];
};

type Props = {
  sort: string;
  setSort: Dispatch<SetStateAction<string>>;
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
};

export default function InventorySidebar({
  sort,
  setSort,
  filters,
  setFilters,
}: Props) {
  const { materialsArray } = useMainContext();

  const toggleMaterial = (value: string) => {
    setFilters((prev) => {
      const arr = prev.material;
      return {
        ...prev,
        material: arr.includes(value)
          ? arr.filter((v) => v !== value)
          : [...arr, value],
      };
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-teal-500 mb-2">Sort By</h2>
        <div className="relative w-full">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full pl-5 pr-2 py-2  focus:outline-none"
          >
            <option value="">Select</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
            <option value="days-asc">Oldest First</option>
            <option value="days-desc">Newest First</option>
            <option value="count-asc">Lowest Count</option>
            <option value="count-desc">Highest Count</option>
          </select>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-teal-500 mb-2">Filter</h2>

        <div className="mb-3">
          <label htmlFor="name-filter">Name</label>
          <input
            id="name-filter"
            type="text"
            value={filters.name}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, name: e.target.value }))
            }
            className="w-full mb-2 border-b focus:border-teal-500 focus:outline-none"
          />
        </div>

        <div className="mb-3">
          <label className="block mb-1.5">Material</label>
          {materialsArray.map((mat: string) => (
            <label key={mat} className="block text-sm capitalize">
              <input
                type="checkbox"
                checked={filters.material.includes(mat)}
                onChange={() => toggleMaterial(mat)}
                className="mr-2 accent-black hover:accent-gray-500"
              />
              {mat}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
