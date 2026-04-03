import Layout from '@/components/Layout';

export default function InstructionsPage() {
  const sections = [
    {
      title: '🚀 Getting Started',
      steps: [
        { step: 1, title: 'Create an Account', desc: 'Sign up with your email and complete the registration process. Verify your email to activate your account.' },
        { step: 2, title: 'Complete KYC', desc: 'Upload your government-issued ID and proof of address for verification. KYC is required for withdrawals.' },
        { step: 3, title: 'Create Trading Account', desc: 'Choose your account type (Standard, Plus, Pro) and set your preferred leverage and base currency.' },
        { step: 4, title: 'Fund Your Account', desc: 'Make your first deposit via bank transfer, credit card, or cryptocurrency. Funds are credited quickly.' },
      ]
    },
    {
      title: '💰 Deposits & Withdrawals',
      content: [
        'Bank transfers: 1-2 business days, minimum $100',
        'Credit/Debit cards: Instant, minimum $50',
        'Crypto deposits: 10-60 minutes, minimum $50',
        'Withdrawals: Processed within 24 hours, minimum $10',
        'Crypto withdrawals support: USDT, BTC, ETH, LTC, TRX, BNB',
        'Supported networks: TRC20, ERC20, BEP20',
      ]
    },
    {
      title: '📊 Trading Guide',
      content: [
        'Access 60+ forex pairs with tight spreads',
        'Leverage up to 1:1000 available on select accounts',
        'Zero-commission trading on Standard accounts',
        'Advanced charting tools and technical indicators',
        'One-click trading and instant execution',
        'Stop Loss and Take Profit on every trade',
        'Negative balance protection enabled',
      ]
    },
    {
      title: '🔄 Copy Trading',
      content: [
        'Browse top-performing master traders in the Discover tab',
        'Review their win rate, total trades, profit, and drawdown',
        'Click Follow to start copying their trades automatically',
        'Set your investment amount and risk parameters',
        'Unfollow anytime to stop copying',
        'Commission ranges from 8-15% depending on the master',
      ]
    },
    {
      title: '🤝 IB Program',
      content: [
        'Every user gets a unique referral link',
        'Earn $2-$6 per lot traded by your referrals',
        '5 commission levels: Standard → Bronze → Silver → Gold → Platinum',
        'Level up by referring more active traders',
        'Track your earnings and referral activity in real-time',
        'Withdraw IB commissions anytime via wallet',
      ]
    },
    {
      title: '🔒 Security',
      content: [
        'Enable Two-Factor Authentication (2FA) for extra security',
        'Use a strong, unique password',
        'Monitor your login history regularly',
        'Never share your password or 2FA codes',
        'Contact support immediately if you notice suspicious activity',
        'All data encrypted with AES-256 encryption',
      ]
    },
  ];

  return (
    <Layout title="Instructions">
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800 }}>Platform Instructions</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 4 }}>Learn how to use the SwaganX platform</p>
      </div>

      {/* Welcome */}
      <div className="glass-card" style={{ padding: 32, marginBottom: 24, background: 'var(--gradient-card)' }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>👋 Welcome to SwaganX</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.7 }}>
          This guide covers everything you need to know about using our platform.
          From creating your first account to advanced trading features.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {sections.map((section, i) => (
          <div key={i} className="glass-card" style={{ padding: 24 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>{section.title}</h3>
            {section.steps ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {section.steps.map(s => (
                  <div key={s.step} style={{ display: 'flex', gap: 16 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                      background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', fontWeight: 800, fontSize: 14, color: 'white'
                    }}>{s.step}</div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{s.title}</div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7 }}>{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {section.content.map((item, j) => (
                  <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    <span style={{ color: 'var(--accent-green)', marginTop: 2 }}>✓</span> {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Contact Support */}
      <div className="glass-card" style={{ padding: 32, marginTop: 24, textAlign: 'center' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Need More Help?</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>Our support team is available 24/7 to assist you.</p>
        <a href="/support">
          <button className="btn-primary" style={{ padding: '12px 32px' }}>💬 Contact Support</button>
        </a>
      </div>
    </Layout>
  );
}
