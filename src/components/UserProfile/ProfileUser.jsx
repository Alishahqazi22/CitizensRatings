import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import AccountSettings from "../Forms/AccountSettings";
import SavedCard from "./SavedCard";

function ProfileUser() {
  const [activeTab, setActiveTab] = useState("Profile");
  const user = JSON.parse(localStorage.getItem("user"));
  const [savedUsers, setSavedUsers] = useState([]);

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
    const saved = JSON.parse(localStorage.getItem("savedUsers")) || [];
    setSavedUsers(saved);
    console.log("saved user", saved);
  }, []);

  const handleUpdateSaved = (updated) => {
    setSavedUsers(updated);
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
    hometownRegion: user?.hometownRegion || "",
    currentRegion: user?.currentRegion || "",
    yearOfBirth: user?.yearOfBirth || "",
    basicSchool: user?.basicSchool || "",
    secondarySchool: user?.secondarySchool || "",
    tertiarySchool: user?.tertiarySchool || "",
    fieldOfStudy: user?.fieldOfStudy || "",
    graduationYear: user?.graduationYear || "",
  };

  const validationSchema = Yup.object({
    hometownRegion: Yup.string().required("Required"),
    currentRegion: Yup.string().required("Required"),
    yearOfBirth: Yup.string().required("Required"),
    // basicSchool: Yup.string().required("Required"),
    // secondarySchool: Yup.string().required("Required"),
    // tertiarySchool: Yup.string().required("Required"),
    // fieldOfStudy: Yup.string().required("Required"),
    // graduationYear: Yup.string().required("Required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();

      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      formData.append("id", user?.id);

      const res = await axios.post(`/user/${user?.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Profile updated successfully!");
      console.log(res?.data?.data);

      localStorage.setItem("user", JSON.stringify(res?.data?.data));
    } catch (error) {
      console.error(error);
      alert("Failed to update profile!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto mt-28">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">
        Hey, <span className="text-gray-700">{user?.email}</span>
      </h1>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-black mb-6">
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
                  name="hometownRegion"
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
                  name="hometownRegion"
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
                  name="currentRegion"
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
                  name="currentRegion"
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
                  name="yearOfBirth"
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
                  name="yearOfBirth"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              {/* Basic School */}
              <div className="flex flex-col">
                <label className="text-gray-800 font-medium">
                  Basic School
                </label>
              </div>
              <div className="flex flex-col">
                <label className="text-gray-800 font-medium">
                  Your Basic School
                </label>
                <Field
                  type="text"
                  name="basicSchool"
                  placeholder="Enter Your Basic School"
                  className="border border-gray-300 rounded-md p-[9px] font-light focus:ring-1 focus:outline-none focus:ring-primary"
                />
                <ErrorMessage
                  name="basicSchool"
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
                  name="secondarySchool"
                  placeholder="Enter Your Secondary School"
                  className="border border-gray-300 rounded-md p-[9px] font-light focus:ring-1 focus:outline-none focus:ring-primary"
                />
                <ErrorMessage
                  name="secondarySchool"
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
                  name="tertiarySchool"
                  placeholder="Enter Your Tertiary School"
                  className="border border-gray-300 rounded-md p-[9px] font-light focus:ring-1 focus:outline-none focus:ring-primary"
                />
                <ErrorMessage
                  name="tertiarySchool"
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
                  name="fieldOfStudy"
                  placeholder="Enter Your Field of Study"
                  className="border border-gray-300 rounded-md p-[9px] font-light focus:ring-1 focus:outline-none focus:ring-primary"
                />
                <ErrorMessage
                  name="fieldOfStudy"
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
                  name="graduationYear"
                  placeholder="e.g., 2025"
                  className="border border-gray-300 rounded-md p-[9px] font-light focus:ring-1 focus:outline-none focus:ring-primary"
                />
                <ErrorMessage
                  name="graduationYear"
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
      {activeTab === "Account Settings" && <AccountSettings />}

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
