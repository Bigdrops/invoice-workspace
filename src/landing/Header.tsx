import { useState } from 'react'
import { X } from 'lucide-react'

interface HeaderProps {
  onNavigateToShell?: () => void
}

export function Header({ onNavigateToShell }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <nav className="mp-nav">
        <a href="/" className="mp-brand">
          <span className="mp-brand-icon">□△</span>
          BGD UI
        </a>

        <div className="mp-nav-links">
          <a href="#workspaces" className="mp-nav-link active">Workspaces</a>
          <a href="#components" className="mp-nav-link">Components</a>
          <a href="https://github.com" className="mp-nav-link" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>

        <div className="mp-nav-actions">
          <button className="btn-electric" onClick={onNavigateToShell}>
            Open Shell
          </button>
          <button
            className="mp-hamburger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <>
          <div
            style={{
              position: 'fixed', inset: 0, zIndex: 99,
              background: 'rgba(0, 0, 0, 0.3)',
            }}
            onClick={() => setMobileMenuOpen(false)}
          />
          <nav
            style={{
              position: 'fixed', top: 0, right: 0, width: '100%', maxWidth: 340,
              height: '100vh', zIndex: 100, background: 'var(--mp-surface-canvas)',
              borderLeft: '1px solid var(--mp-color-smoke)',
              padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column',
              gap: 'var(--mp-space-4)', overflowY: 'auto',
            }}
            aria-label="Mobile navigation"
          >
            <button
              className="btn-ghost"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close navigation menu"
              style={{ position: 'absolute', top: '1rem', right: '1rem', minWidth: 44, minHeight: 44 }}
            >
              <X size={18} />
            </button>
            <div style={{ marginTop: 'var(--mp-space-48)', display: 'flex', flexDirection: 'column', gap: 'var(--mp-space-4)' }}>
              <a href="#workspaces" className="mp-nav-link" style={{ fontSize: 20, padding: '14px 0', borderBottom: '1px solid var(--mp-color-smoke)', display: 'block' }}>Workspaces</a>
              <a href="#components" className="mp-nav-link" style={{ fontSize: 20, padding: '14px 0', borderBottom: '1px solid var(--mp-color-smoke)', display: 'block' }}>Components</a>
              <a href="https://github.com" className="mp-nav-link" style={{ fontSize: 20, padding: '14px 0', borderBottom: '1px solid var(--mp-color-smoke)', display: 'block' }}>GitHub</a>
              <hr style={{ border: 'none', borderTop: '1px solid var(--mp-color-smoke)', margin: 'var(--mp-space-12) 0' }} />
              <button className="btn-electric" style={{ width: '100%', justifyContent: 'center' }} onClick={() => { setMobileMenuOpen(false); onNavigateToShell?.() }}>
                Open Shell
              </button>
            </div>
          </nav>
        </>
      )}
    </>
  )
}
