import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { axiosInstance } from "../../Config/axiosInstance";
import { toast } from "react-toastify";
import GoogleAuthButton from "./GoogleAuthButton";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be 6 characters minimum")
    .required("Password is required"),
  terms: Yup.boolean().oneOf([true], "You must accept the Terms"),
});

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailLogin = async (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append("role", "user");
    formData.append("email", values.email);
    formData.append("password", values.password);
    try {
      const response = await axiosInstance.post("login", formData);
      if (response?.data?.data?.status) {
        localStorage.setItem("accessToken", response?.data?.data?.accessToken);
        localStorage.setItem(
          "user",
          JSON.stringify(response?.data?.data?.user)
        );
        toast.success(response?.data?.data?.message);
        window.location.href = "/";
      } else {
        toast.error(response?.data?.data?.message);
      }
    } catch (err) {
      console.error(err);
    }
    setSubmitting(false);
  };

  return (
    <div className="flex justify-center mt-28 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-md rounded-lg my-12 p-8 size-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>

        <GoogleAuthButton />

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500 text-sm">
            Or Login with Email
          </span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <Formik
          initialValues={{ email: "", password: "", terms: false }}
          validationSchema={LoginSchema}
          onSubmit={handleEmailLogin}
        >
          {({ isSubmitting, values }) => (
            <Form className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium">Email</label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter your Email"
                  className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-200"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
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
                  className="text-red-500 text-sm"
                />
                <Link
                  to="/forgot-password"
                  className="text-primary text-end text-sm block mt-1"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Terms */}
              <div className="flex items-start text-gray-600">
                <Field type="checkbox" name="terms" className="mr-2 mt-2" />
                <span>
                  I agree to the{" "}
                  <Link to="/" className="text-primary underline">
                    Terms of Use
                  </Link>{" "}
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
              </div>
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
                    ? "bg-primary cursor-pointer"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </button>
            </Form>
          )}
        </Formik>

        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
