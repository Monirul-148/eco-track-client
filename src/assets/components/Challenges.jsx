import { useEffect, useState } from "react";
import axios from "axios";

const Challenges = () => {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    axios
      .get("https://eco-track-server-dusky.vercel.app/models")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setChallenges(res.data);
        } else {
          setChallenges([]);
        }
      })
      .catch((err) => {
        console.error("AxiosError:", err);
        setChallenges([]);
      });
  }, []);

  return (
    <div className="px-6 py-10 bg-gray-50 min-h-screen">
      <div className="flex gap-2 items-center justify-center mb-10">
        <img
          className="w-14 h-14"
          src="https://i.ibb.co/DfFs1kLK/leave-logo.webp"
          alt="Logo"
        />
        <h2 className="text-5xl font-bold text-green-800">
          Sustainability Challenges
        </h2>
      </div>

      {challenges.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((challenge, index) => (
            <div
              key={challenge._id || index}
              className="bg-white shadow-md p-5 rounded-xl border border-gray-100 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2 text-green-800">
                {challenge.title || "Untitled Challenge"}
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Category:{" "}
                <span className="font-medium">
                  {challenge.category || "N/A"}
                </span>
              </p>
              <p className="text-gray-700 mb-4">
                {challenge.description
                  ? challenge.description.slice(0, 150)
                  : "No description available."}
              </p>
              <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg w-full">
                Join Challenge
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">
          No challenges available at the moment.
        </p>
      )}
    </div>
  );
};

export default Challenges;
