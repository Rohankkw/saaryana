import { createFileRoute } from "@tanstack/react-router";
import { Phone, MessageCircle, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Saaranya" },
      { name: "description", content: "Talk to a real person. Our team is in Mumbai, Pune, Bengaluru, Hyderabad and Delhi NCR." },
      { property: "og:title", content: "Contact — Saaranya" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
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

      // 3. Contact Form & office card 3D popup
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
  }, []);
  return (
    <div>
      <section className="container-page pt-32 pb-16">
        <div className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4 cinematic-child">Contact</div>
        <h1 className="font-serif text-5xl md:text-7xl max-w-3xl leading-[1.05] cinematic-reveal">Let's talk.</h1>
        <p className="text-muted-foreground mt-6 max-w-xl cinematic-child">We respond within one working day. For viewings, please give us forty-eight hours.</p>
      </section>

      <section className="container-page pb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 perspective-container">
        <form
          onSubmit={(e) => { e.preventDefault(); alert("Thank you — we'll be in touch shortly."); }}
          className="bg-card border border-border rounded-md p-8 space-y-4 card-popup-3d"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input required placeholder="Name" className="w-full px-4 py-3 text-sm bg-background border border-border rounded-md focus:outline-none focus:border-foreground/50" />
            <input required placeholder="Phone" className="w-full px-4 py-3 text-sm bg-background border border-border rounded-md focus:outline-none focus:border-foreground/50" />
          </div>
          <input type="email" required placeholder="Email" className="w-full px-4 py-3 text-sm bg-background border border-border rounded-md focus:outline-none focus:border-foreground/50" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input placeholder="City of interest" className="w-full px-4 py-3 text-sm bg-background border border-border rounded-md focus:outline-none focus:border-foreground/50" />
            <select className="w-full px-4 py-3 text-sm bg-background border border-border rounded-md focus:outline-none focus:border-foreground/50">
              <option>Property type</option>
              <option>Residential</option>
              <option>Commercial</option>
              <option>Plot</option>
              <option>Rental</option>
            </select>
          </div>
          <textarea required placeholder="Tell us what you're looking for" rows={5} className="w-full px-4 py-3 text-sm bg-background border border-border rounded-md focus:outline-none focus:border-foreground/50" />
          <Button type="submit" size="lg" className="w-full btn-pulse">Send Message</Button>
        </form>

        <div className="space-y-8 card-popup-3d">
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Office</div>
            <div className="flex gap-3"><MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div className="text-sm leading-relaxed">3rd Floor, Trade Centre<br />North Main Road, Koregaon Park<br />Pune 411001, India</div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <a href="tel:+919876543210" className="flex items-center gap-3 p-4 border border-border rounded-md hover:bg-secondary"><Phone className="h-4 w-4 text-primary" /><span className="text-sm">+91 98765 43210</span></a>
            <a href="https://wa.me/919876543210" className="flex items-center gap-3 p-4 border border-border rounded-md hover:bg-secondary"><MessageCircle className="h-4 w-4 text-primary" /><span className="text-sm">WhatsApp us</span></a>
            <a href="mailto:hello@saaranya.in" className="flex items-center gap-3 p-4 border border-border rounded-md hover:bg-secondary"><Mail className="h-4 w-4 text-primary" /><span className="text-sm">hello@saaranya.in</span></a>
          </div>
          <div className="flex gap-3 items-start text-sm">
            <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <div>Monday – Saturday · 10:00 – 19:00</div>
              <div className="text-muted-foreground">Sundays by appointment only</div>
            </div>
          </div>
          <div className="aspect-[4/3] rounded-md overflow-hidden border border-border">
            <iframe
              src="https://maps.google.com/maps?q=Koregaon+Park+Pune&output=embed"
              className="w-full h-full"
              loading="lazy"
              title="Map"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
