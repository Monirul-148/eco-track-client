import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { API } from "../../../utils/axios";

const MyActivities = () => {
  const { user } = useAuth();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    API.get(`/activities?email=${user.email}`)
      .then(res => {
        setActivities(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [user]);

  if (loading) return <p className="text-center mt-10">Loading activities...</p>;
  if (activities.length === 0) return <p className="text-center mt-10">No activities found</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">My Activities</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map(a => (
          <div key={a._id} className="card bg-base-100 shadow-md p-5">
            <h3 className="text-xl font-semibold mb-2">{a.challengeTitle}</h3>
            <p className="text-sm text-gray-500 mb-1">Category: {a.category}</p>
            <p className="text-sm">Progress: {a.progress}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyActivities;
