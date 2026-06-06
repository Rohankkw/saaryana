import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Linkedin, Twitter } from "lucide-react";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Footer() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      const footer = document.querySelector<HTMLElement>(".footer-animate");
      if (footer) {
        footer.style.opacity = "1";
        footer.style.transform = "none";
      }
      const footerLogo = document.querySelector<HTMLElement>(".footer-logo-animate");
      if (footerLogo) {
        footerLogo.style.transform = "none";
      }
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const footer = document.querySelector<HTMLElement>(".footer-animate");
      if (footer) {
        gsap.fromTo(footer,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: footer,
              start: "top bottom-=50",
              toggleActions: "play none none none"
            }
          }
        );
      }

      const footerLogo = document.querySelector<HTMLElement>(".footer-logo-animate");
      if (footerLogo) {
        gsap.fromTo(footerLogo,
          { scale: 0.8, rotate: -5 },
          {
            scale: 1,
            rotate: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: footerLogo,
              start: "top bottom-=20",
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
    <footer className="mt-32 border-t border-border bg-background footer-animate">
      <div className="container-page py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2 space-y-4">
          <div className="font-serif text-2xl footer-logo-animate">Saaranya<span className="text-primary">.</span></div>
          <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
            A property advisory rooted in old-world trust. We work with a small list of clients, on a small list of homes.
          </p>
        </div>
        <div className="space-y-3 text-sm">
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Explore</div>
          <Link to="/properties" className="block text-foreground/80 hover:text-foreground">Properties</Link>
          <Link to="/about" className="block text-foreground/80 hover:text-foreground">About</Link>
          <Link to="/contact" className="block text-foreground/80 hover:text-foreground">Contact</Link>
          <Link to="/list-property" className="block text-foreground/80 hover:text-foreground">List Your Property</Link>
        </div>
        <div className="space-y-3 text-sm">
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Get in Touch</div>
          <a href="tel:+919876543210" className="block text-foreground/80 hover:text-foreground">+91 98765 43210</a>
          <a href="mailto:hello@saaranya.in" className="block text-foreground/80 hover:text-foreground">hello@saaranya.in</a>
          <a href="https://wa.me/919876543210" className="block text-foreground/80 hover:text-foreground">WhatsApp</a>
          <div className="flex gap-3 pt-2">
            <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-foreground"><Instagram className="h-4 w-4" /></a>
            <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-foreground"><Facebook className="h-4 w-4" /></a>
            <a href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-foreground"><Linkedin className="h-4 w-4" /></a>
            <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-foreground"><Twitter className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-page py-6 text-xs text-muted-foreground flex flex-col md:flex-row justify-between gap-2">
          <div>© {new Date().getFullYear()} Saaranya Estates. All rights reserved.</div>
          <div>Crafted with care in India.</div>
        </div>
      </div>
    </footer>
  );
}
