import { Link } from 'react-router-dom'
import { Shield } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t py-12" style={{ background: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <Shield size={18} style={{ color: 'var(--color-primary)' }} />
          <span className="font-bold" style={{ color: 'var(--color-text)' }}>WEIR</span>
        </div>
        <nav className="flex items-center gap-6 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          <Link to="/pricing" className="hover:underline">Pricing</Link>
          <Link to="/login" className="hover:underline">Log in</Link>
          <Link to="/signup" className="hover:underline">Sign up</Link>
          <a href="mailto:support@weir.app" className="hover:underline">Support</a>
        </nav>
        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
          &copy; {new Date().getFullYear()} WEIR. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
