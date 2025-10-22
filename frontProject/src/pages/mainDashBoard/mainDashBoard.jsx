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
    `http://localhost:${import.meta.env.VITE_PORT}/api`;

  console.log("asdasd", apiBase);

  
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

  const handlePageClick = () => {
    if (!isLogged) navigate("/login");
  };

  return (
    <div
      className="min-h-screen bg-[#FFF6E9]"
      onClick={handlePageClick}
      style={isLogged ? { pointerEvents: "none" } : {}}
    >
      <section className="relative overflow-hidden rounded-b-[2.2rem] shadow-2xl">
        <div className="pointer-events-none absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_20%_-10%,#F5C45E_0,transparent_40%),radial-gradient(circle_at_120%_40%,#BE3D2A_0,transparent_35%)]" />
        <div className="relative aspect-[16/10] sm:aspect-[16/8] md:aspect-[16/7] lg:aspect-[16/6]">
          {heroSlides.map((s, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-all duration-700 ${
                i === slideIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
              }`}
              aria-hidden={i !== slideIndex}
            >
              <img
                src={s.src}
                alt={s.caption}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[#102E50]/60 backdrop-blur-[1px]" />
              <div className="absolute inset-x-0 bottom-4 sm:bottom-6 md:bottom-10 mx-auto max-w-6xl px-3 sm:px-4">
                <h1 className="text-[#FFF6E9] text-lg sm:text-2xl md:text-5xl font-extrabold drop-shadow-[0_4px_12px_rgba(16,46,80,0.55)] tracking-wide text-center sm:text-left">
                  {s.caption}
                </h1>
                <div className="flex justify-center sm:justify-start">
                  <button className="mt-3 sm:mt-5 rounded-xl sm:rounded-2xl bg-[#F5C45E] px-4 sm:px-6 py-2 sm:py-2.5 text-[#102E50] text-sm sm:text-base font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 active:translate-y-0 ring-4 ring-[#F5C45E]/20">
                    استكشف الخدمات
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2.5">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlideIndex(i)}
              className={`h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full transition-all ring-2 ring-[#FFF6E9]/80 shadow ${
                i === slideIndex
                  ? "bg-[#F5C45E] scale-110"
                  : "bg-[#FFF6E9]/60 hover:bg-[#FFF6E9]/80"
              }`}
              aria-label={`go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-3 sm:px-4 py-8 sm:py-10">
        <div className="mb-4 sm:mb-6 flex items-center justify-between gap-3">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#102E50]">
            الفئات
          </h2>
          <button className="text-xs sm:text-sm text-[#BE3D2A] hover:underline hover:opacity-90 transition">
            عرض الكل
          </button>
        </div>

        <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {categories.map((c) => (
            <button
              key={c.key}
              className="group overflow-hidden rounded-xl sm:rounded-2xl bg-[#FFF6E9] shadow-sm hover:shadow-2xl ring-1 ring-[#102E50]/10 hover:ring-[#F5C45E] transition-all hover:-translate-y-0.5"
            >
              <div className="relative aspect-[4/3] sm:aspect-[5/4]">
                <img
                  src={c.image}
                  alt={c.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-x-0 bottom-0 h-16 sm:h-20 bg-gradient-to-t from-[#102E50]/80 to-transparent" />
                <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 text-[#FFF6E9]">
                  <h3 className="text-sm sm:text-base font-semibold tracking-wide drop-shadow line-clamp-1">
                    {c.name}
                  </h3>
                </div>
                <div className="absolute top-2 sm:top-3 left-2 sm:left-3 rounded-full px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs font-semibold bg-[#E78B48] text-[#102E50] shadow-lg animate-pulse">
                  جديد
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-3 sm:px-4 pb-10 sm:pb-12">
        <div className="mb-4 sm:mb-6 flex items-center justify-between">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#102E50]">
            الأكثر طلبًا
          </h2>
        </div>

        {loadingTop ? (
          <div className="grid gap-3 sm:gap-4 grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="rounded-xl sm:rounded-2xl bg-[#FFF6E9] shadow-sm overflow-hidden animate-pulse ring-1 ring-[#102E50]/10"
              >
                <div className="aspect-[16/11] bg-[#102E50]/10" />
                <div className="p-3 sm:p-4 space-y-2">
                  <div className="h-4 bg-[#102E50]/10 rounded w-3/4" />
                  <div className="h-3 bg-[#102E50]/5 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : topOrders.length === 0 ? (
          <div className="text-[#102E50]/70 text-sm sm:text-base">
            لا توجد بيانات حتى الآن.
          </div>
        ) : (
          <div className="grid gap-3 sm:gap-4 grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
            {topOrders.map((p) => (
              <div
                key={p.product_id}
                className="group rounded-xl sm:rounded-2xl bg-[#FFF6E9] shadow-sm hover:shadow-2xl overflow-hidden text-left transition-all ring-1 ring-[#102E50]/10 hover:ring-[#F5C45E] hover:-translate-y-0.5"
              >
                <div className="relative aspect-[16/11]">
                  <img
                    src={
                      p.image_url ||
                      p.image ||
                      "https://via.placeholder.com/800x600"
                    }
                    alt={p.name || `#${p.product_id}`}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://via.placeholder.com/800x600";
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-[#102E50]/85 via-[#102E50]/40 to-transparent text-[#FFF6E9]">
                    <div className="font-semibold text-sm sm:text-base line-clamp-1">
                      {p.name || `#${p.product_id}`}
                    </div>
                    {p.price !== undefined && p.price !== null && (
                      <div className="text-[11px] sm:text-sm mt-1 inline-flex items-center gap-1.5 sm:gap-2">
                        <span className="rounded-md bg-[#F5C45E] px-2 py-0.5 text-[#102E50] font-bold shadow">
                          {Number(p.price).toLocaleString("en-US")} JD
                        </span>
                        <span className="text-[9px] sm:text-[10px] uppercase tracking-wide bg-[#BE3D2A] px-2 py-0.5 rounded-md text-white shadow-sm">
                          Top
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(ellipse_at_center,rgba(245,196,94,0.15),transparent_60%)]" />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-3 sm:px-4 pb-14 sm:pb-16">
        <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
          <div className="rounded-xl sm:rounded-2xl bg-[#FFF6E9] shadow-md overflow-hidden ring-1 ring-[#102E50]/10 hover:shadow-2xl transition-all hover:-translate-y-0.5">
            <div className="w-full aspect-[16/10]">
              <img
                src="https://images.unsplash.com/photo-1505238680356-667803448bb6?q=80&w=1200"
                alt="Photography session"
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/800x600";
                }}
              />
            </div>
            <div className="p-3 sm:p-4">
              <div className="border-b border-[#102E50]/15 pb-2 mb-3">
                <h3 className="font-semibold text-[#102E50] truncate">
                  جلسة تصوير فوتوغرافي
                </h3>
              </div>
              <div className="flex items-center justify-between text-[#102E50]/80 text-sm sm:text-base">
                <span>Amman</span>
                <span className="font-semibold text-[#BE3D2A]">50 JD</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl sm:rounded-2xl bg-[#FFF6E9] shadow-md overflow-hidden ring-1 ring-[#102E50]/10 hover:shadow-2xl transition-all hover:-translate-y-0.5">
            <div className="w-full aspect-[16/10]">
              <img
                src="https://images.unsplash.com/photo-1599848294391-d13afb0db2ae?q=80&w=1200"
                alt="Handmade accessories"
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/800x600";
                }}
              />
            </div>
            <div className="p-3 sm:p-4">
              <div className="border-b border-[#102E50]/15 pb-2 mb-3">
                <h3 className="font-semibold text-[#102E50] truncate">
                  إكسسوارات يدوية
                </h3>
              </div>
              <div className="flex items-center justify-between text-[#102E50]/80 text-sm sm:text-base">
                <span>Irbid</span>
                <span className="font-semibold text-[#BE3D2A]">15 JD</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl sm:rounded-2xl bg-[#FFF6E9] shadow-md overflow-hidden ring-1 ring-[#102E50]/10 hover:shadow-2xl transition-all hover:-translate-y-0.5">
            <div className="w-full aspect-[16/10]">
              <img
                src="https://images.unsplash.com/photo-1607083206968-13611e3c3b62?q=80&w=1200"
                alt="Event makeup"
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/800x600";
                }}
              />
            </div>
            <div className="p-3 sm:p-4">
              <div className="border-b border-[#102E50]/15 pb-2 mb-3">
                <h3 className="font-semibold text-[#102E50] truncate">
                  مكياج مناسبات
                </h3>
              </div>
              <div className="flex items-center justify-between text-[#102E50]/80 text-sm sm:text-base">
                <span>Zarqa</span>
                <span className="font-semibold text-[#BE3D2A]">30 JD</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
          <button className="rounded-xl sm:rounded-2xl bg-[#102E50] text-[#FFF6E9] py-3 sm:py-4 font-semibold shadow-lg hover:shadow-2xl transition-all hover:-translate-y-0.5 ring-2 ring-[#102E50]/20 text-sm sm:text-base">
            10M+ Active Provider
          </button>
          <button className="rounded-xl sm:rounded-2xl bg-[#E78B48] text-[#102E50] py-3 sm:py-4 font-semibold shadow-lg hover:shadow-2xl transition-all hover:-translate-y-0.5 ring-2 ring-[#E78B48]/20 text-sm sm:text-base">
            100M+ Order Completed
          </button>
          <button className="rounded-xl sm:rounded-2xl bg-[#F5C45E] text-[#102E50] py-3 sm:py-4 font-semibold shadow-lg hover:shadow-2xl transition-all hover:-translate-y-0.5 ring-2 ring-[#F5C45E]/20 text-sm sm:text-base">
            50M+ Happy Customer
          </button>
        </div>
      </section>
    </div>
  );
}
