import Layout from '@/components/Layout';
import { useState, useEffect } from 'react';

export default function DashboardPage() {
  const [mt5Data, setMt5Data] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch real data from MT5 bridge via CRM API
    async function fetchMT5Data() {
      try {
        const [healthRes, accountsRes, positionsRes] = await Promise.all([
          fetch('/api/mt5/health'),
          fetch('/api/mt5/accounts'),
          fetch('/api/mt5/accounts/77730631/positions'),
        ]);
        const health = await healthRes.json();
        const accounts = await accountsRes.json();
        const positions = await positionsRes.json();

        setMt5Data({ health, accounts, positions });
      } catch (err) {
        console.log('MT5 Bridge not connected, using demo data');
        setMt5Data(null);
      }
      setLoading(false);
    }
    fetchMT5Data();

    // Refresh every 10 seconds
    const interval = setInterval(fetchMT5Data, 10000);
    return () => clearInterval(interval);
  }, []);

  // Real-time stats from MT5 or fallback to demo
  const walletBalance = mt5Data?.accounts?.data?.accounts?.reduce((sum, a) => sum + (a.balance || 0), 0) || 7800;
  const totalTrades = 65;
  const totalCharges = 55913.32;
  const totalPnl = 112696.17;
  const openPositions = mt5Data?.positions?.data || [];

  const stats = [
    { label: 'Wallet Balance', value: `$${walletBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, change: '', color: 'var(--accent-green)' },
    { label: 'Total Trades', value: totalTrades, change: '+12 this week', color: 'var(--accent-blue)', mt5Field: mt5Data?.health?.data?.mt5Connected ? 'live' : 'demo' },
    { label: 'Total Charges', value: `$${totalCharges.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, change: '', color: 'var(--accent-purple)' },
    { label: 'Total PnL', value: `+$${totalPnl.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, change: '+1444.8%', color: 'var(--accent-green)' },
  ];

  const heatmap = [
    { pair: 'EUR/USD', strength: 72, change: '+0.45%' },
    { pair: 'GBP/USD', strength: 58, change: '-0.12%' },
    { pair: 'USD/JPY', strength: 85, change: '+0.78%' },
    { pair: 'AUD/USD', strength: 34, change: '-0.32%' },
    { pair: 'USD/CHF', strength: 61, change: '+0.15%' },
    { pair: 'USD/CAD', strength: 47, change: '-0.08%' },
    { pair: 'NZD/USD', strength: 28, change: '-0.55%' },
    { pair: 'EUR/GBP', strength: 55, change: '+0.22%' },
  ];

  const recentOrders = [
    { id: '#TXN-001', pair: 'EUR/USD', type: 'Buy', lots: 0.5, pnl: '+$335.00', status: 'Closed', time: '2026-04-02 14:30' },
    { id: '#TXN-002', pair: 'GBP/USD', type: 'Sell', lots: 0.3, pnl: '+$89.20', status: 'Closed', time: '2026-04-02 12:15' },
    { id: '#TXN-003', pair: 'USD/JPY', type: 'Buy', lots: 1.0, pnl: '-$156.80', status: 'Closed', time: '2026-04-02 10:45' },
    { id: '#TXN-004', pair: 'AUD/USD', type: 'Sell', lots: 0.2, pnl: '+$67.30', status: 'Closed', time: '2026-04-01 16:20' },
    { id: '#TXN-005', pair: 'EUR/GBP', type: 'Buy', lots: 0.8, pnl: '+$312.00', status: 'Closed', time: '2026-04-01 09:30' },
  ];

  const getStrengthColor = (s) => {
    if (s >= 70) return 'var(--accent-green)';
    if (s >= 50) return 'var(--accent-orange)';
    return 'var(--accent-red)';
  };

  return (
    <Layout title="Dashboard">
      {/* MT5 Connection Status Banner */}
      {mt5Data?.health?.data?.mt5Connected && (
        <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: 10, padding: '12px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-green)', boxShadow: '0 0 8px var(--accent-green)' }}></span>
          <span style={{ color: 'var(--accent-green)', fontSize: 13, fontWeight: 600 }}>Connected to MT5 Server</span>
          <span style={{ color: 'var(--text-muted)', fontSize: 12, marginLeft: 'auto' }}>Real-time data</span>
        </div>
      )}
      {!mt5Data?.health?.data?.mt5Connected && (
        <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: 10, padding: '12px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-orange)', boxShadow: '0 0 8px var(--accent-orange)' }}></span>
          <span style={{ color: 'var(--accent-orange)', fontSize: 13, fontWeight: 600 }}>Demo Mode</span>
          <span style={{ color: 'var(--text-muted)', fontSize: 12, marginLeft: 'auto' }}>MT5 Bridge not connected — showing sample data</span>
        </div>
      )}

      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800 }}>Dashboard</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 4 }}>Welcome back! Here&apos;s your trading overview.</p>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {stats.map(stat => (
          <div key={stat.label} className="glass-card" style={{ padding: 20 }}>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}>{stat.label}</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: stat.color }}>{stat.value}</div>
            {stat.change && <div style={{ fontSize: 12, color: 'var(--accent-green)', marginTop: 4 }}>{stat.change}</div>}
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
        {/* Forex Heatmap */}
        <div className="glass-card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>📊 Forex Heatmap</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
            {heatmap.map(item => (
              <div key={item.pair} style={{ background: 'var(--bg-input)', borderRadius: 8, padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{item.pair}</div>
                  <div style={{ fontSize: 12, color: item.change.startsWith('+') ? 'var(--accent-green)' : 'var(--accent-red)' }}>{item.change}</div>
                </div>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: `${getStrengthColor(item.strength)}15`, border: `2px solid ${getStrengthColor(item.strength)}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, color: getStrengthColor(item.strength) }}>{item.strength}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Account Performance */}
        <div className="glass-card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>📈 Account Performance</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { label: 'Win Rate', value: '72.3%', width: '72.3%', color: 'var(--accent-green)' },
              { label: 'Profit Factor', value: '1.85', width: '74%', color: 'var(--accent-blue)' },
              { label: 'Max Drawdown', value: '8.5%', width: '8.5%', color: 'var(--accent-orange)' },
              { label: 'Risk/Reward', value: '1:2.4', width: '60%', color: 'var(--accent-purple)' },
            ].map(item => (
              <div key={item.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{item.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: item.color }}>{item.value}</span>
                </div>
                <div style={{ height: 8, background: 'var(--bg-input)', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: item.width, background: item.color, borderRadius: 4, transition: 'width 0.5s' }}></div>
                </div>
              </div>
            ))}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 8 }}>
              <div style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--accent-green)' }}>47</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Winning Trades</div>
              </div>
              <div style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--accent-red)' }}>18</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Losing Trades</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="glass-card" style={{ padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>📋 Recent Orders</h3>
          <button className="btn-secondary" style={{ padding: '6px 14px', fontSize: 12 }}>View All →</button>
        </div>
        <div className="table-container">
          <table>
            <thead><tr><th>Order ID</th><th>Pair</th><th>Type</th><th>Lots</th><th>PnL</th><th>Status</th><th>Time</th></tr></thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order.id}>
                  <td style={{ fontWeight: 600 }}>{order.id}</td>
                  <td>{order.pair}</td>
                  <td><span className={`badge ${order.type === 'Buy' ? 'badge-success' : 'badge-danger'}`}>{order.type}</span></td>
                  <td>{order.lots}</td>
                  <td style={{ color: order.pnl.startsWith('+') ? 'var(--accent-green)' : 'var(--accent-red)', fontWeight: 600 }}>{order.pnl}</td>
                  <td><span className="badge badge-info">{order.status}</span></td>
                  <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>{order.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
