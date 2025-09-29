import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { axiosInstance } from "../../Config/axiosInstance";
import { toast } from "react-toastify";
import GoogleAuthButton from "./GoogleAuthButton";

const SignUpSchema = Yup.object().shape({
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  image: Yup.mixed(),
  terms: Yup.boolean().oneOf([true], "You must accept the Terms"),
});

function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  // For verification popup
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState("");
  const [verifyCode, setVerifyCode] = useState("");

  const handleSignup = async (values, resetForm) => {
    const formData = new FormData();
    formData.append("role", "user");
    formData.append("first_name", values.first_name);
    formData.append("last_name", values.last_name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("password_confirmation", values.password_confirmation);
    formData.append("image", values.image);
    try {
      const response = await axiosInstance.post("signup", formData);

      if (response?.data?.status) {
        toast.success(response?.data?.message || "Signup successful!");
        setVerifyEmail(values.email);
        setShowVerifyModal(true);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/gh");
        resetForm();
      } else {
        toast.error(response?.data?.data?.message);
      }
    } catch (error) {
      console.error("Signup API error:", error);
      toast.error("Signup failed!");
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await axiosInstance.post("account/update/email", {
        email: verifyEmail,
        code: verifyCode,
      });

      if (response?.data?.status) {
        toast.success("Email verified successfully!");
        setShowVerifyModal(false);

        // Save token / user
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);

        navigate("/"); // redirect after login
      } else {
        toast.error(response?.data?.message || "Invalid code");
      }
    } catch (error) {
      console.error("Verify code error:", error);
      toast.error("Verification failed!");
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
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            password_confirmation: "",
            terms: false,
          }}
          validationSchema={SignUpSchema}
          onSubmit={handleSignup}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form className="space-y-4">
              {/* first_name */}
              <div>
                <label className="block text-sm font-medium">First Name</label>
                <Field
                  type="first_name"
                  name="first_name"
                  placeholder="Enter your First Name"
                  className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <ErrorMessage
                  name="first_name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* last_name */}
              <div>
                <label className="block text-sm font-medium">Last Name</label>
                <Field
                  type="last_name"
                  name="last_name"
                  placeholder="Enter your Last Name"
                  className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <ErrorMessage
                  name="last_name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Email */}
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
                    name="password_confirmation"
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
                  name="password_confirmation"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Image */}
              <div>
                <label className="block text-sm font-medium">Image</label>
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
          <Link to="/gh/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </div>

      {/* Verify Code */}
      {showVerifyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4">Verify Your Email</h2>
            <p className="text-sm text-gray-600 mb-2">
              Enter the code sent to <b>{verifyEmail}</b>
            </p>
            <input
              type="text"
              value={verifyCode}
              onChange={(e) => setVerifyCode(e.target.value)}
              placeholder="Enter verification code"
              className="w-full border p-2 rounded mb-3"
            />
            <div className="flex gap-3">
              <button
                onClick={handleVerifyCode}
                className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Verify
              </button>
              <button
                onClick={() => setShowVerifyModal(false)}
                className="flex-1 bg-gray-300 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignUp;
