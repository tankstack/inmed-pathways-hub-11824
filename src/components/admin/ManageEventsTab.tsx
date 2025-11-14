import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Plus, Edit, Trash2, Calendar } from "lucide-react";

const ManageEventsTab = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<number | null>(null);
  
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
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="bg-brand-magenta hover:opacity-90 text-white">
                <Plus className="w-4 h-4 mr-2" />
                New Event
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Create New Event</DialogTitle>
                <DialogDescription>Add a new event or workshop</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="event-title">Title</Label>
                  <Input id="event-title" placeholder="Enter event title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="event-place">Place</Label>
                  <Input id="event-place" placeholder="Enter event location" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="event-date">Date</Label>
                  <Input id="event-date" type="date" />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                  <Button className="bg-brand-magenta hover:opacity-90 text-white">Create Event</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
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
                <Dialog open={editingEvent === event.id} onOpenChange={(open) => setEditingEvent(open ? event.id : null)}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                      <DialogTitle>Edit Event</DialogTitle>
                      <DialogDescription>Update event details</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-event-title">Title</Label>
                        <Input id="edit-event-title" defaultValue={event.title} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-event-place">Place</Label>
                        <Input id="edit-event-place" defaultValue={event.location} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-event-date">Date</Label>
                        <Input id="edit-event-date" type="date" defaultValue={event.date} />
                      </div>
                      <div className="flex justify-end gap-2 pt-4">
                        <Button variant="outline" onClick={() => setEditingEvent(null)}>Cancel</Button>
                        <Button className="bg-brand-magenta hover:opacity-90 text-white">Save Changes</Button>
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

export default ManageEventsTab;

