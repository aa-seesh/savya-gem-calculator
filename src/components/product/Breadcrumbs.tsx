
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbsProps {
  productName: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ productName }) => {
  return (
    <nav className="flex mb-6 items-center text-sm">
      <Link to="/" className="text-muted-foreground hover:text-navy-dark">Home</Link>
      <ChevronRight className="mx-2 h-4 w-4 text-muted-foreground" />
      <Link to="/products" className="text-muted-foreground hover:text-navy-dark">Products</Link>
      <ChevronRight className="mx-2 h-4 w-4 text-muted-foreground" />
      <span className="text-navy-dark">{productName}</span>
    </nav>
  );
};

export default Breadcrumbs;
