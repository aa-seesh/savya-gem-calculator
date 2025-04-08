
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search } from 'lucide-react';
import { Button } from './ui/button';
import CartDrawer from './CartDrawer';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <header className="bg-white w-full shadow-sm fixed top-0 left-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
          
          {/* Logo */}
          <div className="flex-1 flex justify-center md:justify-start">
            <Link to="/" className="flex items-center">
              <h1 className="text-2xl font-serif font-bold text-navy-dark">
                <span className="text-gold">Savya</span> Jewellery
              </h1>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-navy hover:text-gold-dark transition-colors duration-200">
              Home
            </Link>
            <Link to="/products" className="text-navy hover:text-gold-dark transition-colors duration-200">
              Products
            </Link>
            <Link to="/collections" className="text-navy hover:text-gold-dark transition-colors duration-200">
              Collections
            </Link>
            <Link to="/about" className="text-navy hover:text-gold-dark transition-colors duration-200">
              About
            </Link>
            <Link to="/contact" className="text-navy hover:text-gold-dark transition-colors duration-200">
              Contact
            </Link>
          </nav>
          
          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              aria-label="Search"
            >
              <Search size={20} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              aria-label="User account"
            >
              <User size={20} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleCart}
              aria-label="Shopping cart"
            >
              <ShoppingCart size={20} />
              <span className="absolute top-2 right-2 w-4 h-4 bg-gold rounded-full text-white text-xs flex items-center justify-center">
                0
              </span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden transition-all duration-300 ease-in-out overflow-hidden bg-white",
        isMenuOpen ? "max-h-64" : "max-h-0"
      )}>
        <nav className="flex flex-col space-y-4 py-4 px-8">
          <Link to="/" className="text-navy hover:text-gold-dark transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link to="/products" className="text-navy hover:text-gold-dark transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>
            Products
          </Link>
          <Link to="/collections" className="text-navy hover:text-gold-dark transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>
            Collections
          </Link>
          <Link to="/about" className="text-navy hover:text-gold-dark transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>
            About
          </Link>
          <Link to="/contact" className="text-navy hover:text-gold-dark transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>
            Contact
          </Link>
        </nav>
      </div>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
    </header>
  );
};

export default Navbar;
