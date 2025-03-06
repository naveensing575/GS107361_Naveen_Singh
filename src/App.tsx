import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import StoresPage from "./pages/StoresPage";
import SkusPage from "./pages/SkusPage";
import PlanningPage from "./pages/PlanningPage";
import ChartPage from "./pages/ChartPage";

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-60">
          <Navbar />
          <Routes>
            <Route path="/" element={<StoresPage />} />
            <Route path="/skus" element={<SkusPage />} />
            <Route path="/planning" element={<PlanningPage />} />
            <Route path="/chart" element={<ChartPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
