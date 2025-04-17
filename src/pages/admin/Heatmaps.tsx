
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Map, 
  Calendar, 
  Clock, 
  Layers, 
  Info, 
  AlertTriangle, 
  Download,
  Zap
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CrimeHeatmap from "@/components/maps/CrimeHeatmap";
import { useToast } from "@/hooks/use-toast";

const AdminHeatmaps = () => {
  const [mapType, setMapType] = useState("real-time");
  const [timeRange, setTimeRange] = useState("7d");
  const [crimeType, setCrimeType] = useState("all");
  const [area, setArea] = useState("all");
  const { toast } = useToast();

  const handleExportData = () => {
    toast({
      title: "Exporting Map Data",
      description: "Your data is being prepared for download",
    });
  };

  const handleDispatchPatrols = () => {
    toast({
      title: "Dispatching Patrols",
      description: "Patrol units have been notified of high-risk areas",
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-police-950 to-police-900 text-white">
      <Navbar type="admin" />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Map className="h-6 w-6 text-primary mr-3" />
          <h1 className="text-3xl font-bold">Crime Heatmaps</h1>
        </div>
        
        {/* Map Type Selector */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Button 
            variant={mapType === "historical" ? "default" : "outline"} 
            className={mapType !== "historical" ? "bg-police-700 hover:bg-police-600 border-police-600" : ""}
            onClick={() => setMapType("historical")}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Historical Data
          </Button>
          <Button 
            variant={mapType === "real-time" ? "default" : "outline"}
            className={mapType !== "real-time" ? "bg-police-700 hover:bg-police-600 border-police-600" : ""} 
            onClick={() => setMapType("real-time")}
          >
            <Clock className="h-4 w-4 mr-2" />
            Real-Time
          </Button>
          <Button 
            variant={mapType === "forecasted" ? "default" : "outline"}
            className={mapType !== "forecasted" ? "bg-police-700 hover:bg-police-600 border-police-600" : ""} 
            onClick={() => setMapType("forecasted")}
          >
            <Zap className="h-4 w-4 mr-2" />
            LSTM Predictions
          </Button>
        </div>
        
        {/* Map Filters */}
        <Card className="bg-police-800/40 backdrop-blur-lg border-police-700 mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                    <SelectItem value="robbery">Robbery</SelectItem>
                    <SelectItem value="vehicle">Vehicle Crime</SelectItem>
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
                    <SelectItem value="all">All Pune</SelectItem>
                    <SelectItem value="central">Central Pune</SelectItem>
                    <SelectItem value="east">East Pune</SelectItem>
                    <SelectItem value="west">West Pune</SelectItem>
                    <SelectItem value="north">North Pune</SelectItem>
                    <SelectItem value="south">South Pune</SelectItem>
                    <SelectItem value="pimpri">Pimpri-Chinchwad</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <Button className="w-full">Apply Filters</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Card className="bg-police-800/40 backdrop-blur-lg border-police-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  {mapType === "historical" && "Historical Crime Patterns"}
                  {mapType === "real-time" && "Real-Time Crime Activity"}
                  {mapType === "forecasted" && "AI-Predicted Crime Hotspots (Next 7 Days)"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CrimeHeatmap 
                  mapType={mapType === "forecasted" ? "prediction" : "heatmap"} 
                />
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card className="bg-police-800/40 backdrop-blur-lg border-police-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Layers className="h-5 w-5 text-primary mr-2" />
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
                  <label className="text-sm">DBSCAN Clusters</label>
                  <Button variant="outline" size="sm" className="h-7 text-xs bg-police-700 hover:bg-police-600 border-police-600">
                    Show
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm">Police Stations</label>
                  <Button variant="outline" size="sm" className="h-7 text-xs bg-police-700 hover:bg-police-600 border-police-600">
                    Show
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm">Ward Boundaries</label>
                  <Button variant="outline" size="sm" className="h-7 text-xs bg-police-700 hover:bg-police-600 border-police-600">
                    Hide
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm">Patrol Routes</label>
                  <Button variant="outline" size="sm" className="h-7 text-xs bg-police-700 hover:bg-police-600 border-police-600">
                    Show
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-police-800/40 backdrop-blur-lg border-police-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Info className="h-5 w-5 text-primary mr-2" />
                  {mapType === "forecasted" ? "LSTM Model Info" : "Heatmap Info"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mapType === "forecasted" ? (
                  <>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-300">Model Accuracy</p>
                      <p className="font-medium">92%</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-300">Prediction Window</p>
                      <p className="font-medium">7 Days</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-300">Training Data</p>
                      <p className="font-medium">3 Years</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-300">Last Updated</p>
                      <p className="font-medium">Today, 08:30 AM</p>
                    </div>
                    <div className="p-3 bg-police-700/50 rounded-lg">
                      <p className="text-sm">This forecast uses Long Short-Term Memory (LSTM) neural network with temporal and spatial features to predict crime hotspots.</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-300">Total Incidents</p>
                      <p className="font-medium">487</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-300">Identified Clusters</p>
                      <p className="font-medium">7</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-300">Clustering Algorithm</p>
                      <p className="font-medium">DBSCAN</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-300">Last Updated</p>
                      <p className="font-medium">{mapType === "real-time" ? "Live" : "Today, 08:30 AM"}</p>
                    </div>
                    <div className="p-3 bg-police-700/50 rounded-lg">
                      <p className="text-sm">The heatmap uses Density-Based Spatial Clustering of Applications with Noise (DBSCAN) to identify crime hotspots.</p>
                    </div>
                  </>
                )}
                
                <Button className="w-full" onClick={handleExportData}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Map Data
                </Button>
              </CardContent>
            </Card>
            
            {mapType === "forecasted" && (
              <Card className="bg-alert/10 backdrop-blur-lg border-alert/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <AlertTriangle className="h-5 w-5 text-alert mr-2" />
                    High Risk Areas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-alert/10 rounded-lg">
                    <p className="font-medium text-sm">MG Road, Central Pune</p>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-xs text-gray-300">Predicted Crime Type:</p>
                      <span className="text-xs px-2 py-1 rounded-full bg-alert/20 text-alert-light">Theft</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Model Confidence: 89%</p>
                  </div>
                  
                  <div className="p-3 bg-alert/10 rounded-lg">
                    <p className="font-medium text-sm">Koregaon Park, East Pune</p>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-xs text-gray-300">Predicted Crime Type:</p>
                      <span className="text-xs px-2 py-1 rounded-full bg-alert/20 text-alert-light">Vehicle Theft</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Model Confidence: 81%</p>
                  </div>
                  
                  <div className="p-3 bg-alert/10 rounded-lg">
                    <p className="font-medium text-sm">Aundh, West Pune</p>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-xs text-gray-300">Predicted Crime Type:</p>
                      <span className="text-xs px-2 py-1 rounded-full bg-alert/20 text-alert-light">Burglary</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Model Confidence: 76%</p>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full bg-alert/20 hover:bg-alert/30 border-alert/30 text-white"
                    onClick={handleDispatchPatrols}
                  >
                    Dispatch Preventive Patrols
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminHeatmaps;
