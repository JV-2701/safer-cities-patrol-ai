
import React from "react";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  MessageCircle, 
  AlertTriangle, 
  UserCircle, 
  Shield, 
  Calendar, 
  ThumbsUp,
  MessageSquare,
  Send,
  Eye,
  EyeOff
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CitizenCommunity = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-police-950 to-police-900 text-white">
      <Navbar type="citizen" />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Users className="h-6 w-6 text-primary mr-3" />
          <h1 className="text-3xl font-bold">Community</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Ward Selection */}
            <Card className="bg-police-800/40 backdrop-blur-lg border-police-700">
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Select Your Ward/Zone</label>
                  <Select defaultValue="kothrud">
                    <SelectTrigger className="bg-police-800 border-police-700 text-white">
                      <SelectValue placeholder="Select ward" />
                    </SelectTrigger>
                    <SelectContent className="bg-police-800 border-police-700 text-white">
                      <SelectItem value="kothrud">Kothrud</SelectItem>
                      <SelectItem value="aundh">Aundh</SelectItem>
                      <SelectItem value="shivajinagar">Shivajinagar</SelectItem>
                      <SelectItem value="hadapsar">Hadapsar</SelectItem>
                      <SelectItem value="kharadi">Kharadi</SelectItem>
                      <SelectItem value="pcmc">Pimpri-Chinchwad</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
            
            {/* Announcements */}
            <Card className="bg-police-800/40 backdrop-blur-lg border-police-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Shield className="h-5 w-5 text-primary mr-2" />
                  Official Announcements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-police-700/50 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium">ACP Pune East</h3>
                        <span className="text-xs bg-primary/20 text-primary-foreground px-2 py-0.5 rounded">Official</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-0.5 mb-2">
                        <Calendar className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-400">15 Apr 2025 • 10:15 AM</span>
                      </div>
                      <p className="text-sm text-gray-300">
                        Due to the cultural festival on 18th April, traffic diversions will be in place around Shivaji Nagar from 4 PM to 11 PM. Please plan your travel accordingly and use alternative routes.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-alert/10 border border-alert/30 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-alert flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium">Kothrud Police Station</h3>
                        <span className="text-xs bg-alert/20 text-alert-light px-2 py-0.5 rounded">Alert</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-0.5 mb-2">
                        <Calendar className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-400">14 Apr 2025 • 18:30 PM</span>
                      </div>
                      <p className="text-sm text-gray-300">
                        Be vigilant of individuals posing as bank officials asking for OTP or card details. Several fraud cases have been reported in the area. Banks never ask for such information.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Community Forum */}
            <Card className="bg-police-800/40 backdrop-blur-lg border-police-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <MessageCircle className="h-5 w-5 text-primary mr-2" />
                  Kothrud Community Forum
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Post 1 */}
                <div className="p-4 bg-police-700/50 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <UserCircle className="h-8 w-8 text-gray-400 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Rajesh Sharma</h3>
                          <div className="flex items-center space-x-2 mt-0.5">
                            <Calendar className="h-3 w-3 text-gray-400" />
                            <span className="text-xs text-gray-400">14 Apr 2025 • 16:45 PM</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <p className="text-sm text-gray-200 mt-2">
                        Has anyone noticed the streetlights not working on Paud Road near Kinara Hotel? It's been dark for the past three nights, making it unsafe to walk.
                      </p>
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-2">
                          <ThumbsUp className="h-3.5 w-3.5 text-gray-400" />
                          <span className="text-xs text-gray-400">12 likes</span>
                          <MessageSquare className="h-3.5 w-3.5 text-gray-400 ml-2" />
                          <span className="text-xs text-gray-400">4 replies</span>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 text-xs">Reply</Button>
                      </div>
                      
                      {/* Replies */}
                      <div className="mt-4 pl-4 border-l border-police-600 space-y-3">
                        <div className="flex items-start space-x-2">
                          <UserCircle className="h-6 w-6 text-gray-400 flex-shrink-0" />
                          <div>
                            <div className="flex items-center space-x-2">
                              <h4 className="text-sm font-medium">Priya Joshi</h4>
                              <span className="text-xs text-gray-400">13h ago</span>
                            </div>
                            <p className="text-sm text-gray-300 mt-1">
                              Yes, I noticed it too. I've called the municipal helpline and they said they'll look into it.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-2">
                          <Shield className="h-6 w-6 text-primary flex-shrink-0" />
                          <div>
                            <div className="flex items-center space-x-2">
                              <h4 className="text-sm font-medium">Inspector Patil</h4>
                              <span className="text-xs bg-primary/20 text-primary-foreground px-2 py-0.5 rounded">Police</span>
                            </div>
                            <p className="text-sm text-gray-300 mt-1">
                              Thank you for reporting. We've notified the electrical department. Meanwhile, we've increased patrolling in that area.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Post 2 */}
                <div className="p-4 bg-police-700/50 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <UserCircle className="h-8 w-8 text-gray-400 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Anita Desai</h3>
                          <div className="flex items-center space-x-2 mt-0.5">
                            <Calendar className="h-3 w-3 text-gray-400" />
                            <span className="text-xs text-gray-400">13 Apr 2025 • 09:12 AM</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <p className="text-sm text-gray-200 mt-2">
                        Organizing a neighborhood cleanup drive this Sunday at Kothrud IT Park. Join us from 7-9 AM. Gloves and bags will be provided. Let's make our area cleaner and safer!
                      </p>
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-2">
                          <ThumbsUp className="h-3.5 w-3.5 text-gray-400" />
                          <span className="text-xs text-gray-400">28 likes</span>
                          <MessageSquare className="h-3.5 w-3.5 text-gray-400 ml-2" />
                          <span className="text-xs text-gray-400">6 replies</span>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 text-xs">Reply</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="w-full space-y-4">
                  <Textarea 
                    placeholder="Share your thoughts with the community..." 
                    className="bg-police-800 border-police-700 text-white resize-none"
                  />
                  <div className="flex justify-between">
                    <Button variant="outline" size="sm" className="bg-police-700 hover:bg-police-600 border-police-600">
                      <EyeOff className="h-4 w-4 mr-2" />
                      Post Anonymously
                    </Button>
                    <Button>
                      <Send className="h-4 w-4 mr-2" />
                      Post
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
          
          <div className="space-y-6">
            {/* Anonymous Tip Form */}
            <Card className="bg-police-800/40 backdrop-blur-lg border-police-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <EyeOff className="h-5 w-5 text-primary mr-2" />
                  Anonymous Tip
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Tip Category</label>
                    <Select>
                      <SelectTrigger className="bg-police-800 border-police-700 text-white">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-police-800 border-police-700 text-white">
                        <SelectItem value="suspicious">Suspicious Activity</SelectItem>
                        <SelectItem value="drug">Drug Related</SelectItem>
                        <SelectItem value="corruption">Corruption</SelectItem>
                        <SelectItem value="traffic">Traffic Violation</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Location</label>
                    <Input 
                      placeholder="Enter location" 
                      className="bg-police-800 border-police-700 text-white" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Your Tip</label>
                    <Textarea 
                      placeholder="Provide details of your tip..." 
                      className="bg-police-800 border-police-700 text-white resize-none"
                      rows={5}
                    />
                  </div>
                  
                  <Button className="w-full">
                    Submit Anonymous Tip
                  </Button>
                  
                  <p className="text-xs text-gray-400 text-center">
                    Your identity will remain confidential. All submissions are encrypted.
                  </p>
                </form>
              </CardContent>
            </Card>
            
            {/* Talk to Beat Officer */}
            <Card className="bg-police-800/40 backdrop-blur-lg border-police-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Shield className="h-5 w-5 text-primary mr-2" />
                  Talk to Beat Officer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-police-700/50 rounded-lg">
                  <Shield className="h-10 w-10 text-primary bg-police-800 p-2 rounded-full" />
                  <div>
                    <h3 className="font-medium">Inspector Sunil Patil</h3>
                    <p className="text-sm text-gray-300">Kothrud Beat Officer</p>
                  </div>
                </div>
                
                <div className="text-sm text-gray-300">
                  <p>Available for chat between 9 AM - 5 PM on weekdays</p>
                  <p className="mt-1">Current status: <span className="text-green-400">Online</span></p>
                </div>
                
                <Button className="w-full">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Start Chat
                </Button>
              </CardContent>
            </Card>
            
            {/* Community Stats */}
            <Card className="bg-police-800/40 backdrop-blur-lg border-police-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Kothrud Community Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Members</span>
                  <span className="font-medium">2,456</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Active Now</span>
                  <span className="font-medium">124</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Topics This Week</span>
                  <span className="font-medium">38</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Officer Response Rate</span>
                  <span className="font-medium text-green-400">92%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CitizenCommunity;
