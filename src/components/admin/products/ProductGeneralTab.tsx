
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Category {
  id: number;
  name: string;
}

interface Attribute {
  id: number;
  name: string;
}

interface SelectedAttribute {
  id: number;
  name: string;
  values: string[];
  selectedValues: string[];
}

interface ProductGeneralTabProps {
  productType: 'simple' | 'variable';
  setProductType: React.Dispatch<React.SetStateAction<'simple' | 'variable'>>;
  selectedCategories: number[];
  toggleCategorySelection: (categoryId: number) => void;
  mockCategories: Category[];
  mockAttributes: Attribute[];
  selectedAttributes: SelectedAttribute[];
  toggleAttributeSelection: (attributeId: number) => void;
}

const ProductGeneralTab: React.FC<ProductGeneralTabProps> = ({
  productType,
  setProductType,
  selectedCategories,
  toggleCategorySelection,
  mockCategories,
  mockAttributes,
  selectedAttributes,
  toggleAttributeSelection
}) => {
  return (
    <div className="space-y-4">
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
          <div className="col-span-3 grid grid-cols-2 gap-4">
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
    </div>
  );
};

export default ProductGeneralTab;
