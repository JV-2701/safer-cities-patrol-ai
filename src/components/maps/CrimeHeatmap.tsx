
import React from "react";
import { Map, MapPin, AlertTriangle } from "lucide-react";

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
  return (
    <div 
      className="relative w-full rounded-lg overflow-hidden bg-police-800/50 border border-police-700"
      style={{ height }}
    >
      {/* Map placeholder */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <Map className="h-12 w-12 text-primary mx-auto mb-3 opacity-60" />
          <p className="text-gray-300">
            {mapType === "safety" && "Safety Map with Hotspots"}
            {mapType === "heatmap" && "Crime Density Heatmap"}
            {mapType === "patrol" && "Patrol Routes and Coverage"}
            {mapType === "prediction" && "AI-Predicted Crime Hotspots"}
          </p>
        </div>
      </div>
      
      {/* Sample alerts */}
      {mapType === "safety" && (
        <>
          <div className="absolute top-1/4 left-1/3">
            <div className="animate-ping absolute h-5 w-5 rounded-full bg-alert/40"></div>
            <AlertTriangle className="relative h-5 w-5 text-alert" />
          </div>
          <div className="absolute bottom-1/3 right-1/4">
            <div className="animate-ping absolute h-5 w-5 rounded-full bg-alert/40"></div>
            <AlertTriangle className="relative h-5 w-5 text-alert" />
          </div>
        </>
      )}
      
      {/* Sample hotspots */}
      {mapType === "heatmap" && (
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/3 h-24 w-24 rounded-full bg-red-500/30 blur-xl"></div>
          <div className="absolute bottom-1/3 right-1/4 h-32 w-32 rounded-full bg-red-500/20 blur-xl"></div>
          <div className="absolute top-1/2 right-1/3 h-20 w-20 rounded-full bg-yellow-500/20 blur-xl"></div>
        </div>
      )}
      
      {/* Sample prediction zones */}
      {mapType === "prediction" && (
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/3 h-28 w-28 rounded-full bg-purple-500/20 blur-xl border-2 border-dashed border-purple-500/40"></div>
          <div className="absolute bottom-1/3 right-1/4 h-36 w-36 rounded-full bg-blue-500/20 blur-xl border-2 border-dashed border-blue-500/40"></div>
        </div>
      )}
      
      {/* Map controls */}
      {showControls && (
        <div className="absolute top-3 right-3 bg-police-900/80 p-2 rounded-lg border border-police-700 space-y-2">
          <button className="h-8 w-8 flex items-center justify-center rounded bg-police-800 hover:bg-police-700 text-white">+</button>
          <button className="h-8 w-8 flex items-center justify-center rounded bg-police-800 hover:bg-police-700 text-white">−</button>
        </div>
      )}
    </div>
  );
};

export default CrimeHeatmap;
