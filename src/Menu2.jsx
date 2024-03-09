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

import "./Menu1.css";
import { jsonData2 } from "./assets/data2";

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

const getClassOfBusiness = (data) => {
  let st = new Set();
  data.map((ele) => {
    st.add(ele.class_of_business);
  });
  return Array.from(st);
};

const getClassTypes = (data) => {
  let st = new Set();
  data.map((ele) => {
    st.add(ele.class_type);
  });
  return Array.from(st);
};

const getYearOptions = (data) => {
  let st = new Set();
  data.map((ele) => {
    st.add(ele.year);
  });
  return Array.from(st);
};

const getBardata = (jsonData, selectedYear, selectedClassOfBusiness, selectedClassType) => {
  console.log(selectedYear, selectedClassOfBusiness, selectedClassType);
  let data = jsonData.filter((ele) => {
    return (
      ele.year == selectedYear &&
      ele.class_of_business == selectedClassOfBusiness &&
      ele.class_type == selectedClassType
    );
  });

  data = data.sort((a, b) => {
    if (a.gwp < b.gwp) return 1;
    if (a.gwp > b.gwp) return -1;
    return 0;
  });
  data = data.slice(0, 10);
  console.log(data);
  return data;
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
function Menu2() {
  const classOfBussiness = getClassOfBusiness(jsonData2);
  const yearOptions = getYearOptions(jsonData2);

  const [selectedClassOfBusiness, setselectedClassOfBusiness] = useState(classOfBussiness[0]);
  const [selectedYear, setSelectedYear] = useState(yearOptions[0]);
  const [classTypesOptions, setClassTypesOptions] = useState(getClassTypes(jsonData2));
  const [selectedClassType, setSelectedClassType] = useState(classTypesOptions[0]);
  const [data, setData] = useState(null);

  let backgroundColors = [];
  for (let i = 0; i < 40; i++) {
    backgroundColors.push(getRandomColor(0.5));
  }

  const handleClassOfBusinessChange = (event) => {
    setselectedClassOfBusiness(event.target.value);
    if (event.target.value === "Financial Institution") {
      setClassTypesOptions(["Crime", "D&O", "FIPI"]);
      setSelectedClassType("Crime");
    } else {
      setSelectedClassType("PI");
      setClassTypesOptions(["PI"]);
    }
  };
  const handleClassTypeChange = (event) => {
    setSelectedClassType(event.target.value);
  };
  const handlerYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  useEffect(() => {
    setData(getBardata(jsonData2, selectedYear, selectedClassOfBusiness, selectedClassType));
  }, [selectedClassOfBusiness, selectedYear, selectedClassType]);

  return (
    <div className="main-container">
      <div className="drop-container">
        <div className="drop-item">
          <label htmlFor="dropdown2">Class Of Business</label>
          <select id="dropdown2" value={selectedClassOfBusiness} onChange={handleClassOfBusinessChange}>
            {classOfBussiness.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="drop-item">
          <label htmlFor="dropdown2">Class Type</label>
          <select id="dropdown2" value={selectedClassType} onChange={handleClassTypeChange}>
            {classTypesOptions.map((option, index) => (
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
                        <th>GWP</th>
                        <th>Business Plan</th>
                        <th>Earned Premium</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((ele) => {
                        return (
                          <tr>
                            <td>{ele.gwp}</td>
                            <td>{ele.business_plan}</td>
                            <td>{ele.earned_premium}</td>
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
                    labels: data.map((ele, ind) => `Type ${ind + 1}`),
                    datasets: [
                      {
                        label: "GWP",
                        data: data.map((ele) => ele.gwp),
                        backgroundColor: "rgba(255, 99, 132, 0.5)",
                      },
                      {
                        label: "Business Plan",
                        data: data.map((ele) => ele.business_plan),
                        backgroundColor: "rgba(53, 162, 235, 0.5)",
                      },
                      {
                        label: "Earned Premium",
                        data: data.map((ele) => ele.earned_premium),
                        backgroundColor: "rgba(255, 72, 31, 0.5)",
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
                    labels: data.map((ele, ind) => `Type ${ind + 1}`),
                    datasets: [
                      {
                        label: "GWP",
                        data: data.map((ele) => ele.gwp),
                        borderColor: "rgb(255, 99, 132)",
                        backgroundColor: "rgba(255, 99, 132, 0.5)",
                      },
                      {
                        label: "Business Plan",
                        data: data.map((ele) => ele.business_plan),
                        borderColor: "rgb(53, 162, 235)",
                        backgroundColor: "rgba(53, 162, 235, 0.5)",
                      },
                      {
                        label: "Earned Premium",
                        data: data.map((ele) => ele.earned_premium),
                        borderColor: "rgb(255, 72, 31)",
                        backgroundColor: "rgba(255, 72, 31, 0.5)",
                      },
                    ],
                  }}
                />
              </div>
              <div className="chart-item">
                <Doughnut
                  data={{
                    labels: data.map((ele, ind) => `Type ${ind + 1}`),
                    datasets: [
                      {
                        label: "GWP",
                        data: data.map((ele) => ele.gwp),
                        borderWidth: 1,
                        backgroundColor: backgroundColors,
                      },
                      {
                        label: "Business Plan",
                        data: data.map((ele) => ele.business_plan),
                        borderWidth: 1,
                        backgroundColor: backgroundColors,
                      },
                      {
                        label: "Earned Premium",
                        data: data.map((ele) => ele.earned_premium),
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

export default Menu2;
