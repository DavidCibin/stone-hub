import { useSidebar } from "../context/SidebarContext";

function Sidebar() {
  const { content } = useSidebar();

  return <div className="p-4">{content}</div>;
}

export default Sidebar;
