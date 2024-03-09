import { useState, useEffect } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";

import { jsonData1 } from "./assets/data1";
import "./Menu1.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
ChartJS.register(ArcElement, Tooltip, Legend);
const charOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const getRandomColor = (alpha) => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
};

const getMarketTypeOptions = (data) => {
  let st = new Set();
  data.map((ele) => {
    st.add(ele.market_type);
  });
  let arr = Array.from(st);
  arr.push("Combined");
  return arr;
};

const getYearOptions = (data) => {
  let st = new Set();
  data.map((ele) => {
    st.add(ele.year);
  });
  return Array.from(st);
};

const getBardata = (data, selectedYear, selectedMarketType) => {
  let data3 = data.filter((ele) => {
    if (selectedMarketType === "Combined") return ele.year == selectedYear;
    return ele.year == selectedYear && ele.market_type == selectedMarketType;
  });

  data3 = data3.sort((a, b) => {
    if (a.gwp < b.gwp) return 1;
    if (a.gwp > b.gwp) return -1;
    return 0;
  });
  data3 = data3.slice(0, 10);

  return data3;
};

export const options2 = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};
function Menu1() {
  const marketTypeOptions = getMarketTypeOptions(jsonData1);
  const yearOptions = getYearOptions(jsonData1);

  const [selectedMarketType, setSelectedMarketType] = useState(marketTypeOptions[0]);
  const [selectedYear, setSelectedYear] = useState(yearOptions[0]);
  const [data, setData] = useState(null);

  let backgroundColors = [];
  for (let i = 0; i < 20; i++) {
    backgroundColors.push(getRandomColor(0.5));
  }

  const handleMarketTypeChange = (event) => {
    setSelectedMarketType(event.target.value);
  };
  const handlerYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  useEffect(() => {
    setData(getBardata(jsonData1, selectedYear, selectedMarketType));
  }, [selectedMarketType, selectedYear]);

  return (
    <div className="main-container">
      
      <div className="drop-container">
        <div className="drop-item">
          <label htmlFor="dropdown2">Market Type</label>
          <select id="dropdown2" value={selectedMarketType} onChange={handleMarketTypeChange}>
            {marketTypeOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="drop-item">
          <label htmlFor="dropdown2">Year</label>
          <select id="dropdown2" value={selectedYear} onChange={handlerYearChange}>
            {yearOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      {data !== null && (
        <div className="dashboard">
          <div className="dashboard-container">
            <div className="chart-container">
              <div className="chart-item">
                <div className="table">
                  <table>
                    <thead>
                      <tr>
                        <th>Broker Name</th>
                        <th>GWP</th>
                        <th>Planned GWP</th>
                        <th>Difference</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((ele) => {
                        return (
                          <tr>
                            <td>{ele.broker_name}</td>
                            <td>{ele.gwp}</td>
                            <td>{ele.planned_gwp}</td>
                            <td>{Number(((ele.planned_gwp - ele.gwp) / ele.gwp) * 100.0)}%</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="chart-item">
                <Bar
                  charOptions={charOptions}
                  data={{
                    labels: data.map((ele) => ele.broker_name),
                    datasets: [
                      {
                        label: "GWP",
                        data: data.map((ele) => ele.gwp),
                        backgroundColor: "rgba(255, 99, 132, 0.5)",
                      },
                      {
                        label: "Planned GWP",
                        data: data.map((ele) => ele.planned_gwp),
                        backgroundColor: "rgba(53, 162, 235, 0.5)",
                      },
                    ],
                  }}
                />
              </div>
            </div>
            <div className="chart-container">
              <div className="chart-item">
                <Line
                  options={options2}
                  data={{
                    labels: data.map((ele) => ele.broker_name),
                    datasets: [
                      {
                        label: "GWP",
                        data: data.map((ele) => ele.gwp),
                        borderColor: "rgb(255, 99, 132)",
                        backgroundColor: "rgba(255, 99, 132, 0.5)",
                      },
                      {
                        label: "Planned GWP",
                        data: data.map((ele) => ele.planned_gwp),
                        borderColor: "rgb(53, 162, 235)",
                        backgroundColor: "rgba(53, 162, 235, 0.5)",
                      },
                    ],
                  }}
                />
              </div>
              <div className="chart-item">
                <Doughnut
                  data={{
                    labels: data.map((ele) => ele.broker_name),
                    datasets: [
                      {
                        label: "GWP",
                        data: data.map((ele) => ele.gwp),
                        borderWidth: 1,
                        backgroundColor: backgroundColors,
                      },
                      {
                        label: "Planned GWP",
                        data: data.map((ele) => ele.planned_gwp),
                        borderWidth: 1,
                        backgroundColor: backgroundColors,
                      },
                    ],
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Menu1;
