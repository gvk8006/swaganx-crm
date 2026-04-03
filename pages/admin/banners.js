import AdminLayout from '@/components/AdminLayout';
import { useState } from 'react';

export default function AdminBannersPage() {
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [banners, setBanners] = useState([
    { id: 1, title: 'Welcome to SwaganX', position: 'home', link: '/user/register', order: 1, active: true, emoji: '🚀', bg: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' },
    { id: 2, title: 'Trade with $0 Commission', position: 'home', link: '/account', order: 2, active: true, emoji: '📈', bg: 'linear-gradient(135deg, #10b981, #06b6d4)' },
    { id: 3, title: 'IB Programme — Earn $6/lot', position: 'home', link: '/ib', order: 3, active: true, emoji: '🤝', bg: 'linear-gradient(135deg, #f59e0b, #ef4444)' },
    { id: 4, title: 'Prop Firm Challenge 100K', position: 'home', link: '/dashboard', order: 4, active: false, emoji: '🏆', bg: 'linear-gradient(135deg, #06b6d4, #3b82f6)' },
    { id: 5, title: 'Deposit Bonus — 50% Extra', position: 'dashboard', link: '/wallet', order: 1, active: true, emoji: '💰', bg: 'linear-gradient(135deg, #8b5cf6, #ec4899)' },
    { id: 6, title: '24/7 Support Available', position: 'both', link: '/support', order: 2, active: true, emoji: '💬', bg: 'linear-gradient(135deg, #f97316, #f59e0b)' },
  ]);

  const filtered = banners.filter(b => filter === 'all' || b.position === filter);
  const activeCount = banners.filter(b => b.active).length;

  const toggleActive = (id) => {
    setBanners(prev => prev.map(b => b.id === id ? { ...b, active: !b.active } : b));
  };

  const deleteBanner = (id) => {
    setBanners(prev => prev.filter(b => b.id !== id));
  };

  return (
    <AdminLayout title="Banner Management">
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800 }}>Banner Management</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 4 }}>Manage website banners and promotional images</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <select className="input-field" style={{ width: 150 }} value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="all">All Positions</option>
            <option value="home">Home</option>
            <option value="dashboard">Dashboard</option>
            <option value="both">Both</option>
          </select>
          <button className="btn-primary" onClick={() => setShowModal(true)}>+ Upload Banner</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <div className="glass-card" style={{ padding: 20 }}>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Total Banners</div>
          <div style={{ fontSize: 24, fontWeight: 800 }}>{banners.length}</div>
        </div>
        <div className="glass-card" style={{ padding: 20 }}>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Active</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent-green)' }}>{activeCount}</div>
        </div>
        <div className="glass-card" style={{ padding: 20 }}>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Homepage</div>
          <div style={{ fontSize: 24, fontWeight: 800 }}>{banners.filter(b => b.position === 'home' || b.position === 'both').length}</div>
        </div>
        <div className="glass-card" style={{ padding: 20 }}>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Dashboard</div>
          <div style={{ fontSize: 24, fontWeight: 800 }}>{banners.filter(b => b.position === 'dashboard' || b.position === 'both').length}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 16 }}>
        {filtered.map(banner => (
          <div key={banner.id} className="glass-card" style={{ overflow: 'hidden' }}>
            <div style={{ height: 140, background: banner.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, position: 'relative' }}>
              {banner.emoji}
              {!banner.active && (
                <div style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.6)', padding: '2px 8px', borderRadius: 4, fontSize: 11, color: 'var(--text-muted)' }}>Inactive</div>
              )}
              <div style={{ position: 'absolute', top: 8, left: 8, background: 'rgba(0,0,0,0.6)', padding: '2px 8px', borderRadius: 4, fontSize: 11, color: 'white' }}>Order: {banner.order}</div>
            </div>
            <div style={{ padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <h4 style={{ fontSize: 15, fontWeight: 700 }}>{banner.title}</h4>
                <span className={`badge ${banner.active ? 'badge-success' : 'badge-danger'}`}>{banner.active ? 'Active' : 'Inactive'}</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>Position: <span style={{ fontWeight: 600, textTransform: 'capitalize' }}>{banner.position}</span></div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>Link: <span style={{ fontFamily: 'monospace' }}>{banner.link}</span></div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn-secondary" style={{ flex: 1, justifyContent: 'center', padding: '8px', fontSize: 12 }}>Edit</button>
                <button className={banner.active ? 'btn-danger' : 'btn-success'} style={{ flex: 1, justifyContent: 'center', padding: '8px', fontSize: 12 }} onClick={() => toggleActive(banner.id)}>
                  {banner.active ? 'Deactivate' : 'Activate'}
                </button>
                <button className="btn-danger" style={{ padding: '8px 12px', fontSize: 12 }} onClick={() => deleteBanner(banner.id)}>🗑</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="glass-card" style={{ padding: 60, textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🖼️</div>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>No banners found</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Create a banner to get started</p>
        </div>
      )}

      {/* Upload Banner Modal */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200 }}>
          <div className="glass-card animate-fade-in" style={{ padding: 32, width: 480, maxWidth: '90vw' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700 }}>Upload Banner</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 20, cursor: 'pointer' }}>✕</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Title</label>
                <input type="text" className="input-field" placeholder="Banner title" />
              </div>
              <div>
                <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Position</label>
                <select className="input-field"><option value="home">Homepage</option><option value="dashboard">Dashboard</option><option value="both">Both</option></select>
              </div>
              <div>
                <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Link URL</label>
                <input type="text" className="input-field" placeholder="/page" />
              </div>
              <div>
                <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Order</label>
                <input type="number" className="input-field" placeholder="1" defaultValue={banners.length + 1} />
              </div>
              <div>
                <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Banner Image</label>
                <div style={{ border: '2px dashed var(--border-color)', borderRadius: 8, padding: 24, textAlign: 'center', cursor: 'pointer', color: 'var(--text-muted)' }}>
                  <div style={{ fontSize: 24, marginBottom: 4 }}>📁</div>
                  <div style={{ fontSize: 13 }}>Click to upload or drag and drop</div>
                  <div style={{ fontSize: 11, marginTop: 2 }}>PNG, JPG, GIF up to 5MB</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button className="btn-secondary" onClick={() => setShowModal(false)} style={{ flex: 1, justifyContent: 'center' }}>Cancel</button>
                <button className="btn-primary" onClick={() => setShowModal(false)} style={{ flex: 1, justifyContent: 'center' }}>Upload</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
