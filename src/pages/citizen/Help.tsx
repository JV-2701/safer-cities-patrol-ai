
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, ChevronDown, ChevronUp, Phone, Mail, MessageSquare, FileText, Info, Shield, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import RakshakChat from "@/components/complaint/RakshakChat";

interface FaqItem {
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    question: "How do I file a complaint?",
    answer: "To file a complaint, navigate to the 'File a Complaint' page from the main menu. Fill in all the required fields including the type of complaint, location, and a detailed description. You can also attach evidence like photos or videos. Once completed, submit the form and you will receive a unique case ID for tracking."
  },
  {
    question: "How can I track my complaint status?",
    answer: "You can track the status of your complaint by going to the 'Track Complaint' page and entering your case ID. The system will show you the current status, assigned officer, and updates on your case. You'll also receive notifications when there are important updates."
  },
  {
    question: "What information should I include in my complaint?",
    answer: "Include as much detail as possible: date, time, and location of the incident, names of individuals involved (if known), description of what happened, any evidence like photos or videos, and if there were any witnesses. The more details you provide, the better we can assist you."
  },
  {
    question: "Is my complaint information secure?",
    answer: "Yes, all complaints are encrypted and secured with blockchain technology. Only authorized personnel can access your information. We take data privacy very seriously and comply with all relevant data protection regulations."
  },
  {
    question: "What happens after I file a complaint?",
    answer: "After filing, your complaint is reviewed and assigned to an officer. You'll receive updates as the investigation progresses. You can check the status anytime using your case ID. Depending on the nature of the complaint, you might be contacted for additional information."
  },
  {
    question: "Can I update my complaint after submission?",
    answer: "Once submitted, you cannot directly edit your complaint. However, you can add additional information or evidence by contacting the assigned officer or by visiting your local police station with your case ID."
  },
  {
    question: "How long does it take to process a complaint?",
    answer: "Processing time varies depending on the nature and complexity of the complaint. Minor complaints may be resolved in a few days, while more complex cases might take several weeks. You can always check the current status using the tracking system."
  }
];

const CitizenHelp = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const filteredFaqs = faqData.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent",
      description: "We've received your message and will respond shortly.",
    });
    // Reset form would go here in a real implementation
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-police-950 to-police-900 text-white">
      <Navbar type="citizen" />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <HelpCircle className="h-6 w-6 text-primary mr-3" />
          <h1 className="text-3xl font-bold">Help & Support</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-police-800/40 backdrop-blur-lg border-police-700 col-span-full md:col-span-2">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Info className="h-5 w-5 text-primary" />
                <CardTitle>Frequently Asked Questions</CardTitle>
              </div>
              <CardDescription className="text-gray-300">
                Find answers to common questions about using our services
              </CardDescription>
              <div className="mt-2">
                <Input
                  placeholder="Search FAQs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-police-800 border-police-700 text-white"
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, index) => (
                  <div key={index} className="border-b border-police-700 last:border-0 pb-4 last:pb-0">
                    <button
                      className="flex justify-between items-center w-full text-left py-2"
                      onClick={() => toggleFaq(index)}
                    >
                      <span className="font-medium">{faq.question}</span>
                      {expandedFaq === index ? (
                        <ChevronUp className="h-5 w-5 text-primary" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-primary" />
                      )}
                    </button>
                    {expandedFaq === index && (
                      <div className="mt-2 text-gray-300 text-sm">{faq.answer}</div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-400">No results match your search.</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <div className="space-y-6 col-span-full md:col-span-1">
            <Card className="bg-police-800/40 backdrop-blur-lg border-police-700">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Need immediate help?</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-police-700/50 p-3 rounded-lg">
                  <div className="flex items-center space-x-3 mb-2">
                    <Phone className="h-5 w-5 text-success" />
                    <div>
                      <p className="font-medium">Emergency Helpline</p>
                      <p className="text-success text-lg font-bold">112</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-300">For immediate emergencies requiring police assistance</p>
                </div>
                
                <div className="bg-primary/10 p-3 rounded-lg">
                  <div className="flex items-center space-x-3 mb-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Chat with Rakshak</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-300 mb-2">Our AI assistant can answer questions and guide you</p>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="default" size="sm" className="w-full">
                        Start Chat
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-full sm:w-[400px] bg-police-800 border-police-700 text-white">
                      <RakshakChat />
                    </SheetContent>
                  </Sheet>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-police-800/40 backdrop-blur-lg border-police-700">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Contact Support</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Your Name</label>
                    <Input className="bg-police-800 border-police-700 text-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input type="email" className="bg-police-800 border-police-700 text-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Message</label>
                    <textarea className="w-full bg-police-800 border-police-700 text-white rounded-md h-20 p-2" />
                  </div>
                  <Button type="submit" className="w-full">Send Message</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Card className="bg-police-800/40 backdrop-blur-lg border-police-700">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-primary" />
              <CardTitle>User Guides</CardTitle>
            </div>
            <CardDescription className="text-gray-300">
              Step-by-step guides to help you use our platform effectively
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-police-700 rounded-lg p-4 hover:bg-police-700/30 transition-colors">
              <h3 className="font-medium mb-2">Filing a Complaint</h3>
              <p className="text-sm text-gray-300 mb-3">
                Learn how to properly file a complaint with all necessary details and evidence.
              </p>
              <Button variant="outline" className="w-full bg-police-700 hover:bg-police-600 border-police-600">
                View Guide
              </Button>
            </div>
            <div className="border border-police-700 rounded-lg p-4 hover:bg-police-700/30 transition-colors">
              <h3 className="font-medium mb-2">Tracking Your Case</h3>
              <p className="text-sm text-gray-300 mb-3">
                How to track your complaint status and understand the various stages of processing.
              </p>
              <Button variant="outline" className="w-full bg-police-700 hover:bg-police-600 border-police-600">
                View Guide
              </Button>
            </div>
            <div className="border border-police-700 rounded-lg p-4 hover:bg-police-700/30 transition-colors">
              <h3 className="font-medium mb-2">Using the Safety Map</h3>
              <p className="text-sm text-gray-300 mb-3">
                Navigate the safety map to identify safe routes and areas with potential risks.
              </p>
              <Button variant="outline" className="w-full bg-police-700 hover:bg-police-600 border-police-600">
                View Guide
              </Button>
            </div>
            <div className="border border-police-700 rounded-lg p-4 hover:bg-police-700/30 transition-colors">
              <h3 className="font-medium mb-2">Community Features</h3>
              <p className="text-sm text-gray-300 mb-3">
                How to participate in community discussions and safety initiatives.
              </p>
              <Button variant="outline" className="w-full bg-police-700 hover:bg-police-600 border-police-600">
                View Guide
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CitizenHelp;
