
import { Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-ms-blue rounded flex items-center justify-center text-white font-bold text-sm">
              M
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-900">MicrosoftAdmin.in</span>
              <span className="text-xs text-gray-500">Knowledge Base</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/categories" className="text-gray-600 hover:text-ms-blue transition-colors">
              Categories
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-ms-blue transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-ms-blue transition-colors">
              Contact
            </Link>
          </nav>

          {/* Search and User */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search articles..."
                className="pl-10 w-64 bg-gray-50 border-gray-200"
              />
            </div>
            <Button variant="ghost" size="sm" className="text-gray-600">
              <User className="w-4 h-4 mr-2" />
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
