import AdminLayout from '@/components/AdminLayout';
import { useState } from 'react';

export default function AdminEmployeesPage() {
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Admin Boss', email: 'admin@swaganx.com', phone: '+91 98765 43210', role: 'Admin', status: 'Active', lastLogin: '2026-04-03 04:00', avatar: 'AB' },
    { id: 2, name: 'Priya Sharma', email: 'priya@swaganx.com', phone: '+91 87654 32109', role: 'Manager', status: 'Active', lastLogin: '2026-04-03 03:30', avatar: 'PS' },
    { id: 3, name: 'Rahul Verma', email: 'rahul@swaganx.com', phone: '+91 76543 21098', role: 'Support', status: 'Active', lastLogin: '2026-04-02 18:00', avatar: 'RV' },
    { id: 4, name: 'Anita Desai', email: 'anita@swaganx.com', phone: '+91 65432 10987', role: 'Accountant', status: 'Active', lastLogin: '2026-04-02 16:30', avatar: 'AD' },
    { id: 5, name: 'Vikram Singh', email: 'vikram@swaganx.com', phone: '+91 54321 09876', role: 'Support', status: 'Inactive', lastLogin: '2026-03-28 12:00', avatar: 'VS' },
    { id: 6, name: 'Meera Patel', email: 'meera@swaganx.com', phone: '+91 43210 98765', role: 'Manager', status: 'Active', lastLogin: '2026-04-03 02:00', avatar: 'MP' },
  ]);

  const filtered = employees.filter(e => filter === 'all' || e.role.toLowerCase() === filter);
  const roleColor = (role) => {
    switch (role) {
      case 'Admin': return 'var(--accent-red)';
      case 'Manager': return 'var(--accent-purple)';
      case 'Support': return 'var(--accent-cyan)';
      case 'Accountant': return 'var(--accent-orange)';
      default: return 'var(--text-muted)';
    }
  };

  const changeRole = (id, newRole) => {
    setEmployees(prev => prev.map(e => e.id === id ? { ...e, role: newRole } : e));
  };

  const deleteEmployee = (id) => {
    setEmployees(prev => prev.filter(e => e.id !== id));
  };

  return (
    <AdminLayout title="Employee Management">
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800 }}>Employee Management</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 4 }}>Manage admin and staff accounts</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <select className="input-field" style={{ width: 150 }} value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="support">Support</option>
            <option value="accountant">Accountant</option>
          </select>
          <button className="btn-primary" onClick={() => setShowModal(true)}>+ Add Employee</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <div className="glass-card" style={{ padding: 20 }}>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Total Employees</div>
          <div style={{ fontSize: 24, fontWeight: 800 }}>{employees.length}</div>
        </div>
        <div className="glass-card" style={{ padding: 20 }}>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Active</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent-green)' }}>{employees.filter(e => e.status === 'Active').length}</div>
        </div>
        <div className="glass-card" style={{ padding: 20 }}>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Admins</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent-red)' }}>{employees.filter(e => e.role === 'Admin').length}</div>
        </div>
        <div className="glass-card" style={{ padding: 20 }}>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Support Staff</div>
          <div style={{ fontSize: 24, fontWeight: 800 }}>{employees.filter(e => e.role === 'Support').length}</div>
        </div>
      </div>

      <div className="glass-card" style={{ padding: 0 }}>
        <div className="table-container" style={{ border: 'none' }}>
          <table>
            <thead>
              <tr><th>Employee</th><th>Role</th><th>Phone</th><th>Status</th><th>Last Login</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map(emp => (
                <tr key={emp.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, color: 'white' }}>{emp.avatar}</div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>{emp.name}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{emp.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontWeight: 600, color: roleColor(emp.role), fontSize: 13 }}>{emp.role}</span>
                  </td>
                  <td style={{ fontSize: 13 }}>{emp.phone}</td>
                  <td><span className={`badge ${emp.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>{emp.status}</span></td>
                  <td style={{ fontSize: 13, color: 'var(--text-muted)' }}>{emp.lastLogin}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                      <button className="btn-secondary" style={{ padding: '4px 10px', fontSize: 11 }}>Edit</button>
                      <select className="input-field" style={{ width: 110, padding: '4px 6px', fontSize: 11 }} value={emp.role} onChange={e => changeRole(emp.id, e.target.value)}>
                        <option value="Admin">Admin</option>
                        <option value="Manager">Manager</option>
                        <option value="Support">Support</option>
                        <option value="Accountant">Accountant</option>
                      </select>
                      {emp.role !== 'Admin' && (
                        <button className="btn-danger" style={{ padding: '4px 10px', fontSize: 11 }} onClick={() => deleteEmployee(emp.id)}>🗑</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Employee Modal */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200 }}>
          <div className="glass-card animate-fade-in" style={{ padding: 32, width: 480, maxWidth: '90vw' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700 }}>Add Employee</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 20, cursor: 'pointer' }}>✕</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Full Name</label>
                <input type="text" className="input-field" placeholder="John Doe" />
              </div>
              <div>
                <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Email</label>
                <input type="email" className="input-field" placeholder="john@swaganx.com" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Phone</label>
                  <input type="tel" className="input-field" placeholder="+91 ..." />
                </div>
                <div>
                  <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Role</label>
                  <select className="input-field">
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Support" selected>Support</option>
                    <option value="Accountant">Accountant</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Password</label>
                <input type="password" className="input-field" placeholder="Min 8 characters" />
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button className="btn-secondary" onClick={() => setShowModal(false)} style={{ flex: 1, justifyContent: 'center' }}>Cancel</button>
                <button className="btn-primary" onClick={() => setShowModal(false)} style={{ flex: 1, justifyContent: 'center' }}>Add Employee</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
