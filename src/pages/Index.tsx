
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, User, UserCog } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-police-950 to-police-900 text-white">
      <div className="hero-section relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background overlay with city skyline silhouette */}
        <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2l0eSUyMG5pZ2h0fGVufDB8fDB8fHww')] bg-cover bg-center"></div>
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-police-950/80 via-police-950/70 to-police-950/90"></div>
        
        {/* Content */}
        <div className="relative z-20 container px-6 md:px-12 mx-auto text-center">
          <div className="flex justify-center mb-8">
            <Shield className="h-20 w-20 text-primary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-primary/80">
            Suraksha Patrol
          </h1>
          <h2 className="text-2xl md:text-4xl font-bold mb-6 text-white/90">
            AI-Powered Policing for Safer Cities
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Predictive analytics. Real-time crime mapping. Community engagement.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Link to="/citizen/login">
              <Button className="w-full h-16 text-lg gap-3 bg-primary/90 hover:bg-primary">
                <User className="h-6 w-6" />
                I am a Citizen
              </Button>
            </Link>
            
            <Link to="/admin/login">
              <Button variant="outline" className="w-full h-16 text-lg gap-3 border-2 border-primary/40 hover:border-primary bg-white/5 hover:bg-white/10">
                <UserCog className="h-6 w-6" />
                I am a Police Admin
              </Button>
            </Link>
          </div>
          
          <div className="mt-16 space-y-2 text-sm text-gray-400">
            <p>Protecting Pune and Pimpri-Chinchwad with next-generation technology</p>
            <p>© 2025 Suraksha Patrol | Powered by AI</p>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute bottom-8 left-8 z-10 hidden md:block">
          <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
            <span>AI System Active</span>
          </div>
        </div>
        
        <div className="absolute top-8 right-8 z-10 hidden md:block">
          <div className="bg-police-800/40 backdrop-blur-sm rounded-lg p-3 text-sm text-center">
            <p className="text-xs text-gray-400 mb-1">Emergency Hotline</p>
            <p className="font-semibold text-xl">100</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
