
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { formatCurrency } from '@/lib/helpers';

const mockOrders = [
  { id: '#ORD-001', customer: 'Rahul Sharma', date: '2023-04-07', total: 24500, status: 'Processing', paymentMethod: 'Credit Card' },
  { id: '#ORD-002', customer: 'Priya Patel', date: '2023-04-06', total: 18200, status: 'Shipped', paymentMethod: 'UPI' },
  { id: '#ORD-003', customer: 'Amit Singh', date: '2023-04-05', total: 35000, status: 'Delivered', paymentMethod: 'Credit Card' },
  { id: '#ORD-004', customer: 'Neha Gupta', date: '2023-04-04', total: 42600, status: 'Processing', paymentMethod: 'Bank Transfer' },
  { id: '#ORD-005', customer: 'Vikram Khanna', date: '2023-04-03', total: 2800, status: 'Cancelled', paymentMethod: 'UPI' },
];

const OrderManager: React.FC = () => {
  const [orders, setOrders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<null | (typeof mockOrders)[0]>(null);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);

  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const viewOrderDetails = (order: (typeof mockOrders)[0]) => {
    setSelectedOrder(order);
    setIsOrderDetailsOpen(true);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Orders</CardTitle>
              <CardDescription>Manage customer orders</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input 
              placeholder="Search orders..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{formatCurrency(order.total)}</TableCell>
                  <TableCell>
                    <span 
                      className={`px-2 py-1 rounded-full text-xs ${
                        order.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 
                        order.status === 'Shipped' ? 'bg-amber-100 text-amber-800' :
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell>{order.paymentMethod}</TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => viewOrderDetails(order)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isOrderDetailsOpen} onOpenChange={setIsOrderDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Order Details - {selectedOrder?.id}</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-sm">Customer</h3>
                  <p>{selectedOrder.customer}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm">Date</h3>
                  <p>{selectedOrder.date}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm">Status</h3>
                  <p>{selectedOrder.status}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm">Payment Method</h3>
                  <p>{selectedOrder.paymentMethod}</p>
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="font-medium mb-2">Order Items</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Gold Chain Necklace</TableCell>
                      <TableCell>{formatCurrency(24500)}</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>{formatCurrency(24500)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex justify-between items-center mt-4 bg-gray-50 p-4 rounded-md">
                <span className="font-medium">Total</span>
                <span className="font-bold">{formatCurrency(selectedOrder.total)}</span>
              </div>
              
              <div className="flex justify-end space-x-2 mt-4">
                <select className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  <option>Processing</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                  <option>Cancelled</option>
                </select>
                <Button className="bg-gold hover:bg-gold-dark text-white">Update Status</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrderManager;
