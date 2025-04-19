
import React, { useState } from "react";
import { Map, MapPin, AlertTriangle, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface CrimeHeatmapProps {
  mapType?: "safety" | "heatmap" | "patrol" | "prediction";
  showControls?: boolean;
  height?: string;
}

const CrimeHeatmap: React.FC<CrimeHeatmapProps> = ({ 
  mapType = "safety", 
  showControls = true,
  height = "600px"
}) => {
  const [timeRange, setTimeRange] = useState("week");
  const [crimeType, setCrimeType] = useState("all");
  const [activeLayers, setActiveLayers] = useState({
    heatmap: true,
    stations: false,
    patrols: false,
    clusters: false,
    corridors: false,
    wards: false
  });
  const { toast } = useToast();
  
  const toggleLayer = (layerName: keyof typeof activeLayers) => {
    setActiveLayers(prev => ({
      ...prev,
      [layerName]: !prev[layerName]
    }));
    
    toast({
      title: `${activeLayers[layerName] ? "Hiding" : "Showing"} ${layerName} layer`,
      description: `The ${layerName} layer has been ${activeLayers[layerName] ? "hidden" : "shown"} on the map`,
    });
  };
  
  const handleZoomIn = () => {
    toast({
      title: "Zooming In",
      description: "Map zoomed in",
    });
  };
  
  const handleZoomOut = () => {
    toast({
      title: "Zooming Out",
      description: "Map zoomed out",
    });
  };
  
  const handleFilterChange = () => {
    toast({
      title: "Filters Applied",
      description: `Showing ${crimeType} crimes for the last ${timeRange}`,
    });
  };
  
  // These would be dynamically generated in a real app
  const getHeatmapGradient = () => {
    if (mapType === "heatmap") {
      return (
        <>
          <div className="absolute top-1/4 left-1/3 h-36 w-36 rounded-full bg-red-500/40 blur-xl"></div>
          <div className="absolute bottom-1/3 right-1/4 h-48 w-48 rounded-full bg-red-500/30 blur-xl"></div>
          <div className="absolute top-1/2 right-1/3 h-32 w-32 rounded-full bg-yellow-500/30 blur-xl"></div>
          <div className="absolute bottom-1/4 left-1/4 h-40 w-40 rounded-full bg-orange-500/20 blur-xl"></div>
        </>
      );
    }
    
    if (mapType === "prediction") {
      return (
        <>
          <div className="absolute top-1/4 left-1/3 h-40 w-40 rounded-full bg-purple-500/30 blur-xl border-2 border-dashed border-purple-500/40"></div>
          <div className="absolute bottom-1/3 right-1/4 h-48 w-48 rounded-full bg-blue-500/20 blur-xl border-2 border-dashed border-blue-500/40"></div>
          <div className="absolute top-2/3 left-1/2 h-36 w-36 rounded-full bg-green-500/20 blur-xl border-2 border-dashed border-green-500/40"></div>
        </>
      );
    }
    
    if (mapType === "patrol") {
      return (
        <>
          {/* Coverage areas */}
          {activeLayers.patrols && (
            <>
              <div className="absolute top-1/3 left-1/4 h-64 w-64 rounded-full bg-primary/10 blur-sm border border-primary/30"></div>
              <div className="absolute bottom-1/3 right-1/4 h-56 w-56 rounded-full bg-primary/10 blur-sm border border-primary/30"></div>
              
              {/* Patrol routes */}
              <div className="absolute top-1/3 left-1/4 w-[70%] h-1 bg-primary/60 rounded-full transform rotate-12"></div>
              <div className="absolute top-1/2 left-1/5 w-[60%] h-1 bg-primary/60 rounded-full transform -rotate-12"></div>
              <div className="absolute bottom-1/3 right-1/3 w-[40%] h-1 bg-primary/60 rounded-full transform rotate-45"></div>
              
              {/* Officers */}
              <div className="absolute top-1/3 left-1/4 h-4 w-4 rounded-full bg-primary"></div>
              <div className="absolute top-1/2 right-1/3 h-4 w-4 rounded-full bg-primary"></div>
              <div className="absolute bottom-1/3 left-1/2 h-4 w-4 rounded-full bg-primary"></div>
            </>
          )}
        </>
      );
    }
    
    // Default for safety map
    return (
      <>
        {activeLayers.heatmap && (
          <>
            <div className="absolute top-1/4 left-1/3">
              <div className="animate-ping absolute h-5 w-5 rounded-full bg-alert/40"></div>
              <AlertTriangle className="relative h-5 w-5 text-alert" />
            </div>
            <div className="absolute bottom-1/3 right-1/4">
              <div className="animate-ping absolute h-5 w-5 rounded-full bg-alert/40"></div>
              <AlertTriangle className="relative h-5 w-5 text-alert" />
            </div>
            <div className="absolute top-2/3 left-1/2">
              <div className="animate-ping absolute h-5 w-5 rounded-full bg-yellow-500/40"></div>
              <AlertTriangle className="relative h-5 w-5 text-yellow-500" />
            </div>
            <div className="absolute top-1/3 right-1/3">
              <div className="animate-ping absolute h-5 w-5 rounded-full bg-orange-500/40"></div>
              <AlertTriangle className="relative h-5 w-5 text-orange-500" />
            </div>
          </>
        )}
        
        {activeLayers.stations && (
          <>
            <div className="absolute top-1/3 left-1/3 bg-police-700 p-1 rounded-md border border-police-600">
              <MapPin className="h-4 w-4 text-primary" />
            </div>
            <div className="absolute bottom-1/3 right-1/3 bg-police-700 p-1 rounded-md border border-police-600">
              <MapPin className="h-4 w-4 text-primary" />
            </div>
            <div className="absolute top-2/3 right-1/4 bg-police-700 p-1 rounded-md border border-police-600">
              <MapPin className="h-4 w-4 text-primary" />
            </div>
          </>
        )}
        
        {activeLayers.corridors && (
          <>
            <div className="absolute left-1/4 right-1/4 top-1/2 h-3 bg-success/20 border border-success/30 rounded-full"></div>
            <div className="absolute top-1/3 bottom-1/3 left-1/2 w-3 bg-success/20 border border-success/30 rounded-full"></div>
          </>
        )}
        
        {activeLayers.wards && (
          <>
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-1 pointer-events-none">
              {Array.from({ length: 9 }).map((_, index) => (
                <div 
                  key={index} 
                  className="border border-dashed border-gray-500/20 rounded-md"
                ></div>
              ))}
            </div>
          </>
        )}
      </>
    );
  };

  return (
    <div 
      className="relative w-full rounded-lg overflow-hidden bg-police-800/50 border border-police-700"
      style={{ height }}
    >
      {/* Map placeholder with simulated city grid */}
      <div className="absolute inset-0 bg-police-900/60">
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-1 opacity-20">
          {Array.from({ length: 12 }).map((_, rowIndex) => 
            Array.from({ length: 12 }).map((_, colIndex) => (
              <div 
                key={`${rowIndex}-${colIndex}`} 
                className="border border-gray-600"
              ></div>
            ))
          )}
        </div>
        
        {/* Main roads */}
        <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-500/30"></div>
        <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-gray-500/30"></div>
        <div className="absolute left-0 right-0 top-1/4 h-0.5 bg-gray-500/20"></div>
        <div className="absolute left-0 right-0 top-3/4 h-0.5 bg-gray-500/20"></div>
        <div className="absolute top-0 bottom-0 left-1/4 w-0.5 bg-gray-500/20"></div>
        <div className="absolute top-0 bottom-0 left-3/4 w-0.5 bg-gray-500/20"></div>
      </div>
      
      {/* Heatmap or safety overlays */}
      <div className="absolute inset-0">
        {getHeatmapGradient()}
      </div>
      
      {/* Center city label */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-gray-400 text-xs font-medium bg-police-800/80 px-2 py-1 rounded">
        PUNE CITY CENTER
      </div>
      
      {/* Area labels */}
      <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 text-center text-gray-400 text-xs bg-police-800/80 px-1.5 py-0.5 rounded">
        Koregaon Park
      </div>
      <div className="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2 text-center text-gray-400 text-xs bg-police-800/80 px-1.5 py-0.5 rounded">
        Aundh
      </div>
      <div className="absolute top-1/4 right-1/4 transform translate-x-1/2 -translate-y-1/2 text-center text-gray-400 text-xs bg-police-800/80 px-1.5 py-0.5 rounded">
        Viman Nagar
      </div>
      <div className="absolute bottom-1/4 left-1/4 transform -translate-x-1/2 translate-y-1/2 text-center text-gray-400 text-xs bg-police-800/80 px-1.5 py-0.5 rounded">
        Shivaji Nagar
      </div>
      
      {/* Map controls */}
      {showControls && (
        <>
          <div className="absolute top-3 right-3 bg-police-900/80 p-2 rounded-lg border border-police-700 space-y-2">
            <button 
              className="h-8 w-8 flex items-center justify-center rounded bg-police-800 hover:bg-police-700 text-white"
              onClick={handleZoomIn}
            >+</button>
            <button 
              className="h-8 w-8 flex items-center justify-center rounded bg-police-800 hover:bg-police-700 text-white"
              onClick={handleZoomOut}
            >−</button>
          </div>
          
          <div className="absolute top-3 left-3 bg-police-900/80 p-2 rounded-lg border border-police-700 flex space-x-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32 bg-police-800 border-police-700 text-white h-8 text-xs">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent className="bg-police-800 border-police-700 text-white">
                <SelectItem value="day">Last 24 Hours</SelectItem>
                <SelectItem value="week">Last 7 Days</SelectItem>
                <SelectItem value="month">Last 30 Days</SelectItem>
                <SelectItem value="year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={crimeType} onValueChange={setCrimeType}>
              <SelectTrigger className="w-32 bg-police-800 border-police-700 text-white h-8 text-xs">
                <SelectValue placeholder="Crime Type" />
              </SelectTrigger>
              <SelectContent className="bg-police-800 border-police-700 text-white">
                <SelectItem value="all">All Crimes</SelectItem>
                <SelectItem value="theft">Theft</SelectItem>
                <SelectItem value="assault">Assault</SelectItem>
                <SelectItem value="burglary">Burglary</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 bg-police-800 border-police-700 text-white"
              onClick={handleFilterChange}
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="absolute bottom-3 left-3 p-2 rounded-lg bg-police-900/80 border border-police-700">
            <div className="flex items-center space-x-2 text-xs text-gray-300">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <span>High Activity</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-300">
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <span>Medium Activity</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-300">
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              <span>Low Activity</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CrimeHeatmap;
