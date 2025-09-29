import React, { useState } from "react";
import { axiosInstance } from "../../Config/axiosInstance";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { RiPencilFill } from "react-icons/ri";
import { toast } from "react-toastify";

function AccountSettings() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [email, setEmail] = useState(user?.email || "");
  const [newEmail, setNewEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  const handleSendCode = async () => {
    if (!newEmail || newEmail === email) {
      toast.error("Please enter a new different email");
      return;
    }
    try {
      const response = await axiosInstance.post(
        "/account/update/email",
        { email: newEmail },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success(response?.data?.message);

      if (response?.data) {
        setVerificationSent(true); // move to verification stage
      }
    } catch (error) {
      console.error("Failed to send verification email:", error);
      toast.error(error.response?.data?.message || "Verification email not sent");
    }
  };

  // Step 2: Verify code and update email
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

      toast.success(response?.data?.message);

      if (response?.data) {
        setEmail(newEmail); // ✅ Update email
        setIsEditing(false); // close popup
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
      <div className="flex justify-end mt-4">
        <button
          onClick={() => setIsEditing(true)}
          className="flex items-center hover:underline"
        >
          <RiPencilFill size={15} />
          Edit
        </button>
      </div>

      {/* Email Row */}
      <div className="flex justify-between max-w-xl items-center py-2">
        <p>Email</p>
        <p className="font-normal">{email}</p>
      </div>

      {/* Password Row */}
      <div className="flex justify-between max-w-xl items-center py-2">
        <p className="font-medium">Password</p>
      </div>

      {/* Popup Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white px-8 py-6 rounded-lg shadow-lg w-full max-w-lg flex flex-col items-center justify-center">
            {!verificationSent ? (
              // Stage 1: Enter new email
              <>
                <h2 className="text-2xl font-semibold mb-6 text-center">
                  Enter new email to update your account
                </h2>
                <input
                  type="email"
                  placeholder="Enter new email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="border rounded p-3 w-full"
                />
                <div className="flex justify-center gap-3 mt-4">
                  <button
                    onClick={handleSendCode}
                    className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    Send Code
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 rounded text-white bg-gray-500 hover:bg-gray-600"
                    onClick={() => {
                      setIsEditing(false);
                      setNewEmail(email);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              // Stage 2: Verify code
              <>
                <h2 className="text-2xl font-semibold mb-6 text-center">
                  Please check your email and enter the verification code.
                </h2>
                <Formik
                  initialValues={{ code: "" }}
                  validate={(values) => {
                    const errors = {};
                    if (!values.code) {
                      errors.code = "Verification code is required";
                    } else if (!/^\d+$/.test(values.code)) {
                      errors.code = "Code must be digits only";
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
                          onClick={handleSendCode}
                          className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
                        >
                          Resend Code
                        </button>
                        <button
                          type="button"
                          className="px-4 py-2 rounded text-white bg-gray-500 hover:bg-gray-600"
                          onClick={() => {
                            setVerificationSent(false);
                            setIsEditing(false);
                            setNewEmail(email);
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AccountSettings;
