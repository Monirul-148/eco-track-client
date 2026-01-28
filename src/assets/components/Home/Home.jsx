import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import { API } from "../../../utils/axios";
import JoinButton from "../../../pages/JoinButton";
import { toast } from "react-toastify";

const DEFAULT_IMAGE = "https://i.ibb.co/RxKfjrF/1.jpg";

export default function Home() {
  const heroSlides = [
    { image: DEFAULT_IMAGE, title: "Plastic-Free July", description: "Reduce single-use plastic and save nature" },
    { image: "https://i.ibb.co/rR2p8P1Z/2.jpg", title: "Tree Plantation Drive", description: "Plant trees for a greener future" },
    { image: "https://i.ibb.co/p6xF6fpp/22.jpg", title: "Community Clean-Up", description: "Clean your neighborhood together" },
    { image: "https://i.ibb.co/RTJ77Csf/111111.png", title: "Eco Workshop", description: "Learn eco-friendly habits" },
  ];

  const [challenges, setChallenges] = useState([]);
  const [tips, setTips] = useState([]);
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState({ totalCO2: 0, totalPlastic: 0, totalEnergy: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [chRes, tipsRes, evRes, statsRes] = await Promise.all([
          API.get("https://eco-track-server-dusky.vercel.app/api/challenges"),
          API.get("https://eco-track-server-dusky.vercel.app/api/tips"),
          API.get("https://eco-track-server-dusky.vercel.app/api/events"),
          API.get("https://eco-track-server-dusky.vercel.app/api/stats"),
        ]);

        setChallenges(chRes.data || []);
        setTips(tipsRes.data || []);
        setEvents(evRes.data || []);
        const s = statsRes.data || {};
        setStats({
          totalCO2: s.totalCO2 ?? 0,
          totalPlastic: s.totalPlastic ?? 0,
          totalEnergy: s.totalEnergy ?? 0,
        });
      } catch (err) {
        console.error("Error fetching home data:", err);
        toast.error("Failed to load home data");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-gray-50">
      {/* HERO CAROUSEL */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop
      >
        {heroSlides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative">
              <img src={slide.image} alt={slide.title} className="w-full h-[500px] object-cover" />
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-center px-4">
                <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
                <p className="mb-4">{slide.description}</p>
                <Link to="/challenges">
                  <button className="bg-green-600 px-6 py-2 rounded hover:bg-green-700">View Challenges</button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* LIVE STATS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12 px-6">
        <StatCard title="CO₂ Saved" value={`${stats.totalCO2} kg`} />
        <StatCard title="Plastic Reduced" value={`${stats.totalPlastic} kg`} />
        <StatCard title="Energy Saved" value={`${stats.totalEnergy} kWh`} />
      </section>

      {/* ACTIVE CHALLENGES */}
      <Section title="Active Challenges">
        {challenges.length === 0 ? (
          <p className="text-center text-gray-500">No challenges available</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {challenges.slice(0, 6).map((ch) => (
              <Card key={ch._id}>
                <img src={ch.imageUrl || DEFAULT_IMAGE} alt={ch.title} className="h-40 w-full object-cover rounded mb-2" />
                <h3 className="font-semibold">{ch.title || "Untitled"}</h3>
                <p className="text-sm text-gray-600">{ch.category || "General"}</p>
                <p className="text-xs text-gray-500">{ch.metric || ""}</p>
                <JoinButton challengeId={ch._id} />
              </Card>
            ))}
          </div>
        )}
      </Section>

      {/* RECENT TIPS */}
      <Section title="Recent Tips">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tips.map((tip) => (
            <Card key={tip._id}>
              <h3 className="font-semibold">{tip.title || "Untitled Tip"}</h3>
              <p className="text-sm">By {tip.authorName || "Anonymous"}</p>
              <p className="text-xs text-gray-500">Upvotes: {tip.upvotes ?? 0}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* UPCOMING EVENTS */}
      <Section title="Upcoming Events">
        {events.length === 0 ? (
          <p className="text-center text-gray-500">No events upcoming</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {events.map((ev) => (
              <Card key={ev._id}>
                <h3 className="font-semibold">{ev.title || "Untitled Event"}</h3>
                <p className="text-sm">{ev.location || "Location TBA"}</p>
                <p className="text-xs text-gray-500">{ev.date ? new Date(ev.date).toLocaleDateString() : "TBA"}</p>
              </Card>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}

// Helper Components
function Section({ title, children }) {
  return (
    <section className="px-6 my-16">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-700">{title}</h2>
      {children}
    </section>
  );
}

function Card({ children }) {
  return <div className="bg-white p-4 rounded shadow hover:shadow-lg transition">{children}</div>;
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded shadow text-center">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-2xl text-green-600 font-bold">{value}</p>
    </div>
  );
}
