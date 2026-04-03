import Layout from '@/components/Layout';
import { useState } from 'react';

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState('new');
  const [ticketForm, setTicketForm] = useState({ category: 'General Inquiry', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [tickets, setTickets] = useState([]);

  const faqs = [
    { q: 'How long does a deposit take?', a: 'Bank transfers typically process within 1-2 business days. Crypto deposits are usually confirmed within 10-60 minutes depending on network congestion.' },
    { q: 'How do I withdraw funds?', a: 'Navigate to Wallet → Withdraw, select your preferred method, enter the amount and wallet address, and submit. Processing takes up to 24 hours.' },
    { q: 'What is the minimum deposit?', a: 'The minimum deposit varies by payment method. Bank transfers: $100, Crypto: $50, Credit Card: $50.' },
    { q: 'How do I become an IB?', a: 'Simply go to the IB section in your dashboard. Your unique referral link is already generated. Share it to start earning commissions on your referrals\' trades.' },
    { q: 'How do I enable two-factor authentication?', a: 'Go to Profile → Security → Enable 2FA. You\'ll need an authenticator app like Google Authenticator or Authy.' },
    { q: 'What leverage options are available?', a: 'We offer leverage from 1:1 up to 1:1000, depending on your account type and regulatory jurisdiction.' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTicket = { ...ticketForm, id: `TKT-${Date.now()}`, status: 'Open', date: new Date().toISOString().split('T')[0] };
    setTickets([newTicket, ...tickets]);
    setSubmitted(true);
    setTicketForm({ category: 'General Inquiry', subject: '', message: '' });
    setActiveTab('tickets');
    setTimeout(() => setSubmitted(false), 3000);
  };

  const [expandedFaq, setExpandedFaq] = useState(null);

  return (
    <Layout title="Support">
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800 }}>Support</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 4 }}>Get help with your account and trading</p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 24, borderBottom: '1px solid var(--border-color)' }}>
        {[
          { key: 'new', label: 'New Ticket' },
          { key: 'tickets', label: `My Tickets (${tickets.length})` },
          { key: 'faq', label: 'FAQs' },
        ].map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
            padding: '12px 20px', background: 'none', border: 'none',
            borderBottom: activeTab === tab.key ? '2px solid var(--accent-blue)' : '2px solid transparent',
            color: activeTab === tab.key ? 'var(--accent-blue)' : 'var(--text-muted)',
            fontWeight: 600, fontSize: 14, cursor: 'pointer'
          }}>{tab.label}</button>
        ))}
      </div>

      {activeTab === 'new' && (
        <div className="glass-card" style={{ padding: 24 }}>
          {submitted && (
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: 8, padding: 16, marginBottom: 24 }}>
              <span style={{ color: 'var(--accent-green)', fontWeight: 600 }}>✓ Ticket submitted successfully! We&apos;ll respond within 24 hours.</span>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Category</label>
              <select className="input-field" value={ticketForm.category} onChange={e => setTicketForm({ ...ticketForm, category: e.target.value })}>
                <option>General Inquiry</option><option>Deposit Issue</option><option>Withdrawal Issue</option><option>Trading Issue</option><option>Account Issue</option><option>Technical Problem</option>
              </select>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Subject</label>
              <input type="text" className="input-field" placeholder="Brief description of your issue" required
                value={ticketForm.subject} onChange={e => setTicketForm({ ...ticketForm, subject: e.target.value })} />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Message</label>
              <textarea className="input-field" rows={6} placeholder="Describe your issue in detail..." required
                value={ticketForm.message} onChange={e => setTicketForm({ ...ticketForm, message: e.target.value })}></textarea>
            </div>
            <button type="submit" className="btn-primary" style={{ padding: '12px 24px' }}>Submit Ticket</button>
          </form>
        </div>
      )}

      {activeTab === 'tickets' && (
        <div className="glass-card" style={{ padding: 24 }}>
          {tickets.length > 0 ? (
            <div className="table-container">
              <table>
                <thead><tr><th>ID</th><th>Category</th><th>Subject</th><th>Status</th><th>Date</th></tr></thead>
                <tbody>
                  {tickets.map(t => (
                    <tr key={t.id}>
                      <td style={{ fontWeight: 600 }}>{t.id}</td>
                      <td style={{ fontSize: 13 }}>{t.category}</td>
                      <td>{t.subject}</td>
                      <td><span className="badge badge-pending">{t.status}</span></td>
                      <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>{t.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ padding: 60, textAlign: 'center' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
              <p style={{ color: 'var(--text-muted)' }}>No support tickets yet</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'faq' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {faqs.map((faq, i) => (
            <div key={i} className="glass-card" style={{ overflow: 'hidden' }}>
              <button onClick={() => setExpandedFaq(expandedFaq === i ? null : i)} style={{
                width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '18px 20px', background: 'none', border: 'none', color: 'var(--text-primary)',
                fontWeight: 600, fontSize: 15, cursor: 'pointer', textAlign: 'left'
              }}>
                {faq.q}
                <span style={{ color: 'var(--text-muted)', fontSize: 18 }}>{expandedFaq === i ? '−' : '+'}</span>
              </button>
              {expandedFaq === i && (
                <div style={{ padding: '0 20px 18px', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}
