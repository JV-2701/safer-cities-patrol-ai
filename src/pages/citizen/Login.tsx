
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CitizenLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // For demo purposes, we're just checking if fields are filled
    if (email && password) {
      toast({
        title: "Login successful",
        description: "Welcome to Suraksha Patrol citizen portal",
      });
      // Navigate to dashboard after successful login
      setTimeout(() => {
        navigate("/citizen/dashboard");
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
          <CardTitle className="text-2xl text-white">Citizen Login</CardTitle>
          <CardDescription className="text-gray-300">
            Sign in to access the Suraksha Patrol citizen portal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-200">
                  Email
                </label>
                <Input
                  id="email"
                  placeholder="your@email.com"
                  type="email"
                  className="bg-police-800 border-police-700 text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/80"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-gray-300">
            Don't have an account?{" "}
            <Link to="/citizen/register" className="text-primary hover:underline">
              Register
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

export default CitizenLogin;
