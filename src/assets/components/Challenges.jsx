import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Challenges() {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/challenges")
      .then(res => setChallenges(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">
        Sustainability Challenges
      </h2>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {challenges.map(challenge => (
          <div key={challenge._id} className="border rounded-lg shadow">
            <img
              src={challenge.imageUrl}
              alt={challenge.title}
              className="h-48 w-full object-cover rounded-t-lg"
            />

            <div className="p-4">
              <h3 className="text-xl font-semibold">
                {challenge.title}
              </h3>

              <p className="text-sm text-gray-500">
                {challenge.category}
              </p>

              <p className="text-sm mt-2">
                {challenge.description}
              </p>

              <p className="text-sm mt-2">
                👥 Participants: {challenge.participants}
              </p>

              <Link
                to={`/challenges/${challenge._id}`}
                className="inline-block mt-4 text-green-600 font-semibold"
              >
                View Details →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
