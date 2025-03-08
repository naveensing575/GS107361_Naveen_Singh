import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import StoreForm from "../components/StoreForm";
import { addStore, updateStore } from "../store/storesSlice";
import "@testing-library/jest-dom";

// Mock Redux store
const mockStore = configureStore([]);
const initialState = {
  stores: {
    stores: [],
  },
};

// Mock useDispatch
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => jest.fn(),
}));

describe("StoreForm Component", () => {
  let store: any;
  let mockOnClose: jest.Mock;

  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = jest.fn();
    mockOnClose = jest.fn();
  });

  it("renders the form with empty fields when adding a new store", () => {
    render(
      <Provider store={store}>
        <StoreForm onClose={mockOnClose} />
      </Provider>
    );

    expect(screen.getByPlaceholderText("Store Name")).toHaveValue("");
    expect(screen.getByPlaceholderText("City")).toHaveValue("");
    expect(screen.getByPlaceholderText("State")).toHaveValue("");
    expect(screen.getByText("Add Store")).toBeInTheDocument();
  });

  it("renders the form with existing store details when editing", () => {
    const editingStore = {
      id: "1",
      label: "Test Store",
      city: "Test City",
      state: "TS",
    };

    render(
      <Provider store={store}>
        <StoreForm onClose={mockOnClose} editingStore={editingStore} />
      </Provider>
    );

    expect(screen.getByPlaceholderText("Store Name")).toHaveValue("Test Store");
    expect(screen.getByPlaceholderText("City")).toHaveValue("Test City");
    expect(screen.getByPlaceholderText("State")).toHaveValue("TS");
    expect(screen.getByText("Save Changes")).toBeInTheDocument();
  });

  it("dispatches addStore action when adding a new store", () => {
    render(
      <Provider store={store}>
        <StoreForm onClose={mockOnClose} />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("Store Name"), {
      target: { value: "New Store" },
    });
    fireEvent.change(screen.getByPlaceholderText("City"), {
      target: { value: "New City" },
    });
    fireEvent.change(screen.getByPlaceholderText("State"), {
      target: { value: "NS" },
    });

    fireEvent.click(screen.getByText("Add Store"));

    expect(store.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: addStore.type,
        payload: expect.objectContaining({
          label: "New Store",
          city: "New City",
          state: "NS",
        }),
      })
    );

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("dispatches updateStore action when saving changes", () => {
    const editingStore = {
      id: "1",
      label: "Old Store",
      city: "Old City",
      state: "OS",
    };

    render(
      <Provider store={store}>
        <StoreForm onClose={mockOnClose} editingStore={editingStore} />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("Store Name"), {
      target: { value: "Updated Store" },
    });

    fireEvent.click(screen.getByText("Save Changes"));

    expect(store.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: updateStore.type,
        payload: {
          id: "1",
          label: "Updated Store",
          city: "Old City",
          state: "OS",
        },
      })
    );

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("closes the form when the cancel button is clicked", () => {
    render(
      <Provider store={store}>
        <StoreForm onClose={mockOnClose} />
      </Provider>
    );

    fireEvent.click(screen.getByText("Cancel"));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
