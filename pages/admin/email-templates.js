import AdminLayout from '@/components/AdminLayout';
import { useState } from 'react';
export default function AdminEmailTemplatesPage() {
  const [editing, setEditing] = useState(null);
  const templates = [
    { id: 1, name: 'Welcome Email', subject: 'Welcome to {{company}}!', trigger: 'On Registration', status: 'Active', lastModified: '2026-03-28' },
    { id: 2, name: 'Email Verification', subject: 'Verify your email — {{company}}', trigger: 'On Registration', status: 'Active', lastModified: '2026-03-20' },
    { id: 3, name: 'Deposit Confirmation', subject: 'Deposit confirmed — ${{amount}}', trigger: 'On Deposit', status: 'Active', lastModified: '2026-03-25' },
    { id: 4, name: 'Withdrawal Confirmation', subject: 'Withdrawal processed — ${{amount}}', trigger: 'On Withdrawal', status: 'Active', lastModified: '2026-03-25' },
    { id: 5, name: 'KYC Approved', subject: 'Your KYC has been verified ✅', trigger: 'On KYC Approval', status: 'Active', lastModified: '2026-03-15' },
    { id: 6, name: 'KYC Rejected', subject: 'KYC verification failed — action required', trigger: 'On KYC Rejection', status: 'Active', lastModified: '2026-03-15' },
    { id: 7, name: 'Password Reset', subject: 'Reset your {{company}} password', trigger: 'On Password Reset', status: 'Active', lastModified: '2026-03-10' },
    { id: 8, name: 'Account Suspended', subject: 'Your account has been suspended', trigger: 'On Suspension', status: 'Active', lastModified: '2026-02-28' },
    { id: 9, name: 'IB Commission Payment', subject: 'IB commission earned — ${{amount}}', trigger: 'On Commission', status: 'Draft', lastModified: '2026-03-30' },
    { id: 10, name: 'Weekly Report', subject: 'Your weekly trading report', trigger: 'Weekly Cron', status: 'Draft', lastModified: '2026-04-01' },
  ];
  return (
    <AdminLayout title="Email Templates">
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div><h1 style={{ fontSize: 24, fontWeight: 800 }}>Email Templates</h1><p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 4 }}>Manage automated email templates</p></div>
        <button className="btn-primary">+ Create Template</button>
      </div>
      <div className="glass-card" style={{ padding: 0 }}>
        <div className="table-container" style={{ border: 'none' }}>
          <table>
            <thead><tr><th>Template</th><th>Subject</th><th>Trigger</th><th>Status</th><th>Last Modified</th><th>Actions</th></tr></thead>
            <tbody>
              {templates.map(t => (
                <tr key={t.id}>
                  <td style={{ fontWeight: 600 }}>{t.name}</td>
                  <td style={{ fontSize: 13 }}>{t.subject}</td>
                  <td style={{ fontSize: 13 }}>{t.trigger}</td>
                  <td><span className={`badge ${t.status==='Active'?'badge-success':'badge-pending'}`}>{t.status}</span></td>
                  <td style={{ fontSize: 13, color: 'var(--text-muted)' }}>{t.lastModified}</td>
                  <td><div style={{ display: 'flex', gap: 6 }}><button className="btn-primary" style={{ padding: '4px 10px', fontSize: 11 }}>Edit</button><button className="btn-secondary" style={{ padding: '4px 10px', fontSize: 11 }}>Preview</button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
