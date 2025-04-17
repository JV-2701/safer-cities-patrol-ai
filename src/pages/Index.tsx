
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, FileText, Search, MapPin, Users, BarChart, TrendingUp, Eye, AlertTriangle } from "lucide-react";
import CrimeHeatmap from "@/components/maps/CrimeHeatmap";
import StatisticsCard from "@/components/dashboard/StatisticsCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-police-950 to-police-900 text-white">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-20"></div>
        <div className="relative container mx-auto px-4 py-24 flex flex-col items-center text-center z-10">
          <Shield className="h-20 w-20 text-primary mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            AI-Powered Policing for Safer Cities
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl">
            Predictive analytics. Real-time crime mapping. Community engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/80">
              <Link to="/citizen/login">I am a Citizen</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-police-800/60 hover:bg-police-700 border-police-700">
              <Link to="/admin/login">I am a Police Admin</Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Dashboard Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Suraksha Patrol Dashboard</h2>
          <div className="flex items-center space-x-2 bg-police-800/50 py-1 px-3 rounded-full">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-sm">Live Data</span>
          </div>
        </div>
        
        {/* Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatisticsCard 
            title="Total Complaints" 
            value="2,518" 
            icon={FileText}
            description="Active complaints in the system"
            trend="up"
            trendValue="12% from last month"
            color="default"
          />
          
          <StatisticsCard 
            title="Resolution Rate" 
            value="87%" 
            icon={TrendingUp}
            description="Cases successfully resolved"
            trend="up"
            trendValue="5% from last month"
            color="success"
          />
          
          <StatisticsCard 
            title="Hotspots Detected" 
            value="7" 
            icon={AlertTriangle}
            description="High-risk areas identified"
            trend="down"
            trendValue="2 fewer than last month"
            color="alert"
          />
          
          <StatisticsCard 
            title="AI Predictions" 
            value="94%" 
            icon={BarChart}
            description="Machine learning accuracy"
            trend="up"
            trendValue="3% from last quarter"
            color="primary"
          />
        </div>
        
        {/* Map and Activity Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2">
            <Card className="bg-police-800/40 backdrop-blur-lg border-police-700">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Live City Safety Map</h3>
                <CrimeHeatmap mapType="safety" height="400px" />
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="bg-police-800/40 backdrop-blur-lg border-police-700 h-full">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {[
                    { type: "complaint", time: "10 minutes ago", area: "Aundh" },
                    { type: "patrol", time: "25 minutes ago", area: "Koregaon Park" },
                    { type: "alert", time: "1 hour ago", area: "MG Road" },
                    { type: "resolved", time: "2 hours ago", area: "Pimpri" },
                    { type: "prediction", time: "4 hours ago", area: "Camp Area" }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-police-800/60 rounded-lg">
                      <div className={`p-2 rounded-full ${
                        activity.type === "complaint" ? "bg-blue-500/20" :
                        activity.type === "patrol" ? "bg-primary/20" :
                        activity.type === "alert" ? "bg-alert/20" :
                        activity.type === "resolved" ? "bg-success/20" :
                        "bg-purple-500/20"
                      }`}>
                        {activity.type === "complaint" ? <FileText className="h-4 w-4 text-blue-300" /> :
                         activity.type === "patrol" ? <Eye className="h-4 w-4 text-primary-foreground" /> :
                         activity.type === "alert" ? <AlertTriangle className="h-4 w-4 text-alert-light" /> :
                         activity.type === "resolved" ? <Shield className="h-4 w-4 text-success-light" /> :
                         <BarChart className="h-4 w-4 text-purple-300" />
                        }
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {activity.type === "complaint" ? "New Complaint Filed" :
                           activity.type === "patrol" ? "Patrol Dispatched" :
                           activity.type === "alert" ? "Safety Alert Issued" :
                           activity.type === "resolved" ? "Case Resolved" :
                           "AI Prediction Generated"
                          }
                        </p>
                        <p className="text-xs text-gray-400">{activity.time} • {activity.area}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Quick Access Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link to="/citizen/complaint" className="group">
            <Card className="bg-police-800/40 backdrop-blur-lg border-police-700 hover:bg-police-700/60 transition-colors group-hover:border-primary">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <FileText className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-semibold mb-2">File a Complaint</h3>
                <p className="text-sm text-gray-300">Report incidents quickly and securely</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/citizen/track" className="group">
            <Card className="bg-police-800/40 backdrop-blur-lg border-police-700 hover:bg-police-700/60 transition-colors group-hover:border-primary">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Search className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-semibold mb-2">Track Complaint</h3>
                <p className="text-sm text-gray-300">Follow the progress of your case</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/citizen/safety-map" className="group">
            <Card className="bg-police-800/40 backdrop-blur-lg border-police-700 hover:bg-police-700/60 transition-colors group-hover:border-primary">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <MapPin className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-semibold mb-2">Safety Map</h3>
                <p className="text-sm text-gray-300">View crime patterns in your area</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/citizen/community" className="group">
            <Card className="bg-police-800/40 backdrop-blur-lg border-police-700 hover:bg-police-700/60 transition-colors group-hover:border-primary">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Users className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-semibold mb-2">Community</h3>
                <p className="text-sm text-gray-300">Connect with your local police</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-police-900/80 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <Shield className="h-8 w-8 text-primary mx-auto mb-4" />
          <p className="text-gray-400 text-sm">
            © 2025 Suraksha Patrol. All rights reserved.
          </p>
          <div className="flex justify-center mt-4 space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">Terms</a>
            <a href="#" className="text-gray-400 hover:text-white">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
