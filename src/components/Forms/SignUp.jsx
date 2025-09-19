import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { axiosInstance } from "../../Config/axiosInstance";
import { toast } from "react-toastify";
import GoogleAuthButton from "./GoogleAuthButton";

const SignUpSchema = Yup.object().shape({
  firstname: Yup.string().required("First Name is required"),
  lastname: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  image: Yup.mixed(),
  terms: Yup.boolean().oneOf([true], "You must accept the Terms"),
});

function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSignup = async (values) => {
    const formData = new FormData();
    formData.append("role", "user");
    formData.append("first_name", values.firstname);
    formData.append("last_name", values.lastname);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("password_confirmation", values.confirmPassword);
    formData.append("image", values.image);
    try {
      const response = await axiosInstance.post("signup", formData);
      if (response?.data?.data?.status) {
        toast.success(response?.data?.data?.message);
        navigate("/login");
      } else {
        toast.error(response?.data?.data?.message);
      }
    } catch (error) {
      console.error("Signup API error:", error);
    }
  };

  return (
    <div className="flex justify-center min-h-screen mt-28 bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg my-10 p-8 size-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Create an Account
        </h1>

        <GoogleAuthButton />

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500 text-sm">
            Or Sign up with Email
          </span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <Formik
          initialValues={{
            fisrtname: "",
            lastname: "",
            email: "",
            password: "",
            confirmPassword: "",
            terms: false,
          }}
          validationSchema={SignUpSchema}
          onSubmit={handleSignup}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium">First Name</label>
                <Field
                  type="firstname"
                  name="firstname"
                  placeholder="Enter your First Name"
                  className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <ErrorMessage
                  name="firstname"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Last Name</label>
                <Field
                  type="lastname"
                  name="lastname"
                  placeholder="Enter your Last Name"
                  className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <ErrorMessage
                  name="lastname"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium">Password</label>
                <div className="relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <span
                    className="absolute right-3 top-3 cursor-pointer text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium">
                  Confirm Password
                </label>
                <div className="relative">
                  <Field
                    type={showConfirm ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <span
                    className="absolute right-3 top-3 cursor-pointer text-gray-500"
                    onClick={() => setShowConfirm(!showConfirm)}
                  >
                    {showConfirm ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="file"
                  name="image"
                  onChange={(e) => setFieldValue("image", e.target.files[0])}
                  className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <ErrorMessage
                  name="image"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Terms */}
              <label className="flex items-start text-sm font-light">
                <Field type="checkbox" name="terms" className="mr-2 mt-1" />
                <span>
                  I agree to the{" "}
                  <Link to="/" className="text-primary underline">
                    Terms of Use
                  </Link>
                  ,{" "}
                  <Link to="/" className="text-primary underline">
                    Privacy Policy
                  </Link>{" "}
                  ,{" "}
                  <Link to="/" className="text-primary underline">
                    Site guidlines
                  </Link>{" "}
                  and{" "}
                  <Link to="/" className="text-primary underline">
                    Code of Conduct
                  </Link>
                </span>
              </label>
              <ErrorMessage
                name="terms"
                component="div"
                className="text-red-500 text-sm mt-1"
              />

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting || !values.terms}
                className={`w-full text-white py-3 rounded-md transition ${
                  values.terms
                    ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? "Signing Up..." : "Sign Up"}
              </button>
            </Form>
          )}
        </Formik>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
