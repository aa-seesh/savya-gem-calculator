
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdminDashboard from '@/components/admin/AdminDashboard';
import ProductManager from '@/components/admin/ProductManager';
import MaterialPriceManager from '@/components/admin/MaterialPriceManager';
import OrderManager from '@/components/admin/OrderManager';
import SettingsPanel from '@/components/admin/SettingsPanel';

const Admin: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-20">
        <h1 className="text-3xl font-serif font-bold mb-6 text-navy-dark">Admin Panel</h1>
        
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="materials">Material Prices</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <AdminDashboard />
          </TabsContent>
          
          <TabsContent value="products">
            <ProductManager />
          </TabsContent>
          
          <TabsContent value="materials">
            <MaterialPriceManager />
          </TabsContent>
          
          <TabsContent value="orders">
            <OrderManager />
          </TabsContent>
          
          <TabsContent value="settings">
            <SettingsPanel />
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
