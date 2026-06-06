import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  MapPin, Bed, Bath, Car, Building, Maximize2, Ruler, CalendarDays, Sofa, Compass,
  Phone, MessageCircle, Mail, X, ChevronLeft, ChevronRight, Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/PropertyCard";
import { getProperty, properties } from "@/lib/properties";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const Route = createFileRoute("/properties/$id")({
  loader: ({ params }) => {
    const p = getProperty(params.id);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — Saaranya` },
          { name: "description", content: `${loaderData.name} · ${loaderData.location} · ${loaderData.price}` },
          { property: "og:title", content: `${loaderData.name} — Saaranya` },
          { property: "og:description", content: `${loaderData.location} · ${loaderData.price}` },
          { property: "og:image", content: loaderData.images[0] },
        ]
      : [],
  }),
  component: PropertyDetail,
  notFoundComponent: () => (
    <div className="container-page py-32 text-center">
      <h1 className="font-serif text-4xl mb-4">Property not found</h1>
      <Link to="/properties" className="text-primary underline">Back to listings</Link>
    </div>
  ),
});

function PropertyDetail() {
  const p = Route.useLoaderData() as NonNullable<ReturnType<typeof getProperty>>;
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const similar = properties.filter((x) => x.id !== p.id && x.type === p.type).slice(0, 3);

  useEffect(() => {
    if (typeof window === "undefined") return;

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

    const ctx = gsap.context(() => {
      // 1. Cinematic Text Reveal (for section headings)
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

      // 2. Staggered reveal for subheadings and description paragraphs (cinematic-child)
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

      // 3. Parallax Images inside their wrappers
      gsap.utils.toArray<HTMLElement>(".parallax-img").forEach((img) => {
        gsap.fromTo(img,
          { y: "-10%" },
          {
            y: "10%",
            ease: "none",
            scrollTrigger: {
              trigger: img.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          }
        );
      });

      // 4. Sidebar & similar property cards 3D popup
      const cards = gsap.utils.toArray<HTMLElement>(".card-popup-3d");
      if (cards.length > 0) {
        gsap.fromTo(cards,
          { opacity: 0, y: 60, scale: 0.94, rotateX: 8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "cubic-bezier(0.22, 1, 0.36, 1)",
            scrollTrigger: {
              trigger: cards[0].parentElement,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      }
    });

    return () => {
      ctx.revert();
    };
  }, [p.id]);

  const details: { icon: React.ElementType; label: string; value?: string | number }[] = [
    { icon: Bed, label: "Bedrooms", value: p.beds },
    { icon: Bath, label: "Bathrooms", value: p.baths },
    { icon: Car, label: "Parking", value: p.parking },
    { icon: Building, label: "Floor", value: p.floor },
    { icon: Maximize2, label: "Built-up Area", value: p.builtUp },
    { icon: Ruler, label: "Carpet Area", value: p.carpet },
    { icon: Ruler, label: "Plot Size", value: p.plotSize },
    { icon: CalendarDays, label: "Property Age", value: p.age },
    { icon: CalendarDays, label: "Possession", value: p.possession },
    { icon: Sofa, label: "Furnishing", value: p.furnishing },
    { icon: Compass, label: "Facing", value: p.facing },
    { icon: Building, label: "Total Floors", value: p.totalFloors },
  ].filter((d) => d.value !== undefined && d.value !== null && d.value !== "");

  return (
    <div>
      {/* Gallery */}
      <section className="container-page pt-24 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <button onClick={() => setLightbox(active)} className="md:col-span-5 aspect-[16/8] overflow-hidden rounded-md relative">
            <img src={p.images[active]} alt={p.name} className="h-[120%] w-full object-cover absolute top-[-10%] left-0 parallax-img" />
          </button>
          <div className="md:col-span-5 grid grid-cols-4 gap-3">
            {p.images.slice(0, 4).map((src, i) => (
              <button key={i} onClick={() => setActive(i)} className={`aspect-[4/3] overflow-hidden rounded-md border-2 transition-all ${active === i ? "border-foreground" : "border-transparent opacity-80 hover:opacity-100"}`}>
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Video */}
      {p.video && (
        <section className="container-page py-8">
          <div className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">Property Walkthrough Video</div>
          <div className="aspect-video rounded-md overflow-hidden bg-foreground/5">
            <iframe
              src={`https://www.youtube.com/embed/${p.video}`}
              title="Property walkthrough"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        </section>
      )}

      {/* Content */}
      <section className="container-page py-12 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 perspective-container">
        <div className="space-y-12">
          <div>
            <div className="flex items-center gap-2 mb-4 cinematic-child">
              <span className="px-2.5 py-1 text-[11px] tracking-wider uppercase bg-primary text-primary-foreground rounded-sm">{p.status}</span>
              <span className="px-2.5 py-1 text-[11px] tracking-wider uppercase border border-border rounded-sm">{p.type}</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl leading-tight cinematic-reveal">{p.name}</h1>
            <div className="mt-3 flex items-center gap-2 text-muted-foreground cinematic-child"><MapPin className="h-4 w-4" /> {p.location}</div>
            <div className="mt-5 font-serif text-3xl text-primary cinematic-child">{p.price}</div>
          </div>

          {/* Key details */}
          <div>
            <h2 className="font-serif text-2xl mb-6 cinematic-reveal">Key Details</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-border border border-border rounded-md overflow-hidden cinematic-child">
              {details.map((d, i) => (
                <div key={i} className="bg-card p-5">
                  <d.icon className="h-4 w-4 text-muted-foreground mb-2" />
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{d.label}</div>
                  <div className="mt-1 text-sm font-medium">{d.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="font-serif text-2xl mb-4 cinematic-reveal">About This Property</h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl cinematic-child">{p.description}</p>
          </div>

          {/* Amenities */}
          <div>
            <h2 className="font-serif text-2xl mb-6 cinematic-reveal">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 cinematic-child">
              {p.amenities.map((a) => (
                <div key={a} className="flex items-center gap-3 p-3 border border-border rounded-md">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm">{a}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <h2 className="font-serif text-2xl mb-6 cinematic-reveal">Location & Nearby</h2>
            <div className="aspect-[16/9] rounded-md overflow-hidden border border-border mb-6 cinematic-child">
              <iframe
                src={`https://maps.google.com/maps?q=${encodeURIComponent(p.location)}&output=embed`}
                className="w-full h-full"
                loading="lazy"
                title="Map"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {p.nearby.map((n) => (
                <div key={n.label} className="flex justify-between p-3 border border-border rounded-md text-sm">
                  <span>{n.label}</span>
                  <span className="text-muted-foreground">{n.distance}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-28 self-start space-y-6 card-popup-3d">
          <div className="bg-card border border-border rounded-md p-6">
            <div className="flex items-center gap-4">
              <img src={p.agent.photo} alt={p.agent.name} className="h-14 w-14 rounded-full object-cover" />
              <div>
                <div className="font-medium">{p.agent.name}</div>
                <div className="text-xs text-muted-foreground">{p.agent.designation}</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-5">
              <a href={`tel:${p.agent.phone}`} className="inline-flex items-center justify-center gap-1 py-2.5 text-xs border border-border rounded-md hover:bg-secondary"><Phone className="h-3.5 w-3.5" />Call</a>
              <a href={`https://wa.me/${p.agent.phone.replace(/[^0-9]/g, "")}`} className="inline-flex items-center justify-center gap-1 py-2.5 text-xs border border-border rounded-md hover:bg-secondary"><MessageCircle className="h-3.5 w-3.5" />WhatsApp</a>
              <a href={`mailto:${p.agent.email}`} className="inline-flex items-center justify-center gap-1 py-2.5 text-xs border border-border rounded-md hover:bg-secondary"><Mail className="h-3.5 w-3.5" />Email</a>
            </div>
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); alert("Thanks — we'll be in touch shortly."); }}
            className="bg-card border border-border rounded-md p-6 space-y-3"
          >
            <div className="font-serif text-xl mb-2">Enquire</div>
            <input required placeholder="Your name" className="w-full px-3 py-2.5 text-sm bg-background border border-border rounded-md focus:outline-none focus:border-foreground/50" />
            <input required placeholder="Phone" className="w-full px-3 py-2.5 text-sm bg-background border border-border rounded-md focus:outline-none focus:border-foreground/50" />
            <input type="email" required placeholder="Email" className="w-full px-3 py-2.5 text-sm bg-background border border-border rounded-md focus:outline-none focus:border-foreground/50" />
            <textarea placeholder="Message" rows={3} className="w-full px-3 py-2.5 text-sm bg-background border border-border rounded-md focus:outline-none focus:border-foreground/50" />
            <div>
              <label className="text-xs text-muted-foreground">Schedule a visit</label>
              <input type="date" className="mt-1 w-full px-3 py-2.5 text-sm bg-background border border-border rounded-md focus:outline-none focus:border-foreground/50" />
            </div>
            <Button type="submit" className="w-full">Submit Enquiry</Button>
          </form>
        </aside>
      </section>

      {/* Similar */}
      {similar.length > 0 && (
        <section className="bg-secondary/30 border-t border-border">
          <div className="container-page py-20">
            <h2 className="font-serif text-3xl md:text-4xl mb-10 cinematic-reveal">Similar Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 perspective-container">
              {similar.map((s) => <PropertyCard key={s.id} p={s} />)}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center" onClick={() => setLightbox(null)}>
          <button onClick={(e) => { e.stopPropagation(); setLightbox(null); }} className="absolute top-6 right-6 text-white/80 hover:text-white"><X className="h-6 w-6" /></button>
          <button onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + p.images.length - 1) % p.images.length); }} className="absolute left-6 text-white/80 hover:text-white"><ChevronLeft className="h-8 w-8" /></button>
          <img src={p.images[lightbox]} alt="" className="max-h-[90vh] max-w-[92vw] object-contain" onClick={(e) => e.stopPropagation()} />
          <button onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % p.images.length); }} className="absolute right-6 text-white/80 hover:text-white"><ChevronRight className="h-8 w-8" /></button>
        </div>
      )}
    </div>
  );
}
