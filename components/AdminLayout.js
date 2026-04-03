import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';

const adminMenu = [
  { key: 'admin', label: 'Dashboard', icon: '📊', href: '/admin' },
  { key: 'users', label: 'User Management', icon: '👥', href: '/admin/users' },
  { key: 'books', label: 'Book Management', icon: '📒', href: '/admin/books' },
  { key: 'trades', label: 'Trade Management', icon: '📈', href: '/admin/trades' },
  { key: 'funds', label: 'Fund Management', icon: '💰', href: '/admin/funds' },
  { key: 'crypto', label: 'Crypto Settings', icon: '🔗', href: '/admin/crypto' },
  { key: 'ib', label: 'IB Management', icon: '🤝', href: '/admin/ib' },
  { key: 'forex-charges', label: 'Forex Charges', icon: '💵', href: '/admin/forex-charges' },
  { key: 'earnings', label: 'Earnings Report', icon: '📊', href: '/admin/earnings' },
  { key: 'copytrade', label: 'Copy Trade', icon: '🔄', href: '/admin/copytrade' },
  { key: 'prop-firm', label: 'Prop Firm Challenges', icon: '🏆', href: '/admin/prop-firm' },
  { key: 'account-types', label: 'Account Types', icon: '🏦', href: '/admin/account-types' },
  { key: 'theme', label: 'Theme Settings', icon: '🎨', href: '/admin/theme' },
  { key: 'email-templates', label: 'Email Templates', icon: '📧', href: '/admin/email-templates' },
  { key: 'bonus', label: 'Bonus Management', icon: '🎁', href: '/admin/bonus' },
  { key: 'banners', label: 'Banner Management', icon: '🖼️', href: '/admin/banners' },
  { key: 'employees', label: 'Employee Management', icon: '👨‍💼', href: '/admin/employees' },
  { key: 'kyc', label: 'KYC Verification', icon: '✅', href: '/admin/kyc' },
  { key: 'support', label: 'Support Tickets', icon: '💬', href: '/admin/support' },
  { key: 'settings', label: 'Settings', icon: '⚙️', href: '/admin/settings' },
];

export default function AdminLayout({ children, title }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [searchMenu, setSearchMenu] = useState('');

  useEffect(() => {
    setMounted(true);
    const auth = localStorage.getItem('swaganx_admin_auth');
    if (!auth) router.push('/admin/login');
  }, []);

  if (!mounted) return null;

  const handleLogout = () => {
    localStorage.removeItem('swaganx_admin_auth');
    router.push('/admin/login');
  };

  const filteredMenu = adminMenu.filter(item =>
    item.label.toLowerCase().includes(searchMenu.toLowerCase())
  );

  return (
    <>
      <Head><title>{title || 'Admin'} — SwaganX</title></Head>
      <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
        <aside style={{
          width: sidebarOpen ? 270 : 72, background: 'var(--bg-sidebar)',
          borderRight: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column',
          transition: 'width 0.3s ease', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100,
          overflow: 'hidden'
        }}>
          <div style={{ padding: '20px 16px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid var(--border-color)' }}>
            <Link href="/admin" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, color: 'white' }}>SX</div>
              {sidebarOpen && <div>
                <span style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-primary)' }}>SwaganX</span>
                <span style={{ fontSize: 10, color: 'var(--accent-orange)', fontWeight: 600, display: 'block' }}>ADMIN PANEL</span>
              </div>}
            </Link>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 16 }}>
              {sidebarOpen ? '◀' : '▶'}
            </button>
          </div>

          {sidebarOpen && (
            <div style={{ padding: '8px 12px' }}>
              <input
                type="text"
                placeholder="🔍 Search menu..."
                value={searchMenu}
                onChange={e => setSearchMenu(e.target.value)}
                className="input-field"
                style={{ fontSize: 12, padding: '8px 12px' }}
              />
            </div>
          )}

          <nav style={{ flex: 1, padding: '4px 8px', overflowY: 'auto' }}>
            {filteredMenu.map(item => {
              const active = router.pathname === item.href;
              return (
                <Link key={item.key} href={item.href} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '9px 12px', borderRadius: 8, marginBottom: 1,
                  background: active ? 'rgba(245, 158, 11, 0.1)' : 'transparent',
                  color: active ? 'var(--accent-orange)' : 'var(--text-secondary)',
                  fontWeight: active ? 600 : 500, fontSize: 13,
                  transition: 'var(--transition)', textDecoration: 'none',
                  whiteSpace: 'nowrap', overflow: 'hidden'
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
                >
                  <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
                  {sidebarOpen && item.label}
                </Link>
              );
            })}
          </nav>

          <div style={{ padding: '8px', borderTop: '1px solid var(--border-color)' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 12px', borderRadius: 8, color: 'var(--text-muted)', fontSize: 13, textDecoration: 'none' }}>
              <span style={{ fontSize: 16 }}>🌐</span>
              {sidebarOpen && 'View Website'}
            </Link>
            <button onClick={handleLogout} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '9px 12px', borderRadius: 8, width: '100%',
              background: 'transparent', color: 'var(--text-muted)',
              fontWeight: 500, fontSize: 13, transition: 'var(--transition)',
              whiteSpace: 'nowrap', overflow: 'hidden'
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent-red)'; e.currentTarget.style.background = 'rgba(239, 68, 68, 0.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'transparent'; }}
            >
              <span style={{ fontSize: 16 }}>🚪</span>
              {sidebarOpen && 'Log Out'}
            </button>
          </div>
        </aside>

        <main style={{ flex: 1, marginLeft: sidebarOpen ? 270 : 72, transition: 'margin-left 0.3s ease' }}>
          <header style={{
            height: 64, borderBottom: '1px solid var(--border-color)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0 24px', background: 'rgba(5, 10, 21, 0.8)', backdropFilter: 'blur(10px)',
            position: 'sticky', top: 0, zIndex: 50
          }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Admin Control Panel</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>admin@swaganx.com</span>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #f59e0b, #ef4444)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, color: 'white' }}>A</div>
            </div>
          </header>
          <div className="animate-fade-in" style={{ padding: 24 }}>
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
