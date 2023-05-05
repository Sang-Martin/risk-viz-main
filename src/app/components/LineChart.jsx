import { Line } from "react-chartjs-2";
import { useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { useContext } from "react";
import { AppContext } from "../contexts/app";

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },

};

const LineGraph = () => {
  const [state, dispatch] = useContext(AppContext)
  const datas = state.locations
  const [selectedAsset, setSelectedAsset] = useState(datas[0]["Asset Name"]);

  const data = {
    labels: datas
      .filter((d) => d["Asset Name"] === selectedAsset)
      .map((d) => d["Year"]),
    datasets: [
      {
        label: "Risk Rating",
        data: datas
          .filter((d) => d["Asset Name"] === selectedAsset)
          .map((d) => d["Risk Rating"]),
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const handleChange = (event) => {
    setSelectedAsset(event.target.value);
  };

  return (
    <section className="section">
      <h2 className="title">Risk Level Over Time</h2>
      <div className="flex flex-col gap-4 w-full">

      <select value={selectedAsset} onChange={handleChange} className="select select-sm max-w-md mx-auto select-bordered">
        {datas.map((d) => (
          <option key={d["Asset Name"]} value={d["Asset Name"]}>
            {d["Asset Name"]}
          </option>
        ))}
      </select>
      <Line data={data} options={options} />
        </div>
    </section>
  );
};

export default LineGraph;
