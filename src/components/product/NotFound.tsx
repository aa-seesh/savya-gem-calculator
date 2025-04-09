
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ProductNotFound: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-24 mt-10 text-center">
      <h2 className="text-2xl font-semibold mb-4">Product Not Found</h2>
      <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
      <Button asChild>
        <Link to="/products">Back to Products</Link>
      </Button>
    </div>
  );
};

export default ProductNotFound;
