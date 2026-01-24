import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";
import { API } from "../utils/axios";

const ChallengeDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [challenge, setChallenge] = useState(null);

  useEffect(() => {
    API.get(`/challenges/${id}`)
      .then(res => setChallenge(res.data))
      .catch(() => toast.error("Failed to load challenge"));
  }, [id]);

  const handleJoin = () => {
    if (!user) return toast.error("You must be logged in to join");

    API.post(`/challenges/join/${id}`, { userId: user.email })
      .then(() => toast.success("Joined challenge successfully"))
      .catch(() => toast.error("Already joined or error"));
  };

  if (!challenge) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <img src={challenge.imageUrl} alt={challenge.title} className="w-full h-80 object-cover rounded-xl" />
      <h2 className="text-3xl font-bold mt-6 text-green-800">{challenge.title}</h2>
      <p className="mt-2 text-gray-600">{challenge.description}</p>
      <ul className="mt-4 space-y-1">
        <li>📌 Category: {challenge.category}</li>
        <li>⏳ Duration: {challenge.duration} days</li>
        <li>🎯 Target: {challenge.target}</li>
        <li>👥 Participants: {challenge.participants}</li>
      </ul>
      <button onClick={handleJoin} className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg">
        Join Challenge
      </button>
    </div>
  );
};

export default ChallengeDetails;
