import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Menu, X } from "lucide-react";
import inmedLogo from "@/assets/inmed-logo.png";

interface NavigationProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-background shadow-soft sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center flex-1 md:flex-none">
            <img src={inmedLogo} alt="INMED South Africa Logo" className="h-16 md:h-14 w-auto" />
          </div>

          {/* Desktop Tabs */}
          <div className="hidden md:flex flex-1 justify-center mx-8">
            <Tabs value={activeTab} onValueChange={onTabChange} className="w-auto">
              <TabsList className="h-auto bg-transparent">
                <TabsTrigger value="home" className="text-sm font-semibold px-4 py-2">
                  Home
                </TabsTrigger>
                <TabsTrigger value="about" className="text-sm font-semibold px-4 py-2">
                  About Us
                </TabsTrigger>
                <TabsTrigger value="work" className="text-sm font-semibold px-4 py-2">
                  Our Work
                </TabsTrigger>
                <TabsTrigger value="news" className="text-sm font-semibold px-4 py-2">
                  News & Resources
                </TabsTrigger>
                <TabsTrigger value="donate" className="text-sm font-semibold px-4 py-2">
                  Get Involved
                </TabsTrigger>
                <TabsTrigger value="contact" className="text-sm font-semibold px-4 py-2">
                  Contact
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Login Button & Mobile Menu */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button variant="default" size="sm" onClick={() => navigate("/auth")}>
              Login
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Tabs */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-border pt-4">
            <Tabs value={activeTab} onValueChange={(value) => {
              onTabChange(value);
              setIsMenuOpen(false);
            }} className="w-full">
              <TabsList className="grid grid-cols-2 gap-2 h-auto bg-transparent">
                <TabsTrigger value="home" className="text-sm font-semibold py-2">
                  Home
                </TabsTrigger>
                <TabsTrigger value="about" className="text-sm font-semibold py-2">
                  About Us
                </TabsTrigger>
                <TabsTrigger value="work" className="text-sm font-semibold py-2">
                  Our Work
                </TabsTrigger>
                <TabsTrigger value="news" className="text-sm font-semibold py-2">
                  News & Resources
                </TabsTrigger>
                <TabsTrigger value="donate" className="text-sm font-semibold py-2">
                  Get Involved
                </TabsTrigger>
                <TabsTrigger value="contact" className="text-sm font-semibold py-2">
                  Contact
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;