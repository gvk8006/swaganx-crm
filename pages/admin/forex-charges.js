import AdminLayout from '@/components/AdminLayout';
import { useState } from 'react';
export default function AdminForexChargesPage() {
  const [saved, setSaved] = useState(false);
  const [charges, setCharges] = useState([
    { id: 1, group: 'Real Standard', commission: '$7/lot', spread: '1.5 pips', swapLong: '-0.50', swapShort: '-0.30', marginCall: '100%', stopOut: '50%' },
    { id: 2, group: 'Real Plus', commission: '$5/lot', spread: '1.0 pips', swapLong: '-0.40', swapShort: '-0.20', marginCall: '100%', stopOut: '50%' },
    { id: 3, group: 'Real Pro', commission: '$3/lot', spread: '0.5 pips', swapLong: '-0.30', swapShort: '-0.10', marginCall: '80%', stopOut: '40%' },
    { id: 4, group: 'Real ECN', commission: '$2/lot + spread', spread: 'Raw', swapLong: '-0.20', swapShort: '-0.10', marginCall: '80%', stopOut: '30%' },
    { id: 5, group: 'Demo', commission: '$0/lot', spread: '1.5 pips', swapLong: '-0.50', swapShort: '-0.30', marginCall: '100%', stopOut: '50%' },
  ]);
  return (
    <AdminLayout title="Forex Charges">
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div><h1 style={{ fontSize: 24, fontWeight: 800 }}>Forex Charges</h1><p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 4 }}>Configure commission, spread, swap, and margin settings per account group</p></div>
        <button className="btn-primary" onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}>Save All Changes</button>
      </div>
      {saved && <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 8, padding: 16, marginBottom: 24 }}><span style={{ color: 'var(--accent-green)', fontWeight: 600 }}>✓ Charges saved successfully!</span></div>}
      <div className="glass-card" style={{ padding: 0 }}>
        <div className="table-container" style={{ border: 'none' }}>
          <table>
            <thead><tr><th>Account Group</th><th>Commission</th><th>Spread</th><th>Swap Long</th><th>Swap Short</th><th>Margin Call</th><th>Stop Out</th></tr></thead>
            <tbody>
              {charges.map(c => (
                <tr key={c.id}>
                  <td style={{ fontWeight: 700 }}>{c.group}</td>
                  <td><input className="input-field" defaultValue={c.commission} style={{ width: 140, padding: '6px 10px', fontSize: 13 }} /></td>
                  <td><input className="input-field" defaultValue={c.spread} style={{ width: 140, padding: '6px 10px', fontSize: 13 }} /></td>
                  <td><input className="input-field" defaultValue={c.swapLong} style={{ width: 100, padding: '6px 10px', fontSize: 13 }} /></td>
                  <td><input className="input-field" defaultValue={c.swapShort} style={{ width: 100, padding: '6px 10px', fontSize: 13 }} /></td>
                  <td><input className="input-field" defaultValue={c.marginCall} style={{ width: 100, padding: '6px 10px', fontSize: 13 }} /></td>
                  <td><input className="input-field" defaultValue={c.stopOut} style={{ width: 100, padding: '6px 10px', fontSize: 13 }} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
