import AdminLayout from '@/components/AdminLayout';

export default function AdminOrdersPage() {
  const orders = [
    { id: 'ORD-78234', user: 'Demo User', pair: 'EUR/USD', type: 'Buy', lots: '0.50', openPrice: '1.0845', closePrice: '1.0912', pnl: '+$335.00', commission: '-$3.50', status: 'Closed', time: '2026-04-02 14:30' },
    { id: 'ORD-78190', user: 'Maria Garcia', pair: 'GBP/USD', type: 'Sell', lots: '1.20', openPrice: '1.2634', closePrice: '1.2598', pnl: '+$432.00', commission: '-$8.40', status: 'Closed', time: '2026-04-02 12:15' },
    { id: 'ORD-78145', user: 'John Thompson', pair: 'USD/JPY', type: 'Buy', lots: '0.80', openPrice: '151.23', closePrice: null, pnl: '+$156.00', commission: '-$5.60', status: 'Open', time: '2026-04-02 10:45' },
    { id: 'ORD-78098', user: 'Emma Wilson', pair: 'AUD/USD', type: 'Sell', lots: '0.50', openPrice: '0.6543', closePrice: '0.6565', pnl: '-$110.00', commission: '-$3.50', status: 'Closed', time: '2026-04-01 16:20' },
    { id: 'ORD-78050', user: 'Ahmed Hassan', pair: 'EUR/GBP', type: 'Buy', lots: '0.30', openPrice: '0.8567', closePrice: '0.8612', pnl: '+$135.00', commission: '-$2.10', status: 'Closed', time: '2026-04-01 09:30' },
  ];

  const totalPnl = orders.filter(o => o.status === 'Closed').reduce((s, o) => s + parseFloat(o.pnl.replace(/[+$]/g, '')), 0);
  const openPositions = orders.filter(o => o.status === 'Open').length;

  return (
    <AdminLayout title="Orders Management">
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800 }}>Orders</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 4 }}>View all platform orders</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        <div className="glass-card" style={{ padding: 20 }}>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Total Orders</div>
          <div style={{ fontSize: 24, fontWeight: 800 }}>{orders.length}</div>
        </div>
        <div className="glass-card" style={{ padding: 20 }}>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Open Positions</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent-blue)' }}>{openPositions}</div>
        </div>
        <div className="glass-card" style={{ padding: 20 }}>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Platform P&L</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent-green)' }}>${totalPnl.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
        </div>
      </div>

      <div className="glass-card" style={{ padding: 0 }}>
        <div className="table-container" style={{ border: 'none' }}>
          <table>
            <thead><tr><th>Order ID</th><th>User</th><th>Pair</th><th>Type</th><th>Lots</th><th>Open</th><th>Close</th><th>PnL</th><th>Commission</th><th>Status</th><th>Time</th></tr></thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id}>
                  <td style={{ fontWeight: 600 }}>{o.id}</td>
                  <td>{o.user}</td>
                  <td>{o.pair}</td>
                  <td><span className={`badge ${o.type === 'Buy' ? 'badge-success' : 'badge-danger'}`}>{o.type}</span></td>
                  <td>{o.lots}</td>
                  <td>{o.openPrice}</td>
                  <td>{o.closePrice || '—'}</td>
                  <td style={{ color: o.pnl.startsWith('+') ? 'var(--accent-green)' : 'var(--accent-red)', fontWeight: 600 }}>{o.pnl}</td>
                  <td style={{ color: 'var(--accent-red)' }}>{o.commission}</td>
                  <td><span className={`badge ${o.status === 'Open' ? 'badge-info' : 'badge-success'}`}>{o.status}</span></td>
                  <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{o.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
