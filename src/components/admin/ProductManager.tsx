
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const mockProducts = [
  { id: 1, name: 'Gold Chain Necklace', sku: 'GCN-001', price: '₹24,500', stock: 5, status: 'Active' },
  { id: 2, name: 'Diamond Stud Earrings', sku: 'DSE-045', price: '₹18,200', stock: 3, status: 'Active' },
  { id: 3, name: 'Silver Anklet', sku: 'SA-102', price: '₹2,800', stock: 12, status: 'Active' },
  { id: 4, name: 'Platinum Wedding Band', sku: 'PWB-033', price: '₹35,000', stock: 8, status: 'Active' },
  { id: 5, name: 'Gold Bangles Set', sku: 'GBS-078', price: '₹42,600', stock: 6, status: 'Inactive' },
];

const ProductManager: React.FC = () => {
  const [products, setProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isDynamicPricing, setIsDynamicPricing] = useState(false);

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Products</CardTitle>
              <CardDescription>Manage your jewelry products</CardDescription>
            </div>
            <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gold hover:bg-gold-dark text-white">Add New Product</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                  <DialogDescription>
                    Create a new jewelry product with pricing options.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input id="name" placeholder="Product name" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="sku" className="text-right">
                      SKU
                    </Label>
                    <Input id="sku" placeholder="Unique product code" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Input id="description" placeholder="Product description" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="stock" className="text-right">
                      Stock
                    </Label>
                    <Input id="stock" type="number" placeholder="Quantity available" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <div className="text-right">
                      <Label>Pricing Type</Label>
                    </div>
                    <div className="col-span-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="dynamic-pricing" checked={isDynamicPricing} onCheckedChange={(checked) => setIsDynamicPricing(checked as boolean)} />
                        <label htmlFor="dynamic-pricing" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Use Dynamic Pricing
                        </label>
                      </div>
                    </div>
                  </div>
                  {isDynamicPricing ? (
                    <>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="material" className="text-right">
                          Material
                        </Label>
                        <Input id="material" placeholder="Gold 22K" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="weight" className="text-right">
                          Weight (g)
                        </Label>
                        <Input id="weight" type="number" placeholder="10" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="making-charge" className="text-right">
                          Making Charge (₹)
                        </Label>
                        <Input id="making-charge" type="number" placeholder="1000" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">
                          Calculated Price
                        </Label>
                        <div className="col-span-3 font-bold">₹61,000</div>
                      </div>
                    </>
                  ) : (
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="price" className="text-right">
                        Price (₹)
                      </Label>
                      <Input id="price" placeholder="25000" className="col-span-3" />
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button type="submit" className="bg-gold hover:bg-gold-dark text-white">Save Product</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.sku}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${product.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {product.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm" className="text-red-600">Delete</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductManager;
