
import React, { useState } from "react";
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
  BarChart,
  Phone,
  Info,
  Download,
  Eye
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { PDFDownloader } from "@/components/admin/PDFDownloader";
import CrimeHeatmap from "@/components/maps/CrimeHeatmap";

// Sample patrol map component (where we'd use Leaflet.js in a real app)
const PatrolMap = () => (
  <div className="h-[600px] bg-police-800/50 rounded-lg border border-police-700 p-4 relative">
    <CrimeHeatmap mapType="patrol" height="100%" showControls={false} />
  </div>
);

const AdminPatrols = () => {
  const [patrolFilter, setPatrolFilter] = useState("all");
  const [trackingUnit, setTrackingUnit] = useState<string | null>(null);
  const [contactingUnit, setContactingUnit] = useState<string | null>(null);
  const [viewingRoute, setViewingRoute] = useState<string | null>(null);
  const [assigningRoute, setAssigningRoute] = useState<string | null>(null);
  const [showScheduler, setShowScheduler] = useState(false);
  const [showAllUnits, setShowAllUnits] = useState(false);
  const { toast } = useToast();

  const handleRegenerateRoutes = () => {
    toast({
      title: "Regenerating Routes",
      description: "AI is analyzing crime data to generate optimal patrol routes",
    });
  };

  const handleTrackUnit = (unitId: string) => {
    setTrackingUnit(unitId);
  };

  const handleContactUnit = (unitId: string) => {
    setContactingUnit(unitId);
  };

  const handleViewRoute = (routeId: string) => {
    setViewingRoute(routeId);
  };

  const handleAssignRoute = (routeId: string) => {
    setAssigningRoute(routeId);
  };

  const TrackingDialog = () => (
    <Dialog open={!!trackingUnit} onOpenChange={open => !open && setTrackingUnit(null)}>
      <DialogContent className="bg-police-900 border-police-700 text-white">
        <DialogHeader>
          <DialogTitle>Tracking Patrol Unit</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="bg-police-800/50 p-4 rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <div className={`h-10 w-10 rounded-full ${trackingUnit === 'A1' || trackingUnit === 'B2' ? 'bg-success' : 'bg-yellow-500'} text-white flex items-center justify-center font-medium`}>
                {trackingUnit}
              </div>
              <div>
                <p className="font-medium">
                  {trackingUnit === 'A1' && 'Alpha Team'}
                  {trackingUnit === 'B2' && 'Bravo Team'}
                  {trackingUnit === 'C3' && 'Charlie Team'}
                </p>
                <p className="text-xs text-gray-400">
                  {trackingUnit === 'A1' && 'Central Zone'}
                  {trackingUnit === 'B2' && 'East Zone'}
                  {trackingUnit === 'C3' && 'West Zone'}
                </p>
              </div>
            </div>
            
            <div className="h-60 bg-police-700/50 rounded-lg mb-3 relative">
              <CrimeHeatmap mapType="patrol" height="100%" showControls={false} />
              
              {/* Simulated patrol unit position */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="h-6 w-6 rounded-full bg-success text-white flex items-center justify-center font-medium text-xs animate-pulse">
                  {trackingUnit}
                </div>
                <div className="mt-1 bg-police-800/80 px-2 py-1 rounded text-xs">
                  Last Updated: Just now
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <p className="text-xs text-gray-300">Current Location</p>
                <p className="text-sm">
                  {trackingUnit === 'A1' && 'MG Road'}
                  {trackingUnit === 'B2' && 'Viman Nagar'}
                  {trackingUnit === 'C3' && 'Shivaji Nagar'}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-300">Current Status</p>
                <div className="flex items-center">
                  {(trackingUnit === 'A1' || trackingUnit === 'B2') ? (
                    <>
                      <CheckCircle className="h-3 w-3 text-success mr-1" />
                      <p className="text-sm">Active Patrol</p>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="h-3 w-3 text-yellow-500 mr-1" />
                      <p className="text-sm">Responding</p>
                    </>
                  )}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-300">Route</p>
                <p className="text-sm">
                  {trackingUnit === 'A1' && 'RT-042'}
                  {trackingUnit === 'B2' && 'RT-043'}
                  {trackingUnit === 'C3' && 'RT-044'}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-300">ETA to Next Point</p>
                <p className="text-sm">
                  {trackingUnit === 'A1' && '8 minutes'}
                  {trackingUnit === 'B2' && '12 minutes'}
                  {trackingUnit === 'C3' && '5 minutes'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2 pt-2">
            <Button 
              variant="outline" 
              className="flex-1 bg-police-700 hover:bg-police-600 border-police-600"
              onClick={() => handleContactUnit(trackingUnit!)}
            >
              <Phone className="h-4 w-4 mr-2" />
              Contact Unit
            </Button>
            <Button 
              className="flex-1"
              onClick={() => {
                toast({
                  title: "Sending Alert",
                  description: `Alert sent to ${trackingUnit === 'A1' ? 'Alpha Team' : trackingUnit === 'B2' ? 'Bravo Team' : 'Charlie Team'}`
                });
              }}
            >
              Send Alert
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const ContactDialog = () => (
    <Dialog open={!!contactingUnit} onOpenChange={open => !open && setContactingUnit(null)}>
      <DialogContent className="bg-police-900 border-police-700 text-white">
        <DialogHeader>
          <DialogTitle>Contact Patrol Unit</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="bg-police-800/50 p-4 rounded-lg">
            <div className="flex items-center space-x-3 mb-4">
              <div className={`h-10 w-10 rounded-full ${contactingUnit === 'A1' || contactingUnit === 'B2' ? 'bg-success' : 'bg-yellow-500'} text-white flex items-center justify-center font-medium`}>
                {contactingUnit}
              </div>
              <div>
                <p className="font-medium">
                  {contactingUnit === 'A1' && 'Alpha Team'}
                  {contactingUnit === 'B2' && 'Bravo Team'}
                  {contactingUnit === 'C3' && 'Charlie Team'}
                </p>
                <p className="text-xs text-gray-400">
                  {contactingUnit === 'A1' && 'Central Zone'}
                  {contactingUnit === 'B2' && 'East Zone'}
                  {contactingUnit === 'C3' && 'West Zone'}
                </p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="space-y-1">
                <p className="text-xs text-gray-300">Team Leader</p>
                <p className="text-sm">
                  {contactingUnit === 'A1' && 'Officer Sharma (ID: 2580)'}
                  {contactingUnit === 'B2' && 'Officer Patil (ID: 3142)'}
                  {contactingUnit === 'C3' && 'Officer Desai (ID: 1857)'}
                </p>
              </div>
              
              <div className="space-y-1">
                <p className="text-xs text-gray-300">Contact Methods</p>
                <div className="space-y-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full bg-police-700 hover:bg-police-600 border-police-600"
                    onClick={() => {
                      toast({
                        title: "Radio Contact Initiated",
                        description: `Establishing radio communication with ${contactingUnit === 'A1' ? 'Alpha Team' : contactingUnit === 'B2' ? 'Bravo Team' : 'Charlie Team'}`
                      });
                    }}
                  >
                    Radio Communication
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full bg-police-700 hover:bg-police-600 border-police-600"
                    onClick={() => {
                      toast({
                        title: "Mobile Call Initiated",
                        description: `Calling team leader of ${contactingUnit === 'A1' ? 'Alpha Team' : contactingUnit === 'B2' ? 'Bravo Team' : 'Charlie Team'}`
                      });
                    }}
                  >
                    Mobile Phone
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full bg-police-700 hover:bg-police-600 border-police-600"
                    onClick={() => {
                      toast({
                        title: "Sending Text Message",
                        description: `Message sent to ${contactingUnit === 'A1' ? 'Alpha Team' : contactingUnit === 'B2' ? 'Bravo Team' : 'Charlie Team'}`
                      });
                    }}
                  >
                    Text Message
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Message</label>
            <textarea 
              className="w-full bg-police-800 border-police-700 rounded-md p-2 text-white"
              placeholder="Type your message here..."
              rows={3}
            ></textarea>
          </div>
          
          <div className="flex space-x-2 pt-2">
            <Button 
              variant="outline" 
              className="flex-1 bg-police-700 hover:bg-police-600 border-police-600"
              onClick={() => setContactingUnit(null)}
            >
              Cancel
            </Button>
            <Button 
              className="flex-1"
              onClick={() => {
                toast({
                  title: "Message Sent",
                  description: `Message sent to ${contactingUnit === 'A1' ? 'Alpha Team' : contactingUnit === 'B2' ? 'Bravo Team' : 'Charlie Team'}`
                });
                setContactingUnit(null);
              }}
            >
              Send Message
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const RouteDetailsDialog = () => (
    <Dialog open={!!viewingRoute} onOpenChange={open => !open && setViewingRoute(null)}>
      <DialogContent className="bg-police-900 border-police-700 text-white">
        <DialogHeader>
          <DialogTitle>Route Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-police-800 rounded-lg">
            <p className="font-medium">Route ID: {viewingRoute}</p>
            <div className="flex items-center">
              {viewingRoute === 'RT-042' || viewingRoute === 'RT-043' || viewingRoute === 'RT-044' ? (
                <>
                  <CheckCircle className="h-4 w-4 text-success mr-1" />
                  <span className="text-sm">Active</span>
                </>
              ) : viewingRoute === 'RT-045' ? (
                <>
                  <Clock className="h-4 w-4 text-gray-400 mr-1" />
                  <span className="text-sm">Scheduled</span>
                </>
              ) : (
                <>
                  <Info className="h-4 w-4 text-gray-400 mr-1" />
                  <span className="text-sm">Pending</span>
                </>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-police-800/60 rounded-lg">
              <p className="text-sm text-gray-300">Zone</p>
              <p className="font-medium">
                {viewingRoute === 'RT-042' && 'Central Pune'}
                {viewingRoute === 'RT-043' && 'East Pune'}
                {viewingRoute === 'RT-044' && 'West Pune'}
                {viewingRoute === 'RT-045' && 'North Pune'}
                {viewingRoute === 'RT-046' && 'Pimpri-Chinchwad'}
              </p>
            </div>
            <div className="p-3 bg-police-800/60 rounded-lg">
              <p className="text-sm text-gray-300">Priority</p>
              <div>
                {(viewingRoute === 'RT-042' || viewingRoute === 'RT-044') && (
                  <span className="px-2 py-1 rounded-full text-xs bg-alert/20 text-alert-light">
                    High
                  </span>
                )}
                {(viewingRoute === 'RT-043' || viewingRoute === 'RT-046') && (
                  <span className="px-2 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-200">
                    Medium
                  </span>
                )}
                {viewingRoute === 'RT-045' && (
                  <span className="px-2 py-1 rounded-full text-xs bg-blue-500/20 text-blue-200">
                    Low
                  </span>
                )}
              </div>
            </div>
            <div className="p-3 bg-police-800/60 rounded-lg">
              <p className="text-sm text-gray-300">Hotspots Covered</p>
              <p className="font-medium">
                {viewingRoute === 'RT-042' && '3 Hotspots'}
                {viewingRoute === 'RT-043' && '2 Hotspots'}
                {viewingRoute === 'RT-044' && '2 Hotspots'}
                {viewingRoute === 'RT-045' && '1 Hotspot'}
                {viewingRoute === 'RT-046' && '2 Hotspots'}
              </p>
            </div>
            <div className="p-3 bg-police-800/60 rounded-lg">
              <p className="text-sm text-gray-300">Estimated Time</p>
              <p className="font-medium">
                {viewingRoute === 'RT-042' && '45 mins'}
                {viewingRoute === 'RT-043' && '60 mins'}
                {viewingRoute === 'RT-044' && '40 mins'}
                {viewingRoute === 'RT-045' && '30 mins'}
                {viewingRoute === 'RT-046' && '50 mins'}
              </p>
            </div>
          </div>
          
          <div className="h-60 bg-police-800/50 rounded-lg relative">
            <CrimeHeatmap mapType="patrol" height="100%" showControls={false} />
            
            {/* Route path visualization */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Route className="h-8 w-8 text-primary mx-auto" />
                <p className="text-sm mt-2">Route path visualization</p>
              </div>
            </div>
          </div>
          
          <div className="p-3 bg-police-800/60 rounded-lg">
            <p className="text-sm text-gray-300 mb-2">Assigned To</p>
            <div className="flex items-center">
              {viewingRoute === 'RT-042' && (
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-success text-white flex items-center justify-center font-medium">A1</div>
                  <span className="ml-2">Alpha Team</span>
                </div>
              )}
              {viewingRoute === 'RT-043' && (
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-success text-white flex items-center justify-center font-medium">B2</div>
                  <span className="ml-2">Bravo Team</span>
                </div>
              )}
              {viewingRoute === 'RT-044' && (
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-yellow-500 text-white flex items-center justify-center font-medium">C3</div>
                  <span className="ml-2">Charlie Team</span>
                </div>
              )}
              {viewingRoute === 'RT-045' && (
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-medium">D4</div>
                  <span className="ml-2">Delta Team</span>
                </div>
              )}
              {viewingRoute === 'RT-046' && (
                <div className="text-gray-400">Unassigned</div>
              )}
            </div>
          </div>
          
          <div className="flex space-x-2 pt-2">
            <PDFDownloader 
              filename={`route-${viewingRoute}.pdf`}
              documentTitle={`Patrol Route ${viewingRoute} Details`}
              content="route"
            >
              <Button 
                variant="outline" 
                className="flex-1 bg-police-700 hover:bg-police-600 border-police-600"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Details
              </Button>
            </PDFDownloader>
            
            {viewingRoute === 'RT-046' ? (
              <Button 
                className="flex-1"
                onClick={() => {
                  setViewingRoute(null);
                  handleAssignRoute('RT-046');
                }}
              >
                <Users className="h-4 w-4 mr-2" />
                Assign Team
              </Button>
            ) : (
              <Button 
                className="flex-1"
                onClick={() => {
                  const team = viewingRoute === 'RT-042' ? 'Alpha Team' :
                             viewingRoute === 'RT-043' ? 'Bravo Team' :
                             viewingRoute === 'RT-044' ? 'Charlie Team' : 'Delta Team';
                  
                  toast({
                    title: "Contacting Patrol Team",
                    description: `Establishing communication with ${team}`
                  });
                  setViewingRoute(null);
                }}
              >
                Contact Team
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const AssignRouteDialog = () => (
    <Dialog open={!!assigningRoute} onOpenChange={open => !open && setAssigningRoute(null)}>
      <DialogContent className="bg-police-900 border-police-700 text-white">
        <DialogHeader>
          <DialogTitle>Assign Route {assigningRoute}</DialogTitle>
          <DialogDescription className="text-gray-400">
            Select a patrol unit to assign to this route
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="p-3 bg-police-800/60 rounded-lg">
            <p className="text-sm text-gray-300 mb-3">Route Information</p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-400">Zone</p>
                <p>Pimpri-Chinchwad</p>
              </div>
              <div>
                <p className="text-gray-400">Priority</p>
                <span className="px-2 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-200">
                  Medium
                </span>
              </div>
              <div>
                <p className="text-gray-400">Hotspots</p>
                <p>2 Hotspots</p>
              </div>
              <div>
                <p className="text-gray-400">Est. Time</p>
                <p>50 mins</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Assign To</label>
            <Select defaultValue="echo">
              <SelectTrigger className="bg-police-800 border-police-700 text-white">
                <SelectValue placeholder="Select patrol unit" />
              </SelectTrigger>
              <SelectContent className="bg-police-800 border-police-700 text-white">
                <SelectItem value="echo">Echo Team</SelectItem>
                <SelectItem value="foxtrot">Foxtrot Team</SelectItem>
                <SelectItem value="golf">Golf Team</SelectItem>
                <SelectItem value="hotel">Hotel Team</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Start Time</label>
            <Select defaultValue="immediate">
              <SelectTrigger className="bg-police-800 border-police-700 text-white">
                <SelectValue placeholder="Select start time" />
              </SelectTrigger>
              <SelectContent className="bg-police-800 border-police-700 text-white">
                <SelectItem value="immediate">Immediate</SelectItem>
                <SelectItem value="nextshift">Next Shift (4 hours)</SelectItem>
                <SelectItem value="tomorrow">Tomorrow Morning</SelectItem>
                <SelectItem value="custom">Custom Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Instructions</label>
            <textarea 
              className="w-full bg-police-800 border-police-700 rounded-md p-2 text-white"
              placeholder="Add any specific instructions..."
              rows={2}
            ></textarea>
          </div>
          
          <div className="flex space-x-2 pt-2">
            <Button 
              variant="outline" 
              className="flex-1 bg-police-700 hover:bg-police-600 border-police-600"
              onClick={() => setAssigningRoute(null)}
            >
              Cancel
            </Button>
            <Button 
              className="flex-1"
              onClick={() => {
                toast({
                  title: "Route Assigned",
                  description: `Route ${assigningRoute} has been assigned to Echo Team for immediate patrol`,
                });
                setAssigningRoute(null);
              }}
            >
              Confirm Assignment
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const OptimizedScheduleDialog = () => (
    <Dialog open={showScheduler} onOpenChange={setShowScheduler}>
      <DialogContent className="bg-police-900 border-police-700 text-white">
        <DialogHeader>
          <DialogTitle>Generate Optimized Schedule</DialogTitle>
          <DialogDescription className="text-gray-400">
            Create an AI-optimized patrol schedule based on crime patterns
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Zone</label>
            <Select defaultValue="all">
              <SelectTrigger className="bg-police-800 border-police-700 text-white">
                <SelectValue placeholder="Select zone" />
              </SelectTrigger>
              <SelectContent className="bg-police-800 border-police-700 text-white">
                <SelectItem value="all">All Zones</SelectItem>
                <SelectItem value="central">Central Zone</SelectItem>
                <SelectItem value="east">East Zone</SelectItem>
                <SelectItem value="west">West Zone</SelectItem>
                <SelectItem value="north">North Zone</SelectItem>
                <SelectItem value="south">South Zone</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Time Period</label>
            <Select defaultValue="week">
              <SelectTrigger className="bg-police-800 border-police-700 text-white">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent className="bg-police-800 border-police-700 text-white">
                <SelectItem value="day">Next 24 Hours</SelectItem>
                <SelectItem value="week">Next 7 Days</SelectItem>
                <SelectItem value="month">Next 30 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Available Units</label>
            <Select defaultValue="all">
              <SelectTrigger className="bg-police-800 border-police-700 text-white">
                <SelectValue placeholder="Select units" />
              </SelectTrigger>
              <SelectContent className="bg-police-800 border-police-700 text-white">
                <SelectItem value="all">All Units (18)</SelectItem>
                <SelectItem value="active">Active Units Only (12)</SelectItem>
                <SelectItem value="reserve">Include Reserve Units (24)</SelectItem>
                <SelectItem value="custom">Custom Selection</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Optimization Priority</label>
            <div className="grid grid-cols-3 gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-primary/20 hover:bg-primary/30 border-primary/20"
              >
                Coverage
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-police-700 hover:bg-police-600 border-police-600"
              >
                Response Time
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-police-700 hover:bg-police-600 border-police-600"
              >
                Efficiency
              </Button>
            </div>
          </div>
          
          <div className="p-3 bg-police-800/60 rounded-lg">
            <h3 className="text-sm font-medium mb-2">AI Recommendations</h3>
            <div className="space-y-2 text-xs text-gray-300">
              <p>• Increase patrols in Central Zone between 10 PM - 2 AM</p>
              <p>• Focus on vehicle theft hotspots in East Zone</p>
              <p>• Allocate more units to West Zone on weekends</p>
            </div>
          </div>
          
          <div className="flex space-x-2 pt-2">
            <Button 
              variant="outline" 
              className="flex-1 bg-police-700 hover:bg-police-600 border-police-600"
              onClick={() => setShowScheduler(false)}
            >
              Cancel
            </Button>
            <Button 
              className="flex-1"
              onClick={() => {
                toast({
                  title: "Generating Schedule",
                  description: "AI is optimizing patrol schedules based on selected parameters",
                });
                
                setTimeout(() => {
                  toast({
                    title: "Schedule Generated",
                    description: "Optimized patrol schedule has been created and shared with team leaders",
                  });
                  setShowScheduler(false);
                }, 2000);
              }}
            >
              Generate Schedule
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const AllUnitsDialog = () => (
    <Dialog open={showAllUnits} onOpenChange={setShowAllUnits}>
      <DialogContent className="bg-police-900 border-police-700 text-white max-w-4xl">
        <DialogHeader>
          <DialogTitle>Manage All Patrol Units</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="bg-police-700 hover:bg-police-600 border-police-600">
                All Units
              </Button>
              <Button variant="outline" size="sm" className="bg-police-800 hover:bg-police-700 border-police-700">
                Active
              </Button>
              <Button variant="outline" size="sm" className="bg-police-800 hover:bg-police-700 border-police-700">
                Inactive
              </Button>
            </div>
            
            <PDFDownloader 
              filename="patrol-units-report.pdf" 
              documentTitle="Patrol Units Status Report"
              content="patrols"
            >
              <Button variant="outline" size="sm" className="bg-police-700 hover:bg-police-600 border-police-600">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </PDFDownloader>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-police-700">
                  <th className="pb-3 font-medium text-gray-300">Unit ID</th>
                  <th className="pb-3 font-medium text-gray-300">Name</th>
                  <th className="pb-3 font-medium text-gray-300">Personnel</th>
                  <th className="pb-3 font-medium text-gray-300">Zone</th>
                  <th className="pb-3 font-medium text-gray-300">Route</th>
                  <th className="pb-3 font-medium text-gray-300">Status</th>
                  <th className="pb-3 font-medium text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-200">
                <tr className="border-b border-police-800 hover:bg-police-800/50">
                  <td className="py-3">A1</td>
                  <td>Alpha Team</td>
                  <td>4 Officers</td>
                  <td>Central Zone</td>
                  <td>RT-042</td>
                  <td>
                    <span className="px-2 py-1 rounded-full text-xs bg-success/20 text-success-light">
                      Active
                    </span>
                  </td>
                  <td>
                    <div className="flex space-x-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 px-2"
                        onClick={() => handleTrackUnit('A1')}
                      >
                        Track
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 px-2"
                        onClick={() => handleContactUnit('A1')}
                      >
                        Contact
                      </Button>
                    </div>
                  </td>
                </tr>
                
                <tr className="border-b border-police-800 hover:bg-police-800/50">
                  <td className="py-3">B2</td>
                  <td>Bravo Team</td>
                  <td>4 Officers</td>
                  <td>East Zone</td>
                  <td>RT-043</td>
                  <td>
                    <span className="px-2 py-1 rounded-full text-xs bg-success/20 text-success-light">
                      Active
                    </span>
                  </td>
                  <td>
                    <div className="flex space-x-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 px-2"
                        onClick={() => handleTrackUnit('B2')}
                      >
                        Track
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 px-2"
                        onClick={() => handleContactUnit('B2')}
                      >
                        Contact
                      </Button>
                    </div>
                  </td>
                </tr>
                
                <tr className="border-b border-police-800 hover:bg-police-800/50">
                  <td className="py-3">C3</td>
                  <td>Charlie Team</td>
                  <td>4 Officers</td>
                  <td>West Zone</td>
                  <td>RT-044</td>
                  <td>
                    <span className="px-2 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-200">
                      Responding
                    </span>
                  </td>
                  <td>
                    <div className="flex space-x-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 px-2"
                        onClick={() => handleTrackUnit('C3')}
                      >
                        Track
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 px-2"
                        onClick={() => handleContactUnit('C3')}
                      >
                        Contact
                      </Button>
                    </div>
                  </td>
                </tr>
                
                <tr className="border-b border-police-800 hover:bg-police-800/50">
                  <td className="py-3">D4</td>
                  <td>Delta Team</td>
                  <td>3 Officers</td>
                  <td>North Zone</td>
                  <td>RT-045</td>
                  <td>
                    <span className="px-2 py-1 rounded-full text-xs bg-gray-500/20 text-gray-300">
                      Scheduled
                    </span>
                  </td>
                  <td>
                    <div className="flex space-x-1">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-7 px-2 bg-police-700 hover:bg-police-600 border-police-600"
                        onClick={() => {
                          toast({
                            title: "Team Activated",
                            description: "Delta Team has been activated for immediate duty",
                          });
                        }}
                      >
                        Activate
                      </Button>
                    </div>
                  </td>
                </tr>
                
                <tr className="border-b border-police-800 hover:bg-police-800/50">
                  <td className="py-3">E5</td>
                  <td>Echo Team</td>
                  <td>4 Officers</td>
                  <td>Unassigned</td>
                  <td>-</td>
                  <td>
                    <span className="px-2 py-1 rounded-full text-xs bg-blue-500/20 text-blue-200">
                      Standby
                    </span>
                  </td>
                  <td>
                    <div className="flex space-x-1">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-7 px-2 bg-police-700 hover:bg-police-600 border-police-600"
                        onClick={() => {
                          handleAssignRoute('RT-046');
                        }}
                      >
                        Assign
                      </Button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
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
                  <Select defaultValue={patrolFilter} onValueChange={setPatrolFilter}>
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
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-7 text-xs bg-police-600 hover:bg-police-500 border-police-500"
                        onClick={() => handleTrackUnit('A1')}
                      >
                        <LocateFixed className="h-3 w-3 mr-1" />
                        Track
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-7 text-xs bg-police-600 hover:bg-police-500 border-police-500"
                        onClick={() => handleContactUnit('A1')}
                      >
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
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-7 text-xs bg-police-600 hover:bg-police-500 border-police-500"
                        onClick={() => handleTrackUnit('B2')}
                      >
                        <LocateFixed className="h-3 w-3 mr-1" />
                        Track
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-7 text-xs bg-police-600 hover:bg-police-500 border-police-500"
                        onClick={() => handleContactUnit('B2')}
                      >
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
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-7 text-xs bg-police-600 hover:bg-police-500 border-police-500"
                        onClick={() => handleTrackUnit('C3')}
                      >
                        <LocateFixed className="h-3 w-3 mr-1" />
                        Track
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-7 text-xs bg-police-600 hover:bg-police-500 border-police-500"
                        onClick={() => handleContactUnit('C3')}
                      >
                        Contact
                      </Button>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full"
                  onClick={() => setShowAllUnits(true)}
                >
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
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-police-700 hover:bg-police-600 border-police-600"
                  onClick={handleRegenerateRoutes}
                >
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
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 px-2"
                        onClick={() => handleViewRoute('RT-042')}
                      >
                        View
                      </Button>
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
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 px-2"
                        onClick={() => handleViewRoute('RT-043')}
                      >
                        View
                      </Button>
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
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 px-2"
                        onClick={() => handleViewRoute('RT-044')}
                      >
                        View
                      </Button>
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
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 px-2"
                        onClick={() => handleViewRoute('RT-045')}
                      >
                        View
                      </Button>
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
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 px-2 bg-police-700 hover:bg-police-600 border-police-600"
                        onClick={() => handleAssignRoute('RT-046')}
                      >
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
                
                <Button 
                  className="w-full"
                  onClick={() => setShowScheduler(true)}
                >
                  <Route className="h-4 w-4 mr-2" />
                  Generate Optimized Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      {/* Dialogs */}
      <TrackingDialog />
      <ContactDialog />
      <RouteDetailsDialog />
      <AssignRouteDialog />
      <OptimizedScheduleDialog />
      <AllUnitsDialog />
    </div>
  );
};

export default AdminPatrols;
