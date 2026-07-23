import { Github, BookOpen, MessageCircle } from 'lucide-react'

export function Footer() {
  return (
    <footer className="mp-footer">
      <div className="mp-footer-text">
        <span className="brand">BGD UI</span> · Offline-first mobile UI library
      </div>
      <nav className="mp-footer-links">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
          <Github size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} />
          GitHub
        </a>
        <a href="#docs">
          <BookOpen size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} />
          Docs
        </a>
        <a href="#">
          <MessageCircle size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} />
          Discord
        </a>
      </nav>
    </footer>
  )
}
