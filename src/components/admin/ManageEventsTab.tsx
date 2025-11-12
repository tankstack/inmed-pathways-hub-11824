import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, Upload } from "lucide-react";

const ManagePostsTab = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<number | null>(null);
  
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
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="bg-brand-green hover:bg-brand-green-dark text-white">
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Post</DialogTitle>
                <DialogDescription>Add a new post or news article</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Enter post title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="project">Project (shows on Home page)</SelectItem>
                      <SelectItem value="board">Board (shows on About Us & Board Gallery)</SelectItem>
                      <SelectItem value="team">Team (shows on Team & Team Gallery)</SelectItem>
                      <SelectItem value="program">Program (shows on Our Work & Program Gallery)</SelectItem>
                      <SelectItem value="news">News</SelectItem>
                      <SelectItem value="updates">Updates</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Enter post description" rows={6} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">Upload Image</Label>
                  <div className="flex items-center gap-2">
                    <Input id="image" type="file" accept="image/*" />
                    <Upload className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground">At least one image required</p>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                  <Button className="bg-brand-green hover:bg-brand-green-dark text-white">Create Post</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
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
                <Dialog open={editingPost === post.id} onOpenChange={(open) => setEditingPost(open ? post.id : null)}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Edit Post</DialogTitle>
                      <DialogDescription>Update post details</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-title">Title</Label>
                        <Input id="edit-title" defaultValue={post.title} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-category">Category</Label>
                        <Select defaultValue={post.category.toLowerCase()}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="project">Project (shows on Home page)</SelectItem>
                            <SelectItem value="board">Board (shows on About Us & Board Gallery)</SelectItem>
                            <SelectItem value="team">Team (shows on Team & Team Gallery)</SelectItem>
                            <SelectItem value="program">Program (shows on Our Work & Program Gallery)</SelectItem>
                            <SelectItem value="news">News</SelectItem>
                            <SelectItem value="updates">Updates</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-description">Description</Label>
                        <Textarea id="edit-description" placeholder="Enter post description" rows={6} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-image">Upload New Image</Label>
                        <div className="flex items-center gap-2">
                          <Input id="edit-image" type="file" accept="image/*" />
                          <Upload className="w-5 h-5 text-muted-foreground" />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 pt-4">
                        <Button variant="outline" onClick={() => setEditingPost(null)}>Cancel</Button>
                        <Button className="bg-brand-green hover:bg-brand-green-dark text-white">Save Changes</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
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

