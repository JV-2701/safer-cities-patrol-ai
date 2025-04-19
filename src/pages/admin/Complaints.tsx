import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  Search, 
  Filter, 
  User, 
  Map, 
  Calendar, 
  Clock, 
  Shield,
  ChevronDown,
  CheckCircle,
  AlertCircle,
  Download
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import StatusUpdateForm from "@/components/admin/StatusUpdateForm";
import { PDFDownloader } from "@/components/admin/PDFDownloader";

const AdminComplaints = () => {
  const [complaintTimeline, setComplaintTimeline] = useState([
    { date: "15 Apr 2025 - 14:32", text: "Complaint filed and received", status: "Filed" },
    { date: "15 Apr 2025 - 15:47", text: "Assigned to Officer Praveen Sharma", status: "Assigned" },
    { date: "16 Apr 2025 - 10:15", text: "Initial investigation started", status: "In Progress" },
    { date: "16 Apr 2025 - 16:30", text: "CCTV footage collected from area", status: "In Progress" }
  ]);
  
  const { toast } = useToast();
  
  const handleStatusUpdate = (status: string, title: string, details: string) => {
    const now = new Date();
    const formattedDate = `${now.getDate()} Apr 2025 - ${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    let statusText = "In Progress";
    if (status === "review") statusText = "Under Review";
    if (status === "resolved") statusText = "Resolved";
    if (status === "closed") statusText = "Closed";
    
    const newUpdate = {
      date: formattedDate,
      text: details || title,
      status: statusText
    };
    
    setComplaintTimeline([...complaintTimeline, newUpdate]);
  };
  
  const handleExportData = () => {
    toast({
      title: "Data exported",
      description: "Complaint data has been exported successfully"
    });
  };
  
  const handleViewComplaint = (id: string) => {
    // In a real app, this would navigate to the complaint detail view
    toast({
      title: "Viewing complaint",
      description: `Viewing details for complaint ${id}`
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-police-950 to-police-900 text-white">
      <Navbar type="admin" />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <FileText className="h-6 w-6 text-primary mr-3" />
          <h1 className="text-3xl font-bold">Complaints Management</h1>
        </div>
        
        {/* Filters and Search */}
        <Card className="bg-police-800/40 backdrop-blur-lg border-police-700 mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col space-y-4 md:flex-row md:items-end md:space-y-0 md:space-x-4">
              <div className="flex-1 space-y-2">
                <label className="text-sm font-medium text-gray-300">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Search by ID, name, or location..." 
                    className="bg-police-800 border-police-700 text-white pl-10"
                  />
                </div>
              </div>
              
              <div className="flex-1 md:flex-initial space-y-2">
                <label className="text-sm font-medium text-gray-300">Crime Type</label>
                <Select defaultValue="all">
                  <SelectTrigger className="bg-police-800 border-police-700 text-white w-full md:w-40">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent className="bg-police-800 border-police-700 text-white">
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="theft">Theft</SelectItem>
                    <SelectItem value="assault">Assault</SelectItem>
                    <SelectItem value="burglary">Burglary</SelectItem>
                    <SelectItem value="noise">Noise Complaint</SelectItem>
                    <SelectItem value="suspicious">Suspicious Activity</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-1 md:flex-initial space-y-2">
                <label className="text-sm font-medium text-gray-300">Zone</label>
                <Select defaultValue="all">
                  <SelectTrigger className="bg-police-800 border-police-700 text-white w-full md:w-40">
                    <SelectValue placeholder="All Zones" />
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
              
              <div className="flex-1 md:flex-initial space-y-2">
                <label className="text-sm font-medium text-gray-300">Status</label>
                <Select defaultValue="all">
                  <SelectTrigger className="bg-police-800 border-police-700 text-white w-full md:w-40">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-police-800 border-police-700 text-white">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="filed">Filed</SelectItem>
                    <SelectItem value="assigned">Assigned</SelectItem>
                    <SelectItem value="inprogress">In Progress</SelectItem>
                    <SelectItem value="review">Under Review</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button className="mt-3 md:mt-0">
                <Filter className="h-4 w-4 mr-2" />
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Complaints Table */}
        <Card className="bg-police-800/40 backdrop-blur-lg border-police-700 mb-6">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Recent Complaints</CardTitle>
              <PDFDownloader 
                filename="complaints-data.pdf"
                documentTitle="Complaints Report"
                content="complaints"
              >
                <Button variant="outline" size="sm" className="bg-police-700 hover:bg-police-600 border-police-600">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </PDFDownloader>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b border-police-700">
                    <th className="pb-3 pl-4 font-medium text-gray-300">Case ID</th>
                    <th className="pb-3 font-medium text-gray-300">Type</th>
                    <th className="pb-3 font-medium text-gray-300">Location</th>
                    <th className="pb-3 font-medium text-gray-300">Date</th>
                    <th className="pb-3 font-medium text-gray-300">Status</th>
                    <th className="pb-3 font-medium text-gray-300">Severity</th>
                    <th className="pb-3 font-medium text-gray-300">Assigned To</th>
                    <th className="pb-3 pr-4 font-medium text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-200">
                  {/* Sample complaint rows */}
                  <tr className="border-b border-police-800 hover:bg-police-800/50">
                    <td className="py-4 pl-4">SP-2025-04-782</td>
                    <td>Theft</td>
                    <td>MG Road, Pune</td>
                    <td>15 Apr 2025</td>
                    <td>
                      <span className="px-2 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-200">
                        In Progress
                      </span>
                    </td>
                    <td>
                      <span className="inline-block w-16 h-2 rounded-full bg-yellow-500"></span>
                    </td>
                    <td>Officer Sharma</td>
                    <td className="pr-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 px-2"
                        onClick={() => handleViewComplaint("SP-2025-04-782")}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                  
                  <tr className="border-b border-police-800 hover:bg-police-800/50">
                    <td className="py-4 pl-4">SP-2025-04-781</td>
                    <td>Assault</td>
                    <td>Shivajinagar, Pune</td>
                    <td>15 Apr 2025</td>
                    <td>
                      <span className="px-2 py-1 rounded-full text-xs bg-blue-500/20 text-blue-200">
                        Assigned
                      </span>
                    </td>
                    <td>
                      <span className="inline-block w-16 h-2 rounded-full bg-alert"></span>
                    </td>
                    <td>Officer Joshi</td>
                    <td className="pr-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 px-2"
                        onClick={() => handleViewComplaint("SP-2025-04-781")}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                  
                  <tr className="border-b border-police-800 hover:bg-police-800/50">
                    <td className="py-4 pl-4">SP-2025-04-780</td>
                    <td>Noise</td>
                    <td>Kothrud, Pune</td>
                    <td>15 Apr 2025</td>
                    <td>
                      <span className="px-2 py-1 rounded-full text-xs bg-success/20 text-success-light">
                        Resolved
                      </span>
                    </td>
                    <td>
                      <span className="inline-block w-16 h-2 rounded-full bg-blue-500"></span>
                    </td>
                    <td>Officer Patil</td>
                    <td className="pr-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 px-2"
                        onClick={() => handleViewComplaint("SP-2025-04-780")}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                  
                  <tr className="border-b border-police-800 hover:bg-police-800/50">
                    <td className="py-4 pl-4">SP-2025-04-779</td>
                    <td>Suspicious</td>
                    <td>Aundh, Pune</td>
                    <td>15 Apr 2025</td>
                    <td>
                      <span className="px-2 py-1 rounded-full text-xs bg-purple-500/20 text-purple-200">
                        Under Review
                      </span>
                    </td>
                    <td>
                      <span className="inline-block w-16 h-2 rounded-full bg-yellow-500"></span>
                    </td>
                    <td>Officer Khan</td>
                    <td className="pr-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 px-2"
                        onClick={() => handleViewComplaint("SP-2025-04-779")}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                  
                  <tr className="border-b border-police-800 hover:bg-police-800/50">
                    <td className="py-4 pl-4">SP-2025-04-778</td>
                    <td>Burglary</td>
                    <td>Hadapsar, Pune</td>
                    <td>14 Apr 2025</td>
                    <td>
                      <span className="px-2 py-1 rounded-full text-xs bg-blue-500/20 text-blue-200">
                        Filed
                      </span>
                    </td>
                    <td>
                      <span className="inline-block w-16 h-2 rounded-full bg-alert"></span>
                    </td>
                    <td>Unassigned</td>
                    <td className="pr-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 px-2"
                        onClick={() => handleViewComplaint("SP-2025-04-778")}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        
        {/* Complaint Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="bg-police-800/40 backdrop-blur-lg border-police-700">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center">
                    <FileText className="h-5 w-5 text-primary mr-2" />
                    Complaint Details: SP-2025-04-782
                  </CardTitle>
                  <PDFDownloader 
                    filename="complaint-details.pdf"
                    documentTitle="Complaint SP-2025-04-782 Details"
                    content="complaint details"
                  >
                    <Button variant="outline" size="sm" className="bg-police-700 hover:bg-police-600 border-police-600">
                      <Download className="h-4 w-4 mr-2" />
                      Export Details
                    </Button>
                  </PDFDownloader>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-400">Complainant</p>
                    <div className="flex items-center space-x-2">
                      <User className="h-5 w-5 text-gray-400" />
                      <p className="font-medium">Rajesh Sharma</p>
                    </div>
                    <p className="text-sm text-gray-400">Contact: +91 98765 43210</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm text-gray-400">Location</p>
                    <div className="flex items-center space-x-2">
                      <Map className="h-5 w-5 text-gray-400" />
                      <p className="font-medium">MG Road, Near Coffee Day, Pune</p>
                    </div>
                    <p className="text-sm text-gray-400">Zone: Central Pune</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm text-gray-400">Date & Time</p>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <p className="font-medium">15 Apr 2025</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-gray-400" />
                      <p className="text-sm text-gray-400">Reported at 14:32</p>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm text-gray-400">Status</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-200">
                          In Progress
                        </span>
                        <span className="text-sm text-gray-400">
                          AI Confidence: <span className="text-primary">87%</span>
                        </span>
                      </div>
                      <Button variant="outline" size="sm" className="h-7 text-xs bg-police-700 hover:bg-police-600 border-police-600">
                        Update Status
                        <ChevronDown className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm text-gray-400">Description</p>
                  <div className="bg-police-800/70 p-4 rounded-lg">
                    <p className="text-sm">
                      I was at the coffee shop on MG Road around 2:00 PM. I placed my mobile phone (iPhone 16 Pro, Black) on the table while ordering. When I returned to my seat, the phone was missing. I searched around but couldn't find it. The staff helped me look but it wasn't found. There were several people sitting nearby who left during this time.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm text-gray-400">Evidence Submitted</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-police-800/70 p-3 rounded-lg text-center">
                      <div className="aspect-square bg-police-900 rounded-md flex items-center justify-center mb-2">
                        <FileText className="h-8 w-8 text-gray-500" />
                      </div>
                      <p className="text-xs text-gray-300">Phone receipt.pdf</p>
                      <Button variant="outline" size="sm" className="w-full mt-2 h-7 text-xs bg-police-700 hover:bg-police-600 border-police-600">
                        View
                      </Button>
                    </div>
                    
                    <div className="bg-police-800/70 p-3 rounded-lg text-center">
                      <div className="aspect-square bg-police-900 rounded-md flex items-center justify-center mb-2">
                        <FileText className="h-8 w-8 text-gray-500" />
                      </div>
                      <p className="text-xs text-gray-300">Location history.jpg</p>
                      <Button variant="outline" size="sm" className="w-full mt-2 h-7 text-xs bg-police-700 hover:bg-police-600 border-police-600">
                        View
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-400">Officer Assignment</p>
                    <Button variant="outline" size="sm" className="h-7 text-xs bg-police-700 hover:bg-police-600 border-police-600">
                      Reassign
                    </Button>
                  </div>
                  <div className="bg-police-800/70 p-4 rounded-lg flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Shield className="h-10 w-10 text-primary p-2 bg-police-900 rounded-full" />
                      <div>
                        <p className="font-medium">Officer Praveen Sharma</p>
                        <p className="text-sm text-gray-400">Central Pune Division</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-xs text-gray-400 text-right">
                        <p>Assigned on</p>
                        <p className="text-white">15 Apr 2025, 15:47</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card className="bg-police-800/40 backdrop-blur-lg border-police-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Status Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative pl-8 space-y-8 before:absolute before:inset-y-0 before:left-3 before:w-0.5 before:bg-police-700">
                  {complaintTimeline.map((update, index) => (
                    <div className="relative" key={index}>
                      <div className="absolute -left-8 mt-1.5 h-4 w-4 rounded-full border border-blue-500 bg-police-900"></div>
                      <div className="mb-1 flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <time className="text-xs text-gray-400">{update.date}</time>
                        <span className="px-2 py-0.5 rounded-full text-xs bg-blue-500/20 text-blue-200">
                          {update.status}
                        </span>
                      </div>
                      <p className="text-sm">{update.text}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-police-800/40 backdrop-blur-lg border-police-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Add Status Update</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <StatusUpdateForm onStatusUpdate={handleStatusUpdate} />
              </CardContent>
            </Card>
            
            <Card className="bg-police-800/40 backdrop-blur-lg border-police-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Verification</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-police-800/70 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <div>
                      <p className="font-medium text-sm">Blockchain Hash</p>
                      <p className="text-xs text-gray-400">Data integrity verified</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="h-7 text-xs bg-police-700 hover:bg-police-600 border-police-600">
                    View Logs
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-police-800/70 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5 text-yellow-400" />
                    <div>
                      <p className="font-medium text-sm">Similar Cases</p>
                      <p className="text-xs text-gray-400">2 similar cases in area</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="h-7 text-xs bg-police-700 hover:bg-police-600 border-police-600">
                    Compare
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminComplaints;
