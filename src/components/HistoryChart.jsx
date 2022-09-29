import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { dayAndMonth } from "../helpers/dateHandlers";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

//return X axis data based on type
export const getXaxisData = (records = [], type = "") => {
  if (type === "weight") {
    return records.map((record) => record.weight);
  } else if (type === "reps") {
    return records.map((record) => record.reps);
  } else if (type === "performance") {
    return records.map((record) => record.reps * record.weight);
  } else {
    return [];
  }
};

export default function HistoryChart({ records, type }) {
  // graph is started from 0
  const axisXdata = [0, ...getXaxisData(records, type)];
  const labels = ["", ...records.map((record) => dayAndMonth(record.date))];

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        // if weight is on Y axis, then max range * 2
        max: Math.max(...axisXdata) * (type === "weight" ? 2 : 1.1),
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        data: axisXdata,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.4,
      },
    ],
  };

  return <Line options={options} data={data} />;
}
