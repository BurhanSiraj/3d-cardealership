import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger);

const socialLinks = ["Instagram", "Twitter/X", "YouTube"];

function Contact() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const footerRef = useRef(null);
  const videoRef = useRef(null);

  useGSAP(
    () => {
      const headingLines = contentRef.current?.querySelectorAll(
        ".contact-heading-line",
      );
      const revealElements = contentRef.current?.querySelectorAll(
        ".contact-detail-reveal",
      );

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      timeline
        .fromTo(
          headingLines,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.2,
          },
        )
        .fromTo(
          revealElements,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            stagger: 0.12,
          },
          "-=0.25",
        );

      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 55%",
          },
        },
      );

      // Fade video in once section enters view
      gsap.fromTo(
        videoRef.current,
        { opacity: 0 },
        {
          opacity: 0.18,
          duration: 1.6,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zenturo-black px-8"
    >
      {/* Video background */}
      <video
        ref={videoRef}
        src={"https://ik.imagekit.io/asadtanvir/contact-bg.mp4"}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-0"
        style={{
          mixBlendMode: "lighten",
        }}
      />

      {/* Overlay: keeps legibility, preserves video atmosphere */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      {/* Gold radial glow — kept, sits above video */}
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(201,168,76,0.06) 0%, transparent 70%)",
        }}
      />

      <div ref={contentRef} className="relative z-10 text-center">
        <h2 className="font-display text-5xl font-extrabold leading-[1.05] text-zenturo-white md:text-7xl lg:text-8xl">
          <span className="contact-heading-line block opacity-0">
            The road awaits.
          </span>
          <span className="contact-heading-line block opacity-0">
            Are you ready?
          </span>
        </h2>

        <div className="contact-detail-reveal mx-auto my-10 h-px w-[60px] bg-zenturo-gold opacity-0" />

        <a
          href="#configure"
          className="contact-detail-reveal inline-flex items-center justify-center border border-zenturo-gold px-10 py-4 font-body text-sm uppercase tracking-widest text-zenturo-gold opacity-0 transition duration-400 hover:bg-zenturo-gold hover:text-zenturo-black"
        >
          Configure Your ZENTURO
        </a>

        <div className="contact-detail-reveal mt-10 flex justify-center gap-8 opacity-0">
          {socialLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace("/", "-")}`}
              className="font-body text-xs uppercase tracking-widest text-zenturo-white/40 transition duration-300 hover:text-zenturo-gold hover:opacity-100"
            >
              {link}
            </a>
          ))}
        </div>
      </div>

      <footer
        ref={footerRef}
        className="absolute bottom-0 left-0 z-10 flex w-full flex-col items-center justify-between gap-4 border-t border-[rgba(201,168,76,0.1)] px-8 py-8 opacity-0 md:flex-row md:px-16"
      >
        <p className="font-body text-xs text-zenturo-white/30">
          © 2024 ZENTURO MOTORS. All rights reserved.
        </p>
        <p className="font-display text-sm tracking-[0.3em] text-zenturo-gold/50">
          ZENTURO
        </p>
        <p className="font-body text-xs text-zenturo-white/30">
          Crafted with precision
        </p>
      </footer>
    </section>
  );
}

export default Contact;
