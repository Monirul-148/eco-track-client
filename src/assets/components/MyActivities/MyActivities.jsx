import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MyActivities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔹 Example API call (change URL to your backend endpoint)
    axios
      .get("http://localhost:3000/api/my-activities")
      .then((res) => {
        setActivities(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading activities:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-gray-600">Loading activities...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-10">My Activities</h1>

      {activities.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          You haven’t joined any challenges yet.
        </div>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
          {activities.map((activity) => (
            <div
              key={activity._id}
              className="bg-white shadow-md rounded-xl p-5 border hover:shadow-lg transition"
            >
              <img
                src={activity.image || "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1470&q=80"}
                alt={activity.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-2xl font-semibold mb-2">{activity.title}</h2>
              <p className="text-gray-600 text-sm mb-2">
                Category: <span className="font-medium">{activity.category}</span>
              </p>
              <p className="text-gray-700 mb-4">{activity.description}</p>
              <div className="flex justify-between text-sm text-gray-600">
                <p>Progress: {activity.progress}%</p>
                <p> Points: {activity.points}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
