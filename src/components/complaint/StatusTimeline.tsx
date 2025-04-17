
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import StatusBadge from "./StatusBadge";

interface TimelineUpdate {
  date: string;
  text: string;
  status: string;
}

interface StatusTimelineProps {
  updates: TimelineUpdate[];
}

const StatusTimeline = ({ updates }: StatusTimelineProps) => {
  return (
    <Card className="bg-police-800/40 backdrop-blur-lg border-police-700">
      <CardHeader>
        <CardTitle className="text-lg">Status Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative pl-8 space-y-8 before:absolute before:inset-y-0 before:left-3 before:w-0.5 before:bg-police-700">
          {updates.map((update, index) => (
            <div key={index} className="relative">
              <div className="absolute -left-8 mt-1.5 h-4 w-4 rounded-full border border-primary bg-police-900"></div>
              <div className="mb-1 flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <time className="text-xs text-gray-400">{update.date}</time>
                <StatusBadge status={update.status} />
              </div>
              <p className="text-sm">{update.text}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusTimeline;
