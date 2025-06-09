
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const { user, userRole, signOut } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-ms-blue rounded flex items-center justify-center text-white font-bold text-sm">
              M
            </div>
            <span className="font-bold text-xl text-gray-900">
              Microsoft Admin KB
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-gray-700 hover:text-ms-blue transition-colors ${
                isActive('/') ? 'text-ms-blue font-medium border-b-2 border-ms-blue pb-1' : ''
              }`}
            >
              Home
            </Link>
            <Link 
              to="/articles" 
              className={`text-gray-700 hover:text-ms-blue transition-colors ${
                isActive('/articles') ? 'text-ms-blue font-medium border-b-2 border-ms-blue pb-1' : ''
              }`}
            >
              Articles
            </Link>
            <Link 
              to="/news" 
              className={`text-gray-700 hover:text-ms-blue transition-colors ${
                isActive('/news') ? 'text-ms-blue font-medium border-b-2 border-ms-blue pb-1' : ''
              }`}
            >
              News
            </Link>
            <Link 
              to="/about" 
              className={`text-gray-700 hover:text-ms-blue transition-colors ${
                isActive('/about') ? 'text-ms-blue font-medium border-b-2 border-ms-blue pb-1' : ''
              }`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`text-gray-700 hover:text-ms-blue transition-colors ${
                isActive('/contact') ? 'text-ms-blue font-medium border-b-2 border-ms-blue pb-1' : ''
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Search and Auth */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 border-gray-300 focus:border-ms-blue focus:ring-ms-blue"
              />
            </form>
            
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  Welcome, {user.email}
                </span>
                {userRole === 'admin' && (
                  <Button asChild variant="outline" size="sm">
                    <Link to="/admin">Admin</Link>
                  </Button>
                )}
                <Button onClick={handleSignOut} variant="outline" size="sm">
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button asChild>
                <Link to="/auth">Sign In</Link>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`text-gray-700 hover:text-ms-blue transition-colors py-2 ${
                  isActive('/') ? 'text-ms-blue font-medium' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/articles" 
                className={`text-gray-700 hover:text-ms-blue transition-colors py-2 ${
                  isActive('/articles') ? 'text-ms-blue font-medium' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Articles
              </Link>
              <Link 
                to="/news" 
                className={`text-gray-700 hover:text-ms-blue transition-colors py-2 ${
                  isActive('/news') ? 'text-ms-blue font-medium' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                News
              </Link>
              <Link 
                to="/about" 
                className={`text-gray-700 hover:text-ms-blue transition-colors py-2 ${
                  isActive('/about') ? 'text-ms-blue font-medium' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className={`text-gray-700 hover:text-ms-blue transition-colors py-2 ${
                  isActive('/contact') ? 'text-ms-blue font-medium' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative pt-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border-gray-300 focus:border-ms-blue focus:ring-ms-blue"
                />
              </form>
              
              {/* Mobile Auth */}
              <div className="pt-4 border-t border-gray-200">
                {user ? (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      Welcome, {user.email}
                    </p>
                    {userRole === 'admin' && (
                      <Button asChild variant="outline" size="sm" className="w-full">
                        <Link to="/admin" onClick={() => setIsMenuOpen(false)}>Admin Dashboard</Link>
                      </Button>
                    )}
                    <Button onClick={handleSignOut} variant="outline" size="sm" className="w-full">
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <Button asChild className="w-full">
                    <Link to="/auth" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
                  </Button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
