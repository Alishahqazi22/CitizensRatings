import React from "react";
import Chart from "react-apexcharts";

const QuestionChart = ({ answer }) => {
  const isYes = String(answer).toLowerCase() === "yes";

  const options = {
    chart: {
      type: "donut",
    },
    colors: [isYes ? "#9CCD7A" : "#ef4444", "#e5e7eb"],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    stroke: {
      width: 0,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "60%",
          labels: {
            show: false,
          },
        },
      },
    },
  };

  const series = [100, 0];

  return (
    <div className="flex items-center gap-4">
      <Chart
        options={options}
        series={series}
        type="donut"
        height={250}
        width={250}
      />
      <div className="flex items-center font-medium gap-1 text-[.8rem]">
        <p
          className={`size-3 rounded-full ${
            !isYes ? "bg-[#ef4444]" : "bg-[#9CCD7A]"
          }`}
        >
        </p>
            {isYes ? "Yes" : "No"}
      </div>
    </div>
  );
};

export default QuestionChart;
