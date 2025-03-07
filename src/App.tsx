import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import StorePage from "./pages/StorePage";
import SKUPage from "./pages/SKUPage";
import PlanningPage from "./pages/PlanningPage";
import ChartPage from "./pages/ChartPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <StorePage />
            </Layout>
          }
        />
        <Route
          path="/sku"
          element={
            <Layout>
              <SKUPage />
            </Layout>
          }
        />
        <Route
          path="/planning"
          element={
            <Layout>
              <PlanningPage />
            </Layout>
          }
        />
        <Route
          path="/chart"
          element={
            <Layout>
              <ChartPage />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
