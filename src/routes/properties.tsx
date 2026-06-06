import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { X, SlidersHorizontal } from "lucide-react";
import { PropertyCard } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { properties, type PropertyType } from "@/lib/properties";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const Route = createFileRoute("/properties")({
  head: () => ({
    meta: [
      { title: "Properties — Saaranya" },
      { name: "description", content: "Browse verified residential, commercial and plot listings across India's leading cities." },
      { property: "og:title", content: "Properties — Saaranya" },
    ],
  }),
  component: PropertiesPage,
});

type TypeFilter = "All" | PropertyType;
type StatusFilter = "All" | "For Sale" | "For Rent";
type BudgetKey = "Any" | "u25" | "25-50" | "50-100" | "100-200" | "200+";
type BHKFilter = "All" | "1BHK" | "2BHK" | "3BHK" | "4BHK" | "4BHK+";

const budgets: { key: BudgetKey; label: string; min: number; max: number }[] = [
  { key: "Any", label: "Any budget", min: 0, max: Infinity },
  { key: "u25", label: "Under ₹25L", min: 0, max: 2_500_000 },
  { key: "25-50", label: "₹25L – ₹50L", min: 2_500_000, max: 5_000_000 },
  { key: "50-100", label: "₹50L – ₹1Cr", min: 5_000_000, max: 10_000_000 },
  { key: "100-200", label: "₹1Cr – ₹2Cr", min: 10_000_000, max: 20_000_000 },
  { key: "200+", label: "₹2Cr+", min: 20_000_000, max: Infinity },
];

