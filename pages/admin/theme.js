import AdminLayout from '@/components/AdminLayout';
import { useState } from 'react';
export default function AdminThemePage() {
  const [saved, setSaved] = useState(false);
  const [theme, setTheme] = useState({ primaryColor: '#3b82f6', accentColor: '#f59e0b', darkMode: true, logo: 'SX', companyName: 'SwaganX', favicon: '' });
  const presets = [
    { name: 'Ocean Blue', primary: '#3b82f6', accent: '#f59e0b' },
    { name: 'Royal Purple', primary: '#8b5cf6', accent: '#ec4899' },
    { name: 'Emerald Green', primary: '#10b981', accent: '#f59e0b' },
    { name: 'Crimson Red', primary: '#ef4444', accent: '#f59e0b' },
    { name: 'Midnight Teal', primary: '#06b6d4', accent: '#8b5cf6' },
    { name: 'Sunset Orange', primary: '#f97316', accent: '#06b6d4' },
  ];
  return (
    <AdminLayout title="Theme Settings">
      <div style={{ marginBottom: 24 }}><h1 style={{ fontSize: 24, fontWeight: 800 }}>Theme Settings</h1><p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 4 }}>Customize the platform appearance</p></div>
      {saved && <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 8, padding: 16, marginBottom: 24 }}><span style={{ color: 'var(--accent-green)', fontWeight: 600 }}>✓ Theme saved!</span></div>}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
        <div>
          <div className="glass-card" style={{ padding: 24, marginBottom: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Color Presets</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {presets.map((p, i) => (
                <button key={i} onClick={() => setTheme({ ...theme, primaryColor: p.primary, accentColor: p.accent })} style={{ padding: 16, borderRadius: 12, border: theme.primaryColor === p.primary ? '2px solid var(--accent-blue)' : '1px solid var(--border-color)', background: 'var(--bg-input)', cursor: 'pointer', textAlign: 'left' }}>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}><div style={{ width: 24, height: 24, borderRadius: 6, background: p.primary }}></div><div style={{ width: 24, height: 24, borderRadius: 6, background: p.accent }}></div></div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{p.name}</div>
                </button>
              ))}
            </div>
          </div>
          <div className="glass-card" style={{ padding: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Custom Colors</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div><label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Primary Color</label><div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><input type="color" value={theme.primaryColor} onChange={e => setTheme({...theme, primaryColor: e.target.value})} style={{ width: 48, height: 36, border: 'none', borderRadius: 6, cursor: 'pointer' }} /><input className="input-field" value={theme.primaryColor} onChange={e => setTheme({...theme, primaryColor: e.target.value})} style={{ flex: 1 }} /></div></div>
              <div><label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Accent Color</label><div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><input type="color" value={theme.accentColor} onChange={e => setTheme({...theme, accentColor: e.target.value})} style={{ width: 48, height: 36, border: 'none', borderRadius: 6, cursor: 'pointer' }} /><input className="input-field" value={theme.accentColor} onChange={e => setTheme({...theme, accentColor: e.target.value})} style={{ flex: 1 }} /></div></div>
            </div>
            <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div><label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Company Name</label><input className="input-field" value={theme.companyName} onChange={e => setTheme({...theme, companyName: e.target.value})} /></div>
              <div><label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Logo Text</label><input className="input-field" value={theme.logo} onChange={e => setTheme({...theme, logo: e.target.value})} /></div>
            </div>
            <button className="btn-primary" onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }} style={{ marginTop: 20 }}>Save Theme</button>
          </div>
        </div>
        <div className="glass-card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Preview</h3>
          <div style={{ background: 'var(--bg-input)', borderRadius: 12, padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.accentColor})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, color: 'white' }}>{theme.logo}</div>
              <span style={{ fontWeight: 700 }}>{theme.companyName}</span>
            </div>
            <button style={{ background: theme.primaryColor, color: 'white', padding: '10px 20px', borderRadius: 8, border: 'none', fontWeight: 600, cursor: 'pointer', width: '100%' }}>Primary Button</button>
            <button style={{ background: 'transparent', color: theme.primaryColor, padding: '10px 20px', borderRadius: 8, border: `1px solid ${theme.primaryColor}`, fontWeight: 600, cursor: 'pointer', width: '100%', marginTop: 8 }}>Secondary Button</button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
