import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { FaStar } from "react-icons/fa";
import { axiosInstance } from "../../Config/axiosInstance";
import Login from "./Login";

function AddRatingPage() {
  const { id, category } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // fatch User
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(`/category`);
        const data = response?.data?.data || [];

        const foundUser = data.find((item) => item.id === Number(id));
        console.log(foundUser);

        setUser(foundUser || null);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, category]);

  const [selectedTags, setSelectedTags] = useState([]);
  if (loading) {
    return <p className="text-center mt-28">Loading...</p>;
  }

  if (!user) {
    return <p className="text-center text-red-500 mt-20">User not found</p>;
  }

  const tagOptions = [
    "Promotes Peace and Unity",
    "Protects Cultural Heritage",
    "Resolves Conflicts Fairly",
    "Active in Community Development",
    "Advocates for Youth and Women",
    "Politically Biased",
    "Disconnected from the People",
    "Involved in Land Disputes",
    "Fails to Address Community Needs",
    "Shields Abuses of Power",
  ];

  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      if (selectedTags.length < 5) {
        setSelectedTags([...selectedTags, tag]);
      } else {
        alert("You can select maximum 5 tags only!");
      }
    }
  };

  const StarRating = ({ fieldName, value, setFieldValue }) => {
    const totalStars = 5;
    const starColors = [
      "text-red-400",
      "text-orange-400",
      "text-yellow-400",
      "text-lime-400",
      "text-green-400",
    ];
    const [hoverStar, setHoverStar] = useState(null);

    return (
      <div className="flex gap-1">
        {[...Array(totalStars)].map((_, i) => {
          const starValue = i + 1;

          const isActive = starValue <= value;
          const isHovered = starValue === hoverStar;

          return (
            <FaStar
              key={i}
              size={32}
              className={`cursor-pointer transition-colors duration-200 ${
                isHovered
                  ? starColors[i]
                  : isActive
                  ? starColors[i]
                  : "text-gray-300"
              }`}
              onClick={() => setFieldValue(fieldName, starValue)}
              onMouseEnter={() => setHoverStar(starValue)}
              onMouseLeave={() => setHoverStar(null)}
            />
          );
        })}
      </div>
    );
  };

  const initialValues = {
    ratings: {
      overallRating: user?.ratings?.overallRating || 0,
      vision: user?.ratings?.vision || 0,
      policyImplementation: user?.ratings?.policyImplementation || 0,
      accountability: user?.ratings?.accountability || 0,
      responsiveness: user?.ratings?.responsiveness || 0,
      resourceManagement: user?.ratings?.resourceManagement || 0,
      stakeholderEngagement: user?.ratings?.stakeholderEngagement || 0,
      nationalDevelopment: user?.ratings?.nationalDevelopment || 0,
      antiCorruption: user?.ratings?.antiCorruption || 0,
      antiGalamsey: user?.ratings?.antiGalamsey || 0,
      overallPerformance: user?.ratings?.overallPerformance || 0,
    },
    questions: {},
    review: {
      comment: "",
    },
  };

  const handleSubmit = async (values) => {
    if (!user) {
      alert("User data not loaded yet!");
      return;
    }

    if (selectedTags.length < 3) {
      alert("Please select at least 3 tags.");
      return;
    }

    const newRating = Number(values.review.rating);
    const oldRatings = user?.ratings?.allRatings || [];
    const updatedRatings = [...oldRatings, newRating];
    const avgRating =
      updatedRatings.reduce((a, b) => a + b, 0) / updatedRatings.length;

    const updatedUser = {
      ...user,
      ratings: {
        overallRating: avgRating.toFixed(1),
        count: updatedRatings.length,
        allRatings: updatedRatings,
      },
      reviews: [
        ...(user?.reviews || []),
        {
          reviewer: values.review.reviewer || "Anonymous",
          rating: newRating,
          comment: values.review.comment,
          date: new Date().toISOString().split("T")[0],
        },
      ],
      tags: [...selectedTags],
    };

    try {
      localStorage.setItem("updatedUsers", JSON.stringify(updatedUser));

      await axiosInstance.post(`/category/${category}/${id}`, updatedUser);
      alert("Rating, Review & Tags successfully added!");
      navigate(-1);
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Something went wrong while submitting!");
    }
  };

  if (!user) {
    return <Login />; 
  }

  return (
    <div className="min-h-screen bg-white py-10 mt-20 sm:mt-28">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Rate {user.name}
        </h1>

        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ values, setFieldValue }) => (
            <Form className="space-y-8">
              {/* Ratings */}
              <section>
                <div className="grid grid-cols-1">
                  {Object.keys(values.ratings).map((key) => (
                    <div
                      key={key}
                      className="flex flex-col items-center justify-center bg-white shadow-lg my-3 rounded-lg p-4 w-full"
                    >
                      <label className="capitalize font-medium mb-1">
                        {key.replace(/([A-Z])/g, " $1")}
                        <span className="text-red-400"> *</span>
                      </label>
                      <StarRating
                        fieldName={`ratings.${key}`}
                        value={values.ratings[key]}
                        setFieldValue={setFieldValue}
                      />
                      <p className="mt-2">1 - Awful | 5 - Awesome</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Questions */}
              <section>
                <h2 className="text-lg font-semibold mb-4">Questions</h2>

                {user.category_details?.[0]?.rating_criteria?.criteria?.map(
                  (q) => (
                    <div key={q.id} className="mb-6">
                      <label className="block text-sm font-medium mb-1">
                        {q.title}
                      </label>

                      <div className="flex gap-4 flex-wrap">
                        {q.option?.map((opt, i) => (
                          <label key={i} className="flex items-center gap-2">
                            <Field
                              type="radio"
                              name={`questions.${q.id}`} 
                              value={opt.value}
                            />
                            <span style={{ color: opt.color }}>
                              {opt.option}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </section>

              {/* Tags */}
              <section>
                <div className="py-6">
                  <h2 className="text-lg font-semibold mb-4">
                    Select Tags (Min 3 - Max 5)
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {tagOptions.map((tag) => (
                      <button
                        type="button"
                        key={tag}
                        onClick={() => handleTagClick(tag)}
                        className={`px-3 py-2 rounded-lg border text-sm 
                          ${
                            selectedTags.includes(tag)
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 text-gray-800"
                          }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </section>

              {/* Review */}
              <section>
                <h2 className="font-bold mb-4">Write a Review</h2>
                <p className="ms-2 text-lg my-1">
                  Discuss your personal experience with this individual,
                  institution, product, or service. What’s great about it? What
                  could be improved?
                </p>
                <h2 className="font-bold flex items-center gap-2">
                  <span className="size-7 text-xl font-serif bg-black rounded-full text-white flex items-center justify-center">
                    i
                  </span>
                  Attention: Read before you Write!
                </h2>
                <ul className="custom-star">
                  <li className="ms-2 my-1">
                    Your rating may be removed if it contains profanity, hate
                    speech, derogatory terms, personal attacks, defamation,
                    threats, intimidation, false accusations, or inappropriate
                    sarcasm.
                  </li>
                  <li className="ms-2 my-1">
                    To make your comments more constructive, consider referring
                    to the rating categories.
                  </li>
                  <li className="ms-2 my-1">
                    As always, don’t forget to proofread!
                  </li>
                </ul>
                <h2 className="font-bold mb-1 flex items-center">
                  View our code of
                  <Link to="/">
                    <span className="underline mx-1"> conduct</span>
                  </Link>
                  and
                  <Link to="/">
                    <span className="underline mx-1">site guidlines</span>
                  </Link>
                </h2>

                <div>
                  <label className="block text-sm font-medium">Review</label>
                  <Field
                    as="textarea"
                    name="review.comment"
                    rows="4"
                    placeholder="Enter your review"
                    className="border-2 border-black p-2 rounded w-full focus:outline-none"
                  />
                </div>
              </section>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-primary w-full text-white py-3 rounded-lg"
                >
                  Submit Rating
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AddRatingPage;
