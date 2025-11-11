import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Home() {

  // Hero Slides:
  const heroSlides = [
    {
      image: "https://i.ibb.co/rR7R5sdW/ishikawa-noto-peninsula-135478.jpg",
      title: "Plastic-Free July",
      description: "Join the challenge to reduce single-use plastic this month."
    },
    {
      image: "https://i.ibb.co/5XXJmWJh/22222.jpg",
      title: "Tree Plantation Drive",
      description: "Plant trees and contribute to a greener future."
    },
    {
      image: "https://i.ibb.co/1fGrfW0w/amo-katsura.jpg",
      title: "Community Clean-Up",
      description: "Help clean your local parks and neighborhoods."
    },
    {
      image: "https://i.ibb.co/fmx8tBT/img01.jpg",
      title: "Save Water Week",
      description: "Learn to save water and reduce wastage."
    },
  ];

  const [challenges, setChallenges] = useState([]);
  const [tips, setTips] = useState([]);
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState({ totalCO2: 0, totalPlastic: 0 });

  useEffect(() => {
    // Fetch Challenges
    axios.get("http://localhost:5000/api/challenges")
      .then(res => setChallenges(res.data.slice(0, 6)))
      .catch(err => console.error(err));

    // Fetch Tips
    axios.get("http://localhost:5000/api/tips")
      .then(res => setTips(res.data.slice(0, 5)))
      .catch(err => console.error(err));

    // Fetch Events
    axios.get("http://localhost:5000/api/events")
      .then(res => setEvents(res.data.slice(0, 4)))
      .catch(err => console.error(err));

    // Fetch Stats (example)
    axios.get("http://localhost:5000/api/stats")
      .then(res => setStats(res.data))
      .catch(err => setStats({ totalCO2: 12345, totalPlastic: 6789 }));
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-5">

      {/* Hero Carousel */}
      <section className="mb-10 relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-[500px] object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-opacity-40 flex flex-col justify-center items-center text-white px-6 text-center">
                  <h2 className="text-3xl md:text-5xl font-bold mb-3">{slide.title}</h2>
                  <p className="text-lg md:text-xl mb-5">{slide.description}</p>
                  <button className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg">
                    View Challenge
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Live Statistics */}
      <section className="flex justify-center gap-10 my-10">
        <div className="bg-white p-6 rounded-xl shadow-md text-center w-80">
          <h3 className="text-lg font-semibold">CO₂ Saved</h3>
          <p className="text-2xl font-bold text-green-600">{stats.totalCO2} kg</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md text-center w-80">
          <h3 className="text-lg font-semibold">Plastic Reduced</h3>
          <p className="text-2xl font-bold text-green-600">{stats.totalPlastic} kg</p>
        </div>
      </section>

      {/* Active Challenges */}
      <section className="px-6 mb-12">
        <h2 className="text-3xl font-bold mb-6 text-green-700">Active Challenges</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((ch) => (
            <div key={ch._id} className="bg-white shadow-md p-5 rounded-xl border hover:shadow-lg transition">
              <img src={ch.imageUrl || "https://via.placeholder.com/400x200"} alt={ch.title} className="w-full h-40 object-cover rounded-lg mb-3"/>
              <h3 className="text-xl font-semibold mb-2">{ch.title}</h3>
              <p className="text-gray-600 text-sm mb-1">Category: {ch.category}</p>
              <p className="text-gray-700 mb-2">{ch.description.slice(0, 80)}...</p>
              <p className="text-gray-500 text-sm">Participants: {ch.participants}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Tips */}
      <section className="px-6 mb-12">
        <h2 className="text-3xl font-bold mb-6 text-green-700">Recent Tips</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips.map((tip) => (
            <div key={tip._id} className="bg-white shadow-md p-5 rounded-xl border hover:shadow-lg transition">
              <h3 className="text-lg font-semibold mb-2">{tip.title}</h3>
              <p className="text-gray-600 text-sm mb-1">By: {tip.authorName}</p>
              <p className="text-gray-700 text-sm">{tip.content.slice(0, 70)}...</p>
              <p className="text-gray-500 text-sm">Upvotes: {tip.upvotes}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="px-6 mb-12">
        <h2 className="text-3xl font-bold mb-6 text-green-700">Upcoming Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((ev) => (
            <div key={ev._id} className="bg-white shadow-md p-5 rounded-xl border hover:shadow-lg transition">
              <h3 className="text-lg font-semibold mb-1">{ev.title}</h3>
              <p className="text-gray-600 text-sm mb-1">Date: {new Date(ev.date).toLocaleDateString()}</p>
              <p className="text-gray-700 text-sm">Location: {ev.location}</p>
              <p className="text-gray-500 text-sm">{ev.description.slice(0, 50)}...</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Go Green */}
      <section className="px-6 mb-12">
        <h2 className="text-3xl font-bold mb-6 text-green-700">Why Go Green?</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Reduce carbon footprint and fight climate change</li>
          <li>Save natural resources for future generations</li>
          <li>Promote a healthier and cleaner environment</li>
          <li>Build a responsible and eco-conscious community</li>
        </ul>
      </section>

      {/* How It Works */}
      <section className="px-6 mb-12">
        <h2 className="text-3xl font-bold mb-6 text-green-700">How It Works</h2>
        <ol className="list-decimal list-inside text-gray-700 space-y-2">
          <li>Join a challenge →</li>
          <li>Track your progress →</li>
          <li>Share tips and inspire others</li>
        </ol>
      </section>

    </div>
  );
}
