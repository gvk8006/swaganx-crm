import AdminLayout from '@/components/AdminLayout';
export default function AdminFundsPage() {
  const deposits = [
    { id: 'FND-D001', user: 'Maria Garcia', account: '#77730631', type: 'Deposit', amount: '$25,000', method: 'Bank Transfer', status: 'Completed', date: '2026-04-02 14:30' },
    { id: 'FND-D002', user: 'John Thompson', account: '#68175002', type: 'Deposit', amount: '$5,000', method: 'USDT (TRC20)', status: 'Completed', date: '2026-04-02 10:15' },
    { id: 'FND-W001', user: 'Maria Garcia', account: '#77730631', type: 'Withdrawal', amount: '$15,000', method: 'USDT (TRC20)', status: 'Pending', date: '2026-04-02 16:00' },
    { id: 'FND-W002', user: 'Ahmed Hassan', account: '#99111111', type: 'Withdrawal', amount: '$3,000', method: 'BTC', status: 'Pending', date: '2026-04-02 11:20' },
    { id: 'FND-D003', user: 'Emma Wilson', account: '#55123456', type: 'Deposit', amount: '$10,000', method: 'Credit Card', status: 'Pending', date: '2026-04-02 09:45' },
  ];
  return (
    <AdminLayout title="Fund Management">
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800 }}>Fund Management</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 4 }}>Manage deposits, withdrawals, and balance operations</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <div className="glass-card" style={{ padding: 20 }}><div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Total Deposited</div><div style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent-green)' }}>$40,000</div></div>
        <div className="glass-card" style={{ padding: 20 }}><div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Total Withdrawn</div><div style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent-red)' }}>$18,000</div></div>
        <div className="glass-card" style={{ padding: 20 }}><div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Pending Operations</div><div style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent-orange)' }}>3</div></div>
        <div className="glass-card" style={{ padding: 20 }}><div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Net Flow</div><div style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent-green)' }}>+$22,000</div></div>
      </div>
      <div className="glass-card" style={{ padding: 0 }}>
        <div className="table-container" style={{ border: 'none' }}>
          <table>
            <thead><tr><th>ID</th><th>User</th><th>Account</th><th>Type</th><th>Amount</th><th>Method</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
            <tbody>
              {deposits.map(d => (
                <tr key={d.id}>
                  <td style={{ fontWeight: 600 }}>{d.id}</td><td>{d.user}</td><td>{d.account}</td>
                  <td><span className={`badge ${d.type==='Deposit'?'badge-success':'badge-danger'}`}>{d.type}</span></td>
                  <td style={{ fontWeight: 700 }}>{d.amount}</td><td style={{ fontSize: 13 }}>{d.method}</td>
                  <td><span className={`badge ${d.status==='Completed'?'badge-success':'badge-pending'}`}>{d.status}</span></td>
                  <td style={{ fontSize: 13, color: 'var(--text-muted)' }}>{d.date}</td>
                  <td>{d.status==='Pending' && <div style={{ display: 'flex', gap: 6 }}><button className="btn-success" style={{ padding: '4px 10px', fontSize: 11 }}>Approve</button><button className="btn-danger" style={{ padding: '4px 10px', fontSize: 11 }}>Reject</button></div>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
