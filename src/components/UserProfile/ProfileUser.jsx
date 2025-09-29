import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AccountSettings from "../Forms/AccountSettings";
import SavedCard from "./SavedCard";
import { toast } from "react-toastify";
import { axiosInstance } from "../../Config/axiosInstance";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Login from "../Forms/Login";

function ProfileUser() {
  const [activeTab, setActiveTab] = useState("Profile");
  const user = JSON.parse(localStorage.getItem("user"));
  const [savedUsers, setSavedUsers] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const savedAcademicRatings = savedUsers.filter(
    (u) => u.type === "academic" && u.ratings && u.reviews
  );

  const savedNonAcademicRatings = savedUsers.filter(
    (u) => u.type === "nonAcademic" && u.ratings && u.reviews
  );

  const savedAcademic = savedUsers.filter(
    (u) => u.type === "academic" && (!u.ratings || !u.reviews)
  );

  const savedNonAcademic = savedUsers.filter(
    (u) => u.type === "nonAcademic" && (!u.ratings || !u.reviews)
  );

  useEffect(() => {
    if (user?.id) {
      const saved =
        JSON.parse(localStorage.getItem(`savedUsers_${user.id}`)) || [];
      setSavedUsers(saved);
      console.log("saved user for this user", saved);
    } else {
      setSavedUsers([]);
    }
  }, [user?.id]);

  const handleUpdateSaved = (updated) => {
    setSavedUsers(updated);
    if (user?.id) {
      localStorage.setItem(`saved_${user?.id}`, JSON.stringify(updated));
    }
  };

  const tabs = [
    "Profile",
    "Account Settings",
    "Ratings Academic",
    "Ratings Non Academic",
    "Saved Academic",
    "Saved Non Academic",
  ];

  const initialValues = {
    hometown_region: user?.hometown_region || "",
    current_region: user?.current_region || "",
    year_birth: user?.year_birth || "",
    school: user?.school || "",
    secondary_school: user?.secondary_school || "",
    tertiary_school: user?.tertiary_school || "",
    study_field: user?.study_field || "",
    expected_year_graduation: user?.expected_year_graduation || "",
    email: user?.email || "",
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    given_name: user?.given_name || "",
    family_name: user?.family_name || "",
    password: user?.password || "",
    phone: user?.phone || "",
    image: user?.image || null,
  };

  const validationSchema = Yup.object({
    hometown_region: Yup.string().required("Hometown Region is required"),
    current_region: Yup.string().required("Current Region is required"),
    year_birth: Yup.string().required("Year of Birth is required"),
    // school: Yup.string().required("School is required"),
    // secondary_school: Yup.string().required("Secondary School is required"),
    // tertiary_school: Yup.string().required("Tertiary School is required"),
    // study_field: Yup.string().required("Field of Study is required"),
    // expected_year_graduation: Yup.string().required(
    //   "Graduation Year is required"
    // ),
    email: Yup.string().required("Email is required"),
    // first_name: Yup.string().required("First Name is required"),
    // last_name: Yup.string().required("Last Name is required"),
    // given_name: Yup.string().required("Given Name is required"),
    // family_name: Yup.string().required("Family Name is required"),
    // password: Yup.string(),
    // phone: Yup.string().required("Phone is required"),
    // image: Yup.mixed(),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          formData.append(key, value);
        }
      });
      formData.append("id", user?.id);

      const res = await axiosInstance.post(`/profile/update`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Profile update response:", res.data);

      const updatedUser = res?.data?.data || res?.data;

      if (updatedUser) {
        const mergedUser = { ...user, ...updatedUser };

        localStorage.setItem("user", JSON.stringify(mergedUser));

        toast.success("Profile updated successfully!");
      } else {
        toast.error("Update failed. Try again!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile!");
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return <Login />; 
  }


  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto mt-20 md:mt-28">
      <h1 className="text-xl md:text-3xl font-bold mb-4">
        Hey, <span className="text-gray-700">{user?.email}</span>
      </h1>

      {/* Tabs */}
      <div className="hidden md:flex gap-6 border-b border-black mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-sm md:text-base transition-colors ${
              activeTab === tab
                ? "border-b-2 border-black text-black"
                : "text-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Mobile Dropdown Tabs */}
      <div className="md:hidden relative mb-6">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-full border border-gray-300 rounded-md p-2 text-left flex justify-between items-center"
        >
          {activeTab}
          <span className="ml-2">▼</span>
        </button>
        {dropdownOpen && (
          <div className="absolute z-10 mt-2 w-full border rounded-md bg-white shadow-md">
            {tabs.map((tab) => (
              <div
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setDropdownOpen(false);
                }}
                className={`p-2 cursor-pointer hover:bg-gray-100 ${
                  activeTab === tab ? "bg-gray-200 font-medium" : ""
                }`}
              >
                {tab}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Profile Form */}
      {activeTab === "Profile" && (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="grid grid-cols-1 md:grid-cols-2 gap-4 font-light text-sm">
              {/* Hometown Region */}
              <div className="flex flex-col">
                <label className="text-red-500 font-medium">
                  Hometown Region
                </label>
              </div>
              <div className="flex flex-col">
                <label className="text-gray-800 mb-2 font-medium">
                  Region of Hometown
                </label>
                <Field
                  as="select"
                  name="hometown_region"
                  className="border-2 shadow rounded-md p-2 focus:ring-1 focus:outline-none focus:ring-primary"
                >
                  <option value="">Select Region</option>
                  <option>Ahafo</option>
                  <option>Ashanti Region</option>
                  <option>Bono</option>
                  <option>Bono East</option>
                  <option>Central Region</option>
                  <option>Eastern Region</option>
                  <option>Greater Accra Region</option>
                  <option>North East</option>
                  <option>Northern Region</option>
                  <option>Oti</option>
                  <option>Savannah</option>
                  <option>Upper East Region</option>
                  <option>Upper West Region</option>
                  <option>Volta Region</option>
                  <option>Western North</option>
                  <option>Western Region</option>
                </Field>
                <ErrorMessage
                  name="hometown_region"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              {/* Current Region */}
              <div className="flex flex-col">
                <label className="text-red-500 font-medium">
                  Current Region
                </label>
              </div>
              <div className="flex flex-col">
                <label className="text-gray-800 mb-2 font-medium">
                  Region You Live In
                </label>
                <Field
                  as="select"
                  name="current_region"
                  className="border-2 shadow rounded-md p-2 focus:ring-1 focus:outline-none focus:ring-primary"
                >
                  <option value="">Select Region</option>
                  <option>Ahafo</option>
                  <option>Ashanti Region</option>
                  <option>Bono</option>
                  <option>Bono East</option>
                  <option>Central Region</option>
                  <option>Eastern Region</option>
                  <option>Greater Accra Region</option>
                  <option>North East</option>
                  <option>Northern Region</option>
                  <option>Oti</option>
                  <option>Savannah</option>
                  <option>Upper East Region</option>
                  <option>Upper West Region</option>
                  <option>Volta Region</option>
                  <option>Western North</option>
                  <option>Western Region</option>
                </Field>
                <ErrorMessage
                  name="current_region"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              {/* Year of Birth */}
              <div className="flex flex-col">
                <label className="text-red-500 font-medium">
                  Year of Birth
                </label>
              </div>
              <div className="flex flex-col">
                <label className="text-gray-800 mb-2 font-medium">
                  Year of Birth
                </label>
                <Field
                  as="select"
                  name="year_birth"
                  className="border-2 shadow rounded-md p-2 focus:ring-1 focus:outline-none focus:ring-primary"
                >
                  <option value="">Select Year</option>
                  {Array.from({ length: 80 }, (_, i) => 2010 - i).map(
                    (year) => (
                      <option key={year}>{year}</option>
                    )
                  )}
                </Field>
                <ErrorMessage
                  name="year_birth"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              {/* First Name */}
              <div className="flex flex-col">
                <label className="text-gray-800 font-medium">First Name</label>
              </div>
              <div className="flex flex-col">
                <label className="text-gray-800 font-medium">First Name</label>
                <Field
                  type="text"
                  name="first_name"
                  placeholder="Enter Your First Name"
                  className="border border-gray-300 rounded-md p-[9px] font-light focus:ring-1 focus:outline-none focus:ring-primary"
                />
                <ErrorMessage
                  name="first_name"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              {/* Given Name */}
              <div className="flex flex-col">
                <label className="text-gray-800 font-medium">Given Name</label>
              </div>
              <div className="flex flex-col">
                <label className="text-gray-800 font-medium">Given Name</label>
                <Field
                  type="text"
                  name="given_name"
                  placeholder="Enter Your Given Name"
                  className="border border-gray-300 rounded-md p-[9px] font-light focus:ring-1 focus:outline-none focus:ring-primary"
                />
                <ErrorMessage
                  name="given_name"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label className="text-gray-800 font-medium">Email</label>
              </div>
              <div className="flex flex-col">
                <label className="text-gray-800 font-medium">Email</label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  className="border border-gray-300 rounded-md p-[9px] font-light focus:ring-1 focus:outline-none focus:ring-primary"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col">
                <label className="text-gray-800 font-medium">Password</label>
              </div>
              <div className="flex flex-col">
                <label className="text-gray-800 font-medium">Password</label>
                <div className="relative">
                  <Field
                    type={!showPassword ? "password" : "text"}
                    name="password"
                    placeholder="Enter Your School"
                    className="border border-gray-300 rounded-md p-[9px] font-light focus:ring-1 focus:outline-none focus:ring-primary w-full"
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
                  className="text-red-500 text-xs"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col">
                <label className="text-gray-800 font-medium">Phone</label>
              </div>
              <div className="flex flex-col">
                <label className="text-gray-800 font-medium">Phone</label>
                <Field
                  type="number"
                  name="phone"
                  placeholder="Enter Your School"
                  className="border border-gray-300 rounded-md p-[9px] font-light focus:ring-1 focus:outline-none focus:ring-primary"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              {/* School */}
              <div className="flex flex-col">
                <label className="text-gray-800 font-medium">School</label>
              </div>
              <div className="flex flex-col">
                <label className="text-gray-800 font-medium">Your School</label>
                <Field
                  type="text"
                  name="school"
                  placeholder="Enter Your School"
                  className="border border-gray-300 rounded-md p-[9px] font-light focus:ring-1 focus:outline-none focus:ring-primary"
                />
                <ErrorMessage
                  name="school"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              {/* Secondary School */}
              <div className="flex flex-col">
                <label className="text-gray-800 font-medium">
                  Secondary School
                </label>
              </div>
              <div className="flex flex-col">
                <label className="text-gray-800 font-medium">
                  Your Secondary School
                </label>
                <Field
                  type="text"
                  name="secondary_school"
                  placeholder="Enter Your Secondary School"
                  className="border border-gray-300 rounded-md p-[9px] font-light focus:ring-1 focus:outline-none focus:ring-primary"
                />
                <ErrorMessage
                  name="secondary_school"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              {/* Tertiary School */}
              <div className="flex flex-col">
                <label className="text-gray-800 font-medium">
                  Tertiary School
                </label>
              </div>
              <div className="flex flex-col">
                <label className="text-gray-800 font-medium">
                  Your Tertiary School
                </label>
                <Field
                  type="text"
                  name="tertiary_school"
                  placeholder="Enter Your Tertiary School"
                  className="border border-gray-300 rounded-md p-[9px] font-light focus:ring-1 focus:outline-none focus:ring-primary"
                />
                <ErrorMessage
                  name="tertiary_school"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              {/* Field of Study */}
              <div className="flex flex-col">
                <label className="text-gray-800 font-medium">
                  Field of Study
                </label>
              </div>
              <div className="flex flex-col">
                <label className="text-gray-800 font-medium">
                  Field of Study
                </label>
                <Field
                  type="text"
                  name="study_field"
                  placeholder="Enter Your Field of Study"
                  className="border border-gray-300 rounded-md p-[9px] font-light focus:ring-1 focus:outline-none focus:ring-primary"
                />
                <ErrorMessage
                  name="study_field"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              {/* Graduation Year */}
              <div className="flex flex-col">
                <label className="text-gray-800 font-medium">
                  Graduation Year
                </label>
              </div>
              <div className="flex flex-col">
                <label className="text-gray-800 font-medium">
                  Expected Year of Graduation
                </label>
                <Field
                  type="text"
                  name="expected_year_graduation"
                  placeholder="e.g., 2025"
                  className="border border-gray-300 rounded-md p-[9px] font-light focus:ring-1 focus:outline-none focus:ring-primary"
                />
                <ErrorMessage
                  name="expected_year_graduation"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              {/* Image Upload */}
              <div className="flex flex-col">
                <label className="text-gray-800 font-medium">Image</label>
              </div>
              <div className="flex flex-col">
                <label className="text-gray-800 font-medium">
                  Upload Image
                </label>

                <Field name="image">
                  {({ form }) => (
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(event) => {
                          const file = event.currentTarget.files[0];
                          form.setFieldValue("image", file);
                        }}
                        className="border border-gray-300 rounded-md p-[9px] font-light focus:ring-1 focus:outline-none focus:ring-primary"
                      />
                    </div>
                  )}
                </Field>

                <ErrorMessage
                  name="image"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              {/* Submit Button */}
              <div className="col-span-2 flex justify-end mt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary text-white rounded-lg shadow hover:bg-white hover:text-primary hover:border
                   hover:border-primary py-3 w-full disabled:opacity-50 font-normal transition-colors duration-200"
                >
                  {isSubmitting ? "Updating..." : "Update Profile"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
      {/* Account Settings Tab*/}
      {activeTab === "Account Settings" && (
        <AccountSettings user={user?.email} />
      )}

      {/* Ratings Academic Tab*/}
      {activeTab === "Ratings Academic" && (
        <div className="flex flex-col gap-3">
          {savedAcademicRatings.length > 0 ? (
            savedAcademicRatings.map((user) => (
              <SavedCard
                key={user.id}
                user={user}
                onUpdateSaved={handleUpdateSaved}
              />
            ))
          ) : (
            <p className="text-gray-500">
              No saved Ratings Academic users found.
            </p>
          )}
        </div>
      )}

      {/* Ratings Non Academic Tab*/}
      {activeTab === "Ratings Non Academic" && (
        <div className="flex flex-col gap-3">
          {savedNonAcademicRatings.length > 0 ? (
            savedNonAcademicRatings.map((user) => (
              <SavedCard
                key={user.id}
                user={user}
                onUpdateSaved={handleUpdateSaved}
              />
            ))
          ) : (
            <p className="text-gray-500">
              No saved Ratings Non Academic users found.
            </p>
          )}
        </div>
      )}

      {/* Saved Academic Tab*/}
      {activeTab === "Saved Academic" && (
        <div className="flex flex-col gap-3">
          {savedAcademic.length > 0 ? (
            savedAcademic.map((user) => (
              <SavedCard
                key={user.id}
                user={user}
                onUpdateSaved={handleUpdateSaved}
              />
            ))
          ) : (
            <p className="text-gray-500">No saved academic users found.</p>
          )}
        </div>
      )}

      {/* Saved Non Academic Tab*/}
      {activeTab === "Saved Non Academic" && (
        <div className="flex flex-col gap-3">
          {savedNonAcademic.length > 0 ? (
            savedNonAcademic.map((user) => (
              <SavedCard
                key={user.id}
                user={user}
                onUpdateSaved={handleUpdateSaved}
              />
            ))
          ) : (
            <p className="text-gray-500">No saved non academic users found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ProfileUser;
