import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { db } from "@/Firebase/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";

interface HeroButton {
  label: string;
  url: string;
}

interface HeroItem {
  id: string;
  order: number;
  mediaUrl: string;   // image or video
  headline: string;
  subtext: string;
  buttons: HeroButton[];
}

const HeroSection = () => {
  const [heroItems, setHeroItems] = useState<HeroItem[]>([]);
  const [current, setCurrent] = useState(0);

  // Fetch hero items from Firestore
  useEffect(() => {
    const fetchHeroItems = async () => {
      try {
        const snap = await getDocs(collection(db, "heroItems"));
        const items = snap.docs
          .map(doc => ({ id: doc.id, ...(doc.data() as HeroItem) }))
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

        setHeroItems(items);
      } catch (error) {
        console.error("Error fetching hero items:", error);
      }
    };

    fetchHeroItems();
  }, []);

  // Auto-slide
  useEffect(() => {
    if (heroItems.length === 0) return;

    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % heroItems.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [heroItems]);

  if (heroItems.length === 0) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Loading banners...</p>
      </section>
    );
  }

  const banner = heroItems[current];
  const isVideo = banner.mediaUrl.endsWith(".mp4") || banner.mediaUrl.includes("video");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Background media */}
      <div className="absolute inset-0 z-0">
        {isVideo ? (
          <video
            src={banner.mediaUrl}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-90"
          />
        ) : (
          <img
            src={banner.mediaUrl}
            alt={banner.headline}
            className="w-full h-full object-cover"
          />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl px-6 lg:px-12 text-center lg:text-left">
        <div className="max-w-2xl space-y-6">

          {/* Subtext */}
          <p className="text-white/90 text-lg">{banner.subtext}</p>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            {banner.headline}
          </h1>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center lg:justify-start">
            {banner.buttons?.map((btn, index) => (
              <Button
                key={index}
                variant={index === 0 ? "cta" : "outline"}
                size="lg"
                className={
                  index === 0
                    ? "group"
                    : "border-white text-white hover:bg-white hover:text-primary"
                }
                onClick={() => window.location.href = btn.url}
              >
                {btn.label}
                {index === 0 && (
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                )}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Dot navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {heroItems.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === current ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;

