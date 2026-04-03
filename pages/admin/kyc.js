import AdminLayout from '@/components/AdminLayout';
import { useState } from 'react';

export default function AdminKYCPage() {
  const [activeTab, setActiveTab] = useState('pending');
  const [showApprove, setShowApprove] = useState(null);
  const [showReject, setShowReject] = useState(null);
  const [rejectReason, setRejectReason] = useState('');

  const initialKycs = [
    { id: 1, user: 'Sarah Kim', email: 'sarah@example.com', docType: 'Passport', submitted: '2026-04-02 14:30', status: 'pending', docId: 'P001' },
    { id: 2, user: 'Li Wei', email: 'liwei@example.com', docType: 'National ID', submitted: '2026-04-02 11:00', status: 'pending', docId: 'N002' },
    { id: 3, user: 'Raj Patel', email: 'raj@example.com', docType: 'Driving License', submitted: '2026-04-01 16:45', status: 'pending', docId: 'D003' },
    { id: 4, user: 'Alex Petrov', email: 'alex@example.com', docType: 'Proof of Address', submitted: '2026-04-01 09:20', status: 'pending', docId: 'A004' },
    { id: 5, user: 'Maria Garcia', email: 'maria@example.com', docType: 'Passport', submitted: '2026-03-30 10:00', status: 'approved', docId: 'P005' },
    { id: 6, user: 'John Thompson', email: 'john@example.com', docType: 'National ID', submitted: '2026-03-28 15:30', status: 'approved', docId: 'N006' },
    { id: 7, user: 'Ahmed Hassan', email: 'ahmed@example.com', docType: 'Passport', submitted: '2026-03-25 12:00', status: 'approved', docId: 'P007' },
    { id: 8, user: 'Emma Wilson', email: 'emma@example.com', docType: 'Driving License', submitted: '2026-03-22 08:45', status: 'approved', docId: 'D008' },
    { id: 9, user: 'Demo User', email: 'demo@demo.com', docType: 'Selfie', submitted: '2026-03-20 11:30', status: 'approved', docId: 'S009' },
    { id: 10, user: 'Sanjay Kumar', email: 'sanjay@example.com', docType: 'Passport', submitted: '2026-03-18 14:00', status: 'rejected', docId: 'P010' },
  ];

  const [kycs, setKycs] = useState(initialKycs);

  const pendingKycs = kycs.filter(k => k.status === 'pending');
  const allKycs = kycs;
  const displayKycs = activeTab === 'pending' ? pendingKycs : allKycs;
  const approvedCount = kycs.filter(k => k.status === 'approved').length;
  const rejectedCount = kycs.filter(k => k.status === 'rejected').length;

  const handleApprove = (id) => {
    setKycs(prev => prev.map(k => k.id === id ? { ...k, status: 'approved' } : k));
    setShowApprove(null);
  };

  const handleReject = (id) => {
    if (!rejectReason.trim()) return;
    setKycs(prev => prev.map(k => k.id === id ? { ...k, status: 'rejected' } : k));
    setShowReject(null);
    setRejectReason('');
  };

  const getDocIcon = (type) => {
    switch (type) {
      case 'Passport': return '🛂';
      case 'National ID': return '🪪';
      case 'Driving License': return '🚗';
      case 'Proof of Address': return '🏠';
      case 'Selfie': return '🤳';
      default: return '📄';
    }
  };

  return (
    <AdminLayout title="KYC Verification">
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800 }}>KYC Verification</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 4 }}>Review and process KYC verification requests</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <div className="glass-card" style={{ padding: 20 }}>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Pending Review</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent-orange)' }}>{pendingKycs.length}</div>
        </div>
        <div className="glass-card" style={{ padding: 20 }}>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Total Approved</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent-green)' }}>{approvedCount}</div>
        </div>
        <div className="glass-card" style={{ padding: 20 }}>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Total Rejected</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent-red)' }}>{rejectedCount}</div>
        </div>
        <div className="glass-card" style={{ padding: 20 }}>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Total Verified</div>
          <div style={{ fontSize: 24, fontWeight: 800 }}>{approvedCount + rejectedCount}</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: 'var(--bg-card)', borderRadius: 10, padding: 4, width: 'fit-content' }}>
        <button onClick={() => setActiveTab('pending')} style={{
          padding: '10px 24px', borderRadius: 8, fontWeight: 600, fontSize: 14,
          background: activeTab === 'pending' ? 'var(--accent-orange)' : 'transparent',
          color: activeTab === 'pending' ? 'white' : 'var(--text-secondary)',
          border: 'none', cursor: 'pointer', transition: 'var(--transition)'
        }}>
          Pending ({pendingKycs.length})
        </button>
        <button onClick={() => setActiveTab('all')} style={{
          padding: '10px 24px', borderRadius: 8, fontWeight: 600, fontSize: 14,
          background: activeTab === 'all' ? 'var(--accent-blue)' : 'transparent',
          color: activeTab === 'all' ? 'white' : 'var(--text-secondary)',
          border: 'none', cursor: 'pointer', transition: 'var(--transition)'
        }}>
          All ({kycs.length})
        </button>
      </div>

      <div className="glass-card" style={{ padding: 0 }}>
        <div className="table-container" style={{ border: 'none' }}>
          <table>
            <thead>
              <tr><th>User</th><th>Document Type</th><th>Doc ID</th><th>Submitted</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {displayKycs.map(kyc => (
                <tr key={kyc.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--bg-input)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, color: 'var(--text-secondary)' }}>
                        {kyc.user.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>{kyc.user}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{kyc.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 18 }}>{getDocIcon(kyc.docType)}</span>
                      {kyc.docType}
                    </span>
                  </td>
                  <td style={{ fontFamily: 'monospace', fontSize: 13, color: 'var(--text-muted)' }}>{kyc.docId}</td>
                  <td style={{ fontSize: 13, color: 'var(--text-muted)' }}>{kyc.submitted}</td>
                  <td>
                    <span className={`badge ${kyc.status === 'pending' ? 'badge-pending' : kyc.status === 'approved' ? 'badge-success' : 'badge-danger'}`}>
                      {kyc.status.charAt(0).toUpperCase() + kyc.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    {kyc.status === 'pending' && (
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button className="btn-success" style={{ padding: '4px 10px', fontSize: 11 }} onClick={() => setShowApprove(kyc.id)}>Approve</button>
                        <button className="btn-danger" style={{ padding: '4px 10px', fontSize: 11 }} onClick={() => setShowReject(kyc.id)}>Reject</button>
                      </div>
                    )}
                    {kyc.status === 'approved' && (
                      <button className="btn-secondary" style={{ padding: '4px 10px', fontSize: 11 }}>View</button>
                    )}
                    {kyc.status === 'rejected' && (
                      <button className="btn-secondary" style={{ padding: '4px 10px', fontSize: 11 }}>View</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {displayKycs.length === 0 && (
        <div className="glass-card" style={{ padding: 60, textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>No pending verifications</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>All KYC requests have been processed</p>
        </div>
      )}

      {/* Approve Confirmation Modal */}
      {showApprove && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200 }}>
          <div className="glass-card animate-fade-in" style={{ padding: 32, width: 420, maxWidth: '90vw' }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>✅ Approve KYC</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 6 }}>
              Approve KYC verification for <strong>{kycs.find(k => k.id === showApprove)?.user}</strong>?
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 24 }}>
              Document: {kycs.find(k => k.id === showApprove)?.docType} ({kycs.find(k => k.id === showApprove)?.docId})
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn-secondary" onClick={() => setShowApprove(null)} style={{ flex: 1, justifyContent: 'center' }}>Cancel</button>
              <button className="btn-success" onClick={() => handleApprove(showApprove)} style={{ flex: 1, justifyContent: 'center' }}>Approve</button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showReject && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200 }}>
          <div className="glass-card animate-fade-in" style={{ padding: 32, width: 420, maxWidth: '90vw' }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: 'var(--accent-red)' }}>❌ Reject KYC</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 16 }}>
              Reject KYC for <strong>{kycs.find(k => k.id === showReject)?.user}</strong>?
            </p>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Rejection Reason</label>
              <textarea className="input-field" rows={3} placeholder="Provide reason for rejection..." value={rejectReason} onChange={e => setRejectReason(e.target.value)}></textarea>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn-secondary" onClick={() => { setShowReject(null); setRejectReason(''); }} style={{ flex: 1, justifyContent: 'center' }}>Cancel</button>
              <button className="btn-danger" onClick={() => handleReject(showReject)} style={{ flex: 1, justifyContent: 'center' }} disabled={!rejectReason.trim()}>
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
