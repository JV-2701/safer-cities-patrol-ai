
import React, { useState } from "react";
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
import { Upload, MessageSquare, MapPin, FileText, AlertTriangle } from "lucide-react";

const CitizenComplaint = () => {
  const [complaintType, setComplaintType] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would submit the form data to an API
    console.log({ complaintType, location, description, useCurrentLocation });
    // Show success message
    alert("Complaint submitted successfully! Your case ID is SP-2025-04-891");
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
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-police-700 hover:bg-police-600 border-police-600"
                  >
                    Select Files
                  </Button>
                </div>
              </div>
              
              <div className="bg-police-700/50 p-4 rounded-lg flex items-start space-x-3">
                <MessageSquare className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium mb-1">Need assistance?</h3>
                  <p className="text-xs text-gray-300 mb-2">
                    Use our AI assistant Rakshak to help you file your complaint
                  </p>
                  <Button variant="default" size="sm" className="text-xs h-7">
                    Chat with Rakshak
                  </Button>
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
              <Button variant="outline" className="bg-police-700 hover:bg-police-600 border-police-600">
                Save as Draft
              </Button>
              <Button type="submit" onClick={handleSubmit}>Submit Complaint</Button>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
};

export default CitizenComplaint;
