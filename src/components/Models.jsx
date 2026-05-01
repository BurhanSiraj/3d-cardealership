import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const models = [
  {
    id: 1,
    name: 'ZENTURO APEX',
    tag: 'Grand Tourer · 2024',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=640&q=80',
  },
  {
    id: 2,
    name: 'ZENTURO VANTA',
    tag: 'Sport Coupe · 2024',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=640&q=80',
  },
  {
    id: 3,
    name: 'ZENTURO NOCTIS',
    tag: 'Hypercar · 2025',
    image: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=640&q=80',
  },
  {
    id: 4,
    name: 'ZENTURO SOLARA',
    tag: 'Electric GT · 2025',
    image: 'https://images.unsplash.com/photo-1493238792000-8113da705763?w=640&q=80',
  },
  {
    id: 5,
    name: 'ZENTURO OBSIDIAN',
    tag: 'Luxury Sedan · 2025',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=640&q=80',
  },
]

function ModelRow({ model, onHover, onLeave, onMouseMove }) {
  return (
    <li className="group">
      <a
        href={`#model-${model.id}`}
        className="relative flex w-full items-center justify-between px-8 py-6 transition-all duration-[350ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-y-[1.02] hover:bg-zenturo-gold md:px-16 md:py-8"
        onMouseEnter={() => onHover(model)}
        onMouseLeave={onLeave}
        onMouseMove={onMouseMove}
      >
        <div className="flex flex-col">
          <span className="font-display text-4xl font-bold text-zenturo-white/90 transition-colors duration-[350ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:text-[#0a0a0a] md:text-5xl lg:text-6xl">
            {model.name}
          </span>
          <span className="mt-1 font-body text-xs uppercase tracking-widest text-zenturo-gray/60 transition-colors duration-[350ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:text-[#0a0a0a]/70">
            {model.tag}
          </span>
        </div>
        <span
          className="text-2xl text-zenturo-gold/60 transition-all duration-[350ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#0a0a0a] group-hover:opacity-100"
          aria-hidden="true"
        >
          ↗
        </span>
      </a>
      <div className="h-px w-full bg-white/10" />
    </li>
  )
}

function FloatingPreview({ activeModel, position }) {
  if (!activeModel) return null

  return (
    <div
      className="pointer-events-none fixed z-50 transition-all duration-300 ease-out"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
        opacity: activeModel ? 1 : 0,
      }}
    >
      <img
        src={activeModel.image}
        alt={activeModel.name}
        className="h-[200px] w-[320px] rounded object-cover shadow-2xl transition-transform duration-300 ease-out"
        style={{
          transform: activeModel ? 'scale(1)' : 'scale(0.85)',
        }}
      />
    </div>
  )
}

function Models() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const listRef = useRef(null)
  const [activeModel, setActiveModel] = useState(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useGSAP(
    () => {
      // Header animation
      const headerElements = headerRef.current?.querySelectorAll('.header-reveal')
      if (headerElements?.length) {
        gsap.fromTo(
          headerElements,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 80%',
            },
          },
        )
      }

      // Row animations
      const rows = listRef.current?.querySelectorAll('li')
      if (rows?.length) {
        gsap.fromTo(
          rows,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: listRef.current,
              start: 'top 80%',
            },
          },
        )
      }

      // CTA animation
      const cta = sectionRef.current?.querySelector('.cta-reveal')
      if (cta) {
        gsap.fromTo(
          cta,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cta,
              start: 'top 90%',
            },
          },
        )
      }

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      }
    },
    { scope: sectionRef },
  )

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }

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
          <ModelRow
            key={model.id}
            model={model}
            onHover={setActiveModel}
            onLeave={() => setActiveModel(null)}
            onMouseMove={handleMouseMove}
          />
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

      {/* Floating Preview Image */}
      <FloatingPreview activeModel={activeModel} position={mousePosition} />
    </section>
  )
}

export default Models
