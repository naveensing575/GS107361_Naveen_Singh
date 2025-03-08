import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import StoreTable from "../../pages/StoreTable";
import { removeStore, reorderStores } from "../../store/storesSlice";
import "@testing-library/jest-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Mock Redux store
const mockStore = configureStore([]);
const initialState = {
  stores: {
    stores: [
      { id: "1", label: "Store A", city: "New York", state: "NY" },
      { id: "2", label: "Store B", city: "Los Angeles", state: "CA" },
    ],
  },
};

// Mock useDispatch
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => jest.fn(),
}));

describe("StoreTable Component", () => {
  let store: any;
  let mockOnEdit: jest.Mock;

  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = jest.fn();
    mockOnEdit = jest.fn();
  });

  it("renders store table with correct data", () => {
    render(
      <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
          <StoreTable onEdit={mockOnEdit} />
        </DndProvider>
      </Provider>
    );

    expect(screen.getByText("Store A")).toBeInTheDocument();
    expect(screen.getByText("Store B")).toBeInTheDocument();
    expect(screen.getByText("New York")).toBeInTheDocument();
    expect(screen.getByText("Los Angeles")).toBeInTheDocument();
  });

  it("dispatches removeStore action when delete button is clicked", () => {
    render(
      <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
          <StoreTable onEdit={mockOnEdit} />
        </DndProvider>
      </Provider>
    );

    const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
    fireEvent.click(deleteButtons[0]);

    expect(store.dispatch).toHaveBeenCalledWith(removeStore("1"));
  });

  it("calls onEdit function when edit button is clicked", () => {
    render(
      <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
          <StoreTable onEdit={mockOnEdit} />
        </DndProvider>
      </Provider>
    );

    const editButtons = screen.getAllByRole("button", { name: /edit/i });
    fireEvent.click(editButtons[0]);

    expect(mockOnEdit).toHaveBeenCalledWith({
      id: "1",
      label: "Store A",
      city: "New York",
      state: "NY",
    });
  });

  it("dispatches reorderStores action when drag event occurs", () => {
    render(
      <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
          <StoreTable onEdit={mockOnEdit} />
        </DndProvider>
      </Provider>
    );

    const dragHandles = screen.getAllByText("☰");
    fireEvent.dragStart(dragHandles[0]);
    fireEvent.drop(dragHandles[1]);

    expect(store.dispatch).toHaveBeenCalledWith(
      reorderStores({ fromIndex: 0, toIndex: 1 })
    );
  });
});
