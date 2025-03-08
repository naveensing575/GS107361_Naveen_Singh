import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import useLoadSampleData from "./hooks/useLoadSampleData";
import Layout from "./components/Layout";
import StorePage from "./pages/StorePage";
import SKUPage from "./pages/SKUPage";
import PlanningPage from "./pages/PlanningPage";
import ChartPage from "./pages/ChartPage";

export default function App() {
  useLoadSampleData();

  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
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
      </DndProvider>
    </Provider>
  );
}
