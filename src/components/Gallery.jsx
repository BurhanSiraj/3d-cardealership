import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const galleryImages = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80',
    label: 'APEX · Grand Tourer',
    location: 'Amalfi Coast, Italy',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
    label: 'VANTA · Sport Coupe',
    location: 'Swiss Alps',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80',
    label: 'NOCTIS · Hypercar',
    location: 'Tokyo, Japan',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80',
    label: 'SOLARA · Electric GT',
    location: 'Iceland',
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1494783367193-149034c05e8f?w=1200&q=80',
    label: 'OBSIDIAN · Luxury Sedan',
    location: 'Sahara Desert',
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200&q=80',
    label: 'ZENTURO · Heritage',
    location: 'Pacific Coast Highway',
  },
]

function Gallery() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const pinRef = useRef(null)
  const trackRef = useRef(null)
  const cardsRef = useRef([])
  const imagesRef = useRef([])
  const mainScrollAnimationRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useGSAP(
    () => {
      const headerElements =
        headerRef.current?.querySelectorAll('.gallery-header-reveal')

      if (headerElements?.length) {
        gsap.fromTo(
          headerElements,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.15,
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 80%',
            },
          },
        )
      }

      if (!trackRef.current || !pinRef.current) return undefined

      const mainScrollAnimation = gsap.to(trackRef.current, {
        x: () =>
          -(
            trackRef.current.scrollWidth -
            window.innerWidth +
            window.innerWidth * 0.08
          ),
        ease: 'none',
        scrollTrigger: {
          trigger: pinRef.current,
          start: 'top top',
          end: () => `+=${trackRef.current.scrollWidth}`,
          pin: true,
          scrub: 1.5,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const index = Math.round(self.progress * (galleryImages.length - 1))
            setActiveIndex(index)
          },
        },
      })

      mainScrollAnimationRef.current = mainScrollAnimation

      imagesRef.current.forEach((imageRef, index) => {
        const cardElement = cardsRef.current[index]

        if (!imageRef || !cardElement) return

        gsap.to(imageRef, {
          y: '8%',
          ease: 'none',
          scrollTrigger: {
            trigger: cardElement,
            containerAnimation: mainScrollAnimation,
            start: 'left right',
            end: 'right left',
            scrub: true,
          },
        })
      })

      return () => {
        mainScrollAnimationRef.current = null
      }
    },
    { scope: sectionRef },
  )

  return (
    <section id="gallery" ref={sectionRef} className="relative bg-zenturo-black">
      <div ref={headerRef} className="px-8 pb-16 pt-32 md:px-16">
        <p className="gallery-header-reveal mb-4 font-body text-xs uppercase tracking-[0.4em] text-zenturo-gold opacity-0">
          THE GALLERY
        </p>
        <h2 className="gallery-header-reveal font-display text-4xl font-normal italic text-zenturo-white opacity-0 md:text-5xl">
          Every Road. Every Light.
        </h2>
      </div>

      <div ref={pinRef} className="relative h-screen overflow-hidden">
        <div className="absolute right-8 top-8 z-10 font-body text-xs uppercase tracking-widest text-zenturo-gold/60 md:right-16">
          {String(activeIndex + 1).padStart(2, '0')} /{' '}
          {String(galleryImages.length).padStart(2, '0')}
        </div>

        <div
          ref={trackRef}
          className="flex h-full gap-6 px-[8vw] will-change-transform"
        >
          {galleryImages.map((image, index) => (
            <article
              key={image.id}
              ref={(element) => {
                cardsRef.current[index] = element
              }}
              className="group relative h-[75vh] w-[65vw] max-w-[680px] flex-shrink-0 self-center overflow-hidden rounded-[2px] transition-all duration-400 ease-out hover:outline hover:outline-1 hover:outline-[rgba(201,168,76,0.4)] md:w-[45vw]"
            >
              <img
                ref={(element) => {
                  imagesRef.current[index] = element
                }}
                src={image.url}
                alt={image.label}
                className="absolute left-0 top-[-5%] h-[110%] w-full object-cover transition-transform duration-[600ms] ease-out will-change-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              <p className="absolute left-8 top-6 font-display text-xs text-zenturo-gold/40">
                {String(index + 1).padStart(2, '0')}
              </p>

              <div className="absolute bottom-8 left-8">
                <p className="font-body text-sm font-medium uppercase tracking-widest text-zenturo-white transition-colors duration-400 ease-out group-hover:text-zenturo-gold">
                  {image.label}
                </p>
                <p className="mt-1 font-body text-xs uppercase tracking-wider text-zenturo-gold/70">
                  {image.location}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between px-8 py-12 md:px-16">
        <p className="font-body text-xs tracking-wider text-zenturo-white/30">
          Scroll to explore each model in detail
        </p>
        <div className="h-px w-20 bg-zenturo-gold/20" />
      </div>
    </section>
  )
}

export default Gallery
