import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, Youtube } from "lucide-react";
import { FaTiktok } from "react-icons/fa";

const Footer = () => {
  const footerLinks = {
    "INMED Details": [
      "Our Story",
      "Our Vision",
      "Our Mission",
      "Our Values",
      "Impact Reports"
    ],
    "Site Map": [
      "Home",
      "About Us",
      "Our Work",
      "News and Updates",
      "Contact"
    ],
    "Get Involved": [
      "Donate",
      "Partner with us",
      "Volunteer",
      "Events"
    ],
    "Connect": [
      "Facebook",
      "LinkedIn",
      "Instagram",
      "TikTok"
    ]
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-4">INMED South Africa</h3>
                <p className="text-primary-foreground/80 leading-relaxed">
                  Building pathways that empower vulnerable children, families, and 
                  communities to achieve lasting well-being and self-reliance.
                </p>
              </div>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-secondary" />
                  <span className="text-sm">Eastern Cape, South Africa</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-secondary" />
                  <span className="text-sm">+27 (0) 11 234 5678</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-secondary" />
                  <span className="text-sm">info@inmed.org.za</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-primary-foreground hover:text-secondary"
                  asChild
                >
                  <a href="https://www.facebook.com/share/1AxhfgjkCC/" target="_blank" rel="noopener noreferrer">
                    <Facebook className="w-5 h-5" />
                  </a>
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-primary-foreground hover:text-secondary"
                  asChild
                >
                  <a href="https://www.instagram.com/inmed_south_africa?igsh=MWl4cml1Nmw3OW95eg==" target="_blank" rel="noopener noreferrer">
                    <Instagram className="w-5 h-5" />
                  </a>
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-primary-foreground hover:text-secondary"
                  asChild
                >
                  <a href="https://youtube.com/@inmedforchildren?si=BNc_gxllKG_y6zBZ" target="_blank" rel="noopener noreferrer">
                    <Youtube className="w-5 h-5" />
                  </a>
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-primary-foreground hover:text-secondary"
                  asChild
                >
                  <a href="https://www.tiktok.com/@inmed_sa?_t=ZS-8zEB9Gnh1V3&_r=1" target="_blank" rel="noopener noreferrer">
                    <FaTiktok className="w-5 h-5" />
                  </a>
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-primary-foreground hover:text-secondary"
                  asChild
                >
                  <a href="https://www.linkedin.com/in/inmed-south-africa-410474353?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Links Sections */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="space-y-4">
                <h4 className="text-lg font-semibold">{title}</h4>
                <ul className="space-y-2">
                  {links.map((link) => {
                    const linkMap: { [key: string]: string } = {
                      "Our Story": "#about",
                      "Our Vision": "#about",
                      "Our Mission": "#about",
                      "Our Values": "#about",
                      "Impact Reports": "#about",
                      "Home": "/",
                      "About Us": "#about",
                      "Our Work": "#work",
                      "News and Updates": "#news",
                      "Contact": "#contact",
                      "Donate": "#donate",
                      "Partner with us": "#contact",
                      "Volunteer": "#donate",
                      "Events": "#news",
                      "Facebook": "https://www.facebook.com/share/1AxhfgjkCC/",
                      "LinkedIn": "https://www.linkedin.com/in/inmed-south-africa-410474353?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
                      "Instagram": "https://www.instagram.com/inmed_south_africa?igsh=MWl4cml1Nmw3OW95eg==",
                      "TikTok": "https://www.tiktok.com/@inmed_sa?_t=ZS-8zEB9Gnh1V3&_r=1"
                    };
                    
                    const href = linkMap[link] || "#";
                    const isExternal = href.startsWith("http");
                    
                    return (
                      <li key={link}>
                        <a 
                          href={href}
                          target={isExternal ? "_blank" : undefined}
                          rel={isExternal ? "noopener noreferrer" : undefined}
                          className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm"
                        >
                          {link}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="mt-12 pt-8 border-t border-primary-foreground/20">
            <div className="max-w-md mx-auto text-center">
              <h4 className="text-lg font-semibold mb-4">Stay Connected</h4>
              <p className="text-primary-foreground/80 mb-6 text-sm">
                Subscribe to our newsletter for updates on our programs and impact stories.
              </p>
              <div className="flex space-x-2">
                <Input 
                  placeholder="Enter your email" 
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
                />
                <Button variant="secondary">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-primary-foreground/80">
              © 2025 INMED South Africa. All rights reserved. | Website designed by Tankstack
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;