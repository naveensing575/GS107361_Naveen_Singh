import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { useAuth0 } from "@auth0/auth0-react";
import useLoadSampleData from "./hooks/useLoadSampleData";
import Layout from "./components/Layout";
import StorePage from "./pages/StorePage";
import SKUPage from "./pages/SKUPage";
import PlanningPage from "./pages/PlanningPage";
import ChartPage from "./pages/ChartPage";
import LoginPage from "./pages/LoginPage";

export default function App() {
  useLoadSampleData();
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Layout>
                    <StorePage />
                  </Layout>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/sku"
              element={
                isAuthenticated ? (
                  <Layout>
                    <SKUPage />
                  </Layout>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/planning"
              element={
                isAuthenticated ? (
                  <Layout>
                    <PlanningPage />
                  </Layout>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/chart"
              element={
                isAuthenticated ? (
                  <Layout>
                    <ChartPage />
                  </Layout>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </BrowserRouter>
      </DndProvider>
    </Provider>
  );
}
