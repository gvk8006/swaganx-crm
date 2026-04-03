import AdminLayout from '@/components/AdminLayout';
import { useState } from 'react';

export default function AdminBonusPage() {
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [showApprove, setShowApprove] = useState(null);
  const [bonusList, setBonusList] = useState([
    { id: 'BNS-001', user: 'Maria Garcia', email: 'maria@example.com', type: 'Deposit Bonus', amount: 500, reqLots: 5, compLots: 3.2, status: 'Active', date: '2026-04-02' },
    { id: 'BNS-002', user: 'John Thompson', email: 'john@example.com', type: 'Welcome Bonus', amount: 100, reqLots: 2, compLots: 0, status: 'Active', date: '2026-04-02' },
    { id: 'BNS-003', user: 'Ahmed Hassan', email: 'ahmed@example.com', type: 'Deposit Bonus', amount: 1000, reqLots: 10, compLots: 10, status: 'Credited', date: '2026-04-01' },
    { id: 'BNS-004', user: 'Emma Wilson', email: 'emma@example.com', type: 'Loyalty Bonus', amount: 250, reqLots: 3, compLots: 1.5, status: 'Active', date: '2026-04-01' },
    { id: 'BNS-005', user: 'Demo User', email: 'demo@demo.com', type: 'Trading Bonus', amount: 200, reqLots: 8, compLots: 8, status: 'Credited', date: '2026-03-28' },
    { id: 'BNS-006', user: 'Li Wei', email: 'liwei@example.com', type: 'Deposit Bonus', amount: 300, reqLots: 3, compLots: 0, status: 'Expired', date: '2026-03-15' },
    { id: 'BNS-007', user: 'Sarah Kim', email: 'sarah@example.com', type: 'Welcome Bonus', amount: 100, reqLots: 2, compLots: 0, status: 'Cancelled', date: '2026-03-10' },
    { id: 'BNS-008', user: 'Raj Patel', email: 'raj@example.com', type: 'Deposit Bonus', amount: 750, reqLots: 7.5, compLots: 2.1, status: 'Active', date: '2026-04-03' },
  ]);

  const filtered = bonusList.filter(b => filter === 'all' || b.status.toLowerCase() === filter);
  const totalDistributed = bonusList.filter(b => b.status !== 'Cancelled' && b.status !== 'Expired').reduce((s, b) => s + b.amount, 0);
  const activeCount = bonusList.filter(b => b.status === 'Active').length;

  const handleApprove = (id) => {
    setBonusList(prev => prev.map(b => b.id === id ? { ...b, status: 'Credited' } : b));
    setShowApprove(null);
  };

  const handleCancel = (id) => {
    setBonusList(prev => prev.map(b => b.id === id ? { ...b, status: 'Cancelled' } : b));
  };

  return (
    <AdminLayout title="Bonus Management">
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800 }}>Bonus Management</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 4 }}>Manage deposit, loyalty and trading bonuses</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <select className="input-field" style={{ width: 150 }} value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="credited">Credited</option>
            <option value="expired">Expired</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button className="btn-primary" onClick={() => setShowModal(true)}>+ Create Bonus</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <div className="glass-card" style={{ padding: 20 }}>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Total Distributed</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent-green)' }}>${totalDistributed.toLocaleString()}</div>
        </div>
        <div className="glass-card" style={{ padding: 20 }}>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Active Bonuses</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent-blue)' }}>{activeCount}</div>
        </div>
        <div className="glass-card" style={{ padding: 20 }}>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Total Amount Pending</div>
          <div style={{ fontSize: 24, fontWeight: 800 }}>${bonusList.filter(b => b.status === 'Active').reduce((s, b) => s + b.amount, 0).toLocaleString()}</div>
        </div>
        <div className="glass-card" style={{ padding: 20 }}>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Expired/Cancelled</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent-red)' }}>{bonusList.filter(b => b.status === 'Expired' || b.status === 'Cancelled').length}</div>
        </div>
      </div>

      <div className="glass-card" style={{ padding: 0 }}>
        <div className="table-container" style={{ border: 'none' }}>
          <table>
            <thead>
              <tr>
                <th>Bonus ID</th><th>User</th><th>Type</th><th>Amount</th><th>Req. Lots</th><th>Comp. Lots</th><th>Progress</th><th>Status</th><th>Date</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(b => {
                const progress = b.reqLots > 0 ? Math.min((b.compLots / b.reqLots) * 100, 100) : 0;
                return (
                  <tr key={b.id}>
                    <td style={{ fontWeight: 600 }}>{b.id}</td>
                    <td>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{b.user}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{b.email}</div>
                    </td>
                    <td><span className="badge badge-info">{b.type}</span></td>
                    <td style={{ fontWeight: 700 }}>${b.amount}</td>
                    <td>{b.reqLots}</td>
                    <td>{b.compLots}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ flex: 1, height: 6, background: 'var(--bg-input)', borderRadius: 3, minWidth: 60 }}>
                          <div style={{ height: '100%', borderRadius: 3, background: progress >= 100 ? 'var(--accent-green)' : 'var(--accent-blue)', width: `${progress}%` }}></div>
                        </div>
                        <span style={{ fontSize: 12, color: 'var(--text-muted)', minWidth: 35 }}>{progress.toFixed(0)}%</span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${b.status === 'Active' ? 'badge-pending' : b.status === 'Credited' ? 'badge-success' : b.status === 'Expired' ? 'badge-danger' : 'badge-danger'}`}>{b.status}</span>
                    </td>
                    <td style={{ fontSize: 13, color: 'var(--text-muted)' }}>{b.date}</td>
                    <td>
                      {b.status === 'Active' && (
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button className="btn-success" style={{ padding: '4px 10px', fontSize: 11 }} onClick={() => setShowApprove(b.id)}>Approve</button>
                          <button className="btn-danger" style={{ padding: '4px 10px', fontSize: 11 }} onClick={() => handleCancel(b.id)}>Cancel</button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Bonus Modal */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200 }}>
          <div className="glass-card animate-fade-in" style={{ padding: 32, width: 480, maxWidth: '90vw' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700 }}>Create Bonus</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 20, cursor: 'pointer' }}>✕</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Select User</label>
                <select className="input-field"><option>Choose user...</option><option>Maria Garcia</option><option>John Thompson</option><option>Ahmed Hassan</option><option>Emma Wilson</option></select>
              </div>
              <div>
                <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Bonus Type</label>
                <select className="input-field"><option>Deposit Bonus</option><option>Welcome Bonus</option><option>Loyalty Bonus</option><option>Trading Bonus</option></select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Amount ($)</label>
                  <input type="number" className="input-field" placeholder="100" />
                </div>
                <div>
                  <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Required Lots</label>
                  <input type="number" className="input-field" placeholder="5" />
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button className="btn-secondary" onClick={() => setShowModal(false)} style={{ flex: 1, justifyContent: 'center' }}>Cancel</button>
                <button className="btn-primary" onClick={() => setShowModal(false)} style={{ flex: 1, justifyContent: 'center' }}>Create Bonus</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Approve Confirmation Modal */}
      {showApprove && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200 }}>
          <div className="glass-card animate-fade-in" style={{ padding: 32, width: 400, maxWidth: '90vw' }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Approve Bonus</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24 }}>Are you sure you want to approve this bonus? The funds will be credited to the user account.</p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn-secondary" onClick={() => setShowApprove(null)} style={{ flex: 1, justifyContent: 'center' }}>Cancel</button>
              <button className="btn-success" onClick={() => handleApprove(showApprove)} style={{ flex: 1, justifyContent: 'center' }}>Approve</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
