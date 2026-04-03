import AdminLayout from '@/components/AdminLayout';
import { useState } from 'react';

export default function AdminWithdrawalsPage() {
  const [filter, setFilter] = useState('all');

  const withdrawals = [
    { id: 'WDR-001', user: 'Maria Garcia', amount: '$15,000', method: 'USDT (TRC20)', address: 'TJxR4f...8k2p', status: 'Pending', date: '2026-04-02' },
    { id: 'WDR-002', user: 'John Thompson', amount: '$5,200', method: 'Bank Transfer', address: '****4567', status: 'Pending', date: '2026-04-02' },
    { id: 'WDR-003', user: 'Demo User', amount: '$2,200', method: 'USDT (TRC20)', address: 'TXmK8f...3j7q', status: 'Completed', date: '2026-03-25' },
    { id: 'WDR-004', user: 'Ahmed Hassan', amount: '$3,000', method: 'BTC', address: 'bc1q...w4mn', status: 'Completed', date: '2026-03-22' },
    { id: 'WDR-005', user: 'Emma Wilson', amount: '$8,500', method: 'ETH (ERC20)', address: '0x71C...9d4F', status: 'Completed', date: '2026-03-18' },
    { id: 'WDR-006', user: 'Li Wei', amount: '$500', method: 'USDT (TRC20)', address: 'TRk2pF...7mN3', status: 'Rejected', date: '2026-03-15' },
  ];

  const filtered = withdrawals.filter(w => filter === 'all' || w.status.toLowerCase() === filter);
  const totalPending = withdrawals.filter(w => w.status === 'Pending').reduce((s, w) => s + parseInt(w.amount.replace(/[$,]/g, '')), 0);

  return (
    <AdminLayout title="Withdrawals">
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800 }}>Withdrawals</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 4 }}>Process user withdrawal requests</p>
        </div>
        <select className="input-field" style={{ width: 150 }} value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="all">All Status</option><option value="completed">Completed</option><option value="pending">Pending</option><option value="rejected">Rejected</option>
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        <div className="glass-card" style={{ padding: 20 }}>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Pending Amount</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent-orange)' }}>${totalPending.toLocaleString()}</div>
        </div>
        <div className="glass-card" style={{ padding: 20 }}>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Pending Requests</div>
          <div style={{ fontSize: 24, fontWeight: 800 }}>{withdrawals.filter(w => w.status === 'Pending').length}</div>
        </div>
        <div className="glass-card" style={{ padding: 20 }}>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Total Processed</div>
          <div style={{ fontSize: 24, fontWeight: 800 }}>{withdrawals.filter(w => w.status !== 'Pending').length}</div>
        </div>
      </div>

      <div className="glass-card" style={{ padding: 0 }}>
        <div className="table-container" style={{ border: 'none' }}>
          <table>
            <thead><tr><th>ID</th><th>User</th><th>Amount</th><th>Method</th><th>Address</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.map(w => (
                <tr key={w.id}>
                  <td style={{ fontWeight: 600 }}>{w.id}</td>
                  <td style={{ fontWeight: 600 }}>{w.user}</td>
                  <td style={{ fontWeight: 700 }}>{w.amount}</td>
                  <td style={{ fontSize: 13 }}>{w.method}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--text-muted)' }}>{w.address}</td>
                  <td><span className={`badge ${w.status === 'Completed' ? 'badge-success' : w.status === 'Pending' ? 'badge-pending' : 'badge-danger'}`}>{w.status}</span></td>
                  <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>{w.date}</td>
                  <td>
                    {w.status === 'Pending' && (
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
