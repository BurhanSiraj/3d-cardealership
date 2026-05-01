import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import CarScene from './CarScene'

gsap.registerPlugin(useGSAP)

function CustomCursor({ active }) {
  const cursorRef = useRef(null)
  const positionRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!active) {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '0'
      }

      return undefined
    }

    let animationFrame

    const handlePointerMove = (event) => {
      targetRef.current.x = event.clientX
      targetRef.current.y = event.clientY

      if (cursorRef.current) {
        cursorRef.current.style.opacity = '1'
      }
    }

    const render = () => {
      positionRef.current.x += (targetRef.current.x - positionRef.current.x) * 0.18
      positionRef.current.y += (targetRef.current.y - positionRef.current.y) * 0.18

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0) translate(-50%, -50%)`
      }

      animationFrame = window.requestAnimationFrame(render)
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    animationFrame = window.requestAnimationFrame(render)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.cancelAnimationFrame(animationFrame)
    }
  }, [active])

  return (
    <div
      ref={cursorRef}
      className="zenturo-cursor pointer-events-none fixed left-0 top-0 z-[60] hidden h-2.5 w-2.5 rounded-full bg-zenturo-gold opacity-0 mix-blend-screen transition-opacity duration-500 md:block"
    />
  )
}

function Hero({ onModelLoaded, showContent }) {
  const containerRef = useRef(null)
  const { contextSafe } = useGSAP({ scope: containerRef })

  useEffect(() => {
    if (!showContent) return undefined

    const reveal = contextSafe(() => {
      const elements = containerRef.current
        ? gsap.utils.toArray(containerRef.current.querySelectorAll('.hero-reveal'))
        : []

      if (!elements.length) return []

      gsap.killTweensOf(elements)
      gsap.fromTo(
        elements,
        {
          opacity: 0,
          y: 40,
          willChange: 'transform, opacity',
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          delay: 0.3,
          overwrite: 'auto',
          onComplete: () => {
            gsap.set(elements, { clearProps: 'willChange' })
          },
        },
      )

      return elements
    })

    const elements = reveal()
    const fallback = window.setTimeout(() => {
      if (elements?.length) {
        gsap.set(elements, {
          opacity: 1,
          y: 0,
          clearProps: 'willChange',
        })
      }
    }, 2500)

    return () => window.clearTimeout(fallback)
  }, [showContent, contextSafe])

  const revealState = showContent
    ? ''
    : 'translate-y-10 opacity-0 will-change-transform'

  return (
    <section
      ref={containerRef}
      id="top"
      className="isolate relative h-screen min-h-[720px] w-full overflow-hidden bg-zenturo-black sm:min-h-[760px] md:min-h-screen"
    >
      <CarScene onLoaded={onModelLoaded} />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[40%] bg-gradient-to-t from-zenturo-black via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-full bg-gradient-to-r from-zenturo-black/70 to-transparent md:w-3/4" />

      <div className="absolute inset-0 z-20 flex items-end pb-24 pl-8 pr-6 md:pb-32 md:pl-16">
        <div className="max-w-2xl">
          <p
            className={`hero-reveal mb-4 font-body text-xs uppercase tracking-[0.4em] text-zenturo-gold ${revealState}`}
          >
            PERFORMANCE · LUXURY · PRECISION
          </p>
          <h1
            className={`hero-reveal font-display text-[3.65rem] font-extrabold leading-none text-zenturo-white sm:text-7xl md:text-8xl lg:text-[9rem] ${revealState}`}
          >
            ZENTURO
          </h1>
          <p
            className={`hero-reveal mt-2 font-display text-2xl font-normal italic tracking-wide text-zenturo-gold md:text-3xl ${revealState}`}
          >
            Engineered Beyond Limits
          </p>
          <p
            className={`hero-reveal mt-6 max-w-md font-body text-base font-light leading-relaxed text-zenturo-white/60 md:text-lg ${revealState}`}
          >
            Where raw power meets uncompromising design. Every curve calculated.
            Every detail intentional.
          </p>
          <div className={`hero-reveal mt-8 flex flex-wrap items-center gap-4 ${revealState}`}>
            <a
              href="#models"
              className="inline-flex min-h-12 items-center justify-center border border-zenturo-gold px-8 py-3 font-body text-sm uppercase tracking-widest text-zenturo-gold transition duration-400 hover:bg-zenturo-gold hover:text-zenturo-black focus:outline-none focus-visible:ring-2 focus-visible:ring-zenturo-gold focus-visible:ring-offset-2 focus-visible:ring-offset-zenturo-black"
            >
              Explore Models
            </a>
            <a
              href="#film"
              className="group inline-flex min-h-12 items-center gap-3 px-2 py-3 font-body text-sm uppercase tracking-widest text-zenturo-white/60 transition duration-300 hover:text-zenturo-white"
            >
              <span className="h-0 w-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-zenturo-gold transition duration-300 group-hover:border-l-zenturo-gold-light" />
              Watch Film
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3">
        <div className="scroll-indicator-pulse relative h-10 w-px bg-zenturo-gold/50" />
        <p className="font-body text-[10px] uppercase tracking-[0.3em] text-zenturo-white/40">
          SCROLL
        </p>
      </div>

      <CustomCursor active={showContent} />
    </section>
  )
}

export default Hero
