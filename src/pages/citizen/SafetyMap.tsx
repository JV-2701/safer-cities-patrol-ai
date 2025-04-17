
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Calendar, Filter, MapPin, Layers, Navigation } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CrimeHeatmap from "@/components/maps/CrimeHeatmap";
import { useToast } from "@/hooks/use-toast";

const CitizenSafetyMap = () => {
  const [crimeType, setCrimeType] = useState("all");
  const [timeRange, setTimeRange] = useState("24h");
  const [area, setArea] = useState("pune");
  const { toast } = useToast();

  const handleFindSafeRoute = () => {
    toast({
      title: "Safe Route Planner",
      description: "Planning the safest route based on current crime data",
    });
  };

  const handleAlertClick = (area: string) => {
    toast({
      title: `Alert: ${area}`,
      description: "Showing details for active alert in this area",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-police-950 to-police-900 text-white">
      <Navbar type="citizen" />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <MapPin className="h-6 w-6 text-primary mr-3" />
            <h1 className="text-3xl font-bold">Safety Map</h1>
          </div>
          <div className="flex items-center space-x-2 bg-alert/20 py-1 px-3 rounded-full border border-alert/30">
            <AlertTriangle className="h-4 w-4 text-alert" />
            <span className="text-sm">2 Active Alerts</span>
          </div>
        </div>
        
        {/* Filters */}
        <Card className="bg-police-800/40 backdrop-blur-lg border-police-700 mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filter Map Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Crime Type</label>
                <Select value={crimeType} onValueChange={setCrimeType}>
                  <SelectTrigger className="bg-police-800 border-police-700 text-white">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="bg-police-800 border-police-700 text-white">
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="theft">Theft</SelectItem>
                    <SelectItem value="assault">Assault</SelectItem>
                    <SelectItem value="burglary">Burglary</SelectItem>
                    <SelectItem value="vehicle">Vehicle Crime</SelectItem>
                    <SelectItem value="robbery">Robbery</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Time Range</label>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="bg-police-800 border-police-700 text-white">
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent className="bg-police-800 border-police-700 text-white">
                    <SelectItem value="24h">Last 24 Hours</SelectItem>
                    <SelectItem value="7d">Last 7 Days</SelectItem>
                    <SelectItem value="30d">Last 30 Days</SelectItem>
                    <SelectItem value="90d">Last 3 Months</SelectItem>
                    <SelectItem value="1y">Last Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Area</label>
                <Select value={area} onValueChange={setArea}>
                  <SelectTrigger className="bg-police-800 border-police-700 text-white">
                    <SelectValue placeholder="Select area" />
                  </SelectTrigger>
                  <SelectContent className="bg-police-800 border-police-700 text-white">
                    <SelectItem value="pune">Pune (All)</SelectItem>
                    <SelectItem value="central">Central Pune</SelectItem>
                    <SelectItem value="eastpune">East Pune</SelectItem>
                    <SelectItem value="westpune">West Pune</SelectItem>
                    <SelectItem value="pimpri">Pimpri-Chinchwad</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Map */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <CrimeHeatmap mapType="safety" />
          </div>
          
          <div className="space-y-6">
            <Card className="bg-police-800/40 backdrop-blur-lg border-police-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Active Alerts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div 
                  className="p-3 bg-alert/10 border border-alert/20 rounded-lg cursor-pointer hover:bg-alert/20 transition-colors"
                  onClick={() => handleAlertClick("MG Road Area")}
                >
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="h-4 w-4 text-alert mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-sm">MG Road Area</h3>
                      <p className="text-xs text-gray-300 mt-1">
                        Multiple thefts reported in last 6 hours
                      </p>
                      <div className="flex items-center mt-2 space-x-2">
                        <Calendar className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-400">Updated 42 min ago</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div 
                  className="p-3 bg-alert/10 border border-alert/20 rounded-lg cursor-pointer hover:bg-alert/20 transition-colors"
                  onClick={() => handleAlertClick("Koregaon Park")}
                >
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="h-4 w-4 text-alert mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-sm">Koregaon Park</h3>
                      <p className="text-xs text-gray-300 mt-1">
                        Vehicle thefts reported in parking areas
                      </p>
                      <div className="flex items-center mt-2 space-x-2">
                        <Calendar className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-400">Updated 2 hours ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-police-800/40 backdrop-blur-lg border-police-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Layers className="h-4 w-4 mr-2" />
                  Map Layers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm">Crime Heatmap</label>
                  <Button variant="outline" size="sm" className="h-7 text-xs bg-police-700 hover:bg-police-600 border-police-600">
                    Active
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm">Police Stations</label>
                  <Button variant="outline" size="sm" className="h-7 text-xs bg-police-700 hover:bg-police-600 border-police-600">
                    Show
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm">Patrol Routes</label>
                  <Button variant="outline" size="sm" className="h-7 text-xs bg-police-700 hover:bg-police-600 border-police-600">
                    Hide
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm">Safe Corridors</label>
                  <Button variant="outline" size="sm" className="h-7 text-xs bg-police-700 hover:bg-police-600 border-police-600">
                    Show
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Button className="w-full" onClick={handleFindSafeRoute}>
              <Navigation className="h-4 w-4 mr-2" />
              Find Safe Route
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CitizenSafetyMap;
