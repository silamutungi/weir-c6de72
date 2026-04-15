import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { LayoutDashboard, Settings, CreditCard, LogOut, Shield } from 'lucide-react'
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
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [authed, setAuthed] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isSupabaseConfigured) { setAuthed(true); return }
    supabase.auth.getSession().then(({ data }) => setAuthed(Boolean(data.session)))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => setAuthed(Boolean(session)))
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!drawerOpen) return
    function handleClickOutside(e: MouseEvent) {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setDrawerOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [drawerOpen])

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  async function logout() {
    if (isSupabaseConfigured) await supabase.auth.signOut()
    navigate('/login')
  }

  const isActive = (to: string) => location.pathname === to

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b" style={{ background: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Shield size={20} style={{ color: 'var(--color-primary)' }} />
            <span className="font-bold text-lg" style={{ color: 'var(--color-text)' }}>WEIR</span>
          </Link>

          {/* Desktop nav — unchanged */}
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

          {/* Hamburger button — mobile only, below md */}
          <button
            className="md:hidden p-2 rounded-md transition-colors"
            style={{ color: 'var(--color-text)' }}
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            aria-expanded={drawerOpen}
          >
            <span className="flex flex-col gap-[5px] w-[22px]">
              <span className="block h-[2px] w-full rounded-full" style={{ background: 'var(--color-text)' }} />
              <span className="block h-[2px] w-full rounded-full" style={{ background: 'var(--color-text)' }} />
              <span className="block h-[2px] w-full rounded-full" style={{ background: 'var(--color-text)' }} />
            </span>
          </button>
        </div>
      </header>

      {/* Backdrop overlay — mobile only, below md */}
      <div
        className="fixed inset-0 z-[60] md:hidden transition-opacity duration-300"
        style={{
          background: 'rgba(15, 23, 42, 0.48)',
          opacity: drawerOpen ? 1 : 0,
          pointerEvents: drawerOpen ? 'auto' : 'none',
        }}
        aria-hidden="true"
        onClick={() => setDrawerOpen(false)}
      />

      {/* Slide-in drawer — mobile only, right-side */}
      <div
        ref={drawerRef}
        className="fixed top-0 right-0 h-full w-72 z-[70] md:hidden flex flex-col"
        style={{
          background: 'var(--color-bg-surface)',
          boxShadow: '-4px 0 24px rgba(15,23,42,0.12)',
          transform: drawerOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'transform',
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 h-16 border-b flex-shrink-0" style={{ borderColor: 'var(--color-border)' }}>
          <Link to="/" className="flex items-center gap-2" onClick={() => setDrawerOpen(false)}>
            <Shield size={18} style={{ color: 'var(--color-primary)' }} />
            <span className="font-bold text-base" style={{ color: 'var(--color-text)' }}>WEIR</span>
          </Link>
          <button
            className="p-2 rounded-md transition-colors"
            style={{ color: 'var(--color-text-secondary)' }}
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu"
          >
            <span className="relative flex items-center justify-center w-[18px] h-[18px]">
              <span
                className="block h-[2px] w-full rounded-full absolute"
                style={{ background: 'var(--color-text)', transform: 'rotate(45deg)', transformOrigin: 'center' }}
              />
              <span
                className="block h-[2px] w-full rounded-full absolute"
                style={{ background: 'var(--color-text)', transform: 'rotate(-45deg)', transformOrigin: 'center' }}
              />
            </span>
          </button>
        </div>

        {/* Drawer nav links — Ink color base, Flame active state */}
        <nav className="flex-1 px-4 py-5 flex flex-col gap-1 overflow-y-auto">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setDrawerOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors"
              style={{
                color: isActive(l.to) ? 'var(--color-primary, #f97316)' : 'var(--color-text, #374151)',
                background: isActive(l.to) ? 'rgba(249,115,22,0.08)' : 'transparent',
              }}
              onMouseEnter={(e) => {
                if (!isActive(l.to)) {
                  (e.currentTarget as HTMLAnchorElement).style.background = 'var(--color-border)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(l.to)) {
                  (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'
                }
              }}
            >
              <span style={{ color: isActive(l.to) ? 'var(--color-primary, #f97316)' : 'var(--color-text-secondary, #6b7280)' }}>
                {l.icon}
              </span>
              {l.label}
              {isActive(l.to) && (
                <span
                  className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: 'var(--color-primary, #f97316)' }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Drawer footer — logout */}
        {authed && (
          <div className="px-4 py-4 border-t flex-shrink-0" style={{ borderColor: 'var(--color-border)' }}>
            <button
              onClick={() => { setDrawerOpen(false); logout() }}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium w-full text-left transition-colors"
              style={{ color: 'var(--color-text-secondary, #6b7280)' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-border)'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = 'transparent'
              }}
            >
              <LogOut size={15} style={{ color: 'var(--color-text-secondary, #6b7280)' }} />
              Log out
            </button>
          </div>
        )}
      </div>
    </>
  )
}
