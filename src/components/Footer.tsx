
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import NewsletterForm from "@/components/NewsletterForm";

const Footer = () => {
  const { user } = useAuth();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-ms-blue rounded flex items-center justify-center text-white font-bold text-sm">
                M
              </div>
              <span className="font-semibold">MicrosoftAdmin.in</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your trusted resource for Microsoft 365 administration guides, tips, and best practices.
            </p>
            <div className="space-y-3">
              <h4 className="font-medium text-white">Stay Updated</h4>
              <NewsletterForm />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/articles" className="text-gray-400 hover:text-white transition-colors">
                  All Articles
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/category/exchange-online" className="text-gray-400 hover:text-white transition-colors">
                  Exchange Online
                </Link>
              </li>
              <li>
                <Link to="/category/teams" className="text-gray-400 hover:text-white transition-colors">
                  Microsoft Teams
                </Link>
              </li>
              <li>
                <Link to="/category/azure-ad" className="text-gray-400 hover:text-white transition-colors">
                  Azure AD
                </Link>
              </li>
              <li>
                <Link to="/category/sharepoint" className="text-gray-400 hover:text-white transition-colors">
                  SharePoint
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Account</h3>
            <ul className="space-y-2 text-sm">
              {user ? (
                <>
                  <li className="text-gray-400">
                    Signed in as: {user.email}
                  </li>
                  <li>
                    <button className="text-gray-400 hover:text-white transition-colors text-left">
                      Account Settings
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/auth" className="text-gray-400 hover:text-white transition-colors">
                      Sign In
                    </Link>
                  </li>
                  <li>
                    <Link to="/auth?mode=signup" className="text-gray-400 hover:text-white transition-colors">
                      Create Account
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} MicrosoftAdmin.in. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
