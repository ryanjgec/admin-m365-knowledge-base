
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, User, LogOut, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { useAdminAuth } from "@/hooks/useAdminAuth";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { isAdminAuthenticated } = useAdminAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Articles", href: "/articles" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-ms-blue rounded flex items-center justify-center text-white font-bold text-sm">
                M
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-gray-900">MicrosoftAdmin.in</span>
                <span className="text-xs text-gray-500">Knowledge Base</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-600 hover:text-ms-blue transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/search">
                <Search className="w-4 h-4" />
              </Link>
            </Button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span className="max-w-32 truncate">{user.email}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{user.email}</span>
                      {isAdminAuthenticated && (
                        <span className="text-xs text-blue-600 font-medium">Administrator</span>
                      )}
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {isAdminAuthenticated && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link to="/admin" className="flex items-center">
                          <Shield className="w-4 h-4 mr-2" />
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/auth">Sign In</Link>
                </Button>
                <Button size="sm" asChild className="bg-ms-blue hover:bg-ms-blue-dark">
                  <Link to="/auth?mode=signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-gray-600 hover:text-ms-blue transition-colors duration-200 px-2 py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="border-t border-gray-200 pt-3 mt-3">
                {user ? (
                  <div className="space-y-2">
                    <div className="px-2 py-1">
                      <span className="text-sm font-medium text-gray-900">{user.email}</span>
                      {isAdminAuthenticated && (
                        <div className="text-xs text-blue-600 font-medium">Administrator</div>
                      )}
                    </div>
                    {isAdminAuthenticated && (
                      <Link
                        to="/admin"
                        className="flex items-center text-gray-600 hover:text-ms-blue transition-colors duration-200 px-2 py-1"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Shield className="w-4 h-4 mr-2" />
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center text-red-600 hover:text-red-700 transition-colors duration-200 px-2 py-1 w-full text-left"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      to="/auth"
                      className="block text-gray-600 hover:text-ms-blue transition-colors duration-200 px-2 py-1"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/auth?mode=signup"
                      className="block bg-ms-blue text-white hover:bg-ms-blue-dark transition-colors duration-200 px-3 py-2 rounded-md text-sm font-medium mx-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
