import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Logo } from '@/components/Logo';

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/expenses', label: 'Expenses' },
  { to: '/categories', label: 'Categories' },
  { to: '/settings', label: 'Settings' },
];

export function Shell() {
  const { displayName, email, logout } = useAuth();

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <Logo className="brand-logo" />
          <div>
            <p className="eyebrow">Expense Tracker</p>
            <h1>Analytics dashboard</h1>
          </div>
        </div>

        <nav className="side-nav">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div>
            <p className="eyebrow">Signed in as</p>
            <strong>{displayName ?? email ?? 'Unknown user'}</strong>
          </div>
          <button className="button button-secondary" onClick={logout} type="button">
            Log out
          </button>
        </div>
      </aside>

      <main className="content-area">
        <Outlet />
      </main>
    </div>
  );
}