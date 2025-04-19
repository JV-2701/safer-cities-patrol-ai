
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface StatusUpdateFormProps {
  onStatusUpdate: (status: string, title: string, details: string) => void;
}

const StatusUpdateForm: React.FC<StatusUpdateFormProps> = ({ onStatusUpdate }) => {
  const [status, setStatus] = useState("in-progress");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter a title for the status update",
        variant: "destructive",
      });
      return;
    }
    
    onStatusUpdate(status, title, details);
    
    // Reset form
    setTitle("");
    setDetails("");
    
    toast({
      title: "Status updated",
      description: "The complaint status has been updated successfully",
    });
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger className="bg-police-800 border-police-700 text-white">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent className="bg-police-800 border-police-700 text-white">
          <SelectItem value="in-progress">In Progress</SelectItem>
          <SelectItem value="review">Under Review</SelectItem>
          <SelectItem value="resolved">Resolved</SelectItem>
          <SelectItem value="closed">Closed</SelectItem>
        </SelectContent>
      </Select>
      
      <Input 
        placeholder="Update title..." 
        className="bg-police-800 border-police-700 text-white"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      
      <textarea 
        placeholder="Add details about the status update..." 
        className="w-full px-3 py-2 bg-police-800 border border-police-700 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-primary h-24"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
      />
      
      <div className="flex justify-end">
        <Button type="submit">
          Add Update
        </Button>
      </div>
    </form>
  );
};

export default StatusUpdateForm;
