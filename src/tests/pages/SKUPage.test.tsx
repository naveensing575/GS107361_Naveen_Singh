import { render, screen, fireEvent } from "@testing-library/react";
import SKUPage from "../../pages/SKUPage";
import "@testing-library/jest-dom";

// Mock SKUTable and SKUForm components
jest.mock("../components/SKUTable", () => () => (
  <div data-testid="sku-table">SKU Table</div>
));
jest.mock(
  "../components/SKUForm",
  () =>
    ({ onClose }: { onClose: () => void }) =>
      (
        <div data-testid="sku-form">
          SKU Form
          <button onClick={onClose}>Close</button>
        </div>
      )
);

describe("SKUPage Component", () => {
  it("renders the SKU table and add button", () => {
    render(<SKUPage />);

    expect(screen.getByTestId("sku-table")).toBeInTheDocument();
    expect(screen.getByText("NEW SKU")).toBeInTheDocument();
  });

  it("opens and closes the SKU form when clicking the button", () => {
    render(<SKUPage />);

    // Click "NEW SKU" button
    fireEvent.click(screen.getByText("NEW SKU"));
    expect(screen.getByTestId("sku-form")).toBeInTheDocument();

    // Click "Close" button in form
    fireEvent.click(screen.getByText("Close"));
    expect(screen.queryByTestId("sku-form")).not.toBeInTheDocument();
  });
});
