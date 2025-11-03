import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2 } from "lucide-react";

const ManagePostsTab = () => {
  // Placeholder data
  const posts = [
    { id: 1, title: "Community Garden Initiative Launch", category: "News", status: "published", date: "2024-01-15" },
    { id: 2, title: "Nutrition Workshop Success", category: "Updates", status: "published", date: "2024-01-10" },
    { id: 3, title: "New Partnership Announcement", category: "News", status: "published", date: "2024-01-05" },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Manage Posts & News</CardTitle>
            <CardDescription>Create and manage news articles and blog posts</CardDescription>
          </div>
          <Button className="bg-brand-green hover:bg-brand-green-dark text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:shadow-soft transition-shadow">
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">{post.title}</h4>
                <div className="flex items-center gap-3 mt-2">
                  <Badge variant="outline" className="text-xs">{post.category}</Badge>
                  <Badge 
                    variant="outline" 
                    className={post.status === "published" ? "bg-brand-green/10 text-brand-green border-brand-green/20" : "bg-muted"}
                  >
                    {post.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{post.date}</span>
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
      </CardContent>
    </Card>
  );
};

export default ManagePostsTab;
