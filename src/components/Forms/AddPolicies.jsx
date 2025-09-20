import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import AddPageHeroSection from "../AddPage/AddPageHeroSection";
import AddPoliciesImg from "../../assets/AddPageAssets/add_policies.jpg";
import { axiosInstance } from "../../Config/axiosInstance";

const validationSchema = Yup.object({
  category_id: Yup.string().required("Category is required"),
  name: Yup.string().required("Name is required"),
  position: Yup.string().required("Position is required"),
  years_in_service: Yup.string().required("Years in service is required"),
  hometown: Yup.string().required("Hometown is required"),
  highest_education: Yup.string().required("Education is required"),
  dob: Yup.string().required("Date of Birth is required"),
  profession: Yup.string().required("Profession is required"),
  party_affiliation: Yup.string().required("Party Affiliation is required"),
  religion: Yup.string().required("Religion is required"),
  agree: Yup.boolean().oneOf([true], "You must agree before submitting"),
});

function AddPolicies() {
  //   const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [categories, setCategories] = useState([]);

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

      const response = await axiosInstance.post("/category", formData, {
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
      <AddPageHeroSection title="Add Policies" />

      <div className="mt-28 max-w-4xl md:px-10 mx-auto p-8 flex flex-col items-center">
        <img
          src={AddPoliciesImg}
          alt="image"
          className="w-full max-w-3xl object-cover rounded-sm mb-8"
        />
        <h1 className="text-center text-2xl md:text-4xl py-4 md:p-10 font-bold text-[#202E3B]">
          Provide The Details Of The Policies You Want To Add.
        </h1>

        <Formik
          initialValues={{
            category_id: "",
            name: "",
            position: "",
            years_in_service: "",
            hometown: "",
            highest_education: "",
            dob: "",
            profession: "",
            party_affiliation: "",
            religion: "",
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

              {/* Position */}
              <div>
                <Field
                  name="position"
                  placeholder="Position*"
                  className="w-full border border-primary rounded p-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="position"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Years in Service */}
              <div>
                <Field
                  name="years_in_service"
                  placeholder="Years in Service*"
                  className="w-full border border-primary rounded p-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="years_in_service"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Hometown */}
              <div>
                <Field
                  name="hometown"
                  placeholder="Hometown*"
                  className="w-full border border-primary rounded p-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="hometown"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Education */}
              <div>
                <Field
                  name="highest_education"
                  placeholder="Highest Education*"
                  className="w-full border border-primary rounded p-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="highest_education"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* DOB */}
              <div>
                <Field
                  type="date"
                  name="dob"
                  placeholder="Date of Birth*"
                  className="w-full border border-primary rounded p-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="dob"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Profession */}
              <div>
                <Field
                  name="profession"
                  placeholder="Profession*"
                  className="w-full border border-primary rounded p-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="profession"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Party Affiliation */}
              <div>
                <Field
                  name="party_affiliation"
                  placeholder="Party Affiliation*"
                  className="w-full border border-primary rounded p-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="party_affiliation"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Religion */}
              <div>
                <Field
                  name="religion"
                  placeholder="Religion*"
                  className="w-full border border-primary rounded p-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="religion"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

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
                    <a href="#" className="text-green-600 hover:underline">
                      Terms of Use
                    </a>
                    ,{" "}
                    <a href="#" className="text-green-600 hover:underline">
                      Privacy Policy
                    </a>
                    ,{" "}
                    <a href="#" className="text-green-600 hover:underline">
                      Site guidelines
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-green-600 hover:underline">
                      Code of conduct
                    </a>
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

export default AddPolicies;
