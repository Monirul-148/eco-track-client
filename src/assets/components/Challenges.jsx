import { useEffect, useState } from "react";
import axios from "axios";

const Challenges = () => {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/challenges")
      .then((res) => setChallenges(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="px-6 py-10 bg-gray-50 min-h-screen">
       <div className='flex gap-1 items-center justify-center'>
        <img className='w-14 h-14' src="https://i.ibb.co/DfFs1kLK/leave-logo.webp" alt="" />
      <h2 className='text-5xl font-bold'>Sustainability Challenges</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge) => (
          <div
            key={challenge._id}
            className="bg-white shadow-md p-5 rounded-xl border border-gray-100 hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-2 text-green-800">
              {challenge.title}
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Category: <span className="font-medium">{challenge.category}</span>
            </p>
            <p className="text-gray-700 mb-4">{challenge.description}</p>
            <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg w-full">
              Join Challenge
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Challenges;
