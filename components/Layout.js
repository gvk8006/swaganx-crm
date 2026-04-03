import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';

const menuItems = [
  { key: 'dashboard', label: 'Dashboard', icon: '📊', href: '/dashboard' },
  { key: 'account', label: 'Account', icon: '🏦', href: '/account' },
  { key: 'wallet', label: 'Wallet', icon: '💰', href: '/wallet' },
  { key: 'orders', label: 'Orders', icon: '📋', href: '/orders' },
  { key: 'ib', label: 'IB', icon: '🤝', href: '/ib' },
  { key: 'copytrade', label: 'CopyTrade', icon: '🔄', href: '/copytrade' },
  { key: 'profile', label: 'Profile', icon: '👤', href: '/profile' },
  { key: 'support', label: 'Support', icon: '💬', href: '/support' },
  { key: 'instructions', label: 'Instructions', icon: '📖', href: '/instructions' },
];

export default function DashboardLayout({ children, title }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const [profileMenu, setProfileMenu] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const auth = localStorage.getItem('swaganx_auth');
    if (!auth) router.push('/user/login');
    else {
      const userData = JSON.parse(localStorage.getItem('swaganx_current_user') || '{}');
      setUser(userData);
    }
  }, []);

  if (!mounted) return null;

  const handleLogout = () => {
    localStorage.removeItem('swaganx_auth');
    localStorage.removeItem('swaganx_current_user');
    router.push('/user/login');
  };

  if (!user) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)' }}>
      <div className="animate-fade-in" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 32, marginBottom: 16 }}>⏳</div>
        <p style={{ color: 'var(--text-muted)' }}>Loading...</p>
      </div>
    </div>
  );

  return (
    <>
      <Head><title>{title || 'Dashboard'} — SwaganX</title></Head>
      <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
        {/* Sidebar */}
        <aside style={{
          width: sidebarOpen ? 240 : 72, background: 'var(--bg-sidebar)',
          borderRight: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column',
          transition: 'width 0.3s ease', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100
        }}>
          <div style={{ padding: '20px 16px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid var(--border-color)' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, color: 'white' }}>SX</div>
              {sidebarOpen && <span style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-primary)' }}>SwaganX</span>}
            </Link>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 16 }}>
              {sidebarOpen ? '◀' : '▶'}
            </button>
          </div>

          <nav style={{ flex: 1, padding: '12px 8px', overflowY: 'auto' }}>
            {menuItems.map(item => {
              const active = router.pathname === item.href;
              return (
                <Link key={item.key} href={item.href} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '10px 12px', borderRadius: 8, marginBottom: 2,
                  background: active ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                  color: active ? 'var(--accent-blue)' : 'var(--text-secondary)',
                  fontWeight: active ? 600 : 500, fontSize: 14,
                  transition: 'var(--transition)', textDecoration: 'none',
                  whiteSpace: 'nowrap', overflow: 'hidden'
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
                >
                  <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
                  {sidebarOpen && item.label}
                </Link>
              );
            })}
          </nav>

          <div style={{ padding: '8px', borderTop: '1px solid var(--border-color)' }}>
            <button onClick={handleLogout} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '10px 12px', borderRadius: 8, width: '100%',
              background: 'transparent', color: 'var(--text-muted)',
              fontWeight: 500, fontSize: 14, transition: 'var(--transition)',
              whiteSpace: 'nowrap', overflow: 'hidden'
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent-red)'; e.currentTarget.style.background = 'rgba(239, 68, 68, 0.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'transparent'; }}
            >
              <span style={{ fontSize: 18 }}>🚪</span>
              {sidebarOpen && 'Log Out'}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1, marginLeft: sidebarOpen ? 240 : 72, transition: 'margin-left 0.3s ease' }}>
          {/* Top Bar */}
          <header style={{
            height: 64, borderBottom: '1px solid var(--border-color)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0 24px', background: 'rgba(5, 10, 21, 0.8)', backdropFilter: 'blur(10px)',
            position: 'sticky', top: 0, zIndex: 50
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
                Wallet Balance: <span style={{ color: 'var(--accent-green)', fontWeight: 700, fontSize: 16 }}>$7,800.00</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <button className="btn-success" style={{ padding: '6px 14px', fontSize: 12 }}>📱 Download App</button>
              <div style={{ position: 'relative' }}>
                <button onClick={() => setProfileMenu(!profileMenu)} style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'var(--gradient-primary)', border: 'none',
                  color: 'white', fontWeight: 700, fontSize: 13, cursor: 'pointer'
                }}>{(user.name || 'U')[0].toUpperCase()}</button>
                {profileMenu && (
                  <div style={{
                    position: 'absolute', top: 44, right: 0, width: 200,
                    background: 'var(--bg-card)', border: '1px solid var(--border-color)',
                    borderRadius: 8, boxShadow: 'var(--shadow-lg)', overflow: 'hidden', zIndex: 60
                  }}>
                    <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-color)' }}>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{user.name || 'User'}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{user.email || ''}</div>
                    </div>
                    {[
                      { label: '⚙️ Settings', href: '/profile' },
                      { label: '📖 Instructions', href: '/instructions' },
                      { label: '🚪 Sign Out', action: handleLogout },
                    ].map(item => (
                      <button key={item.label} onClick={() => {
                        setProfileMenu(false);
                        if (item.action) item.action();
                        else router.push(item.href);
                      }} style={{
                        display: 'block', width: '100%', textAlign: 'left',
                        padding: '10px 16px', background: 'none', border: 'none',
                        color: 'var(--text-secondary)', fontSize: 13, cursor: 'pointer'
                      }}
                      onMouseEnter={e => e.target.style.background = 'rgba(59,130,246,0.05)'}
                      onMouseLeave={e => e.target.style.background = 'none'}
                      >{item.label}</button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Page Content */}
          <div className="animate-fade-in" style={{ padding: 24 }}>
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
