import { render, screen, fireEvent } from "@testing-library/react";
import StorePage from "../../pages/StorePage";
import "@testing-library/jest-dom";

// Mock StoreTable and StoreForm components
jest.mock(
  "../components/StoreTable",
  () =>
    ({ onEdit }: { onEdit: (store: any) => void }) =>
      (
        <div data-testid="store-table">
          Store Table
          <button onClick={() => onEdit({ id: "1", label: "Test Store" })}>
            Edit Store
          </button>
        </div>
      )
);

jest.mock(
  "../components/StoreForm",
  () =>
    ({ onClose, editingStore }: { onClose: () => void; editingStore: any }) =>
      (
        <div data-testid="store-form">
          {editingStore ? `Editing ${editingStore.label}` : "New Store Form"}
          <button onClick={onClose}>Close</button>
        </div>
      )
);

describe("StorePage Component", () => {
  it("renders the store table and new store button", () => {
    render(<StorePage />);

    expect(screen.getByTestId("store-table")).toBeInTheDocument();
    expect(screen.getByText("NEW STORE")).toBeInTheDocument();
  });

  it("opens and closes the store form when clicking the new store button", () => {
    render(<StorePage />);

    fireEvent.click(screen.getByText("NEW STORE"));
    expect(screen.getByTestId("store-form")).toHaveTextContent(
      "New Store Form"
    );

    fireEvent.click(screen.getByText("Close"));
    expect(screen.queryByTestId("store-form")).not.toBeInTheDocument();
  });

  it("opens the edit form when clicking edit and closes when done", () => {
    render(<StorePage />);

    fireEvent.click(screen.getByText("Edit Store"));
    expect(screen.getByTestId("store-form")).toHaveTextContent(
      "Editing Test Store"
    );

    fireEvent.click(screen.getByText("Close"));
    expect(screen.queryByTestId("store-form")).not.toBeInTheDocument();
  });
});
