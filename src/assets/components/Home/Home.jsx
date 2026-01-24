import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import { API } from "../../../utils/axios";
import { toast } from "react-toastify";

const DEFAULT_IMAGE = "https://i.ibb.co/RxKfjrF/1.jpg";

export default function Home() {
  const heroSlides = [
    {
      image: "https://i.ibb.co/RxKfjrF/1.jpg",
      title: "Plastic-Free July",
      description: "Reduce single-use plastic and save nature",
    },
    {
      image: "https://i.ibb.co/rR2p8P1Z/2.jpg",
      title: "Tree Plantation Drive",
      description: "Plant trees for a greener future",
    },
    {
      image: "https://i.ibb.co/p6xF6fpp/22.jpg",
      title: "Community Clean-Up",
      description: "Clean your neighborhood together",
    },
  ];

  // ================= STATE =================
  const [challenges, setChallenges] = useState([]);
  const [tips, setTips] = useState([]);
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState({ totalCO2: 0, totalPlastic: 0, totalEnergy: 0 });
  
  const [loadingChallenges, setLoadingChallenges] = useState(true);
  const [loadingTips, setLoadingTips] = useState(true);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);

  // ================= FETCH CHALLENGES =================
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const res = await API.get("/challenges");
        setChallenges(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        toast.error("Failed to load challenges");
      } finally {
        setLoadingChallenges(false);
      }
    };
    fetchChallenges();
  }, []);

  // ================= FETCH TIPS =================
  useEffect(() => {
    const fetchTips = async () => {
      try {
        const res = await API.get("/tips");
        setTips(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        toast.error("Failed to load tips");
      } finally {
        setLoadingTips(false);
      }
    };
    fetchTips();
  }, []);

  // ================= FETCH EVENTS =================
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await API.get("/events");
        setEvents(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        toast.error("Failed to load events");
      } finally {
        setLoadingEvents(false);
      }
    };
    fetchEvents();
  }, []);

  // ================= FETCH STATS =================
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/stats");
        setStats(res.data || { totalCO2: 1200, totalPlastic: 800, totalEnergy: 500 });
      } catch (error) {
        toast.error("Failed to load stats");
      } finally {
        setLoadingStats(false);
      }
    };
    fetchStats();
  }, []);

  // ================= RENDER =================
  return (
    <div className="bg-gray-50">
      {/* ================= HERO SLIDER ================= */}
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
      >
        {heroSlides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-[500px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-center px-4">
                <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
                <p className="mb-4">{slide.description}</p>
                <Link to="/challenges">
                  <button className="bg-green-600 px-6 py-2 rounded hover:bg-green-700">
                    View Challenges
                  </button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ================= LIVE STATS ================= */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12 px-6">
        {loadingStats ? (
          <p className="col-span-3 text-center">Loading stats...</p>
        ) : (
          <>
            <StatCard title="CO₂ Saved" value={`${stats.totalCO2} kg`} />
            <StatCard title="Plastic Reduced" value={`${stats.totalPlastic} kg`} />
            <StatCard title="Energy Saved" value={`${stats.totalEnergy} kWh`} />
          </>
        )}
      </section>

      {/* ================= ACTIVE CHALLENGES ================= */}
      <Section title="Active Challenges">
        {loadingChallenges ? (
          <p className="text-center text-gray-500">Loading challenges...</p>
        ) : challenges.length === 0 ? (
          <p className="text-center text-gray-500">No active challenges available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {challenges.slice(0, 6).map((ch) => (
              <Link to={`/challenges/${ch._id}`} key={ch._id}>
                <Card>
                  <img
                    src={ch.imageUrl || DEFAULT_IMAGE}
                    alt={ch.title}
                    className="h-40 w-full object-cover rounded mb-2"
                    loading="lazy"
                  />
                  <h3 className="font-semibold">{ch.title}</h3>
                  <p className="text-sm text-gray-600">{ch.category}</p>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </Section>

      {/* ================= RECENT TIPS ================= */}
      <Section title="Recent Tips">
        {loadingTips ? (
          <p className="text-center text-gray-500">Loading tips...</p>
        ) : tips.length === 0 ? (
          <p className="text-center text-gray-500">No tips shared yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tips.slice(0, 5).map((tip) => (
              <Card key={tip._id}>
                <h3 className="font-semibold">{tip.title}</h3>
                <p className="text-sm">By {tip.authorName || "Community Member"}</p>
                <p className="text-xs text-gray-500">Upvotes: {tip.upvotes || 0}</p>
              </Card>
            ))}
          </div>
        )}
      </Section>

      {/* ================= EVENTS ================= */}
      <Section title="Upcoming Events">
        {loadingEvents ? (
          <p className="text-center text-gray-500">Loading events...</p>
        ) : events.length === 0 ? (
          <p className="text-center text-gray-500">No upcoming events.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {events.slice(0, 4).map((ev) => (
              <Card key={ev._id}>
                <h3 className="font-semibold">{ev.title}</h3>
                <p className="text-sm">{ev.location || "TBA"}</p>
                <p className="text-xs text-gray-500">
                  {ev.date ? new Date(ev.date).toLocaleDateString() : "Date not announced"}
                </p>
              </Card>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}

/* ================= REUSABLE COMPONENTS ================= */
function Section({ title, children }) {
  return (
    <section className="px-6 my-16">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-700">{title}</h2>
      {children}
    </section>
  );
}

function Card({ children }) {
  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-lg transition">
      {children}
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded shadow text-center">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-2xl text-green-600 font-bold">{value}</p>
    </div>
  );
}
