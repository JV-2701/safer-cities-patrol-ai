
import React from "react";
import { Button } from "@/components/ui/button";
import { FileText, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ComplaintActions = () => {
  const { toast } = useToast();

  const handleDownloadReport = () => {
    toast({
      title: "Report downloaded",
      description: "The complaint report has been downloaded successfully.",
    });
  };

  const handleContactOfficer = () => {
    toast({
      title: "Contact request sent",
      description: "The officer will contact you shortly.",
    });
  };

  return (
    <div className="flex space-x-3">
      <Button 
        className="flex-1 bg-police-700 hover:bg-police-600 border-police-600" 
        variant="outline"
        onClick={handleDownloadReport}
      >
        <FileText className="h-4 w-4 mr-2" />
        Download Report
      </Button>
      <Button 
        className="flex-1"
        onClick={handleContactOfficer}
      >
        <Phone className="h-4 w-4 mr-2" />
        Contact Officer
      </Button>
    </div>
  );
};

export default ComplaintActions;
