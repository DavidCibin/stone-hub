import { useMemo, useState, useEffect } from "react";
import SlabGrid from "./SlabGrid";
import InventorySidebar from "../components/sidebars/InventorySidebar";
import { useMainContext } from "../context/MainContext";
import { useSlabs } from "../hooks/apiHook";

export default function Inventory() {
  const { data: slabs } = useSlabs();

  const [sort, setSort] = useState("");
  const [filters, setFilters] = useState({
    name: "",
    material: [] as string[],
  });

  const { setSidebarContent } = useMainContext();

  useEffect(() => {
    setSidebarContent(
      <InventorySidebar
        sort={sort}
        setSort={setSort}
        filters={filters}
        setFilters={setFilters}
      />,
    );
    return () => setSidebarContent(null);
  }, [sort, filters, setSidebarContent]);

  const filteredSlabs = useMemo(() => {
    let result = [...slabs];

    if (filters.name) {
      result = result.filter((s) =>
        s.Name.toLowerCase().includes(filters.name.toLowerCase()),
      );
    }

    if (filters.material.length) {
      result = result.filter((s) =>
        filters.material
          .map((m) => m.toLowerCase())
          .includes(s.Material.toLowerCase()),
      );
    }

    switch (sort) {
      case "name-asc":
        result.sort((a, b) => a.Name.localeCompare(b.Name));
        break;
      case "name-desc":
        result.sort((a, b) => b.Name.localeCompare(a.Name));
        break;
      case "count-asc":
        result.sort((a, b) => a.count - b.count);
        break;
      case "count-desc":
        result.sort((a, b) => b.count - a.count);
        break;
    }

    return result;
  }, [filters, sort, slabs]);

  return (
    <div className="p-6">
      <h1 className="text-2xl text-teal-500 font-bold mb-4">Available Slabs</h1>
      <SlabGrid slabs={filteredSlabs} />
    </div>
  );
}
