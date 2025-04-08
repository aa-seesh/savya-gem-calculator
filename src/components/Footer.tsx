
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-navy text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-serif mb-4">
              <span className="text-gold">Savya</span> Jewellery
            </h3>
            <p className="text-silver-light mb-4">
              Exquisite jewelry crafted with precision and passion. Each piece tells a unique story of elegance and heritage.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-silver-light hover:text-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-silver-light hover:text-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-silver-light hover:text-gold transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-serif mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-silver-light hover:text-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-silver-light hover:text-gold transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/collections" className="text-silver-light hover:text-gold transition-colors">
                  Collections
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-silver-light hover:text-gold transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-silver-light hover:text-gold transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-span-1">
            <h3 className="text-lg font-serif mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-silver-light hover:text-gold transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-silver-light hover:text-gold transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-silver-light hover:text-gold transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-silver-light hover:text-gold transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-silver-light hover:text-gold transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-lg font-serif mb-4">Contact Us</h3>
            <address className="not-italic">
              <p className="mb-2 text-silver-light">123 Jewel Street, Gem City</p>
              <p className="mb-2 text-silver-light">Phone: +1 234 567 8990</p>
              <p className="mb-2 text-silver-light">Email: info@savyajewellery.com</p>
            </address>
            <p className="mt-4 text-silver-light">
              Business Hours: Mon-Sat 10AM-7PM
            </p>
          </div>
        </div>

        <div className="border-t border-navy-light mt-8 pt-8 text-center">
          <p className="text-silver-light">
            &copy; {new Date().getFullYear()} Savya Jewellery. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
