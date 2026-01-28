import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DEFAULT_IMAGE = "https://i.ibb.co/RxKfjrF/1.jpg";

export default function Challenges() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const res = await axios.get(
          "https://eco-track-server-dusky.vercel.app/api/challenges"
        );
        setChallenges(res.data || []);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-700 text-lg">
        Loading challenges...
      </p>
    );

  if (error)
    return (
      <p className="text-center mt-10 text-red-500 text-lg">
        {error}
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-green-700">
        Sustainability Challenges
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {challenges.map((ch) => (
          <Card key={ch._id} challenge={ch} />
        ))}
      </div>
    </div>
  );
}

// Reusable Card component
function Card({ challenge }) {
  return (
    <div className="border rounded-lg shadow hover:shadow-lg transition duration-300">
      <img
        src={challenge.imageUrl || DEFAULT_IMAGE}
        alt={challenge.title || "Challenge"}
        className="h-48 w-full object-cover rounded-t-lg"
      />

      <div className="p-4">
        <h3 className="text-xl font-semibold">{challenge.title || "Untitled"}</h3>
        <p className="text-sm text-gray-500">{challenge.category || "General"}</p>
        <p className="text-sm mt-2">{challenge.description || "No description."}</p>
        <p className="text-sm mt-2">
          👥 Participants: {challenge.participants ?? 0}
        </p>

        <Link
          to={`/challenges/${challenge._id}`}
          className="inline-block mt-4 text-green-600 font-semibold hover:underline"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
