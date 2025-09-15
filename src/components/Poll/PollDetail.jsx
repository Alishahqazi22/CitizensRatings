import React from "react";
import { useParams, Link } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import { pollsData } from "../../Context/Index";

function PollDetail() {
  const { id } = useParams();
  const poll = pollsData.find((p) => p.id === parseInt(id));

  if (!poll) {
    return (
      <div className="mt-28 text-center">
        <h1 className="text-3xl font-semibold">Poll Not Found</h1>
        <Link to="/poll" className="text-blue-500 underline mt-4 block">
          Go Back
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-28 max-w-4xl mx-auto p-8 flex flex-col items-center">
      <h1 className="uppercase text-2xl font-bold mb-6 text-center">
        {poll.title}
      </h1>
      <img
        src={poll.image}
        alt={poll.title}
        className="w-full max-w-md h-64 object-cover rounded-sm mb-8 brightness-90"
      />

      {poll.questions.map((q, qIndex) => {
        const series = [
          {
            name: "Votes (%)",
            data: q.answers.map((a) => parseFloat(a.percentage)),
          },
        ];

        const options = {
          chart: { type: "bar", height: 350 },
          // plotOptions: {
          //   bar: { horizontal: false, columnWidth: "50%", distributed: true },
          // },
          dataLabels: {
            enabled: true,
            formatter: (val, opts) =>
              `${val}% (${q.answers[opts.dataPointIndex].count})`,
            offsetY: -20, // bar ke upar thoda space
            style: {
              colors: ["#000"],
              fontSize: "12px",
              fontWeight: "semibold",
            },
            background: {
              enabled: false, // agar background nahi chahiye
            },
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "50%",
              distributed: true,
              dataLabels: {
                position: "top", // har bar ke upar label
              },
            },
          },
          xaxis: {
            categories: q.answers.map((a) => a.category),
            labels: {
              style: {
                fontSize: "12px",
                fontWeight: 400,
                whiteSpace: "pre-wrap", // pre-line se better wrap
                lineHeight: "14px", // thodi spacing line ke liye
              },
              rotate: 0, 
              trim: true, 
              formatter: function (val) {
                return val.split(" ").join("\n");
              },
            },
          },

          yaxis: {
            max: 100,
            title: { text: "Percentage of Votes" },
          },

          fill: {
            opacity: 1,
            colors: q.answers.map((a) => {
              if (a.color === "bg-green-500") return "#3C7D22";
              if (a.color === "bg-red-500") return "#FF0000";
              if (a.color === "bg-yellow-400") return "#FACC15";
              if (a.color === "bg-blue-400") return "#44B3E1";
              if (a.color === "bg-purple-400") return "#782170";
              return "#000";
            }),
          },
        };

        return (
          <div key={qIndex} className="w-full max-w-xl mb-12">
            <h2 className="text-lg font-semibold mb-4">
              {qIndex + 1}. {q.question}
            </h2>
            <ReactApexChart
              options={options}
              series={series}
              type="bar"
              height={350}
            />
          </div>
        );
      })}
    </div>
  );
}

export default PollDetail;
