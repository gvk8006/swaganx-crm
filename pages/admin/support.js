import AdminLayout from '@/components/AdminLayout';
import { useState } from 'react';

export default function AdminSupportPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [reply, setReply] = useState('');

  const tickets = [
    { id: 'TKT-4501', user: 'Sarah Kim', category: 'Account Issue', subject: 'Cannot verify email', status: 'Open', priority: 'Medium', date: '2026-04-02 15:30', messages: [
      { from: 'Sarah Kim', text: 'I have been trying to verify my email but I never receive the verification link. Please help.', time: '2026-04-02 15:30' },
    ]},
    { id: 'TKT-4500', user: 'John Thompson', category: 'Deposit Issue', subject: 'Bank transfer not credited', status: 'Open', priority: 'High', date: '2026-04-02 14:20', messages: [
      { from: 'John Thompson', text: 'I made a bank transfer of $5,000 yesterday but it has not been credited to my account yet. Transaction ID: REF-88234', time: '2026-04-02 14:20' },
    ]},
    { id: 'TKT-4498', user: 'Ahmed Hassan', category: 'Trading Issue', subject: 'Platform latency during news events', status: 'In Progress', priority: 'Medium', date: '2026-04-02 10:15', messages: [
      { from: 'Ahmed Hassan', text: 'I experienced significant slippage during NFP release. My order was filled 40 pips away from my requested price.', time: '2026-04-02 10:15' },
      { from: 'Support', text: 'Thank you for reporting this. We are investigating the execution quality during high-volatility events. We will get back to you shortly.', time: '2026-04-02 11:00' },
    ]},
    { id: 'TKT-4495', user: 'Maria Garcia', category: 'Withdrawal Issue', subject: 'Withdrawal pending for 3 days', status: 'Open', priority: 'High', date: '2026-04-01 09:30', messages: [
      { from: 'Maria Garcia', text: 'My withdrawal request of $5,000 has been pending for 3 days. The estimated processing time was 24 hours. Please expedite.', time: '2026-04-01 09:30' },
    ]},
    { id: 'TKT-4490', user: 'Emma Wilson', category: 'General Inquiry', subject: 'Question about IB commission levels', status: 'Resolved', priority: 'Low', date: '2026-03-30 16:45', messages: [
      { from: 'Emma Wilson', text: 'Could you explain how the IB commission levels work? When do I get promoted to the next level?', time: '2026-03-30 16:45' },
      { from: 'Support', text: 'You level up based on total lots traded by your referrals. Standard (0-20 lots) → Bronze (20-100) → Silver (100-500) → Gold (500-2000) → Platinum (2000+). Your current level is Platinum with 4,817 lots. Commission increases at each level.', time: '2026-03-30 17:30' },
      { from: 'Emma Wilson', text: 'Thank you for the detailed explanation!', time: '2026-03-30 17:45' },
    ]},
  ];

  const filteredTickets = tickets.filter(t => activeTab === 'all' || t.status.toLowerCase().replace(' ', '-') === activeTab);

  const getPriorityBadge = (p) => {
    switch(p) {
      case 'High': return 'badge-danger';
      case 'Medium': return 'badge-pending';
      default: return 'badge-info';
    }
  };

  const getStatusBadge = (s) => {
    switch(s) {
      case 'Open': return 'badge-danger';
      case 'In Progress': return 'badge-pending';
      default: return 'badge-success';
    }
  };

  return (
    <AdminLayout title="Support Tickets">
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800 }}>Support Tickets</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 4 }}>Manage user support requests</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total Tickets', value: tickets.length },
          { label: 'Open', value: tickets.filter(t => t.status === 'Open').length, color: 'var(--accent-red)' },
          { label: 'In Progress', value: tickets.filter(t => t.status === 'In Progress').length, color: 'var(--accent-orange)' },
          { label: 'Resolved', value: tickets.filter(t => t.status === 'Resolved').length, color: 'var(--accent-green)' },
        ].map(s => (
          <div key={s.label} className="glass-card" style={{ padding: 20 }}>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 24, borderBottom: '1px solid var(--border-color)' }}>
        {['all', 'open', 'in-progress', 'resolved'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            padding: '12px 20px', background: 'none', border: 'none',
            borderBottom: activeTab === tab ? '2px solid var(--accent-blue)' : '2px solid transparent',
            color: activeTab === tab ? 'var(--accent-blue)' : 'var(--text-muted)',
            fontWeight: 600, fontSize: 14, cursor: 'pointer', textTransform: 'capitalize'
          }}>{tab === 'in-progress' ? 'In Progress' : tab}</button>
        ))}
      </div>

      {/* Tickets */}
      {!selectedTicket ? (
        <div className="glass-card" style={{ padding: 0 }}>
          <div className="table-container" style={{ border: 'none' }}>
            <table>
              <thead><tr><th>ID</th><th>User</th><th>Category</th><th>Subject</th><th>Priority</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
              <tbody>
                {filteredTickets.map(t => (
                  <tr key={t.id}>
                    <td style={{ fontWeight: 600 }}>{t.id}</td>
                    <td>{t.user}</td>
                    <td style={{ fontSize: 13 }}>{t.category}</td>
                    <td>{t.subject}</td>
                    <td><span className={`badge ${getPriorityBadge(t.priority)}`}>{t.priority}</span></td>
                    <td><span className={`badge ${getStatusBadge(t.status)}`}>{t.status}</span></td>
                    <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>{t.date}</td>
                    <td>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button className="btn-primary" style={{ padding: '4px 10px', fontSize: 11 }} onClick={() => setSelectedTicket(t)}>View</button>
                        {t.status === 'Open' && <button className="btn-success" style={{ padding: '4px 10px', fontSize: 11 }}>Take</button>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="glass-card" style={{ padding: 24 }}>
          <button onClick={() => setSelectedTicket(null)} style={{ background: 'none', border: 'none', color: 'var(--accent-blue)', cursor: 'pointer', fontSize: 14, marginBottom: 16, padding: 0 }}>← Back to tickets</button>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700 }}>{selectedTicket.subject}</h3>
              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{selectedTicket.id}</span>
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>·</span>
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{selectedTicket.user}</span>
                <span className={`badge ${getPriorityBadge(selectedTicket.priority)}`}>{selectedTicket.priority}</span>
                <span className={`badge ${getStatusBadge(selectedTicket.status)}`}>{selectedTicket.status}</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn-success" style={{ padding: '6px 14px', fontSize: 12 }}>Mark Resolved</button>
              <button className="btn-danger" style={{ padding: '6px 14px', fontSize: 12 }}>Close</button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24, maxHeight: 400, overflowY: 'auto', padding: 16, background: 'var(--bg-input)', borderRadius: 12 }}>
            {selectedTicket.messages.map((msg, i) => (
              <div key={i} style={{
                padding: 14, borderRadius: 8,
                background: msg.from === 'Support' ? 'rgba(59, 130, 246, 0.1)' : 'var(--bg-card)',
                borderLeft: msg.from === 'Support' ? '3px solid var(--accent-blue)' : '3px solid var(--border-color)',
                alignSelf: msg.from === 'Support' ? 'flex-start' : 'flex-end',
                maxWidth: '80%'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontWeight: 600, fontSize: 13 }}>{msg.from}</span>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{msg.time}</span>
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{msg.text}</p>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <textarea className="input-field" rows={3} placeholder="Type your reply..." value={reply} onChange={e => setReply(e.target.value)} style={{ flex: 1 }}></textarea>
            <button className="btn-primary" style={{ alignSelf: 'flex-end', padding: '12px 24px' }}>Send Reply</button>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
