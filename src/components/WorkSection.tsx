import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, Sprout, Apple, TreePine, Briefcase, Users2, Image } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WorkSection = () => {
  const navigate = useNavigate();
  
  const programs = [
    {
      icon: <Sprout className="w-8 h-8" />,
      title: "Adaptive Agriculture for Resilience",
      description: "NBCC to develop the content - Description of Pillar",
      color: "text-success",
      bgGradient: "from-success/10 to-success/5",
      readMoreContent: {
        subtitle: "Community Projects, Capacity Building (School Gardens), Quotes from Funders",
        content: "NBCC to develop content"
      }
    },
    {
      icon: <Apple className="w-8 h-8" />,
      title: "Nutrition & Healthy Lifestyles",
      description: "NBCC to develop the content - Description of Pillar",
      color: "text-accent",
      bgGradient: "from-accent/10 to-accent/5",
      readMoreContent: {
        subtitle: "Health in Action, School community nutrition support, Chronic illness prevention",
        content: "NBCC to develop content"
      }
    },
    {
      icon: <TreePine className="w-8 h-8" />,
      title: "Climate-Smart Livelihoods",
      description: "NBCC to develop the content - Description of Pillar",
      color: "text-secondary",
      bgGradient: "from-secondary/10 to-secondary/5",
      readMoreContent: {
        subtitle: "Climate adaptations, Women/Youth Empowerment",
        content: "NBCC to develop content"
      }
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Employment Creation",
      description: "NBCC to develop the content - Description of Pillar",
      color: "text-primary",
      bgGradient: "from-primary/10 to-primary/5",
      readMoreContent: {
        subtitle: "Social Employment",
        content: "NBCC to develop content"
      }
    },
    {
      icon: <Users2 className="w-8 h-8" />,
      title: "Social Entrepreneurship",
      description: "NBCC to develop the content - Description of Pillar",
      color: "text-accent",
      bgGradient: "from-accent/10 to-accent/5",
      readMoreContent: {
        subtitle: "INMED Aquaponics Social Enterprises",
        content: "NBCC to develop content"
      }
    }
  ];

  return (
    <div id="work" className="py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our Work
          </h2>
          <div className="w-24 h-1 bg-gradient-secondary mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We implement comprehensive programs across five core pillars to create lasting impact 
            in vulnerable communities throughout Southern Africa.
          </p>
        </div>

        {/* Core Programs - Stacked Vertical Layout */}
        <div className="space-y-6 mb-16">
          {programs.map((program, index) => (
            <Card key={index} className={`p-8 shadow-medium hover:shadow-strong transition-all duration-300 bg-gradient-to-br ${program.bgGradient}`}>
              <div className="flex flex-col md:flex-row gap-6">
                <div className={`flex-shrink-0 ${program.color}`}>
                  {program.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    {program.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {program.description}
                  </p>
                  
                  <Accordion type="single" collapsible className="w-full mb-6">
                    <AccordionItem value="intro">
                      <AccordionTrigger>Introduction</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground">NBCC to develop the content - Intro</p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="goals">
                      <AccordionTrigger>Goals</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground">NBCC to develop the content - Goals</p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="activities">
                      <AccordionTrigger>Key Activities</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground">NBCC to develop the content - Key Activities</p>
                        <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                          <p className="font-semibold text-foreground mb-2">{program.readMoreContent.subtitle}</p>
                          <p className="text-sm text-muted-foreground">{program.readMoreContent.content}</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="impact">
                      <AccordionTrigger>Impact Stories</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground italic">NBCC to develop the content - Quotes from beneficiaries</p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="partners">
                      <AccordionTrigger>Partnership Testimonials</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground italic">NBCC to develop the content - Quotes from partners</p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <div className="flex gap-2 flex-wrap">
                    <Button variant="ghost" size="sm" className="group/btn">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                    <Button variant="ghost" size="sm" className="group/btn" onClick={() => navigate("/gallery")}>
                      <Image className="w-4 h-4 mr-1" />
                      View Gallery
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Photo/Video Gallery Placeholder */}
        <Card className="p-8 shadow-medium">
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">Program Gallery</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-muted rounded-lg aspect-video flex items-center justify-center hover:shadow-medium transition-shadow cursor-pointer">
                <div className="text-center">
                  <Image className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">[Photo/Video {i}]</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Button variant="secondary" className="group" onClick={() => navigate("/gallery")}>
              <Image className="w-5 h-5 mr-2" />
              View Full Gallery
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default WorkSection;