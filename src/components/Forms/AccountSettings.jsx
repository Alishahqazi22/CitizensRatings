import React, { useState } from "react";
import { axiosInstance } from "../../Config/axiosInstance";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { RiPencilFill } from "react-icons/ri";
import { toast } from "react-toastify";

function AccountSettings() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [email, setEmail] = useState(user?.email || "");
  const [newEmail, setNewEmail] = useState(user?.email || "");
  const [isEditing, setIsEditing] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  const handleEdit = async () => {
    try {
      const response = await axiosInstance.post(
        "/profile/update",
        {
          email: newEmail,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Verification code sent:", response.data);
      toast.success(response?.data?.message);

      if (response?.data) {
        setVerificationSent(true);
        setIsEditing(true);
      }
    } catch (error) {
      console.error("Failed to send verification email:", error);
      toast.error(
        error.response?.data?.message || "Verification email not sent"
      );
    }
  };

  const handleVerify = async (code) => {
    try {
      const response = await axiosInstance.post(
        "/profile/update",
        {
          email: newEmail,
          code: code,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Verify Response:", response?.data);
      toast.success(response?.data?.message);

      if (response?.data) {
        setEmail(newEmail || email);
        setIsEditing(false);
        setVerificationSent(false);
        setNewEmail("");
      } else {
        toast.error("Invalid or expired verification code");
      }
    } catch (error) {
      console.error("Verification failed:", error);
      toast.error(error.response?.data?.message || "Verification failed");
    }
  };

  return (
    <div className="font-medium text-sm max-w-4xl mx-auto mb-10">
      {/* Edit Button */}
      {!isEditing && (
        <div className="flex justify-end mt-4">
          <button
            onClick={handleEdit}
            className="flex items-center hover:underline"
          >
            <RiPencilFill size={15} />
            Edit
          </button>
        </div>
      )}

      {/* Email Row */}
      <div className="flex justify-between max-w-xl items-center py-2">
        <p>Email</p>
        <p className="font-normal">{email}</p>
      </div>

      {/* Password Row */}
      <div className="flex justify-between max-w-xl items-center py-2">
        <p className="font-medium">Password</p>
      </div>

      {/* Popup for code Verification */}
      {isEditing && verificationSent && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white px-8 py-6 rounded-lg shadow-lg w-full max-w-lg flex flex-col items-center justify-center">
            <h2 className="text-3xl font-semibold mb-6 text-center px-4 leading-normal">
              Please check your email and enter the verification code.
            </h2>
            <Formik
              initialValues={{ code: "" }}
              validate={(values) => {
                const errors = {};
                if (!values.code) {
                  errors.code = "Verification code is required";
                } else if (!/^\d{5}$/.test(values.code)) {
                  errors.code = "Code must be 5 digits";
                }
                return errors;
              }}
              onSubmit={async (values, { resetForm }) => {
                await handleVerify(values.code);
                resetForm();
              }}
            >
              {({ errors, touched }) => (
                <Form className="w-full">
                  <Field
                    name="code"
                    type="text"
                    placeholder="Enter verification code"
                    className={`w-full rounded p-3 border ${
                      errors.code && touched.code
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  <ErrorMessage
                    name="code"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />

                  <div className="flex justify-center gap-3 mt-4">
                    <button
                      type="submit"
                      className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      Verify
                    </button>
                    <button
                      type="button"
                      onClick={handleEdit}
                      className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
                    >
                      Resend Code
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 rounded text-white bg-gray-500 hover:bg-gray-600"
                      onClick={() => setIsEditing(false)}
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

export default AccountSettings;
