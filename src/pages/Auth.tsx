import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Mail, LogIn } from "lucide-react";
import inmedLogo from "@/assets/inmed-logo.png";
import { signIn } from "@/Firebase/auth";
import { TEST_USER } from "@/Firebase/testCredentials";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    try {
      await signIn(email, password);
      navigate("/admin");
    } catch (err) {
      console.error("Sign-in failed", err);
      alert("Sign-in failed. Check credentials or console for details.");
    }
  };

  const useTestCredentials = async () => {
    setEmail(TEST_USER.email);
    setPassword(TEST_USER.password);

    try {
      await signIn(TEST_USER.email, TEST_USER.password);
      navigate("/admin");
    } catch (err) {
      console.error("Test sign-in failed", err);
      alert("Test sign-in failed. Make sure emulator/credentials are configured.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-strong">
        <div className="text-center mb-8">
          <div className="w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-4">
            <img src={inmedLogo} alt="INMED Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome Back
          </h1>
          <p className="text-muted-foreground">
            Sign in to access the admin dashboard
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            size="lg"
          >
            <LogIn className="w-5 h-5 mr-2" />
            Sign In
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={useTestCredentials}
            className="w-full mt-2"
          >
            Use Test Credentials
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-muted-foreground"
          >
            Back to Home
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Auth;
