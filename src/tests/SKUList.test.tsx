import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import SKUList from "../components/SKUList";
import { removeSKU } from "../store/skuSlice";
import "@testing-library/jest-dom";

// Mock Redux store
const mockStore = configureStore([]);
const initialState = {
  skus: {
    skus: [
      { id: "1", label: "SKU 1", price: 10.99 },
      { id: "2", label: "SKU 2", price: 20.99 },
    ],
  },
};

// Mock useDispatch
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => jest.fn(),
}));

describe("SKUList Component", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = jest.fn();
  });

  it("renders SKU list with correct data", () => {
    render(
      <Provider store={store}>
        <SKUList />
      </Provider>
    );

    expect(screen.getByText("SKU 1 - $10.99")).toBeInTheDocument();
    expect(screen.getByText("SKU 2 - $20.99")).toBeInTheDocument();
  });

  it("dispatches removeSKU action when delete button is clicked", () => {
    render(
      <Provider store={store}>
        <SKUList />
      </Provider>
    );

    const deleteButtons = screen.getAllByText("Delete");
    fireEvent.click(deleteButtons[0]);

    expect(store.dispatch).toHaveBeenCalledWith(removeSKU("1"));
  });
});
