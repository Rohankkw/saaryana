import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Search, Home, Building2, LandPlot, KeyRound, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/PropertyCard";
import { properties } from "@/lib/properties";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useShaderBackground } from "@/components/ui/animated-shader-hero";
import { Marquee } from "@/components/ui/3d-testimonails";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Saaranya — Find Property. Not Just A House." },
      { name: "description", content: "A curated property advisory across Mumbai, Pune, Bengaluru, Hyderabad and Delhi NCR. Verified listings, zero hidden charges." },
      { property: "og:title", content: "Saaranya — Find Property. Not Just A House." },
      { property: "og:image", content: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80" },
    ],
  }),
  component: Home$,
});

const testimonials = [
  {
    name: "Anjali Rao",
    username: "@anjali",
    body: "They listened more than they spoke. We saw four homes, and the fourth was ours. No pressure, no theatrics.",
    quote: "They listened more than they spoke. We saw four homes, and the fourth was ours. No pressure, no theatrics.",
    city: "Bengaluru",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&q=80",
    country: "🇮🇳 India",
  },
  {
    name: "Vikram Singh",
    username: "@vikram",
    body: "Honest pricing, honest paperwork. That's rarer in this market than people admit.",
    quote: "Honest pricing, honest paperwork. That's rarer in this market than people admit.",
    city: "Mumbai",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&q=80",
    country: "🇮🇳 India",
  },
  {
    name: "Neha Iyer",
    username: "@neha",
    body: "Three months of patience from their team. They never once pushed us towards a listing that wasn't right.",
    quote: "Three months of patience from their team. They never once pushed us towards a listing that wasn't right.",
    city: "Pune",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&q=80",
    country: "🇮🇳 India",
  },
  {
    name: "Rahul Mehta",
    username: "@rahul",
    body: "End-to-end assistance on registration and legal checks was flawless. Highly recommended!",
    quote: "End-to-end assistance on registration and legal checks was flawless. Highly recommended!",
    city: "Delhi NCR",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&q=80",
    country: "🇮🇳 India",
  },
  {
    name: "Priya Sharma",
    username: "@priya",
    body: "Found a great commercial space in Hitec City. Professional service and very transparent negotiation.",
    quote: "Found a great commercial space in Hitec City. Professional service and very transparent negotiation.",
    city: "Hyderabad",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&q=80",
    country: "🇮🇳 India",
  },
  {
    name: "Amit Patel",
    username: "@amit",
    body: "Zero hidden charges. They are extremely clear about brokerage and registration fees upfront.",
    quote: "Zero hidden charges. They are extremely clear about brokerage and registration fees upfront.",
    city: "Mumbai",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&q=80",
    country: "🇮🇳 India",
  },
];

function TestimonialCard({ img, name, username, body, country }: (typeof testimonials)[number]) {
  return (
    <Card className="w-64 md:w-72 border-border/60 bg-card/60 backdrop-blur-md shadow-sm hover:border-primary/30 transition-colors duration-300">
      <CardContent className="p-6">
        <div className="flex items-center gap-3">
          <Avatar className="size-10 border border-border/50">
            <AvatarImage src={img} alt={name} />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col text-left">
            <figcaption className="text-sm font-semibold text-foreground flex items-center gap-1.5">
              {name} <span className="text-xs">{country}</span>
            </figcaption>
            <p className="text-xs text-muted-foreground">{username}</p>
          </div>
        </div>
        <blockquote className="mt-3 text-sm text-muted-foreground text-left leading-relaxed">
          &ldquo;{body}&rdquo;
        </blockquote>
      </CardContent>
    </Card>
  );
}

