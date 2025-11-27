import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Calendar, 
  MousePointer, 
  Image as ImageIcon,
  LogOut,
  Users,
  BarChart3,
  FolderOpen
} from "lucide-react";
import ManagePostsTab from "@/components/admin/ManagePostsTab";
import ManageEventsTab from "@/components/admin/ManageEventsTab";
import ManageResourcesTab from "@/components/admin/ManageResourcesTab";
import AnalyticsTab from "@/components/admin/AnalyticsTab";
import UserRolesTab from "@/components/admin/UserRolesTab";
import { auth } from "@/Firebase/auth";
import { signOut } from "firebase/auth";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/auth");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  // Placeholder data
  const stats = [
    { title: "Total Posts", value: "24", icon: FileText, color: "text-brand-green" },
    { title: "Upcoming Events", value: "8", icon: Calendar, color: "text-brand-magenta" },
    { title: "Donation Clicks", value: "156", icon: MousePointer, color: "text-brand-teal" },
    { title: "Media Files", value: "342", icon: ImageIcon, color: "text-brand-purple" },
  ];

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-50 shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-primary">INMED Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">Content Management System</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={() => navigate("/")}>
                View Site
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Navigation Tabs */}
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 gap-2 h-auto bg-background p-2 shadow-soft">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="posts" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Posts</span>
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Events</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-2">
              <FolderOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Resources</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Users</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="border-l-4" style={{ borderLeftColor: `hsl(var(--brand-${stat.color.split('-')[1]}))` }}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </CardTitle>
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Button variant="outline" className="h-auto py-4 flex-col" onClick={() => setActiveTab("posts")}>
                    <FileText className="w-6 h-6 mb-2 text-brand-green" />
                    <span>Create New Post</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex-col" onClick={() => setActiveTab("events")}>
                    <Calendar className="w-6 h-6 mb-2 text-brand-magenta" />
                    <span>Add Event</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex-col" onClick={() => setActiveTab("resources")}>
                    <FolderOpen className="w-6 h-6 mb-2 text-brand-teal" />
                    <span>Upload Resource</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates and changes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 pb-3 border-b border-border">
                    <div className="w-2 h-2 rounded-full bg-brand-green mt-2" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">New post published</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 pb-3 border-b border-border">
                    <div className="w-2 h-2 rounded-full bg-brand-magenta mt-2" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Event updated</p>
                      <p className="text-xs text-muted-foreground">5 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-brand-teal mt-2" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Resource uploaded</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Manage Posts Tab */}
          <TabsContent value="posts">
            <ManagePostsTab />
          </TabsContent>

          {/* Manage Events Tab */}
          <TabsContent value="events">
            <ManageEventsTab />
          </TabsContent>

          {/* Manage Resources Tab */}
          <TabsContent value="resources">
            <ManageResourcesTab />
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <AnalyticsTab />
          </TabsContent>

          {/* User Roles Tab */}
          <TabsContent value="users">
            <UserRolesTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
