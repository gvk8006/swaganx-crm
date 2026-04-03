import AdminLayout from '@/components/AdminLayout';

export default function AdminCopyTradePage() {
  const masters = [
    { id: 1, name: 'AlphaTrader', status: 'Active', followers: 156, totalLots: '2,340', commission: '10%', winRate: '78.5%', profit: '+$24,560', listed: '2025-12-01' },
    { id: 2, name: 'ForexKing', status: 'Active', followers: 234, totalLots: '4,560', commission: '8%', winRate: '65.2%', profit: '+$18,320', listed: '2025-11-15' },
    { id: 3, name: 'SwingMaster', status: 'Active', followers: 89, totalLots: '890', commission: '12%', winRate: '72.1%', profit: '+$12,890', listed: '2026-01-10' },
    { id: 4, name: 'ScalpPro', status: 'Active', followers: 312, totalLots: '6,230', commission: '15%', winRate: '82.3%', profit: '+$8,450', listed: '2026-02-01' },
    { id: 5, name: 'RiskManager', status: 'Suspended', followers: 178, totalLots: '3,400', commission: '10%', winRate: '58.9%', profit: '+$15,670', listed: '2025-10-20' },
  ];

  const subscriptions = [
    { id: 1, master: 'AlphaTrader', follower: 'Demo User', invested: '$2,000', profit: '+$456.80', status: 'Active', started: '2026-03-01' },
    { id: 2, master: 'ForexKing', follower: 'Maria Garcia', invested: '$5,000', profit: '+$890.00', status: 'Active', started: '2026-02-15' },
    { id: 3, master: 'ScalpPro', follower: 'Emma Wilson', invested: '$3,000', profit: '-$120.00', status: 'Active', started: '2026-03-20' },
  ];

  return (
    <AdminLayout title="CopyTrade Management">
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800 }}>CopyTrade Management</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 4 }}>Manage master traders and copy subscriptions</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <div className="glass-card" style={{ padding: 20 }}>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Total Masters</div>
          <div style={{ fontSize: 24, fontWeight: 800 }}>{masters.length}</div>
        </div>
        <div className="glass-card" style={{ padding: 20 }}>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Total Followers</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent-blue)' }}>{masters.reduce((s, m) => s + m.followers, 0)}</div>
        </div>
        <div className="glass-card" style={{ padding: 20 }}>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Active Subscriptions</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent-green)' }}>{subscriptions.length}</div>
        </div>
        <div className="glass-card" style={{ padding: 20 }}>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Total Lots Copied</div>
          <div style={{ fontSize: 24, fontWeight: 800 }}>{masters.reduce((s, m) => s + parseInt(m.totalLots.replace(/,/g, '')), 0).toLocaleString()}</div>
        </div>
      </div>

      {/* Masters */}
      <div className="glass-card" style={{ padding: 24, marginBottom: 24 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>🏆 Master Traders</h3>
        <div className="table-container">
          <table>
            <thead><tr><th>Master</th><th>Status</th><th>Followers</th><th>Win Rate</th><th>Total Profit</th><th>Commission</th><th>Listed</th><th>Actions</th></tr></thead>
            <tbody>
              {masters.map(m => (
                <tr key={m.id}>
                  <td style={{ fontWeight: 700 }}>{m.name}</td>
                  <td><span className={`badge ${m.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>{m.status}</span></td>
                  <td>{m.followers}</td>
                  <td style={{ color: 'var(--accent-green)', fontWeight: 600 }}>{m.winRate}</td>
                  <td style={{ color: 'var(--accent-green)', fontWeight: 700 }}>{m.profit}</td>
                  <td>{m.commission}</td>
                  <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>{m.listed}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn-secondary" style={{ padding: '4px 10px', fontSize: 11 }}>Edit</button>
                      {m.status === 'Active' ? (
                        <button className="btn-danger" style={{ padding: '4px 10px', fontSize: 11 }}>Suspend</button>
                      ) : (
                        <button className="btn-success" style={{ padding: '4px 10px', fontSize: 11 }}>Activate</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Subscriptions */}
      <div className="glass-card" style={{ padding: 24 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>📋 Active Subscriptions</h3>
        <div className="table-container">
          <table>
            <thead><tr><th>Master</th><th>Follower</th><th>Invested</th><th>PnL</th><th>Status</th><th>Started</th></tr></thead>
            <tbody>
              {subscriptions.map(s => (
                <tr key={s.id}>
                  <td style={{ fontWeight: 600 }}>{s.master}</td>
                  <td>{s.follower}</td>
                  <td>{s.invested}</td>
                  <td style={{ color: (s.pnl && s.pnl.startsWith('+')) ? 'var(--accent-green)' : 'var(--accent-red)', fontWeight: 600 }}>{s.pnl || '$0'}</td>
                  <td><span className="badge badge-success">{s.status}</span></td>
                  <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>{s.started}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
