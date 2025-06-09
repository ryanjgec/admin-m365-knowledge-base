
import { User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { categories } from "@/data/categories";

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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-gray-600 hover:text-ms-blue">
                  Categories
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 bg-white shadow-lg border">
                {categories.map((category) => (
                  <DropdownMenuItem key={category.id} asChild>
                    <Link 
                      to={`/category/${category.id}`}
                      className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50"
                    >
                      <span className="text-xl">{category.icon}</span>
                      <div>
                        <div className="font-medium text-gray-900">{category.name}</div>
                        <div className="text-sm text-gray-500">{category.articleCount} articles</div>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link to="/about" className="text-gray-600 hover:text-ms-blue transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-ms-blue transition-colors">
              Contact
            </Link>
          </nav>

          {/* User */}
          <div className="flex items-center space-x-4">
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
