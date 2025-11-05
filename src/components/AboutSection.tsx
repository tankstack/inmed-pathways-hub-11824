import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Leaf, Apple, Heart, Sprout, Briefcase, Rocket, Users, Target, Quote, ImageIcon } from "lucide-react";

const AboutSection = () => {
  const pillars = [
    {
      id: "pillar1",
      icon: <Leaf className="w-12 h-12" />,
      title: "Adaptive Agriculture for Resilience",
      shortDesc: "Building sustainable food systems through innovative farming practices. Content to be developed by NBCC after interview with INMED.",
      color: "from-primary/5 to-primary/10",
      iconColor: "text-primary",
      sections: [
        { title: "Community Projects", content: "Content placeholder - to be developed by NBCC." },
        { title: "Capacity Building (School Gardens)", content: "Content placeholder - to be developed by NBCC." },
        { title: "Quotes from Funders", content: "Content placeholder - to be developed by NBCC." }
      ]
    },
    {
      id: "pillar2",
      icon: <Apple className="w-12 h-12" />,
      title: "Nutrition & Healthy Lifestyles",
      shortDesc: "Promoting wellness and nutrition education for healthier communities. Content to be developed by NBCC after interview with INMED.",
      color: "from-secondary/5 to-secondary/10",
      iconColor: "text-secondary",
      sections: [
        { title: "Health in Action", content: "Content placeholder - to be developed by NBCC." },
        { title: "School Community Nutrition Support", content: "Content placeholder - to be developed by NBCC." },
        { title: "Chronic Illness Prevention", content: "Content placeholder - to be developed by NBCC." }
      ]
    },
    {
      id: "pillar3",
      icon: <Sprout className="w-12 h-12" />,
      title: "Climate-Smart Livelihoods",
      shortDesc: "Empowering communities to adapt and thrive in changing climates. Content to be developed by NBCC after interview with INMED.",
      color: "from-accent/5 to-accent/10",
      iconColor: "text-accent",
      sections: [
        { title: "Climate Adaptations", content: "Content placeholder - to be developed by NBCC." },
        { title: "Women/Youth Empowerment", content: "Content placeholder - to be developed by NBCC." }
      ]
    },
    {
      id: "pillar4",
      icon: <Briefcase className="w-12 h-12" />,
      title: "Employment Creation",
      shortDesc: "Creating sustainable job opportunities and economic empowerment. Content to be developed by NBCC after interview with INMED.",
      color: "from-primary/5 to-primary/10",
      iconColor: "text-primary",
      sections: [
        { title: "Social Employment", content: "Content placeholder - to be developed by NBCC." }
      ]
    },
    {
      id: "pillar5",
      icon: <Rocket className="w-12 h-12" />,
      title: "Social Entrepreneurship",
      shortDesc: "Fostering innovation and sustainable business solutions. Content to be developed by NBCC after interview with INMED.",
      color: "from-secondary/5 to-secondary/10",
      iconColor: "text-secondary",
      sections: [
        { title: "INMED Aquaponics Social Enterprises", content: "Content placeholder - to be developed by NBCC." }
      ]
    }
  ];

  return (
    <div id="about" className="py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About INMED
          </h1>
          <div className="w-24 h-1 bg-gradient-warm mx-auto mb-8"></div>
        </div>

        {/* Section 1: About INMED Intro */}
        <Card className="p-8 md:p-12 mb-16 shadow-medium bg-gradient-to-br from-background to-secondary/5 animate-fade-in">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">Who We Are</h2>
            <div className="w-24 h-1 bg-gradient-secondary mx-auto mb-8"></div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Overview of the work and the pillars/areas of focus. Content to be developed by NBCC after interview with INMED.
            </p>
          </div>
        </Card>

        {/* Section 2: Program Pillars Overview */}
        <div className="mb-16">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Program Pillars</h2>
            <div className="w-24 h-1 bg-gradient-warm mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Five key areas of focus driving sustainable change in communities across Southern Africa.
            </p>
          </div>

          <div className="space-y-8">
            {pillars.map((pillar, index) => (
              <Card 
                key={pillar.id} 
                className={`overflow-hidden shadow-medium hover:shadow-strong transition-all duration-300 animate-fade-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`bg-gradient-to-br ${pillar.color} p-8`}>
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Text Content */}
                    <div className="space-y-4">
                      <div className={`${pillar.iconColor} mb-4`}>
                        {pillar.icon}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                        {pillar.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {pillar.shortDesc}
                      </p>
                      
                      {/* Buttons */}
                      <div className="flex flex-wrap gap-3 pt-4">
                        <Button variant="secondary" className="group">
                          Read More
                        </Button>
                        <Button variant="outline" className="group">
                          <ImageIcon className="w-4 h-4 mr-2" />
                          View Gallery
                        </Button>
                      </div>
                    </div>

                    {/* Image Placeholder */}
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center hover-scale transition-all duration-300 cursor-pointer">
                      <div className="text-center p-6">
                        <ImageIcon className="w-16 h-16 text-muted-foreground mx-auto mb-3" />
                        <p className="text-muted-foreground font-semibold">Project Image Placeholder</p>
                        <p className="text-sm text-muted-foreground/70 mt-2">Landscape format recommended</p>
                      </div>
                    </div>
                  </div>

                  {/* Expandable Content */}
                  <div className="mt-8">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="details" className="border-border/50">
                        <AccordionTrigger className="text-foreground font-semibold hover:text-primary">
                          View Full Details
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-6 pt-4">
                            {/* Intro */}
                            <div>
                              <h4 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                                <Target className="w-5 h-5 text-primary" />
                                Introduction
                              </h4>
                              <p className="text-muted-foreground">
                                Content placeholder - to be developed by NBCC.
                              </p>
                            </div>

                            {/* Goals */}
                            <div>
                              <h4 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                                <Target className="w-5 h-5 text-secondary" />
                                Goals
                              </h4>
                              <p className="text-muted-foreground">
                                Content placeholder - to be developed by NBCC.
                              </p>
                            </div>

                            {/* Key Activities */}
                            <div>
                              <h4 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                                <Heart className="w-5 h-5 text-accent" />
                                Key Activities
                              </h4>
                              <p className="text-muted-foreground">
                                Content placeholder - to be developed by NBCC.
                              </p>
                            </div>

                            {/* Dynamic Sections */}
                            {pillar.sections.map((section, idx) => (
                              <div key={idx}>
                                <h4 className="text-lg font-semibold text-foreground mb-2">
                                  {section.title}
                                </h4>
                                <p className="text-muted-foreground">{section.content}</p>
                              </div>
                            ))}

                            {/* Impact Stories */}
                            <div className="bg-background/50 rounded-lg p-6">
                              <h4 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                                <Quote className="w-5 h-5 text-primary" />
                                Impact Stories
                              </h4>
                              <p className="text-muted-foreground italic">
                                "Quotes from beneficiaries - Content to be developed by NBCC."
                              </p>
                            </div>

                            {/* Partners */}
                            <div className="bg-background/50 rounded-lg p-6">
                              <h4 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                                <Users className="w-5 h-5 text-secondary" />
                                Partners
                              </h4>
                              <p className="text-muted-foreground italic">
                                "Quotes from partners - Content to be developed by NBCC."
                              </p>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Section 3: Postcard to Our Future */}
        <Card className="p-8 md:p-12 shadow-medium bg-gradient-to-br from-accent/5 to-primary/5 text-center animate-fade-in">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <h2 className="text-3xl font-bold text-foreground">Postcard to Our Future</h2>
              <Badge variant="secondary" className="text-sm">Coming Soon</Badge>
            </div>
            <div className="w-24 h-1 bg-gradient-secondary mx-auto mb-8"></div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Intro to be developed — content coming soon.
            </p>
            <p className="text-sm text-muted-foreground/70 mt-4">
              This section will showcase our vision for the future and the lasting impact we aim to create.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AboutSection;