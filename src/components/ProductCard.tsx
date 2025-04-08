
import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '@/lib/helpers';
import { Button } from './ui/button';
import { Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
      weight: product.weight,
      material: product.material,
      makingCharge: product.makingCharge,
    });
  };

  return (
    <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white">
      {product.isNew && (
        <span className="absolute top-2 left-2 z-10 rounded-full bg-gold px-2 py-1 text-xs text-white font-medium">
          New
        </span>
      )}
      
      {/* Image with hover effect */}
      <div className="aspect-square overflow-hidden bg-gray-100">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      </div>
      
      {/* Quick actions */}
      <div className="absolute right-2 top-2 flex flex-col space-y-2 opacity-0 transition-opacity group-hover:opacity-100">
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full shadow-md"
          aria-label="Add to wishlist"
        >
          <Heart size={16} />
        </Button>
      </div>
      
      {/* Product details */}
      <div className="p-4">
        <Link 
          to={`/product/${product.id}`}
          className="block"
        >
          <h3 className="text-sm font-medium text-gray-900 font-serif">
            {product.name}
          </h3>
          <p className="mt-1 text-xs text-gray-500">
            {product.material.charAt(0).toUpperCase() + product.material.slice(1).replace('-', ' ')}
          </p>
          <p className="mt-2 font-semibold text-gold">
            {formatCurrency(product.price)}
          </p>
        </Link>
        
        <div className="mt-3">
          <Button 
            className="w-full bg-gold hover:bg-gold-dark text-white"
            size="sm"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
