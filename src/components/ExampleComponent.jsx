// ExampleComponent.jsx
import React, { useState } from "react";
import CustomToastContainer from "../Toast/ToastContainer";
import { showError, showSuccess } from "../Toast/useToast";
import axios from "axios";

function ExampleComponent() {
  const [loading, setLoading] = useState(false);

  const handleSaveData = async () => {
    setLoading(true);
    try {
      // Example API call
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        {
          title: "Test Post",
          body: "This is a demo",
          userId: 1,
        }
      );

      if (response.status === 201) {
        showSuccess("✅ Data saved successfully!");
        console.log(response);
      }
    } catch (error) {
      showError("❌ Failed to save data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <button
        onClick={handleSaveData}
        disabled={loading}
        className={`px-4 py-2 rounded-lg ${
          loading ? "bg-gray-400" : "bg-blue-600 text-white"
        }`}
      >
        {loading ? "Saving..." : "Save Data"}
      </button>

      <CustomToastContainer />
    </div>
  );
}

export default ExampleComponent;
