import Layout from '@/components/Layout';
import { useState } from 'react';

export default function IBPage() {
  const [copied, setCopied] = useState(false);
  const referralLink = 'https://swaganx.com/ref/DEMO2026';

  const stats = [
    { label: 'Available Balance', value: '$0.00', icon: '💰' },
    { label: 'Total Earnings', value: '$0.00', icon: '💎' },
    { label: 'Total Referrals', value: '1', icon: '👥' },
    { label: 'Active Referrals', value: '1', icon: '✅' },
  ];

  const commissionLevels = [
    { level: 'Standard', rate: '$2/lot', threshold: '0 - 20 lots', color: 'var(--text-muted)' },
    { level: 'Bronze', rate: '$3/lot', threshold: '20 - 100 lots', color: '#CD7F32' },
    { level: 'Silver', rate: '$4/lot', threshold: '100 - 500 lots', color: '#C0C0C0' },
    { level: 'Gold', rate: '$5/lot', threshold: '500 - 2000 lots', color: '#FFD700' },
    { level: 'Platinum', rate: '$6/lot', threshold: '2000+ lots', color: '#E5E4E2' },
  ];

  const referrals = [
    { name: 'John T.', email: 'j***@gmail.com', status: 'Active', lots: '15.5', commission: '$31.00', date: '2026-03-15' },
  ];

  return (
    <Layout title="IB">
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800 }}>Introducing Broker</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 4 }}>Earn commissions by referring traders to SwaganX</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {stats.map(s => (
          <div key={s.label} className="glass-card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{s.label}</span>
              <span style={{ fontSize: 18 }}>{s.icon}</span>
            </div>
            <div style={{ fontSize: 24, fontWeight: 800 }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
        {/* Referral Link */}
        <div className="glass-card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>🔗 Your Referral Link</h3>
          <div style={{ display: 'flex', gap: 8 }}>
            <input readOnly value={referralLink} className="input-field" style={{ flex: 1 }} />
            <button className="btn-primary" onClick={() => { navigator.clipboard?.writeText(referralLink); setCopied(true); setTimeout(() => setCopied(false), 2000); }}>
              {copied ? '✓ Copied!' : '📋 Copy Link'}
            </button>
          </div>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 12 }}>
            Share this link with your network. Earn $2/lot for every trade your referrals make.
          </p>

          {/* Commission Progress */}
          <div style={{ marginTop: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Commission Level: Standard</span>
              <span style={{ fontSize: 13, color: 'var(--accent-blue)' }}>$2/lot</span>
            </div>
            <div style={{ height: 8, background: 'var(--bg-input)', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '15%', background: 'var(--gradient-primary)', borderRadius: 4 }}></div>
            </div>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>15.5 / 20 lots to reach Bronze level</p>
          </div>
        </div>

        {/* Commission Levels */}
        <div className="glass-card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>🏆 Commission Levels</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {commissionLevels.map(cl => (
              <div key={cl.level} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '10px 14px', borderRadius: 8, background: cl.level === 'Standard' ? 'rgba(59,130,246,0.08)' : 'var(--bg-input)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: cl.color }}></div>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{cl.level}</span>
                </div>
                <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{cl.threshold}</span>
                  <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--accent-green)' }}>{cl.rate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Referrals Table */}
      <div className="glass-card" style={{ padding: 24 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>👥 Your Referrals</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr><th>Name</th><th>Email</th><th>Status</th><th>Total Lots</th><th>Commission Earned</th><th>Joined</th></tr>
            </thead>
            <tbody>
              {referrals.length > 0 ? referrals.map(r => (
                <tr key={r.email}>
                  <td style={{ fontWeight: 600 }}>{r.name}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{r.email}</td>
                  <td><span className="badge badge-success">{r.status}</span></td>
                  <td>{r.lots}</td>
                  <td style={{ color: 'var(--accent-green)', fontWeight: 600 }}>{r.commission}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{r.date}</td>
                </tr>
              )) : (
                <tr><td colSpan={6} style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>No referrals yet. Share your link to start earning!</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
