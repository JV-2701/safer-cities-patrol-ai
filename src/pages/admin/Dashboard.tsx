
import React, { useState } from "react";
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
  FileText,
  Download,
  Eye
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CrimeHeatmap from "@/components/maps/CrimeHeatmap";
import DateRangeDialog from "@/components/admin/DateRangeDialog";
import NotificationsDialog from "@/components/admin/NotificationsDialog";
import { PDFDownloader } from "@/components/admin/PDFDownloader";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Sample chart data
const crimeData = [
  { name: 'Mon', theft: 4, assault: 2, burglary: 6, noise: 8 },
  { name: 'Tue', theft: 6, assault: 3, burglary: 4, noise: 7 },
  { name: 'Wed', theft: 8, assault: 4, burglary: 3, noise: 5 },
  { name: 'Thu', theft: 7, assault: 6, burglary: 5, noise: 4 },
  { name: 'Fri', theft: 9, assault: 5, burglary: 7, noise: 6 },
  { name: 'Sat', theft: 11, assault: 7, burglary: 4, noise: 5 },
  { name: 'Sun', theft: 5, assault: 4, burglary: 2, noise: 3 },
];

// Sample patrol data
const patrolData = [
  { name: 'Team Alpha', dispatches: 12, resolutions: 10, effectiveness: 83 },
  { name: 'Team Beta', dispatches: 9, resolutions: 8, effectiveness: 89 },
  { name: 'Team Delta', dispatches: 15, resolutions: 12, effectiveness: 80 },
  { name: 'Team Echo', dispatches: 8, resolutions: 7, effectiveness: 88 },
];

// Sample complaint data
const complaintData = [
  { id: 'SP-2025-04-782', type: 'Theft', location: 'MG Road', time: 'Today, 14:32', status: 'In Progress' },
  { id: 'SP-2025-04-781', type: 'Assault', location: 'Shivajinagar', time: 'Today, 12:15', status: 'Assigned' },
  { id: 'SP-2025-04-780', type: 'Noise', location: 'Kothrud', time: 'Today, 11:05', status: 'Resolved' },
  { id: 'SP-2025-04-779', type: 'Suspicious', location: 'Aundh', time: 'Today, 10:47', status: 'Under Review' },
];

