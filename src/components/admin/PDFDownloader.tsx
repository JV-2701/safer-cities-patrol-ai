
import React from "react";
import { saveAs } from "file-saver";
import { useToast } from "@/hooks/use-toast";

interface PDFDownloaderProps {
  filename: string;
  documentTitle: string;
  content: string;
  children: React.ReactNode;
}

export const PDFDownloader: React.FC<PDFDownloaderProps> = ({ 
  filename, 
  documentTitle, 
  content, 
  children 
}) => {
  const { toast } = useToast();
  
  const handleDownload = () => {
    // Create a structured PDF content based on the content type
    let pdfContent = `
      ${documentTitle}
      Generated on: ${new Date().toLocaleString()}
      
    `;
    
    // Add specific content based on content type
    switch (content) {
      case "dashboard":
        pdfContent += `
          DASHBOARD REPORT SUMMARY
          -------------------------
          Total Complaints Today: 24
          Active Hotspots: 7
          Patrols in Action: 18
          AI Prediction Accuracy: 92%
          
          Crime Statistics (Last 7 Days):
          - Theft: 42 incidents
          - Assault: 31 incidents
          - Burglary: 27 incidents
          - Noise Complaints: 38 incidents
          
          Patrol Effectiveness:
          - Team Alpha: 83% effectiveness, 12 dispatches
          - Team Beta: 89% effectiveness, 9 dispatches
          - Team Delta: 80% effectiveness, 15 dispatches
          - Team Echo: 88% effectiveness, 8 dispatches
        `;
        break;
      
      case "patrols":
        pdfContent += `
          PATROL MANAGEMENT REPORT
          -----------------------
          Total Patrol Units: 18
          Coverage: 85%
          Hotspots: 7
          
          Active Routes:
          - RT-042: Central Pune, High Priority, 3 Hotspots, Assigned to Alpha Team
          - RT-043: East Pune, Medium Priority, 2 Hotspots, Assigned to Bravo Team
          - RT-044: West Pune, High Priority, 2 Hotspots, Assigned to Charlie Team
          - RT-045: North Pune, Low Priority, 1 Hotspot, Assigned to Delta Team
          - RT-046: Pimpri-Chinchwad, Medium Priority, 2 Hotspots, Unassigned
          
          Patrol Effectiveness:
          - Crime Reduction: 18%
          - Route Efficiency: 92%
          - Response Time: -12%
        `;
        break;
      
      case "heatmap":
        pdfContent += `
          CRIME HEATMAP ANALYSIS
          ---------------------
          Total Incidents: 487
          Identified Clusters: 7
          Clustering Algorithm: DBSCAN
          
          High Risk Areas:
          - MG Road, Central Pune: Theft (89% confidence)
          - Koregaon Park, East Pune: Vehicle Theft (81% confidence)
          - Aundh, West Pune: Burglary (76% confidence)
          
          Pattern Analysis:
          - Theft incidents increase on weekends by 34%
          - Vehicle crimes peak during 8PM-11PM
          - Residential burglaries are most common between 10AM-2PM
        `;
        break;
      
      default:
        pdfContent += `
          This is a sample PDF report for ${content}.
          In a real application, this would contain formatted data, tables, and charts.
        `;
    }
    
    // In a real implementation, this would generate a proper PDF with formatting
    // For this demo, we're creating a simple text blob that opens as a PDF when downloaded
    const blob = new Blob([pdfContent], { type: "application/pdf" });
    saveAs(blob, filename);
    
    // Create a temporary link to open the PDF in a new tab
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.download = filename;
    link.click();
    
    toast({
      title: "Report downloaded",
      description: `${documentTitle} has been downloaded and opened in a new tab`,
    });
  };
  
  return (
    <div onClick={handleDownload}>
      {children}
    </div>
  );
};
