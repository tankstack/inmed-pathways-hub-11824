import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Shield } from "lucide-react";

const UserRolesTab = () => {
  // Placeholder data
  const users = [
    { id: 1, name: "Admin User", email: "admin@inmed.org.za", role: "supervisor", status: "active" },
    { id: 2, name: "Content Manager", email: "content@inmed.org.za", role: "supervisor", status: "active" },
    { id: 3, name: "Editor", email: "editor@inmed.org.za", role: "supervisor", status: "active" },
  ];

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "supervisor":
        return "bg-brand-purple/10 text-brand-purple border-brand-purple/20";
      default:
        return "bg-muted";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    return status === "active" 
      ? "bg-brand-green/10 text-brand-green border-brand-green/20" 
      : "bg-muted";
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>User & Role Management</CardTitle>
            <CardDescription>Manage user accounts and permissions</CardDescription>
          </div>
          <Button className="bg-brand-purple hover:opacity-90 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:shadow-soft transition-shadow">
              <div className="flex items-start gap-3 flex-1">
                <Shield className="w-5 h-5 text-brand-purple mt-1" />
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{user.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{user.email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className={getRoleBadgeColor(user.role)}>
                      {user.role}
                    </Badge>
                    <Badge variant="outline" className={getStatusBadgeColor(user.status)}>
                      {user.status}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h5 className="font-semibold text-sm mb-2">Available Roles</h5>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={getRoleBadgeColor("supervisor")}>Supervisor</Badge>
              <span>Full access to all features and content management</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserRolesTab;
