import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Heart, Users, CreditCard, HandHeart, UserPlus, Calendar as CalendarIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DonateSection = () => {
  const navigate = useNavigate();
  
  return (
    <div id="donate" className="py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Donate / Get Involved
          </h2>
          <div className="w-24 h-1 bg-gradient-warm mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Support our mission and make a lasting difference in the lives of vulnerable 
            children, families, and communities across Southern Africa.
          </p>
        </div>

        {/* Donation Form */}
        <Card className="p-8 mb-12 shadow-medium">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Make a Donation</h3>
          <div className="max-w-2xl mx-auto">
            <div className="bg-muted rounded-lg p-8 mb-6 text-center">
              <CreditCard className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground font-semibold text-lg mb-2">[PayFast / Stripe Integration Placeholder]</p>
              <p className="text-sm text-muted-foreground">Secure payment gateway will be integrated here</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Button variant="cta" size="lg" className="w-full group">
                <Heart className="w-5 h-5 mr-2" />
                Donate Locally
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="secondary" size="lg" className="w-full group">
                <HandHeart className="w-5 h-5 mr-2" />
                Donate Internationally
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Volunteer Section */}
        <Card className="p-8 mb-12 shadow-medium">
          <div className="text-center mb-8">
            <UserPlus className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-4">Volunteer</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join our team of dedicated volunteers and make a direct impact in communities across Southern Africa.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="group">
              <UserPlus className="w-5 h-5 mr-2" />
              Volunteer / Work With Us
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="secondary" 
              size="lg" 
              className="group"
              onClick={() => navigate("/gallery?tab=events")}
            >
              <CalendarIcon className="w-5 h-5 mr-2" />
              Events / Webinars
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </Card>

        {/* Partner With Us */}
        <Card className="p-8 mb-12 shadow-medium">
          <div className="text-center mb-8">
            <Users className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-4">Partner With Us</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We welcome partnerships with corporations, institutions, and funders who share our 
              vision for community empowerment and sustainable development.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 border border-border rounded-lg">
              <h4 className="font-semibold text-foreground mb-3">Corporate Partnerships</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                  <span>CSR initiatives and community investment</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                  <span>Employee volunteer programs</span>
                </li>
              </ul>
            </div>
            <div className="p-6 border border-border rounded-lg">
              <h4 className="font-semibold text-foreground mb-3">Institutional Funding</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                  <span>Grant funding opportunities</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                  <span>Research collaboration</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="text-center">
            <Button variant="secondary" size="lg" className="group">
              <Users className="w-5 h-5 mr-2" />
              Partner Inquiry
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </Card>

        {/* Impact Message */}
        <div className="bg-gradient-hero rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Your Support Creates Real Impact</h3>
          <div className="grid sm:grid-cols-3 gap-6 mt-8">
            <div>
              <div className="text-3xl font-bold mb-2">R100</div>
              <div className="text-white/90">Feeds a child for a month</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">R500</div>
              <div className="text-white/90">Establishes a school garden</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">R1000</div>
              <div className="text-white/90">Trains a community leader</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonateSection;
