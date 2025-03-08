import { render, screen } from "@testing-library/react";
import PlanningPage from "../../pages/PlanningPage";
import "@testing-library/jest-dom";

// Mock PlanningGrid to avoid full render in tests
jest.mock("../components/PlanningGrid", () => () => (
  <div data-testid="planning-grid">Planning Grid</div>
));

describe("PlanningPage Component", () => {
  it("renders the Planning page with header", () => {
    render(<PlanningPage />);

    expect(screen.getByText("Planning")).toBeInTheDocument();
    expect(screen.getByTestId("planning-grid")).toBeInTheDocument();
  });
});
