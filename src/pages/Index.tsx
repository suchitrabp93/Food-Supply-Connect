import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Store, TrendingDown, MapPin, ShoppingCart, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-food-vendors.jpg";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Smart Sourcing for <span className="text-primary">Street Food</span> Vendors
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
            Revolutionizing raw material procurement for India's street food ecosystem. 
            Connect vendors with trusted suppliers, optimize costs, and streamline operations.
          </p>
          <Button size="lg" variant="hero" className="text-lg px-8 py-4 rounded-full">
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 px-6 bg-secondary/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">The Challenge Facing Street Food Vendors</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Street food vendors in India struggle with inconsistent supply chains, price fluctuations, 
              and lack of transparency in raw material sourcing.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <TrendingDown className="w-12 h-12 text-destructive mb-4" />
                <CardTitle>Price Volatility</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Daily price fluctuations make it difficult to maintain consistent profit margins and plan inventory effectively.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <MapPin className="w-12 h-12 text-destructive mb-4" />
                <CardTitle>Distance & Logistics</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Finding nearby suppliers and managing logistics for fresh ingredients is time-consuming and inefficient.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <AlertCircle className="w-12 h-12 text-destructive mb-4" />
                <CardTitle>Trust & Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Lack of trusted supplier networks leads to quality issues and unreliable delivery schedules.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Role Selection */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Choose Your Role</h2>
          <p className="text-xl text-muted-foreground mb-12">
            Are you a food vendor looking to optimize your supply chain, or a supplier wanting to connect with local vendors?
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer group" onClick={() => navigate('/vendor/login')}>
              <CardHeader className="pb-8">
                <div className="mx-auto mb-6 p-4 bg-vendor/10 rounded-full w-fit group-hover:bg-vendor/20 transition-colors">
                  <Users className="w-16 h-16 text-vendor" />
                </div>
                <CardTitle className="text-3xl">Food Vendor</CardTitle>
                <CardDescription className="text-lg">
                  Optimize your ingredient sourcing and reduce costs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <ShoppingCart className="w-5 h-5" />
                  <span>Smart ingredient calculator</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5" />
                  <span>Find nearby suppliers</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <TrendingDown className="w-5 h-5" />
                  <span>Get price alerts</span>
                </div>
                <Button variant="vendor" className="w-full mt-6" size="lg">
                  Continue as Vendor
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer group" onClick={() => navigate('/supplier/login')}>
              <CardHeader className="pb-8">
                <div className="mx-auto mb-6 p-4 bg-supplier/10 rounded-full w-fit group-hover:bg-supplier/20 transition-colors">
                  <Store className="w-16 h-16 text-supplier" />
                </div>
                <CardTitle className="text-3xl">Supplier</CardTitle>
                <CardDescription className="text-lg">
                  Connect with local vendors and grow your business
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Store className="w-5 h-5" />
                  <span>Manage your inventory</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Users className="w-5 h-5" />
                  <span>Connect with vendors</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <TrendingDown className="w-5 h-5" />
                  <span>Update daily prices</span>
                </div>
                <Button variant="supplier" className="w-full mt-6" size="lg">
                  Continue as Supplier
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-20 px-6 bg-accent/30">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Platform Features</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-card rounded-lg shadow-md">
              <ShoppingCart className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Smart Shopping</h3>
              <p className="text-sm text-muted-foreground">AI-powered ingredient calculations based on dish requirements</p>
            </div>
            
            <div className="p-6 bg-card rounded-lg shadow-md">
              <MapPin className="w-12 h-12 text-vendor mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Location-Based</h3>
              <p className="text-sm text-muted-foreground">Find the nearest suppliers with best prices in your area</p>
            </div>
            
            <div className="p-6 bg-card rounded-lg shadow-md">
              <TrendingDown className="w-12 h-12 text-supplier mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Price Alerts</h3>
              <p className="text-sm text-muted-foreground">Get notified when ingredient prices drop below your targets</p>
            </div>
            
            <div className="p-6 bg-card rounded-lg shadow-md">
              <Store className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Supplier Tools</h3>
              <p className="text-sm text-muted-foreground">Easy inventory management and daily price updates</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;