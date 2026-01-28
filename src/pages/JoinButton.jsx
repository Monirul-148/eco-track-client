import React, { useState } from "react";
import { API } from "../utils/axios";
import { useAuth } from "../contexts/AuthContext";

const JoinButton = ({ challengeId }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleJoin = async () => {
    if (!user) {
      alert("Please login first to join the challenge!");
      return;
    }

    setLoading(true);
    try {
      // API call to backend
      const res = await API.post(`/challenges/join/${challengeId}`);
      alert(res.data.message || "Successfully joined!");
    } catch (error) {
      console.error("Join error details:", error.response?.data || error.message);
      alert(
        error.response?.data?.message || "Join failed. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleJoin}
      disabled={loading}
      className={`px-4 py-2 rounded font-semibold text-white transition-colors ${
        loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
      }`}
    >
      {loading ? "Joining..." : "Join Challenge"}
    </button>
  );
};

export default JoinButton;