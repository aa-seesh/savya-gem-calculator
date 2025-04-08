
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductGeneralTab from './ProductGeneralTab';
import ProductPricingTab from './ProductPricingTab';
import ProductImageUploader from './ProductImageUploader';
import ProductVariations from './ProductVariations';
import { useToast } from '@/hooks/use-toast';

// Mock data
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

interface AddProductDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddProductDialog: React.FC<AddProductDialogProps> = ({ isOpen, onOpenChange }) => {
  const [productType, setProductType] = useState<'simple' | 'variable'>('simple');
  const [isDynamicPricing, setIsDynamicPricing] = useState(false);
  const [productImages, setProductImages] = useState<string[]>([]);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedMaterial, setSelectedMaterial] = useState<string>('');
  const [weight, setWeight] = useState<number>(0);
  const [makingCharge, setMakingCharge] = useState<number>(0);
  const [selectedAttributes, setSelectedAttributes] = useState<any[]>([]);
  const [variants, setVariants] = useState<any[]>([]);
  const { toast } = useToast();

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

  const handleSaveProduct = () => {
    // In a real implementation, this would save to an API
    toast({
      title: "Product saved",
      description: "The product has been created successfully.",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
          
          <TabsContent value="general">
            <ProductGeneralTab 
              productType={productType}
              setProductType={setProductType}
              selectedCategories={selectedCategories}
              toggleCategorySelection={toggleCategorySelection}
              mockCategories={mockCategories}
              mockAttributes={mockAttributes}
              selectedAttributes={selectedAttributes}
              toggleAttributeSelection={toggleAttributeSelection}
            />
          </TabsContent>
          
          <TabsContent value="pricing">
            <ProductPricingTab 
              productType={productType}
              isDynamicPricing={isDynamicPricing}
              setIsDynamicPricing={setIsDynamicPricing}
              selectedMaterial={selectedMaterial}
              setSelectedMaterial={setSelectedMaterial}
              weight={weight}
              setWeight={setWeight}
              makingCharge={makingCharge}
              setMakingCharge={setMakingCharge}
              mockMaterials={mockMaterials}
            />
          </TabsContent>
          
          <TabsContent value="images">
            <ProductImageUploader 
              productImages={productImages}
              setProductImages={setProductImages}
              mainImage={mainImage}
              setMainImage={setMainImage}
            />
          </TabsContent>
          
          <TabsContent value="variations">
            <ProductVariations 
              selectedAttributes={selectedAttributes}
              setSelectedAttributes={setSelectedAttributes}
              variants={variants}
              setVariants={setVariants}
              mockAttributes={mockAttributes}
              mockMaterials={mockMaterials}
              toggleAttributeValueSelection={toggleAttributeValueSelection}
            />
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="mt-6">
          <Button type="submit" className="bg-gold hover:bg-gold-dark text-white" onClick={handleSaveProduct}>Save Product</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;
