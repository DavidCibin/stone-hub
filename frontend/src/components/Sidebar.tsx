import { useMainContext } from "../context/MainContext";

function Sidebar() {
  const { sidebarContent } = useMainContext();

  return <div className="p-4 pt-6">{sidebarContent}</div>;
}

export default Sidebar;
