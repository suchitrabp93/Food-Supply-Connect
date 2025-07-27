import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Calculator, 
  ShoppingCart, 
  MapPin, 
  Bell, 
  Users, 
  LogOut,
  Plus,
  Minus
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const VendorDashboard = () => {
  const [dishName, setDishName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [ingredients, setIngredients] = useState<Array<{name: string, quantity: string, unit: string}>>([]);
  const [cartItems, setCartItems] = useState<Array<{name: string, price: number, supplier: string, distance: string}>>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock ingredient calculator
  const calculateIngredients = () => {
    if (!dishName || !quantity) {
      toast({
        title: "Missing Information",
        description: "Please enter both dish name and quantity.",
        variant: "destructive",
      });
      return;
    }

    // Mock calculation based on popular street food dishes
    const mockIngredients: Record<string, Array<{name: string, ratio: number, unit: string}>> = {
      "pav bhaji": [
        { name: "Potatoes", ratio: 2, unit: "kg" },
        { name: "Tomatoes", ratio: 1, unit: "kg" },
        { name: "Onions", ratio: 0.5, unit: "kg" },
        { name: "Capsicum", ratio: 0.3, unit: "kg" },
        { name: "Pav bread", ratio: 1, unit: "packet" },
        { name: "Butter", ratio: 0.2, unit: "kg" }
      ],
      "vada pav": [
        { name: "Potatoes", ratio: 1.5, unit: "kg" },
        { name: "Green chilies", ratio: 0.1, unit: "kg" },
        { name: "Gram flour", ratio: 0.3, unit: "kg" },
        { name: "Pav bread", ratio: 1, unit: "packet" },
        { name: "Oil", ratio: 0.5, unit: "liter" }
      ],
      "dosa": [
        { name: "Rice", ratio: 2, unit: "kg" },
        { name: "Urad dal", ratio: 0.5, unit: "kg" },
        { name: "Oil", ratio: 0.3, unit: "liter" },
        { name: "Salt", ratio: 0.05, unit: "kg" }
      ]
    };

    const dishKey = dishName.toLowerCase();
    const baseIngredients = mockIngredients[dishKey] || mockIngredients["pav bhaji"];
    const servings = parseInt(quantity);

    const calculatedIngredients = baseIngredients.map(ingredient => ({
      name: ingredient.name,
      quantity: (ingredient.ratio * servings).toFixed(2),
      unit: ingredient.unit
    }));

    setIngredients(calculatedIngredients);
    toast({
      title: "Ingredients Calculated",
      description: `Calculated ingredients for ${servings} servings of ${dishName}`,
    });
  };

  // Mock suppliers data
  const nearbySuppliers = [
    { name: "Fresh Mart", distance: "0.5 km", rating: 4.5, items: [
      { name: "Potatoes", price: 25, unit: "kg" },
      { name: "Tomatoes", price: 40, unit: "kg" },
      { name: "Onions", price: 30, unit: "kg" }
    ]},
    { name: "Green Valley", distance: "0.8 km", rating: 4.2, items: [
      { name: "Potatoes", price: 28, unit: "kg" },
      { name: "Tomatoes", price: 38, unit: "kg" },
      { name: "Capsicum", price: 60, unit: "kg" }
    ]},
    { name: "City Market", distance: "1.2 km", rating: 4.0, items: [
      { name: "Gram flour", price: 45, unit: "kg" },
      { name: "Oil", price: 120, unit: "liter" },
      { name: "Salt", price: 20, unit: "kg" }
    ]}
  ];

  const addToCart = (item: any, supplier: any) => {
    const cartItem = {
      name: item.name,
      price: item.price,
      supplier: supplier.name,
      distance: supplier.distance
    };
    setCartItems([...cartItems, cartItem]);
    toast({
      title: "Added to Cart",
      description: `${item.name} from ${supplier.name} added to cart`,
    });
  };

  const removeFromCart = (index: number) => {
    const newCart = cartItems.filter((_, i) => i !== index);
    setCartItems(newCart);
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
            <div className="p-2 bg-vendor/10 rounded-lg">
              <Users className="w-6 h-6 text-vendor" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Vendor Dashboard</h1>
              <p className="text-sm text-muted-foreground">Welcome back, Raj Kumar</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
              <Badge variant="destructive" className="ml-1 px-1 py-0 text-xs">3</Badge>
            </Button>
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="ingredients" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="ingredients" className="flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              Ingredients
            </TabsTrigger>
            <TabsTrigger value="shopping" className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              Shopping
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ingredients" className="mt-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Ingredient Calculator */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-primary" />
                    Ingredient Calculator
                  </CardTitle>
                  <CardDescription>
                    Enter your dish and serving quantity to get ingredient breakdown
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="dishName">Dish Name</Label>
                    <Input
                      id="dishName"
                      placeholder="e.g., Pav Bhaji, Vada Pav, Dosa"
                      value={dishName}
                      onChange={(e) => setDishName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Number of Servings</Label>
                    <Input
                      id="quantity"
                      type="number"
                      placeholder="e.g., 50"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                  <Button onClick={calculateIngredients} className="w-full">
                    Calculate Ingredients
                  </Button>
                </CardContent>
              </Card>

              {/* Calculated Ingredients */}
              <Card>
                <CardHeader>
                  <CardTitle>Required Ingredients</CardTitle>
                  <CardDescription>
                    Based on your dish and serving quantity
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {ingredients.length > 0 ? (
                    <div className="space-y-3">
                      {ingredients.map((ingredient, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                          <span className="font-medium">{ingredient.name}</span>
                          <Badge variant="outline">
                            {ingredient.quantity} {ingredient.unit}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Calculator className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Calculate ingredients to see the breakdown here</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="shopping" className="mt-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Nearby Suppliers */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center gap-2 mb-6">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-semibold">Nearby Suppliers</h2>
                  <Badge variant="secondary">Based on your location</Badge>
                </div>

                {nearbySuppliers.map((supplier, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{supplier.name}</CardTitle>
                          <CardDescription className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {supplier.distance}
                            </span>
                            <span>⭐ {supplier.rating}</span>
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {supplier.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="p-3 border rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium text-sm">{item.name}</span>
                              <Badge variant="outline">₹{item.price}/{item.unit}</Badge>
                            </div>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="w-full"
                              onClick={() => addToCart(item, supplier)}
                            >
                              <Plus className="w-3 h-3 mr-1" />
                              Add to Cart
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Shopping Cart */}
              <div>
                <Card className="sticky top-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ShoppingCart className="w-5 h-5 text-primary" />
                      Cart ({cartItems.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {cartItems.length > 0 ? (
                      <div className="space-y-3">
                        {cartItems.map((item, index) => (
                          <div key={index} className="p-3 border rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <p className="font-medium text-sm">{item.name}</p>
                                <p className="text-xs text-muted-foreground">{item.supplier} • {item.distance}</p>
                              </div>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                onClick={() => removeFromCart(index)}
                                className="h-6 w-6 p-0"
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                            </div>
                            <div className="text-right">
                              <Badge>₹{item.price}</Badge>
                            </div>
                          </div>
                        ))}
                        <div className="border-t pt-3">
                          <div className="flex justify-between items-center mb-3">
                            <span className="font-semibold">Total:</span>
                            <span className="font-bold">₹{cartItems.reduce((sum, item) => sum + item.price, 0)}</span>
                          </div>
                          <Button className="w-full">
                            Place Order
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p className="text-sm">Your cart is empty</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default VendorDashboard;