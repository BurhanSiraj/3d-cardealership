import { useEffect, useState } from 'react'

function LoadingScreen({ isLoaded, onComplete }) {
  const [shouldRender, setShouldRender] = useState(true)

  useEffect(() => {
    if (!isLoaded) return undefined

    const timeout = window.setTimeout(() => {
      setShouldRender(false)
      onComplete?.()
    }, 1000)

    return () => window.clearTimeout(timeout)
  }, [isLoaded, onComplete])

  if (!shouldRender) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-zenturo-black will-change-transform ${
        isLoaded ? 'loading-screen-exit' : ''
      }`}
      aria-hidden={isLoaded}
    >
      <div
        className={`flex flex-col items-center will-change-transform ${
          isLoaded ? 'loading-mark-exit' : ''
        }`}
      >
        <p className="font-display text-3xl font-bold tracking-[0.3em] text-zenturo-gold sm:text-4xl">
          ZENTURO
        </p>
        <div className="mt-7 h-px w-52 overflow-hidden bg-zenturo-gold-dim/30">
          <div className="loading-line-progress h-full w-full origin-left bg-zenturo-gold" />
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen
