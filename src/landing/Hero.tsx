import { ArrowRight } from 'lucide-react'
import { PhoneMockup } from '../shell/components/PhoneMockup/PhoneMockup'
import { ConicSphere } from '../shell/components/ConicSphere/ConicSphere'

interface HeroProps {
  onNavigateToShell?: () => void
}

export function Hero({ onNavigateToShell }: HeroProps) {
  return (
    <section className="mp-hero">
      <div className="mp-container">
        <div className="mp-hero-inner">
          <div className="mp-hero-content">
            <div className="mp-hero-eyebrow">
              <span className="dot" />
              v1.0.0 — Now in Public Beta
            </div>

            <h1>
              The UI system for building{' '}
              <span className="highlight">business software</span>
            </h1>

            <div className="mp-hero-actions">
              <button className="btn-electric" onClick={onNavigateToShell}>
                Browse Components
                <ArrowRight size={18} />
              </button>
              <button className="btn-ghost" onClick={onNavigateToShell}>
                Explore Workspaces
              </button>
            </div>
          </div>

          <div className="mp-hero-visual">
            <PhoneMockup />
            <ConicSphere />
          </div>
        </div>
      </div>
    </section>
  )
}
