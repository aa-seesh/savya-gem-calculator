
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
  Info
} from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { products } from '@/data/products';
import { formatCurrency, calculateJewelryPrice, getMaterialBasePrice } from '@/lib/helpers';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from '@/components/ui/separator';
import ProductCard from '@/components/ProductCard';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [useDynamicPricing, setUseDynamicPricing] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  
  // For dynamic pricing calculation
  const [materialBasePrice, setMaterialBasePrice] = useState(0);
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  
  useEffect(() => {
    // Simulate API call to fetch product details
    const fetchProduct = () => {
      setLoading(true);
      // Find product in our mock data
      const foundProduct = products.find(p => p.id === id);
      
      if (foundProduct) {
        setProduct(foundProduct);
        setCurrentImage(foundProduct.images[0]);
        setUseDynamicPricing(foundProduct.isDynamicPricing);
        
        // Get base price for the material
        const basePrice = getMaterialBasePrice(foundProduct.material);
        setMaterialBasePrice(basePrice);
        
        // Find related products (same category or collection)
        const related = products
          .filter(p => 
            p.id !== foundProduct.id && 
            (p.category === foundProduct.category || p.collection === foundProduct.collection)
          )
          .slice(0, 4);
        
        setRelatedProducts(related);
      }
      
      setLoading(false);
    };
    
    fetchProduct();
  }, [id]);
  
  useEffect(() => {
    if (product && useDynamicPricing) {
      // Calculate price based on material, weight, and making charge
      const price = calculateJewelryPrice(
        materialBasePrice,
        product.weight,
        product.makingCharge,
        product.isMakingChargePercentage
      );
      
      setCalculatedPrice(price);
    } else if (product) {
      setCalculatedPrice(product.price);
    }
  }, [product, useDynamicPricing, materialBasePrice]);
  
  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart({
      id: product.id,
      name: product.name,
      price: calculatedPrice,
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
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-24 mt-20">
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
    );
  }
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-24 mt-20 text-center">
        <h2 className="text-2xl font-semibold mb-4">Product Not Found</h2>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/products">Back to Products</Link>
        </Button>
      </div>
    );
  }
  
  // Format material name for display
  const materialName = product.material.charAt(0).toUpperCase() + 
    product.material.slice(1).replace('-', ' ');
  
  // Calculate making charge amount
  const makingChargeAmount = product.isMakingChargePercentage 
    ? (materialBasePrice * product.weight * (product.makingCharge / 100))
    : product.makingCharge;
  
  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      {/* Breadcrumbs */}
      <nav className="flex mb-6 items-center text-sm">
        <Link to="/" className="text-muted-foreground hover:text-navy-dark">Home</Link>
        <ChevronRight className="mx-2 h-4 w-4 text-muted-foreground" />
        <Link to="/products" className="text-muted-foreground hover:text-navy-dark">Products</Link>
        <ChevronRight className="mx-2 h-4 w-4 text-muted-foreground" />
        <span className="text-navy-dark">{product.name}</span>
      </nav>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img 
              src={currentImage} 
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image: string, index: number) => (
              <button
                key={index}
                onClick={() => setCurrentImage(image)}
                className={`
                  aspect-square rounded-md overflow-hidden border-2 
                  ${currentImage === image ? 'border-gold' : 'border-transparent'}
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
        </div>
        
        {/* Product Info */}
        <div>
          {product.isNew && (
            <div className="inline-block bg-gold text-white text-xs font-medium px-2.5 py-1 rounded mb-2">
              New Arrival
            </div>
          )}
          
          <h1 className="text-3xl font-serif font-bold text-navy-dark mb-2">
            {product.name}
          </h1>
          
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-sm text-muted-foreground">Material:</span>
              <span className="font-medium">{materialName}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Weight:</span>
              <span className="font-medium">{product.weight} grams</span>
            </div>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-600">
              {product.description}
            </p>
          </div>
          
          {/* Pricing Options */}
          <div className="mb-6">
            {product.isDynamicPricing && (
              <div className="mb-4">
                <RadioGroup 
                  defaultValue={useDynamicPricing ? "dynamic" : "fixed"}
                  onValueChange={(value) => setUseDynamicPricing(value === "dynamic")}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dynamic" id="dynamic" />
                    <Label htmlFor="dynamic">Dynamic Pricing</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fixed" id="fixed" />
                    <Label htmlFor="fixed">Fixed Price</Label>
                  </div>
                </RadioGroup>
              </div>
            )}
            
            <div className="bg-cream rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xl font-semibold text-gold">
                  {formatCurrency(calculatedPrice)}
                </span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Info size={16} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Current market rate used for pricing</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              {useDynamicPricing && product.isDynamicPricing && (
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Material Cost ({materialName}, {product.weight}g):</span>
                    <span>{formatCurrency(materialBasePrice * product.weight)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Making Charge ({product.isMakingChargePercentage ? `${product.makingCharge}%` : 'Fixed'}):
                    </span>
                    <span>{formatCurrency(makingChargeAmount)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Quantity & Add to Cart */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center border rounded-md">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={decrementQuantity} 
                disabled={quantity <= 1}
                className="h-10 w-10"
              >
                <Minus size={16} />
              </Button>
              <Input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-14 h-10 text-center border-0"
              />
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={incrementQuantity}
                className="h-10 w-10"
              >
                <Plus size={16} />
              </Button>
            </div>
            
            <Button 
              className="flex-1 bg-gold hover:bg-gold-dark text-white"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="border-gold text-gold hover:bg-gold-light"
            >
              <Heart size={18} />
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="border-gold text-gold hover:bg-gold-light"
            >
              <Share2 size={18} />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Product Details Tabs */}
      <Tabs defaultValue="details" className="mb-12">
        <TabsList className="w-full border-b">
          <TabsTrigger value="details">Product Details</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="care">Care Instructions</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="py-4">
          <div className="prose max-w-none">
            <p>{product.description}</p>
            <p>
              Each piece in our collection is meticulously crafted by skilled artisans with decades of experience in traditional jewelry making techniques, combined with modern design sensibilities.
            </p>
            <p>
              This {product.name.toLowerCase()} showcases our commitment to quality and attention to detail, making it a perfect addition to your jewelry collection or a thoughtful gift for someone special.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="specifications" className="py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Materials</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Primary Material:</span>
                  <span>{materialName}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Weight:</span>
                  <span>{product.weight} grams</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Purity:</span>
                  <span>
                    {product.material.includes('gold-22k') 
                      ? '22K (91.6%)' 
                      : product.material.includes('gold-18k')
                        ? '18K (75.0%)'
                        : product.material.includes('silver')
                          ? '925 Sterling Silver'
                          : 'High Quality'}
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Dimensions & Details</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Making Technique:</span>
                  <span>Hand Crafted</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Finish:</span>
                  <span>Polished</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Hallmarked:</span>
                  <span>Yes</span>
                </li>
              </ul>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="care" className="py-4">
          <div className="prose max-w-none">
            <h3>Jewelry Care Guidelines</h3>
            <ul>
              <li>Store your jewelry in a clean, dry place.</li>
              <li>Keep your jewelry away from chemicals, including household cleaners.</li>
              <li>Remove your jewelry before swimming, bathing, or engaging in physical activities.</li>
              <li>Clean gold jewelry with a solution of warm water and mild soap.</li>
              <li>Gently polish with a jewelry cloth to maintain its shine.</li>
              <li>Have your jewelry professionally cleaned and inspected periodically.</li>
            </ul>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-serif font-bold text-navy-dark mb-6">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(relatedProduct => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
