
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

const CallToAction: React.FC = () => {
  return (
    <section className="py-16 bg-navy text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Experience the Elegance of <span className="text-gold">Savya Jewellery</span>
          </h2>
          <p className="text-silver-light mb-8 text-lg">
            From timeless classics to contemporary designs, discover jewelry that reflects your unique style. 
            With our transparent pricing, you'll always know the true value of your purchase.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-gold hover:bg-gold-dark text-white">
              <Link to="/products">Shop Collection</Link>
            </Button>
            <Button asChild variant="outline" className="border-gold text-gold hover:bg-navy-light">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
