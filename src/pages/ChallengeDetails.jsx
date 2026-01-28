import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";
import { API } from "../utils/axios";

const DEFAULT_IMAGE = "https://i.ibb.co/RxKfjrF/1.jpg";

const ChallengeDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
       
        const res = await API.get(`/challenges/${id}`);
        setChallenge(res.data);
      } catch (error) {
        console.error("Fetch challenge error:", error);
        toast.error("Failed to load challenge");
      } finally {
        setLoading(false);
      }
    };
    fetchChallenge();
  }, [id]);

  const handleJoin = async () => {
  if (!user) return toast.error("You must be logged in to join");
  setJoining(true);
  try {
    const res = await API.get(`/challenges/${id}`);
    toast.success(res.data.message || "Joined challenge successfully");

    setChallenge((prev) => ({
      ...prev,
      participants: (prev.participants || 0) + 1,
    }));
  } catch (error) {
    console.error("Join challenge error:", error);
    toast.error(error.response?.data?.message || "Already joined or server error");
  } finally {
    setJoining(false);
  }
};

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!challenge) return <p className="text-center mt-10">Challenge not found</p>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <img
        src={challenge.imageUrl || DEFAULT_IMAGE}
        alt={challenge.title}
        className="w-full h-80 object-cover rounded-xl"
      />
      <h2 className="text-3xl font-bold mt-6 text-green-800">{challenge.title}</h2>
      <p className="mt-2 text-gray-600">{challenge.description}</p>
      <ul className="mt-4 space-y-1">
        <li> Category: {challenge.category}</li>
        <li> Duration: {challenge.duration} days</li>
        <li> Target: {challenge.target}</li>
        <li> Participants: {challenge.participants}</li>
      </ul>
      <button
        onClick={handleJoin}
        disabled={joining}
        className={`mt-6 px-6 py-3 rounded-lg text-white ${
          joining ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {joining ? "Joining..." : "Join Challenge"}
      </button>
    </div>
  );
};

export default ChallengeDetails;
