import Link from 'next/link';
import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Head>
        <title>SwaganX — Global Fintech Platform</title>
        <meta name="description" content="SwaganX - Premium fintech CRM and trading platform for international companies" />
      </Head>

      <div className="mesh-bg"></div>
      <div className="noise-overlay"></div>

      {/* Navigation */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? 'rgba(5, 10, 21, 0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-color)' : '1px solid transparent',
        transition: 'all 0.3s ease',
        padding: '0 40px', height: '72px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'var(--gradient-primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, fontSize: 16, color: 'white'
            }}>SX</div>
            <span style={{ fontWeight: 700, fontSize: 20, letterSpacing: '-0.5px' }}>SwaganX</span>
          </Link>
          <div style={{ display: 'flex', gap: '32px' }} className="desktop-nav">
            {[
              { label: 'Services', href: '#services' },
              { label: 'Solutions', href: '#solutions' },
              { label: 'Pricing', href: '#pricing' },
              { label: 'Resources', href: '#resources' },
            ].map(item => (
              <a key={item.label} href={item.href} style={{
                color: 'var(--text-secondary)', fontSize: 14, fontWeight: 500,
                transition: 'var(--transition)', textDecoration: 'none'
              }}
              onMouseEnter={e => { e.target.style.color = 'var(--text-primary)'; }}
              onMouseLeave={e => { e.target.style.color = 'var(--text-secondary)'; }}
              >{item.label}</a>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => setMobileMenu(!mobileMenu)} className="mobile-menu-btn"
            style={{ display: 'none', background: 'none', border: 'none', color: 'var(--text-primary)', fontSize: 24 }}>
            {mobileMenu ? '✕' : '☰'}
          </button>
          <Link href="/user/login">
            <button className="btn-secondary" style={{ padding: '8px 20px' }}>Log In</button>
          </Link>
          <Link href="/user/register">
            <button className="btn-primary" style={{ padding: '8px 20px' }}>Get Started</button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        padding: '120px 24px 80px', position: 'relative'
      }}>
        <div style={{ maxWidth: 900 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)',
            borderRadius: 40, padding: '6px 16px', marginBottom: 32, fontSize: 13,
            color: 'var(--accent-blue)', fontWeight: 500
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-green)', boxShadow: '0 0 8px var(--accent-green)' }}></span>
            Trusted by 500+ Fintech Companies Worldwide
          </div>
          <h1 style={{
            fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 800, lineHeight: 1.1,
            letterSpacing: '-2px', marginBottom: 24
          }}>
            Build, Scale &{' '}
            <span className="gradient-text">Dominate</span>
            {' '}Your Market
          </h1>
          <p style={{
            fontSize: 18, color: 'var(--text-secondary)', maxWidth: 600,
            margin: '0 auto 40px', lineHeight: 1.7
          }}>
            Enterprise-grade CRM, trading infrastructure, and digital marketing solutions
            purpose-built for international fintech companies.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/user/register">
              <button className="btn-primary" style={{ padding: '14px 32px', fontSize: 16 }}>
                Start Free Trial →
              </button>
            </Link>
            <a href="#services">
              <button className="btn-secondary" style={{ padding: '14px 32px', fontSize: 16 }}>
                Explore Platform
              </button>
            </a>
          </div>
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40,
          marginTop: 80, maxWidth: 800, width: '100%', padding: '40px 0',
          borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)'
        }}>
          {[
            { value: '500+', label: 'Projects Delivered' },
            { value: '120+', label: 'Global Clients' },
            { value: '99.2%', label: 'Uptime SLA' },
            { value: '35+', label: 'Countries Served' },
          ].map(stat => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div className="gradient-text" style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-1px' }}>{stat.value}</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" style={{ padding: '120px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span style={{ color: 'var(--accent-blue)', fontWeight: 600, fontSize: 14, textTransform: 'uppercase', letterSpacing: 2 }}>Our Services</span>
          <h2 style={{ fontSize: 40, fontWeight: 800, marginTop: 12, letterSpacing: '-1px' }}>
            Complete Fintech <span className="gradient-text">Infrastructure</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: 12, maxWidth: 500, margin: '12px auto 0' }}>
            End-to-end solutions for modern financial technology companies
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {[
            { icon: '⚙️', title: 'CRM & Business Systems', desc: 'Custom CRM, ERP, and admin panel development to streamline operations and boost productivity across your organization.' },
            { icon: '📱', title: 'Mobile App Development', desc: 'Native and cross-platform mobile apps for iOS and Android delivering seamless trading and financial experiences.' },
            { icon: '🌐', title: 'Web Application Development', desc: 'Scalable, responsive web applications using React, Next.js, and modern frameworks for optimal performance.' },
            { icon: '🎨', title: 'UI / UX Design', desc: 'User-centered design that converts visitors into customers with intuitive interfaces and beautiful aesthetics.' },
            { icon: '📊', title: 'Data Analytics & BI', desc: 'Advanced analytics dashboards, real-time reporting, and business intelligence tools for data-driven decisions.' },
            { icon: '🔒', title: 'Security & Compliance', desc: 'Enterprise-grade security with KYC/AML integration, encryption, and regulatory compliance frameworks.' },
          ].map((service, i) => (
            <div key={i} className="glass-card animate-fade-in" style={{
              padding: 32, transition: 'all 0.3s ease', cursor: 'pointer',
              animationDelay: `${i * 0.1}s`
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-glow)'; e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'var(--border-color)'; }}
            >
              <div style={{ fontSize: 36, marginBottom: 20 }}>{service.icon}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{service.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7 }}>{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Solutions */}
      <section id="solutions" style={{ padding: '120px 24px', background: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <span style={{ color: 'var(--accent-purple)', fontWeight: 600, fontSize: 14, textTransform: 'uppercase', letterSpacing: 2 }}>Solutions</span>
            <h2 style={{ fontSize: 40, fontWeight: 800, marginTop: 12, letterSpacing: '-1px' }}>
              Tailored for <span className="gradient-text">Every Stage</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24 }}>
            {[
              { icon: '🚀', title: 'Startups', desc: 'Launch faster with our pre-built fintech modules and white-label solutions.' },
              { icon: '📈', title: 'SMBs', desc: 'Scale operations with custom CRM, automated workflows, and analytics.' },
              { icon: '🏢', title: 'Enterprises', desc: 'Full digital transformation with enterprise-grade security and SLA guarantees.' },
              { icon: '🌍', title: 'Global Brands', desc: 'Multi-region compliance, localization, and 24/7 dedicated support.' },
            ].map((item, i) => (
              <div key={i} className="glass-card" style={{ padding: 32, textAlign: 'center' }}>
                <div style={{ fontSize: 48, marginBottom: 20 }}>{item.icon}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{item.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: '120px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <h2 style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-1px' }}>
            From Idea to <span className="gradient-text">Launch in 5 Steps</span>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 20 }}>
          {[
            { step: '01', title: 'Discovery', desc: 'Understand your needs' },
            { step: '02', title: 'Design', desc: 'Create your blueprint' },
            { step: '03', title: 'Develop', desc: 'Build your solution' },
            { step: '04', title: 'Test', desc: 'Quality assurance' },
            { step: '05', title: 'Launch', desc: 'Go live globally' },
          ].map((item, i) => (
            <div key={i} style={{ textAlign: 'center', position: 'relative' }}>
              <div className="gradient-text" style={{ fontSize: 48, fontWeight: 800, opacity: 0.3 }}>{item.step}</div>
              <h4 style={{ fontSize: 16, fontWeight: 700, marginTop: 8 }}>{item.title}</h4>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ padding: '120px 24px', background: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <span style={{ color: 'var(--accent-green)', fontWeight: 600, fontSize: 14, textTransform: 'uppercase', letterSpacing: 2 }}>Pricing</span>
            <h2 style={{ fontSize: 40, fontWeight: 800, marginTop: 12, letterSpacing: '-1px' }}>
              Simple, <span className="gradient-text">Transparent Pricing</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, alignItems: 'start' }}>
            {[
              {
                name: 'Starter',
                price: '$999',
                period: '/month',
                desc: 'Perfect for startups getting started',
                features: ['Up to 5 pages website', 'Basic CRM module', 'Email support', 'Monthly analytics', 'SSL certificate'],
                cta: 'Get Started',
                highlight: false
              },
              {
                name: 'Growth',
                price: '$2,499',
                period: '/month',
                desc: 'Ideal for scaling businesses',
                features: ['Custom web application', 'Full CRM & ERP', 'Advanced analytics', 'Priority support', 'Dedicated manager', 'API integration', 'Multi-language support'],
                cta: 'Choose Growth',
                highlight: true
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                period: '',
                desc: 'For global brands & enterprises',
                features: ['Everything in Growth', '24/7 dedicated support', 'SLA-backed uptime', 'Custom integrations', 'White-label solution', 'Regulatory compliance', 'On-premise deployment'],
                cta: 'Contact Sales',
                highlight: false
              },
            ].map((plan, i) => (
              <div key={i} className="glass-card" style={{
                padding: 40,
                borderColor: plan.highlight ? 'var(--accent-blue)' : 'var(--border-color)',
                boxShadow: plan.highlight ? '0 0 40px rgba(59, 130, 246, 0.15)' : 'none',
                position: 'relative'
              }}>
                {plan.highlight && (
                  <div style={{
                    position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
                    background: 'var(--gradient-primary)', padding: '4px 16px', borderRadius: 20,
                    fontSize: 12, fontWeight: 700, color: 'white'
                  }}>MOST POPULAR</div>
                )}
                <h3 style={{ fontSize: 20, fontWeight: 700 }}>{plan.name}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>{plan.desc}</p>
                <div style={{ margin: '24px 0' }}>
                  <span style={{ fontSize: 40, fontWeight: 800 }}>{plan.price}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: 14 }}>{plan.period}</span>
                </div>
                <Link href="/user/register">
                  <button className={plan.highlight ? 'btn-primary' : 'btn-secondary'}
                    style={{ width: '100%', justifyContent: 'center', marginBottom: 24 }}>
                    {plan.cta}
                  </button>
                </Link>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--text-secondary)' }}>
                      <span style={{ color: 'var(--accent-green)', fontSize: 16 }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '120px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <h2 style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-1px' }}>
            Trusted by <span className="gradient-text">Industry Leaders</span>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {[
            { quote: 'SwaganX transformed our entire trading infrastructure. Their CRM reduced our onboarding time by 60%.', name: 'Sarah Mitchell', role: 'CEO, FinEdge Capital', rating: 5 },
            { quote: 'The white-label solution was exactly what we needed. We launched in 3 markets within 2 months.', name: 'James Chen', role: 'CTO, TradeGlobal Asia', rating: 5 },
            { quote: 'Exceptional support and enterprise-grade security. SwaganX is our go-to fintech partner.', name: 'Alexandra Petrov', role: 'COO, NordicPay Solutions', rating: 5 },
          ].map((t, i) => (
            <div key={i} className="glass-card" style={{ padding: 32 }}>
              <div style={{ color: 'var(--accent-orange)', fontSize: 14, marginBottom: 16 }}>
                {'★'.repeat(t.rating)}
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.7, marginBottom: 24, fontStyle: 'italic' }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: 'var(--gradient-primary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: 14, color: 'white'
                }}>{t.name.split(' ').map(n => n[0]).join('')}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{t.name}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: 12 }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '120px 24px', textAlign: 'center' }}>
        <div className="glass-card" style={{ maxWidth: 800, margin: '0 auto', padding: '60px 40px' }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: 16, letterSpacing: '-1px' }}>
            Ready to <span className="gradient-text">Transform</span> Your Business?
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 32, fontSize: 16 }}>
            Join 500+ companies that trust SwaganX to power their fintech operations.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <Link href="/user/register">
              <button className="btn-primary" style={{ padding: '14px 32px', fontSize: 16 }}>Get Started Free</button>
            </Link>
            <Link href="/user/login">
              <button className="btn-secondary" style={{ padding: '14px 32px', fontSize: 16 }}>Contact Sales</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '60px 24px 30px', borderTop: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: 40, marginBottom: 48 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: 'var(--gradient-primary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: 14, color: 'white'
                }}>SX</div>
                <span style={{ fontWeight: 700, fontSize: 18 }}>SwaganX</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.7, maxWidth: 280 }}>
                Global fintech infrastructure and CRM platform powering brokerages and financial companies worldwide.
              </p>
            </div>
            {[
              { title: 'Solutions', links: ['White Label', 'IB Management', 'Prop Trading', 'Copy Trading', 'Liquidity'] },
              { title: 'Services', links: ['Development', 'CRM Systems', 'Mobile Apps', 'UI/UX Design', 'Analytics'] },
              { title: 'Company', links: ['About Us', 'Careers', 'Blog', 'Case Studies', 'Contact'] },
              { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'AML Policy', 'Risk Disclosure'] },
            ].map(col => (
              <div key={col.title}>
                <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, color: 'var(--text-primary)' }}>{col.title}</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {col.links.map(link => (
                    <li key={link}>
                      <a href="#" style={{ color: 'var(--text-muted)', fontSize: 13, transition: 'var(--transition)', textDecoration: 'none' }}
                        onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
                        onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
                      >{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>© 2026 SwaganX Technologies. All rights reserved.</span>
            <div style={{ display: 'flex', gap: 20 }}>
              {['Twitter', 'LinkedIn', 'GitHub'].map(s => (
                <a key={s} href="#" style={{ color: 'var(--text-muted)', fontSize: 13, textDecoration: 'none' }}>{s}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </>
  );
}
