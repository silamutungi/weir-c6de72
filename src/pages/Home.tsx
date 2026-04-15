import { Link } from 'react-router-dom'
import { Shield, Zap, DollarSign, BarChart2, CheckCircle, ArrowRight } from 'lucide-react'
import { Button } from '../components/ui/button'
import Footer from '../components/Footer'

const features = [
  { icon: <Zap size={32} />, title: 'AI Content Detection', desc: 'Real-time scanning across Instagram, TikTok, YouTube, and Twitter catches unauthorized NIL use in minutes, not months.' },
  { icon: <Shield size={32} />, title: 'One-Tap Enforcement', desc: 'Approve, block, or monetize any match instantly. No lawyers. No back-and-forth. Your call, your terms.' },
  { icon: <DollarSign size={32} />, title: 'Automated Licensing', desc: 'Set Restricted, Balanced, or Open templates. Brands get instant quotes. You get paid without negotiating.' },
  { icon: <BarChart2 size={32} />, title: 'Earnings Dashboard', desc: 'See every dollar earned by platform, brand, and month. Track what your NIL is actually worth.' },
]

const steps = [
  'Connect your social accounts in under 2 minutes',
  'WEIR scans for unauthorized use of your name, image, and likeness',
  'Approve or block matches with one tap — or auto-license for instant revenue',
]

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
      <header className="fixed top-0 left-0 right-0 z-50 glass-dark">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-bold text-xl tracking-tight text-white">WEIR</span>
          <nav className="flex items-center gap-2">
            <Link to="/pricing" className="hidden sm:block text-sm font-medium text-white/80 hover:text-white transition-colors px-3 py-2 rounded-md">Pricing</Link>
            <Link to="/login">
              <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-gray-900/10">Log in</Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold">Start free</Button>
            </Link>
          </nav>
        </div>
      </header>

      <section
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1669151081370-b9ce2b41be77?ixid=M3w5MTM0MDN8MHwxfHNlYXJjaHwxfHxBJTIwY3JlYXRvciUyMHNpdHMlMjBhdCUyMGElMjBtb2Rlcm4lMjBtaW5pbWFsaXN0JTIwZGVzayUyQyUyMHNtYXJ0cGhvbmUlMjBnbG93aXxlbnwwfDB8fHwxNzc2MjIwMTQzfDA&ixlib=rb-4.1.0&w=1920&h=1080&fit=crop&crop=center&q=80&auto=format)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        className="relative min-h-[100svh] flex items-center overflow-hidden"
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 100%)' }} />
        <div className="relative z-10 max-w-5xl mx-auto px-6 pt-24 pb-20">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-8">
            <Zap size={14} className="text-indigo-400" />
            <span className="text-sm font-medium text-white/90">AI-powered NIL protection</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight max-w-2xl mb-6" style={{ letterSpacing: 'var(--tracking-display)' }}>
            Your name earns money.<br />Stop brands from taking it free.
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-xl mb-10 leading-relaxed">
            WEIR detects unauthorized use of your name, image, and likeness across every major platform — then lets you approve, block, or monetize in one tap.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/signup">
              <Button size="lg" className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-8 h-12">
                Get your dashboard
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-gray-900/10 h-12 px-8">See pricing</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32" style={{ background: 'var(--color-bg-surface)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--color-primary)' }}>How it works</p>
          <h2 className="text-3xl font-bold mb-12" style={{ color: 'var(--color-text)' }}>From scan to payment in three steps</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-600">{i + 1}</div>
                <p className="text-base leading-relaxed" style={{ color: 'var(--color-text)' }}>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32" style={{ background: 'var(--color-bg)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--color-primary)' }}>Features</p>
          <h2 className="text-3xl font-bold mb-12" style={{ color: 'var(--color-text)' }}>Everything to protect and monetize your NIL</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <div key={i} className="rounded-xl border p-6 transition-transform duration-200 hover:-translate-y-1" style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg-surface)' }}>
                <div className="text-indigo-500 mb-4">{f.icon}</div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text)' }}>{f.title}</h3>
                <p className="text-base leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32" style={{ background: 'var(--color-bg-surface)' }}>
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>Ready to get paid for your name?</h2>
          <p className="text-lg mb-8" style={{ color: 'var(--color-text-secondary)' }}>Join thousands of creators who stopped letting brands exploit their likeness for free.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-8 h-12">
                Start free
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
          </div>
          <ul className="mt-8 flex flex-wrap justify-center gap-6">
            {['No credit card required', 'Free plan forever', '2-minute setup'].map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                <CheckCircle size={16} className="text-emerald-500" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Footer />
    </div>
  )
}
