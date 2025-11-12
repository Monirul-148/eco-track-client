import { useEffect, useState } from "react";
import axios from "axios";

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get("/api/events")
      .then(res => setEvents(Array.isArray(res.data) ? res.data : []))
      .catch(err => {
        console.error(err);
        setEvents([]);
      });
  }, []);

  return (
    <div className="px-6 py-10 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-10 text-green-700">Upcoming Events</h1>
      {events.length === 0 ? (
        <p className="text-center text-gray-500">No upcoming events.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((ev,index)=>(
            <div key={ev._id || index} className="bg-white shadow-md p-5 rounded-xl border hover:shadow-lg">
              <h3 className="text-lg font-semibold mb-1">{ev.title}</h3>
              <p className="text-gray-600 text-sm mb-1">Date: {ev.date ? new Date(ev.date).toLocaleDateString() : "TBA"}</p>
              <p className="text-gray-700 text-sm">Location: {ev.location || "TBA"}</p>
              <p className="text-gray-500 text-sm">{ev.description ? ev.description.slice(0,100) : ""}...</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
