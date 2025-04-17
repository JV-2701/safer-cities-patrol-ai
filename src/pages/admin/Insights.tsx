
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart2, 
  Calendar, 
  Download, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  FileBarChart,
  Clock
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample chart components (where we'd use Recharts in a real app)
const LineChart = () => (
  <div className="h-72 bg-police-800/50 rounded-lg border border-police-700 p-4 flex items-center justify-center">
    <TrendingUp className="h-12 w-12 text-primary/40" />
    <p className="text-sm text-gray-400 mt-2">Line chart visualization would be here using Recharts</p>
  </div>
);

const BarChart = () => (
  <div className="h-72 bg-police-800/50 rounded-lg border border-police-700 p-4 flex items-center justify-center">
    <BarChart2 className="h-12 w-12 text-primary/40" />
    <p className="text-sm text-gray-400 mt-2">Bar chart visualization would be here using Recharts</p>
  </div>
);

const AdminInsights = () => {
  const [timeRange, setTimeRange] = useState("7d");
  const [chart1, setChart1] = useState("crime-trends");
  const [chart2, setChart2] = useState("patrol-effectiveness");

  return (
    <div className="min-h-screen bg-gradient-to-b from-police-950 to-police-900 text-white">
      <Navbar type="admin" />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <BarChart2 className="h-6 w-6 text-primary mr-3" />
          <h1 className="text-3xl font-bold">AI Insights</h1>
        </div>
        
        {/* Time Range Selector */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Button 
            variant={timeRange === "24h" ? "default" : "outline"} 
            className={timeRange !== "24h" ? "bg-police-700 hover:bg-police-600 border-police-600" : ""}
            onClick={() => setTimeRange("24h")}
          >
            Last 24 Hours
          </Button>
          <Button 
            variant={timeRange === "7d" ? "default" : "outline"}
            className={timeRange !== "7d" ? "bg-police-700 hover:bg-police-600 border-police-600" : ""} 
            onClick={() => setTimeRange("7d")}
          >
            Last 7 Days
          </Button>
          <Button 
            variant={timeRange === "30d" ? "default" : "outline"}
            className={timeRange !== "30d" ? "bg-police-700 hover:bg-police-600 border-police-600" : ""} 
            onClick={() => setTimeRange("30d")}
          >
            Last 30 Days
          </Button>
          <Button 
            variant={timeRange === "90d" ? "default" : "outline"}
            className={timeRange !== "90d" ? "bg-police-700 hover:bg-police-600 border-police-600" : ""} 
            onClick={() => setTimeRange("90d")}
          >
            Last 3 Months
          </Button>
          <Button 
            variant={timeRange === "1y" ? "default" : "outline"}
            className={timeRange !== "1y" ? "bg-police-700 hover:bg-police-600 border-police-600" : ""} 
            onClick={() => setTimeRange("1y")}
          >
            Last Year
          </Button>
          <Button 
            variant={timeRange === "custom" ? "default" : "outline"}
            className={timeRange !== "custom" ? "bg-police-700 hover:bg-police-600 border-police-600" : ""} 
            onClick={() => setTimeRange("custom")}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Custom Range
          </Button>
        </div>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-police-800/30 backdrop-blur-sm border-police-700">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-400">Total Incidents</p>
                  <p className="text-3xl font-bold mt-1">426</p>
                </div>
                <div className="flex items-center">
                  <TrendingDown className="h-5 w-5 text-success mr-1" />
                  <span className="text-success">-8%</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-3">Compared to previous period</p>
            </CardContent>
          </Card>
          
          <Card className="bg-police-800/30 backdrop-blur-sm border-police-700">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-400">Response Time</p>
                  <p className="text-3xl font-bold mt-1">14.2m</p>
                </div>
                <div className="flex items-center">
                  <TrendingDown className="h-5 w-5 text-success mr-1" />
                  <span className="text-success">-12%</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-3">Average response time in minutes</p>
            </CardContent>
          </Card>
          
          <Card className="bg-police-800/30 backdrop-blur-sm border-police-700">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-400">Resolution Rate</p>
                  <p className="text-3xl font-bold mt-1">73%</p>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="h-5 w-5 text-success mr-1" />
                  <span className="text-success">+5%</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-3">Cases resolved successfully</p>
            </CardContent>
          </Card>
          
          <Card className="bg-police-800/30 backdrop-blur-sm border-police-700">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-400">AI Predictions</p>
                  <p className="text-3xl font-bold mt-1">92%</p>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="h-5 w-5 text-success mr-1" />
                  <span className="text-success">+2.5%</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-3">Prediction accuracy rate</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Chart 1 */}
        <Card className="bg-police-800/40 backdrop-blur-lg border-police-700 mb-8">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                {chart1 === "crime-trends" && "Crime Trends Analysis"}
                {chart1 === "hourly-distribution" && "Hourly Crime Distribution"}
                {chart1 === "crime-types" && "Crime Types Breakdown"}
              </CardTitle>
              <div className="flex items-center space-x-3">
                <Select value={chart1} onValueChange={setChart1}>
                  <SelectTrigger className="bg-police-800 border-police-700 text-white w-48">
                    <SelectValue placeholder="Select chart" />
                  </SelectTrigger>
                  <SelectContent className="bg-police-800 border-police-700 text-white">
                    <SelectItem value="crime-trends">Crime Trends</SelectItem>
                    <SelectItem value="hourly-distribution">Hourly Distribution</SelectItem>
                    <SelectItem value="crime-types">Crime Types</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" className="bg-police-700 hover:bg-police-600 border-police-600">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <LineChart />
          </CardContent>
        </Card>
        
        {/* Chart 2 */}
        <Card className="bg-police-800/40 backdrop-blur-lg border-police-700 mb-8">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                {chart2 === "patrol-effectiveness" && "Patrol Effectiveness Analysis"}
                {chart2 === "response-times" && "Response Times by Zone"}
                {chart2 === "resource-allocation" && "Resource Allocation Impact"}
              </CardTitle>
              <div className="flex items-center space-x-3">
                <Select value={chart2} onValueChange={setChart2}>
                  <SelectTrigger className="bg-police-800 border-police-700 text-white w-48">
                    <SelectValue placeholder="Select chart" />
                  </SelectTrigger>
                  <SelectContent className="bg-police-800 border-police-700 text-white">
                    <SelectItem value="patrol-effectiveness">Patrol Effectiveness</SelectItem>
                    <SelectItem value="response-times">Response Times</SelectItem>
                    <SelectItem value="resource-allocation">Resource Allocation</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" className="bg-police-700 hover:bg-police-600 border-police-600">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <BarChart />
          </CardContent>
        </Card>
        
        {/* Insights and Anomalies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-police-800/40 backdrop-blur-lg border-police-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <TrendingUp className="h-5 w-5 text-primary mr-2" />
                Key AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-police-700/50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <FileBarChart className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Vehicle thefts down 24% in areas with optimized patrols</p>
                    <p className="text-xs text-gray-300 mt-1">
                      AI-driven patrol routes have shown significant impact on reducing vehicle thefts, especially in parking areas.
                    </p>
                    <div className="flex items-center mt-2 space-x-2">
                      <Clock className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-400">Analysis period: Last 30 days</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-police-700/50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <FileBarChart className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Correlation between weather patterns and certain crime types</p>
                    <p className="text-xs text-gray-300 mt-1">
                      Heat waves show 18% increase in public disturbances, while heavy rain periods show reduction in street crimes.
                    </p>
                    <div className="flex items-center mt-2 space-x-2">
                      <Clock className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-400">Analysis period: Last 12 months</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-police-700/50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <FileBarChart className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Response time optimization yielding results</p>
                    <p className="text-xs text-gray-300 mt-1">
                      12% improvement in response times has led to 9% increase in successful on-scene apprehensions.
                    </p>
                    <div className="flex items-center mt-2 space-x-2">
                      <Clock className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-400">Analysis period: Last 60 days</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-police-700/50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <FileBarChart className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Community reporting has increased by 32%</p>
                    <p className="text-xs text-gray-300 mt-1">
                      The citizen app and community engagement programs are showing success in increasing public participation.
                    </p>
                    <div className="flex items-center mt-2 space-x-2">
                      <Clock className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-400">Analysis period: Last 90 days</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-police-800/40 backdrop-blur-lg border-police-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <AlertTriangle className="h-5 w-5 text-alert mr-2" />
                Anomaly Detection & Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-alert/10 border border-alert/30 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-alert flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Unusual spike in phone thefts (MG Road)</p>
                    <p className="text-xs text-gray-300 mt-1">
                      67% increase in mobile phone thefts reported around MG Road area between 8 PM - 11 PM.
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-400">Detected 6 hours ago</span>
                      </div>
                      <span className="text-xs bg-alert/20 text-alert-light px-2 py-0.5 rounded">
                        Model Confidence: 89%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-alert/10 border border-alert/30 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-alert flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Emerging pattern in vehicle theft techniques</p>
                    <p className="text-xs text-gray-300 mt-1">
                      New modus operandi detected involving signal jammers to bypass car security systems.
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-400">Detected 2 days ago</span>
                      </div>
                      <span className="text-xs bg-alert/20 text-alert-light px-2 py-0.5 rounded">
                        Model Confidence: 76%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Potential festival-related security concerns</p>
                    <p className="text-xs text-gray-300 mt-1">
                      Historical data suggests increased pickpocketing risk during upcoming festival (April 22-25).
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-400">Predictive alert</span>
                      </div>
                      <span className="text-xs bg-yellow-500/20 text-yellow-200 px-2 py-0.5 rounded">
                        Model Confidence: 82%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                <div className="flex items-start space-x-3">
                  <TrendingDown className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Significant reduction in street crimes (Koregaon Park)</p>
                    <p className="text-xs text-gray-300 mt-1">
                      CCTV installation and increased patrols have reduced street crimes by 38% in this area.
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-400">Positive trend (Last 60 days)</span>
                      </div>
                      <span className="text-xs bg-green-500/20 text-green-200 px-2 py-0.5 rounded">
                        Model Confidence: 94%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button className="w-full bg-police-700 hover:bg-police-600 border-police-600">
                <Download className="h-4 w-4 mr-2" />
                Generate Full Insights Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminInsights;
