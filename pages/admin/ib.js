import AdminLayout from '@/components/AdminLayout';
import { useState } from 'react';

export default function AdminIBPage() {
  const [filter, setFilter] = useState('all');

  const ibUsers = [
    { id: 1, name: 'Maria Garcia', email: 'maria@example.com', referrals: 23, activeReferrals: 18, commission: '$4/lot', level: 'Gold', totalEarned: '$12,450', lots: '3,120', status: 'Active' },
    { id: 2, name: 'John Thompson', email: 'john@example.com', referrals: 8, activeReferrals: 5, commission: '$3/lot', level: 'Silver', totalEarned: '$3,200', lots: '1,067', status: 'Active' },
    { id: 3, name: 'Demo User', email: 'demo@demo.com', referrals: 1, activeReferrals: 1, commission: '$2/lot', level: 'Standard', totalEarned: '$31.00', lots: '15.5', status: 'Active' },
    { id: 4, name: 'Emma Wilson', email: 'emma@example.com', referrals: 45, activeReferrals: 38, commission: '$6/lot', level: 'Platinum', totalEarned: '$28,900', lots: '4,817', status: 'Active' },
    { id: 5, name: 'Ahmed Hassan', email: 'ahmed@example.com', referrals: 3, activeReferrals: 2, commission: '$2/lot', level: 'Standard', totalEarned: '$180.00', lots: '90', status: 'Active' },
  ];

  const filtered = ibUsers.filter(u => filter === 'all' || u.level.toLowerCase() === filter);

  const getLevelColor = (level) => {
    switch(level) {
      case 'Platinum': return 'var(--accent-cyan)';
      case 'Gold': return '#FFD700';
      case 'Silver': return '#C0C0C0';
      case 'Bronze': return '#CD7F32';
      default: return 'var(--text-muted)';
    }
  };

  return (
    <AdminLayout title="IB Management">
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800 }}>IB Management</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 4 }}>Manage introducing brokers and commissions</p>
        </div>
        <select className="input-field" style={{ width: 150 }} value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="all">All Levels</option>
          <option value="standard">Standard</option><option value="bronze">Bronze</option><option value="silver">Silver</option><option value="gold">Gold</option><option value="platinum">Platinum</option>
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <div className="glass-card" style={{ padding: 20 }}>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Total IBs</div>
          <div style={{ fontSize: 24, fontWeight: 800 }}>{ibUsers.length}</div>
        </div>
        <div className="glass-card" style={{ padding: 20 }}>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Total Referrals</div>
          <div style={{ fontSize: 24, fontWeight: 800 }}>{ibUsers.reduce((s, i) => s + i.referrals, 0)}</div>
        </div>
        <div className="glass-card" style={{ padding: 20 }}>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Total Commissions Paid</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent-green)' }}>$44,761</div>
        </div>
        <div className="glass-card" style={{ padding: 20 }}>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Total Lots Traded</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent-blue)' }}>9,109.5</div>
        </div>
      </div>

      <div className="glass-card" style={{ padding: 0 }}>
        <div className="table-container" style={{ border: 'none' }}>
          <table>
            <thead><tr><th>IB</th><th>Level</th><th>Referrals</th><th>Active</th><th>Commission Rate</th><th>Total Earned</th><th>Total Lots</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.map(ib => (
                <tr key={ib.id}>
                  <td>
                    <div><div style={{ fontWeight: 600, fontSize: 14 }}>{ib.name}</div><div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{ib.email}</div></div>
                  </td>
                  <td><span style={{ fontWeight: 700, color: getLevelColor(ib.level) }}>🏆 {ib.level}</span></td>
                  <td>{ib.referrals}</td>
                  <td style={{ color: 'var(--accent-green)' }}>{ib.activeReferrals}</td>
                  <td style={{ fontWeight: 600 }}>{ib.commission}</td>
                  <td style={{ color: 'var(--accent-green)', fontWeight: 600 }}>{ib.totalEarned}</td>
                  <td>{ib.lots}</td>
                  <td><span className="badge badge-success">{ib.status}</span></td>
                  <td><button className="btn-secondary" style={{ padding: '4px 10px', fontSize: 11 }}>Manage</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
