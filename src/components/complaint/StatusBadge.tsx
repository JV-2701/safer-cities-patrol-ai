
import React from "react";

interface StatusBadgeProps {
  status: string;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const getStatusClasses = (status: string) => {
    switch (status) {
      case "Filed":
        return "bg-blue-500/20 text-blue-200";
      case "Assigned":
        return "bg-yellow-500/20 text-yellow-200";
      case "In Progress":
        return "bg-yellow-500/20 text-yellow-200";
      case "Under Review":
        return "bg-purple-500/20 text-purple-200";
      case "Resolved":
        return "bg-success/20 text-success-light";
      case "Closed":
        return "bg-gray-500/20 text-gray-300";
      default:
        return "bg-gray-500/20 text-gray-300";
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClasses(status)}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
