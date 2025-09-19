import React, { useState } from "react";
import AccountSettings from "../Forms/AccountSettings";

function ProfileUser() {
  const [activeTab, setActiveTab] = useState("Profile");

  const tabs = [
    "Profile",
    "Account Settings",
    "Ratings Academic",
    "Ratings Non Academic",
    "Saved Academic",
    "Saved Non Academic",
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto mt-28">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">
        Hey, <span className="text-gray-700">alishahqazi22@gmail.com</span>
      </h1>

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

      {activeTab === "Profile" && (
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 font-light text-sm">
          <div className="flex flex-col">
            <label className="text-red-500 font-medium">Hometown Region</label>
          </div>

          <div className="flex flex-col">
            <label className="text-gray-800 mb-2 font-medium">Region of Hometown</label>
            <select className="border-2 shadow rounded-md p-2">
              <option>Ahafo</option>
              <option>Ashanti Region</option>
              <option>Bono</option>
              <option>Bono East</option>
              <option>central Region</option>
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
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-red-500 font-medium">Current Region</label>
          </div>

          <div className="flex flex-col">
            <label className="text-gray-800 mb-2 font-medium">Region You Live In</label>
            <select className="border-2 shadow focus:border-primary rounded-md p-2">
              <option>Ahafo</option>
              <option>Ashanti Region</option>
              <option>Bono</option>
              <option>Bono East</option>
              <option>central Region</option>
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
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-red-500 font-medium">Year of Birth</label>
          </div>

          <div className="flex flex-col">
            <label className="text-gray-800 mb-2 font-medium">Year of Birth</label>
            <select className="border-2 shadow rounded-md p-2">
              <option>2010</option>
              <option>2009</option>
              <option>2008</option>
              <option>2007</option>
              <option>2006</option>
              <option>2005</option>
              <option>2004</option>
              <option>2003</option>
              <option>2002</option>
              <option>2001</option>
              <option>2000</option>
              <option>1999</option>
              <option>1998</option>
              <option>1997</option>
              <option>1996</option>
              <option>1995</option>
              <option>1994</option>
              <option>1993</option>
              <option>1992</option>
              <option>1991</option>
              <option>1990</option>
              <option>1989</option>
              <option>1988</option>
              <option>1987</option>
              <option>1986</option>
              <option>1985</option>
              <option>1984</option>
              <option>1983</option>
              <option>1982</option>
              <option>1981</option>
              <option>1980</option>
              <option>1979</option>
              <option>1978</option>
              <option>1977</option>
              <option>1976</option>
              <option>1975</option>
              <option>1974</option>
              <option>1973</option>
              <option>1972</option>
              <option>1971</option>
              <option>1970</option>
              <option>1969</option>
              <option>1968</option>
              <option>1967</option>
              <option>1966</option>
              <option>1965</option>
              <option>1964</option>
              <option>1963</option>
              <option>1962</option>
              <option>1961</option>
              <option>1950</option>
              <option>1949</option>
              <option>1948</option>
              <option>1947</option>
              <option>1946</option>
              <option>1945</option>
              <option>1944</option>
              <option>1943</option>
              <option>1942</option>
              <option>1941</option>
              <option>1940</option>
              <option>1939</option>
              <option>1938</option>
              <option>1937</option>
              <option>1936</option>
              <option>1935</option>
              <option>1934</option>
              <option>1933</option>
              <option>1932</option>
              <option>1931</option>
              <option>1930</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-gray-800 font-medium">Basic School</label>
          </div>

          <div className="flex flex-col">
            <label className="text-gray-800 font-medium">Your Basic School</label>
            <input
              type="text"
              placeholder="Enter Your Basic School"
              className="border border-gray-300 rounded-md p-[9px] font-light"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-800 font-medium">Secondary School</label>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-800 font-medium">Your Secondary School</label>
            <input
              type="text"
              placeholder="Enter Your Secondary School"
              className="border rounded-md p-[9px] font-light"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-800 font-medium">Tertiary School</label>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-800 font-medium">Your Tertiary School</label>
            <input
              type="text"
              placeholder="Enter Your Teritary School"
              className="border border-gray-300 rounded-md p-[9px] font-light"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-800 font-medium">Field of Study</label>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-800 font-medium">Field of Study</label>
            <input
              type="text"
              placeholder="Enter Your Field of Study"
              className="border border-gray-300 rounded-md p-[9px] font-light"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-800 font-medium">Graduation Year</label>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-800 font-medium">
              Expected Year of Graduation
            </label>
            <input
              type="text"
              placeholder="e.g.,2025"
              className="border border-gray-300 rounded-md p-[9px] font-light"
            />
          </div>
        </form>
      )}
      {activeTab === "Account Settings" && <AccountSettings />}
    </div>
  );
}

export default ProfileUser;
