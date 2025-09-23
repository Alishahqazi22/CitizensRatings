import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { FiThumbsDown, FiThumbsUp } from "react-icons/fi";
import { IoFlagOutline } from "react-icons/io5";
import { ErrorMessage, Form, Field, Formik } from "formik";
import { axiosInstance } from "../../Config/axiosInstance";

const colors = ["bg-orange-500", "bg-green-400", "bg-yellow-400"];
const textColors = ["text-orange-500", "text-green-500", "text-yellow-400"];

const renderStars = (rating, textColorClass) => {
  const totalStars = 5;
  return [...Array(totalStars)].map((_, i) => (
    <FaStar key={i} className={i < rating ? textColorClass : "text-gray-300"} />
  ));
};

const calculateOverallRating = (ratings) => {
  if (!ratings) return "0.0";
  const ratingKeys = Object.keys(ratings).filter(
    (key) => key !== "overallRating"
  );
  const total = ratingKeys.reduce((sum, key) => sum + Number(ratings[key]), 0);
  return (total / ratingKeys.length).toFixed(1);
};

function UserDetailPage() {
  const { id, category } = useParams();
  const [leader, setLeader] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showReportForm, setShowReportForm] = useState(false);

  async function getLeader() {
    try {
      setLoading(true);
      let response;

      if (category === "public_service") {
        response = await axiosInstance.get(`/public_service/${id}`);
      } else if (category === "executive") {
        response = await axiosInstance.get(`/executive/${id}`);
      } else if (category === "public_opinion") {
        response = await axiosInstance.get(`/public_opinion/${id}`);
      } else {
        response = await axiosInstance.get(`/category/${id}`);
      }
      console.log(response.data);
      setLeader(response?.data.category || null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getLeader();
  }, [id, category]);

  if (loading) {
    return <p className="text-center mt-32">Loading...</p>;
  }

  if (!leader) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-2xl font-bold text-gray-600">User not found</h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-28 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-2xl rounded-lg my-6 p-8 w-full max-w-[44rem] lg:max-w-4xl xl:max-w-6xl">
        <div className="flex justify-between">
          <div>
            <h1 className="text-3xl font-bold">{leader?.name || "NA"}</h1>
            <p className="py-2">
              {leader?.position || "NA"} | {leader?.district || "NA"} |{" "}
              {leader?.region || "NA"}
            </p>
          </div>
          <div className="flex space-x-2">
            <div className="inline-block p-[1px] bg-white rounded-lg">
              <Link to={`/gh/${leader.category}/${leader.id}/addratting`}>
                <button className="btn-primary px-6 bg-primary text-white flex">
                  Rate
                  <IoIosArrowRoundForward size={18} className="mt-1" />
                </button>
              </Link>
            </div>
            <Link to={`/gh/compare/${leader.category}/${leader.id}`}>
              <button className="btn-primary px-6 text-black border border-black">
                Compare
              </button>
            </Link>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 mt-6 items-center lg:items-start">
          <div className="w-full md:w-1/4 flex flex-col items-center">
            <div className="w-64 h-64 rounded-md overflow-hidden shadow">
              <img
                src={leader?.image || "NA"}
                alt={leader?.name || "NA"}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-4 text-center">
              <p className="text-5xl font-bold rounded py-3 bg-yellow-400">
                {calculateOverallRating(leader?.ratings || "NA")}
              </p>
              <h3 className="font-light">Overall Rating</h3>
            </div>
          </div>

          <div className="w-full md:w-2/1 mt-10">
            {leader.ratings ? (
              <ul className="grid grid-cols-2 gap-7">
                {Object.entries(leader?.ratings || {})
                  .filter(([key]) => key !== "overallRating")
                  .map(([key, value], index) => {
                    const randomColor = colors[index % colors.length];
                    return (
                      <li
                        key={key}
                        className="flex justify-between text-lg font-semibold pb-1"
                      >
                        <span className="capitalize">
                          {key.replace(/([A-Z])/g, " $1")}
                        </span>
                        <span
                          className={`font-bold rounded px-3 py-1 ${randomColor}`}
                        >
                          {Number(value).toFixed(1)}
                        </span>
                      </li>
                    );
                  })}
              </ul>
            ) : (
              <p>No Ratings available yet</p>
            )}
          </div>
        </div>

        <h1 className="text-2xl font-bold mt-8 mb-3">Top TAGS</h1>
        <div className="flex flex-wrap gap-2">
          {leader?.tag?.tags && leader?.tag?.tags.length > 0 ? (
            leader.tag.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-gray-200 px-3 py-1 text-sm font-light"
              >
                {tag}
              </span>
            ))
          ) : (
            <p className="text-gray-400 italic">No tags available</p>
          )}
        </div>

        <h1 className="text-xl font-bold mt-10">Ratings & Reviews</h1>
        <div className="bg-gray-100 rounded-lg flex items-center justify-center my-4 w-full">
          <div className="bg-white shadow-md rounded-lg p-8 mx-6 my-8 w-full">
            <div className="flex gap-4">
              <p className="text-2xl font-bold rounded-lg p-4 text-white bg-yellow-400">
                {calculateOverallRating(leader?.ratings || "NA")}
              </p>
              <p className="my-2 font-semibold">
                {leader?.reviews?.[0]?.comment || "No review yet"}
                <br />
                <span className="font-normal">
                  {leader?.reviews?.[0]?.date || "N/A"}
                </span>
              </p>
            </div>

            <div className="w-full md:w-2/1 mt-10">
              {leader.ratings ? (
                <ul className="grid grid-cols-2 gap-7">
                  {Object.entries(leader?.ratings || {})
                    .filter(([key]) => key !== "overallRating")
                    .map(([key, value], index) => {
                      const randomColor = textColors[index % textColors.length];
                      return (
                        <li key={key} className="text-md pb-1">
                          <span className="capitalize">
                            {key.replace(/([A-Z])/g, " $1")}
                          </span>
                          <span className="flex text-2xl">
                            {renderStars(
                              Math.round(Number(value)),
                              randomColor
                            )}
                          </span>
                        </li>
                      );
                    })}

                  {leader.questions ? (
                    leader.questions.map((q, idx) => (
                      <li key={idx} className="pb-1 text-gray-700">
                        <h3 className="capitalize">{q?.question}</h3>
                        <p className="font-bold">
                          Ans: {q?.answer ? q?.answer : "Not answered"}
                        </p>
                      </li>
                    ))
                  ) : (
                    <p>questions available yet</p>
                  )}
                </ul>
              ) : (
                <p>No Ratings available Yet</p>
              )}
            </div>
            <div className="flex items-center gap-6 mt-6 text-gray-600">
              <button className="flex items-center gap-2">
                <FiThumbsUp />
              </button>
              <button className="flex items-center gap-2 mt-1">
                <FiThumbsDown />
              </button>
              <button
                onClick={() => setShowReportForm(true)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <IoFlagOutline />
              </button>
            </div>
          </div>
        </div>
      </div>
      {showReportForm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold mb-4">
              You're reporting this comment.
            </h2>
            <p className="text-gray-600 mb-4">
              Please explain why you are reporting this review. Your report must
              be clear and within 350 words.
            </p>
            <Formik
              initialValues={{ report: "" }}
              validate={(values) => {
                const errors = {};
                if (!values.report) {
                  errors.report = "Report is required";
                } else if (values.report.trim().split(" ").length > 350) {
                  errors.report = "Report must be within 350 words!";
                }
                return errors;
              }}
              onSubmit={(values, { resetForm }) => {
                console.log("Report submitted:", values.report);
                setShowReportForm(false);
                resetForm();
              }}
            >
              {({ errors, touched }) => (
                <Form className="w-full">
                  <Field
                    as="textarea"
                    name="report"
                    placeholder="Write your report here..."
                    rows="4"
                    className={`w-full rounded px-3 py-2 bg-gray-100 ${
                      errors.report && touched.report
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  <span className="flex items-center gap-1 justify-end">
                    <ErrorMessage
                      name="report"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                    <p className="text-[.8rem]">0 / 350</p>{" "}
                  </span>

                  <div className="flex justify-center gap-4 mt-4">
                    <button
                      type="submit"
                      className="px-4 py-2 rounded bg-primary text-white"
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                      onClick={() => setShowReportForm(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDetailPage;