function Home$() {
  const navigate = useNavigate();
  const [loc, setLoc] = useState("");
  const [type, setType] = useState("Residential");
  const [budget, setBudget] = useState("Any");
  const [t, setT] = useState(0);
  const canvasRef = useShaderBackground();

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
      // 0. Hero animations (text reveal + image parallax)
      const words = gsap.utils.toArray<HTMLElement>(".hero-word");
      if (words.length > 0) {
        gsap.fromTo(words,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            delay: 0.2
          }
        );
      }

      const heroParallax = document.querySelector<HTMLElement>(".hero-parallax-img");
      if (heroParallax) {
        gsap.fromTo(heroParallax,
          { y: "-10%" },
          {
            y: "10%",
            ease: "none",
            scrollTrigger: {
              trigger: heroParallax.parentElement?.parentElement,
              start: "top top",
              end: "bottom top",
              scrub: true
            }
          }
        );
      }

      // 1. Property listing cards 3D popup
      const cards = gsap.utils.toArray<HTMLElement>(".card-popup-3d:not(.grid-listings *)");
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

      // 2. Parallax Images inside their wrappers
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

      // 3. Cinematic Text Reveal (for section headings)
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

      // 4. Staggered reveal for subheadings and description paragraphs (cinematic-child)
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

      // 5. Statistics / Numbers Count-up
      gsap.utils.toArray<HTMLElement>(".stat-container").forEach((container) => {
        gsap.fromTo(container,
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: container,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );

        const countEls = container.querySelectorAll<HTMLElement>(".count-up");
        countEls.forEach((el) => {
          const targetStr = el.dataset.target || el.innerText;
          const cleanNumStr = targetStr.replace(/[^0-9]/g, "");
          const targetVal = parseInt(cleanNumStr, 10) || 0;
          const suffix = targetStr.replace(/[0-9,]/g, "");
          
          const obj = { val: 0 };
          gsap.to(obj, {
            val: targetVal,
            duration: 1.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%"
            },
            onUpdate: () => {
              let valFormatted = Math.floor(obj.val).toString();
              if (targetStr.includes(",")) {
                valFormatted = Math.floor(obj.val).toLocaleString("en-IN");
              }
              el.innerText = valFormatted + suffix;
            }
          });
        });
      });

      // Legacy reveal transition supports
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.to(el, {
          onStart: () => el.classList.add("is-visible"),
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        });
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/properties" });
  };

  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center hero-section">
        <div className="absolute inset-0 overflow-hidden">
          <canvas
            ref={canvasRef}
            className="h-[120%] w-full object-cover absolute top-[-10%] left-0 hero-parallax-img touch-none"
            style={{ background: 'black' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 pointer-events-none" />
        </div>
        <div className="container-page relative z-10 pt-24 pb-16 text-white">
          <div className="max-w-3xl">
            <div className="text-xs tracking-[0.3em] uppercase text-white/70 mb-6">Saaranya · Est. 2014</div>
            <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] mb-6 hero-headline">
              <span className="block overflow-hidden">
                {"Find Property.".split(" ").map((word, i) => (
                  <span key={i} className="hero-word mr-[0.25em]">{word}</span>
                ))}
              </span>
              <span className="block overflow-hidden mt-2">
                {"Not Just A House.".split(" ").map((word, i) => (
                  <span key={i} className="hero-word mr-[0.25em]">{word}</span>
                ))}
              </span>
            </h1>
            <p className="text-lg text-white/80 max-w-xl mb-10">
              A small advisory for buyers, sellers and tenants who care how the deal gets done.
            </p>
          </div>

          <form
            onSubmit={onSearch}
            className="bg-background text-foreground rounded-md p-2 grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_auto] gap-2 max-w-4xl shadow-lift"
          >
            <input
              value={loc}
              onChange={(e) => setLoc(e.target.value)}
              placeholder="City or neighbourhood"
              className="bg-transparent px-4 py-3 text-sm focus:outline-none"
            />
            <select value={type} onChange={(e) => setType(e.target.value)} className="bg-transparent px-4 py-3 text-sm border-l border-border focus:outline-none">
              <option>Residential</option>
              <option>Commercial</option>
              <option>Plot</option>
            </select>
            <select value={budget} onChange={(e) => setBudget(e.target.value)} className="bg-transparent px-4 py-3 text-sm border-l border-border focus:outline-none">
              <option>Any</option>
              <option>Under ₹25L</option>
              <option>₹25L – ₹50L</option>
              <option>₹50L – ₹1Cr</option>
              <option>₹1Cr – ₹2Cr</option>
              <option>₹2Cr+</option>
            </select>
            <Button type="submit" size="lg" className="rounded-sm btn-pulse">
              <Search className="h-4 w-4" /> Search
            </Button>
          </form>
        </div>
      </section>

      {/* STATS */}
      <section className="border-b border-border">
        <div className="container-page py-16 grid grid-cols-2 md:grid-cols-4 gap-10 text-center stat-container">
          {[
            ["1,200+", "Properties Listed"],
            ["12", "Cities Active"],
            ["3,500+", "Happy Clients"],
            ["10+", "Years of Trust"],
          ].map(([v, l]) => (
            <div key={l} className="flex flex-col items-center">
              <div className="font-serif text-4xl md:text-5xl count-up" data-target={v}>{v}</div>
              <div className="mt-2 text-xs tracking-widest uppercase text-muted-foreground">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="container-page py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3 cinematic-child">Selection</div>
            <h2 className="font-serif text-4xl md:text-5xl cinematic-reveal">Featured Properties</h2>
          </div>
          <Link to="/properties" className="hidden md:inline-flex items-center gap-2 text-sm border-b border-foreground/40 pb-1 hover:border-foreground">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 perspective-container">
          {properties.slice(0, 6).map((p) => (
            <PropertyCard key={p.id} p={p} />
          ))}
        </div>
      </section>

      {/* TYPES */}
      <section className="bg-secondary/40 border-y border-border">
        <div className="container-page py-24">
          <div className="text-center mb-14">
            <div className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3 cinematic-child">Categories</div>
            <h2 className="font-serif text-4xl md:text-5xl cinematic-reveal">A Home For Every Intention</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 perspective-container">
            {[
              { icon: Home, label: "Residential" },
              { icon: Building2, label: "Commercial" },
              { icon: LandPlot, label: "Plots" },
              { icon: KeyRound, label: "Rental" },
            ].map(({ icon: Icon, label }) => (
              <Link key={label} to="/properties" className="card-popup-3d group bg-card border border-border rounded-lg p-8 text-center card-hover">
                <Icon className="h-7 w-7 mx-auto text-primary mb-4" />
                <div className="font-serif text-xl">{label}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="container-page py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <div className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3 cinematic-child">Why Us</div>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight cinematic-reveal">
              A broker you'd trust with your life savings.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border perspective-container">
            {[
              ["Zero Hidden Charges", "Every rupee is documented, before you sign."],
              ["Verified Listings Only", "We visit every property before it reaches you."],
              ["End-to-End Assistance", "Paperwork, loan, registration — handled in-house."],
              ["10+ Years of Knowledge", "Local market context that's actually local."],
            ].map(([t, d]) => (
              <div key={t} className="bg-background p-8 card-popup-3d">
                <div className="font-serif text-xl mb-2">{t}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative bg-secondary/40 border-y border-border overflow-hidden">
        
        {/* Background 3D Marquee Layer */}
        <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden [perspective:1000px] pointer-events-none opacity-25 dark:opacity-15">
          <div
            className="flex flex-row items-center gap-4 md:gap-6"
            style={{
              transform: 'rotateX(15deg) rotateY(-10deg) rotateZ(10deg)',
            }}
          >
            {/* Vertical Marquee (downwards) */}
            <Marquee vertical repeat={3} className="[--duration:40s] h-[600px]">
              {testimonials.slice(0, 3).map((review) => (
                <TestimonialCard key={review.username} {...review} />
              ))}
            </Marquee>
            {/* Vertical Marquee (upwards) */}
            <Marquee vertical reverse repeat={3} className="[--duration:40s] h-[600px]">
              {testimonials.slice(3, 6).map((review) => (
                <TestimonialCard key={review.username} {...review} />
              ))}
            </Marquee>
            {/* Vertical Marquee (downwards) */}
            <Marquee vertical repeat={3} className="[--duration:40s] h-[600px] hidden sm:flex">
              {testimonials.slice(0, 3).map((review) => (
                <TestimonialCard key={review.username} {...review} />
              ))}
            </Marquee>
            {/* Vertical Marquee (upwards) */}
            <Marquee vertical reverse repeat={3} className="[--duration:40s] h-[600px] hidden md:flex">
              {testimonials.slice(3, 6).map((review) => (
                <TestimonialCard key={review.username} {...review} />
              ))}
            </Marquee>
          </div>
          
          {/* Gradient overlays for vertical marquee using secondary backdrop blend */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-secondary to-transparent"></div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-secondary to-transparent"></div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-secondary to-transparent"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-secondary to-transparent"></div>
        </div>

        {/* Foreground Content Layer */}
        <div className="container-page py-24 relative z-10 text-center flex flex-col items-center">
          <div className="text-center mb-12">
            <div className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3 cinematic-child">Testimonials</div>
            <h2 className="font-serif text-4xl md:text-5xl cinematic-reveal">In Their Own Words</h2>
          </div>
          <div className="max-w-3xl mx-auto text-center cinematic-child backdrop-blur-[2px] bg-background/5 p-8 rounded-2xl border border-border/10">
            <blockquote className="font-serif text-2xl md:text-3xl leading-snug min-h-[140px] text-foreground">
              &ldquo;{testimonials[t].quote}&rdquo;
            </blockquote>
            <div className="mt-8 text-sm">
              <div className="font-medium text-foreground">{testimonials[t].name}</div>
              <div className="text-muted-foreground">{testimonials[t].city}</div>
            </div>
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                onClick={() => setT((t + testimonials.length - 1) % testimonials.length)}
                className="h-9 w-9 rounded-full border border-border bg-background/60 backdrop-blur-sm hover:bg-background transition-colors flex items-center justify-center cursor-pointer"
                aria-label="Previous"
              >
                <ChevronLeft className="h-4 w-4 text-foreground" />
              </button>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setT(i)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${i === t ? "w-8 bg-foreground" : "w-2 bg-foreground/30"}`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
              <button
                onClick={() => setT((t + 1) % testimonials.length)}
                className="h-9 w-9 rounded-full border border-border bg-background/60 backdrop-blur-sm hover:bg-background transition-colors flex items-center justify-center cursor-pointer"
                aria-label="Next"
              >
                <ChevronRight className="h-4 w-4 text-foreground" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page py-28 text-center">
        <h2 className="font-serif text-4xl md:text-6xl max-w-3xl mx-auto leading-tight cinematic-reveal">
          Have a property to sell or rent? Let's talk.
        </h2>
        <div className="mt-10 cinematic-child">
          <Link to="/contact">
            <Button size="lg" className="rounded-sm px-8 btn-pulse">Contact Us</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
