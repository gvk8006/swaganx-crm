import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.includes('@')) errs.email = 'Please include an "@" in the email address';
    if (!form.phone.trim()) errs.phone = 'Phone number is required';
    if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setLoading(true);
      // Store user data in localStorage for demo
      const users = JSON.parse(localStorage.getItem('swaganx_users') || '[]');
      users.push({ ...form, id: Date.now(), status: 'active', created: new Date().toISOString(), kyc: 'pending', balance: 0 });
      localStorage.setItem('swaganx_users', JSON.stringify(users));
      setTimeout(() => {
        setLoading(false);
        router.push('/user/login');
      }, 1000);
    }
  };

  return (
    <>
      <Head><title>Sign Up — SwaganX</title></Head>
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
              <div style={{ flex: 1, textAlign: 'center', padding: '12px 0', borderBottom: '2px solid var(--accent-blue)', color: 'var(--accent-blue)', fontWeight: 600, fontSize: 14 }}>Sign up</div>
              <Link href="/user/login" style={{ flex: 1, textAlign: 'center', padding: '12px 0', borderBottom: '2px solid transparent', color: 'var(--text-muted)', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>Sign in</Link>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 24 }}>Create an account</h3>

            {[
              { key: 'name', label: 'Enter your name', type: 'text', icon: '👤' },
              { key: 'email', label: 'Enter your email', type: 'email', icon: '📧' },
              { key: 'phone', label: 'Enter phone number', type: 'tel', icon: '📱' },
              { key: 'address', label: 'Enter your address', type: 'text', icon: '📍' },
            ].map(field => (
              <div key={field.key} style={{ marginBottom: 16 }}>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 14 }}>{field.icon}</span>
                  <input
                    type={field.type}
                    placeholder={field.label}
                    value={form[field.key]}
                    onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                    className="input-field"
                    style={{ paddingLeft: 42 }}
                  />
                </div>
                {errors[field.key] && <span style={{ color: 'var(--accent-red)', fontSize: 12, marginTop: 4, display: 'block' }}>{errors[field.key]}</span>}
              </div>
            ))}

            <div style={{ marginBottom: 16, position: 'relative' }}>
              <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 14 }}>🔒</span>
              <input
                type="password"
                placeholder="Create password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                className="input-field"
                style={{ paddingLeft: 42, paddingRight: 42 }}
              />
              <button type="button" onClick={() => {
                const input = document.querySelector('input[type="password"]');
                input.type = input.type === 'password' ? 'text' : 'password';
              }} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 14 }}>👁</button>
            </div>
            {errors.password && <span style={{ color: 'var(--accent-red)', fontSize: 12, marginTop: -12, marginBottom: 8, display: 'block' }}>{errors.password}</span>}

            <button type="submit" className="btn-primary" disabled={loading}
              style={{ width: '100%', justifyContent: 'center', marginTop: 8, padding: '14px', fontSize: 15 }}>
              {loading ? 'Creating account...' : 'Create an account'}
            </button>

            <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: 13, marginTop: 20 }}>
              By creating an account, you agree to our{' '}
              <a href="#" style={{ color: 'var(--accent-blue)' }}>Terms & Service</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
