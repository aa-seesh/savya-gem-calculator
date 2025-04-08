
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SettingsPanel: React.FC = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage store information and appearance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="store-name">Store Name</Label>
                  <Input id="store-name" defaultValue="Savya Jewellery" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Contact Email</Label>
                  <Input id="contact-email" type="email" defaultValue="contact@savyajewellery.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Contact Phone</Label>
                  <Input id="contact-phone" defaultValue="+91 9876543210" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    <option>INR (₹)</option>
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                    <option>GBP (£)</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="store-address">Store Address</Label>
                <Input id="store-address" defaultValue="123 Jewelry Lane, Mumbai, Maharashtra, India" />
              </div>
              
              <div className="space-y-2">
                <Label>Store Logo</Label>
                <div className="flex items-center gap-4">
                  <div className="h-20 w-40 bg-gray-100 flex items-center justify-center rounded-md">
                    <span className="text-gray-400">Logo Preview</span>
                  </div>
                  <Button variant="outline">Upload Logo</Button>
                </div>
              </div>
              
              <div className="pt-4">
                <Button className="bg-gold hover:bg-gold-dark text-white">Save Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Payment Settings</CardTitle>
              <CardDescription>Configure payment methods and gateways</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b">
                  <div>
                    <h3 className="font-medium">Cash on Delivery</h3>
                    <p className="text-sm text-muted-foreground">Allow customers to pay when they receive their order</p>
                  </div>
                  <div className="flex items-center h-5 space-x-2">
                    <input type="checkbox" id="cod-enabled" className="h-4 w-4" defaultChecked />
                    <Label htmlFor="cod-enabled">Enable</Label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b">
                  <div>
                    <h3 className="font-medium">Razorpay</h3>
                    <p className="text-sm text-muted-foreground">Accept credit cards, UPI, and other payment methods</p>
                  </div>
                  <div className="flex items-center h-5 space-x-2">
                    <input type="checkbox" id="razorpay-enabled" className="h-4 w-4" defaultChecked />
                    <Label htmlFor="razorpay-enabled">Enable</Label>
                  </div>
                </div>
                
                <div className="pl-4 space-y-2">
                  <div className="space-y-2">
                    <Label htmlFor="razorpay-key">Razorpay Key ID</Label>
                    <Input id="razorpay-key" type="password" defaultValue="rzp_test_12345678901234" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="razorpay-secret">Razorpay Secret</Label>
                    <Input id="razorpay-secret" type="password" defaultValue="••••••••••••••••••••••" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b">
                  <div>
                    <h3 className="font-medium">Bank Transfer</h3>
                    <p className="text-sm text-muted-foreground">Accept direct bank transfers</p>
                  </div>
                  <div className="flex items-center h-5 space-x-2">
                    <input type="checkbox" id="bank-enabled" className="h-4 w-4" />
                    <Label htmlFor="bank-enabled">Enable</Label>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <Button className="bg-gold hover:bg-gold-dark text-white">Save Payment Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="shipping">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Settings</CardTitle>
              <CardDescription>Configure shipping methods and rates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between py-2 border-b">
                  <div>
                    <h3 className="font-medium">Free Shipping</h3>
                    <p className="text-sm text-muted-foreground">Offer free shipping above a certain order value</p>
                  </div>
                  <div className="flex items-center h-5 space-x-2">
                    <input type="checkbox" id="free-shipping-enabled" className="h-4 w-4" defaultChecked />
                    <Label htmlFor="free-shipping-enabled">Enable</Label>
                  </div>
                </div>
                
                <div className="pl-4 space-y-2">
                  <Label htmlFor="free-shipping-min">Minimum Order Value for Free Shipping</Label>
                  <Input id="free-shipping-min" defaultValue="5000" />
                </div>
                
                <div className="flex items-center justify-between py-2 border-b">
                  <div>
                    <h3 className="font-medium">Flat Rate Shipping</h3>
                    <p className="text-sm text-muted-foreground">Charge a fixed rate for shipping</p>
                  </div>
                  <div className="flex items-center h-5 space-x-2">
                    <input type="checkbox" id="flat-rate-enabled" className="h-4 w-4" defaultChecked />
                    <Label htmlFor="flat-rate-enabled">Enable</Label>
                  </div>
                </div>
                
                <div className="pl-4 space-y-2">
                  <Label htmlFor="flat-rate-cost">Flat Rate Shipping Cost</Label>
                  <Input id="flat-rate-cost" defaultValue="100" />
                </div>
              </div>
              
              <Button className="bg-gold hover:bg-gold-dark text-white">Save Shipping Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Settings</CardTitle>
              <CardDescription>Configure email notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between py-2 border-b">
                  <div>
                    <h3 className="font-medium">New Order Notification</h3>
                    <p className="text-sm text-muted-foreground">Email sent to admin when a new order is placed</p>
                  </div>
                  <div className="flex items-center h-5 space-x-2">
                    <input type="checkbox" id="new-order-notification" className="h-4 w-4" defaultChecked />
                    <Label htmlFor="new-order-notification">Enable</Label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b">
                  <div>
                    <h3 className="font-medium">Order Confirmation</h3>
                    <p className="text-sm text-muted-foreground">Email sent to customer when order is placed</p>
                  </div>
                  <div className="flex items-center h-5 space-x-2">
                    <input type="checkbox" id="order-confirmation" className="h-4 w-4" defaultChecked />
                    <Label htmlFor="order-confirmation">Enable</Label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b">
                  <div>
                    <h3 className="font-medium">Shipping Confirmation</h3>
                    <p className="text-sm text-muted-foreground">Email sent to customer when order is shipped</p>
                  </div>
                  <div className="flex items-center h-5 space-x-2">
                    <input type="checkbox" id="shipping-confirmation" className="h-4 w-4" defaultChecked />
                    <Label htmlFor="shipping-confirmation">Enable</Label>
                  </div>
                </div>
                
                <div className="space-y-2 mt-4">
                  <Label htmlFor="email-sender">Sender Email</Label>
                  <Input id="email-sender" defaultValue="noreply@savyajewellery.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email-footer">Email Footer Text</Label>
                  <Input id="email-footer" defaultValue="© 2023 Savya Jewellery. All rights reserved." />
                </div>
              </div>
              
              <Button className="bg-gold hover:bg-gold-dark text-white">Save Email Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPanel;
