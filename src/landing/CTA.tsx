import { ArrowRight } from 'lucide-react'

interface CTAProps {
  onNavigateToShell?: () => void
}

export function CTA({ onNavigateToShell }: CTAProps) {
  return (
    <section className="bgd-cta">
      <h2 className="bgd-cta__title">Ready to build something amazing?</h2>
      <p className="bgd-cta__subtitle">
        Start building with BGD UI today. Open source, production ready, and endlessly customizable.
      </p>
      <div className="bgd-cta__actions">
        <button className="bgd-hero__btn-primary" onClick={onNavigateToShell}>
          Get Started
          <ArrowRight size={18} />
        </button>
        <button className="bgd-hero__btn-secondary" onClick={onNavigateToShell}>
          Browse Components
        </button>
      </div>
    </section>
  )
}
