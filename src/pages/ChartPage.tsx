import { useSelector } from "react-redux";
import { RootState } from "../store";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const ChartPage = () => {
  const stores = useSelector((state: RootState) => state.stores.stores);
  const skus = useSelector((state: RootState) => state.skus.skus);

  const data = stores.map((store) => ({
    store: store.name,
    gmDollars: skus.reduce((sum, sku) => sum + sku.price - sku.cost, 0),
    gmPercentage: 40, // Example static percentage
  }));

  return (
    <div className="p-6 ml-60">
      <h2 className="text-2xl font-bold mb-4">Charts</h2>
      <BarChart width={600} height={300} data={data}>
        <XAxis dataKey="store" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="gmDollars" fill="#8884d8" />
        <Bar dataKey="gmPercentage" fill="#82ca9d" />
      </BarChart>
    </div>
  );
};

export default ChartPage;
