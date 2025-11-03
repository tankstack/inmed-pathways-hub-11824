import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Calendar } from "lucide-react";

const ManageEventsTab = () => {
  // Placeholder data
  const events = [
    { id: 1, title: "Community Workshop: Sustainable Farming", date: "2024-02-15", location: "Cape Town", status: "published" },
    { id: 2, title: "Youth Training Program", date: "2024-02-20", location: "Johannesburg", status: "published" },
    { id: 3, title: "Partner Meeting", date: "2024-02-25", location: "Durban", status: "published" },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Manage Events</CardTitle>
            <CardDescription>Create and manage upcoming events and workshops</CardDescription>
          </div>
          <Button className="bg-brand-magenta hover:opacity-90 text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Event
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:shadow-soft transition-shadow">
              <div className="flex items-start gap-3 flex-1">
                <Calendar className="w-5 h-5 text-brand-magenta mt-1" />
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{event.title}</h4>
                  <div className="flex items-center gap-3 mt-2 flex-wrap">
                    <span className="text-sm text-muted-foreground">{event.date}</span>
                    <Badge variant="outline" className="text-xs">{event.location}</Badge>
                    <Badge 
                      variant="outline" 
                      className="bg-brand-magenta/10 text-brand-magenta border-brand-magenta/20"
                    >
                      {event.status}
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

export default ManageEventsTab;
