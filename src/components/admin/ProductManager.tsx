
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { ImagePlus, X, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
  const [productImages, setProductImages] = useState<string[]>([]);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const { toast } = useToast();

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // In a real implementation, you would upload to a server
    // For now, we'll just create object URLs for preview
    const newImages = Array.from(files).map(file => URL.createObjectURL(file));
    
    setProductImages(prev => [...prev, ...newImages]);
    
    // Set the first uploaded image as main image if none exists
    if (!mainImage && newImages.length > 0) {
      setMainImage(newImages[0]);
    }

    toast({
      title: "Images uploaded",
      description: `${files.length} images have been added to the gallery.`,
    });
  };

  const removeImage = (imageUrl: string) => {
    setProductImages(prev => prev.filter(img => img !== imageUrl));
    
    // If we removed the main image, set a new one or null
    if (mainImage === imageUrl) {
      const remainingImages = productImages.filter(img => img !== imageUrl);
      setMainImage(remainingImages.length > 0 ? remainingImages[0] : null);
    }
  };

  const setAsMainImage = (imageUrl: string) => {
    setMainImage(imageUrl);
    toast({
      title: "Main image updated",
      description: "Selected image has been set as the main product image.",
    });
  };
  
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
              <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                  <DialogDescription>
                    Create a new jewelry product with pricing options and images.
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
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="description" className="text-right mt-2">
                      Description
                    </Label>
                    <Textarea 
                      id="description" 
                      placeholder="Product description" 
                      className="col-span-3 min-h-[120px]" 
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="stock" className="text-right">
                      Stock
                    </Label>
                    <Input id="stock" type="number" placeholder="Quantity available" className="col-span-3" />
                  </div>
                  
                  {/* Product Images Section */}
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label className="text-right mt-2">
                      Product Images
                    </Label>
                    <div className="col-span-3 space-y-4">
                      <div className="flex items-center gap-2">
                        <Input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          className="hidden"
                          id="product-images"
                        />
                        <Label 
                          htmlFor="product-images" 
                          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md cursor-pointer"
                        >
                          <Upload size={20} />
                          <span>Upload Images</span>
                        </Label>
                        <p className="text-sm text-gray-500">
                          You can upload multiple images at once
                        </p>
                      </div>

                      {/* Gallery Preview */}
                      {productImages.length > 0 && (
                        <div>
                          <p className="font-medium mb-2">Gallery ({productImages.length} images)</p>
                          <div className="grid grid-cols-4 gap-4">
                            {productImages.map((img, index) => (
                              <div 
                                key={index} 
                                className={`relative rounded-md overflow-hidden border-2 ${
                                  mainImage === img ? 'border-gold' : 'border-gray-200'
                                }`}
                              >
                                <img 
                                  src={img} 
                                  alt={`Product preview ${index + 1}`} 
                                  className="w-full h-32 object-cover" 
                                />
                                <div className="absolute top-0 right-0 flex space-x-1 m-1">
                                  {mainImage !== img && (
                                    <Button 
                                      size="icon" 
                                      variant="secondary" 
                                      className="h-6 w-6" 
                                      onClick={() => setAsMainImage(img)}
                                      title="Set as main image"
                                    >
                                      <ImagePlus size={14} />
                                    </Button>
                                  )}
                                  <Button 
                                    size="icon" 
                                    variant="destructive" 
                                    className="h-6 w-6" 
                                    onClick={() => removeImage(img)}
                                    title="Remove image"
                                  >
                                    <X size={14} />
                                  </Button>
                                </div>
                                {mainImage === img && (
                                  <div className="absolute bottom-0 left-0 right-0 bg-gold text-white text-xs px-2 py-1 text-center">
                                    Main Image
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
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
