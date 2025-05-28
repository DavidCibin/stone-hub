import { type Dispatch, type SetStateAction } from "react";

type Filters = {
  name: string;
  material: string[];
  finish: string[];
  thickness: string;
  availability: string;
  colors: string[];
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
  const materials = ["Granite", "Marble"];
  const finishes = ["Polished", "Honed"];
  const colors = ["White", "Black", "Gray", "Gold", "Green"];

  const handleMultiSelectChange = (
    key: "material" | "finish" | "colors",
    value: string,
  ) => {
    setFilters((prev) => {
      const currentValues = prev[key];
      const updatedValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      return { ...prev, [key]: updatedValues };
    });
  };

  const handleSingleChange = (key: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Sort By</h2>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="thickness">Thickness</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </select>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Filter</h2>

        {/* Name Search */}
        <div className="mb-3">
          <label className="block text-sm mb-1">Search by Name</label>
          <input
            type="text"
            value={filters.name}
            onChange={(e) => handleSingleChange("name", e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Material Checkbox */}
        <div className="mb-3">
          <label className="block text-sm mb-1">Material</label>
          {materials.map((mat) => (
            <label key={mat} className="block text-sm">
              <input
                type="checkbox"
                checked={filters.material.includes(mat)}
                onChange={() => handleMultiSelectChange("material", mat)}
                className="mr-2"
              />
              {mat}
            </label>
          ))}
        </div>

        {/* Finish Checkbox */}
        <div className="mb-3">
          <label className="block text-sm mb-1">Finish</label>
          {finishes.map((fin) => (
            <label key={fin} className="block text-sm">
              <input
                type="checkbox"
                checked={filters.finish.includes(fin)}
                onChange={() => handleMultiSelectChange("finish", fin)}
                className="mr-2"
              />
              {fin}
            </label>
          ))}
        </div>

        {/* Colors Checkbox */}
        <div className="mb-3">
          <label className="block text-sm mb-1">Colors</label>
          {colors.map((color) => (
            <label key={color} className="block text-sm">
              <input
                type="checkbox"
                checked={filters.colors.includes(color)}
                onChange={() => handleMultiSelectChange("colors", color)}
                className="mr-2"
              />
              {color}
            </label>
          ))}
        </div>

        {/* Thickness Dropdown */}
        <div className="mb-3">
          <label className="block text-sm mb-1">Thickness</label>
          <select
            value={filters.thickness}
            onChange={(e) => handleSingleChange("thickness", e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">All</option>
            <option value="2">2 cm</option>
            <option value="3">3 cm</option>
          </select>
        </div>

        {/* Availability Dropdown */}
        <div>
          <label className="block text-sm mb-1">Availability</label>
          <select
            value={filters.availability}
            onChange={(e) => handleSingleChange("availability", e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">All</option>
            <option value="true">In Stock</option>
            <option value="false">Out of Stock</option>
          </select>
        </div>
      </div>
    </>
  );
}
