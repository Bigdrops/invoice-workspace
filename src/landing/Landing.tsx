import { Header } from './Header'
import { Hero } from './Hero'
import { Workspaces } from './Workspaces'
import { Components } from './Components'
import { Trust } from './Trust'
import { CTA } from './CTA'
import { Footer } from './Footer'

interface LandingProps {
  onNavigateToShell?: () => void
}

export function Landing({ onNavigateToShell }: LandingProps) {
  return (
    <div className="moving-parts-shell">
      <Header onNavigateToShell={onNavigateToShell} />
      <main>
        <Hero onNavigateToShell={onNavigateToShell} />
        <Workspaces onNavigateToShell={onNavigateToShell} />
        <Components onNavigateToShell={onNavigateToShell} />
        <Trust />
        <CTA onNavigateToShell={onNavigateToShell} />
      </main>
      <Footer />
    </div>
  )
}
