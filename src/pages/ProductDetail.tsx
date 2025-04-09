
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '@/data/products';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageGallery from '@/components/product/ImageGallery';
import ProductInfo from '@/components/product/ProductInfo';
import RelatedProducts from '@/components/product/RelatedProducts';
import Breadcrumbs from '@/components/product/Breadcrumbs';
import LoadingState from '@/components/product/LoadingState';
import ProductNotFound from '@/components/product/NotFound';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  
  useEffect(() => {
    // Simulate API call to fetch product details
    const fetchProduct = () => {
      setLoading(true);
      // Find product in our mock data
      const foundProduct = products.find(p => p.id === id);
      
      if (foundProduct) {
        setProduct(foundProduct);
        
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
  
  return (
    <>
      <Navbar />
      
      {loading ? (
        <LoadingState />
      ) : !product ? (
        <ProductNotFound />
      ) : (
        <div className="container mx-auto px-4 py-8 mt-16">
          <Breadcrumbs productName={product.name} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            {/* Product Images - Left Column */}
            <ImageGallery images={product.images} productName={product.name} />
            
            {/* Product Info - Right Column */}
            <ProductInfo product={product} />
          </div>
          
          {/* Related Products */}
          <RelatedProducts products={relatedProducts} />
        </div>
      )}
      
      <Footer />
    </>
  );
};

export default ProductDetail;
