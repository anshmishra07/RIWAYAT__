import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#181e29] text-gray-200 pt-12 pb-4 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-8 border-b border-gray-700">
          {/* About */}
          <div>
            <h2 className="text-2xl font-bold mb-3 text-white">Riwayat</h2>
            <p className="text-gray-400 text-base max-w-xs">
              Preserving and promoting India's rich cultural heritage through technology and community.
            </p>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-3 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-orange-400 transition-colors">About Us</Link></li>
              <li><a href="mailto:info@riwayat.com" className="hover:text-orange-400 transition-colors">Contact</a></li>
              <li><Link to="/careers" className="hover:text-orange-400 transition-colors">Careers</Link></li>
              <li><Link to="/press" className="hover:text-orange-400 transition-colors">Press</Link></li>
            </ul>
          </div>
          {/* Support */}
          <div>
            <h3 className="font-semibold text-lg mb-3 text-white">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/help" className="hover:text-orange-400 transition-colors">Help Center</Link></li>
              <li><Link to="/safety" className="hover:text-orange-400 transition-colors">Safety Center</Link></li>
              <li><Link to="/guidelines" className="hover:text-orange-400 transition-colors">Community Guidelines</Link></li>
            </ul>
          </div>
          {/* Connect With Us */}
          <div>
            <h3 className="font-semibold text-lg mb-3 text-white">Connect With Us</h3>
            <div className="flex space-x-5 text-2xl mt-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-orange-400"><FaFacebookF /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-orange-400"><FaTwitter /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-orange-400"><FaInstagram /></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-orange-400"><FaYoutube /></a>
            </div>
          </div>
        </div>
        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 text-sm text-gray-400">
          <div className="mb-2 md:mb-0">© {new Date().getFullYear()} Riwayat. All rights reserved.</div>
          <div className="flex space-x-6">
            <Link to="/privacy" className="hover:text-orange-400">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-orange-400">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-orange-400">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 