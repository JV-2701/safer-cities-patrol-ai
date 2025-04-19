
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
  Zap,
  Users,
  Shield
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
import { PDFDownloader } from "@/components/admin/PDFDownloader";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const AdminHeatmaps = () => {
  const [mapType, setMapType] = useState("real-time");
  const [timeRange, setTimeRange] = useState("7d");
  const [crimeType, setCrimeType] = useState("all");
  const [area, setArea] = useState("all");
  const [activeLayers, setActiveLayers] = useState({
    crimeHeatmap: true,
    dbscanClusters: false,
    policeStations: false,
    wardBoundaries: false,
    patrolRoutes: false
  });
  const [showDispatchDialog, setShowDispatchDialog] = useState(false);
  const { toast } = useToast();

  const handleExportData = () => {
    toast({
      title: "Exporting Map Data",
      description: "Your data is being prepared for download",
    });
  };

  const handleApplyFilters = () => {
    toast({
      title: "Filters Applied",
      description: `Showing ${crimeType} data for ${area} in the last ${timeRange}`,
    });
  };

  const handleDispatchPatrols = () => {
    setShowDispatchDialog(true);
  };

  const toggleLayer = (layer: keyof typeof activeLayers) => {
    setActiveLayers(prev => ({
      ...prev,
      [layer]: !prev[layer]
    }));
    
    toast({
      title: `${activeLayers[layer] ? "Hiding" : "Showing"} ${layer} layer`,
      description: `The ${layer} layer has been ${activeLayers[layer] ? "hidden" : "shown"} on the map`,
    });
  };

  const DispatchPatrolsDialog = () => (
    <Dialog open={showDispatchDialog} onOpenChange={setShowDispatchDialog}>
      <DialogContent className="bg-police-900 border-police-700 text-white">
        <DialogHeader>
          <DialogTitle>Dispatch Preventive Patrols</DialogTitle>
          <DialogDescription className="text-gray-400">
            Select patrol units to dispatch to high-risk areas
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          <div className="p-3 bg-police-800/50 rounded-lg border border-police-700">
            <h3 className="text-sm font-medium mb-2">MG Road, Central Pune</h3>
            <p className="text-xs text-gray-300 mb-3">Predicted Crime Type: Theft (89% confidence)</p>
            
            <div className="space-y-2">
              <label className="text-sm">Assign Patrol Unit</label>
              <Select defaultValue="alpha">
                <SelectTrigger className="bg-police-800 border-police-700 text-white">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent className="bg-police-800 border-police-700 text-white">
                  <SelectItem value="alpha">Alpha Team</SelectItem>
                  <SelectItem value="bravo">Bravo Team</SelectItem>
                  <SelectItem value="charlie">Charlie Team</SelectItem>
                  <SelectItem value="delta">Delta Team</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="p-3 bg-police-800/50 rounded-lg border border-police-700">
            <h3 className="text-sm font-medium mb-2">Koregaon Park, East Pune</h3>
            <p className="text-xs text-gray-300 mb-3">Predicted Crime Type: Vehicle Theft (81% confidence)</p>
            
            <div className="space-y-2">
              <label className="text-sm">Assign Patrol Unit</label>
              <Select defaultValue="bravo">
                <SelectTrigger className="bg-police-800 border-police-700 text-white">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent className="bg-police-800 border-police-700 text-white">
                  <SelectItem value="alpha">Alpha Team</SelectItem>
                  <SelectItem value="bravo">Bravo Team</SelectItem>
                  <SelectItem value="charlie">Charlie Team</SelectItem>
                  <SelectItem value="delta">Delta Team</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="p-3 bg-police-800/50 rounded-lg border border-police-700">
            <h3 className="text-sm font-medium mb-2">Aundh, West Pune</h3>
            <p className="text-xs text-gray-300 mb-3">Predicted Crime Type: Burglary (76% confidence)</p>
            
            <div className="space-y-2">
              <label className="text-sm">Assign Patrol Unit</label>
              <Select defaultValue="charlie">
                <SelectTrigger className="bg-police-800 border-police-700 text-white">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent className="bg-police-800 border-police-700 text-white">
                  <SelectItem value="alpha">Alpha Team</SelectItem>
                  <SelectItem value="bravo">Bravo Team</SelectItem>
                  <SelectItem value="charlie">Charlie Team</SelectItem>
                  <SelectItem value="delta">Delta Team</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="pt-4 flex space-x-3">
            <Button 
              className="flex-1"
              onClick={() => {
                toast({
                  title: "Patrols Dispatched",
                  description: "Patrol units have been notified of high-risk areas",
                });
                setShowDispatchDialog(false);
              }}
            >
              <Shield className="h-4 w-4 mr-2" />
              Dispatch Patrols
            </Button>
            
            <Button 
              variant="outline" 
              className="flex-1 bg-police-800 hover:bg-police-700 border-police-700"
              onClick={() => setShowDispatchDialog(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

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
                <Button className="w-full" onClick={handleApplyFilters}>Apply Filters</Button>
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
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={`h-7 text-xs ${activeLayers.crimeHeatmap ? 'bg-primary/20 hover:bg-primary/30 border-primary/20' : 'bg-police-700 hover:bg-police-600 border-police-600'}`}
                    onClick={() => toggleLayer('crimeHeatmap')}
                  >
                    {activeLayers.crimeHeatmap ? 'Active' : 'Show'}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm">DBSCAN Clusters</label>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={`h-7 text-xs ${activeLayers.dbscanClusters ? 'bg-primary/20 hover:bg-primary/30 border-primary/20' : 'bg-police-700 hover:bg-police-600 border-police-600'}`}
                    onClick={() => toggleLayer('dbscanClusters')}
                  >
                    {activeLayers.dbscanClusters ? 'Active' : 'Show'}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm">Police Stations</label>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={`h-7 text-xs ${activeLayers.policeStations ? 'bg-primary/20 hover:bg-primary/30 border-primary/20' : 'bg-police-700 hover:bg-police-600 border-police-600'}`}
                    onClick={() => toggleLayer('policeStations')}
                  >
                    {activeLayers.policeStations ? 'Active' : 'Show'}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm">Ward Boundaries</label>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={`h-7 text-xs ${activeLayers.wardBoundaries ? 'bg-primary/20 hover:bg-primary/30 border-primary/20' : 'bg-police-700 hover:bg-police-600 border-police-600'}`}
                    onClick={() => toggleLayer('wardBoundaries')}
                  >
                    {activeLayers.wardBoundaries ? 'Active' : 'Show'}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm">Patrol Routes</label>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={`h-7 text-xs ${activeLayers.patrolRoutes ? 'bg-primary/20 hover:bg-primary/30 border-primary/20' : 'bg-police-700 hover:bg-police-600 border-police-600'}`}
                    onClick={() => toggleLayer('patrolRoutes')}
                  >
                    {activeLayers.patrolRoutes ? 'Active' : 'Show'}
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
                
                <PDFDownloader 
                  filename="heatmap-data.pdf" 
                  documentTitle="Crime Heatmap Analysis"
                  content="heatmap"
                >
                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Export Map Data
                  </Button>
                </PDFDownloader>
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
                    <Users className="h-4 w-4 mr-2" />
                    Dispatch Preventive Patrols
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      
      {/* Dispatch Patrols Dialog */}
      <DispatchPatrolsDialog />
    </div>
  );
};

export default AdminHeatmaps;
