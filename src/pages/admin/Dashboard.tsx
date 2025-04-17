
import React from "react";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  BarChart, 
  Bell, 
  TrendingUp, 
  MapPin, 
  BarChart2, 
  Users, 
  Shield, 
  Calendar,
  ArrowUpRight,
  FileText
} from "lucide-react";

// Sample chart component (where we'd use Recharts in a real app)
const StatisticsChart = () => (
  <div className="h-64 bg-police-800/50 rounded-lg border border-police-700 p-4 flex items-center justify-center">
    <BarChart className="h-12 w-12 text-primary/40" />
    <p className="text-sm text-gray-400 mt-2">Chart visualization would be here using Recharts</p>
  </div>
);

// Sample map component (where we'd use Leaflet in a real app)
const PatrolMap = () => (
  <div className="h-96 bg-police-800/50 rounded-lg border border-police-700 p-4 flex items-center justify-center">
    <MapPin className="h-12 w-12 text-primary/40" />
    <p className="text-sm text-gray-400 mt-2">Interactive patrol map would be here using Leaflet</p>
  </div>
);

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-police-950 to-police-900 text-white">
      <Navbar type="admin" />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-300">Overview of police operations and real-time analytics</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="bg-police-800 border-police-700">
              <Calendar className="h-4 w-4 mr-2" />
              Today
            </Button>
            <Button variant="default">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
              <span className="ml-2 bg-police-800 text-white text-xs px-1.5 py-0.5 rounded-full">4</span>
            </Button>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-police-800/30 backdrop-blur-sm border-police-700">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-400">Total Complaints Today</p>
                  <p className="text-3xl font-bold mt-1">24</p>
                </div>
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <ArrowUpRight className="h-4 w-4 text-success mr-1" />
                <span className="text-success mr-1">+14%</span>
                <span className="text-gray-400">from yesterday</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-police-800/30 backdrop-blur-sm border-police-700">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-400">Active Hotspots</p>
                  <p className="text-3xl font-bold mt-1">7</p>
                </div>
                <div className="p-2 bg-alert/10 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-alert" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <ArrowUpRight className="h-4 w-4 text-alert mr-1" />
                <span className="text-alert mr-1">+3</span>
                <span className="text-gray-400">from yesterday</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-police-800/30 backdrop-blur-sm border-police-700">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-400">Patrols in Action</p>
                  <p className="text-3xl font-bold mt-1">18</p>
                </div>
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <span className="text-gray-400">Covering 85% of hotspots</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-police-800/30 backdrop-blur-sm border-police-700">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-400">AI Prediction Accuracy</p>
                  <p className="text-3xl font-bold mt-1">92%</p>
                </div>
                <div className="p-2 bg-primary/10 rounded-lg">
                  <BarChart2 className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <TrendingUp className="h-4 w-4 text-success mr-1" />
                <span className="text-success mr-1">+2.5%</span>
                <span className="text-gray-400">this week</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Patrol Map */}
          <div className="lg:col-span-2">
            <Card className="bg-police-800/30 backdrop-blur-sm border-police-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <MapPin className="h-5 w-5 text-primary mr-2" />
                  Real-time Patrol Map
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PatrolMap />
              </CardContent>
            </Card>
          </div>
          
          {/* Notification Panel */}
          <div>
            <Card className="bg-police-800/30 backdrop-blur-sm border-police-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Bell className="h-5 w-5 text-primary mr-2" />
                  Latest Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-alert/10 border border-alert/30 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-alert flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">New Hotspot Detected</p>
                      <p className="text-xs text-gray-300 mt-1">AI has detected unusual activity near Koregaon Park</p>
                      <div className="flex items-center mt-2 space-x-2">
                        <Calendar className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-400">15 mins ago</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-police-800/70 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Users className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Patrol Team Alpha Deployed</p>
                      <p className="text-xs text-gray-300 mt-1">Responding to suspicious activity report at MG Road</p>
                      <div className="flex items-center mt-2 space-x-2">
                        <Calendar className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-400">42 mins ago</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-police-800/70 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <FileText className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">New Complaint Filed</p>
                      <p className="text-xs text-gray-300 mt-1">Theft complaint from Aundh area requires assignment</p>
                      <div className="flex items-center mt-2 space-x-2">
                        <Calendar className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-400">1 hour ago</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-success/10 border border-success/30 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Case Resolved</p>
                      <p className="text-xs text-gray-300 mt-1">Vehicle theft case #SP-2025-04-751 successfully resolved</p>
                      <div className="flex items-center mt-2 space-x-2">
                        <Calendar className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-400">3 hours ago</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full bg-police-700 hover:bg-police-600 border-police-600">
                  View All Notifications
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Statistics */}
        <Card className="bg-police-800/30 backdrop-blur-sm border-police-700 mb-8">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <BarChart className="h-5 w-5 text-primary mr-2" />
              Crime Statistics (Last 7 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <StatisticsChart />
          </CardContent>
        </Card>
        
        {/* Recent Complaints */}
        <Card className="bg-police-800/30 backdrop-blur-sm border-police-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <FileText className="h-5 w-5 text-primary mr-2" />
              Recent Complaints
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b border-police-700">
                    <th className="pb-3 font-medium text-gray-300">ID</th>
                    <th className="pb-3 font-medium text-gray-300">Type</th>
                    <th className="pb-3 font-medium text-gray-300">Location</th>
                    <th className="pb-3 font-medium text-gray-300">Time</th>
                    <th className="pb-3 font-medium text-gray-300">Status</th>
                    <th className="pb-3 font-medium text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-200">
                  <tr className="border-b border-police-800">
                    <td className="py-3">SP-2025-04-782</td>
                    <td>Theft</td>
                    <td>MG Road</td>
                    <td>Today, 14:32</td>
                    <td>
                      <span className="px-2 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-200">
                        In Progress
                      </span>
                    </td>
                    <td>
                      <Button variant="ghost" size="sm" className="h-8 text-xs">View</Button>
                    </td>
                  </tr>
                  <tr className="border-b border-police-800">
                    <td className="py-3">SP-2025-04-781</td>
                    <td>Assault</td>
                    <td>Shivajinagar</td>
                    <td>Today, 12:15</td>
                    <td>
                      <span className="px-2 py-1 rounded-full text-xs bg-blue-500/20 text-blue-200">
                        Assigned
                      </span>
                    </td>
                    <td>
                      <Button variant="ghost" size="sm" className="h-8 text-xs">View</Button>
                    </td>
                  </tr>
                  <tr className="border-b border-police-800">
                    <td className="py-3">SP-2025-04-780</td>
                    <td>Noise</td>
                    <td>Kothrud</td>
                    <td>Today, 11:05</td>
                    <td>
                      <span className="px-2 py-1 rounded-full text-xs bg-success/20 text-success-light">
                        Resolved
                      </span>
                    </td>
                    <td>
                      <Button variant="ghost" size="sm" className="h-8 text-xs">View</Button>
                    </td>
                  </tr>
                  <tr className="border-b border-police-800">
                    <td className="py-3">SP-2025-04-779</td>
                    <td>Suspicious</td>
                    <td>Aundh</td>
                    <td>Today, 10:47</td>
                    <td>
                      <span className="px-2 py-1 rounded-full text-xs bg-purple-500/20 text-purple-200">
                        Under Review
                      </span>
                    </td>
                    <td>
                      <Button variant="ghost" size="sm" className="h-8 text-xs">View</Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-center">
              <Button variant="outline" className="bg-police-700 hover:bg-police-600 border-police-600">
                View All Complaints
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;
