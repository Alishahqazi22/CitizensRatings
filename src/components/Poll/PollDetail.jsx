import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import { axiosInstance } from "../../Config/axiosInstance";

function PollDetail() {
  const { id } = useParams();
  const [poll, setpoll] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getPoll() {
    try {
      const response = await axiosInstance.get(`/poll/${id}`);
      const apiPoll = response?.data?.poll;
      console.log("Poll Detail API Response:", apiPoll);
      setpoll(apiPoll || null);
    } catch (error) {
      console.log("Poll detail fetch error:", error);
      setpoll(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getPoll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return (
      <div className="mt-28 text-center">
        <h1 className="text-lg font-medium">Loading poll details...</h1>
      </div>
    );
  }

  if (!poll) {
    return (
      <div className="mt-28 text-center">
        <h1 className="text-3xl font-semibold">Poll Not Found</h1>
        <Link to="/gh/poll" className="text-blue-500 underline mt-4 block">
          Go Back
        </Link>
      </div>
    );
  }

  const DEFAULT_COLORS = [
    "#3C7D22",
    "#FF0000",
    "#FACC15",
    "#44B3E1",
    "#782170",
    "#000000",
  ];

  return (
    <div className="mt-28 max-w-4xl mx-auto p-8 flex flex-col items-center">
      <h1 className="uppercase text-2xl font-bold mb-6 text-center">
        {poll.name}
      </h1>

      {poll.image && (
        <img
          src={poll.image}
          alt={poll.name}
          className="w-full max-w-md h-64 object-cover rounded-sm mb-8 brightness-90"
        />
      )}

      {/* Poll render */}
      {poll.votes_counts && poll.votes_counts.length > 0 ? (
        poll.votes_counts.map((q, index) => {
          const rawValues = Object.values(q || {}).map((v) => Number(v) || 0);
          const totalVotes = rawValues.reduce((a, b) => a + b, 0);

          const answers = Object.entries(q || {})
            .filter(([key]) => key !== "question_id" && key !== "name")
            .map(([key, value]) => {
              const numeric = Number(value) || 0;
              const percentage =
                totalVotes > 0 ? (numeric / totalVotes) * 100 : 0;
              return { category: key, count: numeric, percentage };
            });

          const seriesData = answers.map((a) =>
            Number.isFinite(a.percentage) ? Number(a.percentage.toFixed(2)) : 0
          );

          const fillColors = answers.map(
            (_, i) =>
              DEFAULT_COLORS[i] ?? DEFAULT_COLORS[DEFAULT_COLORS.length - 1]
          );

          const series = [{ name: "Votes (%)", data: seriesData }];

          const options = {
            chart: { type: "bar", height: 350 },
            noData: { text: "No data to display" },
            dataLabels: {
              enabled: true,
              formatter: (val, opts) =>
                `${val}% (${answers[opts.dataPointIndex].count})`,
              offsetY: -20,
              style: { colors: ["#000"], fontSize: "12px", fontWeight: "600" },
              background: { enabled: false },
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: "50%",
                distributed: true,
                dataLabels: { position: "top" },
              },
            },
            xaxis: {
              categories: answers.map((a) => a.category),
              labels: {
                show: false,
                style: {
                  fontSize: "12px",
                  fontWeight: 400,
                },
                rotate: 0,
                formatter: function (val) {
                  return val.replace(/ /g, "\n");
                },
              },
            },
            legend: {
              show: true,
            },

            yaxis: { max: 100, title: { text: "Percentage of Votes" } },
            fill: { opacity: 1, colors: fillColors },
          };

          return (
            <div key={index} className="w-full max-w-xl mb-12">
              <h2 className="text-lg font-semibold mb-4">
                {index + 1}. {q.name}
              </h2>
              <ReactApexChart
                options={options}
                series={series}
                type="bar"
                height={350}
              />
            </div>
          );
        })
      ) : (
        <p className="text-gray-500 text-center">
          No poll results available yet.
        </p>
      )}
    </div>
  );
}

export default PollDetail;
