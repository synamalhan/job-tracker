import { NavLink } from 'react-router-dom';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/internships', label: 'Internships' },
  { path: '/jobs', label: 'Jobs' },
  { path: '/emails', label: 'Emails' },
  { path: '/resume', label: 'Resume' },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-surface shadow-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-primary">JobTrackr</h1>
        <ul className="flex space-x-6">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `transition-all px-3 py-1 rounded-md ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-textSecondary hover:text-primary hover:bg-background'
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
