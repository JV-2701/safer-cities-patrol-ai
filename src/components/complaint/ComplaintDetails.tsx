
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { User, Shield } from "lucide-react";
import StatusBadge from "./StatusBadge";

interface BlockchainData {
  hash: string;
  timestamp: string;
  verificationCount: number;
}

interface ComplaintData {
  id: string;
  type: string;
  location: string;
  date: string;
  description: string;
  status: string;
  confidence: number;
  assignedTo: string;
  blockchain: BlockchainData;
}

interface ComplaintDetailsProps {
  complaint: ComplaintData;
}

const ComplaintDetails = ({ complaint }: ComplaintDetailsProps) => {
  return (
    <Card className="bg-police-800/40 backdrop-blur-lg border-police-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Complaint Details</CardTitle>
          <div className="flex items-center space-x-2">
            <StatusBadge status={complaint.status} />
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
        
        <div className="bg-primary/10 border border-primary/20 p-3 rounded-lg">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-primary-foreground mb-1">Blockchain Verification</h3>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <p className="text-xs text-gray-400">Timestamp</p>
                  <p className="text-xs">{new Date(complaint.blockchain.timestamp).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Verifications</p>
                  <p className="text-xs">{complaint.blockchain.verificationCount} nodes</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400">Transaction Hash</p>
                <p className="text-xs font-mono bg-police-800 p-1.5 rounded mt-1 overflow-x-auto">
                  {complaint.blockchain.hash}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComplaintDetails;
