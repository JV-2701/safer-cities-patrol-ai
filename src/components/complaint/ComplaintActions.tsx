
import React from "react";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const ComplaintActions = () => {
  return (
    <div className="flex space-x-3">
      <Button 
        className="flex-1 bg-police-700 hover:bg-police-600 border-police-600" 
        variant="outline"
      >
        <FileText className="h-4 w-4 mr-2" />
        Download Report
      </Button>
      <Button className="flex-1">
        Contact Officer
      </Button>
    </div>
  );
};

export default ComplaintActions;
