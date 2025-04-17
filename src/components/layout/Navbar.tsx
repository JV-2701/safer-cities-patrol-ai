
import React from "react";
import { Link } from "react-router-dom";
import { 
  Shield, 
  FileText, 
  Search, 
  MapPin, 
  BookOpen, 
  Users, 
  Image, 
  HelpCircle, 
  LogOut, 
  ChevronDown 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  type: "citizen" | "admin";
}

const CitizenNavbar = () => {
  return (
    <nav className="bg-police-950/90 backdrop-blur-md text-white py-4 px-6 sticky top-0 z-50 border-b border-police-800">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between">
        <Link to="/citizen/dashboard" className="flex items-center space-x-3">
          <Shield className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Suraksha Patrol</span>
        </Link>
        
        <div className="hidden lg:flex space-x-6 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-1 hover:text-primary transition-colors">
              <FileText className="h-4 w-4 mr-1" />
              <span>File Complaint</span>
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-police-900 border-police-700 text-white">
              <DropdownMenuItem className="hover:bg-police-800 focus:bg-police-800 cursor-pointer">
                <Link to="/citizen/complaint" className="flex w-full">
                  File New Complaint
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-police-800 focus:bg-police-800 cursor-pointer">
                <Link to="/citizen/complaint?type=evidence" className="flex w-full">
                  Upload Evidence
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-police-800 focus:bg-police-800 cursor-pointer">
                <Link to="/citizen/complaint?type=chat" className="flex w-full">
                  Chat with Rakshak
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Link to="/citizen/track" className="flex items-center space-x-1 hover:text-primary transition-colors">
            <Search className="h-4 w-4 mr-1" />
            <span>Track Complaint</span>
          </Link>
          
          <Link to="/citizen/safety-map" className="flex items-center space-x-1 hover:text-primary transition-colors">
            <MapPin className="h-4 w-4 mr-1" />
            <span>Safety Map</span>
          </Link>
          
          <Link to="/citizen/guidelines" className="flex items-center space-x-1 hover:text-primary transition-colors">
            <BookOpen className="h-4 w-4 mr-1" />
            <span>Guidelines</span>
          </Link>
          
          <Link to="/citizen/community" className="flex items-center space-x-1 hover:text-primary transition-colors">
            <Users className="h-4 w-4 mr-1" />
            <span>Community</span>
          </Link>
          
          <Link to="/citizen/gallery" className="flex items-center space-x-1 hover:text-primary transition-colors">
            <Image className="h-4 w-4 mr-1" />
            <span>Gallery</span>
          </Link>
          
          <Link to="/citizen/help" className="flex items-center space-x-1 hover:text-primary transition-colors">
            <HelpCircle className="h-4 w-4 mr-1" />
            <span>Help</span>
          </Link>
          
          <Link to="/" className="flex items-center space-x-1 ml-4 hover:text-alert transition-colors">
            <LogOut className="h-4 w-4 mr-1" />
            <span>Logout</span>
          </Link>
        </div>
        
        {/* Mobile menu button - would implement toggle functionality */}
        <button className="lg:hidden rounded-md p-2 bg-police-800 hover:bg-police-700">
          <span className="sr-only">Open menu</span>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

const AdminNavbar = () => {
  return (
    <nav className="bg-police-950/90 backdrop-blur-md text-white py-4 px-6 sticky top-0 z-50 border-b border-police-800">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between">
        <Link to="/admin/dashboard" className="flex items-center space-x-3">
          <Shield className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Admin Panel</span>
        </Link>
        
        <div className="hidden lg:flex space-x-6 items-center">
          <Link to="/admin/dashboard" className="flex items-center space-x-1 hover:text-primary transition-colors">
            <span>Dashboard</span>
          </Link>
          
          <Link to="/admin/complaints" className="flex items-center space-x-1 hover:text-primary transition-colors">
            <span>Complaints</span>
          </Link>
          
          <Link to="/admin/patrols" className="flex items-center space-x-1 hover:text-primary transition-colors">
            <span>Patrols</span>
          </Link>
          
          <Link to="/admin/heatmaps" className="flex items-center space-x-1 hover:text-primary transition-colors">
            <span>Heatmaps</span>
          </Link>
          
          <Link to="/admin/insights" className="flex items-center space-x-1 hover:text-primary transition-colors">
            <span>AI Insights</span>
          </Link>
          
          <Link to="/admin/evidence" className="flex items-center space-x-1 hover:text-primary transition-colors">
            <span>Evidence</span>
          </Link>
          
          <Link to="/" className="flex items-center space-x-1 ml-4 hover:text-alert transition-colors">
            <LogOut className="h-4 w-4 mr-1" />
            <span>Logout</span>
          </Link>
        </div>
        
        {/* Mobile menu button - would implement toggle functionality */}
        <button className="lg:hidden rounded-md p-2 bg-police-800 hover:bg-police-700">
          <span className="sr-only">Open menu</span>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

const Navbar: React.FC<NavbarProps> = ({ type }) => {
  return type === "citizen" ? <CitizenNavbar /> : <AdminNavbar />;
};

export default Navbar;
