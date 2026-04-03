import AdminLayout from '@/components/AdminLayout';
import { useState } from 'react';
export default function AdminPropFirmPage() {
  const [challenges, setChallenges] = useState([
    { id: 1, name: 'Challenge 10K', price: '$99', target: '8%', maxDD: '5%', duration: 'Unlimited', enrolled: 45, passed: 12, funded: 8, status: 'Active' },
    { id: 2, name: 'Challenge 25K', price: '$199', target: '8%', maxDD: '5%', duration: 'Unlimited', enrolled: 32, passed: 9, funded: 6, status: 'Active' },
    { id: 3, name: 'Challenge 50K', price: '$299', target: '6%', maxDD: '4%', duration: 'Unlimited', enrolled: 23, passed: 8, funded: 5, status: 'Active' },
    { id: 4, name: 'Challenge 100K', price: '$499', target: '5%', maxDD: '4%', duration: 'Unlimited', enrolled: 18, passed: 5, funded: 3, status: 'Active' },
    { id: 5, name: 'Challenge 200K', price: '$899', target: '5%', maxDD: '3%', duration: 'Unlimited', enrolled: 8, passed: 2, funded: 1, status: 'Active' },
  ]);
  return (
    <AdminLayout title="Prop Firm Challenges">
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div><h1 style={{ fontSize: 24, fontWeight: 800 }}>Prop Firm Challenges</h1><p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 4 }}>Manage prop trading challenge tiers</p></div>
        <button className="btn-primary">+ Create Challenge</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, marginBottom: 24 }}>
        <div className="glass-card" style={{ padding: 20 }}><div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>Total Enrolled</div><div style={{ fontSize: 22, fontWeight: 800 }}>{challenges.reduce((s,c)=>s+c.enrolled,0)}</div></div>
        <div className="glass-card" style={{ padding: 20 }}><div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>Passed</div><div style={{ fontSize: 22, fontWeight: 800, color: 'var(--accent-green)' }}>{challenges.reduce((s,c)=>s+c.passed,0)}</div></div>
        <div className="glass-card" style={{ padding: 20 }}><div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>Funded</div><div style={{ fontSize: 22, fontWeight: 800, color: 'var(--accent-blue)' }}>{challenges.reduce((s,c)=>s+c.funded,0)}</div></div>
        <div className="glass-card" style={{ padding: 20 }}><div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>Revenue</div><div style={{ fontSize: 22, fontWeight: 800, color: 'var(--accent-green)' }}>${(45*99+32*199+23*299+18*499+8*899).toLocaleString()}</div></div>
        <div className="glass-card" style={{ padding: 20 }}><div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>Pass Rate</div><div style={{ fontSize: 22, fontWeight: 800 }}>{Math.round(challenges.reduce((s,c)=>s+c.passed,0)/challenges.reduce((s,c)=>s+c.enrolled,0)*100)}%</div></div>
      </div>
      <div className="glass-card" style={{ padding: 0 }}>
        <div className="table-container" style={{ border: 'none' }}>
          <table>
            <thead><tr><th>Challenge</th><th>Price</th><th>Profit Target</th><th>Max Drawdown</th><th>Duration</th><th>Enrolled</th><th>Passed</th><th>Funded</th><th>Status</th></tr></thead>
            <tbody>
              {challenges.map(c => (
                <tr key={c.id}>
                  <td style={{ fontWeight: 700 }}>{c.name}</td><td style={{ fontWeight: 600 }}>{c.price}</td><td>{c.target}</td><td>{c.maxDD}</td>
                  <td>{c.duration}</td><td>{c.enrolled}</td><td style={{ color: 'var(--accent-green)' }}>{c.passed}</td>
                  <td style={{ color: 'var(--accent-blue)' }}>{c.funded}</td>
                  <td><span className="badge badge-success">{c.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
