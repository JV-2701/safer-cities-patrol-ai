
import React from "react";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Download, AlertTriangle, Phone, Shield, Calendar, Users } from "lucide-react";

const GuidelineCard: React.FC<{
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  downloadLink?: string;
}> = ({ title, icon, children, downloadLink }) => (
  <Card className="bg-police-800/40 backdrop-blur-lg border-police-700">
    <CardHeader className="pb-2">
      <CardTitle className="text-lg flex items-center">
        {icon}
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {children}
        {downloadLink && (
          <Button variant="outline" size="sm" className="mt-2 bg-police-700 hover:bg-police-600 border-police-600">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        )}
      </div>
    </CardContent>
  </Card>
);

const GuidelineItem: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => (
  <div>
    <h3 className="font-medium text-sm mb-2">{title}</h3>
    <div className="text-sm text-gray-300 space-y-2">
      {children}
    </div>
  </div>
);

const CitizenGuidelines = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-police-950 to-police-900 text-white">
      <Navbar type="citizen" />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <BookOpen className="h-6 w-6 text-primary mr-3" />
          <h1 className="text-3xl font-bold">Safety Guidelines</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <GuidelineCard
            title="Emergency Guidelines"
            icon={<AlertTriangle className="h-5 w-5 text-alert mr-2" />}
            downloadLink="#"
          >
            <GuidelineItem title="Important Emergency Numbers">
              <p className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-primary" />
                Police Control Room: <span className="font-medium ml-1">100</span>
              </p>
              <p className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-primary" />
                Fire Brigade: <span className="font-medium ml-1">101</span>
              </p>
              <p className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-primary" />
                Ambulance: <span className="font-medium ml-1">108</span>
              </p>
              <p className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-primary" />
                Women Helpline: <span className="font-medium ml-1">1091</span>
              </p>
            </GuidelineItem>
            
            <GuidelineItem title="During an Emergency">
              <p>• Stay calm and provide clear information to authorities</p>
              <p>• Share your exact location using the app's GPS feature</p>
              <p>• Move to a safe location if possible</p>
              <p>• Follow instructions from emergency services</p>
            </GuidelineItem>
          </GuidelineCard>
          
          <GuidelineCard
            title="Personal Safety"
            icon={<Shield className="h-5 w-5 text-primary mr-2" />}
            downloadLink="#"
          >
            <GuidelineItem title="When in Public Spaces">
              <p>• Be aware of your surroundings at all times</p>
              <p>• Keep valuables secure and out of sight</p>
              <p>• Avoid using mobile phones while walking alone</p>
              <p>• Stay in well-lit and populated areas at night</p>
              <p>• Share your location with trusted contacts when traveling</p>
            </GuidelineItem>
            
            <GuidelineItem title="Digital Safety">
              <p>• Use strong passwords for all accounts</p>
              <p>• Be careful of information shared on social media</p>
              <p>• Report suspicious online behavior through the app</p>
              <p>• Keep software and applications updated</p>
            </GuidelineItem>
          </GuidelineCard>
          
          <GuidelineCard
            title="Festival Safety"
            icon={<Calendar className="h-5 w-5 text-primary mr-2" />}
            downloadLink="#"
          >
            <GuidelineItem title="During Ganesh Festival">
              <p>• Follow designated routes for processions</p>
              <p>• Keep children supervised in crowded areas</p>
              <p>• Carry identification documents</p>
              <p>• Be cautious around water bodies during immersion</p>
            </GuidelineItem>
            
            <GuidelineItem title="During Diwali">
              <p>• Handle firecrackers with care and supervision</p>
              <p>• Keep emergency water and fire extinguishers ready</p>
              <p>• Set off fireworks in open, clear areas only</p>
              <p>• Dispose of used fireworks properly</p>
            </GuidelineItem>
          </GuidelineCard>
        </div>
        
        <Card className="bg-police-800/40 backdrop-blur-lg border-police-700 mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Crime Prevention Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h3 className="font-medium">Home Security</h3>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Install good quality locks on doors and windows
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Keep entries well-lit at night
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Don't share vacation plans on social media
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Consider installing security cameras
                  </li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Vehicle Security</h3>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Always lock your vehicle when parked
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Don't leave valuables visible inside
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Park in well-lit, busy areas when possible
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Install anti-theft devices
                  </li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Cybercrime Prevention</h3>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Don't share OTPs or banking details
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Verify sources before clicking links
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Use secure networks for financial transactions
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Enable two-factor authentication
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GuidelineCard
            title="Community Safety"
            icon={<Users className="h-5 w-5 text-primary mr-2" />}
            downloadLink="#"
          >
            <ul className="text-sm text-gray-300 space-y-2">
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                Form or join a neighborhood watch group through the Suraksha app
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                Report suspicious activities promptly
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                Keep community spaces clean and well-maintained
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                Organize safety awareness programs in your locality
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                Support vulnerable members of your community
              </li>
            </ul>
          </GuidelineCard>
          
          <Card className="bg-alert/10 backdrop-blur-lg border-alert/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <AlertTriangle className="h-5 w-5 text-alert mr-2" />
                High Alert Areas (Currently)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-3">
                <li className="p-2 bg-alert/10 rounded-lg">
                  <h4 className="font-medium text-alert-light">MG Road (10 PM - 2 AM)</h4>
                  <p className="text-gray-300 mt-1">Increased theft incidents reported. Avoid displaying valuables and stay vigilant.</p>
                </li>
                <li className="p-2 bg-alert/10 rounded-lg">
                  <h4 className="font-medium text-alert-light">Koregaon Park Parking Areas</h4>
                  <p className="text-gray-300 mt-1">Vehicle thefts reported. Use secured parking and anti-theft devices.</p>
                </li>
                <li className="p-2 bg-alert/10 rounded-lg">
                  <h4 className="font-medium text-alert-light">Sinhagad Road Construction Zone</h4>
                  <p className="text-gray-300 mt-1">Poor lighting and isolated areas. Avoid at night if possible.</p>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CitizenGuidelines;
