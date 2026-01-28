import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "https://eco-track-server-dusky.vercel.app/";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/events`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setEvents(res.data);
        } else {
          setEvents([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Events load error:", err);
        setError("Failed to load events");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading events...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="px-6 py-10 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-10 text-green-700">
        Upcoming Events
      </h1>

      {events.length === 0 ? (
        <p className="text-center text-gray-500">No upcoming events.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <div
              key={event._id || index}
              className="bg-white shadow-md p-5 rounded-xl border hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold mb-2">
                {event.title || "Untitled Event"}
              </h3>

              <p className="text-sm text-gray-600 mb-1">
                {" "}
                {event.date
                  ? new Date(event.date).toLocaleDateString()
                  : "Date TBA"}
              </p>

              <p className="text-sm text-gray-600 mb-2">
                 {event.location || "Location TBA"}
              </p>

              <p className="text-gray-700 text-sm">
                {event.description
                  ? event.description.slice(0, 120)
                  : "No description available"}
                {event.description && event.description.length > 120 && "..."}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
