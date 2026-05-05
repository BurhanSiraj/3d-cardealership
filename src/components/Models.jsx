import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const models = [
  {
    id: 1,
    name: "ZENTURO APEX",
    tag: "Grand Tourer · 2024",
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=640&q=80",
  },
  {
    id: 2,
    name: "ZENTURO VANTA",
    tag: "Sport Coupe · 2024",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=640&q=80",
  },
  {
    id: 3,
    name: "ZENTURO NOCTIS",
    tag: "Hypercar · 2025",
    image:
      "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=640&q=80",
  },
  {
    id: 4,
    name: "ZENTURO SOLARA",
    tag: "Electric GT · 2025",
    image:
      "https://images.unsplash.com/photo-1493238792000-8113da705763?w=640&q=80",
  },
  {
    id: 5,
    name: "ZENTURO OBSIDIAN",
    tag: "Luxury Sedan · 2025",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=640&q=80",
  },
];

function ModelRow({ model }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li className="group">
      <a
        href={`#model-${model.id}`}
        className="relative flex w-full items-center justify-between px-8 py-6 transition-all duration-[350ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-y-[1.02] md:px-16 md:py-8"
        style={{
          backgroundImage: isHovered ? `url(${model.image})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-zenturo-black/75 transition-opacity duration-[350ms]"
          style={{ opacity: isHovered ? 1 : 0 }}
        />
        <div className="relative z-10 flex flex-col">
          <span
            className="font-display text-4xl font-bold transition-colors duration-[350ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] md:text-5xl lg:text-6xl"
            style={{ color: "#e8edf5" }}
          >
            {model.name}
          </span>
          <span
            className="mt-1 font-body text-xs uppercase tracking-widest transition-colors duration-[350ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
            style={{ color: "rgba(136,146,164,0.6)" }}
          >
            {model.tag}
          </span>
        </div>
        <span
          className="relative z-10 text-2xl text-zenturo-gold/60 transition-all duration-[350ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-zenturo-gold group-hover:opacity-100"
          aria-hidden="true"
        >
          ↗
        </span>
      </a>
      <div className="h-px w-full bg-white/10" />
    </li>
  );
}

function Models() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const listRef = useRef(null);

  useGSAP(
    () => {
      // Header animation
      const headerElements =
        headerRef.current?.querySelectorAll(".header-reveal");
      if (headerElements?.length) {
        gsap.fromTo(
          headerElements,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
            },
          },
        );
      }

      // Row animations
      const rows = listRef.current?.querySelectorAll("li");
      if (rows?.length) {
        gsap.fromTo(
          rows,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 80%",
            },
          },
        );
      }

      // CTA animation
      const cta = sectionRef.current?.querySelector(".cta-reveal");
      if (cta) {
        gsap.fromTo(
          cta,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cta,
              start: "top 90%",
            },
          },
        );
      }

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="models"
      className="w-full bg-zenturo-black pb-24 pt-32"
    >
      {/* Section Header */}
      <div ref={headerRef} className="px-8 md:px-16">
        <p className="header-reveal mb-4 font-body text-xs uppercase tracking-[0.4em] text-zenturo-gold">
          OUR MODELS
        </p>
        <h2 className="header-reveal font-display text-4xl font-normal italic text-zenturo-white md:text-5xl">
          The Lineup
        </h2>
      </div>

      {/* Divider below header */}
      <div className="mt-8 h-px w-full bg-zenturo-gold/20" />

      {/* Models List */}
      <ul ref={listRef} className="list-none">
        {models.map((model) => (
          <ModelRow key={model.id} model={model} />
        ))}
      </ul>

      {/* CTA */}
      <div className="cta-reveal flex justify-center py-10">
        <a
          href="#all-models"
          className="font-body text-sm uppercase tracking-widest text-zenturo-gold/70 transition-all duration-300 hover:text-zenturo-gold hover:underline"
        >
          View All Models →
        </a>
      </div>
    </section>
  );
}

export default Models;
