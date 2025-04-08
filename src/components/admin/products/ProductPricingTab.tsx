
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { calculateJewelryPrice, formatCurrency } from '@/lib/helpers';

interface Material {
  id: number;
  name: string;
  pricePerGram?: number;
  pricePerCarat?: number;
}

interface ProductPricingTabProps {
  productType: 'simple' | 'variable';
  isDynamicPricing: boolean;
  setIsDynamicPricing: React.Dispatch<React.SetStateAction<boolean>>;
  selectedMaterial: string;
  setSelectedMaterial: React.Dispatch<React.SetStateAction<string>>;
  weight: number;
  setWeight: React.Dispatch<React.SetStateAction<number>>;
  makingCharge: number;
  setMakingCharge: React.Dispatch<React.SetStateAction<number>>;
  mockMaterials: Material[];
}

const ProductPricingTab: React.FC<ProductPricingTabProps> = ({
  productType,
  isDynamicPricing,
  setIsDynamicPricing,
  selectedMaterial,
  setSelectedMaterial,
  weight,
  setWeight,
  makingCharge,
  setMakingCharge,
  mockMaterials
}) => {
  
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
    <div className="space-y-4">
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
    </div>
  );
};

export default ProductPricingTab;
