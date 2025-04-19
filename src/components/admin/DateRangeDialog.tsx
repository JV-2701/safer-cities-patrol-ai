
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface DateRangeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DateRangeDialog: React.FC<DateRangeDialogProps> = ({ open, onOpenChange }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { toast } = useToast();
  
  const handleApply = () => {
    // In a real app, this would update the dashboard data with the selected date
    toast({
      title: "Date Filter Applied",
      description: `Dashboard data updated for ${date ? format(date, "PPP") : "today"}`,
    });
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-police-900 border-police-700 text-white">
        <DialogHeader>
          <DialogTitle>Select Date Range</DialogTitle>
          <DialogDescription className="text-gray-400">
            Choose a date to view dashboard data
          </DialogDescription>
        </DialogHeader>
        
        <div className="p-4 flex justify-center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={(date) => date > new Date() || date < new Date("2023-01-01")}
            initialFocus
            className="border border-police-700 rounded-md bg-police-800"
          />
        </div>
        
        <div className="flex justify-between items-center px-4 py-2 bg-police-800 rounded-md">
          <div>
            <p className="text-sm font-medium">Selected Date</p>
            <p className="text-gray-400 text-sm">{date ? format(date, "PPP") : "None"}</p>
          </div>
          <Button onClick={handleApply}>Apply</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DateRangeDialog;
