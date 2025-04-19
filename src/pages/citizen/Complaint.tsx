
import React, { useState, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, MessageSquare, MapPin, FileText, AlertTriangle, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import RakshakChat from "@/components/complaint/RakshakChat";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const CitizenComplaint = () => {
  const [complaintType, setComplaintType] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [blockchainHash, setBlockchainHash] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const generateBlockchainHash = () => {
    // In a real app, this would interact with a blockchain system
    // For demo, generate a random hash
    const characters = "0123456789abcdef";
    let hash = "0x";
    for (let i = 0; i < 64; i++) {
      hash += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return hash;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!complaintType || (!location && !useCurrentLocation) || !description) {
      toast({
        title: "Missing information",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Generate a unique case ID
    const caseId = `SP-2025-04-${Math.floor(Math.random() * 1000)}`;
    
    // Generate blockchain hash for secure record
    const hash = generateBlockchainHash();
    setBlockchainHash(hash);
    
    // Simulate API submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      
      toast({
        title: "Complaint submitted successfully!",
        description: `Your case ID is ${caseId}`,
        variant: "default",
      });
      
      // Redirect to track page with the case ID
      setTimeout(() => {
        navigate(`/citizen/track?id=${caseId}`);
      }, 2000);
    }, 1500);
  };

  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setSelectedFiles(prev => [...prev, ...newFiles]);
      
      toast({
        title: `${newFiles.length} file(s) added`,
        description: "Files attached to your complaint",
      });
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const saveAsDraft = () => {
    // In a real app, we would save to localStorage or a database
    const draft = {
      complaintType,
      location,
      description,
      useCurrentLocation,
      timestamp: new Date().toISOString(),
    };
    
    // Save to localStorage
    localStorage.setItem('complaintDraft', JSON.stringify(draft));
    
    toast({
      title: "Draft saved",
      description: "Your complaint has been saved as a draft",
    });
  };

  const loadDraft = () => {
    const savedDraft = localStorage.getItem('complaintDraft');
    if (savedDraft) {
      const draft = JSON.parse(savedDraft);
      setComplaintType(draft.complaintType || "");
      setLocation(draft.location || "");
      setDescription(draft.description || "");
      setUseCurrentLocation(draft.useCurrentLocation || false);
      
      toast({
        title: "Draft loaded",
        description: "Your saved draft has been loaded",
      });
    } else {
      toast({
        title: "No draft found",
        description: "There are no saved drafts to load",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-police-950 to-police-900 text-white">
      <Navbar type="citizen" />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <FileText className="h-6 w-6 text-primary mr-3" />
          <h1 className="text-3xl font-bold">File a Complaint</h1>
        </div>
        
        <Card className="bg-police-800/40 backdrop-blur-lg border-police-700">
          <CardHeader>
            <CardTitle>New Complaint Form</CardTitle>
            <CardDescription className="text-gray-300">
              Please provide detailed information about the incident
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Type of Complaint</label>
                <Select onValueChange={setComplaintType} value={complaintType}>
                  <SelectTrigger className="bg-police-800 border-police-700 text-white">
                    <SelectValue placeholder="Select complaint type" />
                  </SelectTrigger>
                  <SelectContent className="bg-police-800 border-police-700 text-white">
                    <SelectItem value="theft">Theft</SelectItem>
                    <SelectItem value="assault">Assault</SelectItem>
                    <SelectItem value="suspicious">Suspicious Activity</SelectItem>
                    <SelectItem value="harassment">Harassment</SelectItem>
                    <SelectItem value="noise">Noise Complaint</SelectItem>
                    <SelectItem value="vandalism">Vandalism</SelectItem>
                    <SelectItem value="traffic">Traffic Violation</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Location</label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="text-xs h-7 bg-police-700 hover:bg-police-600 border-police-600"
                    onClick={() => setUseCurrentLocation(!useCurrentLocation)}
                  >
                    <MapPin className="h-3 w-3 mr-1" />
                    {useCurrentLocation ? "Using Current Location" : "Use My Location"}
                  </Button>
                </div>
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder={useCurrentLocation ? "Using your current location..." : "Enter location details"}
                  disabled={useCurrentLocation}
                  className="bg-police-800 border-police-700 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what happened in detail..."
                  rows={5}
                  className="bg-police-800 border-police-700 text-white resize-none"
                />
              </div>
              
              <div className="space-y-3">
                <label className="text-sm font-medium">Evidence (Optional)</label>
                <div className="border-2 border-dashed border-police-700 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-300 mb-2">Drag and drop files here or click to browse</p>
                  <p className="text-xs text-gray-400 mb-3">Supports images, videos, and documents (max 50MB)</p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    multiple
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-police-700 hover:bg-police-600 border-police-600"
                    onClick={handleFileSelect}
                  >
                    Select Files
                  </Button>
                </div>
                
                {selectedFiles.length > 0 && (
                  <div className="mt-3">
                    <h4 className="text-sm font-medium mb-2">Selected Files:</h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {selectedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-police-700/50 p-2 rounded-md">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-police-600 rounded flex items-center justify-center mr-2">
                              <FileText className="h-4 w-4" />
                            </div>
                            <div className="overflow-hidden">
                              <p className="text-sm truncate">{file.name}</p>
                              <p className="text-xs text-gray-400">{(file.size / 1024).toFixed(1)} KB</p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0"
                            onClick={() => removeFile(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {blockchainHash && (
                <div className="bg-success/10 border border-success/30 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Check className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-success-light mb-1">Secured with Blockchain</h3>
                      <p className="text-xs text-gray-300 mb-1">This complaint is securely recorded on blockchain</p>
                      <div className="bg-police-800 p-2 rounded text-xs font-mono text-gray-300 overflow-x-auto">
                        {blockchainHash}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="bg-police-700/50 p-4 rounded-lg flex items-start space-x-3">
                <MessageSquare className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium mb-1">Need assistance?</h3>
                  <p className="text-xs text-gray-300 mb-2">
                    Use our AI assistant Rakshak to help you file your complaint
                  </p>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="default" size="sm" className="text-xs h-7">
                        Chat with Rakshak
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-full sm:w-[400px] bg-police-800 border-police-700 text-white">
                      <RakshakChat />
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="bg-police-900/70 p-3 rounded-lg w-full flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-gray-300">
                <span className="font-medium text-yellow-300 block mb-1">Important Notice</span>
                Filing a false complaint is punishable under Section 182 of IPC with imprisonment up to 6 months, or fine, or both.
              </div>
            </div>
            
            <div className="flex justify-between w-full">
              <div className="flex space-x-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="bg-police-700 hover:bg-police-600 border-police-600"
                  onClick={saveAsDraft}
                >
                  Save as Draft
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="bg-police-700 hover:bg-police-600 border-police-600"
                  onClick={loadDraft}
                >
                  Load Draft
                </Button>
              </div>
              <Button 
                type="submit" 
                onClick={handleSubmit} 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Submit Complaint"}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
};

export default CitizenComplaint;
