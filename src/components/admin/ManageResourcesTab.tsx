import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, FileText, Download, Upload } from "lucide-react";

const ManageResourcesTab = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<number | null>(null);
  
  // Placeholder data
  const resources = [
    { id: 1, title: "Nutrition Guide 2024", type: "PDF", category: "Guides", downloads: 45, status: "published" },
    { id: 2, title: "Training Manual", type: "PDF", category: "Training", downloads: 32, status: "published" },
    { id: 3, title: "Annual Report 2023", type: "PDF", category: "Reports", downloads: 87, status: "published" },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Resource Library</CardTitle>
            <CardDescription>Upload and manage downloadable resources</CardDescription>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="bg-brand-teal hover:opacity-90 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Upload Resource
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Upload New Resource</DialogTitle>
                <DialogDescription>Add a new resource to the library</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="resource-title">Title</Label>
                  <Input id="resource-title" placeholder="Enter resource title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="resource-category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="impact-report">Impact Report</SelectItem>
                      <SelectItem value="training-toolkit">Training Toolkit</SelectItem>
                      <SelectItem value="research-publication">Research Publication</SelectItem>
                      <SelectItem value="curriculum-material">Curriculum Material</SelectItem>
                      <SelectItem value="newsletter">Newsletter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="resource-file">Upload File</Label>
                  <div className="flex items-center gap-2">
                    <Input id="resource-file" type="file" />
                    <Upload className="w-5 h-5 text-muted-foreground" />
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                  <Button className="bg-brand-teal hover:opacity-90 text-white">Upload Resource</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {resources.map((resource) => (
            <div key={resource.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:shadow-soft transition-shadow">
              <div className="flex items-start gap-3 flex-1">
                <FileText className="w-5 h-5 text-brand-teal mt-1" />
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{resource.title}</h4>
                  <div className="flex items-center gap-3 mt-2 flex-wrap">
                    <Badge variant="outline" className="text-xs">{resource.type}</Badge>
                    <Badge variant="outline" className="text-xs">{resource.category}</Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Download className="w-3 h-3" />
                      {resource.downloads} downloads
                    </span>
                    <Badge 
                      variant="outline" 
                      className="bg-brand-teal/10 text-brand-teal border-brand-teal/20"
                    >
                      {resource.status}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Dialog open={editingResource === resource.id} onOpenChange={(open) => setEditingResource(open ? resource.id : null)}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                      <DialogTitle>Edit Resource</DialogTitle>
                      <DialogDescription>Update resource details</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-resource-title">Title</Label>
                        <Input id="edit-resource-title" defaultValue={resource.title} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-resource-category">Category</Label>
                        <Select defaultValue={resource.category.toLowerCase().replace(' ', '-')}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="impact-report">Impact Report</SelectItem>
                            <SelectItem value="training-toolkit">Training Toolkit</SelectItem>
                            <SelectItem value="research-publication">Research Publication</SelectItem>
                            <SelectItem value="curriculum-material">Curriculum Material</SelectItem>
                            <SelectItem value="newsletter">Newsletter</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-resource-file">Upload New File</Label>
                        <div className="flex items-center gap-2">
                          <Input id="edit-resource-file" type="file" />
                          <Upload className="w-5 h-5 text-muted-foreground" />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 pt-4">
                        <Button variant="outline" onClick={() => setEditingResource(null)}>Cancel</Button>
                        <Button className="bg-brand-teal hover:opacity-90 text-white">Save Changes</Button>
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

export default ManageResourcesTab;
