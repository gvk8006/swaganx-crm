import Layout from '@/components/Layout';
import { useState } from 'react';

export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState('personal');
  const [editing, setEditing] = useState(false);
  const [show2FA, setShow2FA] = useState(false);
  const [showLoginHistory, setShowLoginHistory] = useState(false);
  const [form, setForm] = useState({ name: 'Demo', email: 'demo@demo.com', phone: '1234567890', address: '' });

  const user = JSON.parse(typeof window !== 'undefined' ? localStorage.getItem('swaganx_current_user') || '{}' : '{}');

  const loginHistory = [
    { ip: '192.168.1.100', device: 'Chrome · macOS', date: '2026-04-02 19:30', status: 'Current' },
    { ip: '192.168.1.100', device: 'Chrome · macOS', date: '2026-04-02 14:20', status: 'Success' },
    { ip: '103.45.67.89', device: 'Safari · iOS', date: '2026-04-01 09:15', status: 'Success' },
    { ip: '192.168.1.100', device: 'Firefox · Windows', date: '2026-03-30 18:45', status: 'Success' },
  ];

  return (
    <Layout title="Profile">
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800 }}>Profile</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 4 }}>Manage your account settings and security</p>
      </div>

      {/* User Info Card */}
      <div className="glass-card" style={{ padding: 24, marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 28, color: 'white' }}>
            {(user.name || 'U')[0].toUpperCase()}
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>{user.name || 'Demo User'}</div>
            <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{user.email || 'demo@demo.com'}</div>
            <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
              <span className="badge badge-success">✓ Verified</span>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Since 02/02/2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section Tabs */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 24, borderBottom: '1px solid var(--border-color)' }}>
        {[
          { key: 'personal', label: 'Personal Info' },
          { key: 'security', label: 'Security' },
          { key: 'withdrawal', label: 'Withdrawal Info' },
        ].map(s => (
          <button key={s.key} onClick={() => setActiveSection(s.key)} style={{
            padding: '12px 20px', background: 'none', border: 'none',
            borderBottom: activeSection === s.key ? '2px solid var(--accent-blue)' : '2px solid transparent',
            color: activeSection === s.key ? 'var(--accent-blue)' : 'var(--text-muted)',
            fontWeight: 600, fontSize: 14, cursor: 'pointer'
          }}>{s.label}</button>
        ))}
      </div>

      {activeSection === 'personal' && (
        <div className="glass-card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700 }}>Personal Information</h3>
            <button className={editing ? 'btn-success' : 'btn-primary'} onClick={() => setEditing(!editing)} style={{ padding: '8px 16px', fontSize: 13 }}>
              {editing ? 'Save Changes' : 'Edit'}
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {[
              { label: 'Name', key: 'name', value: form.name },
              { label: 'Email', key: 'email', value: form.email },
              { label: 'Phone', key: 'phone', value: form.phone },
              { label: 'Address', key: 'address', value: form.address || 'Not provided' },
            ].map(field => (
              <div key={field.key}>
                <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>{field.label}</label>
                {editing ? (
                  <input className="input-field" value={form[field.key]} onChange={e => setForm({ ...form, [field.key]: e.target.value })} />
                ) : (
                  <div style={{ padding: '12px 0', fontSize: 15, color: field.value === 'Not provided' ? 'var(--text-muted)' : 'var(--text-primary)' }}>
                    {field.value}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === 'security' && (
        <div className="glass-card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 24 }}>Security Settings</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--border-color)' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 15 }}>🔑 Password</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Last changed: Never</div>
              </div>
              <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: 13 }}>Change</button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--border-color)' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 15 }}>🛡️ Two-Factor Authentication</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Add an extra layer of security</div>
              </div>
              <button className="btn-primary" style={{ padding: '8px 16px', fontSize: 13 }}>Enable</button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 15 }}>📱 Login History</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>View recent login activity</div>
              </div>
              <button className="btn-secondary" onClick={() => setShowLoginHistory(!showLoginHistory)} style={{ padding: '8px 16px', fontSize: 13 }}>
                {showLoginHistory ? 'Hide' : 'View'}
              </button>
            </div>
          </div>

          {showLoginHistory && (
            <div style={{ marginTop: 16 }}>
              <div className="table-container">
                <table>
                  <thead><tr><th>IP Address</th><th>Device</th><th>Date</th><th>Status</th></tr></thead>
                  <tbody>
                    {loginHistory.map(l => (
                      <tr key={l.date + l.device}>
                        <td style={{ fontFamily: 'monospace', fontSize: 13 }}>{l.ip}</td>
                        <td style={{ fontSize: 13 }}>{l.device}</td>
                        <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>{l.date}</td>
                        <td><span className={`badge ${l.status === 'Current' ? 'badge-info' : 'badge-success'}`}>{l.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {activeSection === 'withdrawal' && (
        <div className="glass-card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 24 }}>Withdrawal Information</h3>
          <div style={{ background: 'var(--bg-input)', borderRadius: 12, padding: 20 }}>
            <div style={{ fontWeight: 600, marginBottom: 16 }}>💰 Crypto Withdrawals Only</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}>Supported Coins</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {['USDT', 'BTC', 'ETH', 'LTC', 'TRX', 'BNB'].map(c => (
                    <span key={c} style={{ background: 'var(--bg-card)', padding: '4px 12px', borderRadius: 6, fontSize: 13, fontWeight: 600, border: '1px solid var(--border-color)' }}>{c}</span>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}>Supported Networks</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {['TRC20', 'ERC20', 'BEP20'].map(n => (
                    <span key={n} style={{ background: 'var(--bg-card)', padding: '4px 12px', borderRadius: 6, fontSize: 13, fontWeight: 600, border: '1px solid var(--border-color)' }}>{n}</span>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 24, marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border-color)' }}>
              <div><span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Min Withdrawal: </span><span style={{ fontWeight: 600 }}>$10</span></div>
              <div><span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Processing: </span><span style={{ fontWeight: 600 }}>Within 24 hours</span></div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
