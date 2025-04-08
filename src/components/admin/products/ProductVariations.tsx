
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Attribute {
  id: number;
  name: string;
  values: string[];
}

interface SelectedAttribute {
  id: number;
  name: string;
  values: string[];
  selectedValues: string[];
}

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

interface Material {
  id: number;
  name: string;
  pricePerGram?: number;
  pricePerCarat?: number;
}

interface ProductVariationsProps {
  selectedAttributes: SelectedAttribute[];
  setSelectedAttributes: React.Dispatch<React.SetStateAction<SelectedAttribute[]>>;
  variants: Variant[];
  setVariants: React.Dispatch<React.SetStateAction<Variant[]>>;
  mockAttributes: Attribute[];
  mockMaterials: Material[];
  toggleAttributeValueSelection: (attributeId: number, value: string) => void;
}

const ProductVariations: React.FC<ProductVariationsProps> = ({
  selectedAttributes,
  setSelectedAttributes,
  variants,
  setVariants,
  mockAttributes,
  mockMaterials,
  toggleAttributeValueSelection
}) => {
  const { toast } = useToast();

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

  return (
    <div className="space-y-4">
      {selectedAttributes.length > 0 ? (
        <>
          <div className="p-4 border rounded-md space-y-4">
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

            <div className="mt-4">
              <Button 
                onClick={generateVariations}
                className="bg-gold hover:bg-gold-dark text-white"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Generate Variations
              </Button>
            </div>
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
    </div>
  );
};

export default ProductVariations;
