import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, ImageIcon, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Gallery = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("staff");

  // Placeholder staff members
  const staffMembers = [
    { 
      id: 1, 
      name: "John Doe", 
      role: "Executive Director", 
      bio: "Leading with vision and passion for community development, John has dedicated over 15 years to empowering vulnerable communities.",
      image: "/placeholder.svg" 
    },
    { 
      id: 2, 
      name: "Jane Smith", 
      role: "Program Manager", 
      bio: "Dedicated to creating impactful programs that transform lives, Jane brings innovative approaches to youth development.",
      image: "/placeholder.svg" 
    },
    { 
      id: 3, 
      name: "Mike Johnson", 
      role: "Field Coordinator", 
      bio: "Bringing programs to life in communities across South Africa, Mike ensures our initiatives reach those who need them most.",
      image: "/placeholder.svg" 
    },
    { 
      id: 4, 
      name: "Sarah Williams", 
      role: "Communications Lead", 
      bio: "Telling the stories that matter and amplifying community voices, Sarah connects our mission with the world.",
      image: "/placeholder.svg" 
    },
    { 
      id: 5, 
      name: "David Brown", 
      role: "Finance Manager", 
      bio: "Ensuring resources are used effectively for maximum impact, David maintains transparency and accountability.",
      image: "/placeholder.svg" 
    },
    { 
      id: 6, 
      name: "Emily Davis", 
      role: "Training Specialist", 
      bio: "Empowering youth with skills for a brighter future, Emily designs programs that unlock potential.",
      image: "/placeholder.svg" 
    },
  ];

  // Placeholder program images
  const programImages = [
    { id: 1, title: "Health Program", category: "Healthcare", image: "/placeholder.svg" },
    { id: 2, title: "Education Initiative", category: "Education", image: "/placeholder.svg" },
    { id: 3, title: "Community Outreach", category: "Community", image: "/placeholder.svg" },
    { id: 4, title: "Youth Development", category: "Youth", image: "/placeholder.svg" },
    { id: 5, title: "Skills Training", category: "Training", image: "/placeholder.svg" },
    { id: 6, title: "Agricultural Support", category: "Agriculture", image: "/placeholder.svg" },
  ];

  // Placeholder event images
  const eventImages = [
    { id: 1, title: "Annual Gala 2024", date: "March 2024", image: "/placeholder.svg" },
    { id: 2, title: "Community Workshop", date: "April 2024", image: "/placeholder.svg" },
    { id: 3, title: "Fundraising Event", date: "May 2024", image: "/placeholder.svg" },
    { id: 4, title: "Youth Conference", date: "June 2024", image: "/placeholder.svg" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4 text-primary-foreground hover:bg-primary-light/20"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <h1 className="text-4xl font-bold mb-4">Image Gallery</h1>
          <p className="text-lg opacity-90">
            Explore our team, programs, and events through images
          </p>
        </div>
      </div>

      {/* Gallery Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="staff" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Staff Team
            </TabsTrigger>
            <TabsTrigger value="board" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Board
            </TabsTrigger>
            <TabsTrigger value="programs" className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              Programs
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Events
            </TabsTrigger>
          </TabsList>

          {/* Staff Gallery */}
          <TabsContent value="staff" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Our Team</CardTitle>
                <CardDescription>
                  Meet the dedicated professionals making a difference
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {staffMembers.map((member) => (
                    <Card key={member.id} className="overflow-hidden hover:shadow-medium transition-shadow group">
                      <div className="aspect-square bg-muted relative overflow-hidden">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-3">
                        <h3 className="font-semibold text-sm">{member.name}</h3>
                        <p className="text-xs text-muted-foreground">{member.role}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Board Gallery */}
          <TabsContent value="board" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Our Board</CardTitle>
                <CardDescription>
                  Meet the dedicated board members guiding our mission
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {staffMembers.map((member) => (
                    <Card key={member.id} className="overflow-hidden hover:shadow-medium transition-shadow group">
                      <div className="aspect-square bg-muted relative overflow-hidden">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-3">
                        <h3 className="font-semibold text-sm">{member.name}</h3>
                        <p className="text-xs text-muted-foreground">Board Member</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Programs Gallery */}
          <TabsContent value="programs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Program Gallery</CardTitle>
                <CardDescription>
                  Visual highlights from our various programs and initiatives
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {programImages.map((program) => (
                    <Card key={program.id} className="overflow-hidden hover:shadow-medium transition-shadow group">
                      <div className="aspect-video bg-muted relative overflow-hidden">
                        <img
                          src={program.image}
                          alt={program.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2">
                          <span className="bg-accent text-accent-foreground px-2 py-0.5 rounded-full text-xs font-medium">
                            {program.category}
                          </span>
                        </div>
                      </div>
                      <CardContent className="p-3">
                        <h3 className="font-semibold text-sm">{program.title}</h3>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Events Gallery */}
          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Events & Activities</CardTitle>
                <CardDescription>
                  Memorable moments from our events and community activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {eventImages.map((event) => (
                    <Card key={event.id} className="overflow-hidden hover:shadow-medium transition-shadow group">
                      <div className="aspect-video bg-muted relative overflow-hidden">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="p-3">
                        <h3 className="font-semibold text-sm">{event.title}</h3>
                        <p className="text-xs text-muted-foreground">{event.date}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Gallery;
