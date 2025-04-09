
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Check, Heart, Minus, Plus } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { formatCurrency } from '@/lib/helpers';
import { useCart } from '@/hooks/useCart';
import PriceBreakdown from './PriceBreakdown';

interface ProductInfoProps {
  product: any;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>("");
  
  const availableSizes = ["14 inch", "16 inch", "18 inch", "20 inch"];
  
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: quantity,
      weight: product.weight,
      material: product.material,
      makingCharge: product.makingCharge,
    });
  };

  return (
    <div>
      {/* Product name and stock info */}
      <div className="mb-6">
        <h1 className="text-3xl font-serif font-bold text-navy-dark mb-2">
          {product.name}
        </h1>
        
        <div className="flex items-center mt-2">
          <Badge className="bg-green-100 text-green-800 font-normal mr-2">
            <Check className="h-3 w-3 mr-1" /> In Stock
          </Badge>
        </div>
        
        <div className="mt-4">
          <span className="text-2xl font-medium text-gold">
            {formatCurrency(product.price)}
          </span>
        </div>
      </div>
      
      <Separator className="my-6" />
      
      {/* Size Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Necklace Size
        </label>
        <select 
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-gold"
        >
          <option value="">Choose an option</option>
          {availableSizes.map((size) => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>
      
      {/* Quantity */}
      <div className="flex items-center mb-6">
        <label className="block text-sm font-medium mr-4">
          Quantity:
        </label>
        <div className="flex items-center border border-gray-300 rounded-md">
          <button 
            className="px-3 py-1 border-r border-gray-300"
            onClick={decrementQuantity}
            disabled={quantity <= 1}
          >
            <Minus size={16} />
          </button>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-12 text-center border-0 focus:outline-none p-1"
          />
          <button 
            className="px-3 py-1 border-l border-gray-300"
            onClick={incrementQuantity}
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
      
      {/* Add to Cart Button */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <Button 
          className="col-span-3 bg-gold hover:bg-gold-dark text-white"
          size="lg"
          onClick={handleAddToCart}
        >
          Add to cart
        </Button>
        
        <Button 
          variant="outline" 
          className="border-gold text-gold hover:bg-gold-light"
          size="icon"
        >
          <Heart size={20} />
        </Button>
      </div>
      
      {/* Price breakdown trigger */}
      <Sheet>
        <SheetTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full bg-cream text-navy border-cream hover:bg-cream/80 mb-6"
          >
            View Price Breakdown
          </Button>
        </SheetTrigger>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Price Breakdown</SheetTitle>
          </SheetHeader>
          <div className="py-6">
            <PriceBreakdown product={product} />
          </div>
        </SheetContent>
      </Sheet>
    
      {/* Product details */}
      <div className="mb-6 space-y-3">
        <h3 className="text-lg font-medium">Product Details</h3>
        <p className="text-muted-foreground">
          {product.description}
        </p>
        
        <div className="grid grid-cols-2 gap-4 pt-3">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Material</span>
            <span className="font-medium">{formatMaterialName(product.material)}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Weight</span>
            <span className="font-medium">{product.weight} grams</span>
          </div>
          {product.purity && (
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Purity</span>
              <span className="font-medium">{product.purity}</span>
            </div>
          )}
          {product.dimensions && (
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Dimensions</span>
              <span className="font-medium">{product.dimensions}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Format material name for display
const formatMaterialName = (material: string) => {
  return material.charAt(0).toUpperCase() + 
    material.slice(1).replace('-', ' ');
};

export default ProductInfo;
