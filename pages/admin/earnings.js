import AdminLayout from '@/components/AdminLayout';
export default function AdminEarningsPage() {
  const data = [
    { month: 'Apr 2026', revenue: '$45,230', commissions: '$8,450', swaps: '$2,130', deposits: '$40,000', withdrawals: '$18,000', netProfit: '$27,230' },
    { month: 'Mar 2026', revenue: '$38,900', commissions: '$7,200', swaps: '$1,890', deposits: '$35,000', withdrawals: '$22,000', netProfit: '$16,900' },
    { month: 'Feb 2026', revenue: '$52,100', commissions: '$9,800', swaps: '$2,450', deposits: '$48,000', withdrawals: '$25,000', netProfit: '$27,100' },
    { month: 'Jan 2026', revenue: '$29,500', commissions: '$5,600', swaps: '$1,340', deposits: '$25,000', withdrawals: '$15,000', netProfit: '$14,500' },
    { month: 'Dec 2025', revenue: '$41,800', commissions: '$8,100', swaps: '$2,000', deposits: '$38,000', withdrawals: '$20,000', netProfit: '$21,800' },
  ];
  return (
    <AdminLayout title="Earnings Report">
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div><h1 style={{ fontSize: 24, fontWeight: 800 }}>Earnings Report</h1><p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 4 }}>Platform revenue, commissions, and financial overview</p></div>
        <button className="btn-secondary">📥 Export Report</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, marginBottom: 24 }}>
        <div className="glass-card" style={{ padding: 20 }}><div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>This Month Revenue</div><div style={{ fontSize: 22, fontWeight: 800, color: 'var(--accent-green)' }}>$45,230</div></div>
        <div className="glass-card" style={{ padding: 20 }}><div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>Total Commissions</div><div style={{ fontSize: 22, fontWeight: 800 }}>$8,450</div></div>
        <div className="glass-card" style={{ padding: 20 }}><div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>Swap Income</div><div style={{ fontSize: 22, fontWeight: 800 }}>$2,130</div></div>
        <div className="glass-card" style={{ padding: 20 }}><div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>Total Deposits</div><div style={{ fontSize: 22, fontWeight: 800, color: 'var(--accent-blue)' }}>$40,000</div></div>
        <div className="glass-card" style={{ padding: 20 }}><div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>Net Profit</div><div style={{ fontSize: 22, fontWeight: 800, color: 'var(--accent-green)' }}>$27,230</div></div>
      </div>
      <div className="glass-card" style={{ padding: 0 }}>
        <div className="table-container" style={{ border: 'none' }}>
          <table>
            <thead><tr><th>Month</th><th>Revenue</th><th>Commissions</th><th>Swaps</th><th>Deposits</th><th>Withdrawals</th><th>Net Profit</th></tr></thead>
            <tbody>
              {data.map(d => (
                <tr key={d.month}>
                  <td style={{ fontWeight: 600 }}>{d.month}</td>
                  <td>{d.revenue}</td><td>{d.commissions}</td><td>{d.swaps}</td>
                  <td style={{ color: 'var(--accent-green)' }}>{d.deposits}</td>
                  <td style={{ color: 'var(--accent-red)' }}>{d.withdrawals}</td>
                  <td style={{ fontWeight: 700, color: 'var(--accent-green)' }}>{d.netProfit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
