
/**
 * Formats a number as currency
 * @param value Number to format as currency
 * @returns Formatted currency string
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(value);
};

/**
 * Calculate dynamic jewelry price based on material, weight and making charge
 * @param materialPrice Price per gram of the material
 * @param weight Weight in grams
 * @param makingCharge Making charge (fixed or percentage)
 * @param isMakingChargePercentage Whether making charge is a percentage
 * @returns Calculated price
 */
export const calculateJewelryPrice = (
  materialPrice: number,
  weight: number,
  makingCharge: number,
  isMakingChargePercentage: boolean = false
): number => {
  const materialCost = materialPrice * weight;
  
  if (isMakingChargePercentage) {
    // If making charge is a percentage
    const makingChargeCost = materialCost * (makingCharge / 100);
    return materialCost + makingChargeCost;
  } else {
    // If making charge is a fixed amount
    return materialCost + makingCharge;
  }
};

/**
 * Get material base price
 * @param material Material type (gold-24k, gold-22k, gold-18k, silver, platinum)
 * @returns Base price per gram
 */
export const getMaterialBasePrice = (material: string): number => {
  // These would typically come from an API or database
  // Using static values for demonstration
  const prices: Record<string, number> = {
    'gold-24k': 6500, // Price per gram
    'gold-22k': 6000,
    'gold-18k': 5000,
    'silver': 80,
    'platinum': 3500,
    'diamond': 50000, // Price per carat
  };
  
  return prices[material] || 0;
};

/**
 * Generate a unique ID
 * @returns Unique string ID
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

/**
 * Truncate text to a specific length
 * @param text Text to truncate
 * @param length Maximum length
 * @returns Truncated text
 */
export const truncateText = (text: string, length: number): string => {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
};
