import Layout from '@/components/Layout';
import { useState } from 'react';

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState('positions');
  const [selectedAccount, setSelectedAccount] = useState('all');

  const positions = [];
  const history = [
    { id: 1, order: '#TXN-001', pair: 'EUR/USD', type: 'Buy', lots: '0.50', openPrice: '1.0845', closePrice: '1.0912', pnl: '+$335.00', commission: '-$3.50', swap: '$0.12', time: '2026-04-02 14:30', closeTime: '2026-04-02 16:45' },
    { id: 2, order: '#TXN-002', pair: 'GBP/USD', type: 'Sell', lots: '0.30', openPrice: '1.2634', closePrice: '1.2658', pnl: '+$72.00', commission: '-$2.10', swap: '-$0.45', time: '2026-04-02 12:15', closeTime: '2026-04-02 14:20' },
    { id: 3, order: '#TXN-003', pair: 'USD/JPY', type: 'Buy', lots: '1.00', openPrice: '151.23', closePrice: '150.85', pnl: '-$380.00', commission: '-$7.00', swap: '$1.20', time: '2026-04-02 10:45', closeTime: '2026-04-02 11:30' },
    { id: 4, order: '#TXN-004', pair: 'AUD/USD', type: 'Sell', lots: '0.20', openPrice: '0.6543', closePrice: '0.6565', pnl: '+$44.00', commission: '-$1.40', swap: '$0.00', time: '2026-04-01 16:20', closeTime: '2026-04-01 18:50' },
    { id: 5, order: '#TXN-005', pair: 'EUR/GBP', type: 'Buy', lots: '0.80', openPrice: '0.8567', closePrice: '0.8612', pnl: '+$360.00', commission: '-$5.60', swap: '-$1.80', time: '2026-04-01 09:30', closeTime: '2026-04-01 12:15' },
    { id: 6, order: '#TXN-006', pair: 'USD/CHF', type: 'Sell', lots: '0.40', openPrice: '0.8923', closePrice: '0.8898', pnl: '+$100.00', commission: '-$2.80', swap: '$0.55', time: '2026-03-31 14:00', closeTime: '2026-03-31 17:30' },
    { id: 7, order: '#TXN-007', pair: 'NZD/USD', type: 'Buy', lots: '0.15', openPrice: '0.6123', closePrice: '0.6098', pnl: '-$37.50', commission: '-$1.05', swap: '$0.00', time: '2026-03-31 10:20', closeTime: '2026-03-31 11:45' },
    { id: 8, order: '#TXN-008', pair: 'EUR/USD', type: 'Sell', lots: '0.60', openPrice: '1.0876', closePrice: '1.0854', pnl: '+$132.00', commission: '-$4.20', swap: '-$0.30', time: '2026-03-30 15:45', closeTime: '2026-03-30 18:20' },
  ];
  const pending = [];

  const tabs = [
    { key: 'positions', label: 'Positions', count: positions.length },
    { key: 'history', label: 'History', count: history.length },
    { key: 'pending', label: 'Pending', count: pending.length },
  ];

  const totalPnl = history.reduce((sum, h) => sum + parseFloat(h.pnl.replace(/[+$]/g, '')), 0);

  return (
    <Layout title="Orders">
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800 }}>Orders</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 4 }}>View your trading history and open positions</p>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <select className="input-field" style={{ width: 200 }} value={selectedAccount} onChange={e => setSelectedAccount(e.target.value)}>
            <option value="all">All Accounts</option>
            <option value="real">Real Plus #77730631</option>
            <option value="pro">Real Pro #68175002</option>
          </select>
          <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: 12 }}>🔄 Refresh</button>
          <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: 12 }}>📥 Download CSV</button>
        </div>
      </div>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        <div className="glass-card" style={{ padding: 20 }}>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Open Positions</div>
          <div style={{ fontSize: 24, fontWeight: 800 }}>{positions.length}</div>
        </div>
        <div className="glass-card" style={{ padding: 20 }}>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Floating P&L</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-secondary)' }}>$0.00</div>
        </div>
        <div className="glass-card" style={{ padding: 20 }}>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Realized P&L</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: totalPnl >= 0 ? 'var(--accent-green)' : 'var(--accent-red)' }}>
            {totalPnl >= 0 ? '+' : ''}${totalPnl.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 24, borderBottom: '1px solid var(--border-color)' }}>
        {tabs.map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
            padding: '12px 20px', background: 'none', border: 'none',
            borderBottom: activeTab === tab.key ? '2px solid var(--accent-blue)' : '2px solid transparent',
            color: activeTab === tab.key ? 'var(--accent-blue)' : 'var(--text-muted)',
            fontWeight: 600, fontSize: 14, cursor: 'pointer', transition: 'var(--transition)',
            display: 'flex', alignItems: 'center', gap: 8
          }}>
            {tab.label}
            <span style={{
              background: activeTab === tab.key ? 'var(--accent-blue)' : 'var(--border-color)',
              color: activeTab === tab.key ? 'white' : 'var(--text-muted)',
              padding: '2px 8px', borderRadius: 10, fontSize: 11, fontWeight: 700
            }}>{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="glass-card" style={{ padding: 0 }}>
        {activeTab === 'positions' && (
          <div style={{ padding: 60, textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
            <p style={{ color: 'var(--text-muted)' }}>No open positions</p>
          </div>
        )}
        {activeTab === 'history' && (
          <div className="table-container" style={{ border: 'none' }}>
            <table>
              <thead>
                <tr><th>Order</th><th>Pair</th><th>Type</th><th>Lots</th><th>Open Price</th><th>Close Price</th><th>PnL</th><th>Commission</th><th>Swap</th><th>Open Time</th><th>Close Time</th></tr>
              </thead>
              <tbody>
                {history.map(order => (
                  <tr key={order.id}>
                    <td style={{ fontWeight: 600 }}>{order.order}</td>
                    <td>{order.pair}</td>
                    <td><span className={`badge ${order.type === 'Buy' ? 'badge-success' : 'badge-danger'}`}>{order.type}</span></td>
                    <td>{order.lots}</td>
                    <td>{order.openPrice}</td>
                    <td>{order.closePrice}</td>
                    <td style={{ color: order.pnl.startsWith('+') ? 'var(--accent-green)' : 'var(--accent-red)', fontWeight: 700 }}>{order.pnl}</td>
                    <td style={{ color: 'var(--accent-red)' }}>{order.commission}</td>
                    <td style={{ color: order.swap.startsWith('+') ? 'var(--accent-green)' : 'var(--accent-red)' }}>{order.swap}</td>
                    <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{order.time}</td>
                    <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{order.closeTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === 'pending' && (
          <div style={{ padding: 60, textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>⏳</div>
            <p style={{ color: 'var(--text-muted)' }}>No pending orders</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
