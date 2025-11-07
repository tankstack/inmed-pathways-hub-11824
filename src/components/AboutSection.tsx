import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { ArrowRight, Target, Heart, Users, Shield, Lightbulb, Zap, MapPin, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AboutSection = () => {
  const navigate = useNavigate();
  
  const values = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Empowerment",
      description: "Equip. Enable. Elevate.",
      color: "text-accent"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Collaboration",
      description: "Partner. Share. Build.",
      color: "text-secondary"
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Innovation",
      description: "Create. Adapt. Advance.",
      color: "text-primary"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Integrity",
      description: "Honest. Transparent. Fair.",
      color: "text-success"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Inclusion",
      description: "Listen. Value. Respect.",
      color: "text-accent"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Resilience",
      description: "Recover. Adapt. Thrive.",
      color: "text-secondary"
    }
  ];

  const staffMembers = [
    { 
      id: 1,
      name: "John Doe", 
      role: "Executive Director",
      bio: "Leading with vision and passion for community development, John has dedicated over 15 years to empowering vulnerable communities."
    },
    { 
      id: 2,
      name: "Jane Smith", 
      role: "Program Manager",
      bio: "Dedicated to creating impactful programs that transform lives, Jane brings innovative approaches to youth development."
    },
    { 
      id: 3,
      name: "Mike Johnson", 
      role: "Field Coordinator",
      bio: "Bringing programs to life in communities across South Africa, Mike ensures our initiatives reach those who need them most."
    },
    { 
      id: 4,
      name: "Sarah Williams", 
      role: "Communications Lead",
      bio: "Telling the stories that matter and amplifying community voices, Sarah connects our mission with the world."
    },
    { 
      id: 5,
      name: "David Brown", 
      role: "Finance Manager",
      bio: "Ensuring resources are used effectively for maximum impact, David maintains transparency and accountability."
    },
    { 
      id: 6,
      name: "Emily Davis", 
      role: "Training Specialist",
      bio: "Empowering youth with skills for a brighter future, Emily designs programs that unlock potential."
    }
  ];

  const teamMembers = [
    { id: 1, name: "Alice Thompson" },
    { id: 2, name: "Robert Miller" },
    { id: 3, name: "Lisa Anderson" },
    { id: 4, name: "James Wilson" }
  ];

  return (
    <div id="about" className="py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About INMED South Africa
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto mb-8"></div>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <Card className="p-8 shadow-medium">
            <h4 className="text-2xl font-bold text-primary mb-4">Our Vision</h4>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A future where every child, family, and community thrives in health, 
              dignity, and self-reliance.
            </p>
          </Card>

          <Card className="p-8 shadow-medium">
            <h4 className="text-2xl font-bold text-secondary mb-4">Our Mission</h4>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Building pathways that empower vulnerable children, families, and 
              communities to achieve lasting well-being and self-reliance.
            </p>
          </Card>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-foreground text-center mb-12">Our Core Values</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="p-6 text-center shadow-medium hover:shadow-strong transition-all duration-300 group">
                <div className={`flex justify-center mb-4 ${value.color} group-hover:scale-110 transition-transform duration-300`}>
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold text-foreground mb-2">{value.title}</h4>
                <p className="text-muted-foreground font-medium">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Board Gallery */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-foreground text-center mb-12">Our Board</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {staffMembers.map((staff) => (
              <HoverCard key={staff.id}>
                <HoverCardTrigger>
                  <div className="cursor-pointer group">
                    <div className="aspect-square bg-muted rounded-lg mb-3 flex items-center justify-center group-hover:ring-2 group-hover:ring-primary transition-all">
                      <Users className="w-12 h-12 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-semibold text-center text-foreground">{staff.name}</p>
                    <p className="text-xs text-muted-foreground text-center">{staff.role}</p>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">{staff.name}</h4>
                    <p className="text-sm text-muted-foreground">{staff.role}</p>
                    <p className="text-sm text-foreground italic">"{staff.bio}"</p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" onClick={() => navigate('/gallery')}>
              View Full Board Gallery
            </Button>
          </div>
        </div>

        {/* Our Team */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-foreground text-center mb-12">Our Team</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.id} className="p-6 text-center shadow-medium hover:shadow-strong transition-all duration-300">
                <div className="bg-muted rounded-full w-32 h-32 mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-16 h-16 text-muted-foreground" />
                </div>
                <h4 className="text-lg font-bold text-foreground">{member.name}</h4>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" onClick={() => navigate('/gallery')}>
              View Team
            </Button>
          </div>
        </div>

        {/* Where We Work */}
        <Card className="p-8 mb-16 shadow-medium">
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">Where We Work</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold text-foreground mb-4">Provinces & Communities</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">Eastern Cape - Rural communities and schools</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">Western Cape - Urban and peri-urban areas</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">Limpopo - Agricultural communities</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">KwaZulu-Natal - Coastal and rural regions</span>
                </li>
              </ul>
            </div>
            <div className="bg-muted rounded-lg aspect-square flex items-center justify-center overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3586.1!2d27.8!3d-26.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDQyJzAwLjAiUyAyN8KwNDgnMDAuMCJF!5e0!3m2!1sen!2sza!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Coverage Areas and Project Locations"
              />
            </div>
          </div>
        </Card>

        {/* Postcard to Our Future */}
        <Card className="p-8 mb-16 shadow-medium bg-gradient-to-br from-accent/5 to-accent/10 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h3 className="text-2xl font-bold text-foreground">Postcard to Our Future</h3>
            <Badge variant="secondary" className="text-xs">Coming Soon</Badge>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A vision of what we aspire to achieve — content to be developed.
          </p>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button variant="secondary" size="lg" className="group">
            <FileText className="w-5 h-5 mr-2" />
            Download Annual Report
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;