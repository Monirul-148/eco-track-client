import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext"; 
import { toast } from "react-toastify";

const MyActivities = () => {
  const { user, token } = useAuth(); 
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  // Fetch Activities
  const fetchActivities = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/activities", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setActivities(res.data || []);
    } catch (err) {
      console.error("Fetch activities error:", err);
      toast.error("Failed to fetch activities");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, [token]);

  // Update Activity
  const updateActivity = async (id, status, progress) => {
    if (!token) return;
    try {
      setUpdatingId(id);
      await axios.put(
        `https://eco-track-server-dusky.vercel.app/api/activities/${id}`,
        { status, progress },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Activity updated successfully!");
      fetchActivities();
    } catch (err) {
      console.error("Update activity error:", err);
      toast.error("Failed to update activity");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-700 text-lg">Loading activities...</p>
    );

  if (!activities.length)
    return (
      <p className="text-center mt-10 text-gray-500 text-lg">No activities found</p>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-green-700 mb-6">My Activities</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Challenge</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Progress (%)</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <ActivityRow
                key={activity._id}
                activity={activity}
                updating={updatingId === activity._id}
                onUpdate={updateActivity}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Row component
const ActivityRow = ({ activity, updating, onUpdate }) => {
  const [status, setStatus] = useState(activity.status || "Not Started");
  const [progress, setProgress] = useState(activity.progress ?? 0);

  return (
    <tr>
      <td className="border px-4 py-2">{activity.challengeId || "N/A"}</td>
      <td className="border px-4 py-2">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          disabled={updating}
          className="border rounded px-2 py-1"
        >
          <option value="Not Started">Not Started</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Finished">Finished</option>
        </select>
      </td>
      <td className="border px-4 py-2">
        <input
          type="number"
          value={progress}
          min={0}
          max={100}
          onChange={(e) => setProgress(Number(e.target.value))}
          disabled={updating}
          className="border rounded px-2 py-1 w-20 text-center"
        />
      </td>
      <td className="border px-4 py-2 text-center">
        <button
          onClick={() => onUpdate(activity._id, status, progress)}
          disabled={updating}
          className={`px-3 py-1 rounded ${
            updating ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 text-white hover:bg-green-700"
          }`}
        >
          {updating ? "Updating..." : "Save"}
        </button>
      </td>
    </tr>
  );
};

export default MyActivities;
