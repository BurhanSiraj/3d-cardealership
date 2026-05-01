import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const aboutImage =
  'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=85'

function About() {
  const sectionRef = useRef(null)
  const bgImageRef = useRef(null)
  const topLabelRef = useRef(null)
  const centerTextRef = useRef(null)
  const bottomLabelRef = useRef(null)

  useGSAP(
    () => {
      gsap.set(bgImageRef.current, { scale: 1.05 })

      gsap.to(bgImageRef.current, {
        y: '15%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.fromTo(
        topLabelRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        },
      )

      const headingLines = centerTextRef.current?.querySelectorAll(
        '.about-heading-line',
      )
      const bodyCopy = centerTextRef.current?.querySelector('.about-copy')
      const detailElements = centerTextRef.current?.querySelectorAll(
        '.about-detail-reveal',
      )

      const centerTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
        },
      })

      centerTimeline
        .fromTo(
          headingLines,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.2,
          },
        )
        .fromTo(
          bodyCopy,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
          },
          '-=0.35',
        )
        .fromTo(
          detailElements,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.12,
          },
          '-=0.45',
        )

      gsap.fromTo(
        bottomLabelRef.current,
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
          },
        },
      )
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative h-screen min-h-screen overflow-hidden bg-zenturo-black"
    >
      <img
        ref={bgImageRef}
        src={aboutImage}
        alt=""
        className="absolute inset-x-0 top-[-10%] z-0 h-[120%] w-full object-cover object-center"
      />

      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-zenturo-black via-zenturo-black/60 to-zenturo-black/30" />
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, #0a0a0a 100%)',
        }}
      />

      <p
        ref={topLabelRef}
        className="absolute left-8 top-24 z-20 font-body text-xs uppercase tracking-[0.5em] text-zenturo-gold/70 opacity-0 md:left-16"
      >
        EST. 2024
      </p>

      <div
        ref={centerTextRef}
        className="absolute bottom-0 left-8 top-0 z-20 flex max-w-3xl flex-col justify-center md:left-16"
      >
        <h2 className="font-display text-5xl font-extrabold leading-[1.1] text-[#f5f0e8] md:text-6xl lg:text-7xl">
          <span className="about-heading-line block opacity-0">
            Built for those
          </span>
          <span className="about-heading-line block opacity-0">
            who refuse ordinary.
          </span>
        </h2>

        <p className="about-copy mt-8 max-w-lg font-body text-base font-light leading-[1.8] text-[rgba(245,240,232,0.65)] opacity-0 md:text-lg">
          ZENTURO was born from a single obsession — that a car should provoke
          the same feeling as standing at the edge of something vast. Not just
          transportation. A statement of existence.
        </p>

        <div className="about-detail-reveal mt-10 h-px w-[60px] bg-zenturo-gold/60 opacity-0" />

        <div className="about-detail-reveal mt-8 flex gap-12 opacity-0">
          <div>
            <p className="font-display text-4xl font-bold text-zenturo-gold">
              12
            </p>
            <p className="mt-1 font-body text-xs uppercase tracking-widest text-zenturo-white/50">
              Models in development
            </p>
          </div>
          <div>
            <p className="font-display text-4xl font-bold text-zenturo-gold">
              2026
            </p>
            <p className="mt-1 font-body text-xs uppercase tracking-widest text-zenturo-white/50">
              First delivery
            </p>
          </div>
        </div>
      </div>

      <div
        ref={bottomLabelRef}
        className="absolute bottom-16 right-8 z-20 text-right opacity-0 md:right-16"
      >
        <p className="font-body text-xs uppercase tracking-[0.5em] text-zenturo-white/30">
          ZENTURO MOTORS
        </p>
        <div className="mx-auto mt-4 h-10 w-px bg-zenturo-gold/30" />
      </div>
    </section>
  )
}

export default About
