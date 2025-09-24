import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../Config/axiosInstance";

function PollCriteria() {
  const { id } = useParams();
  const [criteriaData, setCriteriaData] = useState(null);
  const [answers, setAnswers] = useState({}); 

  const getCriteria = async () => {
    try {
      const res = await axiosInstance.get(`/rating-criterion`);
      const first = res?.data?.data || null;
      console.log("Criteria Data:", first);
      setCriteriaData(first);
    } catch (error) {
      console.error("Error fetching criteria:", error);
    }
  };

  useEffect(() => {
    getCriteria();
  }, [id]);

  const handleOptionChange = (questionId, optionId) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      
      {/* Criteria Title */}
      <h1 className="text-2xl font-bold mb-6 text-center">
        {criteriaData?.name || "Loading..."}
      </h1>

      {/* Questions + Options */}
      {criteriaData?.criteria?.map((q) => (
        <div
          key={q.id}
          className="mb-6 p-4 border rounded-lg shadow-sm bg-white"
        >
          {/* Question */}
          <h2 className="text-lg font-semibold mb-3">{q.title}</h2>

          {/* Radio Options */}
          <div className="flex flex-col gap-2">
            {q.option?.map((opt) => (
              <label
                key={opt.id}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name={`question-${q.id}`}
                  value={opt.id}
                  checked={answers[q.id] === opt.id}
                  onChange={() => handleOptionChange(q.id, opt.id)}
                  className="h-4 w-4 text-blue-600"
                />
                <span>{opt.value}</span>
              </label>
            ))}
          </div>
        </div>
      ))}

      {/* Debug - Selected Answers */}
      {/* <pre className="mt-6 bg-gray-100 p-4 rounded text-sm">
        {JSON.stringify(answers, null, 2)}
      </pre> */}
    </div>
  );
}

export default PollCriteria;
