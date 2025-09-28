import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MainDashboard() {
  const token = useSelector((s) => s.UserInfo?.token);
  const isLogged = Boolean(token);
  const navigate = useNavigate();

  const apiBase =
    import.meta.env.VITE_API ||
    `http://localhost:${import.meta.env.VITE_PORT}/api`;

  const [slideIndex, setSlideIndex] = useState(0);
  const [topOrders, setTopOrders] = useState([]);
  const [loadingTop, setLoadingTop] = useState(true);

  const heroSlides = useMemo(
    () => [
      {
        src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600",
        caption: "اكتشف مزودي الخدمات المميزين",
      },
      {
        src: "https://images.unsplash.com/photo-1520975960620-27f0f1413d76?q=80&w=1600",
        caption: "تصوير، حِنّة، رسم وجه، إكسسوارات وأكثر",
      },
      {
        src: "https://images.unsplash.com/photo-1541533260371-b8fc9b596d86?q=80&w=1600",
        caption: "احجز خدمتك بسرعة وسهولة",
      },
    ],
    []
  );

  const categories = useMemo(
    () => [
      {
        key: "photography",
        name: "تصوير",
        image:
          "https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1200",
      },
      {
        key: "handmade",
        name: "صناعات يدوية",
        image:
          "https://images.unsplash.com/photo-1599848294391-d13afb0db2ae?q=80&w=1200",
      },
      {
        key: "facepaint",
        name: "رسم على الوجه",
        image:
          "https://images.unsplash.com/photo-1506792006437-256b665541e4?q=80&w=1200",
      },
      {
        key: "accessories",
        name: "إكسسوارات",
        image:
          "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1200",
      },
      {
        key: "logo-design",
        name: "تصميم شعارات",
        image:
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200",
      },
    ],
    []
  );

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
        if (mounted) setTopOrders(Array.isArray(data?.items) ? data.items : []);
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

  const handleAnyClick = () => {
    if (!isLogged) navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO */}
      <section className="relative h-[360px] md:h-[480px] overflow-hidden">
        {heroSlides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === slideIndex ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={i !== slideIndex}
          >
            <img
              src={s.src}
              alt={s.caption}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-x-0 bottom-10 mx-auto max-w-6xl px-4">
              <h1 className="text-white text-2xl md:text-4xl font-bold">
                {s.caption}
              </h1>
              <button
                onClick={handleAnyClick}
                className={`mt-4 rounded-xl bg-white px-5 py-2 text-gray-900 font-semibold shadow hover:shadow-md ${
                  isLogged ? "pointer-events-none" : ""
                }`}
              >
                استكشف الخدمات
              </button>
            </div>
          </div>
        ))}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlideIndex(i)}
              className={`h-2 w-2 rounded-full ${
                i === slideIndex ? "bg-white" : "bg-white/50"
              }`}
              aria-label={`go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-bold">الفئات</h2>
          <button
            onClick={handleAnyClick}
            className={`text-sm text-blue-600 hover:underline ${
              isLogged ? "pointer-events-none" : ""
            }`}
          >
            عرض الكل
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={handleAnyClick}
              className={`group overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-lg transition ${
                isLogged ? "pointer-events-none cursor-default" : ""
              }`}
            >
              <div className="relative h-40">
                <img
                  src={c.image}
                  alt={c.name}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-semibold">{c.name}</h3>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* TOP ORDERED */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-bold">الأكثر طلبًا</h2>
        </div>

        {loadingTop ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white shadow-sm overflow-hidden animate-pulse"
              >
                <div className="h-40 bg-gray-200" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-100 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : topOrders.length === 0 ? (
          <div className="text-gray-500">لا توجد بيانات حتى الآن.</div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {topOrders.map((p) => (
              <button
                key={p.product_id}
                onClick={handleAnyClick}
                className={`group rounded-2xl bg-white shadow-sm hover:shadow-lg overflow-hidden text-left transition ${
                  isLogged ? "pointer-events-none cursor-default" : ""
                }`}
              >
                <div className="relative h-48">
                  <img
                    src={p.image_url || p.image || "https://via.placeholder.com/800x600"}
                    alt={p.name || `#${p.product_id}`}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 via-black/30 to-transparent text-white">
                    <div className="font-semibold line-clamp-1">
                      {p.name || `#${p.product_id}`}
                    </div>
                    {typeof p.price !== "undefined" && p.price !== null && (
                      <div className="text-sm opacity-90 mt-0.5">
                        {Number(p.price).toLocaleString("en-US")} JOD
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
