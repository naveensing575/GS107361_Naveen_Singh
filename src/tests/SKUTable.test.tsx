import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import SKUTable from "../components/SKUTable";
import { removeSKU } from "../store/skuSlice";
import "@testing-library/jest-dom";

// Mock Redux store
const mockStore = configureStore([]);
const initialState = {
  skus: {
    skus: [
      {
        id: "1",
        label: "SKU 1",
        price: 10.99,
        cost: 5.99,
        class: "A",
        department: "Electronics",
      },
      {
        id: "2",
        label: "SKU 2",
        price: 20.99,
        cost: 10.99,
        class: "B",
        department: "Clothing",
      },
    ],
  },
};

// Mock useDispatch
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => jest.fn(),
}));

describe("SKUTable Component", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = jest.fn();
  });

  it("renders SKU table with correct data", () => {
    render(
      <Provider store={store}>
        <SKUTable />
      </Provider>
    );

    expect(screen.getByText("SKU 1")).toBeInTheDocument();
    expect(screen.getByText("SKU 2")).toBeInTheDocument();
    expect(screen.getByText("$10.99")).toBeInTheDocument();
    expect(screen.getByText("$20.99")).toBeInTheDocument();
  });

  it("dispatches removeSKU action when delete button is clicked", () => {
    render(
      <Provider store={store}>
        <SKUTable />
      </Provider>
    );

    const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
    fireEvent.click(deleteButtons[0]);

    expect(store.dispatch).toHaveBeenCalledWith(removeSKU("1"));
  });

  it("opens SKUForm when edit button is clicked", () => {
    render(
      <Provider store={store}>
        <SKUTable />
      </Provider>
    );

    const editButtons = screen.getAllByRole("button", { name: /edit/i });
    fireEvent.click(editButtons[0]);

    expect(screen.getByText("Edit SKU")).toBeInTheDocument();
  });
});
