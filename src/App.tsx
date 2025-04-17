
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Citizen Pages
import CitizenLogin from "./pages/citizen/Login";
import CitizenRegister from "./pages/citizen/Register";
import CitizenDashboard from "./pages/citizen/Dashboard";
import CitizenComplaint from "./pages/citizen/Complaint";
import CitizenTrack from "./pages/citizen/Track";
import CitizenSafetyMap from "./pages/citizen/SafetyMap";
import CitizenGuidelines from "./pages/citizen/Guidelines";
import CitizenCommunity from "./pages/citizen/Community";
import CitizenGallery from "./pages/citizen/Gallery";

// Admin Pages
import AdminLogin from "./pages/admin/Login";
import AdminRegister from "./pages/admin/Register";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminComplaints from "./pages/admin/Complaints";
import AdminPatrols from "./pages/admin/Patrols";
import AdminHeatmaps from "./pages/admin/Heatmaps";
import AdminInsights from "./pages/admin/Insights";
import AdminEvidence from "./pages/admin/Evidence";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<Index />} />
          
          {/* Citizen Routes */}
          <Route path="/citizen/login" element={<CitizenLogin />} />
          <Route path="/citizen/register" element={<CitizenRegister />} />
          <Route path="/citizen/dashboard" element={<CitizenDashboard />} />
          <Route path="/citizen/complaint" element={<CitizenComplaint />} />
          <Route path="/citizen/track" element={<CitizenTrack />} />
          <Route path="/citizen/safety-map" element={<CitizenSafetyMap />} />
          <Route path="/citizen/guidelines" element={<CitizenGuidelines />} />
          <Route path="/citizen/community" element={<CitizenCommunity />} />
          <Route path="/citizen/gallery" element={<CitizenGallery />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/complaints" element={<AdminComplaints />} />
          <Route path="/admin/patrols" element={<AdminPatrols />} />
          <Route path="/admin/heatmaps" element={<AdminHeatmaps />} />
          <Route path="/admin/insights" element={<AdminInsights />} />
          <Route path="/admin/evidence" element={<AdminEvidence />} />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
