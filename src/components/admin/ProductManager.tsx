
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { ImagePlus, X, Upload, ChevronDown, PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { calculateJewelryPrice, formatCurrency } from '@/lib/helpers';

// Mock data
const mockProducts = [
  { id: 1, name: 'Gold Chain Necklace', sku: 'GCN-001', price: '₹24,500', stock: 5, status: 'Active', type: 'Simple' },
  { id: 2, name: 'Diamond Stud Earrings', sku: 'DSE-045', price: '₹18,200', stock: 3, status: 'Active', type: 'Variable' },
  { id: 3, name: 'Silver Anklet', sku: 'SA-102', price: '₹2,800', stock: 12, status: 'Active', type: 'Simple' },
  { id: 4, name: 'Platinum Wedding Band', sku: 'PWB-033', price: '₹35,000', stock: 8, status: 'Active', type: 'Variable' },
  { id: 5, name: 'Gold Bangles Set', sku: 'GBS-078', price: '₹42,600', stock: 6, status: 'Inactive', type: 'Simple' },
];

const mockCategories = [
  { id: 1, name: 'Necklaces' },
  { id: 2, name: 'Earrings' },
  { id: 3, name: 'Rings' },
  { id: 4, name: 'Bangles' },
  { id: 5, name: 'Bracelets' },
];

const mockAttributes = [
  { id: 1, name: 'Size', values: ['Small', 'Medium', 'Large'] },
  { id: 2, name: 'Color', values: ['Gold', 'Silver', 'Rose Gold'] },
  { id: 3, name: 'Material', values: ['22K Gold', '18K Gold', 'Silver'] },
  { id: 4, name: 'Style', values: ['Traditional', 'Modern', 'Fusion'] },
];

const mockMaterials = [
  { id: 1, name: 'Gold 24K', pricePerGram: 6500 },
  { id: 2, name: 'Gold 22K', pricePerGram: 6000 },
  { id: 3, name: 'Gold 18K', pricePerGram: 5000 },
  { id: 4, name: 'Silver', pricePerGram: 80 },
  { id: 5, name: 'Platinum', pricePerGram: 3500 },
  { id: 6, name: 'Diamond', pricePerCarat: 50000 },
];

interface Variant {
  id: string;
  attributes: Record<string, string>;
  sku: string;
  price: string;
  stock: number;
  isDynamicPricing: boolean;
  materialId?: number;
  weight?: number;
  makingCharge?: number;
}

interface SelectedAttribute {
  id: number;
  name: string;
  values: string[];
  selectedValues: string[];
}

const ProductManager: React.FC = () => {
  const [products, setProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [productType, setProductType] = useState<'simple' | 'variable'>('simple');
  const [isDynamicPricing, setIsDynamicPricing] = useState(false);
  const [productImages, setProductImages] = useState<string[]>([]);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedMaterial, setSelectedMaterial] = useState<string>('');
  const [weight, setWeight] = useState<number>(0);
  const [makingCharge, setMakingCharge] = useState<number>(0);
  const [selectedAttributes, setSelectedAttributes] = useState<SelectedAttribute[]>([]);
  const [variants, setVariants] = useState<Variant[]>([]);
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

  const toggleCategorySelection = (categoryId: number) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleAttributeSelection = (attributeId: number) => {
    const isSelected = selectedAttributes.some(attr => attr.id === attributeId);
    
    if (isSelected) {
      setSelectedAttributes(prev => prev.filter(attr => attr.id !== attributeId));
    } else {
      const attribute = mockAttributes.find(attr => attr.id === attributeId);
      if (attribute) {
        setSelectedAttributes(prev => [
          ...prev,
          { id: attribute.id, name: attribute.name, values: attribute.values, selectedValues: [] }
        ]);
      }
    }
  };

  const toggleAttributeValueSelection = (attributeId: number, value: string) => {
    setSelectedAttributes(prev => prev.map(attr => {
      if (attr.id === attributeId) {
        const isValueSelected = attr.selectedValues.includes(value);
        return {
          ...attr,
          selectedValues: isValueSelected
            ? attr.selectedValues.filter(v => v !== value)
            : [...attr.selectedValues, value]
        };
      }
      return attr;
    }));
  };

  const generateVariations = () => {
    // Only use attributes with selected values
    const activeAttributes = selectedAttributes.filter(attr => attr.selectedValues.length > 0);
    
    if (activeAttributes.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one attribute value to generate variations.",
        variant: "destructive"
      });
      return;
    }

    // Function to recursively generate combinations
    const generateCombinations = (
      attributes: SelectedAttribute[],
      current: Record<string, string> = {},
      index: number = 0
    ): Record<string, string>[] => {
      if (index === attributes.length) {
        return [current];
      }

      const attribute = attributes[index];
      const combinations: Record<string, string>[] = [];

      for (const value of attribute.selectedValues) {
        const newCombination = {
          ...current,
          [attribute.name]: value
        };
        combinations.push(...generateCombinations(attributes, newCombination, index + 1));
      }

      return combinations;
    };

    const attributeCombinations = generateCombinations(activeAttributes);
    
    // Create variants from combinations
    const newVariants = attributeCombinations.map((combination, index) => ({
      id: `variant-${Date.now()}-${index}`,
      attributes: combination,
      sku: `SKU-${index + 1}`,
      price: '',
      stock: 1,
      isDynamicPricing: false,
      materialId: undefined,
      weight: undefined,
      makingCharge: undefined
    }));

    setVariants(newVariants);
    
    toast({
      title: "Variations generated",
      description: `${newVariants.length} variations have been created.`,
    });
  };

  const calculateDynamicPrice = (materialId: number, weight: number, makingCharge: number): string => {
    const material = mockMaterials.find(m => m.id === materialId);
    if (!material) return "N/A";
    
    const price = calculateJewelryPrice(
      material.pricePerGram || material.pricePerCarat || 0,
      weight,
      makingCharge
    );
    
    return formatCurrency(price);
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
              <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                  <DialogDescription>
                    Create a new jewelry product with pricing options and images.
                  </DialogDescription>
                </DialogHeader>
                
                <Tabs defaultValue="general" className="mt-4">
                  <TabsList className="grid grid-cols-4 mb-4">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="pricing">Pricing</TabsTrigger>
                    <TabsTrigger value="images">Images</TabsTrigger>
                    <TabsTrigger value="variations" disabled={productType !== 'variable'}>Variations</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="general" className="space-y-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="product-type" className="text-right">
                        Product Type
                      </Label>
                      <div className="col-span-3">
                        <Select onValueChange={(value) => setProductType(value as 'simple' | 'variable')}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose product type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="simple">Simple Product</SelectItem>
                            <SelectItem value="variable">Variable Product</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
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
                    
                    <div className="grid grid-cols-4 items-start gap-4">
                      <Label htmlFor="categories" className="text-right mt-2">
                        Categories
                      </Label>
                      <div className="col-span-3 grid grid-cols-2 gap-2">
                        {mockCategories.map((category) => (
                          <div key={category.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`category-${category.id}`}
                              checked={selectedCategories.includes(category.id)}
                              onCheckedChange={() => toggleCategorySelection(category.id)}
                            />
                            <label 
                              htmlFor={`category-${category.id}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {category.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {productType === 'variable' && (
                      <div className="grid grid-cols-4 items-start gap-4">
                        <Label htmlFor="attributes" className="text-right mt-2">
                          Attributes
                        </Label>
                        <div className="col-span-3 space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            {mockAttributes.map((attribute) => (
                              <div key={attribute.id} className="flex items-center space-x-2">
                                <Checkbox 
                                  id={`attribute-${attribute.id}`}
                                  checked={selectedAttributes.some(attr => attr.id === attribute.id)}
                                  onCheckedChange={() => toggleAttributeSelection(attribute.id)}
                                />
                                <label 
                                  htmlFor={`attribute-${attribute.id}`}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {attribute.name}
                                </label>
                              </div>
                            ))}
                          </div>
                          
                          {selectedAttributes.length > 0 && (
                            <div className="space-y-4 mt-4 p-4 border rounded-md">
                              <h4 className="font-medium">Configure Attribute Values</h4>
                              {selectedAttributes.map((attribute) => (
                                <div key={attribute.id} className="space-y-2">
                                  <h5 className="text-sm font-medium">{attribute.name}</h5>
                                  <div className="flex flex-wrap gap-2">
                                    {attribute.values.map((value) => (
                                      <div 
                                        key={value} 
                                        className={`px-3 py-1 rounded text-sm cursor-pointer ${
                                          attribute.selectedValues.includes(value)
                                            ? 'bg-gold text-white'
                                            : 'bg-gray-100 hover:bg-gray-200'
                                        }`}
                                        onClick={() => toggleAttributeValueSelection(attribute.id, value)}
                                      >
                                        {value}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {productType === 'simple' && (
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="stock" className="text-right">
                          Stock
                        </Label>
                        <Input id="stock" type="number" placeholder="Quantity available" className="col-span-3" />
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="pricing" className="space-y-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <div className="text-right">
                        <Label>Pricing Type</Label>
                      </div>
                      <div className="col-span-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="dynamic-pricing" 
                            checked={isDynamicPricing} 
                            onCheckedChange={(checked) => setIsDynamicPricing(checked as boolean)} 
                          />
                          <label 
                            htmlFor="dynamic-pricing" 
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Use Dynamic Pricing
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    {productType === 'simple' && (
                      isDynamicPricing ? (
                        <>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="material" className="text-right">
                              Material
                            </Label>
                            <div className="col-span-3">
                              <Select onValueChange={setSelectedMaterial}>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select material" />
                                </SelectTrigger>
                                <SelectContent>
                                  {mockMaterials.map((material) => (
                                    <SelectItem 
                                      key={material.id} 
                                      value={material.id.toString()}
                                    >
                                      {material.name} - {material.pricePerGram 
                                        ? `₹${material.pricePerGram}/g` 
                                        : `₹${material.pricePerCarat}/ct`}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="weight" className="text-right">
                              Weight (g)
                            </Label>
                            <Input 
                              id="weight" 
                              type="number" 
                              placeholder="10" 
                              className="col-span-3"
                              value={weight || ''}
                              onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                            />
                          </div>
                          
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="making-charge" className="text-right">
                              Making Charge (₹)
                            </Label>
                            <Input 
                              id="making-charge" 
                              type="number" 
                              placeholder="1000" 
                              className="col-span-3"
                              value={makingCharge || ''}
                              onChange={(e) => setMakingCharge(parseFloat(e.target.value) || 0)}
                            />
                          </div>
                          
                          {selectedMaterial && weight > 0 && (
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label className="text-right">
                                Calculated Price
                              </Label>
                              <div className="col-span-3 font-bold">
                                {calculateDynamicPrice(parseInt(selectedMaterial), weight, makingCharge)}
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="price" className="text-right">
                            Price (₹)
                          </Label>
                          <Input id="price" placeholder="25000" className="col-span-3" />
                        </div>
                      )
                    )}
                  </TabsContent>
                  
                  <TabsContent value="images" className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
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
                  </TabsContent>
                  
                  <TabsContent value="variations" className="space-y-4">
                    {selectedAttributes.length > 0 ? (
                      <>
                        <div className="p-4 border rounded-md space-y-4">
                          <h4 className="font-medium">Create Variations</h4>
                          <p className="text-sm text-gray-500">
                            Generate variations based on selected attribute combinations.
                          </p>
                          <Button 
                            onClick={generateVariations}
                            className="bg-gold hover:bg-gold-dark text-white"
                          >
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Generate Variations
                          </Button>
                        </div>
                        
                        {variants.length > 0 && (
                          <div className="space-y-4">
                            <h4 className="font-medium">Variations ({variants.length})</h4>
                            <div className="border rounded-md overflow-hidden">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Variation</TableHead>
                                    <TableHead>SKU</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Stock</TableHead>
                                    <TableHead>Actions</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {variants.map((variant) => (
                                    <TableRow key={variant.id}>
                                      <TableCell>
                                        {Object.entries(variant.attributes).map(([key, value]) => (
                                          <div key={key} className="text-sm">
                                            <span className="font-medium">{key}:</span> {value}
                                          </div>
                                        ))}
                                      </TableCell>
                                      <TableCell>
                                        <Input 
                                          value={variant.sku}
                                          onChange={(e) => {
                                            setVariants(prev => prev.map(v => 
                                              v.id === variant.id ? {...v, sku: e.target.value} : v
                                            ));
                                          }}
                                          className="w-full" 
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <div className="space-y-2">
                                          <div className="flex items-center">
                                            <Checkbox 
                                              id={`dynamic-pricing-${variant.id}`}
                                              checked={variant.isDynamicPricing}
                                              onCheckedChange={(checked) => {
                                                setVariants(prev => prev.map(v => 
                                                  v.id === variant.id ? {...v, isDynamicPricing: !!checked} : v
                                                ));
                                              }}
                                              className="mr-2"
                                            />
                                            <label 
                                              htmlFor={`dynamic-pricing-${variant.id}`}
                                              className="text-xs"
                                            >
                                              Dynamic
                                            </label>
                                          </div>
                                          {variant.isDynamicPricing ? (
                                            <div className="space-y-2">
                                              <Select
                                                onValueChange={(value) => {
                                                  setVariants(prev => prev.map(v => 
                                                    v.id === variant.id ? {...v, materialId: parseInt(value)} : v
                                                  ));
                                                }}
                                              >
                                                <SelectTrigger className="w-full h-8 text-xs">
                                                  <SelectValue placeholder="Material" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                  {mockMaterials.map((material) => (
                                                    <SelectItem 
                                                      key={material.id} 
                                                      value={material.id.toString()}
                                                    >
                                                      {material.name}
                                                    </SelectItem>
                                                  ))}
                                                </SelectContent>
                                              </Select>
                                              <Input 
                                                placeholder="Weight (g)"
                                                type="number"
                                                className="h-8 text-xs"
                                                onChange={(e) => {
                                                  setVariants(prev => prev.map(v => 
                                                    v.id === variant.id ? {...v, weight: parseFloat(e.target.value) || 0} : v
                                                  ));
                                                }}
                                              />
                                              <Input 
                                                placeholder="Making (₹)"
                                                type="number"
                                                className="h-8 text-xs"
                                                onChange={(e) => {
                                                  setVariants(prev => prev.map(v => 
                                                    v.id === variant.id ? {...v, makingCharge: parseFloat(e.target.value) || 0} : v
                                                  ));
                                                }}
                                              />
                                            </div>
                                          ) : (
                                            <Input 
                                              placeholder="Price (₹)"
                                              value={variant.price}
                                              onChange={(e) => {
                                                setVariants(prev => prev.map(v => 
                                                  v.id === variant.id ? {...v, price: e.target.value} : v
                                                ));
                                              }}
                                              className="h-8 text-xs"
                                            />
                                          )}
                                        </div>
                                      </TableCell>
                                      <TableCell>
                                        <Input 
                                          type="number"
                                          value={variant.stock}
                                          onChange={(e) => {
                                            setVariants(prev => prev.map(v => 
                                              v.id === variant.id ? {...v, stock: parseInt(e.target.value) || 0} : v
                                            ));
                                          }}
                                          className="w-20"
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <Button 
                                          variant="outline" 
                                          size="sm"
                                          className="text-red-500"
                                          onClick={() => {
                                            setVariants(prev => prev.filter(v => v.id !== variant.id));
                                          }}
                                        >
                                          Remove
                                        </Button>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="p-8 text-center text-gray-500 border rounded-md">
                        <p>Please select attributes in the General tab to create variations.</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
                
                <DialogFooter className="mt-6">
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
                <TableHead>Type</TableHead>
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
                  <TableCell>{product.type}</TableCell>
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
