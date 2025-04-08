
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ProductTable from './products/ProductTable';
import AddProductDialog from './products/AddProductDialog';
import { useMockProducts } from './products/useMockProducts';

const ProductManager: React.FC = () => {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const { filteredProducts, searchTerm, setSearchTerm } = useMockProducts();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Products</CardTitle>
              <CardDescription>Manage your jewelry products</CardDescription>
            </div>
            <Button
              className="bg-gold hover:bg-gold-dark text-white"
              onClick={() => setIsAddProductOpen(true)}
            >
              Add New Product
            </Button>
            <AddProductDialog 
              isOpen={isAddProductOpen} 
              onOpenChange={setIsAddProductOpen} 
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <ProductTable products={filteredProducts} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductManager;
