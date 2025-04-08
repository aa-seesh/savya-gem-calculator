
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockMaterials = [
  { id: 1, name: 'Gold 24K', price: '₹6,500', unit: 'per gram', lastUpdated: '2023-04-07' },
  { id: 2, name: 'Gold 22K', price: '₹6,000', unit: 'per gram', lastUpdated: '2023-04-07' },
  { id: 3, name: 'Gold 18K', price: '₹5,000', unit: 'per gram', lastUpdated: '2023-04-07' },
  { id: 4, name: 'Silver', price: '₹80', unit: 'per gram', lastUpdated: '2023-04-06' },
  { id: 5, name: 'Platinum', price: '₹3,500', unit: 'per gram', lastUpdated: '2023-04-05' },
  { id: 6, name: 'Diamond', price: '₹50,000', unit: 'per carat', lastUpdated: '2023-04-04' },
];

const priceHistoryData = [
  { date: '2023-04-01', gold24k: 6400, gold22k: 5900, silver: 81 },
  { date: '2023-04-02', gold24k: 6430, gold22k: 5920, silver: 82 },
  { date: '2023-04-03', gold24k: 6450, gold22k: 5940, silver: 82 },
  { date: '2023-04-04', gold24k: 6480, gold22k: 5960, silver: 81 },
  { date: '2023-04-05', gold24k: 6470, gold22k: 5950, silver: 80.5 },
  { date: '2023-04-06', gold24k: 6490, gold22k: 5980, silver: 80 },
  { date: '2023-04-07', gold24k: 6500, gold22k: 6000, silver: 80 },
];

const MaterialPriceManager: React.FC = () => {
  const [materials, setMaterials] = useState(mockMaterials);
  const [isUpdatePriceOpen, setIsUpdatePriceOpen] = useState(false);
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Material Prices</CardTitle>
              <CardDescription>Current market prices for materials</CardDescription>
            </div>
            <Dialog open={isUpdatePriceOpen} onOpenChange={setIsUpdatePriceOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gold hover:bg-gold-dark text-white">Update Prices</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Update Material Price</DialogTitle>
                  <DialogDescription>
                    Change the price of a material to reflect current market rates.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="material" className="text-right">
                      Material
                    </Label>
                    <select className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                      <option>Gold 24K</option>
                      <option>Gold 22K</option>
                      <option>Gold 18K</option>
                      <option>Silver</option>
                      <option>Platinum</option>
                      <option>Diamond</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">
                      Price
                    </Label>
                    <Input id="price" placeholder="6500" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="effectiveDate" className="text-right">
                      Effective Date
                    </Label>
                    <Input id="effectiveDate" type="date" className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="bg-gold hover:bg-gold-dark text-white">Save Changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Material</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {materials.map((material) => (
                <TableRow key={material.id}>
                  <TableCell className="font-medium">{material.name}</TableCell>
                  <TableCell>{material.price}</TableCell>
                  <TableCell>{material.unit}</TableCell>
                  <TableCell>{material.lastUpdated}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Price History</CardTitle>
          <CardDescription>Historical price trends for the last 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceHistoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="gold24k" stroke="#FFD700" name="Gold 24K (₹/g)" />
                <Line type="monotone" dataKey="gold22k" stroke="#DAA520" name="Gold 22K (₹/g)" />
                <Line type="monotone" dataKey="silver" stroke="#C0C0C0" name="Silver (₹/g)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MaterialPriceManager;
