
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Image, MapPin, Calendar, ArrowLeft, ArrowRight, Filter, Maximize } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock gallery data
const galleryItems = [
  {
    id: 1,
    type: "surveillance",
    title: "MG Road Night Patrol",
    image: "https://images.unsplash.com/photo-1617440168937-c6497a7b8721?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cG9saWNlJTIwcGF0cm9sfGVufDB8fDB8fHww",
    date: "15 Apr 2025",
    location: "MG Road, Pune",
    description: "Surveillance footage showing increased police presence on MG Road during night hours"
  },
  {
    id: 2,
    type: "patrol",
    title: "Riverside Patrol Team",
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9saWNlJTIwcGF0cm9sfGVufDB8fDB8fHww",
    date: "14 Apr 2025",
    location: "Mula River, Aundh",
    description: "Patrol team ensuring safety along the riverside walkway"
  },
  {
    id: 3,
    type: "surveillance",
    title: "Traffic Junction Monitoring",
    image: "https://images.unsplash.com/photo-1591375439420-ee29c7397539?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHRyYWZmaWMlMjBtb25pdG9yaW5nfGVufDB8fDB8fHww",
    date: "13 Apr 2025",
    location: "University Circle, Pune",
    description: "AI-enhanced traffic monitoring system at University junction"
  },
  {
    id: 4,
    type: "patrol",
    title: "Festival Security Operation",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9saWNlfGVufDB8fDB8fHww",
    date: "12 Apr 2025",
    location: "Shivajinagar, Pune",
    description: "Police team deployed during the annual cultural festival"
  },
  {
    id: 5,
    type: "surveillance",
    title: "Market Area Surveillance",
    image: "https://images.unsplash.com/photo-1582112188907-507eee9e443c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHNlY3VyaXR5JTIwY2FtZXJhfGVufDB8fDB8fHww",
    date: "10 Apr 2025",
    location: "Mandai Market, Pune",
    description: "Advanced surveillance systems monitoring the main market area"
  },
  {
    id: 6,
    type: "patrol",
    title: "Bicycle Patrol Unit",
    image: "https://images.unsplash.com/photo-1603739421258-4aa79ad860df?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fHBvbGljZXxlbnwwfHwwfHx8MA%3D%3D",
    date: "09 Apr 2025",
    location: "Koregaon Park, Pune",
    description: "Eco-friendly bicycle patrol units monitoring the park area"
  }
];

const CitizenGallery = () => {
  const [filter, setFilter] = useState("all");
  const [selectedImage, setSelectedImage] = useState<typeof galleryItems[0] | null>(null);
  
  const filteredGallery = filter === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.type === filter);

  return (
    <div className="min-h-screen bg-gradient-to-b from-police-950 to-police-900 text-white">
      <Navbar type="citizen" />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Image className="h-6 w-6 text-primary mr-3" />
          <h1 className="text-3xl font-bold">Gallery</h1>
        </div>
        
        {/* Filters */}
        <Card className="bg-police-800/40 backdrop-blur-lg border-police-700 mb-8">
          <CardContent className="py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-2 text-gray-400" />
                <span className="text-sm mr-3">Filter:</span>
              </div>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="bg-police-800 border-police-700 text-white w-40">
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent className="bg-police-800 border-police-700 text-white">
                  <SelectItem value="all">All Images</SelectItem>
                  <SelectItem value="surveillance">Surveillance</SelectItem>
                  <SelectItem value="patrol">Patrol Teams</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-gray-400">
                Showing {filteredGallery.length} items
              </span>
            </div>
          </CardContent>
        </Card>
        
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredGallery.map(item => (
            <Card 
              key={item.id} 
              className="bg-police-800/40 backdrop-blur-lg border-police-700 overflow-hidden hover:border-primary/50 transition-colors cursor-pointer"
              onClick={() => setSelectedImage(item)}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-police-950 to-transparent opacity-60"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h3 className="font-medium text-white">{item.title}</h3>
                  <div className="flex items-center space-x-3 mt-1">
                    <div className="flex items-center text-xs text-gray-300">
                      <MapPin className="h-3 w-3 mr-1" />
                      {item.location}
                    </div>
                    <div className="flex items-center text-xs text-gray-300">
                      <Calendar className="h-3 w-3 mr-1" />
                      {item.date}
                    </div>
                  </div>
                </div>
                <div className="absolute top-2 right-2">
                  <span className={`
                    text-xs px-2 py-1 rounded-full 
                    ${item.type === 'surveillance' 
                      ? 'bg-blue-500/70 text-white' 
                      : 'bg-green-500/70 text-white'
                    }
                  `}>
                    {item.type === 'surveillance' ? 'Surveillance' : 'Patrol'}
                  </span>
                </div>
              </div>
              <CardContent className="py-3">
                <p className="text-sm text-gray-300 line-clamp-2">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Pagination */}
        <div className="flex justify-center">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" className="bg-police-800 border-police-700 h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="bg-primary border-primary h-8 w-8">1</Button>
            <Button variant="outline" className="bg-police-800 border-police-700 h-8 w-8">2</Button>
            <Button variant="outline" className="bg-police-800 border-police-700 h-8 w-8">3</Button>
            <span className="text-gray-400">...</span>
            <Button variant="outline" className="bg-police-800 border-police-700 h-8 w-8">8</Button>
            <Button variant="outline" size="icon" className="bg-police-800 border-police-700 h-8 w-8">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Image Lightbox */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl">
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 z-10"
                onClick={() => setSelectedImage(null)}
              >
                ✕
              </Button>
              
              <div className="relative">
                <img 
                  src={selectedImage.image} 
                  alt={selectedImage.title}
                  className="w-full max-h-[80vh] object-contain rounded-lg"
                />
              </div>
              
              <div className="mt-4 bg-police-800/90 p-4 rounded-lg">
                <h2 className="text-xl font-medium mb-2">{selectedImage.title}</h2>
                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center text-sm text-gray-300">
                    <MapPin className="h-4 w-4 mr-1" />
                    {selectedImage.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <Calendar className="h-4 w-4 mr-1" />
                    {selectedImage.date}
                  </div>
                </div>
                <p className="text-gray-200">{selectedImage.description}</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CitizenGallery;
