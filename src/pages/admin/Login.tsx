
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [badgeId, setBadgeId] = useState("");
  const [password, setPassword] = useState("");
  const [isSecure, setIsSecure] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // For demo purposes, we're just checking if fields are filled
    if (badgeId && password) {
      toast({
        title: "Login successful",
        description: "Welcome to Suraksha Patrol administrative panel",
      });
      // Navigate to dashboard after successful login
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1000);
    } else {
      toast({
        title: "Login failed",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-police-950 to-police-900">
      <Card className="w-full max-w-md bg-police-900/60 backdrop-blur-lg border-police-800">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl text-white">Admin Login</CardTitle>
          <CardDescription className="text-gray-300">
            Sign in to access the Suraksha Patrol administrative panel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="badge" className="text-sm font-medium text-gray-200">
                  Badge ID
                </label>
                <Input
                  id="badge"
                  placeholder="Enter your badge ID"
                  className="bg-police-800 border-police-700 text-white"
                  value={badgeId}
                  onChange={(e) => setBadgeId(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium text-gray-200">
                    Password
                  </label>
                  <Link to="#" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  placeholder="••••••••"
                  type="password"
                  className="bg-police-800 border-police-700 text-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="secure"
                  className="rounded border-gray-700 bg-police-800 text-primary focus:ring-primary"
                  checked={isSecure}
                  onChange={(e) => setIsSecure(e.target.checked)}
                />
                <label htmlFor="secure" className="text-sm text-gray-300">
                  This is a secure department workstation
                </label>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/80"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In to Admin Panel"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-gray-300">
            Need tech support?{" "}
            <Link to="#" className="text-primary hover:underline">
              Contact IT Department
            </Link>
          </div>
          <div className="text-center">
            <Link to="/" className="text-sm text-gray-300 hover:text-white">
              Back to Home
            </Link>
          </div>
          <div className="text-center text-sm text-gray-300">
            New officer?{" "}
            <Link to="/admin/register" className="text-primary hover:underline">
              Register with department code
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminLogin;
