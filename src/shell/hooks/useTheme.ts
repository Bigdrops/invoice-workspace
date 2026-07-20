import { useState, useEffect, useCallback } from 'react'
import type { ThemeMode } from '../types'

const STORAGE_KEY = 'shell.color-scheme'

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function resolveTheme(mode: ThemeMode): 'light' | 'dark' {
  if (mode === 'system') return getSystemTheme()
  return mode
}

export function useTheme() {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as ThemeMode | null
      return stored || 'system'
    } catch {
      return 'system'
    }
  })

  const [resolved, setResolved] = useState<'light' | 'dark'>(() => resolveTheme(mode))

  useEffect(() => {
    setResolved(resolveTheme(mode))
  }, [mode])

  useEffect(() => {
    if (mode !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => setResolved(getSystemTheme())
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [mode])

  const setMode = useCallback((m: ThemeMode) => {
    setModeState(m)
    try {
      localStorage.setItem(STORAGE_KEY, m)
    } catch {
      // silent
    }
  }, [])

  return { mode, resolved, setMode }
}
