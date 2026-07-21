import { ArrowRight, Sparkles, CheckCircle, Palette } from 'lucide-react'

interface HeroProps {
  onNavigateToShell?: () => void
}

export function Hero({ onNavigateToShell }: HeroProps) {
  return (
    <section className="bgd-hero" style={{ position: 'relative' }}>
      <div className="bgd-halftone" />
      <div className="bgd-hero__badge">
        <span className="bgd-hero__badge-dot" />
        v1.0.0 — Now in Public Beta
      </div>

      <h1 className="bgd-hero__title">
        The UI system for building <span className="bgd-hero__title-accent">business software</span>
      </h1>

      <p className="bgd-hero__subtitle">
        Beautifully designed. Carefully crafted. Open source. Production ready.
      </p>

      <div className="bgd-hero__actions">
        <button className="bgd-hero__btn-primary" onClick={onNavigateToShell}>
          Browse Components
          <ArrowRight size={18} />
        </button>
        <button className="bgd-hero__btn-secondary" onClick={onNavigateToShell}>
          Explore Workspaces
        </button>
      </div>

      <div className="bgd-hero__trust">
        <div className="bgd-hero__trust-item">
          <Sparkles size={18} className="bgd-hero__trust-icon" />
          Open Source
        </div>
        <div className="bgd-hero__trust-item">
          <CheckCircle size={18} className="bgd-hero__trust-icon" />
          Production Ready
        </div>
        <div className="bgd-hero__trust-item">
          <Palette size={18} className="bgd-hero__trust-icon" />
          Customizable
        </div>
      </div>
    </section>
  )
}
