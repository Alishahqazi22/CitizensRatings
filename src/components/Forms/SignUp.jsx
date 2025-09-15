import React, { useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import AuthContext from "../../context/AuthContext";
import axios from "axios";

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  terms: Yup.boolean().oneOf([true], "You must accept the Terms"),
});

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { loginWithGoogle } = useContext(AuthContext);

  const handleSignup = async (values) => {
  const userData = {
    email: values.email,
    password: values.password,
  };

  localStorage.setItem("userData", JSON.stringify(userData));

  try {
    await axios.post("http://localhost:5000/api/users/signup", userData);
  } catch (error) {
    console.error("Signup API error:", error);
  }
};


  const handleGoogleSignUp = async () => {
    try {
      const userCredential = await loginWithGoogle();
      const user = userCredential.user;

      const userData = {
        uid: user.uid,
        email: user.email,
        createdAt: new Date().toISOString(),
        provider: "google",
      };

      localStorage.setItem("userData", JSON.stringify(userData));
      await axios.post("http://localhost:5173/api/users", userData);

      alert("Signed up with Google!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex justify-center min-h-screen mt-28 bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg my-10 p-8 size-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Create an Account
        </h1>

        {/* Google SignUp */}
        <button
          onClick={handleGoogleSignUp}
          className="w-full flex items-center justify-center gap-2 border py-2 rounded font-bold"
        >
          <FcGoogle size={28} />
          Sign up with Google
        </button>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500 text-sm">
            Or Sign up with Email
          </span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <Formik
          initialValues={{
            email: "",
            password: "",
            confirmPassword: "",
            terms: false,
          }}
          validationSchema={SignUpSchema}
          onSubmit={handleSignup}
        >
          {({ isSubmitting, values }) => (
            <Form className="space-y-4">
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
