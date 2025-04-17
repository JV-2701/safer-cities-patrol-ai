
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  FileBarChart, 
  FileImage, 
  FileVideo, 
  FileText,
  Download,
  CheckCircle,
  Code,
  Share2
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock evidence data
const evidenceItems = [
  { id: "E-2025-04-001", type: "image", name: "Crime Scene 1.jpg", caseId: "SP-2025-04-782", date: "15 Apr 2025", verified: true },
  { id: "E-2025-04-002", type: "document", name: "Police Report.pdf", caseId: "SP-2025-04-782", date: "15 Apr 2025", verified: true },
  { id: "E-2025-04-003", type: "video", name: "CCTV Footage.mp4", caseId: "SP-2025-04-781", date: "15 Apr 2025", verified: true },
  { id: "E-2025-04-004", type: "document", name: "Witness Statement.pdf", caseId: "SP-2025-04-781", date: "15 Apr 2025", verified: false },
  { id: "E-2025-04-005", type: "image", name: "Vehicle Damage.jpg", caseId: "SP-2025-04-780", date: "15 Apr 2025", verified: true },
  { id: "E-2025-04-006", type: "audio", name: "Call Recording.mp3", caseId: "SP-2025-04-779", date: "14 Apr 2025", verified: true },
  { id: "E-2025-04-007", type: "document", name: "Medical Report.pdf", caseId: "SP-2025-04-778", date: "14 Apr 2025", verified: false },
  { id: "E-2025-04-008", type: "image", name: "Property Images.jpg", caseId: "SP-2025-04-777", date: "14 Apr 2025", verified: true },
];

