
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

// Mock attributes for demonstration
const mockAttributes = [
  { id: 1, name: 'Size', slug: 'size', values: ['Small', 'Medium', 'Large'], type: 'select' },
  { id: 2, name: 'Color', slug: 'color', values: ['Gold', 'Silver', 'Rose Gold'], type: 'color' },
  { id: 3, name: 'Material', slug: 'material', values: ['22K Gold', '18K Gold', 'Silver'], type: 'select' },
  { id: 4, name: 'Style', slug: 'style', values: ['Traditional', 'Modern', 'Fusion'], type: 'select' },
];

const AttributesManager: React.FC = () => {
  const [attributes, setAttributes] = useState(mockAttributes);
  const [isAddAttributeOpen, setIsAddAttributeOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newAttributeValues, setNewAttributeValues] = useState('');
  const { toast } = useToast();

  const filteredAttributes = attributes.filter(attribute => 
    attribute.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    attribute.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddAttribute = () => {
    // In a real implementation, would send to API
    toast({
      title: "Attribute added",
      description: "The new attribute has been created successfully.",
    });
    setIsAddAttributeOpen(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Attributes</CardTitle>
              <CardDescription>Manage your product attributes</CardDescription>
            </div>
            <Dialog open={isAddAttributeOpen} onOpenChange={setIsAddAttributeOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gold hover:bg-gold-dark text-white">Add New Attribute</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>Add New Attribute</DialogTitle>
                  <DialogDescription>
                    Create a new attribute to use for product variations.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input id="name" placeholder="Attribute name" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="slug" className="text-right">
                      Slug
                    </Label>
                    <Input id="slug" placeholder="attribute-slug" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="type" className="text-right">
                      Type
                    </Label>
                    <select 
                      id="type" 
                      className="col-span-3 w-full p-2 border rounded-md"
                    >
                      <option value="select">Select</option>
                      <option value="color">Color</option>
                      <option value="button">Button</option>
                      <option value="radio">Radio</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="values" className="text-right mt-2">
                      Values
                    </Label>
                    <div className="col-span-3">
                      <Textarea 
                        id="values" 
                        placeholder="Add values separated by comma (e.g. Small, Medium, Large)" 
                        className="min-h-[100px]"
                        value={newAttributeValues}
                        onChange={(e) => setNewAttributeValues(e.target.value)}
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Enter each value separated by a comma
                      </p>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddAttribute} className="bg-gold hover:bg-gold-dark text-white">Save Attribute</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input 
              placeholder="Search attributes..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Values</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAttributes.map((attribute) => (
                <TableRow key={attribute.id}>
                  <TableCell className="font-medium">{attribute.name}</TableCell>
                  <TableCell>{attribute.slug}</TableCell>
                  <TableCell>{attribute.values.join(', ')}</TableCell>
                  <TableCell>
                    <span className="capitalize">{attribute.type}</span>
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

export default AttributesManager;
