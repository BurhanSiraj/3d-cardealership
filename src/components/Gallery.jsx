import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80",
    label: "APEX · Grand Tourer",
    location: "Amalfi Coast, Italy",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    label: "VANTA · Sport Coupe",
    location: "Swiss Alps",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80",
    label: "NOCTIS · Hypercar",
    location: "Tokyo, Japan",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80",
    label: "SOLARA · Electric GT",
    location: "Iceland",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1494783367193-149034c05e8f?w=1200&q=80",
    label: "OBSIDIAN · Luxury Sedan",
    location: "Sahara Desert",
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200&q=80",
    label: "ZENTURO · Heritage",
    location: "Pacific Coast Highway",
  },
];

function Gallery() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      // Header entrance
      const headerEls = headerRef.current?.querySelectorAll(
        ".gallery-header-reveal",
      );
      if (headerEls?.length) {
        gsap.fromTo(
          headerEls,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
            },
          },
        );
      }

      // Compute and set the tall container height so sticky scroll has room
      const computeHeight = () => {
        if (!trackRef.current || !scrollContainerRef.current) return;
        const scrollDistance =
          trackRef.current.scrollWidth -
          window.innerWidth +
          window.innerWidth * 0.16;
        scrollContainerRef.current.style.height = `${scrollDistance + window.innerHeight}px`;
      };

      computeHeight();

      gsap.to(trackRef.current, {
        x: () =>
          -(
            trackRef.current.scrollWidth -
            window.innerWidth +
            window.innerWidth * 0.08
          ),
        ease: "none",
        scrollTrigger: {
          trigger: scrollContainerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
          invalidateOnRefresh: true,
          onRefresh: computeHeight,
          onUpdate: (self) => {
            const index = Math.round(
              self.progress * (galleryImages.length - 1),
            );
            setActiveIndex(index);
          },
        },
      });

      ScrollTrigger.refresh();
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative bg-zenturo-black"
    >
      {/* Section header — normal flow */}
      <div ref={headerRef} className="px-8 pb-16 pt-32 md:px-16">
        <p className="gallery-header-reveal font-body text-xs uppercase tracking-[0.4em] text-zenturo-gold opacity-0">
          THE GALLERY
        </p>
        <h2 className="gallery-header-reveal mt-4 font-display text-4xl font-normal italic text-zenturo-white opacity-0 md:text-5xl">
          Every Road. Every Light.
        </h2>
      </div>

      {/* Tall scroll container — height set by JS */}
      <div ref={scrollContainerRef}>
        {/* Sticky viewport — stays in view while parent scrolls */}
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Progress counter */}
          <div
            className="absolute right-8 top-8 z-10 font-body text-xs uppercase tracking-widest md:right-16"
            style={{ color: "rgba(201,168,76,0.6)" }}
          >
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(galleryImages.length).padStart(2, "0")}
          </div>

          {/* Horizontal track */}
          <div
            ref={trackRef}
            className="flex h-full items-center gap-6 px-[8vw] will-change-transform"
          >
            {galleryImages.map((image, index) => (
              <article
                key={image.id}
                className="group relative h-[75vh] w-[65vw] max-w-[680px] flex-shrink-0 overflow-hidden rounded-[2px] transition-[outline] duration-300 ease-out hover:outline hover:outline-1 hover:outline-[rgba(201,168,76,0.4)] md:w-[45vw]"
              >
                <img
                  src={image.url}
                  alt={image.label}
                  className="absolute left-0 top-[-5%] h-[110%] w-full object-cover transition-transform duration-[600ms] ease-out will-change-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                <p
                  className="absolute left-6 top-6 font-display text-xs"
                  style={{ color: "rgba(201,168,76,0.4)" }}
                >
                  {String(index + 1).padStart(2, "0")}
                </p>

                <div className="absolute bottom-8 left-8">
                  <p className="font-body text-sm font-medium uppercase tracking-widest text-zenturo-white transition-colors duration-300 group-hover:text-zenturo-gold">
                    {image.label}
                  </p>
                  <p
                    className="mt-1 font-body text-xs uppercase tracking-wider"
                    style={{ color: "rgba(201,168,76,0.7)" }}
                  >
                    {image.location}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom strip — normal flow */}
      <div className="flex items-center justify-between px-8 py-12 md:px-16">
        <p
          className="font-body text-xs tracking-wider"
          style={{ color: "rgba(245,240,232,0.3)" }}
        >
          Scroll to explore
        </p>
        <div
          className="h-px w-20"
          style={{ backgroundColor: "rgba(201,168,76,0.2)" }}
        />
      </div>
    </section>
  );
}

export default Gallery;
