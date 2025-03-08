import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import PlanningGrid from "../../components/PlanningGrid";
import { updateSalesUnits } from "../../store/planningSlice";
import "@testing-library/jest-dom";
import { STORES, SKUS } from "../../data/demoData";

// Mock Redux store
const mockStore = configureStore([]);
const initialState = {
  planning: {
    data: [
      { store: "1", sku: "101", week: "Week1", salesUnits: 10 },
      { store: "2", sku: "102", week: "Week2", salesUnits: 5 },
    ],
  },
};

// Mock useDispatch
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => jest.fn(),
}));

describe("PlanningGrid Component", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = jest.fn();
  });

  it("renders PlanningGrid component", async () => {
    render(
      <Provider store={store}>
        <PlanningGrid />
      </Provider>
    );

    // Simulating loading time
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    );
  });

  it("displays correct store and SKU data", async () => {
    render(
      <Provider store={store}>
        <PlanningGrid />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Store")).toBeInTheDocument();
      expect(screen.getByText("SKU")).toBeInTheDocument();
    });

    // Check if the mock store's SKU labels are in the grid
    STORES.forEach((store) => {
      expect(screen.getByText(store.label)).toBeInTheDocument();
    });

    SKUS.forEach((sku) => {
      expect(screen.getByText(sku.label)).toBeInTheDocument();
    });
  });

  it("updates sales units when cell value changes", async () => {
    render(
      <Provider store={store}>
        <PlanningGrid />
      </Provider>
    );

    await waitFor(() => screen.getByText("Store"));

    const cell = screen.getByText("10"); // Example salesUnits for "Week1"
    fireEvent.click(cell);
    fireEvent.change(cell, { target: { value: "20" } });
    fireEvent.blur(cell);

    expect(store.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: updateSalesUnits.type,
        payload: expect.objectContaining({
          value: 20,
        }),
      })
    );
  });
});
