
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import NewsletterForm from "@/components/NewsletterForm";
import { Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  const { user } = useAuth();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info & Description */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#1B2A41] rounded flex items-center justify-center text-white font-bold text-sm">
                M
              </div>
              <span className="font-semibold text-xl">Microsoft Admin Knowledge Base</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted resource for Microsoft 365 administration tips, guides, and best practices. Stay ahead with expert insights and practical solutions.
            </p>
            
            {/* Newsletter Signup */}
            <div className="space-y-3 mt-6">
              <h4 className="font-medium text-white">Stay Updated</h4>
              <p className="text-gray-400 text-sm">Stay updated with the latest Microsoft 365 tips and news.</p>
              <NewsletterForm />
            </div>

            {/* Social Media */}
            <div className="flex items-center space-x-4 mt-6">
              <span className="text-gray-400 text-sm">Follow us:</span>
              <a 
                href="http://linkedin.com/company/microsoftadmin" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/microsoftadmin249/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/articles" className="text-gray-400 hover:text-white transition-colors">
                  Articles
                </Link>
              </li>
              <li>
                <Link to="/articles" className="text-gray-400 hover:text-white transition-colors">
                  News
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

          {/* Legal & Account */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Legal & Account</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Use
                </Link>
              </li>
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

        {/* Legal Disclaimer */}
        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="text-xs text-gray-400 leading-relaxed mb-4">
            <strong>Legal Disclaimer:</strong> This website is an independent resource and is not affiliated with or endorsed by Microsoft Corporation. All trademarks are the property of their respective owners.
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Microsoft Admin Knowledge Base. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
