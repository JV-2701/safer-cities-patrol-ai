import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Shield, 
  FileText, 
  Search, 
  MapPin, 
  Users, 
  AlertTriangle,
  Activity,
  BarChart2,
  TrendingUp
} from "lucide-react";
import CrimeHeatmap from "@/components/maps/CrimeHeatmap";
import AnalyticsCard from "@/components/dashboard/AnalyticsCard";
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

      {/* Analytics Dashboard */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <AnalyticsCard
            title="Live Incidents"
            value="23"
            icon={Activity}
            trend={{ value: "12% from last hour", positive: true }}
          />
          <AnalyticsCard
            title="Crime Rate"
            value="-15%"
            icon={TrendingUp}
            trend={{ value: "Decreased this month", positive: true }}
          />
          <AnalyticsCard
            title="Active Alerts"
            value="7"
            icon={AlertTriangle}
            trend={{ value: "3 new alerts", positive: false }}
          />
          <AnalyticsCard
            title="AI Predictions"
            value="94%"
            icon={BarChart2}
            trend={{ value: "2% improvement", positive: true }}
          />
        </div>

        {/* Map Section */}
        <Card className="bg-police-800/40 backdrop-blur-lg border-police-700 mb-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Live Safety Map</h3>
            <CrimeHeatmap mapType="safety" height="400px" />
          </CardContent>
        </Card>

        {/* Quick Access Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link to="/citizen/complaint" className="group">
            <Card className="bg-police-800/40 backdrop-blur-lg border-police-700 hover:bg-police-700/60 transition-colors">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <FileText className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-semibold mb-2">File a Complaint</h3>
                <p className="text-sm text-gray-300">Report incidents quickly and securely</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/citizen/track" className="group">
            <Card className="bg-police-800/40 backdrop-blur-lg border-police-700 hover:bg-police-700/60 transition-colors">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Search className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-semibold mb-2">Track Complaint</h3>
                <p className="text-sm text-gray-300">Follow the progress of your case</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/citizen/safety-map" className="group">
            <Card className="bg-police-800/40 backdrop-blur-lg border-police-700 hover:bg-police-700/60 transition-colors">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <MapPin className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-semibold mb-2">Safety Map</h3>
                <p className="text-sm text-gray-300">View crime patterns in your area</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/citizen/community" className="group">
            <Card className="bg-police-800/40 backdrop-blur-lg border-police-700 hover:bg-police-700/60 transition-colors">
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
