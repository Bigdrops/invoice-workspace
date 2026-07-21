interface GradientOrbProps {
  variant?: 1 | 2 | 3
  className?: string
}

export function GradientOrb({ variant = 1, className }: GradientOrbProps) {
  const orbMap = {
    1: 'var(--shell-gradient-orb-1)',
    2: 'var(--shell-gradient-orb-2)',
    3: 'var(--shell-gradient-orb-3)',
  }
  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        inset: 0,
        background: orbMap[variant],
        zIndex: 0,
      }}
    />
  )
}
