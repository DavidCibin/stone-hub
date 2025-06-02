import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import SlabDetailPage from "./pages/SlabDetailPage";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import ErrorBar from "./components/ErrorBar";

import { AppProvider } from "./context/appProvider";
import { useMainContext } from "./context/MainContext";
import { useEffect } from "react";
import Contact from "./pages/Contact";

// Inside App()

function App() {
  const { isLoading, sidebarContent, error, setError } = useMainContext();
  useEffect(() => {
    if (error.showError) {
      setTimeout(() => {
        setError({ errorMessage: "", showError: false });
      }, 6000);
    }
  }, [error, setError]);

  return (
    <AppProvider>
      <div className="relative z-10 min-h-screen h-full flex flex-col">
        {isLoading && <Loading />}
        <Navbar />
        {error.showError && <ErrorBar message={error.errorMessage} />}

        <div className="flex flex-grow flex-col lg:flex-row pt-20 h-full overflow-y-auto">
          {/* ✅ Sidebar rendered only if content exists */}
          {sidebarContent && (
            <aside className="lg:w-[400px] w-full lg:min-w-[400px] min-w-full bg-gray-50 shoadow-md relative z-10">
              <Sidebar />
            </aside>
          )}
          <main className="flex flex-col flex-grow h-full overflow-unset lg:overflow-y-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/inventory/:param" element={<SlabDetailPage />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
            <Footer />
          </main>
        </div>
      </div>
    </AppProvider>
  );
}

export default App;
