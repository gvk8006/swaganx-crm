import Layout from '@/components/Layout';
import { useState } from 'react';

export default function CopyTradePage() {
  const [activeTab, setActiveTab] = useState('discover');
  const [search, setSearch] = useState('');
  const [followed, setFollowed] = useState({});

  const masters = [
    { id: 1, name: 'AlphaTrader', avatar: '🎯', winRate: 78.5, totalTrades: 342, profit: '+$24,560', commission: '10%', status: 'Active', followers: 156, avgLots: 0.5, drawdown: '8.2%', period: '12 months' },
    { id: 2, name: 'ForexKing', avatar: '👑', winRate: 65.2, totalTrades: 891, profit: '+$18,320', commission: '8%', status: 'Active', followers: 234, avgLots: 0.3, drawdown: '12.5%', period: '8 months' },
    { id: 3, name: 'SwingMaster', avatar: '🌊', winRate: 72.1, totalTrades: 156, profit: '+$12,890', commission: '12%', status: 'Active', followers: 89, avgLots: 0.8, drawdown: '6.8%', period: '6 months' },
    { id: 4, name: 'ScalpPro', avatar: '⚡', winRate: 82.3, totalTrades: 1243, profit: '+$8,450', commission: '15%', status: 'Active', followers: 312, avgLots: 0.1, drawdown: '3.2%', period: '4 months' },
    { id: 5, name: 'RiskManager', avatar: '🛡️', winRate: 58.9, totalTrades: 567, profit: '+$15,670', commission: '10%', status: 'Active', followers: 178, avgLots: 0.6, drawdown: '15.1%', period: '10 months' },
  ];

  const subscriptions = [
    { id: 1, master: 'AlphaTrader', status: 'Active', invested: '$2,000', profit: '+$456.80', trades: 24, started: '2026-03-01' },
  ];

  const filteredMasters = masters.filter(m => m.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <Layout title="CopyTrade">
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800 }}>Copy Trading</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 4 }}>Follow top traders and copy their strategies automatically</p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 24, borderBottom: '1px solid var(--border-color)' }}>
        {['discover', 'subscriptions', 'trades'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            padding: '12px 20px', background: 'none', border: 'none',
            borderBottom: activeTab === tab ? '2px solid var(--accent-blue)' : '2px solid transparent',
            color: activeTab === tab ? 'var(--accent-blue)' : 'var(--text-muted)',
            fontWeight: 600, fontSize: 14, cursor: 'pointer', textTransform: 'capitalize'
          }}>{tab}</button>
        ))}
      </div>

      {activeTab === 'discover' && (
        <>
          <div style={{ marginBottom: 20 }}>
            <input type="text" className="input-field" placeholder="🔍 Search masters..." value={search} onChange={e => setSearch(e.target.value)} style={{ maxWidth: 400 }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 16 }}>
            {filteredMasters.map(master => (
              <div key={master.id} className="glass-card" style={{ padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--bg-input)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>{master.avatar}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 16 }}>{master.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{master.followers} followers · {master.period}</div>
                    </div>
                  </div>
                  <span className="badge badge-success">{master.status}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16 }}>
                  <div style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 10, textAlign: 'center' }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--accent-green)' }}>{master.winRate}%</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Win Rate</div>
                  </div>
                  <div style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 10, textAlign: 'center' }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--accent-blue)' }}>{master.totalTrades}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Total Trades</div>
                  </div>
                  <div style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 10, textAlign: 'center' }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--accent-green)' }}>{master.profit}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Total Profit</div>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>
                  <span>Commission: {master.commission}</span>
                  <span>Avg Lots: {master.avgLots}</span>
                  <span>Drawdown: {master.drawdown}</span>
                </div>
                <button className={followed[master.id] ? 'btn-success' : 'btn-primary'}
                  onClick={() => setFollowed({ ...followed, [master.id]: !followed[master.id] })}
                  style={{ width: '100%', justifyContent: 'center' }}>
                  {followed[master.id] ? '✓ Following' : `Follow (${master.commission})`}
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'subscriptions' && (
        <div className="glass-card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Your Subscriptions</h3>
          {subscriptions.length > 0 ? (
            <div className="table-container">
              <table>
                <thead><tr><th>Master</th><th>Status</th><th>Invested</th><th>Profit</th><th>Trades Copied</th><th>Started</th><th>Actions</th></tr></thead>
                <tbody>
                  {subscriptions.map(sub => (
                    <tr key={sub.id}>
                      <td style={{ fontWeight: 600 }}>{sub.master}</td>
                      <td><span className="badge badge-success">{sub.status}</span></td>
                      <td>{sub.invested}</td>
                      <td style={{ color: 'var(--accent-green)', fontWeight: 600 }}>{sub.profit}</td>
                      <td>{sub.trades}</td>
                      <td style={{ color: 'var(--text-muted)' }}>{sub.started}</td>
                      <td><button className="btn-secondary" style={{ padding: '4px 12px', fontSize: 12 }}>Unfollow</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>
              You&apos;re not following any traders yet. Browse the Discover tab to find masters.
            </div>
          )}
        </div>
      )}

      {activeTab === 'trades' && (
        <div className="glass-card" style={{ padding: 60, textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📋</div>
          <p style={{ color: 'var(--text-muted)' }}>Copied trades will appear here once you follow a master trader.</p>
        </div>
      )}
    </Layout>
  );
}
