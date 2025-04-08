
import { useState } from 'react';

// Mock data
const initialMockProducts = [
  { id: 1, name: 'Gold Chain Necklace', sku: 'GCN-001', price: '₹24,500', stock: 5, status: 'Active', type: 'Simple' },
  { id: 2, name: 'Diamond Stud Earrings', sku: 'DSE-045', price: '₹18,200', stock: 3, status: 'Active', type: 'Variable' },
  { id: 3, name: 'Silver Anklet', sku: 'SA-102', price: '₹2,800', stock: 12, status: 'Active', type: 'Simple' },
  { id: 4, name: 'Platinum Wedding Band', sku: 'PWB-033', price: '₹35,000', stock: 8, status: 'Active', type: 'Variable' },
  { id: 5, name: 'Gold Bangles Set', sku: 'GBS-078', price: '₹42,600', stock: 6, status: 'Inactive', type: 'Simple' },
];

export const useMockProducts = () => {
  const [products, setProducts] = useState(initialMockProducts);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    products,
    setProducts,
    searchTerm,
    setSearchTerm,
    filteredProducts
  };
};
