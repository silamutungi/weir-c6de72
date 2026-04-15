import { useEffect, useState } from 'react'
import { Shield, DollarSign, AlertTriangle, TrendingUp, CheckCircle, XCircle, Loader2, RefreshCw } from 'lucide-react'
import Navbar from '../components/Navbar'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { formatCurrency, timeAgo } from '../lib/utils'
import type { ContentMatch } from '../types'

const SEED_MATCHES: ContentMatch[] = [
  { id: '1', user_id: 'demo', platform: 'Instagram', content_url: '#', brand_name: 'NikeRunning', match_confidence: 94, status: 'pending', potential_value: 1200, detected_at: new Date(Date.now() - 18 * 60000).toISOString(), created_at: new Date(Date.now() - 18 * 60000).toISOString(), deleted_at: null },
  { id: '2', user_id: 'demo', platform: 'TikTok', content_url: '#', brand_name: 'GymShark', match_confidence: 88, status: 'monetized', potential_value: 850, detected_at: new Date(Date.now() - 2 * 3600000).toISOString(), created_at: new Date(Date.now() - 2 * 3600000).toISOString(), deleted_at: null },
  { id: '3', user_id: 'demo', platform: 'YouTube', content_url: '#', brand_name: 'MuscleBlaze', match_confidence: 76, status: 'blocked', potential_value: 600, detected_at: new Date(Date.now() - 5 * 3600000).toISOString(), created_at: new Date(Date.now() - 5 * 3600000).toISOString(), deleted_at: null },
  { id: '4', user_id: 'demo', platform: 'Twitter', content_url: '#', brand_name: 'Adidas Originals', match_confidence: 91, status: 'approved', potential_value: 2100, detected_at: new Date(Date.now() - 24 * 3600000).toISOString(), created_at: new Date(Date.now() - 24 * 3600000).toISOString(), deleted_at: null },
  { id: '5', user_id: 'demo', platform: 'Instagram', content_url: '#', brand_name: 'ProteinWorld', match_confidence: 83, status: 'pending', potential_value: 450, detected_at: new Date(Date.now() - 30 * 3600000).toISOString(), created_at: new Date(Date.now() - 30 * 3600000).toISOString(), deleted_at: null },
  { id: '6', user_id: 'demo', platform: 'YouTube', content_url: '#', brand_name: 'MyProtein', match_confidence: 79, status: 'monetized', potential_value: 3200, detected_at: new Date(Date.now() - 48 * 3600000).toISOString(), created_at: new Date(Date.now() - 48 * 3600000).toISOString(), deleted_at: null },
]

const statusConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  pending: { label: 'Pending', variant: 'outline' },
  approved: { label: 'Approved', variant: 'default' },
  blocked: { label: 'Blocked', variant: 'destructive' },
  monetized: { label: 'Monetized', variant: 'secondary' },
}

