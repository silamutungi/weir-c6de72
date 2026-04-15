import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { LayoutDashboard, Settings, CreditCard, LogOut, Menu, X, Shield } from 'lucide-react'
import { Button } from './ui/button'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

const navLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
  { to: '/pricing', label: 'Pricing', icon: <CreditCard size={16} /> },
  { to: '/settings', label: 'Settings', icon: <Settings size={16} /> },
]

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [authed, setAuthed] = useState(false)

  useEffect(() => {
    if (!isSupabaseConfigured) { setAuthed(true); return }
    supabase.auth.getSession().then(({ data }) => setAuthed(Boolean(data.session)))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => setAuthed(Boolean(session)))
    return () => subscription.unsubscribe()
  }, [])

  async function logout() {
    if (isSupabaseConfigured) await supabase.auth.signOut()
    navigate('/login')
  }

  const isActive = (to: string) => location.pathname === to

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b" style={{ background: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-2">
          <Shield size={20} style={{ color: 'var(--color-primary)' }} />
          <span className="font-bold text-lg" style={{ color: 'var(--color-text)' }}>WEIR</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive(l.to) ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-muted'
              }`}
              style={isActive(l.to) ? {} : { color: 'var(--color-text-secondary)' }}
            >
              {l.icon}
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          {authed && (
            <Button variant="ghost" size="sm" onClick={logout} className="gap-1.5 text-sm">
              <LogOut size={15} />
              Log out
            </Button>
          )}
        </div>

        <button
          className="md:hidden p-2 rounded-md"
          style={{ color: 'var(--color-text)' }}
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t" style={{ background: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
          <nav className="px-4 py-3 space-y-1">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2 px-3 py-3 rounded-md text-sm font-medium transition-colors ${
                  isActive(l.to) ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-muted'
                }`}
                style={isActive(l.to) ? {} : { color: 'var(--color-text)' }}
              >
                {l.icon}
                {l.label}
              </Link>
            ))}
            {authed && (
              <button
                onClick={() => { setOpen(false); logout() }}
                className="flex items-center gap-2 px-3 py-3 rounded-md text-sm font-medium w-full text-left"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <LogOut size={15} />
                Log out
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
