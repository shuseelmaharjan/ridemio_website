"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Phone, 
  Building, 
  Car, 
  Bike, 
  UserPlus, 
  CheckCircle, 
  Shield,
  ArrowRight,
  Facebook,
  Apple
} from "lucide-react";
import { FaGoogle } from "react-icons/fa6";

export default function RegisterPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("rider");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    vehicleType: "",
    companyName: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    console.log("Form submitted:", formData);
    // router.push("/dashboard");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const riderBenefits = [
    "Earn up to $25 per hour",
    "Flexible working hours",
    "Weekly payments",
    "24/7 support",
    "Insurance coverage",
    "Bonus incentives"
  ];

  const userBenefits = [
    "Instant booking",
    "Multiple vehicle options",
    "Cashless payments",
    "Real-time tracking",
    "Safety features",
    "24/7 customer support"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-16 py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-block mb-6">
            <div className="relative h-12 w-40">
              <Image
                src="/logo/logo.jpg"
                alt="SideMio Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Join SideMio Today
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Register as a rider to earn money or as a user to enjoy convenient rides
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Registration Form */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Create Your Account</CardTitle>
                <CardDescription>
                  Choose your role and fill in your details
                </CardDescription>
              </CardHeader>
              
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-2 mb-6 mx-6">
                  <TabsTrigger value="rider" className="flex items-center gap-2">
                    <Car className="h-4 w-4" />
                    Join as Rider
                  </TabsTrigger>
                  <TabsTrigger value="user" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Join as User
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="rider">
                  <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="name"
                            name="name"
                            placeholder="John Doe"
                            className="pl-10"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              placeholder="john@example.com"
                              className="pl-10"
                              value={formData.email}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              placeholder="+1 (555) 123-4567"
                              className="pl-10"
                              value={formData.phone}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="vehicleType">Vehicle Type</Label>
                        <div className="grid grid-cols-2 gap-3">
                          <Button
                            type="button"
                            variant={formData.vehicleType === "car" ? "default" : "outline"}
                            className="h-auto py-3"
                            onClick={() => setFormData(prev => ({ ...prev, vehicleType: "car" }))}
                          >
                            <Car className="mr-2 h-4 w-4" />
                            Car
                          </Button>
                          <Button
                            type="button"
                            variant={formData.vehicleType === "bike" ? "default" : "outline"}
                            className="h-auto py-3"
                            onClick={() => setFormData(prev => ({ ...prev, vehicleType: "bike" }))}
                          >
                            <Bike className="mr-2 h-4 w-4" />
                            Bike
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="companyName">Company Name (Optional)</Label>
                        <div className="relative">
                          <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="companyName"
                            name="companyName"
                            placeholder="If registering as fleet owner"
                            className="pl-10"
                            value={formData.companyName}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="password">Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="password"
                              name="password"
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                              className="pl-10 pr-10"
                              value={formData.password}
                              onChange={handleChange}
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="confirmPassword"
                              name="confirmPassword"
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="••••••••"
                              className="pl-10 pr-10"
                              value={formData.confirmPassword}
                              onChange={handleChange}
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                            >
                              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 pt-2">
                        <Checkbox
                          id="terms"
                          checked={acceptedTerms}
                          onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                        />
                        <div className="grid gap-1.5 leading-none">
                          <Label
                            htmlFor="terms"
                            className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            I agree to the{" "}
                            <Link href="/terms" className="text-primary hover:underline">
                              Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link href="/privacy" className="text-primary hover:underline">
                              Privacy Policy
                            </Link>
                          </Label>
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="flex flex-col space-y-4">
                      <Button 
                        type="submit" 
                        className="w-full h-12 text-base"
                        disabled={!acceptedTerms}
                      >
                        <UserPlus className="mr-2 h-5 w-5" />
                        Create Rider Account
                      </Button>

                      <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                          <Separator className="w-full" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-white px-2 text-gray-500">Or continue with</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3 w-full">
                        <Button variant="outline" type="button" className="h-11">
                          <FaGoogle className="h-4 w-4" />
                          <span className="sr-only sm:not-sr-only sm:ml-2">Google</span>
                        </Button>
                        <Button variant="outline" type="button" className="h-11">
                          <Facebook className="h-4 w-4" />
                          <span className="sr-only sm:not-sr-only sm:ml-2">Facebook</span>
                        </Button>
                        <Button variant="outline" type="button" className="h-11">
                          <Apple className="h-4 w-4" />
                          <span className="sr-only sm:not-sr-only sm:ml-2">Apple</span>
                        </Button>
                      </div>

                      <p className="text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link href="/" className="text-primary font-semibold hover:underline">
                          Sign in
                        </Link>
                      </p>
                    </CardFooter>
                  </form>
                </TabsContent>

                <TabsContent value="user">
                  <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="userName">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="userName"
                            name="name"
                            placeholder="John Doe"
                            className="pl-10"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="userEmail">Email Address</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="userEmail"
                              name="email"
                              type="email"
                              placeholder="john@example.com"
                              className="pl-10"
                              value={formData.email}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="userPhone">Phone Number</Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="userPhone"
                              name="phone"
                              type="tel"
                              placeholder="+1 (555) 123-4567"
                              className="pl-10"
                              value={formData.phone}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="userPassword">Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="userPassword"
                              name="password"
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                              className="pl-10 pr-10"
                              value={formData.password}
                              onChange={handleChange}
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="userConfirmPassword">Confirm Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="userConfirmPassword"
                              name="confirmPassword"
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="••••••••"
                              className="pl-10 pr-10"
                              value={formData.confirmPassword}
                              onChange={handleChange}
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                            >
                              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>
                      </div>

                      <Alert className="bg-blue-50 border-blue-200">
                        <Shield className="h-4 w-4 text-blue-600" />
                        <AlertDescription className="text-blue-700 text-sm">
                          Your data is secured with end-to-end encryption
                        </AlertDescription>
                      </Alert>

                      <div className="flex items-start space-x-3 pt-2">
                        <Checkbox
                          id="userTerms"
                          checked={acceptedTerms}
                          onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                        />
                        <div className="grid gap-1.5 leading-none">
                          <Label
                            htmlFor="userTerms"
                            className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            I agree to receive promotional offers and updates
                          </Label>
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="flex flex-col space-y-4">
                      <Button 
                        type="submit" 
                        className="w-full h-12 text-base"
                        disabled={!acceptedTerms}
                      >
                        <UserPlus className="mr-2 h-5 w-5" />
                        Create User Account
                      </Button>

                      <p className="text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link href="/login" className="text-primary font-semibold hover:underline">
                          Sign in
                        </Link>
                      </p>
                    </CardFooter>
                  </form>
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* Benefits Section */}
          <div className="lg:col-span-1 space-y-8">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 text-primary" />
                  Why Join SideMio?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {activeTab === "rider" ? (
                    <>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">Rider Benefits</h3>
                      <div className="space-y-3">
                        {riderBenefits.map((benefit, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                              <CheckCircle className="h-4 w-4 text-primary" />
                            </div>
                            <span className="text-gray-700">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">User Benefits</h3>
                      <div className="space-y-3">
                        {userBenefits.map((benefit, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                              <CheckCircle className="h-4 w-4 text-primary" />
                            </div>
                            <span className="text-gray-700">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">10K+</div>
                    <div className="text-sm text-gray-600">Active Riders</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">50K+</div>
                    <div className="text-sm text-gray-600">Happy Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">100+</div>
                    <div className="text-sm text-gray-600">Cities</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">4.8★</div>
                    <div className="text-sm text-gray-600">Rating</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-gray-900 to-gray-800 text-white">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-primary/70 flex items-center justify-center">
                      <User className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Michael Rodriguez</h4>
                      <p className="text-sm text-gray-300">Full-time Rider</p>
                    </div>
                  </div>
                  <p className="italic text-gray-200">
                    "Joining SideMio was the best decision I made last year. The flexible hours let me work around my family schedule, and the earnings are great!"
                  </p>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="text-yellow-400">
                        ★
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <div className="text-center p-6 bg-gradient-to-r from-primary to-primary/90 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold text-white mb-2">Need Help?</h3>
              <p className="text-white/90 mb-4">
                Our support team is available 24/7 to assist you
              </p>
              <Button 
                variant="secondary" 
                className="bg-white text-primary hover:bg-gray-100"
                asChild
              >
                <Link href="/contact">
                  Contact Support
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}