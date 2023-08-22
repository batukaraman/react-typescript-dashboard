import "./barChartBox.scss";
import { BarChart, Bar, Tooltip, ResponsiveContainer } from "recharts";

type Props = {
  title: string;
  color: string;
  dataKey: string;
  chartData: object[];
};

const BarChartBox = (porps: Props) => {
  return (
    <div className="barChartBox">
      <h1>{porps.title}</h1>
      <div className="chart">
        <ResponsiveContainer width="99%" height={150}>
          <BarChart data={porps.chartData}>
            <Tooltip
              contentStyle={{ background: "#2a3447", borderRadius: "6px" }}
              labelStyle={{ display: "none" }}
              cursor={{ fill: "none" }}
            />
            <Bar dataKey={porps.dataKey} fill={porps.color} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartBox;
