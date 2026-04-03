import AdminLayout from '@/components/AdminLayout';
import { useState } from 'react';
export default function AdminAccountTypesPage() {
  const [showModal, setShowModal] = useState(false);
  const [types, setTypes] = useState([
    { id: 1, name: 'Standard', group: 'swaganx\\real\\standard', leverage: '1:100', spread: '1.5 pips', commission: '$7/lot', minDeposit: '$100', currency: 'USD', accounts: 234, status: 'Active' },
    { id: 2, name: 'Plus', group: 'swaganx\\real\\plus', leverage: '1:100', spread: '1.0 pips', commission: '$5/lot', minDeposit: '$500', currency: 'USD', accounts: 156, status: 'Active' },
    { id: 3, name: 'Pro', group: 'swaganx\\real\\pro', leverage: '1:500', spread: '0.5 pips', commission: '$3/lot', minDeposit: '$1,000', currency: 'USD', accounts: 89, status: 'Active' },
    { id: 4, name: 'ECN', group: 'swaganx\\real\\ecn', leverage: '1:200', spread: 'Raw', commission: '$2+spread', minDeposit: '$5,000', currency: 'USD', accounts: 45, status: 'Active' },
    { id: 5, name: 'Demo', group: 'swaganx\\demo', leverage: '1:100', spread: '1.5 pips', commission: '$0', minDeposit: '$0', currency: 'USD', accounts: 567, status: 'Active' },
    { id: 6, name: 'Contest', group: 'swaganx\\contest', leverage: '1:100', spread: '1.0 pips', commission: '$0', minDeposit: '$0', currency: 'USD', accounts: 0, status: 'Inactive' },
  ]);
  return (
    <AdminLayout title="Account Types">
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div><h1 style={{ fontSize: 24, fontWeight: 800 }}>Account Types</h1><p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 4 }}>Configure MT5 account groups and their parameters</p></div>
        <button className="btn-primary" onClick={() => setShowModal(true)}>+ Create Account Type</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 16 }}>
        {types.map(t => (
          <div key={t.id} className="glass-card" style={{ padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div><h3 style={{ fontSize: 18, fontWeight: 700 }}>{t.name}</h3><p style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'monospace' }}>{t.group}</p></div>
              <span className={`badge ${t.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>{t.status}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
              {[
                { label: 'Leverage', value: t.leverage },
                { label: 'Spread', value: t.spread },
                { label: 'Commission', value: t.commission },
                { label: 'Min Deposit', value: t.minDeposit },
              ].map(f => (
                <div key={f.label}><div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{f.label}</div><div style={{ fontWeight: 600, fontSize: 14 }}>{f.value}</div></div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTop: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{t.accounts} active accounts</span>
              <button className="btn-secondary" style={{ padding: '6px 14px', fontSize: 12 }}>Edit</button>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200 }}>
          <div className="glass-card animate-fade-in" style={{ padding: 32, width: 500, maxWidth: '90vw' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}><h3 style={{ fontSize: 18, fontWeight: 700 }}>Create Account Type</h3><button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 20, cursor: 'pointer' }}>✕</button></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div><label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Account Name</label><input className="input-field" placeholder="e.g. Premium" /></div>
              <div><label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Group Path</label><input className="input-field" placeholder="swaganx\\real\\premium" /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div><label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Leverage</label><select className="input-field"><option>1:100</option><option>1:200</option><option>1:500</option><option>1:1000</option></select></div>
                <div><label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Currency</label><select className="input-field"><option>USD</option><option>EUR</option><option>GBP</option></select></div>
              </div>
              <div style={{ display: 'flex', gap: 12 }}><button className="btn-secondary" onClick={() => setShowModal(false)} style={{ flex: 1, justifyContent: 'center' }}>Cancel</button><button className="btn-primary" onClick={() => setShowModal(false)} style={{ flex: 1, justifyContent: 'center' }}>Create</button></div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
