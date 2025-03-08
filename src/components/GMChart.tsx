import { FC } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
} from "recharts";
import { CHART_DATA } from "../data/demoData";

interface GMChartProps {
  store: string;
}

const GMChart: FC<GMChartProps> = ({ store }) => {
  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold mb-4">Gross Margin for {store}</h3>

      {/* Chart Container */}
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={CHART_DATA}>
          <XAxis dataKey="week" />
          <YAxis
            yAxisId="left"
            orientation="left"
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip formatter={(value) => value.toLocaleString()} />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />

          {/* Bar Chart for GM Dollars */}
          <Bar
            yAxisId="left"
            dataKey="gmDollars"
            fill="#1E90FF"
            name="GM Dollars"
          />

          {/* Line Chart for GM Percent */}
          <Line
            yAxisId="right"
            dataKey="gmPercent"
            stroke="#FF4500"
            name="GM %"
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GMChart;
