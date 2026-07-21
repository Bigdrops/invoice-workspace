import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Header } from './Header'
import { Hero } from './Hero'
import { Workspaces } from './Workspaces'
import { Components } from './Components'
import { Trust } from './Trust'
import { CTA } from './CTA'
import { Footer } from './Footer'
import { MobileNav } from './MobileNav'
import './styles.css'

interface LandingProps {
  onNavigateToShell?: () => void
}

export function Landing({ onNavigateToShell }: LandingProps) {
  return (
    <div className="bgd-landing">
      <Header onNavigateToShell={onNavigateToShell} />
      <main>
        <Hero onNavigateToShell={onNavigateToShell} />
        <Workspaces onNavigateToShell={onNavigateToShell} />
        <Components onNavigateToShell={onNavigateToShell} />
        <Trust />
        <CTA onNavigateToShell={onNavigateToShell} />
      </main>
      <Footer />
      <MobileNav onNavigateToShell={onNavigateToShell} />
    </div>
  )
}
