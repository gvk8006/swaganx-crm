import AdminLayout from '@/components/AdminLayout';
import { useState } from 'react';

export default function AdminDepositsPage() {
  const [filter, setFilter] = useState('all');

  const deposits = [
    { id: 'DEP-001', user: 'Maria Garcia', email: 'maria@example.com', amount: '$25,000', method: 'Bank Transfer', account: '#68175002', status: 'Completed', date: '2026-04-02 14:30' },
    { id: 'DEP-002', user: 'John Thompson', email: 'john@example.com', amount: '$5,000', method: 'USDT (TRC20)', account: '#77730631', status: 'Completed', date: '2026-04-02 10:15' },
    { id: 'DEP-003', user: 'Emma Wilson', email: 'emma@example.com', amount: '$10,000', method: 'Credit Card', account: '#88123456', status: 'Pending', date: '2026-04-02 09:45' },
    { id: 'DEP-004', user: 'Ahmed Hassan', email: 'ahmed@example.com', amount: '$3,500', method: 'BTC', account: '#77730631', status: 'Completed', date: '2026-04-01 16:20' },
    { id: 'DEP-005', user: 'Li Wei', email: 'liwei@example.com', amount: '$500', method: 'Bank Transfer', account: '#99111111', status: 'Pending', date: '2026-04-01 14:00' },
    { id: 'DEP-006', user: 'Demo User', email: 'demo@demo.com', amount: '$5,000', method: 'Bank Transfer', account: '#77730631', status: 'Completed', date: '2026-03-28 14:30' },
    { id: 'DEP-007', user: 'Demo User', email: 'demo@demo.com', amount: '$10,000', method: 'Crypto (BTC)', account: '#77730631', status: 'Completed', date: '2026-03-22 11:20' },
  ];

  const filtered = deposits.filter(d => filter === 'all' || d.status.toLowerCase() === filter);

  const totalDeposited = deposits.filter(d => d.status === 'Completed').reduce((s, d) => s + parseInt(d.amount.replace(/[$,]/g, '')), 0);
  const pendingAmount = deposits.filter(d => d.status === 'Pending').reduce((s, d) => s + parseInt(d.amount.replace(/[$,]/g, '')), 0);

  return (
    <AdminLayout title="Deposits">
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800 }}>Deposits</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 4 }}>Manage user deposits</p>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <select className="input-field" style={{ width: 150 }} value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="all">All Status</option><option value="completed">Completed</option><option value="pending">Pending</option><option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        <div className="glass-card" style={{ padding: 20 }}>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Total Deposited</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent-green)' }}>${totalDeposited.toLocaleString()}</div>
        </div>
        <div className="glass-card" style={{ padding: 20 }}>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Pending</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent-orange)' }}>${pendingAmount.toLocaleString()}</div>
        </div>
        <div className="glass-card" style={{ padding: 20 }}>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Total Transactions</div>
          <div style={{ fontSize: 24, fontWeight: 800 }}>{deposits.length}</div>
        </div>
      </div>

      <div className="glass-card" style={{ padding: 0 }}>
        <div className="table-container" style={{ border: 'none' }}>
          <table>
            <thead><tr><th>ID</th><th>User</th><th>Amount</th><th>Method</th><th>Account</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.map(d => (
                <tr key={d.id}>
                  <td style={{ fontWeight: 600 }}>{d.id}</td>
                  <td><div><div style={{ fontWeight: 600, fontSize: 14 }}>{d.user}</div><div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{d.email}</div></div></td>
                  <td style={{ fontWeight: 700 }}>{d.amount}</td>
                  <td style={{ fontSize: 13 }}>{d.method}</td>
                  <td style={{ fontSize: 13 }}>{d.account}</td>
                  <td><span className={`badge ${d.status === 'Completed' ? 'badge-success' : d.status === 'Pending' ? 'badge-pending' : 'badge-danger'}`}>{d.status}</span></td>
                  <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>{d.date}</td>
                  <td>
                    {d.status === 'Pending' && (
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button className="btn-success" style={{ padding: '4px 10px', fontSize: 11 }}>Approve</button>
                        <button className="btn-danger" style={{ padding: '4px 10px', fontSize: 11 }}>Reject</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
