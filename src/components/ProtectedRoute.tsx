import { useEffect, useState, type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

interface Props {
  children: ReactNode
}

export default function ProtectedRoute({ children }: Props) {
  const [status, setStatus] = useState<'loading' | 'authed' | 'unauthed'>('loading')

  useEffect(() => {
    if (!isSupabaseConfigured) { setStatus('authed'); return }
    supabase.auth.getSession().then(({ data }) => {
      setStatus(data.session ? 'authed' : 'unauthed')
    })
  }, [])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-bg)' }}>
        <Loader2 size={28} className="animate-spin" style={{ color: 'var(--color-primary)' }} />
      </div>
    )
  }

  if (status === 'unauthed') return <Navigate to="/login" replace />

  return <>{children}</>
}
