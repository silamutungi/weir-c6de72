import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AlertCircle, Loader2 } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    if (!isSupabaseConfigured) {
      setTimeout(() => { setLoading(false); navigate('/dashboard') }, 800)
      return
    }
    const { error: err } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (err) { setError(err.message); return }
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--color-bg)' }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <span className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>WEIR</span>
          </Link>
          <h1 className="text-2xl font-bold mt-4 mb-1" style={{ color: 'var(--color-text)' }}>Welcome back</h1>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Log in to your NIL dashboard</p>
        </div>
        <div className="rounded-xl border p-6" style={{ background: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your password" />
            </div>
            {error && (
              <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm" style={{ background: 'rgba(220,38,38,0.08)', color: 'var(--color-error)' }}>
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}
            <Button type="submit" disabled={loading} className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold h-11">
              {loading ? <Loader2 size={18} className="animate-spin" /> : 'Log in'}
            </Button>
          </form>
        </div>
        <p className="text-center text-sm mt-4" style={{ color: 'var(--color-text-secondary)' }}>
          No account?{' '}
          <Link to="/signup" className="font-semibold" style={{ color: 'var(--color-primary)' }}>Sign up free</Link>
        </p>
      </div>
    </div>
  )
}
