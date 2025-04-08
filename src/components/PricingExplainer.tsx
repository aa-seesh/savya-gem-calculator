
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Calculator, Clock, DollarSign, Scale } from 'lucide-react';

const PricingExplainer: React.FC = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-serif font-bold text-navy-dark mb-4">
              Dynamic Pricing System: <br />
              <span className="text-gold">Fair & Transparent</span>
            </h2>
            <p className="text-muted-foreground mb-6">
              Our innovative pricing system ensures you pay a fair price based on the current market value of materials, weight, and craftsmanship.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold-light flex items-center justify-center mr-4">
                  <Scale className="text-gold" size={24} />
                </div>
                <div>
                  <h3 className="font-medium text-navy-dark mb-1">Material Weight Based</h3>
                  <p className="text-sm text-muted-foreground">
                    Prices adjust according to the exact weight of materials used in your jewelry piece.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold-light flex items-center justify-center mr-4">
                  <Clock className="text-gold" size={24} />
                </div>
                <div>
                  <h3 className="font-medium text-navy-dark mb-1">Real-Time Market Rates</h3>
                  <p className="text-sm text-muted-foreground">
                    Our prices reflect current market values of gold, silver, platinum and precious stones.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold-light flex items-center justify-center mr-4">
                  <Calculator className="text-gold" size={24} />
                </div>
                <div>
                  <h3 className="font-medium text-navy-dark mb-1">Transparent Making Charges</h3>
                  <p className="text-sm text-muted-foreground">
                    Clearly see the craftsmanship charges separate from material costs.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold-light flex items-center justify-center mr-4">
                  <DollarSign className="text-gold" size={24} />
                </div>
                <div>
                  <h3 className="font-medium text-navy-dark mb-1">Price Lock Option</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose between dynamic pricing or lock in today's rate for future purchases.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <Button asChild className="bg-gold hover:bg-gold-dark text-white">
                <Link to="/pricing">Learn More About Our Pricing</Link>
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="Jewelry with dynamic pricing" 
                className="w-full h-auto"
              />
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-6 max-w-xs">
              <div className="mb-3">
                <h4 className="text-navy-dark font-medium mb-1">22K Gold Ring (4.5g)</h4>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Material Cost:</span>
                  <span>₹27,000</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Making Charge (12%):</span>
                  <span>₹3,240</span>
                </div>
                <div className="flex items-center justify-between font-medium mt-2 pt-2 border-t">
                  <span>Total Price:</span>
                  <span className="text-gold">₹30,240</span>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                *Prices updated daily based on market rates
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingExplainer;
