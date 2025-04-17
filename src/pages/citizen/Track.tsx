
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Clock, User, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const mockComplaintData = {
  id: "SP-2025-04-782",
  type: "Theft",
  location: "MG Road, Pune",
  date: "15 Apr 2025",
  description: "Mobile phone stolen near coffee shop",
  status: "In Progress",
  confidence: 87,
  assignedTo: "Officer Praveen Sharma",
  updates: [
    { date: "15 Apr 2025 - 14:32", text: "Complaint filed and received", status: "Filed" },
    { date: "15 Apr 2025 - 15:47", text: "Assigned to Officer Praveen Sharma", status: "Assigned" },
    { date: "16 Apr 2025 - 10:15", text: "Initial investigation started", status: "In Progress" },
    { date: "16 Apr 2025 - 16:30", text: "CCTV footage collected from area", status: "In Progress" }
  ]
};

const CitizenTrack = () => {
  const [caseId, setCaseId] = useState("");
  const [loading, setLoading] = useState(false);
  const [complaint, setComplaint] = useState<typeof mockComplaintData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caseId.trim()) {
      setError("Please enter a valid Case ID");
      return;
    }
    
    setLoading(true);
    setError(null);
    
    // Simulate API call
    setTimeout(() => {
      if (caseId.startsWith("SP-")) {
        setComplaint(mockComplaintData);
      } else {
        setError("No complaint found with this Case ID");
        setComplaint(null);
      }
      setLoading(false);
    }, 1500);
  };

  // Helper to render the status badge
  const renderStatusBadge = (status: string) => {
    const getStatusClasses = (status: string) => {
      switch (status) {
        case "Filed":
          return "bg-blue-500/20 text-blue-200";
        case "Assigned":
          return "bg-yellow-500/20 text-yellow-200";
        case "In Progress":
          return "bg-yellow-500/20 text-yellow-200";
        case "Under Review":
          return "bg-purple-500/20 text-purple-200";
        case "Resolved":
          return "bg-success/20 text-success-light";
        case "Closed":
          return "bg-gray-500/20 text-gray-300";
        default:
          return "bg-gray-500/20 text-gray-300";
      }
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClasses(status)}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-police-950 to-police-900 text-white">
      <Navbar type="citizen" />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Search className="h-6 w-6 text-primary mr-3" />
          <h1 className="text-3xl font-bold">Track Complaint</h1>
        </div>
        
        <Card className="bg-police-800/40 backdrop-blur-lg border-police-700 mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Enter Case ID</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex space-x-2">
              <Input
                value={caseId}
                onChange={(e) => setCaseId(e.target.value)}
                placeholder="e.g. SP-2025-04-782"
                className="bg-police-800 border-police-700 text-white"
              />
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </>
                )}
              </Button>
            </form>
            {error && (
              <div className="mt-4 p-3 bg-alert/20 border border-alert/30 rounded-lg text-sm flex items-center">
                <AlertCircle className="h-4 w-4 text-alert mr-2" />
                {error}
              </div>
            )}
          </CardContent>
        </Card>
        
        {complaint && (
          <div className="space-y-6">
            <Card className="bg-police-800/40 backdrop-blur-lg border-police-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Complaint Details</CardTitle>
                  <div className="flex items-center space-x-2">
                    {renderStatusBadge(complaint.status)}
                    <span className="bg-police-700 text-xs px-2 py-1 rounded-full">
                      AI Confidence: {complaint.confidence}%
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Case ID</p>
                    <p className="font-medium">{complaint.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Type</p>
                    <p className="font-medium">{complaint.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Location</p>
                    <p className="font-medium">{complaint.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Date Filed</p>
                    <p className="font-medium">{complaint.date}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Description</p>
                  <p className="mt-1">{complaint.description}</p>
                </div>
                <div className="bg-police-700/50 p-3 rounded-lg flex items-center space-x-3">
                  <User className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-300">Assigned To</p>
                    <p className="font-medium">{complaint.assignedTo}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-police-800/40 backdrop-blur-lg border-police-700">
              <CardHeader>
                <CardTitle className="text-lg">Status Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative pl-8 space-y-8 before:absolute before:inset-y-0 before:left-3 before:w-0.5 before:bg-police-700">
                  {complaint.updates.map((update, index) => (
                    <div key={index} className="relative">
                      <div className="absolute -left-8 mt-1.5 h-4 w-4 rounded-full border border-primary bg-police-900"></div>
                      <div className="mb-1 flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <time className="text-xs text-gray-400">{update.date}</time>
                        {renderStatusBadge(update.status)}
                      </div>
                      <p className="text-sm">{update.text}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default CitizenTrack;
