import { ArrowRight } from 'lucide-react'
import { YellowPanel } from '../shell/components/YellowPanel/YellowPanel'

interface CTAProps {
  onNavigateToShell?: () => void
}

export function CTA({ onNavigateToShell }: CTAProps) {
  return (
    <section className="mp-section">
      <div className="mp-container">
        <YellowPanel
          title="Ready to build something amazing?"
          description="Start building with BGD UI today. Open source, production ready, and endlessly customizable."
        >
          <div className="mp-hero-actions">
            <button className="btn-electric" onClick={onNavigateToShell}>
              Get Started
              <ArrowRight size={18} />
            </button>
            <button className="btn-ghost" onClick={onNavigateToShell}>
              Browse Components
            </button>
          </div>
        </YellowPanel>
      </div>
    </section>
  )
}
