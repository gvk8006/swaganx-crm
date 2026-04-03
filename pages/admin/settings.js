import AdminLayout from '@/components/AdminLayout';
import { useState } from 'react';

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AdminLayout title="Settings">
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800 }}>Settings</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 4 }}>Configure platform settings</p>
      </div>

      {saved && (
        <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: 8, padding: 16, marginBottom: 24 }}>
          <span style={{ color: 'var(--accent-green)', fontWeight: 600 }}>✓ Settings saved successfully!</span>
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 24, borderBottom: '1px solid var(--border-color)' }}>
        {['general', 'trading', 'payments', 'notifications', 'security'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            padding: '12px 20px', background: 'none', border: 'none',
            borderBottom: activeTab === tab ? '2px solid var(--accent-blue)' : '2px solid transparent',
            color: activeTab === tab ? 'var(--accent-blue)' : 'var(--text-muted)',
            fontWeight: 600, fontSize: 14, cursor: 'pointer', textTransform: 'capitalize'
          }}>{tab}</button>
        ))}
      </div>

      {activeTab === 'general' && (
        <div className="glass-card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 24 }}>General Settings</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div>
              <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Company Name</label>
              <input type="text" className="input-field" defaultValue="SwaganX Technologies" />
            </div>
            <div>
              <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Support Email</label>
              <input type="email" className="input-field" defaultValue="support@swaganx.com" />
            </div>
            <div>
              <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Platform URL</label>
              <input type="text" className="input-field" defaultValue="https://swaganx.com" />
            </div>
            <div>
              <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Default Currency</label>
              <select className="input-field"><option>USD</option><option>EUR</option><option>GBP</option></select>
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Company Address</label>
              <textarea className="input-field" rows={2} defaultValue="Level 38, One Canada Square, Canary Wharf, London, E14 5AB, United Kingdom"></textarea>
            </div>
            <div>
              <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Platform Timezone</label>
              <select className="input-field"><option>UTC</option><option>GMT+5:30 (IST)</option><option>EST (UTC-5)</option><option>PST (UTC-8)</option></select>
            </div>
            <div>
              <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Maintenance Mode</label>
              <select className="input-field"><option>Disabled</option><option>Enabled</option></select>
            </div>
          </div>
          <button className="btn-primary" onClick={handleSave} style={{ marginTop: 24 }}>Save Changes</button>
        </div>
      )}

      {activeTab === 'trading' && (
        <div className="glass-card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 24 }}>Trading Settings</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div>
              <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Default Leverage</label>
              <select className="input-field"><option>1:100</option><option>1:200</option><option>1:500</option><option>1:1000</option></select>
            </div>
            <div>
              <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Max Leverage</label>
              <select className="input-field"><option>1:500</option><option>1:1000</option><option>1:2000</option></select>
            </div>
            <div>
              <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Minimum Lot Size</label>
              <input type="number" className="input-field" defaultValue="0.01" step="0.01" />
            </div>
            <div>
              <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Maximum Lot Size</label>
              <input type="number" className="input-field" defaultValue="100" step="1" />
            </div>
            <div>
              <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Margin Call Level (%)</label>
              <input type="number" className="input-field" defaultValue="100" />
            </div>
            <div>
              <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Stop Out Level (%)</label>
              <input type="number" className="input-field" defaultValue="50" />
            </div>
            <div>
              <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Spread Type</label>
              <select className="input-field"><option>Variable</option><option>Fixed</option></select>
            </div>
            <div>
              <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Commission per Lot</label>
              <input type="text" className="input-field" defaultValue="$7.00" />
            </div>
          </div>
          <button className="btn-primary" onClick={handleSave} style={{ marginTop: 24 }}>Save Changes</button>
        </div>
      )}

      {activeTab === 'payments' && (
        <div className="glass-card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 24 }}>Payment Settings</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div>
              <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Min Deposit (Bank)</label>
              <input type="number" className="input-field" defaultValue="100" />
            </div>
            <div>
              <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Min Deposit (Crypto)</label>
              <input type="number" className="input-field" defaultValue="50" />
            </div>
            <div>
              <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Min Withdrawal</label>
              <input type="number" className="input-field" defaultValue="10" />
            </div>
            <div>
              <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Withdrawal Processing (hours)</label>
              <input type="number" className="input-field" defaultValue="24" />
            </div>
            <div>
              <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Deposit Bonus (%)</label>
              <input type="number" className="input-field" defaultValue="0" step="0.1" />
            </div>
            <div>
              <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>IB Commission Default ($/lot)</label>
              <input type="number" className="input-field" defaultValue="2" />
            </div>
          </div>
          <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Crypto Wallets</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { network: 'USDT (TRC20)', address: 'TJxR4fBn3k8p2mLq9vW... (hidden)' },
                { network: 'BTC', address: 'bc1qxy2kgdygjrsqtzq2n0yrf... (hidden)' },
                { network: 'ETH (ERC20)', address: '0x71C7656EC7ab88b098... (hidden)' },
              ].map((wallet, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-input)', borderRadius: 8, padding: '12px 16px' }}>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{wallet.network}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontFamily: 'monospace', fontSize: 13, color: 'var(--text-muted)' }}>{wallet.address}</span>
                    <button className="btn-secondary" style={{ padding: '4px 10px', fontSize: 11 }}>Edit</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="btn-primary" onClick={handleSave} style={{ marginTop: 24 }}>Save Changes</button>
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className="glass-card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 24 }}>Notification Settings</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { label: 'Email notifications for new user registrations', enabled: true },
              { label: 'Email notifications for deposit requests', enabled: true },
              { label: 'Email notifications for withdrawal requests', enabled: true },
              { label: 'Email notifications for KYC submissions', enabled: true },
              { label: 'SMS alerts for high-value transactions (>$10,000)', enabled: false },
              { label: 'Auto-approve deposits under $1,000', enabled: false },
              { label: 'Send welcome email to new users', enabled: true },
              { label: 'Notify users of maintenance windows', enabled: true },
            ].map((notif, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < 7 ? '1px solid var(--border-color)' : 'none' }}>
                <span style={{ fontSize: 14 }}>{notif.label}</span>
                <div style={{
                  width: 44, height: 24, borderRadius: 12, cursor: 'pointer',
                  background: notif.enabled ? 'var(--accent-green)' : 'var(--border-color)',
                  display: 'flex', alignItems: 'center', padding: '2px',
                  transition: 'var(--transition)'
                }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: '50%', background: 'white',
                    marginLeft: notif.enabled ? 20 : 2, transition: 'margin-left 0.2s'
                  }}></div>
                </div>
              </div>
            ))}
          </div>
          <button className="btn-primary" onClick={handleSave} style={{ marginTop: 24 }}>Save Changes</button>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="glass-card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 24 }}>Security Settings</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div>
              <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Session Timeout (minutes)</label>
              <input type="number" className="input-field" defaultValue="30" />
            </div>
            <div>
              <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Max Login Attempts</label>
              <input type="number" className="input-field" defaultValue="5" />
            </div>
            <div>
              <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Password Min Length</label>
              <input type="number" className="input-field" defaultValue="8" />
            </div>
            <div>
              <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Require KYC for Trading</label>
              <select className="input-field"><option>Yes</option><option>No</option></select>
            </div>
            <div>
              <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Require KYC for Withdrawal</label>
              <select className="input-field"><option>Yes</option><option>No</option></select>
            </div>
            <div>
              <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>IP Whitelist for Admin</label>
              <select className="input-field"><option>Disabled</option><option>Enabled</option></select>
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Admin IP Whitelist (comma separated)</label>
              <input type="text" className="input-field" placeholder="192.168.1.0/24, 10.0.0.1" />
            </div>
          </div>
          <button className="btn-primary" onClick={handleSave} style={{ marginTop: 24 }}>Save Changes</button>
        </div>
      )}
    </AdminLayout>
  );
}
