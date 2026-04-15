import { Link } from 'react-router-dom'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { Button } from '../components/ui/button'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const plans = [
  {
    name: 'Free',
    price: 0,
    period: 'forever',
    description: 'For creators just getting started with NIL protection.',
    features: ['Up to 25 match detections / month', '2 platform monitors', '1 license template', 'Email alerts', 'Basic earnings report'],
    cta: 'Start free',
    href: '/signup',
    highlight: false,
  },
  {
    name: 'Creator',
    price: 19,
    period: 'month',
    description: 'Full enforcement and monetization for active creators.',
    features: ['Unlimited match detections', 'All platforms', 'Unlimited license templates', 'One-tap approve / block / monetize', 'Earnings dashboard with payment history', 'Priority AI scanning', 'Growth analytics'],
    cta: 'Start free trial',
    href: '/signup',
    highlight: true,
  },
  {
    name: 'Pro',
    price: 49,
    period: 'month',
    description: 'For agencies and athletes managing multiple NIL profiles.',
    features: ['Everything in Creator', 'Up to 10 creator profiles', 'Legal document export', 'Custom licensing API', 'Dedicated account manager', 'SLA support'],
    cta: 'Contact sales',
    href: '/signup',
    highlight: false,
  },
]

const faqs = [
  { q: 'What counts as NIL?', a: 'NIL stands for Name, Image, and Likeness — any use of your identity by a brand or individual without your explicit permission, including your face, name, voice, or social handle in promotional content.' },
  { q: 'How does WEIR detect matches?', a: 'Our AI scans public posts across Instagram, TikTok, YouTube, and Twitter in near real-time, matching visual and textual signals against your registered identity profile.' },
  { q: 'Can I enforce a license without a lawyer?', a: 'Yes. WEIR generates legally-informed licensing templates. For formal legal action, we recommend consulting an attorney, but most brand violations are resolved through our one-tap monetize flow.' },
  { q: 'What happens when I monetize a match?', a: 'WEIR sends a licensing request to the brand with your pre-set fee. Once accepted, payment flows directly to your connected account, minus a 5% platform fee.' },
]

export default function Pricing() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
      <Navbar />
      <main className="pt-24">
        <section className="py-20 md:py-32">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--color-primary)' }}>Pricing</p>
            <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>Simple, transparent pricing</h1>
            <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>Start free. Upgrade when your NIL earns more than the plan costs.</p>
          </div>
        </section>

        <section className="pb-20 md:pb-32">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid sm:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`rounded-2xl border p-7 flex flex-col transition-transform duration-200 hover:-translate-y-1 ${
                    plan.highlight ? 'ring-2 ring-indigo-500' : ''
                  }`}
                  style={{ background: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}
                >
                  {plan.highlight && (
                    <span className="text-xs font-semibold uppercase tracking-wide text-white bg-indigo-500 rounded-full px-3 py-1 self-start mb-4">Most popular</span>
                  )}
                  <h2 className="text-xl font-bold mb-1" style={{ color: 'var(--color-text)' }}>{plan.name}</h2>
                  <div className="flex items-end gap-1 mb-2">
                    <span className="text-4xl font-bold" style={{ color: 'var(--color-text)' }}>${plan.price}</span>
                    <span className="text-sm mb-1" style={{ color: 'var(--color-text-secondary)' }}>/{plan.period}</span>
                  </div>
                  <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>{plan.description}</p>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text)' }}>
                        <CheckCircle size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link to={plan.href}>
                    <Button
                      className={`w-full h-11 font-semibold gap-2 ${
                        plan.highlight ? 'bg-indigo-500 hover:bg-indigo-600 text-white' : ''
                      }`}
                      variant={plan.highlight ? 'default' : 'outline'}
                    >
                      {plan.cta}
                      <ArrowRight size={16} />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32" style={{ background: 'var(--color-bg-surface)' }}>
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-10" style={{ color: 'var(--color-text)' }}>Frequently asked questions</h2>
            <dl className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq.q} className="border-b pb-6" style={{ borderColor: 'var(--color-border)' }}>
                  <dt className="font-semibold mb-2" style={{ color: 'var(--color-text)' }}>{faq.q}</dt>
                  <dd className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{faq.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
