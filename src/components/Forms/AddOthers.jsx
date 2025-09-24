import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import AddPageHeroSection from "../AddPage/AddPageHeroSection";
import AddOthersImg from "../../assets/AddPageAssets/add_others.jpg";
import { axiosInstance } from "../../Config/axiosInstance";
import { Link } from "react-router-dom";

const validationSchema = Yup.object({
  category_id: Yup.string().required("Category is required"),
  name: Yup.string().required("Name is required"),
  image: Yup.mixed(),
  description: Yup.string().required("Years in service is required"),
  type: Yup.string().required("type is required"),
  agree: Yup.boolean().oneOf([true], "You must agree before submitting"),
});

function AddOthers() {
  //   const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [categories, setCategories] = useState([]);

  // fetchCategories
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axiosInstance.get("/category");
        setCategories(response?.data?.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    // if (!recaptchaToken) {
    //   alert("Please verify reCAPTCHA before submitting.");
    //   return;
    // }

    try {
      const formData = new FormData();

      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      const response = await axiosInstance.post("/other", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Form submitted successfully:", response.data);
      alert("Form submitted successfully!");

      //   setRecaptchaToken(null);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong!");
    } finally {
      resetForm();
    }
  };

  return (
    <div>
      <AddPageHeroSection title="Add Others" />

      <div className="mt-28 max-w-4xl md:px-10 mx-auto p-8 flex flex-col items-center">
        <img
          src={AddOthersImg}
          alt="image"
          className="w-full max-w-3xl object-cover rounded-sm mb-8"
        />
        <h1 className="text-center text-2xl md:text-4xl py-4 md:p-10 font-bold text-[#202E3B]">
          Provide The Details Of The Others You Want To Add.
        </h1>

        <Formik
          initialValues={{
            category_id: "",
            name: "",
            image: "",
            description: "",
            type: "",
            agree: false,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="w-full space-y-6">
              {/* Category */}
              <div>
                <Field
                  as="select"
                  name="category_id"
                  className="w-full border border-primary rounded p-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select Category*</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="category_id"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Name */}
              <div>
                <Field
                  name="name"
                  placeholder="Name*"
                  className="w-full border border-primary rounded p-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* image */}
              <div>
                <Field
                  name="image"
                  type="file"
                  placeholder="image*"
                  className="w-full border border-primary rounded p-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="image"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Years in Service */}
              <div>
                <Field
                  name="description"
                  placeholder="Years in Service*"
                  className="w-full border border-primary rounded p-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* type */}
              <div>
                <Field
                  name="type"
                  placeholder="type*"
                  className="w-full border border-primary rounded p-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="type"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* ReCAPTCHA */}
              <div className="flex justify-center">
                <ReCAPTCHA
                  sitekey="6Lf_wc4rAAAAAE4BSLR2pFTJ3bWujLqkxAI3mZrg"
                  //   onChange={(token) => setRecaptchaToken(token)}
                />
              </div>
              
              {/* Agree Checkbox */}
              <div className="flex items-center justify-center space-x-2 font-semibold text-[#202E3B]">
                <Field type="checkbox" name="agree" className="h-4 w-4" />
                <div className="flex flex-col">
                  <span className="text-sm">
                    *I agree to the{" "}
                    <Link to="/gh" className="text-green-600 hover:underline">
                      Terms of Use
                    </Link>
                    ,{" "}
                    <Link to="/gh" className="text-green-600 hover:underline">
                      Privacy Policy
                    </Link>
                    ,{" "}
                    <Link to="/gh" className="text-green-600 hover:underline">
                      Site guidelines
                    </Link>{" "}
                    and{" "}
                    <Link to="/gh" className="text-green-600 hover:underline">
                      Code of conduct
                    </Link>
                  </span>
                  <ErrorMessage
                    name="agree"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary text-white px-8 py-3 rounded font-medium hover:bg-white hover:text-primary hover:border hover:border-primary transition-colors duration-200"
                >
                  {isSubmitting ? "Submitting..." : "Submit Form"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AddOthers;