const AdminEvidence = () => {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvidence, setSelectedEvidence] = useState<typeof evidenceItems[0] | null>(null);
  
  // Filter evidence based on type and search query
  const filteredEvidence = evidenceItems
    .filter(item => filter === "all" || item.type === filter)
    .filter(item => 
      searchQuery === "" || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.caseId.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-police-950 to-police-900 text-white">
      <Navbar type="admin" />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <FileBarChart className="h-6 w-6 text-primary mr-3" />
          <h1 className="text-3xl font-bold">Evidence Management</h1>
        </div>
        
        {/* Search and Filters */}
        <Card className="bg-police-800/40 backdrop-blur-lg border-police-700 mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col space-y-4 md:flex-row md:items-end md:space-y-0 md:space-x-4">
              <div className="flex-1 space-y-2">
                <label className="text-sm font-medium text-gray-300">Search Evidence</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Search by ID, name, or case ID..." 
                    className="bg-police-800 border-police-700 text-white pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex-1 md:flex-initial space-y-2">
                <label className="text-sm font-medium text-gray-300">File Type</label>
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="bg-police-800 border-police-700 text-white w-full md:w-40">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent className="bg-police-800 border-police-700 text-white">
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="image">Images</SelectItem>
                    <SelectItem value="video">Videos</SelectItem>
                    <SelectItem value="document">Documents</SelectItem>
                    <SelectItem value="audio">Audio</SelectItem>
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
        
        {/* Evidence Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {filteredEvidence.map((item) => (
            <Card 
              key={item.id} 
              className={`bg-police-800/40 backdrop-blur-lg border-police-700 hover:border-primary/50 cursor-pointer transition-colors ${selectedEvidence?.id === item.id ? 'border-primary' : ''}`}
              onClick={() => setSelectedEvidence(item)}
            >
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-3 rounded-lg bg-police-700/50">
                    {item.type === 'image' && <FileImage className="h-8 w-8 text-blue-400" />}
                    {item.type === 'video' && <FileVideo className="h-8 w-8 text-red-400" />}
                    {item.type === 'document' && <FileText className="h-8 w-8 text-yellow-400" />}
                    {item.type === 'audio' && <FileBarChart className="h-8 w-8 text-green-400" />}
                  </div>
                  {item.verified && (
                    <div className="flex items-center text-xs text-success bg-success/10 px-2 py-1 rounded-full">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium truncate" title={item.name}>{item.name}</h3>
                  
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>ID: {item.id}</span>
                    <span>{item.date}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-300">
                      Case: <span className="text-primary">{item.caseId}</span>
                    </span>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Selected Evidence Details */}
        {selectedEvidence && (
          <Card className="bg-police-800/40 backdrop-blur-lg border-police-700">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Evidence Details</CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="bg-police-700 hover:bg-police-600 border-police-600">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm" className="bg-police-700 hover:bg-police-600 border-police-600">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="aspect-video bg-police-900 rounded-lg flex items-center justify-center mb-4">
                    {selectedEvidence.type === 'image' && (
                      <div className="flex flex-col items-center">
                        <FileImage className="h-16 w-16 text-blue-400 mb-2" />
                        <p className="text-sm text-gray-400">Image preview would appear here</p>
                      </div>
                    )}
                    {selectedEvidence.type === 'video' && (
                      <div className="flex flex-col items-center">
                        <FileVideo className="h-16 w-16 text-red-400 mb-2" />
                        <p className="text-sm text-gray-400">Video player would appear here</p>
                      </div>
                    )}
                    {selectedEvidence.type === 'document' && (
                      <div className="flex flex-col items-center">
                        <FileText className="h-16 w-16 text-yellow-400 mb-2" />
                        <p className="text-sm text-gray-400">Document preview would appear here</p>
                      </div>
                    )}
                    {selectedEvidence.type === 'audio' && (
                      <div className="flex flex-col items-center">
                        <FileBarChart className="h-16 w-16 text-green-400 mb-2" />
                        <p className="text-sm text-gray-400">Audio player would appear here</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-400">Evidence ID</p>
                      <p className="font-medium">{selectedEvidence.id}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-400">Case ID</p>
                      <p className="font-medium">{selectedEvidence.caseId}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-400">File Name</p>
                      <p className="font-medium">{selectedEvidence.name}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-400">Date Added</p>
                      <p className="font-medium">{selectedEvidence.date}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-gray-400">Description</p>
                    <p className="text-sm text-gray-300">
                      {selectedEvidence.type === 'image' && "Photographic evidence related to the case showing relevant details of the incident scene captured by the investigating officer."}
                      {selectedEvidence.type === 'video' && "Video footage captured from surveillance cameras at the incident location showing relevant activity and individuals."}
                      {selectedEvidence.type === 'document' && "Official documentation related to the case including statements, reports, and relevant legal paperwork."}
                      {selectedEvidence.type === 'audio' && "Audio recording of relevant communications, witness statements, or environmental sounds from the incident."}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <Card className="bg-police-700/50 border-police-600">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center">
                        <CheckCircle className="h-4 w-4 text-success mr-2" />
                        Blockchain Verification
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                      <div className="flex justify-between items-center">
                        <p className="text-gray-300">Status</p>
                        <p className={`font-medium ${selectedEvidence.verified ? 'text-success' : 'text-yellow-400'}`}>
                          {selectedEvidence.verified ? 'Verified' : 'Pending'}
                        </p>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <p className="text-gray-300">Timestamp</p>
                        <p className="font-medium">15 Apr 2025, 14:32:51</p>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <p className="text-gray-300">Hash</p>
                        <Button variant="ghost" size="sm" className="h-6 text-xs">
                          <Code className="h-3 w-3 mr-1" />
                          View
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <p className="text-gray-300">Ledger Entry</p>
                        <Button variant="ghost" size="sm" className="h-6 text-xs">
                          <FileText className="h-3 w-3 mr-1" />
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-police-700/50 border-police-600">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Access Log</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-xs">
                      <div className="p-2 bg-police-600/50 rounded-lg">
                        <div className="flex justify-between items-center">
                          <p className="font-medium">Officer Sharma</p>
                          <p className="text-gray-400">Today, 10:15 AM</p>
                        </div>
                        <p className="text-gray-300 mt-1">Viewed and downloaded</p>
                      </div>
                      
                      <div className="p-2 bg-police-600/50 rounded-lg">
                        <div className="flex justify-between items-center">
                          <p className="font-medium">Inspector Patil</p>
                          <p className="text-gray-400">Yesterday, 16:22 PM</p>
                        </div>
                        <p className="text-gray-300 mt-1">Case review</p>
                      </div>
                      
                      <div className="p-2 bg-police-600/50 rounded-lg">
                        <div className="flex justify-between items-center">
                          <p className="font-medium">System</p>
                          <p className="text-gray-400">{selectedEvidence.date}, 14:32 PM</p>
                        </div>
                        <p className="text-gray-300 mt-1">Evidence uploaded and verified</p>
                      </div>
                      
                      <Button variant="outline" size="sm" className="w-full text-xs h-7 bg-police-600 hover:bg-police-500 border-police-500">
                        View Complete Log
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Button className="w-full">
                    Analyze with AI
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default AdminEvidence;
