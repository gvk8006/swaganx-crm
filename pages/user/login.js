import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.email.includes('@')) errs.email = 'Invalid email format';
    if (!form.password) errs.password = 'Password is required';
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      setLoading(true);
      // Check stored users
      const users = JSON.parse(localStorage.getItem('swaganx_users') || '[]');
      const user = users.find(u => u.email === form.email && u.password === form.password);
      setTimeout(() => {
        setLoading(false);
        // For demo: always allow login with stored data or demo credentials
        const loginData = user || { id: 1, name: 'Demo', email: form.email, status: 'active' };
        localStorage.setItem('swaganx_current_user', JSON.stringify(loginData));
        localStorage.setItem('swaganx_auth', 'true');
        router.push('/dashboard');
      }, 800);
    }
  };

  return (
    <>
      <Head><title>Log In — SwaganX</title></Head>
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)', position: 'relative' }}>
        <div className="mesh-bg"></div>
        <div className="noise-overlay"></div>

        <div className="glass-card animate-fade-in" style={{ padding: 40, width: 440, maxWidth: '90vw' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 24 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 16, color: 'white' }}>SX</div>
              <span style={{ fontWeight: 700, fontSize: 20 }}>SwaganX</span>
            </Link>
            <div style={{ display: 'flex', gap: 0, marginBottom: 8 }}>
              <Link href="/user/register" style={{ flex: 1, textAlign: 'center', padding: '12px 0', borderBottom: '2px solid transparent', color: 'var(--text-muted)', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>Sign up</Link>
              <div style={{ flex: 1, textAlign: 'center', padding: '12px 0', borderBottom: '2px solid var(--accent-blue)', color: 'var(--accent-blue)', fontWeight: 600, fontSize: 14 }}>Sign in</div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 24 }}>Welcome back</h3>

            <div style={{ marginBottom: 16, position: 'relative' }}>
              <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 14 }}>📧</span>
              <input type="email" placeholder="Enter your email" value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="input-field" style={{ paddingLeft: 42 }} />
            </div>
            {errors.email && <span style={{ color: 'var(--accent-red)', fontSize: 12, marginTop: -12, marginBottom: 8, display: 'block' }}>{errors.email}</span>}

            <div style={{ marginBottom: 24, position: 'relative' }}>
              <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 14 }}>🔒</span>
              <input type="password" placeholder="Enter your password" value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                className="input-field" style={{ paddingLeft: 42, paddingRight: 42 }} />
              <button type="button" onClick={() => {
                const input = document.querySelectorAll('input[type="password"]')[0];
                if (input) input.type = input.type === 'password' ? 'text' : 'password';
              }} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 14 }}>👁</button>
            </div>
            {errors.password && <span style={{ color: 'var(--accent-red)', fontSize: 12, marginTop: -16, marginBottom: 8, display: 'block' }}>{errors.password}</span>}

            <button type="submit" className="btn-primary" disabled={loading}
              style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: 15 }}>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>

            <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: 13, marginTop: 20 }}>
              Don&apos;t have an account?{' '}
              <Link href="/user/register" style={{ color: 'var(--accent-blue)' }}>Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
