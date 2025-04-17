
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatisticsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  color?: "default" | "success" | "alert" | "primary";
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({
  title,
  value,
  icon: Icon,
  description,
  trend,
  trendValue,
  color = "default"
}) => {
  const getColorClasses = () => {
    switch (color) {
      case "success":
        return "bg-success/10 text-success-light";
      case "alert":
        return "bg-alert/10 text-alert-light";
      case "primary":
        return "bg-primary/10 text-primary-foreground";
      default:
        return "bg-gray-500/10 text-gray-300";
    }
  };

  const getTrendIcon = () => {
    if (trend === "up") return "↑";
    if (trend === "down") return "↓";
    return "→";
  };

  const getTrendColor = () => {
    if (trend === "up") return "text-success-light";
    if (trend === "down") return "text-alert-light";
    return "text-gray-400";
  };

  return (
    <Card className="bg-police-800/40 backdrop-blur-lg border-police-700 hover:bg-police-800/60 transition-colors">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-400">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            
            {description && (
              <p className="text-xs text-gray-400 mt-2">{description}</p>
            )}
            
            {trend && trendValue && (
              <div className={`flex items-center space-x-1 mt-2 text-xs ${getTrendColor()}`}>
                <span>{getTrendIcon()}</span>
                <span>{trendValue}</span>
              </div>
            )}
          </div>
          
          <div className={`p-3 rounded-full ${getColorClasses()}`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatisticsCard;
