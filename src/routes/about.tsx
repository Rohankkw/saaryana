import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Saaranya" },
      { name: "description", content: "A small property advisory rooted in old-world trust, working with a curated list of clients across India." },
      { property: "og:title", content: "About — Saaranya" },
    ],
  }),
  component: AboutPage,
});

const team = [
  { name: "Aarav Mehta",  role: "Founder",                line: "Twenty years in residential broking across Mumbai and Pune.", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80" },
  { name: "Priya Sharma", role: "Luxury Homes Specialist", line: "Spent a decade placing families into homes they stayed in.",     photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80" },
  { name: "Rohan Kapoor", role: "Commercial Lead",         line: "Negotiates office and retail leases like the rent is his own.",  photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80" },
  { name: "Meera Iyer",   role: "Client Experience",       line: "The person you'll actually hear from when you call us.",         photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80" },
];

const milestones = [
  ["2014", "Founded in Pune with three brokers and one office."],
  ["2017", "Opened Mumbai and Bengaluru desks."],
  ["2020", "Crossed a thousand closed transactions."],
  ["2023", "Hyderabad and Delhi NCR teams in place."],
  ["2026", "A small advisory, still — by choice."],
];

function AboutPage() {
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

      // 3. Values grid & milestones 3D popup
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

      // 4. Parallax Images inside their wrappers
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

      // 5. Team cards staggered alternating entrance
      const teamCards = gsap.utils.toArray<HTMLElement>(".stagger-team-card");
      if (teamCards.length > 0) {
        teamCards.forEach((card, index) => {
          const fromX = index % 2 === 0 ? -60 : 60;
          gsap.fromTo(card,
            { opacity: 0, x: fromX },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              delay: (index % 4) * 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card.parentElement,
                start: "top 85%",
                toggleActions: "play none none none"
              }
            }
          );
        });
      }
    });

    return () => {
      ctx.revert();
    };
  }, []);
  return (
    <div>
      <section className="container-page pt-32 pb-20">
        <div className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4 cinematic-child">About</div>
        <h1 className="font-serif text-5xl md:text-7xl max-w-3xl leading-[1.05] cinematic-reveal">
          We help people find the right property.
        </h1>
      </section>

      <section className="container-page pb-24 grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="space-y-5 text-muted-foreground leading-relaxed cinematic-child">
          <p>Saaranya is a property advisory built for the long view. We are not the largest firm in the room — and we do not try to be. We work with a small list of buyers, sellers and tenants who care how the deal gets done.</p>
          <p>Every listing we publish has been visited by someone on the team. Every price has been triangulated against three independent comparables. Every document is checked before it reaches your inbox.</p>
          <p>It is, in the end, a quiet practice. Most of our work comes from people who once worked with us and now send their friends.</p>
        </div>
        <div className="rounded-md aspect-[4/5] overflow-hidden relative">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80"
            alt=""
            className="h-[120%] w-full object-cover absolute top-[-10%] left-0 parallax-img"
          />
        </div>
      </section>

      <section className="bg-secondary/40 border-y border-border">
        <div className="container-page py-24">
          <div className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3 cinematic-child">Our Values</div>
          <h2 className="font-serif text-4xl md:text-5xl mb-14 cinematic-reveal">What we hold ourselves to.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border perspective-container">
            {[
              ["Honesty before the deal", "If we don't think it's right for you, we'll say so."],
              ["Small, attentive teams", "You will work with two people, not twenty."],
              ["No hidden charges", "Our fee is stated upfront, in writing, every time."],
              ["Patience as a discipline", "Three months, six months, a year — we'll keep looking."],
            ].map(([t, d]) => (
              <div key={t} className="bg-background p-8 card-popup-3d">
                <div className="font-serif text-2xl mb-2">{t}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-24">
        <div className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3 cinematic-child">The Team</div>
        <h2 className="font-serif text-4xl md:text-5xl mb-12 cinematic-reveal">Who you'll be working with.</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 perspective-container">
          {team.map((m) => (
            <div key={m.name} className="stagger-team-card">
              <div className="aspect-[4/5] overflow-hidden rounded-md mb-4 relative">
                <img src={m.photo} alt={m.name} className="h-full w-full object-cover" />
              </div>
              <div className="font-serif text-lg">{m.name}</div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{m.role}</div>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{m.line}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary/40 border-t border-border">
        <div className="container-page py-24">
          <div className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3 cinematic-child">Milestones</div>
          <h2 className="font-serif text-4xl md:text-5xl mb-12 cinematic-reveal">A short history.</h2>
          <div className="space-y-px bg-border perspective-container">
            {milestones.map(([year, text]) => (
              <div key={year} className="bg-background grid grid-cols-[100px_1fr] md:grid-cols-[160px_1fr] gap-8 p-6 card-popup-3d">
                <div className="font-serif text-2xl text-primary">{year}</div>
                <div className="text-muted-foreground self-center">{text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
