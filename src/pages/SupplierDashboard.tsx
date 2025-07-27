import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Store, 
  MapPin, 
  Bell, 
  LogOut,
  Plus,
  Edit3,
  TrendingUp,
  Users
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const SupplierDashboard = () => {
  const [inventory, setInventory] = useState([
    { id: 1, name: "Potatoes", price: 25, unit: "kg", stock: 500, lastUpdated: "Today" },
    { id: 2, name: "Tomatoes", price: 40, unit: "kg", stock: 300, lastUpdated: "Today" },
    { id: 3, name: "Onions", price: 30, unit: "kg", stock: 200, lastUpdated: "Yesterday" },
    { id: 4, name: "Capsicum", price: 60, unit: "kg", stock: 100, lastUpdated: "Today" },
    { id: 5, name: "Oil", price: 120, unit: "liter", stock: 50, lastUpdated: "2 days ago" }
  ]);
  
  const [editingItem, setEditingItem] = useState<number | null>(null);
  const [newPrice, setNewPrice] = useState("");
  const [newItem, setNewItem] = useState({ name: "", price: "", unit: "", stock: "" });
  const [showAddForm, setShowAddForm] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const updatePrice = (id: number) => {
    if (!newPrice) return;
    
    setInventory(inventory.map(item => 
      item.id === id 
        ? { ...item, price: parseFloat(newPrice), lastUpdated: "Just now" }
        : item
    ));
    
    setEditingItem(null);
    setNewPrice("");
    
    toast({
      title: "Price Updated",
      description: "Item price has been updated successfully.",
    });
  };

  const addNewItem = () => {
    if (!newItem.name || !newItem.price || !newItem.unit || !newItem.stock) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    const item = {
      id: Math.max(...inventory.map(i => i.id)) + 1,
      name: newItem.name,
      price: parseFloat(newItem.price),
      unit: newItem.unit,
      stock: parseInt(newItem.stock),
      lastUpdated: "Just now"
    };

    setInventory([...inventory, item]);
    setNewItem({ name: "", price: "", unit: "", stock: "" });
    setShowAddForm(false);
    
    toast({
      title: "Item Added",
      description: "New item has been added to your inventory.",
    });
  };

  const sendPriceAlert = () => {
    toast({
      title: "Price Alert Sent",
      description: "Low price alerts have been sent to nearby vendors.",
    });
  };

  const logout = () => {
    navigate('/');
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-supplier/10 rounded-lg">
              <Store className="w-6 h-6 text-supplier" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Supplier Dashboard</h1>
              <p className="text-sm text-muted-foreground">Fresh Mart Supplies</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
              <Badge variant="destructive" className="ml-1 px-1 py-0 text-xs">2</Badge>
            </Button>
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-supplier/10 rounded-lg">
                  <Store className="w-5 h-5 text-supplier" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Items</p>
                  <p className="text-2xl font-bold">{inventory.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Stock Value</p>
                  <p className="text-2xl font-bold">₹{inventory.reduce((sum, item) => sum + (item.price * item.stock), 0).toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-vendor/10 rounded-lg">
                  <Users className="w-5 h-5 text-vendor" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Connected Vendors</p>
                  <p className="text-2xl font-bold">23</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/50 rounded-lg">
                  <MapPin className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="text-sm font-semibold">Andheri West, Mumbai</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Inventory Management */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Inventory Management</h2>
              <div className="flex gap-2">
                <Button onClick={sendPriceAlert} variant="outline">
                  <Bell className="w-4 h-4 mr-2" />
                  Send Price Alert
                </Button>
                <Button onClick={() => setShowAddForm(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </Button>
              </div>
            </div>

            {/* Add New Item Form */}
            {showAddForm && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Add New Item</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="itemName">Item Name</Label>
                      <Input
                        id="itemName"
                        placeholder="e.g., Green Chilies"
                        value={newItem.name}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="itemPrice">Price</Label>
                      <Input
                        id="itemPrice"
                        type="number"
                        placeholder="e.g., 50"
                        value={newItem.price}
                        onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="itemUnit">Unit</Label>
                      <Input
                        id="itemUnit"
                        placeholder="e.g., kg, liter"
                        value={newItem.unit}
                        onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="itemStock">Stock Quantity</Label>
                      <Input
                        id="itemStock"
                        type="number"
                        placeholder="e.g., 100"
                        value={newItem.stock}
                        onChange={(e) => setNewItem({ ...newItem, stock: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={addNewItem} variant="supplier">Add Item</Button>
                    <Button onClick={() => setShowAddForm(false)} variant="outline">Cancel</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Inventory Items */}
            <div className="space-y-4">
              {inventory.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <span>Stock: {item.stock} {item.unit}</span>
                          <span>Last updated: {item.lastUpdated}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        {editingItem === item.id ? (
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              value={newPrice}
                              onChange={(e) => setNewPrice(e.target.value)}
                              placeholder={item.price.toString()}
                              className="w-24"
                            />
                            <Button size="sm" onClick={() => updatePrice(item.id)}>Save</Button>
                            <Button size="sm" variant="outline" onClick={() => setEditingItem(null)}>Cancel</Button>
                          </div>
                        ) : (
                          <>
                            <div className="text-right">
                              <Badge variant="outline" className="text-lg px-3 py-1">
                                ₹{item.price}/{item.unit}
                              </Badge>
                            </div>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => {
                                setEditingItem(item.id);
                                setNewPrice(item.price.toString());
                              }}
                            >
                              <Edit3 className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Actions & Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="supplier">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Sales Analytics
                </Button>
                <Button className="w-full" variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Vendor Network
                </Button>
                <Button className="w-full" variant="outline">
                  <Bell className="w-4 h-4 mr-2" />
                  Set Price Alerts
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Business Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-sm text-muted-foreground">Business Name</Label>
                  <p className="font-medium">Fresh Mart Supplies</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Location</Label>
                  <p className="font-medium">Andheri West, Mumbai</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Contact</Label>
                  <p className="font-medium">+91 9876543210</p>
                </div>
                <Button variant="outline" className="w-full">
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Business Info
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Price updated: Tomatoes</span>
                    <span className="text-muted-foreground">2 hrs ago</span>
                  </div>
                  <div className="flex justify-between">
                    <span>New vendor connection</span>
                    <span className="text-muted-foreground">1 day ago</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Order fulfilled: 50kg potatoes</span>
                    <span className="text-muted-foreground">2 days ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierDashboard;