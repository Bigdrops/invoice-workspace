import type { ReactNode } from 'react'

interface YellowPanelProps {
  title: string
  description: string
  children?: ReactNode
}

export function YellowPanel({ title, description, children }: YellowPanelProps) {
  return (
    <div className="mp-yellow-panel">
      <h2>{title}</h2>
      <p>{description}</p>
      {children}
    </div>
  )
}
