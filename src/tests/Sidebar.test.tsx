import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "@testing-library/jest-dom";

describe("Sidebar Component", () => {
  it("renders the sidebar with correct links", () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

    expect(screen.getByAltText("GSynergy Logo")).toBeInTheDocument();
    expect(screen.getByText("🏬 Stores")).toBeInTheDocument();
    expect(screen.getByText("📦 SKUs")).toBeInTheDocument();
    expect(screen.getByText("📊 Planning")).toBeInTheDocument();
    expect(screen.getByText("📈 Chart")).toBeInTheDocument();
  });

  it("contains the correct navigation links", () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

    expect(screen.getByText("🏬 Stores").closest("a")).toHaveAttribute(
      "href",
      "/"
    );
    expect(screen.getByText("📦 SKUs").closest("a")).toHaveAttribute(
      "href",
      "/sku"
    );
    expect(screen.getByText("📊 Planning").closest("a")).toHaveAttribute(
      "href",
      "/planning"
    );
    expect(screen.getByText("📈 Chart").closest("a")).toHaveAttribute(
      "href",
      "/chart"
    );
  });
});
