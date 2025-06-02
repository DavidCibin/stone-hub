import { useMainContext } from "../context/MainContext";

function Sidebar() {
  const { sidebarContent } = useMainContext();

  return <div className="p-4">{sidebarContent}</div>;
}

export default Sidebar;
