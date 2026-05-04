import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { target: 720, decimals: 0, label: 'HORSEPOWER' },
  { target: 2.8, decimals: 1, label: '0–100 KM/H' },
  { target: 340, decimals: 0, label: 'TOP SPEED KM/H' },
]

function About() {
  const sectionRef = useRef(null)
  const eyebrowRef = useRef(null)
  const headingRef = useRef(null)
  const bodyRef = useRef(null)
  const lineRef = useRef(null)
  const statsRef = useRef(null)
  const statValueRefs = useRef([])
  const taglineRef = useRef(null)

  useGSAP(
    () => {
      gsap.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: eyebrowRef.current,
            start: 'top 80%',
          },
        },
      )

      const lines = headingRef.current?.querySelectorAll('.heading-line')
      if (lines?.length) {
        gsap.fromTo(
          lines,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.2,
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 75%',
            },
          },
        )
      }

      gsap.fromTo(
        bodyRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bodyRef.current,
            start: 'top 80%',
          },
        },
      )

      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: lineRef.current,
            start: 'top 85%',
          },
        },
      )

      stats.forEach((stat, index) => {
        const counter = { val: 0 }
        gsap.to(counter, {
          val: stat.target,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
          },
          onUpdate: () => {
            const el = statValueRefs.current[index]
            if (el) {
              el.textContent =
                stat.decimals > 0
                  ? counter.val.toFixed(stat.decimals)
                  : Math.round(counter.val).toString()
            }
          },
        })
      })

      gsap.fromTo(
        taglineRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: taglineRef.current,
            start: 'top 85%',
          },
        },
      )
    },
    { scope: sectionRef },
  )

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-zenturo-black px-8 py-20 md:px-16 md:py-32"
    >
      <div className="mx-auto max-w-5xl text-center">
        <p
          ref={eyebrowRef}
          className="font-body text-xs uppercase tracking-[0.5em] opacity-0"
          style={{ color: 'rgba(201,168,76,0.7)' }}
        >
          EST. 2024
        </p>

        <div ref={headingRef} className="mt-8">
          <h2
            className="font-display font-extrabold leading-[1.05] text-zenturo-white"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)' }}
          >
            <span className="heading-line block opacity-0">
              We don&apos;t build cars.
            </span>
            <span className="heading-line block opacity-0">
              We build obsessions.
            </span>
          </h2>
        </div>

        <p
          ref={bodyRef}
          className="mx-auto mt-10 max-w-xl font-body text-lg font-light leading-relaxed opacity-0 md:text-xl"
          style={{ color: 'rgba(245,240,232,0.5)' }}
        >
          ZENTURO exists for the ones who feel everything — the weight of a
          curve, the scream of a downshift, the silence after full throttle.
        </p>

        <div
          ref={lineRef}
          className="mx-auto mt-16 h-px w-10"
          style={{
            backgroundColor: 'rgba(201,168,76,0.4)',
            transformOrigin: 'center',
            transform: 'scaleX(0)',
          }}
        />

        <div
          ref={statsRef}
          className="mt-16 flex justify-center gap-16 md:gap-24"
        >
          {stats.map((stat, index) => (
            <div key={stat.label}>
              <p className="font-display text-5xl font-bold text-zenturo-gold md:text-6xl">
                <span
                  ref={(el) => {
                    statValueRefs.current[index] = el
                  }}
                >
                  0
                </span>
              </p>
              <p
                className="mt-3 font-body uppercase"
                style={{
                  fontSize: '10px',
                  letterSpacing: '0.3em',
                  color: 'rgba(245,240,232,0.35)',
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <p
          ref={taglineRef}
          className="mt-20 font-display text-lg font-normal italic tracking-wide opacity-0"
          style={{ color: 'rgba(201,168,76,0.6)' }}
        >
          Engineered in silence. Delivered in thunder.
        </p>
      </div>
    </section>
  )
}

export default About
