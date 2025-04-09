
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
  Info,
  Truck,
  RotateCcw,
  Shield
} from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { products } from '@/data/products';
import { formatCurrency } from '@/lib/helpers';
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
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  
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
  
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-10">
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
            <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden border">
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
            
            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Truck className="h-6 w-6 text-gold" />
                </div>
                <p className="text-xs font-medium">Free Shipping</p>
                <p className="text-xs text-muted-foreground">On all orders</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <RotateCcw className="h-6 w-6 text-gold" />
                </div>
                <p className="text-xs font-medium">30-Day Returns</p>
                <p className="text-xs text-muted-foreground">Hassle-free</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Shield className="h-6 w-6 text-gold" />
                </div>
                <p className="text-xs font-medium">Lifetime Warranty</p>
                <p className="text-xs text-muted-foreground">Certificate included</p>
              </div>
            </div>
          </div>
          
          {/* Product Info - Right Column */}
          <div>
            {/* New tag and product name */}
            <div className="mb-4">
              {product.isNew && (
                <Badge className="mb-2 bg-gold hover:bg-gold-dark text-white">
                  New Arrival
                </Badge>
              )}
              
              <h1 className="text-3xl font-serif font-bold text-navy-dark mb-2">
                {product.name}
              </h1>
              
              <p className="text-lg font-medium text-gold mb-4">
                {formatCurrency(product.price)}
              </p>
            </div>
            
            {/* Short description */}
            <div className="mb-6">
              <p className="text-muted-foreground">
                {product.description}
              </p>
            </div>
            
            <Separator className="my-6" />
            
            {/* Product details */}
            <div className="mb-6 grid grid-cols-2 gap-4">
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
            
            <Separator className="my-6" />
            
            {/* Quantity & Add to Cart */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium">Quantity:</span>
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
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="w-full bg-gold hover:bg-gold-dark text-white"
                  size="lg"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full border-gold text-gold hover:bg-gold-light"
                  size="lg"
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Add to Wishlist
                </Button>
              </div>
              
              <Button 
                variant="ghost" 
                className="w-full text-muted-foreground"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share this Product
              </Button>
            </div>
          </div>
        </div>
        
        {/* Product Details Tabs */}
        <Card className="mb-16">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="w-full grid grid-cols-3 rounded-none">
              <TabsTrigger value="details">Product Details</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="care">Care Instructions</TabsTrigger>
            </TabsList>
            <CardContent className="pt-6">
              <TabsContent value="details" className="prose max-w-none">
                <h3 className="text-lg font-semibold mb-4">About this Design</h3>
                <p>{product.description}</p>
                <p>
                  Each piece in our collection is meticulously crafted by skilled artisans with decades of experience in traditional jewelry making techniques, combined with modern design sensibilities.
                </p>
                <p>
                  This {product.name.toLowerCase()} showcases our commitment to quality and attention to detail, making it a perfect addition to your jewelry collection or a thoughtful gift for someone special.
                </p>
              </TabsContent>
              <TabsContent value="specifications">
                <h3 className="text-lg font-semibold mb-4">Technical Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Materials</h4>
                    <ul className="space-y-3">
                      <li className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Primary Material:</span>
                        <span className="font-medium">{materialName}</span>
                      </li>
                      <li className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Weight:</span>
                        <span className="font-medium">{product.weight} grams</span>
                      </li>
                      <li className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Purity:</span>
                        <span className="font-medium">
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
                    <h4 className="font-medium mb-3">Dimensions & Details</h4>
                    <ul className="space-y-3">
                      <li className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Making Technique:</span>
                        <span className="font-medium">Hand Crafted</span>
                      </li>
                      <li className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Finish:</span>
                        <span className="font-medium">Polished</span>
                      </li>
                      <li className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Hallmarked:</span>
                        <span className="font-medium">Yes</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="care">
                <h3 className="text-lg font-semibold mb-4">Jewelry Care Guidelines</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-cream rounded-lg p-4">
                      <h4 className="font-medium mb-2">Daily Care</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Store your jewelry in a clean, dry place separate from other pieces.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Remove your jewelry before swimming, bathing, or using household cleaners.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Put your jewelry on after applying perfume, cosmetics, and hairspray.</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-cream rounded-lg p-4">
                      <h4 className="font-medium mb-2">Cleaning</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Clean gold and platinum jewelry with a solution of warm water and mild soap.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Gently polish with a soft jewelry cloth to maintain its shine.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Have your jewelry professionally cleaned and inspected annually.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
        
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

export default ProductDetail;
