import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock, Send, Facebook, Linkedin, Instagram } from "lucide-react";

const ContactSection = () => {
  return (
    <div id="contact" className="py-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Contact Us
          </h2>
          <div className="w-24 h-1 bg-gradient-accent mx-auto mb-8"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Contact Form */}
          <Card className="p-8 shadow-medium">
            <h3 className="text-2xl font-bold text-foreground mb-6">Send Us a Message</h3>
            <form className="space-y-4">
              <Input placeholder="Your Name *" required />
              <Input type="email" placeholder="Your Email *" required />
              <Textarea placeholder="Your Message *" rows={6} required />
              <Button variant="primary" size="lg" className="w-full group">
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </Button>
            </form>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="p-6 shadow-medium">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Office Address</h4>
                  <p className="text-muted-foreground">13 - 15 Fuchia Street, Flora Gardens<br />Vanderbijlpark 1911, South Africa</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 shadow-medium">
              <div className="flex items-start gap-4">
                <div className="bg-secondary/10 p-3 rounded-lg">
                  <Mail className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Email</h4>
                  <a href="mailto:info@inmed.org.za" className="text-muted-foreground hover:text-primary transition-colors">info@inmed.org.za</a>
                </div>
              </div>
            </Card>
            <Card className="p-6 shadow-medium">
              <div className="flex items-start gap-4">
                <div className="bg-accent/10 p-3 rounded-lg">
                  <Phone className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Phone</h4>
                  <a href="tel:+27112345678" className="text-muted-foreground hover:text-primary transition-colors">+27 (0) 11 234 5678</a>
                </div>
              </div>
            </Card>
            <Card className="p-6 shadow-medium">
              <div className="flex items-start gap-4">
                <div className="bg-success/10 p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-success" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Office Hours</h4>
                  <p className="text-muted-foreground">Mon-Fri: [Hours]</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Map and Social */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-8 shadow-medium">
            <h3 className="text-xl font-bold text-foreground mb-6">Office Location</h3>
            <div className="bg-muted rounded-lg aspect-video flex items-center justify-center mb-6 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3586.1!2d27.8!3d-26.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDQyJzAwLjAiUyAyN8KwNDgnMDAuMCJF!5e0!3m2!1sen!2sza!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location Map"
              />
            </div>
            <Button 
              variant="secondary" 
              className="w-full"
              onClick={() => window.open('https://www.google.com/maps/search/?api=1&query=13-15+Fuchia+Street+Flora+Gardens+Vanderbijlpark+1911+South+Africa', '_blank')}
            >
              Get Directions
            </Button>
          </Card>
          <Card className="p-8 shadow-medium">
            <h3 className="text-xl font-bold text-foreground mb-6">Follow Us</h3>
            <div className="space-y-3 mb-6">
              <Button variant="outline" className="w-full justify-start" size="lg">
                <Facebook className="w-5 h-5 mr-3" />
                Facebook
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                size="lg"
                asChild
              >
                <a href="https://www.instagram.com/inmed_south_africa?igsh=MWNtM3d6N250bzd4ZQ==" target="_blank" rel="noopener noreferrer">
                  <Instagram className="w-5 h-5 mr-3" />
                  Instagram
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start" size="lg">
                <Linkedin className="w-5 h-5 mr-3" />
                LinkedIn
              </Button>
            </div>
            <Input type="email" placeholder="Subscribe to newsletter" />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
