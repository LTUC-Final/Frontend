"use client";

import { useEffect, useMemo, useState } from "react";
import img2 from "../../assets/jordanian-artisan-working-on-handmade-crafts.jpg";
import img1 from "../../assets/jordanian-creators-collaborating-on-creative-proje.jpg";

import img3 from "../../assets/jordanian-marketplace-with-local-products.jpg";

import axios from "axios";
import img5 from "../../assets/handmade-jewelry.png";
import img6 from "../../assets/professional-makeup-artist.jpg";
import img4 from "../../assets/professional-photo-session.png";
import img12 from "../../assets/traditional-jordanian-culture (2).jpg";

import { Brush, LibraryBig, Scissors, Shirt, Smile, Store, Volleyball } from "lucide-react";
import img11 from "../../assets/arts-and-creativity-workspace (1).jpg";
import img7 from "../../assets/handmade-crafts-and-artisan-work.jpg";
import img8 from "../../assets/learning-and-education.jpg";
import img10 from "../../assets/professional-makeup-artist.jpg";
import img9 from "../../assets/traditional-jordanian-culture.jpg";

export default function MainDashBoard1() {
  const port = import.meta.env.VITE_PORT;

  const [slideIndex, setSlideIndex] = useState(0);
  const [topOrders, setTopOrders] = useState([]);
  const [loadingTop, setLoadingTop] = useState(false);
  const [imagesByCategory, setImagesByCategory] = useState({});
  const [isLogged] = useState(false); // Demo mode

  useEffect(() => {
    const fetchTopOrdered = async () => {
      try {
        const res = await axios.get(`https://backend-a2qq.onrender.com/api/topordered`
);
        console.log("res.data.items");
        console.log(res.data.items);

        console.log("res.data.items");

        setTopOrders(res.data.items);
      } catch (error) {
        console.error("Error fetching top ordered items:", error);
      }
    };
    fetchTopOrdered();
  }, [port]);

  const categories = useMemo(
    () => [
      {
        key: "arts",
        name: "Arts & Creativity",
        icon: <Brush />,
        description: "Photography, painting, digital art",
        color: "from-purple-500/20 to-pink-500/20",
        fallback: "/arts-and-creativity-workspace.jpg",
        image: img11,
      },
      {
        key: "handmade",
        name: "Handmade & Crafts",
        icon: <Scissors />,
        description: "Unique handcrafted items",
        color: "from-amber-500/20 to-orange-500/20",
        fallback: "/handmade-crafts-and-artisan-work.jpg",
        image: img7,
      },
      {
        key: "beauty",
        name: "Beauty & Style",
        icon: <Smile />,
        description: "Makeup, styling, fashion",
        color: "from-rose-500/20 to-red-500/20",
        fallback: "/beauty-and-style-services.jpg",
        image: img10,
      },
      {
        key: "learning",
        name: "Learning & Coaching",
        icon: <LibraryBig />,
        description: "Courses, tutoring, mentorship",
        color: "from-blue-500/20 to-cyan-500/20",
        fallback: "/learning-and-education.jpg",
        image: img8,
      },
      {
        key: "local",
        name: "Local Services",
        icon:<Store />,
        description: "Community services nearby",
        color: "from-green-500/20 to-emerald-500/20",
        fallback: "/local-services-and-community.jpg",
        image: img9,
      },
      {
        key: "traditional",
        name: "Traditional & Cultural",
        icon: <Volleyball />,
        description: "Heritage and cultural services",
        color: "from-yellow-500/20 to-amber-500/20",
        fallback: "/traditional-jordanian-culture.jpg",
        image: img12,
      },
    ],
    []
  );

  const heroSlides = useMemo(
    () => [
      {
        src: img2,
        caption: "Book Services in Minutes",
        sub: "Fast, simple, and secure experience",
        gradient: "from-[#E78B48] via-[#f5a563] to-[#E78B48]",
      },
      {
        src: img1,
        caption: "Discover Trusted Providers",
        sub: "Photography, henna, face painting, accessories, and more",
        gradient: "from-[#102E50] via-[#1a4570] to-[#102E50]",
      },

      {
        src: img3,
        caption: "Find What Suits Your Event",
        sub: "Quality work and fair prices",
        gradient: "from-[#F5C45E] via-[#ffd77a] to-[#F5C45E]",
      },
    ],
    []
  );

  useEffect(() => {
    const t = setInterval(
      () => setSlideIndex((i) => (i + 1) % heroSlides.length),
      4500
    );
    return () => clearInterval(t);
  }, [heroSlides.length]);

  // Demo data
  useEffect(() => {
    setTopOrders([
      {
        product_id: 1,
        name: "Professional Photography",
        price: 50,
        image: img4,
      },
      {
        product_id: 2,
        name: "Handmade Jewelry",
        price: 15,
        image: img5,
      },
      {
        product_id: 3,
        name: "Event Makeup",
        price: 30,
        image: img6,
      },
    ]);
  }, []);

  const MediaBox = ({ src, alt, ratio = "aspect-[4/3]" }) => {
    return (
      <div
        className={`relative w-full ${ratio} bg-gradient-to-br from-[#102E50]/5 to-[#F5C45E]/5 rounded-2xl overflow-hidden group-hover:scale-[1.02] transition-transform duration-500`}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={src || "/placeholder.svg"}
            alt={alt}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#102E50]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF6E9] via-[#FFF6E9] to-[#F5C45E]/10 relative antialiased">
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #102E50 1px, transparent 0)`,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 lg:pt-16">
          <div className="rounded-[2rem] bg-white/80 backdrop-blur-xl shadow-[0_32px_64px_rgba(16,46,80,0.12)] ring-1 ring-[#102E50]/5 overflow-hidden hover:shadow-[0_40px_80px_rgba(16,46,80,0.16)] transition-all duration-500">
            <div className="relative">
              {heroSlides.map((s, i) => (
                <div
                  key={i}
                  className={`transition-all duration-1000 ${
                    i === slideIndex
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none absolute inset-0"
                  }`}
                >
                  <div className="grid lg:grid-cols-2 gap-0">
                    {/* Content Side */}
                    <div className="order-2 lg:order-1 p-8 sm:p-12 lg:p-16 flex items-center relative overflow-hidden">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${s.gradient} opacity-5 animate-pulse`}
                      />

                      <div className="w-full relative z-10">
                        <div className="inline-flex items-center gap-2 rounded-full border-2 border-[#F5C45E]/30 bg-gradient-to-r from-[#F5C45E]/10 to-[#E78B48]/10 px-4 py-2 text-xs font-bold text-[#102E50] backdrop-blur-sm shadow-lg animate-fade-in-up">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F5C45E] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F5C45E]"></span>
                          </span>
                          BidayaMart
                        </div>

                        <h1 className="mt-6 text-[#102E50] text-3xl sm:text-4xl lg:text-6xl font-black leading-[1.1] tracking-tight text-balance animate-fade-in-up [animation-delay:100ms]">
                          {s.caption}
                        </h1>
                        <p className="mt-4 text-[#102E50]/70 text-base sm:text-lg lg:text-xl leading-relaxed text-pretty animate-fade-in-up [animation-delay:200ms]">
                          {s.sub}
                        </p>

                        <div className="mt-8 flex flex-col sm:flex-row gap-4 animate-fade-in-up [animation-delay:300ms]">
                          <button className="group relative rounded-2xl bg-[#102E50] text-[#FFF6E9] px-8 py-4 text-base font-bold shadow-[0_20px_40px_rgba(16,46,80,0.3)] hover:shadow-[0_24px_48px_rgba(16,46,80,0.4)] hover:-translate-y-1 active:translate-y-0 transition-all duration-300 overflow-hidden">
                            <span className="relative z-10">
                              Explore Services
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-[#1a4570] to-[#102E50] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </button>
                          <button className="group relative rounded-2xl bg-gradient-to-r from-[#F5C45E] to-[#E78B48] text-[#102E50] px-8 py-4 text-base font-bold shadow-[0_20px_40px_rgba(245,196,94,0.35)] hover:shadow-[0_24px_48px_rgba(245,196,94,0.45)] hover:-translate-y-1 active:translate-y-0 transition-all duration-300">
                            <span className="relative z-10">
                              Browse Categories
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Image Side */}
                    <div className="order-1 lg:order-2 border-b lg:border-b-0 lg:border-l border-[#102E50]/5 bg-gradient-to-br from-[#102E50]/5 to-transparent relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-[#F5C45E]/10 rounded-full blur-3xl" />
                      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#E78B48]/10 rounded-full blur-3xl" />

                      <div className="relative p-6 sm:p-8 lg:p-12 h-full flex items-center">
                        <div className="w-full rounded-3xl bg-white/50 backdrop-blur-sm ring-1 ring-[#102E50]/10 overflow-hidden shadow-2xl group">
                          <MediaBox
                            src={s.src}
                            alt={s.caption}
                            ratio="aspect-[4/3]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-20">
                {heroSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlideIndex(i)}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      i === slideIndex
                        ? "w-12 bg-gradient-to-r from-[#F5C45E] to-[#E78B48] shadow-lg"
                        : "w-2 bg-[#102E50]/20 hover:bg-[#102E50]/40"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#102E50] tracking-tight text-balance">
              Explore Categories
            </h2>
            <p className="mt-2 text-[#102E50]/60 text-base sm:text-lg">
              Find the perfect service for your needs
            </p>
          </div>
          <button className="hidden sm:flex items-center gap-2 text-sm font-bold text-[#BE3D2A] hover:text-[#BE3D2A]/80 transition-colors group">
            View All
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, idx) => (
            <div
              key={c.key}
              className="group rounded-3xl bg-white/80 backdrop-blur-sm ring-1 ring-[#102E50]/5 shadow-[0_20px_50px_rgba(16,46,80,0.08)] hover:shadow-[0_28px_64px_rgba(16,46,80,0.14)] p-6 transition-all duration-500 hover:-translate-y-2 cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${c.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F5C45E]/20 to-[#E78B48]/20 flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {c.icon}
                    </div>
                    <div>
                      <h3 className="text-[#102E50] text-lg font-black">
                        {c.name}
                      </h3>
                      <p className="text-[#102E50]/60 text-xs mt-0.5">
                        {c.description}
                      </p>
                    </div>
                  </div>
                  <button className="rounded-full bg-[#E78B48]/20 group-hover:bg-[#E78B48] text-[#102E50] group-hover:text-white px-4 py-2 text-xs font-bold transition-all duration-300 shadow-sm">
                    View
                  </button>
                </div>

                <div className="mt-4">
                  <div
                    key={idx}
                    className="relative w-full h-56 sm:h-64 lg:h-72 rounded-2xl overflow-hidden bg-[#102E50]/5 ring-1 ring-[#102E50]/5 group/img"
                  >
                    <img
                      src={c.image}
                      alt={`${c.name} ${idx + 1}`}
                      className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-[#102E50]/10 flex items-center justify-between text-xs text-[#102E50]/60">
                  <span className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    1.2k+ providers
                  </span>
                  <button className="font-semibold text-[#BE3D2A] hover:underline">
                    Explore →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Ordered Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-24">
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#102E50] tracking-tight">
            Top Ordered Services
          </h2>
          <p className="mt-2 text-[#102E50]/60 text-base sm:text-lg">
            Most popular choices from our community
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {topOrders.map((p, idx) => (
            <div
              key={p.product_id}
              className="group rounded-3xl bg-white/80 backdrop-blur-sm ring-1 ring-[#102E50]/5 hover:ring-[#F5C45E] shadow-[0_20px_50px_rgba(16,46,80,0.10)] hover:shadow-[0_28px_64px_rgba(245,196,94,0.25)] overflow-hidden transition-all duration-500 hover:-translate-y-2 cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="relative">
                <MediaBox src={p.image_url} alt={p.name} ratio="aspect-[4/3]" />
                <div className="absolute top-4 right-4 rounded-full bg-gradient-to-r from-[#BE3D2A] to-[#E78B48] px-4 py-2 text-white text-xs font-bold shadow-xl flex items-center gap-2 animate-bounce-subtle">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Top
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-black text-[#102E50] text-xl mb-3 group-hover:text-[#E78B48] transition-colors">
                  {p.name}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-[#102E50]">
                      {p.price}
                    </span>
                    <span className="text-sm font-bold text-[#102E50]/60">
                      JD
                    </span>
                  </div>
                  <button className="rounded-xl bg-gradient-to-r from-[#F5C45E] to-[#E78B48] text-[#102E50] px-6 py-3 text-sm font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24 lg:pb-32">
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-3">
          {[
            {
              label: "Active Providers",
              value: "10M+",
              icon: "👥",
              color: "from-[#102E50] to-[#1a4570]",
            },
            {
              label: "Orders Completed",
              value: "100M+",
              icon: "📦",
              color: "from-[#E78B48] to-[#f5a563]",
            },
            {
              label: "Happy Customers",
              value: "50M+",
              icon: "⭐",
              color: "from-[#F5C45E] to-[#ffd77a]",
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="group relative rounded-3xl bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-sm ring-1 ring-[#102E50]/5 shadow-[0_20px_50px_rgba(16,46,80,0.10)] hover:shadow-[0_28px_64px_rgba(16,46,80,0.16)] p-8 transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              />

              <div className="relative z-10 text-center">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {/* {stat.icon} */}
                </div>
                <div className="text-5xl sm:text-6xl font-black text-[#102E50] mb-2 group-hover:scale-105 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-base font-bold text-[#102E50]/70">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
