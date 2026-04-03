import AdminLayout from '@/components/AdminLayout';
import { useState } from 'react';
export default function AdminTradesPage() {
  const [filter, setFilter] = useState('all');
  const trades = [
    { id: 'T-001', account: '#77730631', user: 'Maria Garcia', symbol: 'EURUSD', type: 'Buy', lots: 0.5, open: '1.0845', close: '1.0912', pnl: '+$335.00', commission: '-$3.50', swap: '$2.30', status: 'Closed', openTime: '2026-04-02 14:30', closeTime: '2026-04-02 16:45' },
    { id: 'T-002', account: '#77730631', user: 'Maria Garcia', symbol: 'GBPUSD', type: 'Sell', lots: 0.3, open: '1.2634', close: '1.2658', pnl: '+$72.00', commission: '-$2.10', swap: '-$0.45', status: 'Closed', openTime: '2026-04-02 12:15', closeTime: '2026-04-02 14:20' },
    { id: 'T-003', account: '#68175002', user: 'John Thompson', symbol: 'USDJPY', type: 'Buy', lots: 1.0, open: '151.23', close: '150.85', pnl: '-$380.00', commission: '-$7.00', swap: '$1.20', status: 'Closed', openTime: '2026-04-02 10:45', closeTime: '2026-04-02 11:30' },
    { id: 'T-004', account: '#77730631', user: 'Maria Garcia', symbol: 'AUDUSD', type: 'Sell', lots: 0.2, open: '0.6543', close: '0.6565', pnl: '+$44.00', commission: '-$1.40', swap: '$0.00', status: 'Closed', openTime: '2026-04-01 16:20', closeTime: '2026-04-01 18:50' },
    { id: 'T-005', account: '#77730631', user: 'Maria Garcia', symbol: 'EURUSD', type: 'Buy', lots: 0.5, open: '1.0870', close: null, pnl: '+$125.00', commission: '-$3.50', swap: '$0.30', status: 'Open', openTime: '2026-04-03 02:15', closeTime: null },
    { id: 'T-006', account: '#88123456', user: 'Demo User', symbol: 'XAUUSD', type: 'Buy', lots: 0.1, open: '2345.60', close: null, pnl: '-$45.00', commission: '-$0.70', swap: '-$0.20', status: 'Open', openTime: '2026-04-03 01:30', closeTime: null },
  ];
  const filtered = trades.filter(t => filter === 'all' || t.status.toLowerCase() === filter);
  return (
    <AdminLayout title="Trade Management">
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div><h1 style={{ fontSize: 24, fontWeight: 800 }}>Trade Management</h1><p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 4 }}>View and manage all platform trades</p></div>
        <div style={{ display: 'flex', gap: 12 }}>
          <select className="input-field" style={{ width: 150 }} value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="all">All Status</option><option value="open">Open</option><option value="closed">Closed</option>
          </select>
          <button className="btn-secondary">📥 Export CSV</button>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <div className="glass-card" style={{ padding: 20 }}><div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Total Trades</div><div style={{ fontSize: 24, fontWeight: 800 }}>{trades.length}</div></div>
        <div className="glass-card" style={{ padding: 20 }}><div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Open Positions</div><div style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent-blue)' }}>{trades.filter(t=>t.status==='Open').length}</div></div>
        <div className="glass-card" style={{ padding: 20 }}><div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Total Volume</div><div style={{ fontSize: 24, fontWeight: 800 }}>{trades.reduce((s,t)=>s+t.lots,0).toFixed(1)} lots</div></div>
        <div className="glass-card" style={{ padding: 20 }}><div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Platform P&L</div><div style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent-green)' }}>+${trades.reduce((s,t)=>s+parseFloat(t.pnl.replace(/[+$]/g,'')),0).toFixed(2)}</div></div>
      </div>
      <div className="glass-card" style={{ padding: 0 }}>
        <div className="table-container" style={{ border: 'none' }}>
          <table>
            <thead><tr><th>ID</th><th>Account</th><th>User</th><th>Symbol</th><th>Type</th><th>Lots</th><th>Open</th><th>Close</th><th>PnL</th><th>Commission</th><th>Swap</th><th>Status</th><th>Open Time</th></tr></thead>
            <tbody>
              {filtered.map(t => (
                <tr key={t.id}>
                  <td style={{ fontWeight: 600 }}>{t.id}</td><td>{t.account}</td><td>{t.user}</td><td>{t.symbol}</td>
                  <td><span className={`badge ${t.type==='Buy'?'badge-success':'badge-danger'}`}>{t.type}</span></td>
                  <td>{t.lots}</td><td>{t.open}</td><td>{t.close||'—'}</td>
                  <td style={{ color: t.pnl.startsWith('+')?'var(--accent-green)':'var(--accent-red)', fontWeight: 600 }}>{t.pnl}</td>
                  <td style={{ color: 'var(--accent-red)' }}>{t.commission}</td>
                  <td style={{ color: t.swap.startsWith('-')?'var(--accent-red)':'var(--accent-green)' }}>{t.swap}</td>
                  <td><span className={`badge ${t.status==='Open'?'badge-info':'badge-success'}`}>{t.status}</span></td>
                  <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{t.openTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
