
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Calendar, Filter, MapPin, Layers, Navigation, Download, Route } from "lucide-react";
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

const CitizenSafetyMap = () => {
  const [crimeType, setCrimeType] = useState("all");
  const [timeRange, setTimeRange] = useState("24h");
  const [area, setArea] = useState("pune");
  const [routePlannerOpen, setRoutePlannerOpen] = useState(false);
  const [mapLayers, setMapLayers] = useState({
    crimeHeatmap: true,
    policeStations: false,
    patrolRoutes: false,
    safeCorridors: false
  });
  const { toast } = useToast();

  const handleFindSafeRoute = () => {
    setRoutePlannerOpen(true);
  };

  const handleFilterApply = () => {
    toast({
      title: "Filters Applied",
      description: `Showing ${crimeType} incidents in the ${area} area for the last ${timeRange}`,
    });
  };

  const handleAlertClick = (area: string) => {
    toast({
      title: `Alert: ${area}`,
      description: "Showing details for active alert in this area",
      variant: "destructive",
    });
  };

  const toggleMapLayer = (layer: keyof typeof mapLayers) => {
    setMapLayers(prev => ({
      ...prev,
      [layer]: !prev[layer]
    }));

    toast({
      title: `Layer ${mapLayers[layer] ? "Hidden" : "Shown"}`,
      description: `The ${layer} layer has been ${mapLayers[layer] ? "hidden" : "shown"} on the map`,
    });
  };

  const SafeRoutePlanner = () => (
    <Dialog open={routePlannerOpen} onOpenChange={setRoutePlannerOpen}>
      <DialogContent className="bg-police-900 border-police-700 text-white">
        <DialogHeader>
          <DialogTitle>Safe Route Planner</DialogTitle>
          <DialogDescription className="text-gray-400">
            Plan the safest route for your journey
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Starting Point</label>
            <Select defaultValue="current">
              <SelectTrigger className="bg-police-800 border-police-700 text-white">
                <SelectValue placeholder="Select starting point" />
              </SelectTrigger>
              <SelectContent className="bg-police-800 border-police-700 text-white">
                <SelectItem value="current">Current Location</SelectItem>
                <SelectItem value="koregaon">Koregaon Park</SelectItem>
                <SelectItem value="aundh">Aundh</SelectItem>
                <SelectItem value="mg-road">MG Road</SelectItem>
                <SelectItem value="viman">Viman Nagar</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Destination</label>
            <Select defaultValue="mg-road">
              <SelectTrigger className="bg-police-800 border-police-700 text-white">
                <SelectValue placeholder="Select destination" />
              </SelectTrigger>
              <SelectContent className="bg-police-800 border-police-700 text-white">
                <SelectItem value="koregaon">Koregaon Park</SelectItem>
                <SelectItem value="aundh">Aundh</SelectItem>
                <SelectItem value="mg-road">MG Road</SelectItem>
                <SelectItem value="viman">Viman Nagar</SelectItem>
                <SelectItem value="shivaji">Shivaji Nagar</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Travel Method</label>
            <Select defaultValue="car">
              <SelectTrigger className="bg-police-800 border-police-700 text-white">
                <SelectValue placeholder="Select travel method" />
              </SelectTrigger>
              <SelectContent className="bg-police-800 border-police-700 text-white">
                <SelectItem value="car">Car</SelectItem>
                <SelectItem value="public">Public Transport</SelectItem>
                <SelectItem value="walk">Walking</SelectItem>
                <SelectItem value="bike">Bike</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Time of Travel</label>
            <Select defaultValue="now">
              <SelectTrigger className="bg-police-800 border-police-700 text-white">
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent className="bg-police-800 border-police-700 text-white">
                <SelectItem value="now">Now</SelectItem>
                <SelectItem value="morning">Morning (6AM-10AM)</SelectItem>
                <SelectItem value="afternoon">Afternoon (10AM-4PM)</SelectItem>
                <SelectItem value="evening">Evening (4PM-8PM)</SelectItem>
                <SelectItem value="night">Night (8PM-6AM)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="pt-4 flex space-x-2">
            <Button 
              className="flex-1"
              onClick={() => {
                toast({
                  title: "Safe Route Generated",
                  description: "Your safest route has been calculated and shown on the map",
                });
                setRoutePlannerOpen(false);
              }}
            >
              <Route className="h-4 w-4 mr-2" />
              Generate Route
            </Button>
            
            <Button 
              variant="outline" 
              className="flex-1 bg-police-800 border-police-700"
              onClick={() => setRoutePlannerOpen(false)}
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
            
            <Button onClick={handleFilterApply} className="mt-4">
              Apply Filters
            </Button>
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
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={`h-7 text-xs ${mapLayers.crimeHeatmap ? 'bg-primary/20 hover:bg-primary/30 border-primary/20' : 'bg-police-700 hover:bg-police-600 border-police-600'}`}
                    onClick={() => toggleMapLayer('crimeHeatmap')}
                  >
                    {mapLayers.crimeHeatmap ? 'Active' : 'Show'}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm">Police Stations</label>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={`h-7 text-xs ${mapLayers.policeStations ? 'bg-primary/20 hover:bg-primary/30 border-primary/20' : 'bg-police-700 hover:bg-police-600 border-police-600'}`}
                    onClick={() => toggleMapLayer('policeStations')}
                  >
                    {mapLayers.policeStations ? 'Active' : 'Show'}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm">Patrol Routes</label>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={`h-7 text-xs ${mapLayers.patrolRoutes ? 'bg-primary/20 hover:bg-primary/30 border-primary/20' : 'bg-police-700 hover:bg-police-600 border-police-600'}`}
                    onClick={() => toggleMapLayer('patrolRoutes')}
                  >
                    {mapLayers.patrolRoutes ? 'Active' : 'Show'}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm">Safe Corridors</label>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={`h-7 text-xs ${mapLayers.safeCorridors ? 'bg-primary/20 hover:bg-primary/30 border-primary/20' : 'bg-police-700 hover:bg-police-600 border-police-600'}`}
                    onClick={() => toggleMapLayer('safeCorridors')}
                  >
                    {mapLayers.safeCorridors ? 'Active' : 'Show'}
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-3">
              <Button className="w-full" onClick={handleFindSafeRoute}>
                <Navigation className="h-4 w-4 mr-2" />
                Find Safe Route
              </Button>
              
              <PDFDownloader 
                filename="safety-map-report.pdf" 
                documentTitle="Safety Map Report"
                content="safety"
              >
                <Button variant="outline" className="w-full bg-police-800 border-police-700">
                  <Download className="h-4 w-4 mr-2" />
                  Export Safety Report
                </Button>
              </PDFDownloader>
            </div>
          </div>
        </div>
      </main>
      
      {/* Safe Route Planner Dialog */}
      <SafeRoutePlanner />
    </div>
  );
};

export default CitizenSafetyMap;
