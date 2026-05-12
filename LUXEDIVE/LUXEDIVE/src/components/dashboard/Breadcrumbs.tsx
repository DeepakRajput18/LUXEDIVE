import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (location.pathname === '/' || location.pathname === '/dashboard') {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-[0.2em] mb-6 text-gray-500">
      <Link to="/" className="hover:text-luxe-gold transition-colors flex items-center gap-1.5">
        <Home className="w-3 h-3" />
        Home
      </Link>
      
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const displayName = name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ');

        return (
          <div key={name} className="flex items-center space-x-2">
            <ChevronRight className="w-3 h-3 text-gray-700" />
            {isLast ? (
              <span className="text-luxe-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]">{displayName}</span>
            ) : (
              <Link to={routeTo} className="hover:text-white transition-colors">
                {displayName}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
