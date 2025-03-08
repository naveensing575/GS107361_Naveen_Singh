import { render, screen, fireEvent } from "@testing-library/react";
import ChartPage from "../../pages/ChartPage";
import { STORES } from "../../data/demoData";
import "@testing-library/jest-dom";

// Mock GMChart to avoid rendering issues inside Jest
jest.mock("../components/GMChart", () => ({ store }: { store: string }) => (
  <div data-testid="gm-chart">Chart for {store}</div>
));

describe("ChartPage Component", () => {
  it("renders the page title and default store selection", () => {
    render(<ChartPage />);

    expect(screen.getByText("Gross Margin Chart")).toBeInTheDocument();
    expect(screen.getByLabelText("Select Store:")).toBeInTheDocument();
    expect(screen.getByTestId("gm-chart")).toHaveTextContent(
      `Chart for ${STORES[0].label}`
    );
  });

  it("changes the selected store and updates the chart", () => {
    render(<ChartPage />);

    const select = screen.getByLabelText("Select Store:") as HTMLSelectElement;
    fireEvent.change(select, { target: { value: STORES[1].label } });

    expect(screen.getByTestId("gm-chart")).toHaveTextContent(
      `Chart for ${STORES[1].label}`
    );
  });
});
