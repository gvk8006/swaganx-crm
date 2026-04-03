import AdminLayout from '@/components/AdminLayout';
import { useState } from 'react';

export default function AdminUsersPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);

  const users = [
    { id: 1, name: 'John Thompson', email: 'john@example.com', phone: '+1 234-567-8901', status: 'Active', kyc: 'Approved', balance: '$12,450', equity: '$13,200', totalTrades: 145, pnl: '+$3,450', registered: '2026-01-15', lastLogin: '2026-04-02', ip: '192.168.1.100' },
    { id: 2, name: 'Sarah Kim', email: 'sarah@example.com', phone: '+82 10-1234-5678', status: 'Pending', kyc: 'Pending', balance: '$0', equity: '$0', totalTrades: 0, pnl: '$0', registered: '2026-04-02', lastLogin: '2026-04-02', ip: '103.45.67.89' },
    { id: 3, name: 'Ahmed Hassan', email: 'ahmed@example.com', phone: '+971 50-123-4567', status: 'Active', kyc: 'Approved', balance: '$8,900', equity: '$9,340', totalTrades: 89, pnl: '+$1,230', registered: '2026-02-10', lastLogin: '2026-04-01', ip: '185.23.45.67' },
    { id: 4, name: 'Maria Garcia', email: 'maria@example.com', phone: '+34 612-345-678', status: 'Active', kyc: 'Approved', balance: '$34,200', equity: '$36,800', totalTrades: 234, pnl: '+$8,920', registered: '2025-12-01', lastLogin: '2026-04-02', ip: '88.12.34.56' },
    { id: 5, name: 'Demo User', email: 'demo@demo.com', phone: '1234567890', status: 'Active', kyc: 'Approved', balance: '$7,800', equity: '$7,800', totalTrades: 65, pnl: '+$112,696', registered: '2026-02-02', lastLogin: '2026-04-02', ip: '127.0.0.1' },
    { id: 6, name: 'Li Wei', email: 'liwei@example.com', phone: '+86 138-1234-5678', status: 'Suspended', kyc: 'Rejected', balance: '$500', equity: '$0', totalTrades: 12, pnl: '-$230', registered: '2026-03-05', lastLogin: '2026-03-28', ip: '114.88.45.12' },
    { id: 7, name: 'Emma Wilson', email: 'emma@example.com', phone: '+44 7700-123456', status: 'Active', kyc: 'Approved', balance: '$15,600', equity: '$16,200', totalTrades: 178, pnl: '+$5,670', registered: '2026-01-22', lastLogin: '2026-04-02', ip: '82.132.45.67' },
  ];

  const filteredUsers = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || u.kyc.toLowerCase() === filter || u.status.toLowerCase() === filter;
    return matchSearch && matchFilter;
  });

  return (
    <AdminLayout title="Users Management">
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800 }}>Users</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 4 }}>Manage platform users ({filteredUsers.length} total)</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <input type="text" className="input-field" placeholder="🔍 Search users..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: 250 }} />
          <select className="input-field" style={{ width: 150 }} value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="all">All Status</option><option value="approved">KYC Approved</option><option value="pending">KYC Pending</option><option value="rejected">KYC Rejected</option><option value="active">Active</option><option value="suspended">Suspended</option>
          </select>
          <button className="btn-primary">📥 Export CSV</button>
        </div>
      </div>

      <div className="glass-card" style={{ padding: 0 }}>
        <div className="table-container" style={{ border: 'none' }}>
          <table>
            <thead><tr><th>User</th><th>Status</th><th>KYC</th><th>Balance</th><th>Trades</th><th>PnL</th><th>Registered</th><th>Actions</th></tr></thead>
            <tbody>
              {filteredUsers.map(u => (
                <tr key={u.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, color: 'white' }}>{u.name.split(' ').map(n => n[0]).join('')}</div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>{u.name}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className={`badge ${u.status === 'Active' ? 'badge-success' : u.status === 'Pending' ? 'badge-pending' : 'badge-danger'}`}>{u.status}</span></td>
                  <td><span className={`badge ${u.kyc === 'Approved' ? 'badge-success' : u.kyc === 'Pending' ? 'badge-pending' : 'badge-danger'}`}>{u.kyc}</span></td>
                  <td style={{ fontWeight: 600 }}>{u.balance}</td>
                  <td>{u.totalTrades}</td>
                  <td style={{ color: u.pnl.startsWith('+') ? 'var(--accent-green)' : 'var(--accent-red)', fontWeight: 600 }}>{u.pnl}</td>
                  <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>{u.registered}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn-secondary" style={{ padding: '4px 10px', fontSize: 11 }} onClick={() => setSelectedUser(u)}>View</button>
                      <button className="btn-primary" style={{ padding: '4px 10px', fontSize: 11 }}>Edit</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200 }}>
          <div className="glass-card animate-fade-in" style={{ padding: 32, width: 600, maxWidth: '90vw', maxHeight: '80vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700 }}>User Details</h3>
              <button onClick={() => setSelectedUser(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 20, cursor: 'pointer' }}>✕</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                { label: 'Name', value: selectedUser.name },
                { label: 'Email', value: selectedUser.email },
                { label: 'Phone', value: selectedUser.phone },
                { label: 'Status', value: selectedUser.status },
                { label: 'KYC Status', value: selectedUser.kyc },
                { label: 'Balance', value: selectedUser.balance },
                { label: 'Equity', value: selectedUser.equity },
                { label: 'Total Trades', value: selectedUser.totalTrades },
                { label: 'Total PnL', value: selectedUser.pnl },
                { label: 'Registered', value: selectedUser.registered },
                { label: 'Last Login', value: selectedUser.lastLogin },
                { label: 'IP Address', value: selectedUser.ip },
              ].map(f => (
                <div key={f.label}>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 2 }}>{f.label}</div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{f.value}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              <button className="btn-success" onClick={() => {}} style={{ flex: 1, justifyContent: 'center' }}>Approve KYC</button>
              <button className="btn-danger" onClick={() => {}} style={{ flex: 1, justifyContent: 'center' }}>Suspend User</button>
              <button className="btn-secondary" onClick={() => setSelectedUser(null)} style={{ justifyContent: 'center' }}>Close</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
