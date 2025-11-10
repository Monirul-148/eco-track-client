// src/assets/components/ChallengeCard/ChallengeCard.jsx
import React from 'react';

const ChallengeCard = ({ data }) => {
  return (
    <div className="card bg-white shadow-md rounded-lg p-4 m-2 flex flex-col">
      <h2 className="text-xl font-bold mb-2">{data.title}</h2>
      <p className="text-gray-700 mb-4">{data.description}</p>
      <button className="btn bg-gradient-to-r from-green-600 to-lime-500 text-white border-none hover:from-green-700 hover:to-lime-600 transition-all duration-300">
        Join Challenge
      </button>
    </div>
  );
};

export default ChallengeCard;
