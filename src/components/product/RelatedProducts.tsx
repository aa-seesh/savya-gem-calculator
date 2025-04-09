
import React from 'react';
import ProductCard from '@/components/ProductCard';

interface RelatedProductsProps {
  products: any[];
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products }) => {
  if (products.length === 0) return null;
  
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-serif font-bold text-navy-dark mb-6">
        You May Also Like
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