export default function Dashboard() {
  const [matches, setMatches] = useState<ContentMatch[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  async function load() {
    setLoading(true)
    setError('')
    if (!isSupabaseConfigured) {
      await new Promise((r) => setTimeout(r, 600))
      setMatches(SEED_MATCHES)
      setLoading(false)
      return
    }
    const { data, error: err } = await supabase
      .from('content_matches')
      .select('*')
      .is('deleted_at', null)
      .order('detected_at', { ascending: false })
      .limit(20)
    if (err) { setError(err.message); setLoading(false); return }
    setMatches(data ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function updateStatus(id: string, status: ContentMatch['status']) {
    setActionLoading(id + status)
    if (!isSupabaseConfigured) {
      await new Promise((r) => setTimeout(r, 400))
      setMatches((prev) => prev.map((m) => m.id === id ? { ...m, status } : m))
      setActionLoading(null)
      return
    }
    await supabase.from('content_matches').update({ status }).eq('id', id)
    setMatches((prev) => prev.map((m) => m.id === id ? { ...m, status } : m))
    setActionLoading(null)
  }

  const totalEarned = matches.filter((m) => m.status === 'monetized').reduce((s, m) => s + m.potential_value, 0)
  const pending = matches.filter((m) => m.status === 'pending').length
  const threats = matches.filter((m) => m.status === 'blocked').length

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 pt-24">
        {!isSupabaseConfigured && (
          <div className="mb-6 rounded-lg px-4 py-3 text-sm font-medium flex items-center gap-2" style={{ background: 'rgba(99,102,241,0.1)', color: 'var(--color-primary)' }}>
            <Shield size={16} />
            Viewing sample data — connect your database to go live.
          </div>
        )}

        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--color-text)' }}>NIL Dashboard</h1>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Real-time protection and monetization of your name, image, and likeness</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Earned', value: formatCurrency(totalEarned), icon: <DollarSign size={20} />, color: 'var(--color-success)' },
            { label: 'Pending Review', value: pending.toString(), icon: <AlertTriangle size={20} />, color: 'var(--color-warning)' },
            { label: 'Threats Blocked', value: threats.toString(), icon: <Shield size={20} />, color: 'var(--color-error)' },
            { label: 'Total Matches', value: matches.length.toString(), icon: <TrendingUp size={20} />, color: 'var(--color-primary)' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border p-4" style={{ background: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>{stat.label}</span>
                <span style={{ color: stat.color }}>{stat.icon}</span>
              </div>
              {loading ? (
                <div className="h-7 w-16 rounded animate-pulse" style={{ background: 'var(--color-border)' }} />
              ) : (
                <p className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>{stat.value}</p>
              )}
            </div>
          ))}
        </div>

        <div className="rounded-xl border" style={{ background: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
          <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
            <h2 className="font-semibold" style={{ color: 'var(--color-text)' }}>Content Matches</h2>
            <Button variant="ghost" size="sm" onClick={load} disabled={loading} className="gap-2">
              <RefreshCw size={15} />
              Refresh
            </Button>
          </div>

          {loading && (
            <div className="py-16 flex flex-col items-center gap-3">
              <Loader2 size={28} className="animate-spin" style={{ color: 'var(--color-primary)' }} />
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Scanning platforms...</p>
            </div>
          )}

          {!loading && error && (
            <div className="py-12 flex flex-col items-center gap-4">
              <AlertTriangle size={28} style={{ color: 'var(--color-error)' }} />
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{error}</p>
              <Button variant="outline" size="sm" onClick={load}>Retry</Button>
            </div>
          )}

          {!loading && !error && matches.length === 0 && (
            <div className="py-16 flex flex-col items-center gap-3">
              <Shield size={32} style={{ color: 'var(--color-text-muted)' }} />
              <p className="font-medium" style={{ color: 'var(--color-text)' }}>No matches detected yet</p>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Connect your social accounts to start scanning for unauthorized NIL use.</p>
            </div>
          )}

          {!loading && !error && matches.length > 0 && (
            <ul className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
              {matches.map((m) => (
                <li key={m.id} className="px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>{m.brand_name}</span>
                      <Badge variant={statusConfig[m.status].variant}>{statusConfig[m.status].label}</Badge>
                      <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{m.platform}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                      <span>{m.match_confidence}% match</span>
                      <span>Est. {formatCurrency(m.potential_value)}</span>
                      <span>{timeAgo(m.detected_at)}</span>
                    </div>
                  </div>
                  {m.status === 'pending' && (
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={actionLoading === m.id + 'approved'}
                        onClick={() => updateStatus(m.id, 'approved')}
                        className="gap-1.5 text-xs h-9"
                      >
                        {actionLoading === m.id + 'approved' ? <Loader2 size={13} className="animate-spin" /> : <CheckCircle size={13} />}
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={actionLoading === m.id + 'monetized'}
                        onClick={() => updateStatus(m.id, 'monetized')}
                        className="gap-1.5 text-xs h-9 border-emerald-500 text-emerald-600 hover:bg-emerald-50"
                      >
                        {actionLoading === m.id + 'monetized' ? <Loader2 size={13} className="animate-spin" /> : <DollarSign size={13} />}
                        Monetize
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={actionLoading === m.id + 'blocked'}
                        onClick={() => updateStatus(m.id, 'blocked')}
                        className="gap-1.5 text-xs h-9 border-red-400 text-red-500 hover:bg-red-50"
                      >
                        {actionLoading === m.id + 'blocked' ? <Loader2 size={13} className="animate-spin" /> : <XCircle size={13} />}
                        Block
                      </Button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  )
}
