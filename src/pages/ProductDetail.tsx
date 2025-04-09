
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  ChevronRight,
  Minus,
  Plus,
  Check,
  Search,
  X
} from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { products } from '@/data/products';
import { formatCurrency } from '@/lib/helpers';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getMaterialBasePrice } from '@/lib/helpers';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [openImageDialog, setOpenImageDialog] = useState(false);
  
  useEffect(() => {
    // Simulate API call to fetch product details
    const fetchProduct = () => {
      setLoading(true);
      // Find product in our mock data
      const foundProduct = products.find(p => p.id === id);
      
      if (foundProduct) {
        setProduct(foundProduct);
        setCurrentImage(foundProduct.images[0]);
        
        // Find related products (same category or collection)
        const related = products
          .filter(p => 
            p.id !== foundProduct.id && 
            (p.category === foundProduct.category || p.collection === foundProduct.collection)
          )
          .slice(0, 3); // Limit to 3 related products
        
        setRelatedProducts(related);
      }
      
      setLoading(false);
    };
    
    fetchProduct();
  }, [id]);
  
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
  
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  // Format material name for display
  const formatMaterialName = (material: string) => {
    return material.charAt(0).toUpperCase() + 
      material.slice(1).replace('-', ' ');
  };
  
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-24 mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-square bg-gray-100 shimmer rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 w-3/4 bg-gray-100 shimmer rounded"></div>
              <div className="h-6 w-1/4 bg-gray-100 shimmer rounded"></div>
              <div className="h-4 w-full bg-gray-100 shimmer rounded"></div>
              <div className="h-4 w-full bg-gray-100 shimmer rounded"></div>
              <div className="h-4 w-3/4 bg-gray-100 shimmer rounded"></div>
              <div className="h-10 w-1/3 bg-gray-100 shimmer rounded"></div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  
  if (!product) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-24 mt-10 text-center">
          <h2 className="text-2xl font-semibold mb-4">Product Not Found</h2>
          <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/products">Back to Products</Link>
          </Button>
        </div>
        <Footer />
      </>
    );
  }

  const materialName = formatMaterialName(product.material);
  const availableSizes = ["14 inch", "16 inch", "18 inch", "20 inch"];
  
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-16">
        {/* Breadcrumbs */}
        <nav className="flex mb-6 items-center text-sm">
          <Link to="/" className="text-muted-foreground hover:text-navy-dark">Home</Link>
          <ChevronRight className="mx-2 h-4 w-4 text-muted-foreground" />
          <Link to="/products" className="text-muted-foreground hover:text-navy-dark">Products</Link>
          <ChevronRight className="mx-2 h-4 w-4 text-muted-foreground" />
          <span className="text-navy-dark">{product.name}</span>
        </nav>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Product Images - Left Column */}
          <div className="space-y-4">
            <div 
              className="aspect-square bg-cream rounded-lg overflow-hidden border cursor-pointer"
              onClick={() => setOpenImageDialog(true)}
            >
              <img 
                src={currentImage} 
                alt={product.name}
                className="w-full h-full object-contain object-center p-4"
              />
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(image)}
                  className={`
                    aspect-square rounded-md overflow-hidden border-2 
                    ${currentImage === image ? 'border-gold shadow-md' : 'border-gray-200'}
                  `}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover object-center"
                  />
                </button>
              ))}
            </div>

            {/* Fullscreen Image Dialog */}
            <Dialog open={openImageDialog} onOpenChange={setOpenImageDialog}>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>{product.name}</DialogTitle>
                </DialogHeader>
                <div className="relative aspect-square">
                  <img 
                    src={currentImage} 
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="grid grid-cols-6 gap-2 mt-4">
                  {product.images.map((image: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(image)}
                      className={`
                        aspect-square rounded-md overflow-hidden border-2 
                        ${currentImage === image ? 'border-gold shadow-md' : 'border-gray-200'}
                      `}
                    >
                      <img 
                        src={image} 
                        alt={`${product.name} view ${index + 1}`}
                        className="w-full h-full object-cover object-center"
                      />
                    </button>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
          
          {/* Product Info - Right Column */}
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
                  <span className="font-medium">{materialName}</span>
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
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-serif font-bold text-navy-dark mb-6">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map(relatedProduct => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

// Price Breakdown Component
const PriceBreakdown: React.FC<{ product: any }> = ({ product }) => {
  const materialPrice = getMaterialBasePrice(product.material);
  const isFlatRate = !product.makingCharge || !product.weight;
  
  // Material cost calculation
  let materialCost = 0;
  let makingChargeCost = 0;
  
  if (!isFlatRate) {
    materialCost = materialPrice * product.weight;
    if (typeof product.makingCharge === 'number') {
      // Check if making charge is a percentage or flat
      if (product.makingChargeType === 'percentage') {
        makingChargeCost = materialCost * (product.makingCharge / 100);
      } else {
        makingChargeCost = product.makingCharge;
      }
    }
  }
  
  return (
    <div className="space-y-6">
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-navy">Description</th>
              <th className="px-4 py-3 text-right font-medium text-navy">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {isFlatRate ? (
              <tr>
                <td className="px-4 py-3">Fixed Price</td>
                <td className="px-4 py-3 text-right">{formatCurrency(product.price)}</td>
              </tr>
            ) : (
              <>
                <tr>
                  <td className="px-4 py-3">
                    Material Cost ({formatMaterialName(product.material)})
                    <div className="text-xs text-muted-foreground">
                      ₹{materialPrice}/gram × {product.weight} grams
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">{formatCurrency(materialCost)}</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">
                    Making Charge
                    <div className="text-xs text-muted-foreground">
                      {product.makingChargeType === 'percentage' 
                        ? `${product.makingCharge}% of material cost` 
                        : 'Fixed charge'}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">{formatCurrency(makingChargeCost)}</td>
                </tr>
              </>
            )}
            <tr className="bg-cream">
              <td className="px-4 py-3 font-medium">Total</td>
              <td className="px-4 py-3 text-right font-medium">{formatCurrency(product.price)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="text-sm text-muted-foreground">
        <h4 className="font-medium text-navy mb-2">Note:</h4>
        <p>
          The final price may include additional components like GST, certifications, 
          and hallmarking charges. Price displayed is inclusive of all taxes.
        </p>
      </div>
    </div>
  );
};

export default ProductDetail;
