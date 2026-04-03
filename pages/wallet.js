import Layout from '@/components/Layout';
import { useState } from 'react';

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState('transactions');
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);

  const transactions = [
    { id: 'TXN-78234', type: 'Deposit', amount: '+$5,000.00', bonus: '$0.00', total: '$5,000.00', method: 'Bank Transfer', status: 'Completed', date: '2026-03-28 14:30' },
    { id: 'TXN-78190', type: 'Transfer', amount: '-$3,000.00', bonus: '$0.00', total: '$3,000.00', method: 'Internal', status: 'Completed', date: '2026-03-27 09:15' },
    { id: 'TXN-78145', type: 'Withdrawal', amount: '-$2,200.00', bonus: '$0.00', total: '$2,200.00', method: 'USDT (TRC20)', status: 'Completed', date: '2026-03-25 16:42' },
    { id: 'TXN-78098', type: 'Deposit', amount: '+$10,000.00', bonus: '$500.00', total: '$10,500.00', method: 'Crypto (BTC)', status: 'Completed', date: '2026-03-22 11:20' },
    { id: 'TXN-78050', type: 'Transfer', amount: '-$1,500.00', bonus: '$0.00', total: '$1,500.00', method: 'Internal', status: 'Completed', date: '2026-03-20 08:55' },
  ];

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Completed': return 'badge-success';
      case 'Pending': return 'badge-pending';
      case 'Rejected': return 'badge-danger';
      default: return 'badge-info';
    }
  };

  return (
    <Layout title="Wallet">
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800 }}>Wallet</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 4 }}>Manage your funds and transactions</p>
      </div>

      {/* Balance Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Available Balance', value: '$7,800.00', icon: '💰' },
          { label: 'Pending Deposits', value: '$0.00', icon: '📥' },
          { label: 'Pending Withdrawals', value: '$0.00', icon: '📤' },
          { label: 'Total Deposited', value: '$15,000.00', icon: '📊' },
        ].map(card => (
          <div key={card.label} className="glass-card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{card.label}</span>
              <span style={{ fontSize: 20 }}>{card.icon}</span>
            </div>
            <div style={{ fontSize: 24, fontWeight: 800 }}>{card.value}</div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        <button className="btn-primary" onClick={() => setShowDeposit(true)} style={{ padding: '12px 24px' }}>📥 Deposit</button>
        <button className="btn-success" onClick={() => {}}>🔄 Transfer</button>
        <button className="btn-secondary" onClick={() => setShowWithdraw(true)} style={{ padding: '12px 24px' }}>📤 Withdraw</button>
      </div>

      {/* Transactions */}
      <div className="glass-card" style={{ padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>Transaction History</h3>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr><th>ID</th><th>Type</th><th>Amount</th><th>Bonus</th><th>Total</th><th>Method</th><th>Status</th><th>Date</th></tr>
            </thead>
            <tbody>
              {transactions.map(tx => (
                <tr key={tx.id}>
                  <td style={{ fontWeight: 600 }}>{tx.id}</td>
                  <td><span className={`badge ${tx.type === 'Deposit' ? 'badge-success' : tx.type === 'Withdrawal' ? 'badge-danger' : 'badge-info'}`}>{tx.type}</span></td>
                  <td style={{ color: tx.amount.startsWith('+') ? 'var(--accent-green)' : 'var(--accent-red)', fontWeight: 600 }}>{tx.amount}</td>
                  <td>{tx.bonus}</td>
                  <td>{tx.total}</td>
                  <td style={{ fontSize: 13 }}>{tx.method}</td>
                  <td><span className={`badge ${getStatusBadge(tx.status)}`}>{tx.status}</span></td>
                  <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deposit Modal */}
      {showDeposit && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200 }}>
          <div className="glass-card animate-fade-in" style={{ padding: 32, width: 480, maxWidth: '90vw' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700 }}>📥 Deposit Funds</h3>
              <button onClick={() => setShowDeposit(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 20, cursor: 'pointer' }}>✕</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Payment Method</label>
                <select className="input-field"><option>Bank Transfer</option><option>Credit Card</option><option>Crypto (USDT TRC20)</option><option>Crypto (BTC)</option><option>Crypto (ETH)</option></select>
              </div>
              <div>
                <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Amount (USD)</label>
                <input type="number" className="input-field" placeholder="Enter amount" />
              </div>
              <div>
                <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Account to Fund</label>
                <select className="input-field"><option>Real Plus #77730631</option><option>Real Pro #68175002</option></select>
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <button className="btn-secondary" onClick={() => setShowDeposit(false)} style={{ flex: 1, justifyContent: 'center' }}>Cancel</button>
                <button className="btn-primary" onClick={() => setShowDeposit(false)} style={{ flex: 1, justifyContent: 'center' }}>Submit Deposit</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdraw && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200 }}>
          <div className="glass-card animate-fade-in" style={{ padding: 32, width: 480, maxWidth: '90vw' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700 }}>📤 Withdraw Funds</h3>
              <button onClick={() => setShowWithdraw(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 20, cursor: 'pointer' }}>✕</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Withdrawal Method</label>
                <select className="input-field"><option>USDT (TRC20)</option><option>USDT (ERC20)</option><option>BTC</option><option>ETH</option><option>Bank Transfer</option></select>
              </div>
              <div>
                <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Amount (USD)</label>
                <input type="number" className="input-field" placeholder="Min $10" />
              </div>
              <div>
                <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Wallet Address / Bank Details</label>
                <textarea className="input-field" rows={3} placeholder="Enter wallet address or bank details"></textarea>
              </div>
              <div style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 12, fontSize: 13, color: 'var(--text-muted)' }}>
                ⏱ Processing time: Within 24 hours<br />
                💰 Minimum withdrawal: $10
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <button className="btn-secondary" onClick={() => setShowWithdraw(false)} style={{ flex: 1, justifyContent: 'center' }}>Cancel</button>
                <button className="btn-primary" onClick={() => setShowWithdraw(false)} style={{ flex: 1, justifyContent: 'center' }}>Submit Withdrawal</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
