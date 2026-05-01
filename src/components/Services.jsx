import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    title: 'Bespoke Configuration',
    description: 'Personalize every detail of your ZENTURO.',
    image:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  },
  {
    title: 'White Glove Delivery',
    description:
      'Your car arrives on your terms, anywhere in the world.',
    image:
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80',
  },
  {
    title: 'Lifetime Maintenance',
    description: 'Dedicated technicians, zero compromise.',
    image:
      'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&q=80',
  },
  {
    title: 'Track Experience',
    description:
      'Push the limits at world-class circuits with ZENTURO coaches.',
    image:
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80',
  },
]

function Services() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const rowsRef = useRef([])
  const imagesRef = useRef([])
  const textBlocksRef = useRef([])

  useGSAP(
    () => {
      const headerElements =
        headerRef.current?.querySelectorAll('.services-header-reveal')

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

      rowsRef.current.forEach((row, index) => {
        const image = imagesRef.current[index]
        const textBlock = textBlocksRef.current[index]
        const isEvenRow = index % 2 === 1

        if (!row || !image || !textBlock) return

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: 'top 75%',
            once: true,
          },
        })

        timeline
          .fromTo(
            image,
            { opacity: 0, x: isEvenRow ? 80 : -80 },
            {
              opacity: 1,
              x: 0,
              duration: 0.9,
              ease: 'power3.out',
            },
          )
          .fromTo(
            textBlock,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: 'power3.out',
            },
            '-=0.75',
          )
      })
    },
    { scope: sectionRef },
  )

  return (
    <section id="services" ref={sectionRef} className="bg-zenturo-black">
      <div ref={headerRef} className="px-8 pb-16 pt-32 md:px-16">
        <p className="services-header-reveal mb-4 font-body text-xs uppercase tracking-[0.4em] text-zenturo-gold opacity-0">
          OUR SERVICES
        </p>
        <h2 className="services-header-reveal font-display text-4xl font-normal italic text-zenturo-white opacity-0 md:text-5xl">
          The ZENTURO Experience
        </h2>
      </div>

      <div>
        {services.map((service, index) => {
          const number = String(index + 1).padStart(2, '0')
          const isEvenRow = index % 2 === 1

          return (
            <article
              key={service.title}
              ref={(element) => {
                rowsRef.current[index] = element
              }}
              className={`flex min-h-[75vh] w-full flex-col overflow-hidden md:min-h-[78vh] ${
                isEvenRow ? 'md:flex-row-reverse' : 'md:flex-row'
              }`}
            >
              <div
                ref={(element) => {
                  imagesRef.current[index] = element
                }}
                className="group relative h-[46vh] overflow-hidden opacity-0 md:h-auto md:w-1/2"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-full w-full scale-105 object-cover transition-transform duration-[600ms] ease-out group-hover:scale-100"
                />
              </div>

              <div className="flex min-h-[42vh] items-center justify-center bg-[#111111] px-8 py-16 md:min-h-0 md:w-1/2 md:px-16 lg:px-24">
                <div
                  ref={(element) => {
                    textBlocksRef.current[index] = element
                  }}
                  className="max-w-lg opacity-0"
                >
                  <p className="font-display text-7xl font-bold leading-none text-zenturo-gold/30 md:text-8xl">
                    {number}
                  </p>
                  <h3 className="mt-6 font-display text-4xl font-bold leading-tight text-zenturo-white md:text-5xl">
                    {service.title}
                  </h3>
                  <p className="mt-4 max-w-sm font-body text-base font-light leading-relaxed text-zenturo-white/60 md:text-lg">
                    {service.description}
                  </p>
                  <div className="mt-8 h-px w-12 bg-zenturo-gold" />
                  <a
                    href={`#service-${index + 1}`}
                    className="mt-6 inline-flex font-body text-xs uppercase tracking-widest text-zenturo-gold transition-colors duration-300 hover:text-zenturo-gold-light"
                  >
                    Learn More →
                  </a>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default Services
