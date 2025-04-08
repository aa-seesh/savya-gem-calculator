
import React from 'react';
import { Link } from 'react-router-dom';
import { collections } from '@/data/products';

const CollectionsShowcase: React.FC = () => {
  return (
    <section className="py-12 bg-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif font-bold text-navy-dark mb-2">
            Our Collections
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our thoughtfully curated collections, each telling a unique story through the art of jewelry.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {collections.map((collection, index) => (
            <div 
              key={collection.id} 
              className={`relative overflow-hidden rounded-lg group ${
                index === 0 || index === 3 ? 'md:col-span-2' : 'md:col-span-1'
              }`}
            >
              <div className="aspect-video md:aspect-auto md:h-80 bg-gray-100 overflow-hidden">
                <img 
                  src={collection.image} 
                  alt={collection.name}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <h3 className="text-xl md:text-2xl font-serif font-bold mb-2">
                  {collection.name}
                </h3>
                <p className="mb-4 max-w-md opacity-90">
                  {collection.description}
                </p>
                <Link 
                  to={`/collections/${collection.id}`}
                  className="inline-flex items-center text-gold-light hover:text-gold font-medium transition-colors"
                >
                  View Collection
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="ml-2 h-4 w-4" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M14 5l7 7m0 0l-7 7m7-7H3" 
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionsShowcase;
