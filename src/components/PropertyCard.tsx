import { Link } from "@tanstack/react-router";
import { Bed, Bath, Maximize2, MapPin } from "lucide-react";
import type { Property } from "@/lib/properties";
import { useEffect, useState } from "react";

export function PropertyCard({ p }: { p: Property }) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reducedMotion) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 8;
    const rotateX = -((y - centerY) / centerY) * 8;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03) translateZ(12px)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reducedMotion) return;
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateZ(0px)`;
  };

  return (
    <Link
      to="/properties/$id"
      params={{ id: p.id }}
      className="group block bg-card border border-border rounded-lg overflow-hidden property-card-3d card-popup-3d"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-image-wrap relative aspect-[4/3] overflow-hidden">
        <img
          src={p.images[0]}
          alt={p.name}
          loading="lazy"
          className="h-[120%] w-full object-cover absolute top-[-10%] left-0 parallax-img"
        />
        <div className="absolute top-4 left-4 z-10">
          <span className="px-2.5 py-1 text-[11px] tracking-wider uppercase bg-background/95 text-foreground rounded-sm">
            {p.status}
          </span>
        </div>
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors duration-300 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100 z-10">
          <span className="px-4 py-2 bg-background text-foreground text-xs tracking-wider uppercase rounded-sm">
            View Details
          </span>
        </div>
      </div>
      <div className="p-5 space-y-3 relative z-10">
        <div>
          <h3 className="font-serif text-xl leading-tight">{p.name}</h3>
          <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" /> {p.location}
          </div>
        </div>
        <div className="font-serif text-lg text-primary price-badge">{p.price}</div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border">
          {p.beds && <span className="inline-flex items-center gap-1"><Bed className="h-3.5 w-3.5" />{p.beds} Beds</span>}
          {p.baths && <span className="inline-flex items-center gap-1"><Bath className="h-3.5 w-3.5" />{p.baths} Baths</span>}
          <span className="inline-flex items-center gap-1"><Maximize2 className="h-3.5 w-3.5" />{p.builtUp ?? p.plotSize ?? `${p.area} sqft`}</span>
        </div>
      </div>
    </Link>
  );
}