const AdminDashboard = () => {
  const [dateDialogOpen, setDateDialogOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [allComplaintsOpen, setAllComplaintsOpen] = useState(false);
  const [complaintDetailsOpen, setComplaintDetailsOpen] = useState<string | null>(null);
  const [allChartDataOpen, setAllChartDataOpen] = useState(false);
  const { toast } = useToast();

  const handleViewReport = () => {
    toast({
      title: "Generating Full Report",
      description: "Please wait while we prepare a comprehensive report",
    });
  };

  const handleViewComplaint = (id: string) => {
    setComplaintDetailsOpen(id);
  };

  const ComplaintDetailsDialog = () => (
    <Dialog open={!!complaintDetailsOpen} onOpenChange={open => !open && setComplaintDetailsOpen(null)}>
      <DialogContent className="bg-police-900 border-police-700 text-white">
        <DialogHeader>
          <DialogTitle>Complaint Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Complaint ID</p>
            <p className="font-medium">{complaintDetailsOpen}</p>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Status</p>
            <div className="flex">
              {complaintDetailsOpen === 'SP-2025-04-782' && (
                <span className="px-2 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-200">
                  In Progress
                </span>
              )}
              {complaintDetailsOpen === 'SP-2025-04-781' && (
                <span className="px-2 py-1 rounded-full text-xs bg-blue-500/20 text-blue-200">
                  Assigned
                </span>
              )}
              {complaintDetailsOpen === 'SP-2025-04-780' && (
                <span className="px-2 py-1 rounded-full text-xs bg-success/20 text-success-light">
                  Resolved
                </span>
              )}
              {complaintDetailsOpen === 'SP-2025-04-779' && (
                <span className="px-2 py-1 rounded-full text-xs bg-purple-500/20 text-purple-200">
                  Under Review
                </span>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Details</p>
            <div className="p-3 bg-police-800/70 rounded-lg">
              <p className="text-sm">
                {complaintDetailsOpen === 'SP-2025-04-782' && "Theft of mobile phone reported at MG Road shopping area. Victim describes suspect as male, approximately 5'10\", wearing dark clothing."}
                {complaintDetailsOpen === 'SP-2025-04-781' && "Verbal altercation that escalated to physical confrontation outside restaurant in Shivajinagar. Both parties involved sustained minor injuries."}
                {complaintDetailsOpen === 'SP-2025-04-780' && "Noise complaint regarding loud music from residential building in Kothrud. Patrol unit visited the location and resolved the issue."}
                {complaintDetailsOpen === 'SP-2025-04-779' && "Report of suspicious individual loitering near ATM in Aundh area. Patrol dispatched to investigate."}
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Assigned Officer</p>
            <p className="font-medium">
              {complaintDetailsOpen === 'SP-2025-04-782' && "Officer Sharma (ID: 2580)"}
              {complaintDetailsOpen === 'SP-2025-04-781' && "Officer Patil (ID: 3142)"}
              {complaintDetailsOpen === 'SP-2025-04-780' && "Officer Desai (ID: 1857)"}
              {complaintDetailsOpen === 'SP-2025-04-779' && "Pending Assignment"}
            </p>
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" className="bg-police-800 border-police-700" onClick={() => setComplaintDetailsOpen(null)}>
              Close
            </Button>
            <Button onClick={() => {
              toast({
                title: "Action Taken",
                description: `Updated status for complaint ${complaintDetailsOpen}`,
              });
              setComplaintDetailsOpen(null);
            }}>
              Update Status
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const AllComplaintsDialog = () => (
    <Dialog open={allComplaintsOpen} onOpenChange={setAllComplaintsOpen}>
      <DialogContent className="bg-police-900 border-police-700 text-white max-w-4xl">
        <DialogHeader>
          <DialogTitle>All Recent Complaints</DialogTitle>
        </DialogHeader>
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
              {complaintData.map(complaint => (
                <tr key={complaint.id} className="border-b border-police-800">
                  <td className="py-3">{complaint.id}</td>
                  <td>{complaint.type}</td>
                  <td>{complaint.location}</td>
                  <td>{complaint.time}</td>
                  <td>
                    {complaint.status === 'In Progress' && (
                      <span className="px-2 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-200">
                        In Progress
                      </span>
                    )}
                    {complaint.status === 'Assigned' && (
                      <span className="px-2 py-1 rounded-full text-xs bg-blue-500/20 text-blue-200">
                        Assigned
                      </span>
                    )}
                    {complaint.status === 'Resolved' && (
                      <span className="px-2 py-1 rounded-full text-xs bg-success/20 text-success-light">
                        Resolved
                      </span>
                    )}
                    {complaint.status === 'Under Review' && (
                      <span className="px-2 py-1 rounded-full text-xs bg-purple-500/20 text-purple-200">
                        Under Review
                      </span>
                    )}
                  </td>
                  <td>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 text-xs"
                      onClick={() => handleViewComplaint(complaint.id)}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
              {/* Additional complaints */}
              <tr className="border-b border-police-800">
                <td className="py-3">SP-2025-04-778</td>
                <td>Burglary</td>
                <td>Koregaon Park</td>
                <td>Today, 09:15</td>
                <td>
                  <span className="px-2 py-1 rounded-full text-xs bg-alert/20 text-alert-light">
                    High Priority
                  </span>
                </td>
                <td>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 text-xs"
                    onClick={() => handleViewComplaint('SP-2025-04-778')}
                  >
                    View
                  </Button>
                </td>
              </tr>
              <tr className="border-b border-police-800">
                <td className="py-3">SP-2025-04-777</td>
                <td>Vehicle Theft</td>
                <td>Viman Nagar</td>
                <td>Yesterday, 22:40</td>
                <td>
                  <span className="px-2 py-1 rounded-full text-xs bg-blue-500/20 text-blue-200">
                    Assigned
                  </span>
                </td>
                <td>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 text-xs"
                    onClick={() => handleViewComplaint('SP-2025-04-777')}
                  >
                    View
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-between pt-4">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="bg-police-800 border-police-700">Previous</Button>
            <Button variant="outline" size="sm" className="bg-police-800 border-police-700">Next</Button>
          </div>
          <PDFDownloader 
            filename="complaints-report.pdf" 
            documentTitle="Complaints Report"
            content="complaints"
          >
            <Button variant="outline" size="sm" className="bg-police-800 border-police-700">
              <Download className="h-4 w-4 mr-2" />
              Export List
            </Button>
          </PDFDownloader>
        </div>
      </DialogContent>
    </Dialog>
  );

  const AllChartDataDialog = () => (
    <Dialog open={allChartDataOpen} onOpenChange={setAllChartDataOpen}>
      <DialogContent className="bg-police-900 border-police-700 text-white max-w-4xl">
        <DialogHeader>
          <DialogTitle>Crime Statistics Data</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={crimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                <XAxis dataKey="name" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#2A2A2A', borderColor: '#444', color: '#FFF' }} 
                />
                <Legend />
                <Line type="monotone" dataKey="theft" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="assault" stroke="#ea384c" />
                <Line type="monotone" dataKey="burglary" stroke="#82ca9d" />
                <Line type="monotone" dataKey="noise" stroke="#ffc658" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-3 bg-police-800/60 rounded-lg text-center">
              <p className="text-sm text-gray-300">Total Incidents</p>
              <p className="text-2xl font-bold">142</p>
            </div>
            <div className="p-3 bg-police-800/60 rounded-lg text-center">
              <p className="text-sm text-gray-300">Theft</p>
              <p className="text-2xl font-bold text-indigo-400">50</p>
            </div>
            <div className="p-3 bg-police-800/60 rounded-lg text-center">
              <p className="text-sm text-gray-300">Assault</p>
              <p className="text-2xl font-bold text-red-400">31</p>
            </div>
            <div className="p-3 bg-police-800/60 rounded-lg text-center">
              <p className="text-sm text-gray-300">Burglary</p>
              <p className="text-2xl font-bold text-green-400">27</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-police-800/60 rounded-lg">
              <h3 className="text-sm font-medium mb-2">Crime Hotspots</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">MG Road</span>
                  <div className="w-1/2 bg-police-700 rounded-full h-2">
                    <div className="bg-alert rounded-full h-2" style={{ width: '82%' }}></div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Koregaon Park</span>
                  <div className="w-1/2 bg-police-700 rounded-full h-2">
                    <div className="bg-alert rounded-full h-2" style={{ width: '68%' }}></div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Shivaji Nagar</span>
                  <div className="w-1/2 bg-police-700 rounded-full h-2">
                    <div className="bg-yellow-500 rounded-full h-2" style={{ width: '57%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-police-800/60 rounded-lg">
              <h3 className="text-sm font-medium mb-2">Time Distribution</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Morning (6AM-12PM)</span>
                  <div className="w-1/2 bg-police-700 rounded-full h-2">
                    <div className="bg-blue-500 rounded-full h-2" style={{ width: '28%' }}></div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Afternoon (12PM-6PM)</span>
                  <div className="w-1/2 bg-police-700 rounded-full h-2">
                    <div className="bg-blue-500 rounded-full h-2" style={{ width: '35%' }}></div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Evening (6PM-12AM)</span>
                  <div className="w-1/2 bg-police-700 rounded-full h-2">
                    <div className="bg-alert rounded-full h-2" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Night (12AM-6AM)</span>
                  <div className="w-1/2 bg-police-700 rounded-full h-2">
                    <div className="bg-yellow-500 rounded-full h-2" style={{ width: '48%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <PDFDownloader 
              filename="crime-statistics.pdf" 
              documentTitle="Crime Statistics Report"
              content="statistics"
            >
              <Button variant="outline" className="bg-police-800 border-police-700">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </PDFDownloader>
            <Button onClick={() => setAllChartDataOpen(false)}>
              Close
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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-300">Overview of police operations and real-time analytics</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              className="bg-police-800 border-police-700"
              onClick={() => setDateDialogOpen(true)}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Today
            </Button>
            <Button 
              variant="default"
              onClick={() => setNotificationsOpen(true)}
            >
              <Bell className="h-4 w-4 mr-2" />
              Notifications
              <span className="ml-2 bg-police-800 text-white text-xs px-1.5 py-0.5 rounded-full">4</span>
            </Button>
            <PDFDownloader 
              filename="dashboard-report.pdf" 
              documentTitle="Police Dashboard Report"
              content="dashboard"
            >
              <Button variant="outline" className="bg-police-800 border-police-700">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </PDFDownloader>
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
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg flex items-center">
                    <MapPin className="h-5 w-5 text-primary mr-2" />
                    Real-time Patrol Map
                  </CardTitle>
                  <PDFDownloader 
                    filename="patrol-map.pdf" 
                    documentTitle="Patrol Map"
                    content="patrols"
                  >
                    <Button variant="outline" size="sm" className="bg-police-700 hover:bg-police-600 border-police-600">
                      <Download className="h-4 w-4 mr-2" />
                      Export Map
                    </Button>
                  </PDFDownloader>
                </div>
              </CardHeader>
              <CardContent>
                <CrimeHeatmap mapType="patrol" height="400px" />
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
                
                <Button 
                  variant="outline" 
                  className="w-full bg-police-700 hover:bg-police-600 border-police-600"
                  onClick={() => setNotificationsOpen(true)}
                >
                  View All Notifications
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Statistics */}
        <Card className="bg-police-800/30 backdrop-blur-sm border-police-700 mb-8">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg flex items-center">
                <BarChart className="h-5 w-5 text-primary mr-2" />
                Crime Statistics (Last 7 Days)
              </CardTitle>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-police-700 hover:bg-police-600 border-police-600"
                  onClick={() => setAllChartDataOpen(true)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View All Data
                </Button>
                <PDFDownloader 
                  filename="crime-statistics.pdf" 
                  documentTitle="Crime Statistics Report"
                  content="statistics"
                >
                  <Button variant="outline" size="sm" className="bg-police-700 hover:bg-police-600 border-police-600">
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                </PDFDownloader>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={crimeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                  <XAxis dataKey="name" stroke="#999" />
                  <YAxis stroke="#999" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#2A2A2A', borderColor: '#444', color: '#FFF' }} 
                  />
                  <Legend />
                  <Line type="monotone" dataKey="theft" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="assault" stroke="#ea384c" />
                  <Line type="monotone" dataKey="burglary" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="noise" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Patrol Effectiveness */}
        <Card className="bg-police-800/30 backdrop-blur-sm border-police-700 mb-8">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg flex items-center">
                <Shield className="h-5 w-5 text-primary mr-2" />
                Patrol Effectiveness Analysis
              </CardTitle>
              <PDFDownloader 
                filename="patrol-effectiveness.pdf" 
                documentTitle="Patrol Effectiveness Report"
                content="patrols"
              >
                <Button variant="outline" size="sm" className="bg-police-700 hover:bg-police-600 border-police-600">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              </PDFDownloader>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b border-police-700">
                    <th className="pb-3 font-medium text-gray-300">Patrol Team</th>
                    <th className="pb-3 font-medium text-gray-300">Dispatches</th>
                    <th className="pb-3 font-medium text-gray-300">Resolutions</th>
                    <th className="pb-3 font-medium text-gray-300">Effectiveness</th>
                    <th className="pb-3 font-medium text-gray-300">Trend</th>
                  </tr>
                </thead>
                <tbody className="text-gray-200">
                  {patrolData.map((team) => (
                    <tr key={team.name} className="border-b border-police-800">
                      <td className="py-3">{team.name}</td>
                      <td>{team.dispatches}</td>
                      <td>{team.resolutions}</td>
                      <td>
                        <div className="flex items-center">
                          <div className="w-24 bg-police-700 rounded-full h-2 mr-2">
                            <div 
                              className="bg-primary rounded-full h-2" 
                              style={{ width: `${team.effectiveness}%` }}
                            ></div>
                          </div>
                          <span>{team.effectiveness}%</span>
                        </div>
                      </td>
                      <td>
                        <span className="flex items-center text-success">
                          <ArrowUpRight className="h-4 w-4 mr-1" />
                          +3%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Complaints */}
        <Card className="bg-police-800/30 backdrop-blur-sm border-police-700">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg flex items-center">
                <FileText className="h-5 w-5 text-primary mr-2" />
                Recent Complaints
              </CardTitle>
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-police-700 hover:bg-police-600 border-police-600"
                onClick={() => setAllComplaintsOpen(true)}
              >
                <Eye className="h-4 w-4 mr-2" />
                View All Complaints
              </Button>
            </div>
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
                  {complaintData.map(complaint => (
                    <tr key={complaint.id} className="border-b border-police-800">
                      <td className="py-3">{complaint.id}</td>
                      <td>{complaint.type}</td>
                      <td>{complaint.location}</td>
                      <td>{complaint.time}</td>
                      <td>
                        {complaint.status === 'In Progress' && (
                          <span className="px-2 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-200">
                            In Progress
                          </span>
                        )}
                        {complaint.status === 'Assigned' && (
                          <span className="px-2 py-1 rounded-full text-xs bg-blue-500/20 text-blue-200">
                            Assigned
                          </span>
                        )}
                        {complaint.status === 'Resolved' && (
                          <span className="px-2 py-1 rounded-full text-xs bg-success/20 text-success-light">
                            Resolved
                          </span>
                        )}
                        {complaint.status === 'Under Review' && (
                          <span className="px-2 py-1 rounded-full text-xs bg-purple-500/20 text-purple-200">
                            Under Review
                          </span>
                        )}
                      </td>
                      <td>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 text-xs"
                          onClick={() => handleViewComplaint(complaint.id)}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-center">
              <Button 
                variant="outline" 
                className="bg-police-700 hover:bg-police-600 border-police-600"
                onClick={() => setAllComplaintsOpen(true)}
              >
                View All Complaints
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      
      {/* Dialogs */}
      <DateRangeDialog 
        open={dateDialogOpen} 
        onOpenChange={setDateDialogOpen} 
      />
      
      <NotificationsDialog 
        open={notificationsOpen} 
        onOpenChange={setNotificationsOpen} 
      />
      
      <AllComplaintsDialog />
      
      <ComplaintDetailsDialog />
      
      <AllChartDataDialog />
    </div>
  );
};

export default AdminDashboard;
