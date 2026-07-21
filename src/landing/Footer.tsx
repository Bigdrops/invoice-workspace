import { Github, BookOpen, MessageCircle } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bgd-footer">
      <div className="bgd-footer__inner">
        <div className="bgd-footer__brand">
          <div className="bgd-footer__logo">B</div>
          BGD UI
        </div>

        <nav className="bgd-footer__links">
          <a href="https://github.com" className="bgd-footer__link" target="_blank" rel="noopener noreferrer">
            <Github size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} />
            GitHub
          </a>
          <a href="#docs" className="bgd-footer__link">
            <BookOpen size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} />
            Docs
          </a>
          <a href="#" className="bgd-footer__link">
            <MessageCircle size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} />
            Discord
          </a>
        </nav>

        <span className="bgd-footer__copy">© 2026 BGD</span>
      </div>
    </footer>
  )
}
