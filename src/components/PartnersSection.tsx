import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import nmuLogo from "@/assets/partners/nmu-logo.png";
import undpLogo from "@/assets/partners/undp-logo.webp";
import woolworthsLogo from "@/assets/partners/woolworths-logo.webp";
import sefLogo from "@/assets/partners/sef-logo.jpg";
import dstiLogo from "@/assets/partners/dsti-logo.jpg";
import drdarLogo from "@/assets/partners/drdar-logo.png";
import dbeLogo from "@/assets/partners/dbe-logo.png";
import environmentalAffairsLogo from "@/assets/partners/environmental-affairs-logo.png";
import lovedaleLogo from "@/assets/partners/lovedale-logo.jpg";
import motheoLogo from "@/assets/partners/motheo-logo.png";
import tutLogo from "@/assets/partners/tut-logo.png";
import fortHareLogo from "@/assets/partners/fort-hare-logo.jpg";
import usaidLogo from "@/assets/partners/usaid-logo.png";
import airProductsLogo from "@/assets/partners/air-products-logo.jpg";

const PartnersSection = () => {
  const partnerLogos = [
    { name: "Nelson Mandela University", logo: nmuLogo },
    { name: "UNDP", logo: undpLogo },
    { name: "Woolworths", logo: woolworthsLogo },
    { name: "Social Employment Fund", logo: sefLogo },
    { name: "Department of Science, Technology and Innovation", logo: dstiLogo },
    { name: "Department of Rural Development and Agrarian Reform", logo: drdarLogo },
    { name: "DBE Certified Enterprise", logo: dbeLogo },
    { name: "Department of Environmental Affairs", logo: environmentalAffairsLogo },
    { name: "Lovedale TVET College", logo: lovedaleLogo },
    { name: "Motheo Construction Group", logo: motheoLogo },
    { name: "Tshwane University of Technology", logo: tutLogo },
    { name: "University of Fort Hare", logo: fortHareLogo },
    { name: "USAID", logo: usaidLogo },
    { name: "Air Products", logo: airProductsLogo },
  ];

  return (
    <section className="py-16 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Our Partners & Funders
          </h2>
          <p className="text-lg text-muted-foreground">
            Working together to create lasting impact across Southern Africa
          </p>
        </div>

        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {partnerLogos.map((partner, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Card className="p-8 shadow-medium">
                  <div className="bg-white rounded-lg p-6 flex items-center justify-center h-32">
                    <img 
                      src={partner.logo} 
                      alt={partner.name} 
                      className="max-h-20 max-w-full w-auto object-contain" 
                    />
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default PartnersSection;