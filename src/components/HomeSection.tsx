import * as React from "react";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi
} from "@/components/ui/carousel";
import { ArrowRight, Heart, Users, Mail, TrendingUp, Target } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import Autoplay from "embla-carousel-autoplay";
import { getFeaturedProjects } from "@/api/getFeaturedProjects";

import { collection, getDocs } from "firebase/firestore";
import { db } from "@/Firebase/firestore";

// Firebase
//import { db } from "@/Firebase/FirebaseConfig";
//import { collection, getDocs, doc, getDoc } from "firebase/firestore";

// ----------------------
// Interfaces
// ----------------------
interface Banner {
  imageUrl: string;
  headline: string;
  subtext?: string;
  button1Text?: string;
  button1Url?: string;
  button2Text?: string;
  button2Url?: string;
  type?: "image" | "video";
  order?: number;
}

interface Project {
  title: string;
  description: string;
  imageUrl?: string;
  linkUrl?: string;
  order?: number;
}

interface HomeConfig {
  subscriptionHeadline?: string;
  subscriptionCTA?: string;
  footerText?: string;
}

interface HomeSectionProps {
  onNavigate?: (tab: string) => void;
}

// ----------------------
// Component
// ----------------------
const HomeSection = ({ onNavigate }: HomeSectionProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const [banners, setBanners] = useState<Banner[]>([]);

  const [homeConfig, setHomeConfig] = useState<HomeConfig | null>(null);


   const [projects, setProjects] = useState<Project[]>([]);

 
   
useEffect(() => {
  const testConnection = async () => {
    try {
      const snapshot = await getDocs(collection(db, "FeaturedProjects"));
      console.log("Firebase connected! Number of documents:", snapshot.docs.length);
      snapshot.docs.forEach(doc => console.log(doc.id, doc.data()));
    } catch (error) {
      console.error("Firebase connection failed:", error);
    }
  };

  testConnection();
}, []);

//get featured projects
useEffect(() => {
  const fetchProjects = async () => {
    try {
      const data = await getFeaturedProjects();
      setProjects(data);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    }
  };

  fetchProjects();
}, []);


  /*

  // ----------------------
  // Fetch Firestore Data
  // ----------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Hero items
        const bannersSnap = await getDocs(collection(db, "heroItems"));
      const bannersData = bannersSnap.docs
        .map(doc => ({
          id: doc.id,
          ...(doc.data() as Banner)
        }))
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      setBanners(bannersData);


        // Featured projects
        const projectsSnap = await getDocs(collection(db, "featuredProjects"));
      const projectsData = projectsSnap.docs
        .map(doc => ({
          id: doc.id,
          ...(doc.data() as Project)
        }))
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      setProjects(projectsData);
      
        // Newsletter & footer text
        const homeDoc = await getDoc(doc(db, "home", "main"));
        if (homeDoc.exists()) {
          setHomeConfig(homeDoc.data() as HomeConfig);
        }

      } catch (error) {
        console.error("Firestore fetch error:", error);
      }
    };

    fetchData();
  }, []);

  */

  // ----------------------
  // Carousel Tracking
  // ----------------------
  React.useEffect(() => {
    if (!api) return;

     api.reInit(); // refresh the carousel after projects load
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  const autoplayPlugin = React.useMemo(() => Autoplay({ delay: 5000, stopOnInteraction: false }), []);

  // ----------------------
  // JSX
  // ----------------------
  return (
    <div id="home" className="py-8">
      <div className="max-w-7xl mx-auto">

        {/* HERO SECTION */}
        <div className="relative mb-16">
          <Carousel setApi={setApi} plugins={[autoplayPlugin]} opts={{ loop: true }}className="w-full">
            <CarouselContent>
              {banners.length > 0 ? (
                banners.map((banner, index) => (
                  <CarouselItem key={index}>
                    <div className="relative rounded-2xl overflow-hidden h-[400px] md:h-[500px] lg:h-[600px]">

                      {banner.type === "video" ? (
                        <video
                          src={banner.imageUrl}
                          className="w-full h-full object-cover"
                          autoPlay
                          muted
                          loop
                        />
                      ) : (
                        <img
                          src={banner.imageUrl}
                          alt={banner.headline}
                          className="w-full h-full object-cover"
                        />
                      )}

                      <div className="absolute inset-0 bg-primary/70 flex items-center justify-center">
                        <div className="max-w-4xl mx-auto text-center text-white px-4">
                          <h1 className="text-4xl md:text-5xl font-bold mb-4">{banner.headline}</h1>
                          {banner.subtext && <p className="text-lg mb-6">{banner.subtext}</p>}

                          <div className="flex gap-3 justify-center">
                            {banner.button1Text && (
                              <Button
                                variant="hero"
                                size="lg"
                                onClick={() => banner.button1Url && (window.location.href = banner.button1Url)}
                              >
                                {banner.button1Text}
                                <ArrowRight className="ml-2 w-5 h-5" />
                              </Button>
                            )}

                            {banner.button2Text && (
                              <Button
                                variant="outline"
                                size="lg"
                                className="bg-white/10 text-white border-white hover:bg-white hover:text-primary"
                                onClick={() => banner.button2Url && (window.location.href = banner.button2Url)}
                              >
                                {banner.button2Text}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))
              ) : (
                <CarouselItem>
                  <div className="flex justify-center items-center h-[400px] text-muted-foreground">
                    Loading banners...
                  </div>
                </CarouselItem>
              )}
            </CarouselContent>

            <CarouselPrevious className="left-2 md:left-4" />
            <CarouselNext className="right-2 md:right-4" />
          </Carousel>

          {/* Carousel Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-2 rounded-full transition-all ${
                  index === current ? "w-8 bg-primary" : "w-2 bg-primary/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* IMPACT COUNTERS */}
        <div className="bg-gradient-hero rounded-2xl p-8 md:p-12 text-white mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">Impact at a Glance</h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center"><TrendingUp className="w-12 h-12 mx-auto mb-4" /><AnimatedCounter end={500} suffix="+" /><div>School Gardens Established</div></div>
            <div className="text-center"><Users className="w-12 h-12 mx-auto mb-4" /><AnimatedCounter end={10000} suffix="+" /><div>Children Reached</div></div>
            <div className="text-center"><Heart className="w-12 h-12 mx-auto mb-4" /><AnimatedCounter end={200} suffix="+" /><div>Community Leaders Trained</div></div>
            <div className="text-center"><Target className="w-12 h-12 mx-auto mb-4" /><AnimatedCounter end={15} /><div>Partner Organizations</div></div>
          </div>
        </div>
        {/* FEATURED PROJECTS */}
        <Card className="p-8 mb-16 shadow-medium bg-gradient-to-br from-secondary/5 to-accent/5">
        
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
          </div>

          <Carousel setApi={setApi} plugins={[autoplayPlugin]} opts={{ loop: true }}>
            <CarouselContent>
              {projects.length > 0 ? (
                projects.map((proj, i) => (
                  <CarouselItem key={proj.order}>
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      <div>
                        <h3 className="text-2xl font-bold mb-4">{proj.title ?? "Untitled"}</h3>
                        <p className="text-lg text-muted-foreground mb-6">{proj.description ?? "No description"}</p>
                        {proj.linkUrl && (
                          <Button
                            variant="secondary"
                            onClick={() => window.location.href = proj.linkUrl}
                          >
                            View Project <ArrowRight className="ml-2 w-5 h-5" />
                          </Button>
                        )}
                      </div>
                      <div className="bg-muted rounded-lg aspect-video flex items-center justify-center">
                        {proj.imageUrl ? (
                          <img
                            src={proj.imageUrl}
                            alt={proj.title ?? "Project image"}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <p className="text-muted-foreground">No image</p>
                        )}
                      </div>
                    </div>
                  </CarouselItem>
                ))
              ) : (
                <CarouselItem>
                  <div className="flex justify-center items-center h-[200px] text-muted-foreground">
                    Loading projects...
                  </div>
                </CarouselItem>
              )}
            </CarouselContent>
             {api && (
  <>
    <CarouselPrevious className="left-4" onClick={() => api.scrollPrev()} />
    <CarouselNext className="right-4" onClick={() => api.scrollNext()} />
  </>
)}


          </Carousel>
        </Card>

        {/* NEWSLETTER */}
        <Card className="p-8 shadow-medium mb-16 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-4">
            {homeConfig?.subscriptionHeadline || "Stay Updated"}
          </h3>

          <p className="text-muted-foreground mb-6 text-center">
            {homeConfig?.subscriptionCTA || "Subscribe to our newsletter for updates and stories."}
          </p>

          <div className="space-y-4">
            <Input type="email" placeholder="Enter your email address" />
            <Button variant="primary" className="w-full">
              <Mail className="w-4 h-4 mr-2" /> Subscribe
            </Button>
          </div>
        </Card>

      </div>
    </div>
  );
};

export default HomeSection;
