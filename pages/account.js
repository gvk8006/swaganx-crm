import Layout from '@/components/Layout';
import { useState } from 'react';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('real');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const accounts = {
    real: [
      { id: '77730631', type: 'Real Plus', balance: '1,068,308.736', currency: 'USD', equity: '1,085,432.10', margin: '45,230.00', freeMargin: '1,040,202.10', leverage: '1:100', status: 'Active' },
      { id: '68175002', type: 'Real Pro', balance: '2,000.00', currency: 'USD', equity: '2,145.80', margin: '320.00', freeMargin: '1,825.80', leverage: '1:500', status: 'Active' },
    ],
    demo: [
      { id: '88123456', type: 'Demo Standard', balance: '50,000.00', currency: 'USD', equity: '52,340.00', margin: '5,000.00', freeMargin: '47,340.00', leverage: '1:100', status: 'Active' },
    ],
    challenge: [
      { id: '99111111', type: 'Challenge 10K', balance: '10,000.00', currency: 'USD', equity: '10,560.00', margin: '0.00', freeMargin: '10,560.00', leverage: '1:100', status: 'In Progress' },
    ],
    archived: [
      { id: '55123456', type: 'Real Standard', balance: '0.00', currency: 'USD', equity: '0.00', margin: '0.00', freeMargin: '0.00', leverage: '1:100', status: 'Closed' },
    ],
  };

  const currentAccounts = accounts[activeTab] || [];

  return (
    <Layout title="Account">
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800 }}>Trading Accounts</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 4 }}>Manage your trading accounts</p>
        </div>
        <button className="btn-primary" onClick={() => setShowCreateModal(true)}>+ Create Account</button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: 'var(--bg-card)', borderRadius: 10, padding: 4, width: 'fit-content' }}>
        {['real', 'demo', 'challenge', 'archived'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            style={{
              padding: '8px 20px', borderRadius: 8, fontWeight: 600, fontSize: 13,
              background: activeTab === tab ? 'var(--accent-blue)' : 'transparent',
              color: activeTab === tab ? 'white' : 'var(--text-secondary)',
              border: 'none', cursor: 'pointer', textTransform: 'capitalize',
              transition: 'var(--transition)'
            }}>{tab}</button>
        ))}
      </div>

      {/* Accounts */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {currentAccounts.map(acc => (
          <div key={acc.id} className="glass-card" style={{ padding: 24 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr auto', gap: 24, alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Account #{acc.id}</div>
                <div style={{ fontSize: 16, fontWeight: 700 }}>{acc.type}</div>
              </div>
              <div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Balance</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--accent-green)' }}>${acc.balance}</div>
              </div>
              <div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Equity</div>
                <div style={{ fontSize: 16, fontWeight: 700 }}>${acc.equity}</div>
              </div>
              <div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Leverage</div>
                <div style={{ fontSize: 16, fontWeight: 700 }}>{acc.leverage}</div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn-primary" style={{ padding: '8px 16px', fontSize: 12 }}>Trade</button>
                <button className="btn-success" style={{ padding: '8px 16px', fontSize: 12 }}>Deposit</button>
                <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: 12 }}>Withdraw</button>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border-color)' }}>
              <div>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Margin: </span>
                <span style={{ fontSize: 13, fontWeight: 600 }}>${acc.margin}</span>
              </div>
              <div>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Free Margin: </span>
                <span style={{ fontSize: 13, fontWeight: 600 }}>${acc.freeMargin}</span>
              </div>
              <div>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Currency: </span>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{acc.currency}</span>
              </div>
              <div>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Status: </span>
                <span className={`badge ${acc.status === 'Active' ? 'badge-success' : acc.status === 'In Progress' ? 'badge-pending' : 'badge-danger'}`}>{acc.status}</span>
              </div>
            </div>
          </div>
        ))}
        {currentAccounts.length === 0 && (
          <div className="glass-card" style={{ padding: 60, textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
            <p style={{ color: 'var(--text-muted)' }}>No {activeTab} accounts found</p>
            <button className="btn-primary" style={{ marginTop: 16 }} onClick={() => setShowCreateModal(true)}>Create Account</button>
          </div>
        )}
      </div>

      {/* Create Account Modal */}
      {showCreateModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200
        }}>
          <div className="glass-card animate-fade-in" style={{ padding: 32, width: 480, maxWidth: '90vw' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700 }}>Create Trading Account</h3>
              <button onClick={() => setShowCreateModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 20, cursor: 'pointer' }}>✕</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Account Type</label>
                <select className="input-field">
                  <option>Real Standard</option>
                  <option>Real Plus</option>
                  <option>Real Pro</option>
                  <option>Demo</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Currency</label>
                <select className="input-field">
                  <option>USD</option>
                  <option>EUR</option>
                  <option>GBP</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Leverage</label>
                <select className="input-field">
                  <option>1:100</option>
                  <option>1:200</option>
                  <option>1:500</option>
                  <option>1:1000</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <button className="btn-secondary" onClick={() => setShowCreateModal(false)} style={{ flex: 1, justifyContent: 'center' }}>Cancel</button>
                <button className="btn-primary" onClick={() => setShowCreateModal(false)} style={{ flex: 1, justifyContent: 'center' }}>Create</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
