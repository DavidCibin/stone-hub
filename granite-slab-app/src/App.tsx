import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import SlabDetailPage from "./pages/SlabDetailPage";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

import { AppProvider } from "./context/appProvider";
import { useSidebar } from "./context/SidebarContext";

function App() {
  const { content } = useSidebar();

  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <div className="flex flex-grow flex-col lg:flex-row pt-20">
          {/* ✅ Sidebar rendered only if content exists */}
          {content && (
            <aside className="lg:w-[400px] w-full lg:min-w-[400px] min-w-full bg-gray-100">
              <Sidebar />
            </aside>
          )}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/inventory/:id" element={<SlabDetailPage />} />
            </Routes>
          </main>
        </div>

        <Footer />
      </div>
    </AppProvider>
  );
}

export default App;
