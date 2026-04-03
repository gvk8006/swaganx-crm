import AdminLayout from '@/components/AdminLayout';
import { useState } from 'react';

export default function AdminPagesPage() {
  const [pages, setPages] = useState([
    { id: 1, title: 'Home', slug: '/', status: 'Published', lastUpdated: '2026-04-02' },
    { id: 2, title: 'About Us', slug: '/about', status: 'Published', lastUpdated: '2026-03-28' },
    { id: 3, title: 'Services', slug: '/services', status: 'Published', lastUpdated: '2026-03-25' },
    { id: 4, title: 'Pricing', slug: '/pricing', status: 'Published', lastUpdated: '2026-03-20' },
    { id: 5, title: 'Blog', slug: '/blog', status: 'Published', lastUpdated: '2026-04-01' },
    { id: 6, title: 'Contact', slug: '/contact', status: 'Published', lastUpdated: '2026-03-15' },
    { id: 7, title: 'Terms of Service', slug: '/terms', status: 'Published', lastUpdated: '2026-02-10' },
    { id: 8, title: 'Privacy Policy', slug: '/privacy', status: 'Published', lastUpdated: '2026-02-10' },
    { id: 9, title: 'Risk Disclosure', slug: '/risk', status: 'Draft', lastUpdated: '2026-04-02' },
  ]);

  const [editingPage, setEditingPage] = useState(null);
  const [showNewPage, setShowNewPage] = useState(false);
  const [newPage, setNewPage] = useState({ title: '', slug: '', content: '' });

  return (
    <AdminLayout title="Page Management">
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800 }}>Pages</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 4 }}>Manage website pages and content</p>
        </div>
        <button className="btn-primary" onClick={() => setShowNewPage(true)}>+ New Page</button>
      </div>

      <div className="glass-card" style={{ padding: 0 }}>
        <div className="table-container" style={{ border: 'none' }}>
          <table>
            <thead><tr><th>Title</th><th>URL Slug</th><th>Status</th><th>Last Updated</th><th>Actions</th></tr></thead>
            <tbody>
              {pages.map(p => (
                <tr key={p.id}>
                  <td style={{ fontWeight: 600 }}>{p.title}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: 13, color: 'var(--text-muted)' }}>{p.slug}</td>
                  <td><span className={`badge ${p.status === 'Published' ? 'badge-success' : 'badge-pending'}`}>{p.status}</span></td>
                  <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>{p.lastUpdated}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn-primary" style={{ padding: '4px 10px', fontSize: 11 }} onClick={() => setEditingPage(p)}>Edit</button>
                      <button className="btn-secondary" style={{ padding: '4px 10px', fontSize: 11 }}>Preview</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Page Modal */}
      {editingPage && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200 }}>
          <div className="glass-card animate-fade-in" style={{ padding: 32, width: 600, maxWidth: '90vw' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700 }}>Edit Page: {editingPage.title}</h3>
              <button onClick={() => setEditingPage(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 20, cursor: 'pointer' }}>✕</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Page Title</label>
                <input type="text" className="input-field" defaultValue={editingPage.title} />
              </div>
              <div>
                <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>URL Slug</label>
                <input type="text" className="input-field" defaultValue={editingPage.slug} />
              </div>
              <div>
                <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Content</label>
                <textarea className="input-field" rows={8} defaultValue="Page content would be edited here using a rich text editor in production..." style={{ resize: 'vertical' }}></textarea>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button className="btn-secondary" onClick={() => setEditingPage(null)} style={{ flex: 1, justifyContent: 'center' }}>Cancel</button>
                <button className="btn-primary" onClick={() => setEditingPage(null)} style={{ flex: 1, justifyContent: 'center' }}>Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Page Modal */}
      {showNewPage && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200 }}>
          <div className="glass-card animate-fade-in" style={{ padding: 32, width: 600, maxWidth: '90vw' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700 }}>Create New Page</h3>
              <button onClick={() => setShowNewPage(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 20, cursor: 'pointer' }}>✕</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Page Title</label>
                <input type="text" className="input-field" placeholder="Enter page title" value={newPage.title} onChange={e => setNewPage({ ...newPage, title: e.target.value })} />
              </div>
              <div>
                <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>URL Slug</label>
                <input type="text" className="input-field" placeholder="/page-slug" value={newPage.slug} onChange={e => setNewPage({ ...newPage, slug: e.target.value })} />
              </div>
              <div>
                <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Content</label>
                <textarea className="input-field" rows={8} placeholder="Page content..." value={newPage.content} onChange={e => setNewPage({ ...newPage, content: e.target.value })} style={{ resize: 'vertical' }}></textarea>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button className="btn-secondary" onClick={() => setShowNewPage(false)} style={{ flex: 1, justifyContent: 'center' }}>Cancel</button>
                <button className="btn-primary" onClick={() => setShowNewPage(false)} style={{ flex: 1, justifyContent: 'center' }}>Create Page</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
