import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { products, categories, collections } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ChevronRight, Filter, SlidersHorizontal, X } from 'lucide-react';
import { formatCurrency } from '@/lib/helpers';
import { Separator } from '@/components/ui/separator';

const materialOptions = [
  { id: 'gold-24k', label: '24K Gold' },
  { id: 'gold-22k', label: '22K Gold' },
  { id: 'gold-18k', label: '18K Gold' },
  { id: 'silver', label: 'Silver' },
  { id: 'platinum', label: 'Platinum' },
];

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
];

const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  
  // Get the max price from all products
  const maxPrice = Math.max(...products.map(p => p.price));
  
  // Initialize filters from URL parameters
  const initialCategory = searchParams.get('category') || '';
  const initialCollection = searchParams.get('collection') || '';
  const initialSearch = searchParams.get('search') || '';
  const initialSort = searchParams.get('sort') || 'featured';
  
  const [filters, setFilters] = useState({
    category: initialCategory,
    collection: initialCollection,
    materials: [] as string[],
    priceMin: 0,
    priceMax: maxPrice,
    search: initialSearch,
    sort: initialSort,
    inStock: true,
    isDynamicPricing: false,
  });
  
  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (filters.category) params.set('category', filters.category);
    if (filters.collection) params.set('collection', filters.collection);
    if (filters.search) params.set('search', filters.search);
    if (filters.sort !== 'featured') params.set('sort', filters.sort);
    
    setSearchParams(params, { replace: true });
  }, [filters, setSearchParams]);
  
  // Apply filters
  useEffect(() => {
    let result = [...products];
    
    // Filter by category
    if (filters.category) {
      result = result.filter(product => product.category === filters.category);
    }
    
    // Filter by collection
    if (filters.collection) {
      result = result.filter(product => product.collection === filters.collection);
    }
    
    // Filter by materials
    if (filters.materials.length > 0) {
      result = result.filter(product => filters.materials.includes(product.material));
    }
    
    // Filter by price
    result = result.filter(product => 
      product.price >= filters.priceMin && product.price <= filters.priceMax
    );
    
    // Filter by search term
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm) || 
        product.description.toLowerCase().includes(searchTerm)
      );
    }
    
    // Filter by stock status
    if (filters.inStock) {
      result = result.filter(product => product.inStock);
    }
    
    // Filter by pricing model
    if (filters.isDynamicPricing) {
      result = result.filter(product => product.isDynamicPricing);
    }
    
    // Apply sorting
    switch (filters.sort) {
      case 'newest':
        result = result.filter(product => product.isNew).concat(result.filter(product => !product.isNew));
        break;
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // 'featured' - default, already sorted by featured in the data
        result = result.filter(product => product.featured)
          .concat(result.filter(product => !product.featured));
    }
    
    setFilteredProducts(result);
  }, [filters]);
  
  const handleCategoryChange = (category: string) => {
    setFilters(prev => ({
      ...prev,
      category: prev.category === category ? '' : category
    }));
  };
  
  const handleCollectionChange = (collection: string) => {
    setFilters(prev => ({
      ...prev,
      collection: prev.collection === collection ? '' : collection
    }));
  };
  
  const handleMaterialChange = (material: string) => {
    setFilters(prev => {
      const materials = prev.materials.includes(material)
        ? prev.materials.filter(m => m !== material)
        : [...prev.materials, material];
      
      return { ...prev, materials };
    });
  };
  
  const handlePriceChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
    setFilters(prev => ({
      ...prev,
      priceMin: values[0],
      priceMax: values[1]
    }));
  };
  
  const handleSortChange = (value: string) => {
    setFilters(prev => ({ ...prev, sort: value }));
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const searchInput = form.elements.namedItem('search') as HTMLInputElement;
    
    setFilters(prev => ({ ...prev, search: searchInput.value }));
  };
  
  const clearAllFilters = () => {
    setPriceRange([0, maxPrice]);
    setFilters({
      category: '',
      collection: '',
      materials: [],
      priceMin: 0,
      priceMax: maxPrice,
      search: '',
      sort: 'featured',
      inStock: true,
      isDynamicPricing: false
    });
  };
  
  // Check if any filters are applied
  const hasActiveFilters = filters.category || 
    filters.collection || 
    filters.materials.length > 0 || 
    filters.priceMin > 0 || 
    filters.priceMax < maxPrice || 
    filters.search || 
    !filters.inStock || 
    filters.isDynamicPricing;
  
  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      {/* Breadcrumbs */}
      <nav className="flex mb-6 items-center text-sm">
        <Link to="/" className="text-muted-foreground hover:text-navy-dark">Home</Link>
        <ChevronRight className="mx-2 h-4 w-4 text-muted-foreground" />
        <span className="text-navy-dark">Products</span>
      </nav>
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-serif font-bold text-navy-dark">
          Our Collection
        </h1>
        
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            className="lg:hidden"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          
          <div className="hidden md:block">
            <Select
              value={filters.sort}
              onValueChange={handleSortChange}
            >
              <SelectTrigger className="w-[180px]">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      {/* Mobile sort options */}
      <div className="flex md:hidden mb-4">
        <Select
          value={filters.sort}
          onValueChange={handleSortChange}
        >
          <SelectTrigger className="w-full">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Mobile filter drawer */}
      <div className={`
        fixed inset-0 bg-black/50 z-50 lg:hidden transition-opacity duration-200
        ${isFilterOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}>
        <div className={`
          fixed right-0 top-0 h-full w-80 bg-white z-50 overflow-y-auto transition-transform duration-300
          ${isFilterOpen ? 'translate-x-0' : 'translate-x-full'}
        `}>
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="font-serif font-semibold text-lg">Filters</h2>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsFilterOpen(false)}
            >
              <X size={20} />
            </Button>
          </div>
          
          <div className="p-4">
            {/* Mobile filter content (duplicate of desktop filters) */}
            <div className="space-y-6">
              {/* Search */}
              <div>
                <h3 className="font-medium mb-2">Search</h3>
                <form onSubmit={handleSearch} className="flex">
                  <Input 
                    name="search"
                    placeholder="Search products" 
                    defaultValue={filters.search}
                    className="rounded-r-none"
                  />
                  <Button 
                    type="submit" 
                    className="rounded-l-none bg-gold hover:bg-gold-dark"
                  >
                    Search
                  </Button>
                </form>
              </div>
              
              {/* Categories */}
              <Accordion type="single" collapsible defaultValue="categories">
                <AccordionItem value="categories">
                  <AccordionTrigger className="font-medium">Categories</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category.id} className="flex items-center">
                          <Button
                            variant="ghost"
                            className={`justify-start p-2 text-left w-full ${
                              filters.category === category.slug ? 'text-gold font-medium' : ''
                            }`}
                            onClick={() => handleCategoryChange(category.slug)}
                          >
                            {category.name}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              {/* Collections */}
              <Accordion type="single" collapsible defaultValue="collections">
                <AccordionItem value="collections">
                  <AccordionTrigger className="font-medium">Collections</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {collections.map((collection) => (
                        <div key={collection.id} className="flex items-center">
                          <Button
                            variant="ghost"
                            className={`justify-start p-2 text-left w-full ${
                              filters.collection === collection.name ? 'text-gold font-medium' : ''
                            }`}
                            onClick={() => handleCollectionChange(collection.name)}
                          >
                            {collection.name}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              {/* Materials */}
              <Accordion type="single" collapsible defaultValue="materials">
                <AccordionItem value="materials">
                  <AccordionTrigger className="font-medium">Materials</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {materialOptions.map((material) => (
                        <div key={material.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`mobile-material-${material.id}`}
                            checked={filters.materials.includes(material.id)}
                            onCheckedChange={() => handleMaterialChange(material.id)}
                          />
                          <Label htmlFor={`mobile-material-${material.id}`}>{material.label}</Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              {/* Price Range */}
              <Accordion type="single" collapsible defaultValue="price">
                <AccordionItem value="price">
                  <AccordionTrigger className="font-medium">Price Range</AccordionTrigger>
                  <AccordionContent>
                    <div className="px-2">
                      <Slider
                        defaultValue={[filters.priceMin, filters.priceMax]}
                        min={0}
                        max={maxPrice}
                        step={1000}
                        value={priceRange}
                        onValueChange={handlePriceChange}
                        className="my-6"
                      />
                      <div className="flex justify-between">
                        <span>{formatCurrency(priceRange[0])}</span>
                        <span>{formatCurrency(priceRange[1])}</span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              {/* Other Options */}
              <Accordion type="single" collapsible defaultValue="options">
                <AccordionItem value="options">
                  <AccordionTrigger className="font-medium">Other Options</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="mobile-in-stock"
                          checked={filters.inStock}
                          onCheckedChange={(checked) => 
                            setFilters(prev => ({ ...prev, inStock: !!checked }))
                          }
                        />
                        <Label htmlFor="mobile-in-stock">In Stock Only</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="mobile-dynamic-pricing"
                          checked={filters.isDynamicPricing}
                          onCheckedChange={(checked) => 
                            setFilters(prev => ({ ...prev, isDynamicPricing: !!checked }))
                          }
                        />
                        <Label htmlFor="mobile-dynamic-pricing">Dynamic Pricing</Label>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            
            {/* Clear All Filters Button */}
            {hasActiveFilters && (
              <Button 
                variant="outline" 
                className="w-full mt-6"
                onClick={clearAllFilters}
              >
                Clear All Filters
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop Filters Sidebar */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-6">
            {/* Search */}
            <div>
              <h3 className="font-medium mb-2">Search</h3>
              <form onSubmit={handleSearch} className="flex flex-col">
                <Input 
                  name="search"
                  placeholder="Search products" 
                  defaultValue={filters.search}
                  className="mb-2"
                />
                <Button 
                  type="submit" 
                  className="bg-gold hover:bg-gold-dark"
                >
                  Search
                </Button>
              </form>
            </div>
            
            <Separator />
            
            {/* Categories */}
            <div>
              <h3 className="font-medium mb-2">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center">
                    <Button
                      variant="ghost"
                      className={`justify-start p-2 text-left w-full ${
                        filters.category === category.slug ? 'text-gold font-medium' : ''
                      }`}
                      onClick={() => handleCategoryChange(category.slug)}
                    >
                      {category.name}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator />
            
            {/* Collections */}
            <div>
              <h3 className="font-medium mb-2">Collections</h3>
              <div className="space-y-2">
                {collections.map((collection) => (
                  <div key={collection.id} className="flex items-center">
                    <Button
                      variant="ghost"
                      className={`justify-start p-2 text-left w-full ${
                        filters.collection === collection.name ? 'text-gold font-medium' : ''
                      }`}
                      onClick={() => handleCollectionChange(collection.name)}
                    >
                      {collection.name}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator />
            
            {/* Materials */}
            <div>
              <h3 className="font-medium mb-2">Materials</h3>
              <div className="space-y-2">
                {materialOptions.map((material) => (
                  <div key={material.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`material-${material.id}`}
                      checked={filters.materials.includes(material.id)}
                      onCheckedChange={() => handleMaterialChange(material.id)}
                    />
                    <Label htmlFor={`material-${material.id}`}>{material.label}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator />
            
            {/* Price Range */}
            <div>
              <h3 className="font-medium mb-2">Price Range</h3>
              <div className="px-2">
                <Slider
                  defaultValue={[filters.priceMin, filters.priceMax]}
                  min={0}
                  max={maxPrice}
                  step={1000}
                  value={priceRange}
                  onValueChange={handlePriceChange}
                  className="my-6"
                />
                <div className="flex justify-between">
                  <span>{formatCurrency(priceRange[0])}</span>
                  <span>{formatCurrency(priceRange[1])}</span>
                </div>
              </div>
            </div>
            
            <Separator />
            
            {/* Other Options */}
            <div>
              <h3 className="font-medium mb-2">Other Options</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="in-stock"
                    checked={filters.inStock}
                    onCheckedChange={(checked) => 
                      setFilters(prev => ({ ...prev, inStock: !!checked }))
                    }
                  />
                  <Label htmlFor="in-stock">In Stock Only</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="dynamic-pricing"
                    checked={filters.isDynamicPricing}
                    onCheckedChange={(checked) => 
                      setFilters(prev => ({ ...prev, isDynamicPricing: !!checked }))
                    }
                  />
                  <Label htmlFor="dynamic-pricing">Dynamic Pricing</Label>
                </div>
              </div>
            </div>
            
            {/* Clear All Filters Button */}
            {hasActiveFilters && (
              <Button 
                variant="outline" 
                className="w-full"
                onClick={clearAllFilters}
              >
                Clear All Filters
              </Button>
            )}
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="flex-1">
          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="mb-4 flex flex-wrap gap-2 items-center">
              <span className="text-sm text-muted-foreground">Active Filters:</span>
              
              {filters.category && (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => setFilters(prev => ({ ...prev, category: '' }))}
                >
                  Category: {categories.find(c => c.slug === filters.category)?.name}
                  <X className="ml-1 h-3 w-3" />
                </Button>
              )}
              
              {filters.collection && (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => setFilters(prev => ({ ...prev, collection: '' }))}
                >
                  Collection: {filters.collection}
                  <X className="ml-1 h-3 w-3" />
                </Button>
              )}
              
              {filters.materials.map(material => (
                <Button
                  key={material}
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => handleMaterialChange(material)}
                >
                  Material: {materialOptions.find(m => m.id === material)?.label}
                  <X className="ml-1 h-3 w-3" />
                </Button>
              ))}
              
              {(filters.priceMin > 0 || filters.priceMax < maxPrice) && (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => {
                    setPriceRange([0, maxPrice]);
                    setFilters(prev => ({ ...prev, priceMin: 0, priceMax: maxPrice }));
                  }}
                >
                  Price: {formatCurrency(filters.priceMin)} - {formatCurrency(filters.priceMax)}
                  <X className="ml-1 h-3 w-3" />
                </Button>
              )}
              
              {filters.search && (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => setFilters(prev => ({ ...prev, search: '' }))}
                >
                  Search: "{filters.search}"
                  <X className="ml-1 h-3 w-3" />
                </Button>
              )}
              
              {!filters.inStock && (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => setFilters(prev => ({ ...prev, inStock: true }))}
                >
                  Include Out of Stock
                  <X className="ml-1 h-3 w-3" />
                </Button>
              )}
              
              {filters.isDynamicPricing && (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => setFilters(prev => ({ ...prev, isDynamicPricing: false }))}
                >
                  Dynamic Pricing Only
                  <X className="ml-1 h-3 w-3" />
                </Button>
              )}
              
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs text-muted-foreground"
                onClick={clearAllFilters}
              >
                Clear All
              </Button>
            </div>
          )}
          
          {/* Results Count */}
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredProducts.length} results
            </p>
          </div>
          
          {filteredProducts.length === 0 ? (
            <div className="p-8 text-center border rounded-lg">
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters or search term.
              </p>
              <Button onClick={clearAllFilters}>
                Clear All Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
