import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadSampleStores } from "../store/storesSlice";
import { loadSampleSKUs } from "../store/skuSlice";
import { loadSamplePlanningData } from "../store/planningSlice";

export default function useLoadSampleData() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSampleStores());
    dispatch(loadSampleSKUs());
    dispatch(loadSamplePlanningData());
  }, [dispatch]);
}
