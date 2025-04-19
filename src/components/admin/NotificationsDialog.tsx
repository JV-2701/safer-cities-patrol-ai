
import React from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Bell, Shield, FileText, Calendar, Users } from "lucide-react";

interface NotificationsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NotificationsDialog: React.FC<NotificationsDialogProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-police-900 border-police-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Bell className="h-5 w-5 text-primary mr-2" />
            Notifications
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Your recent alerts and updates
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          <div className="p-3 bg-alert/10 border border-alert/30 rounded-lg">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-alert flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm">New Hotspot Detected</p>
                <p className="text-xs text-gray-300 mt-1">AI has detected unusual activity near Koregaon Park</p>
                <div className="flex items-center mt-2 space-x-2">
                  <Calendar className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-400">15 mins ago</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-3 bg-police-800/70 rounded-lg">
            <div className="flex items-start space-x-3">
              <Users className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Patrol Team Alpha Deployed</p>
                <p className="text-xs text-gray-300 mt-1">Responding to suspicious activity report at MG Road</p>
                <div className="flex items-center mt-2 space-x-2">
                  <Calendar className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-400">42 mins ago</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-3 bg-police-800/70 rounded-lg">
            <div className="flex items-start space-x-3">
              <FileText className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm">New Complaint Filed</p>
                <p className="text-xs text-gray-300 mt-1">Theft complaint from Aundh area requires assignment</p>
                <div className="flex items-center mt-2 space-x-2">
                  <Calendar className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-400">1 hour ago</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-3 bg-success/10 border border-success/30 rounded-lg">
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Case Resolved</p>
                <p className="text-xs text-gray-300 mt-1">Vehicle theft case #SP-2025-04-751 successfully resolved</p>
                <div className="flex items-center mt-2 space-x-2">
                  <Calendar className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-400">3 hours ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button className="w-full" variant="outline">Mark All as Read</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationsDialog;
