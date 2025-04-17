
import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import { Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "react-router-dom";
import SearchForm from "@/components/complaint/SearchForm";
import ComplaintDetails from "@/components/complaint/ComplaintDetails";
import StatusTimeline from "@/components/complaint/StatusTimeline";
import ComplaintActions from "@/components/complaint/ComplaintActions";

const mockComplaintData = {
  id: "SP-2025-04-782",
  type: "Theft",
  location: "MG Road, Pune",
  date: "15 Apr 2025",
  description: "Mobile phone stolen near coffee shop",
  status: "In Progress",
  confidence: 87,
  assignedTo: "Officer Praveen Sharma",
  blockchain: {
    hash: "0x8a21c5d78f41dd76de5e8bfc24b7adfe9d9c720aaf5d7611de48b86621a39574",
    timestamp: "2025-04-15T14:32:47Z",
    verificationCount: 12
  },
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
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const idFromUrl = params.get("id");
    
    if (idFromUrl) {
      setCaseId(idFromUrl);
      handleSearch(null, idFromUrl);
    }
  }, [location]);

  const handleSearch = (e: React.FormEvent | null, overrideCaseId?: string) => {
    if (e) e.preventDefault();
    
    const searchId = overrideCaseId || caseId;
    
    if (!searchId.trim()) {
      setError("Please enter a valid Case ID");
      return;
    }
    
    setLoading(true);
    setError(null);
    
    setTimeout(() => {
      if (searchId.startsWith("SP-")) {
        setComplaint(mockComplaintData);
        toast({
          title: "Complaint found",
          description: `Displaying details for ${searchId}`,
        });
      } else {
        setError("No complaint found with this Case ID");
        setComplaint(null);
        toast({
          title: "Search failed",
          description: "No complaint found with this Case ID",
          variant: "destructive",
        });
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-police-950 to-police-900 text-white">
      <Navbar type="citizen" />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Search className="h-6 w-6 text-primary mr-3" />
          <h1 className="text-3xl font-bold">Track Complaint</h1>
        </div>
        
        <SearchForm 
          caseId={caseId} 
          setCaseId={setCaseId} 
          handleSearch={handleSearch} 
          loading={loading} 
          error={error} 
        />
        
        {complaint && (
          <div className="space-y-6">
            <ComplaintDetails complaint={complaint} />
            <StatusTimeline updates={complaint.updates} />
            <ComplaintActions />
          </div>
        )}
      </main>
    </div>
  );
};

export default CitizenTrack;
