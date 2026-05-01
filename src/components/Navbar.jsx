import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const navLinks = ['Models', 'About', 'Gallery', 'Services', 'Contact']

function Navbar({ visible = true }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const navRef = useRef(null)
  const panelLinksRef = useRef([])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isPanelOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isPanelOpen])

  useEffect(() => {
    if (!navRef.current) return

    if (visible) {
      const fallback = window.setTimeout(() => {
        gsap.set(navRef.current, {
          opacity: 1,
          y: 0,
          clearProps: 'willChange',
        })
      }, 1200)

      gsap.fromTo(
        navRef.current,
        { opacity: 0, y: -20, willChange: 'transform, opacity' },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.3,
          ease: 'power2.out',
          onComplete: () => {
            gsap.set(navRef.current, { clearProps: 'willChange' })
          },
        },
      )

      return () => window.clearTimeout(fallback)
    } else {
      gsap.set(navRef.current, { opacity: 0, y: -20 })
    }
  }, [visible])

  useEffect(() => {
    const links = panelLinksRef.current.filter(Boolean)

    if (isPanelOpen) {
      const fallback = window.setTimeout(() => {
        gsap.killTweensOf(links)
        gsap.set(links, { opacity: 1, x: 0 })
      }, 950)

      gsap.killTweensOf(links)
      gsap.fromTo(
        links,
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.07,
          delay: 0.2,
          ease: 'power3.out',
        },
      )

      return () => window.clearTimeout(fallback)
    } else {
      gsap.killTweensOf(links)
      gsap.set(links, { opacity: 0, x: 40 })
    }
  }, [isPanelOpen])

  const closePanel = () => setIsPanelOpen(false)

  return (
    <>
      <header
        ref={navRef}
        className={`fixed left-0 top-0 z-50 flex h-20 w-full items-center justify-between px-8 transition-[background-color,backdrop-filter] duration-400 ease-[ease] md:px-16 ${
          visible
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-5 opacity-0'
        } ${
          isScrolled
            ? 'bg-[rgba(10,10,10,0.9)] backdrop-blur-md'
            : 'bg-transparent'
        }`}
      >
        <a
          href="#top"
          className="font-display text-lg font-bold tracking-[0.25em] text-[#c9a84c]"
          aria-label="ZENTURO home"
        >
          ZENTURO
        </a>

        <div className="flex items-center gap-8">
          <nav className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="font-body text-sm font-normal uppercase tracking-widest text-[rgba(245,240,232,0.6)] transition-colors duration-300 hover:text-[#c9a84c]"
              >
                {link}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="group flex h-10 w-10 flex-col items-end justify-center gap-[6px]"
            aria-label="Open navigation panel"
            aria-expanded={isPanelOpen}
            onClick={() => setIsPanelOpen(true)}
          >
            <span className="h-px w-6 bg-[#c9a84c] transition-[width] duration-300" />
            <span className="h-px w-6 bg-[#c9a84c] transition-[width] duration-300 group-hover:w-3" />
            <span className="h-px w-6 bg-[#c9a84c] transition-[width] duration-300" />
          </button>
        </div>
      </header>

      <button
        type="button"
        className={`fixed inset-0 z-50 bg-[rgba(0,0,0,0.6)] transition-opacity duration-300 ${
          isPanelOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-label="Close navigation panel"
        onClick={closePanel}
      />

      <aside
        className={`fixed right-0 top-0 z-[60] h-screen w-[80vw] bg-[#111111] transition-transform duration-[450ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] sm:w-[420px] ${
          isPanelOpen
            ? 'pointer-events-auto translate-x-0'
            : 'pointer-events-none translate-x-full'
        }`}
        aria-hidden={!isPanelOpen}
      >
        <button
          type="button"
          className="absolute right-8 top-8 font-display text-2xl text-[#c9a84c] transition-transform duration-300 hover:rotate-90"
          aria-label="Close navigation panel"
          onClick={closePanel}
        >
          ×
        </button>

        <nav className="absolute bottom-[12vh] left-0 w-full pl-12">
          {navLinks.map((link, index) => (
            <div key={link} className="mb-8 w-full">
              <a
                ref={(element) => {
                  panelLinksRef.current[index] = element
                }}
                href={`#${link.toLowerCase()}`}
                className="block font-display text-4xl font-semibold text-[#f5f0e8] opacity-0 transition duration-300 ease-out hover:translate-x-[10px] hover:text-[#c9a84c]"
                onClick={closePanel}
              >
                {link}
              </a>
              <span className="mt-5 block h-px w-full bg-[rgba(201,168,76,0.15)]" />
            </div>
          ))}
        </nav>
      </aside>
    </>
  )
}

export default Navbar
