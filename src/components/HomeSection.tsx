import * as React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselApi } from "@/components/ui/carousel";
import { ArrowRight, Heart, Users, Mail, MapPin, TrendingUp, Target, Sparkles, HandshakeIcon, Lightbulb, Shield, UsersRound, Leaf } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import AnimatedCounter from "@/components/AnimatedCounter";
import Autoplay from "embla-carousel-autoplay";

interface HomeSectionProps {
  onNavigate?: (tab: string) => void;
}

const HomeSection = ({ onNavigate }: HomeSectionProps) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const autoplayPlugin = React.useMemo(
    () => Autoplay({ delay: 5000, stopOnInteraction: false }),
    []
  );

  return (
    <div id="home" className="py-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Carousel - Building Pathways */}
        <div className="relative mb-16">
          <Carousel 
            setApi={setApi}
            plugins={[autoplayPlugin]}
            opts={{ loop: true }}
            className="w-full"
          >
            <CarouselContent>
              {/* Slide 1 */}
              <CarouselItem>
                <div className="relative rounded-2xl overflow-hidden h-[400px] md:h-[500px] lg:h-[600px]">
                  <img 
                    src={heroImage}
                    alt="Building Pathways to Well-being & Self-Reliance"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-primary/70 flex items-center justify-center">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 animate-fade-in">
                        Building Pathways to Well-being & Self-Reliance for Every Child & Family
                      </h1>
                      <p className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 animate-fade-in">
                        Empowering vulnerable children, families, and communities.
                      </p>
                      <div className="flex gap-3 md:gap-4 justify-center flex-wrap animate-fade-in">
                        <Button variant="hero" size="lg" className="group" onClick={() => onNavigate?.("contact")}>
                          Donate
                          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <Button variant="outline" size="lg" className="bg-white/10 text-white border-white hover:bg-white hover:text-primary" onClick={() => onNavigate?.("contact")}>
                          Get Involved
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              {/* Slide 2 */}
              <CarouselItem>
                <div className="relative rounded-2xl overflow-hidden h-[400px] md:h-[500px] lg:h-[600px]">
                  <img 
                    src={heroImage}
                    alt="Thriving in Health, Dignity & Self-Reliance"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-primary/70 flex items-center justify-center">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 animate-fade-in">
                        Thriving in Health, Dignity & Self-Reliance
                      </h1>
                      <p className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 animate-fade-in">
                        Working together to create sustainable solutions.
                      </p>
                      <div className="flex gap-3 md:gap-4 justify-center flex-wrap animate-fade-in">
                        <Button variant="hero" size="lg" className="group" onClick={() => onNavigate?.("contact")}>
                          Partner
                          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <Button variant="outline" size="lg" className="bg-white/10 text-white border-white hover:bg-white hover:text-primary" onClick={() => onNavigate?.("contact")}>
                          Volunteer
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              {/* Slide 3 */}
              <CarouselItem>
                <div className="relative rounded-2xl overflow-hidden h-[400px] md:h-[500px] lg:h-[600px]">
                  <img 
                    src={heroImage}
                    alt="Empowering Communities to Build a Better Future"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-primary/70 flex items-center justify-center">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 animate-fade-in">
                        Empowering Communities to Build a Better Future
                      </h1>
                      <p className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 animate-fade-in">
                        Supporting local leaders and sustainable impact.
                      </p>
                      <div className="flex gap-3 md:gap-4 justify-center flex-wrap animate-fade-in">
                        <Button variant="hero" size="lg" className="group" onClick={() => onNavigate?.("contact")}>
                          Donate
                          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <Button variant="outline" size="lg" className="bg-white/10 text-white border-white hover:bg-white hover:text-primary" onClick={() => onNavigate?.("contact")}>
                          Partner
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              {/* Slide 4 - Video */}
              <CarouselItem>
                <div className="relative rounded-2xl overflow-hidden h-[400px] md:h-[500px] lg:h-[600px]">
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <p className="text-muted-foreground text-center px-4">[Video Placeholder - Auto-play, Loop, Muted]</p>
                  </div>
                  <div className="absolute inset-0 bg-primary/70 flex items-center justify-center">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 animate-fade-in">
                        Transforming Lives Through Collaboration and Innovation
                      </h1>
                      <div className="flex gap-3 md:gap-4 justify-center flex-wrap animate-fade-in mt-6 md:mt-8">
                        <Button variant="hero" size="lg" className="group" onClick={() => onNavigate?.("contact")}>
                          Get Involved
                          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <Button variant="outline" size="lg" className="bg-white/10 text-white border-white hover:bg-white hover:text-primary" onClick={() => onNavigate?.("contact")}>
                          Donate
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>
            
            {/* Navigation Arrows */}
            <CarouselPrevious className="left-2 md:left-4 h-10 w-10 md:h-12 md:w-12" />
            <CarouselNext className="right-2 md:right-4 h-10 w-10 md:h-12 md:w-12" />
          </Carousel>

          {/* Indicator Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-2 rounded-full transition-all ${
                  index === current 
                    ? 'w-8 bg-primary' 
                    : 'w-2 bg-primary/30 hover:bg-primary/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Impact at a Glance */}
        <div className="bg-gradient-hero rounded-2xl p-8 md:p-12 text-white mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">Impact at a Glance</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 mx-auto mb-4" />
              <AnimatedCounter end={500} suffix="+" />
              <div className="text-white/90">School Gardens Established</div>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 mx-auto mb-4" />
              <AnimatedCounter end={10000} suffix="+" />
              <div className="text-white/90">Children Reached</div>
            </div>
            <div className="text-center">
              <Heart className="w-12 h-12 mx-auto mb-4" />
              <AnimatedCounter end={200} suffix="+" />
              <div className="text-white/90">Community Leaders Trained</div>
            </div>
            <div className="text-center">
              <Target className="w-12 h-12 mx-auto mb-4" />
              <AnimatedCounter end={15} />
              <div className="text-white/90">Partner Organizations</div>
            </div>
          </div>
        </div>

        {/* Featured Project */}
        <Card className="p-8 mb-16 shadow-medium bg-gradient-to-br from-secondary/5 to-accent/5">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Featured Project</h2>
            <div className="w-24 h-1 bg-gradient-secondary mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center transition-all duration-300">
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-2xl font-bold text-foreground">
                School Garden Initiative: Growing Hope & Nutrition
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our adaptive agriculture program has established over 500 school gardens, providing 
                fresh produce and nutrition education to more than 10,000 children across Eastern 
                Cape communities. This initiative not only addresses food security but also teaches 
                sustainable farming practices and healthy eating habits. Through hands-on learning, 
                students develop essential skills while contributing to their community's well-being.
              </p>
              <Button variant="secondary" className="group">
                Read Full Story
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <div className="group overflow-hidden rounded-lg aspect-video bg-muted hover-scale cursor-pointer transition-all duration-300 hover:shadow-lg animate-fade-in">
              <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <div className="text-center p-8">
                  <MapPin className="w-16 h-16 text-primary mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" />
                  <p className="text-muted-foreground font-semibold">Project Image Placeholder</p>
                  <p className="text-sm text-muted-foreground/70 mt-2">Landscape format recommended</p>
                </div>
              </div>
            </div>
          </div>
        </Card>


        {/* Newsletter Signup */}
        <Card className="p-8 shadow-medium mb-16 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-foreground mb-4 text-center">Stay Updated</h3>
          <p className="text-muted-foreground mb-6 text-center">
            Subscribe to our newsletter for the latest updates, stories, and impact from our programs.
          </p>
          <div className="space-y-4">
            <Input 
              type="email" 
              placeholder="Enter your email address" 
            />
            <Button variant="primary" className="w-full">
              <Mail className="w-4 h-4 mr-2" />
              Subscribe to Newsletter
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HomeSection;
