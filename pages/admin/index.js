import AdminLayout from '@/components/AdminLayout';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Users', value: '1,247', change: '+23 this week', icon: '👥', color: 'var(--accent-blue)' },
    { label: 'Active Accounts', value: '892', change: '+12 today', icon: '🏦', color: 'var(--accent-green)' },
    { label: 'Total Deposits', value: '$2,456,780', change: '+$45,230 today', icon: '📥', color: 'var(--accent-purple)' },
    { label: 'Total Withdrawals', value: '$1,234,560', change: '+$12,450 today', icon: '📤', color: 'var(--accent-orange)' },
    { label: 'Open Positions', value: '3,456', change: '', icon: '📋', color: 'var(--accent-cyan)' },
    { label: 'Platform P&L', value: '+$89,340', change: '+12.5%', icon: '📈', color: 'var(--accent-green)' },
  ];

  const recentUsers = [
    { id: 1, name: 'John Thompson', email: 'john@example.com', status: 'Verified', balance: '$12,450', kyc: 'Approved', date: '2026-04-02' },
    { id: 2, name: 'Sarah Kim', email: 'sarah@example.com', status: 'Pending', balance: '$0', kyc: 'Pending', date: '2026-04-02' },
    { id: 3, name: 'Ahmed Hassan', email: 'ahmed@example.com', status: 'Verified', balance: '$8,900', kyc: 'Approved', date: '2026-04-01' },
    { id: 4, name: 'Maria Garcia', email: 'maria@example.com', status: 'Active', balance: '$34,200', kyc: 'Approved', date: '2026-04-01' },
    { id: 5, name: 'Demo User', email: 'demo@demo.com', status: 'Verified', balance: '$7,800', kyc: 'Approved', date: '2026-02-02' },
  ];

  const pendingActions = [
    { type: 'KYC', user: 'Sarah Kim', date: '2026-04-02', priority: 'Medium' },
    { type: 'Withdrawal', user: 'Alex Petrov', amount: '$5,200', date: '2026-04-02', priority: 'High' },
    { type: 'KYC', user: 'Li Wei', date: '2026-04-01', priority: 'Medium' },
    { type: 'Withdrawal', user: 'James Chen', amount: '$12,800', date: '2026-04-01', priority: 'High' },
  ];

  return (
    <AdminLayout title="Admin Dashboard">
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800 }}>Admin Dashboard</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 4 }}>Platform overview and key metrics</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        {stats.map(s => (
          <div key={s.label} className="glass-card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{s.label}</span>
              <span style={{ fontSize: 20 }}>{s.icon}</span>
            </div>
            <div style={{ fontSize: 24, fontWeight: 800, color: s.color }}>{s.value}</div>
            {s.change && <div style={{ fontSize: 12, color: 'var(--accent-green)', marginTop: 4 }}>{s.change}</div>}
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
        {/* Recent Users */}
        <div className="glass-card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>👥 Recent Users</h3>
          <div className="table-container">
            <table>
              <thead><tr><th>Name</th><th>Email</th><th>KYC</th><th>Balance</th><th>Date</th></tr></thead>
              <tbody>
                {recentUsers.map(u => (
                  <tr key={u.id}>
                    <td style={{ fontWeight: 600 }}>{u.name}</td>
                    <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>{u.email}</td>
                    <td><span className={`badge ${u.kyc === 'Approved' ? 'badge-success' : 'badge-pending'}`}>{u.kyc}</span></td>
                    <td style={{ fontWeight: 600 }}>{u.balance}</td>
                    <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>{u.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pending Actions */}
        <div className="glass-card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>⏳ Pending Actions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {pendingActions.map((action, i) => (
              <div key={i} style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span className={`badge ${action.priority === 'High' ? 'badge-danger' : 'badge-pending'}`}>{action.type}</span>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{action.date}</span>
                </div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{action.user}</div>
                {action.amount && <div style={{ fontSize: 13, color: 'var(--accent-green)' }}>{action.amount}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
