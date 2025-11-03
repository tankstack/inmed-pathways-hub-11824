import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, FileText, Download } from "lucide-react";

const ManageResourcesTab = () => {
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
          <Button className="bg-brand-teal hover:opacity-90 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Upload Resource
          </Button>
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

export default ManageResourcesTab;
