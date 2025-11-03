import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BarChart3, TrendingUp, Users, Eye } from "lucide-react";

const AnalyticsTab = () => {
  return (
    <div className="space-y-6">
      <Alert className="border-brand-purple bg-brand-purple/5">
        <BarChart3 className="h-4 w-4 text-brand-purple" />
        <AlertDescription className="text-brand-purple">
          Google Analytics integration coming soon. Connect your Google Analytics account to view detailed traffic and engagement metrics.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-brand-green" />
              Web Traffic
            </CardTitle>
            <CardDescription>Google Analytics Integration Placeholder</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="text-sm text-muted-foreground">Page Views</span>
                <span className="font-semibold">Pending Setup</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="text-sm text-muted-foreground">Unique Visitors</span>
                <span className="font-semibold">Pending Setup</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="text-sm text-muted-foreground">Avg. Session Duration</span>
                <span className="font-semibold">Pending Setup</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-brand-magenta" />
              User Engagement
            </CardTitle>
            <CardDescription>Google Analytics Integration Placeholder</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="text-sm text-muted-foreground">Bounce Rate</span>
                <span className="font-semibold">Pending Setup</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="text-sm text-muted-foreground">Pages per Session</span>
                <span className="font-semibold">Pending Setup</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="text-sm text-muted-foreground">New vs Returning</span>
                <span className="font-semibold">Pending Setup</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-brand-teal" />
            Popular Content
          </CardTitle>
          <CardDescription>Most viewed pages and resources</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 border border-border rounded-lg">
              <span className="text-sm">Home Page</span>
              <span className="text-sm font-semibold text-brand-teal">Setup Required</span>
            </div>
            <div className="flex justify-between items-center p-3 border border-border rounded-lg">
              <span className="text-sm">About Us</span>
              <span className="text-sm font-semibold text-brand-teal">Setup Required</span>
            </div>
            <div className="flex justify-between items-center p-3 border border-border rounded-lg">
              <span className="text-sm">Our Work</span>
              <span className="text-sm font-semibold text-brand-teal">Setup Required</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsTab;
