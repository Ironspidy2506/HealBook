import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const MySavedInsights = () => {
  const [insights, setInsights] = useState([]);
  const token = localStorage.getItem("token");

  const fetchSavedInsights = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/insights/get-user-insights",
        {
          headers: { token },
        }
      );

      if (data.success) {
        setInsights(data.insights); // Each item has .appointmentId and .insights
      } else {
        toast.error(data.message || "Could not fetch insights");
      }
    } catch (err) {
      toast.error("Error fetching insights from server.");
    }
  };

  useEffect(() => {
    fetchSavedInsights();
  }, []);

  const parseInsight = (text) => {
    const sections = {
      "Alternate Medicines": [],
      Precautions: [],
      "Medications Advice": [],
      Workouts: [],
      "Diet Recommendations": [],
    };

    const lines = text.split("\n").map((line) => line.trim());
    let currentSection = "";

    for (let line of lines) {
      if (Object.keys(sections).some((s) => line.startsWith(s))) {
        currentSection = Object.keys(sections).find((s) => line.startsWith(s));
      } else if (line && currentSection) {
        sections[currentSection].push(line);
      }
    }

    return sections;
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
        My Saved Insights
      </h1>

      {insights.length === 0 ? (
        <p className="text-center text-gray-600">No saved insights yet.</p>
      ) : (
        <div className="space-y-8">
          {insights.map((item, index) => {
            const parsed = parseInsight(item.insights);
            const appointment = item.appointmentId;
            const prescription = appointment?.prescription;

            return (
              <div
                key={index}
                className="bg-white shadow-md rounded-xl p-6 space-y-4 border border-gray-200 hover:shadow-lg transition"
              >
                {/* Appointment Metadata */}
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold text-blue-600">
                    📄 Insight #{index + 1}
                  </h3>
                  <p className="text-sm text-gray-700">
                    👨‍⚕️ Doctor:{" "}
                    <span className="font-medium">
                      {appointment?.docData?.name || "N/A"}
                    </span>
                  </p>
                  <p className="text-sm text-gray-700">
                    📅 Date: {appointment?.slotDate || "N/A"} | ⏰ Time:{" "}
                    {appointment?.slotTime || "N/A"}
                  </p>
                </div>

                {/* Prescription Section */}
                {prescription && (
                  <div>
                    <h4 className="text-lg font-semibold text-green-700 mt-4 mb-2 border-b pb-1">
                      🧾 Prescription
                    </h4>
                    <p className="text-gray-800 font-medium mb-2">
                      🦠 Disease: {prescription.disease}
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 pl-4">
                      {prescription.medicines?.map((med, i) => (
                        <li key={i}>
                          💊 {med.name} — {med.dosage}, {med.frequency}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Parsed AI Insights */}
                <hr className="my-2" />
                {Object.entries(parsed).map(
                  ([section, items]) =>
                    items.length > 0 && (
                      <div key={section}>
                        <h4 className="text-lg font-semibold text-gray-800 mb-1 border-b border-gray-200 pb-1">
                          {section}:
                        </h4>
                        <ul className="list-disc list-inside text-gray-700 space-y-1 pl-4">
                          {items.map((point, i) => (
                            <li key={i}>{point.replace(/^\d+\.\s*/, "")}</li>
                          ))}
                        </ul>
                      </div>
                    )
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MySavedInsights;
