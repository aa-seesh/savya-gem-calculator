
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', orders: 4, revenue: 24000 },
  { name: 'Tue', orders: 3, revenue: 18000 },
  { name: 'Wed', orders: 7, revenue: 42000 },
  { name: 'Thu', orders: 5, revenue: 30000 },
  { name: 'Fri', orders: 8, revenue: 48000 },
  { name: 'Sat', orders: 12, revenue: 72000 },
  { name: 'Sun', orders: 9, revenue: 54000 },
];

const statCards = [
  { title: 'Total Orders', value: '48', description: 'Last 7 days' },
  { title: 'Revenue', value: '₹288,000', description: 'Last 7 days' },
  { title: 'Products', value: '124', description: 'Active products' },
  { title: 'Customers', value: '327', description: 'Total registered' },
];

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-navy-dark">{card.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Sales Overview</CardTitle>
          <CardDescription>Order count and revenue for the last 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="orders" fill="#8884d8" name="Orders" />
                <Bar yAxisId="right" dataKey="revenue" fill="#82ca9d" name="Revenue (₹)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Low Stock Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="p-2 bg-red-50 rounded-md text-red-700">Gold Chain Necklace - 2 left</li>
              <li className="p-2 bg-red-50 rounded-md text-red-700">Diamond Studs - 3 left</li>
              <li className="p-2 bg-red-50 rounded-md text-red-700">Silver Anklet - 1 left</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Material Price Updates</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="p-2 bg-amber-50 rounded-md text-amber-700">Gold 24K: ₹6,500/g (+1.2%)</li>
              <li className="p-2 bg-amber-50 rounded-md text-amber-700">Gold 22K: ₹6,000/g (+1.0%)</li>
              <li className="p-2 bg-green-50 rounded-md text-green-700">Silver: ₹80/g (-0.5%)</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
