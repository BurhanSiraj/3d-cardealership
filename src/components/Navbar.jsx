import { useEffect, useState } from 'react'

const navLinks = ['Models', 'About', 'Gallery', 'Services', 'Contact']

function Navbar({ visible }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const navVisibility = visible
    ? 'translate-y-0 opacity-100 delay-500'
    : '-translate-y-5 opacity-0 pointer-events-none'

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-40 flex h-20 w-full items-center justify-between px-8 transition-[background-color,backdrop-filter,transform,opacity] duration-500 ease-out md:px-16 ${navVisibility} ${
          isScrolled ? 'bg-zenturo-black/85 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <a
          href="#top"
          className="font-display text-lg font-bold tracking-[0.25em] text-zenturo-gold transition-opacity duration-300 hover:opacity-80"
          aria-label="ZENTURO home"
        >
          ZENTURO
        </a>

        <nav className="hidden items-center gap-8 md:flex lg:gap-10">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="font-body text-sm font-normal uppercase tracking-wider text-zenturo-white/70 transition duration-300 hover:text-zenturo-gold hover:opacity-100"
            >
              {link}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="group flex h-11 w-11 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span
            className={`h-px w-7 bg-zenturo-gold transition duration-300 ${
              isMenuOpen ? 'translate-y-[7px] rotate-45' : ''
            }`}
          />
          <span
            className={`h-px w-7 bg-zenturo-gold transition duration-300 ${
              isMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`h-px w-7 bg-zenturo-gold transition duration-300 ${
              isMenuOpen ? '-translate-y-[7px] -rotate-45' : ''
            }`}
          />
        </button>
      </header>

      <div
        className={`fixed inset-0 z-30 flex items-center justify-center bg-zenturo-black/95 backdrop-blur-md transition duration-500 md:hidden ${
          isMenuOpen && visible
            ? 'opacity-100 pointer-events-auto'
            : 'pointer-events-none opacity-0'
        }`}
      >
        <nav className="flex flex-col items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="font-display text-4xl font-semibold text-zenturo-white transition duration-300 hover:text-zenturo-gold"
              onClick={() => setIsMenuOpen(false)}
            >
              {link}
            </a>
          ))}
        </nav>
      </div>
    </>
  )
}

export default Navbar