function PropertiesPage() {
  const [type, setType] = useState<TypeFilter>("All");
  const [status, setStatus] = useState<StatusFilter>("All");
  const [budget, setBudget] = useState<BudgetKey>("Any");
  const [bhk, setBHK] = useState<BHKFilter>("All");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [showMore, setShowMore] = useState(false);
  const [furnishing, setFurnishing] = useState<string>("Any");
  const [amenities, setAmenities] = useState<string[]>([]);
  const [areaMax, setAreaMax] = useState<number>(60000);


  const allAmen = ["Parking", "Lift", "Garden", "Power Backup", "24/7 Security", "Gym", "Swimming Pool"];

  const filtered = useMemo(() => {
    const b = budgets.find((x) => x.key === budget)!;
    let res = properties.filter((p) => {
      if (type !== "All" && p.type !== type) return false;
      if (status !== "All" && p.status !== status && !(status === "For Sale" && p.status === "New")) return false;
      if (p.priceValue < b.min || p.priceValue > b.max) return false;
      if (bhk !== "All") {
        if (bhk === "4BHK+") {
          const n = parseInt(p.bhk ?? "0");
          if (!(n >= 4)) return false;
        } else if (p.bhk !== bhk) return false;
      }
      if (furnishing !== "Any" && p.furnishing !== furnishing) return false;
      if (amenities.length && !amenities.every((a) => p.amenities.includes(a))) return false;
      if (p.area > areaMax) return false;
      return true;
    });
    if (sort === "low") res = [...res].sort((a, b) => a.priceValue - b.priceValue);
    if (sort === "high") res = [...res].sort((a, b) => b.priceValue - a.priceValue);
    return res;
  }, [type, status, budget, bhk, sort, furnishing, amenities, areaMax]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mediaQuery.matches) {
        document.querySelectorAll(".reveal, .card-popup-3d, .cinematic-reveal, .cinematic-child").forEach((el) => {
          el.classList.add("is-visible");
          if (el instanceof HTMLElement) {
            el.style.opacity = "1";
            el.style.transform = "none";
            el.style.clipPath = "none";
          }
        });
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      // 1. Grid cards entrance / filter change trigger
      const cards = document.querySelectorAll(".grid-listings .card-popup-3d");
      if (cards.length > 0) {
        gsap.fromTo(cards,
          { opacity: 0, y: 60, scale: 0.94, rotateX: 8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: "cubic-bezier(0.22, 1, 0.36, 1)"
          }
        );
      }

      // 2. Cinematic heading reveals
      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>(".cinematic-reveal").forEach((heading) => {
          gsap.fromTo(heading,
            { clipPath: "inset(0 100% 0 0)", opacity: 0 },
            {
              clipPath: "inset(0 0% 0 0)",
              opacity: 1,
              duration: 0.7,
              ease: "power2.out",
              scrollTrigger: {
                trigger: heading,
                start: "top 85%",
                toggleActions: "play none none none"
              }
            }
          );
        });

        const cinematicParents = new Set(
          gsap.utils.toArray<HTMLElement>(".cinematic-child").map(el => el.parentElement)
        );
        cinematicParents.forEach((parent) => {
          if (!parent) return;
          const children = parent.querySelectorAll(".cinematic-child");
          gsap.fromTo(children,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: parent,
                start: "top 80%",
                toggleActions: "play none none none"
              }
            }
          );
        });
      });

      return () => {
        ctx.revert();
      };
    }
  }, [filtered, page]);

  const perPage = 9;
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  const chips: { label: string; clear: () => void }[] = [];
  if (type !== "All") chips.push({ label: type, clear: () => setType("All") });
  if (status !== "All") chips.push({ label: status, clear: () => setStatus("All") });
  if (budget !== "Any") chips.push({ label: budgets.find((b) => b.key === budget)!.label, clear: () => setBudget("Any") });
  if (bhk !== "All") chips.push({ label: bhk, clear: () => setBHK("All") });
  if (furnishing !== "Any") chips.push({ label: furnishing, clear: () => setFurnishing("Any") });
  amenities.forEach((a) => chips.push({ label: a, clear: () => setAmenities((s) => s.filter((x) => x !== a)) }));

  const Pill = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm rounded-full border transition-colors ${active ? "bg-foreground text-background border-foreground" : "border-border hover:border-foreground/50"}`}
    >
      {children}
    </button>
  );

  return (
    <div>
      {/* Header */}
      <section className="border-b border-border bg-secondary/30">
        <div className="container-page pt-28 pb-12">
          <div className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3 cinematic-child">Listings</div>
          <h1 className="font-serif text-4xl md:text-5xl cinematic-reveal">Properties</h1>
          <p className="text-muted-foreground mt-3 max-w-xl cinematic-child">Every property here has been visited, verified and priced honestly.</p>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-border sticky top-16 md:top-20 z-30 bg-background/95 backdrop-blur">
        <div className="container-page py-5 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            {(["All", "Residential", "Commercial", "Plot", "Industrial"] as TypeFilter[]).map((t) => (
              <Pill key={t} active={type === t} onClick={() => { setType(t); setPage(1); }}>{t}</Pill>
            ))}
            <span className="mx-2 h-6 w-px bg-border hidden md:block" />
            {(["All", "For Sale", "For Rent"] as StatusFilter[]).map((s) => (
              <Pill key={s} active={status === s} onClick={() => { setStatus(s); setPage(1); }}>{s}</Pill>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select value={budget} onChange={(e) => { setBudget(e.target.value as BudgetKey); setPage(1); }} className="px-4 py-2 text-sm bg-card border border-border rounded-md">
              {budgets.map((b) => <option key={b.key} value={b.key}>{b.label}</option>)}
            </select>
            <div className="flex gap-2 flex-wrap">
              {(["All", "1BHK", "2BHK", "3BHK", "4BHK", "4BHK+"] as BHKFilter[]).map((b) => (
                <Pill key={b} active={bhk === b} onClick={() => { setBHK(b); setPage(1); }}>{b}</Pill>
              ))}
            </div>
            <button onClick={() => setShowMore((s) => !s)} className="ml-auto inline-flex items-center gap-2 text-sm px-4 py-2 border border-border rounded-md hover:border-foreground/50">
              <SlidersHorizontal className="h-4 w-4" /> More Filters
            </button>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="px-4 py-2 text-sm bg-card border border-border rounded-md">
              <option value="newest">Newest</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>

          {showMore && (
            <div className="border-t border-border pt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Area (sqft, max)</div>
                <input type="range" min={500} max={60000} step={100} value={areaMax} onChange={(e) => setAreaMax(parseInt(e.target.value))} className="w-full accent-primary" />
                <div className="text-sm mt-1">Up to {areaMax.toLocaleString()} sqft</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Furnishing</div>
                <div className="flex gap-2 flex-wrap">
                  {["Any", "Furnished", "Semi-Furnished", "Unfurnished"].map((f) => (
                    <Pill key={f} active={furnishing === f} onClick={() => setFurnishing(f)}>{f}</Pill>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Amenities</div>
                <div className="flex gap-2 flex-wrap">
                  {allAmen.map((a) => (
                    <Pill key={a} active={amenities.includes(a)} onClick={() => setAmenities((s) => s.includes(a) ? s.filter((x) => x !== a) : [...s, a])}>{a}</Pill>
                  ))}
                </div>
              </div>
            </div>
          )}

          {chips.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {chips.map((c, i) => (
                <button key={i} onClick={c.clear} className="inline-flex items-center gap-1 text-xs px-3 py-1.5 bg-secondary rounded-full hover:bg-secondary/70">
                  {c.label} <X className="h-3 w-3" />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Grid */}
      <section className="container-page py-12">
        <div className="text-sm text-muted-foreground mb-6">Showing {filtered.length} properties</div>
        {pageItems.length === 0 ? (
          <div className="text-center py-24 text-muted-foreground">No properties match these filters.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 perspective-container grid-listings">
            {pageItems.map((p) => <PropertyCard key={p.id} p={p} />)}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`h-10 w-10 rounded-md text-sm border transition-colors ${n === page ? "bg-foreground text-background border-foreground" : "border-border hover:border-foreground/50"}`}
              >{n}</button>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
