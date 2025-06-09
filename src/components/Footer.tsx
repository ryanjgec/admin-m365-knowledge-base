
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-ms-blue rounded flex items-center justify-center text-white font-bold text-sm">
                M
              </div>
              <span className="font-semibold text-lg">MicrosoftAdmin.in</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Your comprehensive knowledge base for Microsoft 365 administration. 
              Get expert guidance, troubleshooting tips, and best practices.
            </p>
            <div className="space-y-2">
              <h4 className="font-semibold mb-2">Newsletter</h4>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-400"
                />
                <button className="px-4 py-2 bg-ms-blue hover:bg-ms-blue-dark rounded text-white transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/category/outlook" className="hover:text-white transition-colors">Outlook & Exchange</Link></li>
              <li><Link to="/category/teams" className="hover:text-white transition-colors">Teams Administration</Link></li>
              <li><Link to="/category/intune" className="hover:text-white transition-colors">Intune & MDM</Link></li>
              <li><Link to="/category/azure-ad" className="hover:text-white transition-colors">Azure AD & Identity</Link></li>
              <li><Link to="/category/sharepoint" className="hover:text-white transition-colors">OneDrive & SharePoint</Link></li>
              <li><Link to="/category/security" className="hover:text-white transition-colors">Security Portal</Link></li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Site</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 MicrosoftAdmin.in. All rights reserved. Microsoft and Microsoft 365 are trademarks of Microsoft Corporation.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
