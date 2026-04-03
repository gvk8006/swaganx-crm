import AdminLayout from '@/components/AdminLayout';
import { useState } from 'react';

export default function AdminBooksPage() {
  const [search, setSearch] = useState('');
  const books = [
    { id: 1, account: '#77730631', user: 'Maria Garcia', type: 'Real Plus', balance: '$1,068,308.74', equity: '$1,085,432.10', credit: '$0', margin: '$45,230', free: '$1,040,202', profit: '+$17,123', leverage: '1:100', currency: 'USD', status: 'Active' },
    { id: 2, account: '#68175002', user: 'John Thompson', type: 'Real Pro', balance: '$2,000.00', equity: '$2,145.80', credit: '$500', margin: '$320', free: '$2,325', profit: '+$145.80', leverage: '1:500', currency: 'USD', status: 'Active' },
    { id: 3, account: '#88123456', user: 'Demo User', type: 'Demo', balance: '$50,000.00', equity: '$52,340.00', credit: '$0', margin: '$5,000', free: '$47,340', profit: '+$2,340', leverage: '1:100', currency: 'USD', status: 'Active' },
    { id: 4, account: '#99111111', user: 'Ahmed Hassan', type: 'Challenge', balance: '$10,000.00', equity: '$10,560', credit: '$0', margin: '$0', free: '$10,560', profit: '+$560', leverage: '1:100', currency: 'USD', status: 'Active' },
    { id: 5, account: '#55123456', user: 'Emma Wilson', type: 'Real Standard', balance: '$0.00', equity: '$0.00', credit: '$0', margin: '$0', free: '$0', profit: '$0', leverage: '1:100', currency: 'USD', status: 'Closed' },
  ];
  return (
    <AdminLayout title="Book Management">
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div><h1 style={{ fontSize: 24, fontWeight: 800 }}>Book Management</h1><p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 4 }}>Manage all MT5 trading books/accounts</p></div>
        <div style={{ display: 'flex', gap: 12 }}>
          <input type="text" className="input-field" placeholder="🔍 Search by account or user..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: 280 }} />
          <button className="btn-primary">+ Create Account</button>
        </div>
      </div>
      <div className="glass-card" style={{ padding: 0 }}>
        <div className="table-container" style={{ border: 'none' }}>
          <table>
            <thead><tr><th>Account</th><th>User</th><th>Type</th><th>Balance</th><th>Equity</th><th>Credit</th><th>Margin</th><th>Free Margin</th><th>Profit</th><th>Leverage</th><th>Status</th></tr></thead>
            <tbody>
              {books.filter(b => b.account.includes(search) || b.user.toLowerCase().includes(search.toLowerCase())).map(b => (
                <tr key={b.id}>
                  <td style={{ fontWeight: 700 }}>{b.account}</td>
                  <td>{b.user}</td>
                  <td>{b.type}</td>
                  <td style={{ fontWeight: 600 }}>{b.balance}</td>
                  <td>{b.equity}</td>
                  <td>{b.credit}</td>
                  <td>{b.margin}</td>
                  <td>{b.free}</td>
                  <td style={{ color: b.profit.startsWith('+') ? 'var(--accent-green)' : 'var(--accent-red)', fontWeight: 600 }}>{b.profit}</td>
                  <td>{b.leverage}</td>
                  <td><span className={`badge ${b.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>{b.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
