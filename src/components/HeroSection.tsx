
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

const HeroSection: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-cream">
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-gold-light opacity-20"></div>
        <div className="absolute bottom-20 -left-20 h-60 w-60 rounded-full bg-gold-light opacity-20"></div>
      </div>
      
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text content */}
          <div className="z-10 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-navy-dark font-serif mb-4">
              Exquisite Jewelry <br />
              <span className="text-gold">Crafted with Precision</span>
            </h1>
            <p className="text-navy text-lg mb-8 max-w-lg mx-auto md:mx-0">
              Discover our collection of handcrafted jewelry pieces made with the finest materials. 
              Each design tells a unique story of elegance and heritage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button asChild className="bg-gold hover:bg-gold-dark text-white">
                <Link to="/products">Explore Collection</Link>
              </Button>
              <Button asChild variant="outline" className="border-gold text-gold hover:bg-gold-light">
                <Link to="/about">Our Story</Link>
              </Button>
            </div>
          </div>
          
          {/* Hero image */}
          <div className="relative z-10">
            <div className="relative overflow-hidden rounded-lg shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"
                alt="Elegant jewelry collection"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
            
            {/* Floating price tag */}
            <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-4 md:p-6 text-center w-64">
              <div className="text-xs text-muted-foreground mb-1">Starting from</div>
              <div className="text-gold text-2xl font-semibold">₹5,499</div>
              <div className="text-xs text-muted-foreground mt-1">With dynamic pricing</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
