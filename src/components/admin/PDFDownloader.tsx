
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
    // In a real implementation, this would generate a proper PDF
    // For this demo, we're creating a simple text blob
    const pdfContent = `
      ${documentTitle}
      Generated on: ${new Date().toLocaleString()}
      
      This is a sample PDF report for ${content}.
      In a real application, this would contain formatted data, tables, and charts.
    `;
    
    const blob = new Blob([pdfContent], { type: "text/plain;charset=utf-8" });
    saveAs(blob, filename);
    
    toast({
      title: "Report downloaded",
      description: `${documentTitle} has been downloaded successfully`,
    });
  };
  
  return (
    <div onClick={handleDownload}>
      {children}
    </div>
  );
};
