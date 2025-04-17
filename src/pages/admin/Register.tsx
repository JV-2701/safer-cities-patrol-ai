
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminRegister = () => {
  const [fullName, setFullName] = useState("");
  const [badgeId, setBadgeId] = useState("");
  const [departmentCode, setDepartmentCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // For demo purposes, validate department code
    if (departmentCode !== "POLICE2025") {
      toast({
        title: "Invalid Department Code",
        description: "Please enter a valid department code or contact your administrator",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    // Simple validation
    if (!fullName || !badgeId || !email || !password) {
      toast({
        title: "Registration failed",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please ensure both passwords match",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    // Registration success
    toast({
      title: "Officer registration successful",
      description: "Your account has been created. Await verification by a senior officer.",
    });
    setTimeout(() => {
      navigate("/admin/login");
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-police-950 to-police-900 py-10">
      <Card className="w-full max-w-lg bg-police-900/60 backdrop-blur-lg border-police-800">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl text-white">Officer Registration</CardTitle>
          <CardDescription className="text-gray-300">
            Register as a new officer to access the administrative portal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="fullName" className="text-sm font-medium text-gray-200">
                  Full Name
                </label>
                <Input
                  id="fullName"
                  placeholder="Officer Name"
                  className="bg-police-800 border-police-700 text-white"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="badgeId" className="text-sm font-medium text-gray-200">
                  Badge ID
                </label>
                <Input
                  id="badgeId"
                  placeholder="Official Badge ID"
                  className="bg-police-800 border-police-700 text-white"
                  value={badgeId}
                  onChange={(e) => setBadgeId(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="departmentCode" className="text-sm font-medium text-gray-200">
                  Department Authorization Code
                </label>
                <Input
                  id="departmentCode"
                  type="password"
                  placeholder="Enter department code"
                  className="bg-police-800 border-police-700 text-white"
                  value={departmentCode}
                  onChange={(e) => setDepartmentCode(e.target.value)}
                  required
                />
                <p className="text-xs text-gray-400">This code is provided by your department administrator</p>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-200">
                  Official Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="officer@police.gov.in"
                  className="bg-police-800 border-police-700 text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-gray-200">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="bg-police-800 border-police-700 text-white"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-200">
                    Confirm Password
                  </label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    className="bg-police-800 border-police-700 text-white"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="rounded border-gray-700 bg-police-800 text-primary focus:ring-primary"
                  required
                />
                <label htmlFor="terms" className="text-sm text-gray-300">
                  I confirm that I am authorized to access the administrative portal and will follow department guidelines
                </label>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/80"
                disabled={isLoading}
              >
                {isLoading ? "Registering..." : "Register as Officer"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-gray-300">
            Already registered?{" "}
            <Link to="/admin/login" className="text-primary hover:underline">
              Sign In
            </Link>
          </div>
          <div className="text-center">
            <Link to="/" className="text-sm text-gray-300 hover:text-white">
              Back to Home
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminRegister;
