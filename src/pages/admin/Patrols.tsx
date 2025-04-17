
import React from "react";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  LocateFixed, 
  Shield, 
  MapPin, 
  CheckCircle, 
  AlertTriangle,
  Clock,
  Users,
  Route,
  Shuffle,
  BarChart
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample patrol map component (where we'd use Leaflet.js in a real app)
const PatrolMap = () => (
  <div className="h-[600px] bg-police-800/50 rounded-lg border border-police-700 p-4 flex items-center justify-center">
    <MapPin className="h-12 w-12 text-primary/40" />
    <p className="text-sm text-gray-400 mt-2">Interactive patrol map with routes would be here using Leaflet.js</p>
  </div>
);

const AdminPatrols = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-police-950 to-police-900 text-white">
      <Navbar type="admin" />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <LocateFixed className="h-6 w-6 text-primary mr-3" />
          <h1 className="text-3xl font-bold">Patrol Management</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <Card className="bg-police-800/40 backdrop-blur-lg border-police-700">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center">
                    <MapPin className="h-5 w-5 text-primary mr-2" />
                    Active Patrol Routes (Q-Learning Optimized)
                  </CardTitle>
                  <Select defaultValue="all">
                    <SelectTrigger className="bg-police-800 border-police-700 text-white w-40">
                      <SelectValue placeholder="Filter Routes" />
                    </SelectTrigger>
                    <SelectContent className="bg-police-800 border-police-700 text-white">
                      <SelectItem value="all">All Routes</SelectItem>
                      <SelectItem value="central">Central Pune</SelectItem>
                      <SelectItem value="east">East Pune</SelectItem>
                      <SelectItem value="west">West Pune</SelectItem>
                      <SelectItem value="north">North Pune</SelectItem>
                      <SelectItem value="pimpri">Pimpri-Chinchwad</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <PatrolMap />
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="bg-police-800/40 backdrop-blur-lg border-police-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Shield className="h-5 w-5 text-primary mr-2" />
                  Patrol Units
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Total Units</p>
                    <p className="text-2xl font-bold">18</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Coverage</p>
                    <p className="text-2xl font-bold text-success">85%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Hotspots</p>
                    <p className="text-2xl font-bold text-yellow-400">7</p>
                  </div>
                </div>
                
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                  <div className="p-3 bg-police-700/50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-success text-white flex items-center justify-center font-medium">A1</div>
                        <div className="ml-3">
                          <p className="font-medium text-sm">Alpha Team</p>
                          <p className="text-xs text-gray-400">Central Zone</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-success" />
                        <span className="text-xs ml-1">Active</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      <Button variant="outline" size="sm" className="h-7 text-xs bg-police-600 hover:bg-police-500 border-police-500">
                        <LocateFixed className="h-3 w-3 mr-1" />
                        Track
                      </Button>
                      <Button variant="outline" size="sm" className="h-7 text-xs bg-police-600 hover:bg-police-500 border-police-500">
                        Contact
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-police-700/50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-success text-white flex items-center justify-center font-medium">B2</div>
                        <div className="ml-3">
                          <p className="font-medium text-sm">Bravo Team</p>
                          <p className="text-xs text-gray-400">East Zone</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-success" />
                        <span className="text-xs ml-1">Active</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      <Button variant="outline" size="sm" className="h-7 text-xs bg-police-600 hover:bg-police-500 border-police-500">
                        <LocateFixed className="h-3 w-3 mr-1" />
                        Track
                      </Button>
                      <Button variant="outline" size="sm" className="h-7 text-xs bg-police-600 hover:bg-police-500 border-police-500">
                        Contact
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-police-700/50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-yellow-500 text-white flex items-center justify-center font-medium">C3</div>
                        <div className="ml-3">
                          <p className="font-medium text-sm">Charlie Team</p>
                          <p className="text-xs text-gray-400">West Zone</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        <span className="text-xs ml-1">Responding</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      <Button variant="outline" size="sm" className="h-7 text-xs bg-police-600 hover:bg-police-500 border-police-500">
                        <LocateFixed className="h-3 w-3 mr-1" />
                        Track
                      </Button>
                      <Button variant="outline" size="sm" className="h-7 text-xs bg-police-600 hover:bg-police-500 border-police-500">
                        Contact
                      </Button>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full">
                  <Users className="h-4 w-4 mr-2" />
                  Manage All Units
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Recommended Patrol Routes */}
        <Card className="bg-police-800/40 backdrop-blur-lg border-police-700 mb-8">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center">
                <Route className="h-5 w-5 text-primary mr-2" />
                AI-Recommended Patrol Routes
              </CardTitle>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-300">Last updated: 15 Apr 2025, 14:30</span>
                <Button variant="outline" size="sm" className="bg-police-700 hover:bg-police-600 border-police-600">
                  <Shuffle className="h-4 w-4 mr-2" />
                  Regenerate
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b border-police-700">
                    <th className="pb-3 pl-4 font-medium text-gray-300">Route ID</th>
                    <th className="pb-3 font-medium text-gray-300">Zone</th>
                    <th className="pb-3 font-medium text-gray-300">Priority</th>
                    <th className="pb-3 font-medium text-gray-300">Hotspots Covered</th>
                    <th className="pb-3 font-medium text-gray-300">Estimated Time</th>
                    <th className="pb-3 font-medium text-gray-300">Assigned To</th>
                    <th className="pb-3 font-medium text-gray-300">Status</th>
                    <th className="pb-3 pr-4 font-medium text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-200">
                  <tr className="border-b border-police-800 hover:bg-police-800/50">
                    <td className="py-4 pl-4">RT-042</td>
                    <td>Central Pune</td>
                    <td>
                      <span className="px-2 py-1 rounded-full text-xs bg-alert/20 text-alert-light">
                        High
                      </span>
                    </td>
                    <td>3 Hotspots</td>
                    <td>45 mins</td>
                    <td>Alpha Team</td>
                    <td>
                      <span className="px-2 py-1 rounded-full text-xs bg-success/20 text-success-light">
                        Active
                      </span>
                    </td>
                    <td className="pr-4">
                      <Button variant="ghost" size="sm" className="h-8 px-2">View</Button>
                    </td>
                  </tr>
                  
                  <tr className="border-b border-police-800 hover:bg-police-800/50">
                    <td className="py-4 pl-4">RT-043</td>
                    <td>East Pune</td>
                    <td>
                      <span className="px-2 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-200">
                        Medium
                      </span>
                    </td>
                    <td>2 Hotspots</td>
                    <td>60 mins</td>
                    <td>Bravo Team</td>
                    <td>
                      <span className="px-2 py-1 rounded-full text-xs bg-success/20 text-success-light">
                        Active
                      </span>
                    </td>
                    <td className="pr-4">
                      <Button variant="ghost" size="sm" className="h-8 px-2">View</Button>
                    </td>
                  </tr>
                  
                  <tr className="border-b border-police-800 hover:bg-police-800/50">
                    <td className="py-4 pl-4">RT-044</td>
                    <td>West Pune</td>
                    <td>
                      <span className="px-2 py-1 rounded-full text-xs bg-alert/20 text-alert-light">
                        High
                      </span>
                    </td>
                    <td>2 Hotspots</td>
                    <td>40 mins</td>
                    <td>Charlie Team</td>
                    <td>
                      <span className="px-2 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-200">
                        Responding
                      </span>
                    </td>
                    <td className="pr-4">
                      <Button variant="ghost" size="sm" className="h-8 px-2">View</Button>
                    </td>
                  </tr>
                  
                  <tr className="border-b border-police-800 hover:bg-police-800/50">
                    <td className="py-4 pl-4">RT-045</td>
                    <td>North Pune</td>
                    <td>
                      <span className="px-2 py-1 rounded-full text-xs bg-blue-500/20 text-blue-200">
                        Low
                      </span>
                    </td>
                    <td>1 Hotspot</td>
                    <td>30 mins</td>
                    <td>Delta Team</td>
                    <td>
                      <span className="px-2 py-1 rounded-full text-xs bg-gray-500/20 text-gray-300">
                        Scheduled
                      </span>
                    </td>
                    <td className="pr-4">
                      <Button variant="ghost" size="sm" className="h-8 px-2">View</Button>
                    </td>
                  </tr>
                  
                  <tr className="border-b border-police-800 hover:bg-police-800/50">
                    <td className="py-4 pl-4">RT-046</td>
                    <td>Pimpri-Chinchwad</td>
                    <td>
                      <span className="px-2 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-200">
                        Medium
                      </span>
                    </td>
                    <td>2 Hotspots</td>
                    <td>50 mins</td>
                    <td>Unassigned</td>
                    <td>
                      <span className="px-2 py-1 rounded-full text-xs bg-gray-500/20 text-gray-300">
                        Pending
                      </span>
                    </td>
                    <td className="pr-4">
                      <Button variant="outline" size="sm" className="h-8 px-2 bg-police-700 hover:bg-police-600 border-police-600">
                        Assign
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        
        {/* Q-Learning Analytics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-police-800/40 backdrop-blur-lg border-police-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <BarChart className="h-5 w-5 text-primary mr-2" />
                Patrol Effectiveness
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-police-800/50 rounded-lg border border-police-700 p-4 flex flex-col items-center justify-center">
                <BarChart className="h-10 w-10 text-primary/40" />
                <p className="text-sm text-gray-400 mt-2">Patrol effectiveness visualization using Recharts</p>
                <p className="text-xs text-gray-500">Shows impact of patrols on crime reduction over time</p>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="p-3 bg-police-700/50 rounded-lg text-center">
                  <p className="text-sm text-gray-300">Crime Reduction</p>
                  <p className="text-xl font-bold text-success">18%</p>
                </div>
                <div className="p-3 bg-police-700/50 rounded-lg text-center">
                  <p className="text-sm text-gray-300">Route Efficiency</p>
                  <p className="text-xl font-bold text-primary">92%</p>
                </div>
                <div className="p-3 bg-police-700/50 rounded-lg text-center">
                  <p className="text-sm text-gray-300">Response Time</p>
                  <p className="text-xl font-bold text-yellow-400">-12%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-police-800/40 backdrop-blur-lg border-police-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Clock className="h-5 w-5 text-primary mr-2" />
                Patrol Timing Optimization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-police-700/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">Central Zone</p>
                    <p className="text-sm text-primary">High Activity: 9 PM - 2 AM</p>
                  </div>
                  <div className="h-2 bg-police-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-600 via-primary to-blue-600 w-[85%]"></div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-gray-400">
                    <span>6 AM</span>
                    <span>12 PM</span>
                    <span>6 PM</span>
                    <span>12 AM</span>
                    <span>6 AM</span>
                  </div>
                </div>
                
                <div className="p-3 bg-police-700/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">East Zone</p>
                    <p className="text-sm text-primary">High Activity: 6 PM - 11 PM</p>
                  </div>
                  <div className="h-2 bg-police-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-600 via-primary to-blue-600 w-[70%]"></div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-gray-400">
                    <span>6 AM</span>
                    <span>12 PM</span>
                    <span>6 PM</span>
                    <span>12 AM</span>
                    <span>6 AM</span>
                  </div>
                </div>
                
                <div className="p-3 bg-police-700/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">West Zone</p>
                    <p className="text-sm text-alert">High Activity: 10 PM - 3 AM</p>
                  </div>
                  <div className="h-2 bg-police-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-alert/60 via-alert to-alert/60 w-[90%]"></div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-gray-400">
                    <span>6 AM</span>
                    <span>12 PM</span>
                    <span>6 PM</span>
                    <span>12 AM</span>
                    <span>6 AM</span>
                  </div>
                </div>
                
                <Button className="w-full">
                  <Route className="h-4 w-4 mr-2" />
                  Generate Optimized Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminPatrols;
