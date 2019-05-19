import React from "react";
import { Bar } from "react-chartjs-2";

import "./style.css";

const Chart = props => {
  let chartData = {
    labels: ["Correct", "Wrong"],

    datasets: [
      {
        label: "Questionnaire",
        data: [props.correct, props.wrong, 0],
        backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(255, 99, 132, 0.6)"]
      }
    ],
    borderColor: ["rgba(54, 162, 235, 1)", "rgba(255,99,132,1)"]
  };

  if (props.correct === 0 && props.wrong === 0) {
    return (
      <div className="Chart-Container">
        <h4>Result Chart appears here!</h4>
      </div>
    );
  } else {
    return (
      <div className="Chart-Container">
        <div className="Chart-Bar-Container" />
        <Bar
          // width={400}
          // height={10}
          data={chartData}
          options={{
            maintainAspectRatio: false,
            responsive: true,
            scales: {
              xAxes: [
                {
                  ticks: {
                    stepSize: 10
                  },
                  stacked: true,
                  gridLines: {
                    lineWidth: 0,
                    color: "rgba(255,255,255,0)"
                  }
                }
              ],
              yAxes: [
                {
                  stacked: true,
                  ticks: {
                    min: 0,
                    stepSize: 1
                  }
                }
              ]
            }
          }}
        />

        <span>{props.correct !== 0 ? `Correct: ${props.correct}` : null} </span>
        <span>{props.wrong !== 0 ? `Wrong: ${props.wrong}` : null} </span>
      </div>
    );
  }
};

export default Chart;
