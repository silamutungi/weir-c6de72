import { useEffect, useState, type FormEvent } from 'react'
import { Loader2, AlertCircle, CheckCircle, Trash2 } from 'lucide-react'
import Navbar from '../components/Navbar'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

export default function Settings() {
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadProfile() {
      if (!isSupabaseConfigured) {
        await new Promise((r) => setTimeout(r, 400))
        setDisplayName('Demo Creator')
        setEmail('demo@weir.app')
        setLoading(false)
        return
      }
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        setEmail(session.user.email ?? '')
        setDisplayName(session.user.user_metadata?.display_name ?? '')
      }
      setLoading(false)
    }
    loadProfile()
  }, [])

  async function handleSave(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess(false)
    if (!isSupabaseConfigured) {
      await new Promise((r) => setTimeout(r, 600))
      setSaving(false)
      setSuccess(true)
      return
    }
    const { error: err } = await supabase.auth.updateUser({ data: { display_name: displayName } })
    setSaving(false)
    if (err) { setError(err.message); return }
    setSuccess(true)
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8 pt-24">
        <h1 className="text-2xl font-bold mb-6" style={{ color: 'var(--color-text)' }}>Account Settings</h1>

        <div className="rounded-xl border p-6 mb-6" style={{ background: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
          <h2 className="text-base font-semibold mb-4" style={{ color: 'var(--color-text)' }}>Profile</h2>
          {loading ? (
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="h-10 rounded-lg animate-pulse" style={{ background: 'var(--color-border)' }} />
              ))}
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="displayName">Display name</Label>
                <Input id="displayName" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Your creator name" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="settingsEmail">Email</Label>
                <Input id="settingsEmail" value={email} disabled className="opacity-60 cursor-not-allowed" />
              </div>
              {error && (
                <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm" style={{ background: 'rgba(220,38,38,0.08)', color: 'var(--color-error)' }}>
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}
              {success && (
                <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm" style={{ background: 'rgba(22,163,74,0.08)', color: 'var(--color-success)' }}>
                  <CheckCircle size={16} />
                  <span>Profile updated successfully.</span>
                </div>
              )}
              <Button type="submit" disabled={saving} className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold h-10">
                {saving ? <Loader2 size={16} className="animate-spin mr-2" /> : null}
                Save changes
              </Button>
            </form>
          )}
        </div>

        <div className="rounded-xl border p-6" style={{ borderColor: 'rgba(220,38,38,0.3)', background: 'rgba(220,38,38,0.04)' }}>
          <h2 className="text-base font-semibold mb-1" style={{ color: 'var(--color-error)' }}>Danger Zone</h2>
          <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>Permanently delete your account and all associated data. This cannot be undone.</p>
          <Button variant="destructive" className="gap-2 h-10" onClick={() => alert('Contact support@weir.app to delete your account.')}>
            <Trash2 size={16} />
            Delete account
          </Button>
        </div>
      </main>
    </div>
  )
}
