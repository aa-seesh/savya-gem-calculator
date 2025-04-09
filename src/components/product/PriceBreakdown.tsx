
import React from 'react';
import { formatCurrency } from '@/lib/helpers';
import { getMaterialBasePrice } from '@/lib/helpers';

interface PriceBreakdownProps {
  product: any;
}

const PriceBreakdown: React.FC<PriceBreakdownProps> = ({ product }) => {
  const materialPrice = getMaterialBasePrice(product.material);
  const isFlatRate = !product.makingCharge || !product.weight;
  
  // Material cost calculation
  let materialCost = 0;
  let makingChargeCost = 0;
  let totalPrice = product.price;
  
  if (!isFlatRate) {
    materialCost = materialPrice * product.weight;
    if (typeof product.makingCharge === 'number') {
      // Check if making charge is a percentage or flat
      if (product.makingChargeType === 'percentage') {
        makingChargeCost = materialCost * (product.makingCharge / 100);
      } else {
        makingChargeCost = product.makingCharge;
      }
      
      // Verify that the calculated total matches the product price
      const calculatedTotal = materialCost + makingChargeCost;
      // If there's a significant difference, use the product price to ensure consistency
      if (Math.abs(calculatedTotal - product.price) > 1) {
        console.log('Price mismatch detected. Using product price for total.', {
          calculated: calculatedTotal,
          actual: product.price
        });
      }
    }
  }
  
  // Format material name for display
  const formatMaterialName = (material: string) => {
    return material.charAt(0).toUpperCase() + 
      material.slice(1).replace('-', ' ');
  };
  
  return (
    <div className="space-y-6">
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-navy">Description</th>
              <th className="px-4 py-3 text-right font-medium text-navy">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {isFlatRate ? (
              <tr>
                <td className="px-4 py-3">Fixed Price</td>
                <td className="px-4 py-3 text-right">{formatCurrency(product.price)}</td>
              </tr>
            ) : (
              <>
                <tr>
                  <td className="px-4 py-3">
                    Material Cost ({formatMaterialName(product.material)})
                    <div className="text-xs text-muted-foreground">
                      ₹{materialPrice}/gram × {product.weight} grams
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">{formatCurrency(materialCost)}</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">
                    Making Charge
                    <div className="text-xs text-muted-foreground">
                      {product.makingChargeType === 'percentage' 
                        ? `${product.makingCharge}% of material cost` 
                        : 'Fixed charge'}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">{formatCurrency(makingChargeCost)}</td>
                </tr>
              </>
            )}
            <tr className="bg-cream">
              <td className="px-4 py-3 font-medium">Total</td>
              <td className="px-4 py-3 text-right font-medium">{formatCurrency(totalPrice)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="text-sm text-muted-foreground">
        <h4 className="font-medium text-navy mb-2">Note:</h4>
        <p>
          The final price may include additional components like GST, certifications, 
          and hallmarking charges. Price displayed is inclusive of all taxes.
        </p>
      </div>
    </div>
  );
};

export default PriceBreakdown;
