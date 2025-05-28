import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import SlabDetailPage from "./pages/SlabDetailPage";
// import Submit from "./pages/Submit";
import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/inventory/:id" element={<SlabDetailPage />} />
          {/* <Route path="/submit" element={<Submit />} /> */}
        </Routes>
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
