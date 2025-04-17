
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";

const CitizenLogin = () => {
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
          <form>
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
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/80">
                Sign In
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-gray-300">
            Don't have an account?{" "}
            <Link to="#" className="text-primary hover:underline">
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
