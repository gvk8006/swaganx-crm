import AdminLayout from '@/components/AdminLayout';
import { useState } from 'react';
export default function AdminCryptoPage() {
  const [editing, setEditing] = useState(null);
  const wallets = [
    { network: 'USDT (TRC20)', address: 'TJxR4fBn3k8p2mLq9vWdFh8cN7rGzYt6k', status: 'Active', minDeposit: '$50', processingTime: '10-60 min' },
    { network: 'USDT (ERC20)', address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F', status: 'Active', minDeposit: '$50', processingTime: '5-30 min' },
    { network: 'BTC', address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', status: 'Active', minDeposit: '$100', processingTime: '30-120 min' },
    { network: 'ETH', address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F', status: 'Active', minDeposit: '$50', processingTime: '5-30 min' },
    { network: 'BNB (BEP20)', address: 'bnb1grpf0955h0ykzq3ar5nmfvfu4g4r6x0lq9p0gf', status: 'Inactive', minDeposit: '$50', processingTime: '5-30 min' },
    { network: 'LTC', address: 'ltc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', status: 'Active', minDeposit: '$25', processingTime: '15-60 min' },
    { network: 'TRX', address: 'TJxR4fBn3k8p2mLq9vWdFh8cN7rGzYt6k', status: 'Active', minDeposit: '$10', processingTime: '3-10 min' },
  ];
  return (
    <AdminLayout title="Crypto Settings">
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div><h1 style={{ fontSize: 24, fontWeight: 800 }}>Crypto Settings</h1><p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 4 }}>Manage cryptocurrency wallet addresses for deposits & withdrawals</p></div>
        <button className="btn-primary">+ Add Wallet</button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {wallets.map((w, i) => (
          <div key={i} className="glass-card" style={{ padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--bg-input)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
                {w.network.includes('BTC') ? '₿' : w.network.includes('ETH') || w.network.includes('ERC') ? '⟠' : w.network.includes('TRC') || w.network.includes('TRX') ? '🔷' : w.network.includes('BNB') ? '🔶' : 'Ⓛ'}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{w.network}</div>
                <div style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{w.address.substring(0, 20)}...{w.address.substring(w.address.length - 8)}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>Min: {w.minDeposit} · Processing: {w.processingTime}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span className={`badge ${w.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>{w.status}</span>
              <button className="btn-secondary" style={{ padding: '6px 14px', fontSize: 12 }}>Edit</button>
              <button className={w.status === 'Active' ? 'btn-danger' : 'btn-success'} style={{ padding: '6px 14px', fontSize: 12 }}>{w.status === 'Active' ? 'Disable' : 'Enable'}</button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
