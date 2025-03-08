import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import SKUForm from "../components/SKUForm";
import { addSKU, updateSKU } from "../store/skuSlice";
import "@testing-library/jest-dom";

// Mock Redux store
const mockStore = configureStore([]);
const initialState = {
  skus: {
    skus: [],
  },
};

// Mock useDispatch
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => jest.fn(),
}));

describe("SKUForm Component", () => {
  let store: any;
  let mockOnClose: jest.Mock;

  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = jest.fn();
    mockOnClose = jest.fn();
  });

  it("renders the form with empty fields when adding a new SKU", () => {
    render(
      <Provider store={store}>
        <SKUForm onClose={mockOnClose} />
      </Provider>
    );

    expect(screen.getByPlaceholderText("SKU Name")).toHaveValue("");
    expect(screen.getByPlaceholderText("Price")).toHaveValue("");
    expect(screen.getByPlaceholderText("Cost")).toHaveValue("");
    expect(screen.getByText("Add SKU")).toBeInTheDocument();
  });

  it("renders the form with existing SKU details when editing", () => {
    const editingSKU = {
      id: "1",
      label: "Test SKU",
      price: 10.99,
      cost: 5.99,
      class: "A",
      department: "Electronics",
    };

    render(
      <Provider store={store}>
        <SKUForm onClose={mockOnClose} editingSKU={editingSKU} />
      </Provider>
    );

    expect(screen.getByPlaceholderText("SKU Name")).toHaveValue("Test SKU");
    expect(screen.getByPlaceholderText("Price")).toHaveValue("10.99");
    expect(screen.getByPlaceholderText("Cost")).toHaveValue("5.99");
    expect(screen.getByText("Save Changes")).toBeInTheDocument();
  });

  it("dispatches addSKU action when adding a new SKU", () => {
    render(
      <Provider store={store}>
        <SKUForm onClose={mockOnClose} />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("SKU Name"), {
      target: { value: "New SKU" },
    });
    fireEvent.change(screen.getByPlaceholderText("Price"), {
      target: { value: "15.99" },
    });
    fireEvent.change(screen.getByPlaceholderText("Cost"), {
      target: { value: "8.99" },
    });

    fireEvent.click(screen.getByText("Add SKU"));

    expect(store.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: addSKU.type,
        payload: expect.objectContaining({
          label: "New SKU",
          price: 15.99,
          cost: 8.99,
        }),
      })
    );

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("dispatches updateSKU action when saving changes", () => {
    const editingSKU = {
      id: "1",
      label: "Old SKU",
      price: 10.99,
      cost: 5.99,
      class: "A",
      department: "Electronics",
    };

    render(
      <Provider store={store}>
        <SKUForm onClose={mockOnClose} editingSKU={editingSKU} />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("SKU Name"), {
      target: { value: "Updated SKU" },
    });

    fireEvent.click(screen.getByText("Save Changes"));

    expect(store.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: updateSKU.type,
        payload: {
          id: "1",
          label: "Updated SKU",
          price: 10.99,
          cost: 5.99,
          class: "A",
          department: "Electronics",
        },
      })
    );

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("closes the form when the cancel button is clicked", () => {
    render(
      <Provider store={store}>
        <SKUForm onClose={mockOnClose} />
      </Provider>
    );

    fireEvent.click(screen.getByText("Cancel"));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
