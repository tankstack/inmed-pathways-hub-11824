import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2 } from "lucide-react";

import { db, storage } from "@/Firebase/FirebaseConfig";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface Post {
  id?: string;
  title: string;
  description: string;
  category: string; // "hero", "project", "gallery", "team", "board", etc.
  imageUrl?: string;
  gallery?: string[];
  linkUrl?: string;
  featured?: boolean;
  order?: number;
  role?: string;
  programType?: string;
  status: "draft" | "published";
  dateCreated?: any;
}

const ManagePostsTab = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  // Fetch posts from Firestore
  const fetchPosts = async () => {
    const q = query(collection(db, "posts"), orderBy("dateCreated", "desc"));
    const snapshot = await getDocs(q);
    const fetchedPosts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Post));
    setPosts(fetchedPosts);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Upload file to Firebase Storage
  const uploadFile = async (file: File, path: string) => {
    const fileRef = ref(storage, path);
    await uploadBytes(fileRef, file);
    return await getDownloadURL(fileRef);
  };

  // Create new post
  const handleCreate = async (form: any) => {
    if (form.cancel) {
      setIsCreateOpen(false);
      return;
    }

    // Upload main image
    if (form.image) {
      const path = form.category === "hero" ? `heroItems/${form.image.name}` : `posts/${form.image.name}`;
      form.imageUrl = await uploadFile(form.image, path);
    }

    // Upload gallery if multiple images
    if (form.gallery) {
      const galleryUrls: string[] = [];
      for (let i = 0; i < form.gallery.length; i++) {
        const url = await uploadFile(form.gallery[i], `posts/gallery/${form.gallery[i].name}`);
        galleryUrls.push(url);
      }
      form.gallery = galleryUrls;
    }

    await addDoc(collection(db, "posts"), {
      ...form,
      dateCreated: serverTimestamp(),
    });

    fetchPosts();
    setIsCreateOpen(false);
  };

  // Update post
  const handleUpdate = async (postId: string, form: any) => {
    if (form.cancel) {
      setEditingPost(null);
      return;
    }

    if (form.image) {
      const path = form.category === "hero" ? `heroItems/${form.image.name}` : `posts/${form.image.name}`;
      form.imageUrl = await uploadFile(form.image, path);
    }

    if (form.gallery) {
      const galleryUrls: string[] = [];
      for (let i = 0; i < form.gallery.length; i++) {
        const url = await uploadFile(form.gallery[i], `posts/gallery/${form.gallery[i].name}`);
        galleryUrls.push(url);
      }
      form.gallery = galleryUrls;
    }

    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, form);
    fetchPosts();
    setEditingPost(null);
  };

  // Delete post
  const handleDelete = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    await deleteDoc(doc(db, "posts", postId));
    fetchPosts();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Manage Posts</CardTitle>
            <CardDescription>All content across the website</CardDescription>
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
              </DialogHeader>
              <PostForm onSubmit={handleCreate} />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:shadow-soft transition-shadow"
            >
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">{post.title}</h4>
                <div className="flex items-center gap-3 mt-2">
                  <Badge variant="outline" className="text-xs">
                    {post.category}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={
                      post.status === "published"
                        ? "bg-brand-green/10 text-brand-green border-brand-green/20"
                        : "bg-muted"
                    }
                  >
                    {post.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {post.dateCreated?.toDate?.().toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Dialog open={!!editingPost && editingPost.id === post.id} onOpenChange={(open) => setEditingPost(open ? post : null)}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Edit Post</DialogTitle>
                    </DialogHeader>
                    <PostForm post={post} onSubmit={(form) => handleUpdate(post.id!, form)} />
                  </DialogContent>
                </Dialog>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive"
                  onClick={() => handleDelete(post.id!)}
                >
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

// ------------------------
// Post Form
// ------------------------
interface PostFormProps {
  post?: Post;
  onSubmit: (form: any) => void;
}

const PostForm = ({ post, onSubmit }: PostFormProps) => {
  const [form, setForm] = useState<any>({
    title: post?.title || "",
    description: post?.description || "",
    category: post?.category || "",
    image: null,
    currentImageUrl: post?.imageUrl || "",
    gallery: null,
    currentGallery: post?.gallery || [],
    role: post?.role || "",
    programType: post?.programType || "",
    linkUrl: post?.linkUrl || "",
    featured: post?.featured || false,
    order: post?.order || 0,
    status: post?.status || "draft",
  });

  const handleChange = (key: string, value: any) => setForm((prev: any) => ({ ...prev, [key]: value }));

  return (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <Label>Title</Label>
        <Input value={form.title} onChange={(e) => handleChange("title", e.target.value)} />
      </div>

      <div className="space-y-2">
        <Label>Category</Label>
        <Select value={form.category} onValueChange={(v) => handleChange("category", v)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hero">Hero Banner</SelectItem>
            <SelectItem value="project">Featured Project</SelectItem>
            <SelectItem value="gallery">Gallery</SelectItem>
            <SelectItem value="team">Team</SelectItem>
            <SelectItem value="board">Board</SelectItem>
            <SelectItem value="program">Program</SelectItem>
            <SelectItem value="news">News</SelectItem>
            <SelectItem value="updates">Updates</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea value={form.description} onChange={(e) => handleChange("description", e.target.value)} rows={6} />
      </div>

      {/* Upload for hero, project, gallery */}
      {(form.category === "hero" || form.category === "project" || form.category === "gallery") && (
        <div className="space-y-2">
          <Label>Upload Image{form.category === "gallery" ? "s" : ""}</Label>
          <Input
            type="file"
            multiple={form.category === "gallery"}
            onChange={(e) =>
              handleChange(
                form.category === "gallery" ? "gallery" : "image",
                form.category === "gallery" ? e.target.files : e.target.files?.[0]
              )
            }
          />
          {form.currentImageUrl && form.category !== "gallery" && (
            <img src={form.currentImageUrl} alt="Current" className="w-32 h-32 object-cover mt-2 rounded-lg" />
          )}
          {form.currentGallery && form.category === "gallery" && (
            <div className="flex gap-2 flex-wrap mt-2">
              {form.currentGallery.map((img: string, i: number) => (
                <img key={i} src={img} alt={`Gallery ${i}`} className="w-24 h-24 object-cover rounded-lg" />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Featured / Order for projects */}
      {form.category === "project" && (
        <>
          <div className="space-y-2">
            <Label>Link URL</Label>
            <Input value={form.linkUrl} onChange={(e) => handleChange("linkUrl", e.target.value)} />
          </div>
          <div className="space-y-2 flex items-center gap-2">
            <Input type="checkbox" checked={form.featured} onChange={(e) => handleChange("featured", e.target.checked)} />
            <span>Featured on Homepage</span>
          </div>
          <div className="space-y-2">
            <Label>Order</Label>
            <Input type="number" value={form.order} onChange={(e) => handleChange("order", parseInt(e.target.value))} />
          </div>
        </>
      )}

      {/* Other fields */}
      {(form.category === "team" || form.category === "board") && (
        <div className="space-y-2">
          <Label>Role</Label>
          <Input value={form.role} onChange={(e) => handleChange("role", e.target.value)} />
        </div>
      )}

      {form.category === "program" && (
        <>
          <div className="space-y-2">
            <Label>Program Type</Label>
            <Input value={form.programType} onChange={(e) => handleChange("programType", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Order</Label>
            <Input type="number" value={form.order} onChange={(e) => handleChange("order", parseInt(e.target.value))} />
          </div>
        </>
      )}

      <div className="space-y-2">
        <Label>Status</Label>
        <Select value={form.status} onValueChange={(v) => handleChange("status", v)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="published">Published</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={() => onSubmit({ cancel: true })}>
          Cancel
        </Button>
        <Button className="bg-brand-green hover:bg-brand-green-dark text-white" onClick={() => onSubmit(form)}>
          Save / Post
        </Button>
      </div>
    </div>
  );
};

export default ManagePostsTab;




