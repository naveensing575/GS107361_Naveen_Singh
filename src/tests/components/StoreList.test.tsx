import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import StoreList from "../components/StoreList";
import { removeStore, reorderStores } from "../store/storesSlice";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "@testing-library/jest-dom";

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

describe("StoreList Component", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = jest.fn();
  });

  it("renders the list of stores", () => {
    render(
      <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
          <StoreList />
        </DndProvider>
      </Provider>
    );

    expect(screen.getByText("Store A")).toBeInTheDocument();
    expect(screen.getByText("Store B")).toBeInTheDocument();
  });

  it("dispatches removeStore action when delete button is clicked", () => {
    render(
      <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
          <StoreList />
        </DndProvider>
      </Provider>
    );

    const deleteButtons = screen.getAllByText("Delete");
    fireEvent.click(deleteButtons[0]);

    expect(store.dispatch).toHaveBeenCalledWith(removeStore("1"));
  });

  it("allows dragging and dropping store items", () => {
    render(
      <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
          <StoreList />
        </DndProvider>
      </Provider>
    );

    store.dispatch.mockClear();

    const firstStore = screen.getByText("Store A");
    const secondStore = screen.getByText("Store B");

    fireEvent.dragStart(firstStore);
    fireEvent.drop(secondStore);

    expect(store.dispatch).toHaveBeenCalledWith(
      reorderStores({ fromIndex: 0, toIndex: 1 })
    );
  });
});
