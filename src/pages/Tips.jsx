import { useEffect, useState } from "react";
import axios from "axios";

export default function Tips() {
  const [tips, setTips] = useState([]);

  useEffect(() => {
    axios.get("/api/tips")
      .then(res => setTips(Array.isArray(res.data) ? res.data : []))
      .catch(err => {
        console.error(err);
        setTips([]);
      });
  }, []);

  return (
    <div className="px-6 py-10 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-10 text-green-700">Community Tips</h1>
      {tips.length === 0 ? (
        <p className="text-center text-gray-500">No tips available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips.map((tip,index)=>(
            <div key={tip._id || index} className="bg-white shadow-md p-5 rounded-xl border hover:shadow-lg">
              <h3 className="text-lg font-semibold mb-2">{tip.title}</h3>
              <p className="text-gray-600 text-sm mb-1">By: {tip.authorName || "Anonymous"}</p>
              <p className="text-gray-700 text-sm">{tip.content ? tip.content.slice(0,150) : ""}</p>
              <p className="text-gray-500 text-sm mt-2">Upvotes: {tip.upvotes || 0}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
