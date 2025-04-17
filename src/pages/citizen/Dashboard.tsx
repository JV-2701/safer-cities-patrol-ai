
import React from "react";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, FileText, Search, MapPin, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import CrimeHeatmap from "@/components/maps/CrimeHeatmap";

const CitizenDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-police-950 to-police-900 text-white">
      <Navbar type="citizen" />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Welcome, Citizen</h1>
          <div className="flex items-center space-x-2 bg-police-800/50 backdrop-blur-sm py-1 px-3 rounded-full">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-sm">Systems Operational</span>
          </div>
        </div>
        
        {/* Alert Banner */}
        <div className="mb-8 bg-alert/20 backdrop-blur-sm border border-alert/30 rounded-lg p-4 flex items-start space-x-3">
          <AlertTriangle className="h-6 w-6 text-alert flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-alert-light">Safety Alert: Pune Central Area</h3>
            <p className="text-sm text-gray-300 mt-1">
              Increased incidents reported near MG Road between 10 PM - 2 AM. Authorities recommend avoiding the area during these hours.
            </p>
          </div>
        </div>
        
        {/* Quick Actions */}
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-police-800/30 backdrop-blur-sm border-police-700 hover:bg-police-800/50 transition-colors">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <FileText className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-semibold mb-1">File a Complaint</h3>
              <p className="text-sm text-gray-300 mb-4">Report incidents or suspicions</p>
              <Button variant="default" size="sm" className="mt-auto" asChild>
                <Link to="/citizen/complaint">
                  <FileText className="h-4 w-4 mr-2" />
                  Start Now
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-police-800/30 backdrop-blur-sm border-police-700 hover:bg-police-800/50 transition-colors">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Search className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-semibold mb-1">Track Complaint</h3>
              <p className="text-sm text-gray-300 mb-4">Check status of your reports</p>
              <Button variant="default" size="sm" className="mt-auto" asChild>
                <Link to="/citizen/track">
                  <Search className="h-4 w-4 mr-2" />
                  Track Now
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-police-800/30 backdrop-blur-sm border-police-700 hover:bg-police-800/50 transition-colors">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <MapPin className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-semibold mb-1">Safety Map</h3>
              <p className="text-sm text-gray-300 mb-4">View crime patterns near you</p>
              <Button variant="default" size="sm" className="mt-auto" asChild>
                <Link to="/citizen/safety-map">
                  <MapPin className="h-4 w-4 mr-2" />
                  Open Map
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Activity */}
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <Card className="bg-police-800/30 backdrop-blur-sm border-police-700 mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Your Recent Complaints</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: "SP-2025-04-782", status: "Resolved", date: "15 Apr 2025", type: "Theft" },
                { id: "SP-2025-03-651", status: "In Progress", date: "23 Mar 2025", type: "Suspicious Activity" },
                { id: "SP-2025-02-429", status: "Assigned", date: "12 Feb 2025", type: "Noise Complaint" }
              ].map((complaint) => (
                <div key={complaint.id} className="flex items-center justify-between p-3 bg-police-800/50 rounded-lg">
                  <div>
                    <div className="font-medium">{complaint.id}</div>
                    <div className="text-sm text-gray-300">{complaint.type} • {complaint.date}</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      complaint.status === "Resolved" 
                        ? "bg-success/20 text-success-light" 
                        : complaint.status === "In Progress" 
                          ? "bg-yellow-500/20 text-yellow-200" 
                          : "bg-blue-500/20 text-blue-200"
                    }`}>
                      {complaint.status}
                    </span>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white" asChild>
                      <Link to={`/citizen/track?id=${complaint.id}`}>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Add heatmap section */}
        <h2 className="text-xl font-semibold mb-4">Safety Heatmap</h2>
        <Card className="bg-police-800/30 backdrop-blur-sm border-police-700 mb-8">
          <CardContent className="p-6">
            <CrimeHeatmap mapType="heatmap" height="400px" />
          </CardContent>
        </Card>
        
        {/* Safety Tips */}
        <h2 className="text-xl font-semibold mb-4">Safety Tips</h2>
        <Card className="bg-police-800/30 backdrop-blur-sm border-police-700">
          <CardContent className="p-6">
            <div className="text-sm space-y-2">
              <p className="flex items-start">
                <span className="inline-block bg-primary/20 text-primary-foreground p-1 rounded mr-2">•</span>
                Always keep emergency contacts saved and easily accessible
              </p>
              <p className="flex items-start">
                <span className="inline-block bg-primary/20 text-primary-foreground p-1 rounded mr-2">•</span>
                Be aware of your surroundings, especially when using mobile devices in public
              </p>
              <p className="flex items-start">
                <span className="inline-block bg-primary/20 text-primary-foreground p-1 rounded mr-2">•</span>
                Report suspicious activities or persons immediately through the app
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CitizenDashboard;
