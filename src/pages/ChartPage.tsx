import { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const sampleData = [
  { week: "W01", gmDollars: 140000, salesDollars: 239000, gmPercent: 0.58 },
  { week: "W02", gmDollars: 110000, salesDollars: 258000, gmPercent: 0.42 },
  { week: "W03", gmDollars: 101000, salesDollars: 263000, gmPercent: 0.38 },
];

export default function ChartPage() {
  const [selectedStore, setSelectedStore] = useState("Store A");

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Chart</h2>
      <select
        className="p-2 border rounded mb-4"
        onChange={(e) => setSelectedStore(e.target.value)}
      >
        <option>Store A</option>
        <option>Store B</option>
      </select>
      <div className="flex gap-6">
        <BarChart width={500} height={300} data={sampleData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="gmDollars" fill="#8884d8" name="GM $" />
        </BarChart>

        <LineChart width={500} height={300} data={sampleData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="gmPercent"
            stroke="#82ca9d"
            name="GM %"
          />
        </LineChart>
      </div>
    </div>
  );
}
