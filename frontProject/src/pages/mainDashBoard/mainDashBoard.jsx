
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MainDashBoard() {
  const token = useSelector((s) => s.UserInfo?.token);
  const isLogged = Boolean(token);
  const navigate = useNavigate();

  const apiBase =
    import.meta.env.VITE_API ||
    `https://backend-a2qq.onrender.com/api`;

  const [slideIndex, setSlideIndex] = useState(0);
  const [topOrders, setTopOrders] = useState([]);
  const [loadingTop, setLoadingTop] = useState(true);
  const [imagesByCategory, setImagesByCategory] = useState({});

  const apiOrigin = useMemo(() => {
    const m = String(apiBase || "").match(/^(.+?)\/api\/?$/);
    return m ? m[1] : "";
  }, [apiBase]);

  const resolveImage = (u) => {
    if (!u) return "";
    const s = String(u).trim();
    if (/^https?:\/\//i.test(s)) return s;
    if (s.startsWith("/")) return `${apiOrigin}${s}`;
    return s;
  };

  const categories = useMemo(
    () => [
      {
        key: "arts",
        name: "Arts & Creativity",
        dir: "/dashboardImages/Arts & Creativity/",
        fallback: "/dashboardImages/Arts & Creativity/Arts & Creativity10.jpg",
      },
      {
        key: "handmade",
        name: "Handmade & Crafts",
        dir: "/dashboardImages/Handmade & Crafts/",
        fallback: "/dashboardImages/Handmade & Crafts/Handmade & Crafts5.jpg",
      },
      {
        key: "beauty",
        name: "Beauty & Style",
        dir: "/dashboardImages/Beauty & Style/",
        fallback: "/dashboardImages/Beauty & Style/Beauty & Style3.webp",
      },
      {
        key: "learning",
        name: "Learning & Coaching",
        dir: "/dashboardImages/Learning & Coaching/",
        fallback: "/dashboardImages/Learning & Coaching/Learning & Coaching4.jpg",
      },
      {
        key: "local",
        name: "Local Services",
        dir: "/dashboardImages/Local Services/",
        fallback: "/dashboardImages/Local Services/Local Services6.jpg",
      },
      {
        key: "traditional",
        name: "Traditional & Cultural",
        dir: "/dashboardImages/Traditional & Cultural/",
        fallback:
          "/dashboardImages/Traditional & Cultural/Traditional & Cultural15.jpg",
      },
    ],
    []
  );

  const heroSlides = useMemo(() => {
    const picks = [];
    for (const c of categories) {
      const arr = imagesByCategory[c.key];
      if (Array.isArray(arr) && arr.length) picks.push({ src: arr[0], caption: c.name, sub: "Discover more" });
    }
    if (picks.length) return picks;
    return [
      {
        src: "/dashboardImages/Arts & Creativity/Arts & Creativity1.jpg",
        caption: "Discover trusted providers",
        sub: "Photography, henna, face painting, accessories, and more",
      },
      {
        src: "/dashboardImages/Beauty & Style/Beauty & Style1.webp",
        caption: "Book services in minutes",
        sub: "Fast, simple, and secure experience",
      },
      {
        src: "/dashboardImages/Handmade & Crafts/Handmade & Crafts1.jpg",
        caption: "Find what suits your event",
        sub: "Quality work and fair prices",
      },
    ];
  }, [categories, imagesByCategory]);

  useEffect(() => {
    const t = setInterval(
      () => setSlideIndex((i) => (i + 1) % heroSlides.length),
      3500
    );
    return () => clearInterval(t);
  }, [heroSlides.length]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoadingTop(true);
        const { data } = await axios.get(`${apiBase}/topordered`);
        const items = Array.isArray(data?.items) ? data.items.slice(0, 3) : [];
        if (mounted) setTopOrders(items);
      } catch {
        if (mounted) setTopOrders([]);
      } finally {
        if (mounted) setLoadingTop(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [apiBase]);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch("/dashboardImages/manifest.json", { cache: "no-store" });
        if (!res.ok) throw new Error();
        const manifest = await res.json();
        if (!active) return;
        const mapped = {};
        for (const c of categories) {
          const list = manifest[c.key] || manifest[c.name] || [];
          const cleaned = Array.isArray(list)
            ? list.map((p) => String(p)).filter((s) => s && s.startsWith(c.dir))
            : [];
          mapped[c.key] = cleaned.length ? cleaned : [c.fallback];
        }
        setImagesByCategory(mapped);
      } catch {
        const mapped = {};
        for (const c of categories) mapped[c.key] = [c.fallback];
        setImagesByCategory(mapped);
      }
    })();
    return () => {
      active = false;
    };
  }, [categories]);

  const gotoLoginOr = (path) => {
    if (!isLogged) return navigate("/login");
    navigate(path);
  };

  const MediaBox = ({ src, alt, ratio = "aspect-[4/3]" }) => {
    const ok = Boolean(src);
    return (
      <div className={`relative w-full ${ratio} bg-[#102E50]/5 rounded-xl overflow-hidden`}>
        <div className="absolute inset-0 flex items-center justify-center p-2">
          {ok ? (
            <img
              src={src}
              alt={alt}
              className="max-h-full max-w-full object-contain"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div className="text-[#102E50]/40 text-xs">No image</div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FFF6E9] relative antialiased">
      {!isLogged && (
        <div
          onClick={() => navigate("/login")}
          className="absolute inset-0 z-40 cursor-pointer"
          style={{ background: "transparent" }}
        />
      )}

      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 pt-6 sm:pt-10">
          <div className="rounded-3xl bg-white shadow-[0_20px_60px_rgba(16,46,80,0.15)] ring-1 ring-[#102E50]/10">
            <div className="relative">
              {heroSlides.map((s, i) => (
                <div
                  key={i}
                  className={`transition-opacity duration-700 ${
                    i === slideIndex
                      ? "opacity-100"
                      : "opacity-0 pointer-events-none absolute inset-0"
                  }`}
                >
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="order-2 md:order-1 p-6 sm:p-10 flex items-center">
                      <div className="w-full">
                        <div className="inline-flex items-center gap-2 rounded-full border border-[#102E50]/15 px-3 py-1 text-[11px] font-semibold text-[#102E50] bg-[#F5C45E]/20">
                          Bidaya
                        </div>
                        <h1 className="mt-3 sm:mt-4 text-[#102E50] text-2xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
                          {s.caption}
                        </h1>
                        <p className="mt-2 sm:mt-3 text-[#102E50]/70 text-sm sm:text-base md:text-lg">
                          {s.sub}
                        </p>
                        <div className="mt-5 sm:mt-7 flex gap-3">
                          <button
                            onClick={() => gotoLoginOr("/userDashboard")}
                            className="rounded-xl bg-[#102E50] text-[#FFF6E9] px-5 py-3 text-sm sm:text-base font-bold shadow-[0_10px_30px_rgba(16,46,80,0.35)] hover:-translate-y-0.5 transition"
                          >
                            Explore Services
                          </button>
                          <button
                            onClick={() => gotoLoginOr("/userDashboard")}
                            className="rounded-xl bg-[#F5C45E] text-[#102E50] px-5 py-3 text-sm sm:text-base font-bold shadow-[0_10px_30px_rgba(245,196,94,0.40)] hover:-translate-y-0.5 transition"
                          >
                            Browse Categories
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="order-1 md:order-2 border-b md:border-b-0 md:border-l border-[#102E50]/10 bg-[#102E50]/5">
                      <div className="p-3 sm:p-6">
                        <div className="rounded-2xl bg-white ring-1 ring-[#102E50]/10 overflow-hidden">
                          <MediaBox src={s.src} alt={s.caption} ratio="aspect-[16/10]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {heroSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlideIndex(i)}
                    className={`h-2 w-6 rounded-full transition-all ${
                      i === slideIndex ? "bg-[#F5C45E]" : "bg-[#102E50]/15"
                    }`}
                    aria-label={`go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-3 sm:px-6 py-10 sm:py-14">
        <div className="mb-5 sm:mb-7 flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#102E50] tracking-tight">
            Categories
          </h2>
          <button
            onClick={() => gotoLoginOr("/userDashboard")}
            className="text-xs sm:text-sm font-semibold text-[#BE3D2A] underline underline-offset-4"
          >
            View All
          </button>
        </div>

        <div className="grid gap-4 sm:gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => {
            const arr = imagesByCategory[c.key] || [c.fallback];
            return (
              <div
                key={c.key}
                className="rounded-2xl bg-white ring-1 ring-[#102E50]/10 shadow-[0_14px_40px_rgba(16,46,80,0.08)] p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[#102E50] text-base sm:text-lg font-extrabold truncate">
                    {c.name}
                  </h3>
                  <button
                    onClick={() => gotoLoginOr("/userDashboard")}
                    className="text-[11px] sm:text-xs font-bold text-[#102E50] bg-[#E78B48]/30 px-2.5 py-1 rounded-full"
                  >
                    Open
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {arr.slice(0, 9).map((src, idx) => (
                    <div key={idx} className="rounded-lg overflow-hidden bg-[#102E50]/5">
                      <MediaBox src={src} alt={`${c.name} ${idx + 1}`} ratio="aspect-square" />
                    </div>
                  ))}
                </div>

                <div className="mt-3">
                  <div className="flex items-center justify-between text-[#102E50]/70 text-xs">
                    <span>{arr.length} images</span>
                    <button
                      onClick={() => gotoLoginOr("/userDashboard")}
                      className="underline"
                    >
                      View more
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-3 sm:px-6 pb-12 sm:pb-16">
        <div className="mb-5 sm:mb-7 flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#102E50] tracking-tight">
            Top Ordered
          </h2>
        </div>

        {loadingTop ? (
          <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white/80 backdrop-blur-sm shadow-[0_12px_40px_rgba(16,46,80,0.08)] overflow-hidden ring-1 ring-[#102E50]/10 animate-pulse"
              >
                <div className="aspect-[4/3] bg-[#102E50]/10" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-[#102E50]/10 rounded w-3/4" />
                  <div className="h-3 bg-[#102E50]/5 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : topOrders.length === 0 ? (
          <div className="text-[#102E50]/70 text-sm sm:text-base">No data yet.</div>
        ) : (
          <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {topOrders.map((p) => {
              const img = resolveImage(p.image_url || p.image);
              return (
                <button
                  key={p.product_id}
                  onClick={() =>
                    isLogged
                      ? navigate(`/productdatails?product_id=${p.product_id}`, {
                          state: { product_id: p.product_id },
                        })
                      : navigate("/login")
                  }
                  className="group rounded-2xl bg-white ring-1 ring-[#102E50]/10 hover:ring-[#F5C45E] shadow-[0_14px_50px_rgba(16,46,80,0.10)] overflow-hidden text-left transition"
                >
                  <MediaBox src={img} alt={p.name || `#${p.product_id}`} ratio="aspect-[4/3]" />
                  <div className="p-4">
                    <div className="font-extrabold text-[#102E50] text-sm sm:text-base truncate">
                      {p.name || `#${p.product_id}`}
                    </div>
                    {p.price !== undefined && p.price !== null && (
                      <div className="mt-2 flex items-center gap-2">
                        <span className="rounded-md bg-[#F5C45E] px-2.5 py-1 text-[#102E50] text-xs sm:text-sm font-extrabold shadow">
                          {Number(p.price).toLocaleString("en-US")} JD
                        </span>
                        <span className="rounded-md bg-[#BE3D2A] px-2 py-1 text-white text-[10px] uppercase tracking-wide shadow-sm">
                          Top
                        </span>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-3 sm:px-6 pb-16 sm:pb-20">
        <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white ring-1 ring-[#102E50]/10 shadow-[0_14px_50px_rgba(16,46,80,0.10)] overflow-hidden">
            <MediaBox
              src="/dashboardImages/Local Services/Local Services3.jpg"
              alt="Photography session"
              ratio="aspect-[16/10]"
            />
            <div className="p-4">
              <div className="border-b border-[#102E50]/15 pb-2 mb-3">
                <h3 className="font-extrabold text-[#102E50] truncate">Featured Session</h3>
              </div>
              <div className="flex items-center justify-between text-[#102E50]/80 text-sm sm:text-base">
                <span>Amman</span>
                <span className="font-extrabold text-[#BE3D2A]">50 JD</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white ring-1 ring-[#102E50]/10 shadow-[0_14px_50px_rgba(16,46,80,0.10)] overflow-hidden">
            <MediaBox
              src="/dashboardImages/Handmade & Crafts/Handmade & Crafts18.jpg"
              alt="Handmade accessories"
              ratio="aspect-[16/10]"
            />
            <div className="p-4">
              <div className="border-b border-[#102E50]/15 pb-2 mb-3">
                <h3 className="font-extrabold text-[#102E50] truncate">Handmade Picks</h3>
              </div>
              <div className="flex items-center justify-between text-[#102E50]/80 text-sm sm:text-base">
                <span>Irbid</span>
                <span className="font-extrabold text-[#BE3D2A]">15 JD</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white ring-1 ring-[#102E50]/10 shadow-[0_14px_50px_rgba(16,46,80,0.10)] overflow-hidden">
            <MediaBox
              src="/dashboardImages/Beauty & Style/Beauty & Style4.jpeg"
              alt="Event makeup"
              ratio="aspect-[16/10]"
            />
            <div className="p-4">
              <div className="border-b border-[#102E50]/15 pb-2 mb-3">
                <h3 className="font-extrabold text-[#102E50] truncate">Beauty & Style</h3>
              </div>
              <div className="flex items-center justify-between text-[#102E50]/80 text-sm sm:text-base">
                <span>Zarqa</span>
                <span className="font-extrabold text-[#BE3D2A]">30 JD</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-7 sm:mt-9 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
          <button
            onClick={() => gotoLoginOr("/userDashboard")}
            className="rounded-2xl bg-[#102E50] text-[#FFF6E9] py-3.5 sm:py-4 font-extrabold shadow-[0_14px_40px_rgba(16,46,80,0.35)] hover:-translate-y-0.5 transition ring-2 ring-[#102E50]/20 text-sm sm:text-base"
          >
            10M+ Active Providers
          </button>
          <button
            onClick={() => gotoLoginOr("/userDashboard")}
            className="rounded-2xl bg-[#E78B48] text-[#102E50] py-3.5 sm:py-4 font-extrabold shadow-[0_14px_40px_rgba(231,139,72,0.35)] hover:-translate-y-0.5 transition ring-2 ring-[#E78B48]/25 text-sm sm:text-base"
          >
            100M+ Orders Completed
          </button>
          <button
            onClick={() => gotoLoginOr("/userDashboard")}
            className="rounded-2xl bg-[#F5C45E] text-[#102E50] py-3.5 sm:py-4 font-extrabold shadow-[0_14px_40px_rgba(245,196,94,0.40)] hover:-translate-y-0.5 transition ring-2 ring-[#F5C45E]/25 text-sm sm:text-base"
          >
            50M+ Happy Customers
          </button>
        </div>
      </section>
    </div>
  );
}


//----