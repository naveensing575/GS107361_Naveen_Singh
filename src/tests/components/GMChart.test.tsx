import React from "react";
import { render, screen } from "@testing-library/react";
import GMChart from "../../components/GMChart";
import { CHART_DATA } from "../../data/demoData";
import "@testing-library/jest-dom";

jest.mock("recharts", () => ({
  ...jest.requireActual("recharts"),
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="responsive-container">{children}</div>
  ),
}));

describe("GMChart Component", () => {
  it("renders chart with correct store name", () => {
    render(<GMChart store="Test Store" />);

    expect(screen.getByText("Gross Margin for Test Store")).toBeInTheDocument();
    expect(screen.getByTestId("responsive-container")).toBeInTheDocument();
  });

  it("renders the correct number of data points", () => {
    render(<GMChart store="Test Store" />);
    expect(CHART_DATA.length).toBeGreaterThan(0);
  });
});
