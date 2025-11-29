// ManagePostsTab.tsx (paste into your project)
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, Upload } from "lucide-react";

import { db } from "@/Firebase/firestore";          // your firestore export
import { storage } from "@/Firebase/FirebaseConfig"; // your storage export
import { auth } from "@/Firebase/auth";             // your auth export

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
import { onAuthStateChanged } from "firebase/auth";

interface Post {
  id?: string;
  title: string;
  description: string;
  imageUrl?: string;
  date?: string;
  status: "draft" | "published";
}

export default function ManagePostsTab() {
  const [user, setUser] = useState<any>(null);
  const [isEditorVisible, setIsEditorVisible] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [form, setForm] = useState<Post>({
    title: "",
    description: "",
    imageUrl: "",
    date: new Date().toISOString().slice(0, 10),
    status: "draft",
  });
  const [previewImage, setPreviewImage] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]);

  // Auth listener (so we know who is signed in)
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u || null);
      if (u) {
        // ensure token includes fresh custom claims
        await u.getIdToken(true);
      }
    });
    return () => unsub();
  }, []);

  // Fetch posts
  const fetchPosts = async () => {
    try {
      const q = query(collection(db, "Posts"), orderBy("date", "desc"));
      const snap = await getDocs(q);
      const items = snap.docs.map(d => ({ id: d.id, ...(d.data() as any) })) as Post[];
      setPosts(items);
    } catch (err) {
      console.error("fetchPosts error", err);
    }
  };
  useEffect(() => { fetchPosts(); }, []);

  const handleChange = (k: keyof Post, v: any) => setForm(prev => ({ ...prev, [k]: v }));

  // image upload: uploads to Storage then sets imageUrl
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    // optimistic preview
    const blobUrl = URL.createObjectURL(file);
    setPreviewImage(blobUrl);
    setForm(prev => ({ ...prev, imageUrl: blobUrl }));

    try {
      // require signed-in admin (rules check)
      if (!auth.currentUser) throw new Error("Not signed in");

      const fileRef = ref(storage, `Posts/${Date.now()}_${file.name}`);
      await uploadBytes(fileRef, file);
      const downloadUrl = await getDownloadURL(fileRef);
      setForm(prev => ({ ...prev, imageUrl: downloadUrl }));
      setPreviewImage(downloadUrl);
    } catch (err) {
      console.error("upload error", err);
      alert("Image upload failed. Ensure you are signed in as admin and storage rules allow uploads.");
    }
  };

  const resetForm = () => {
    setEditingPostId(null);
    setForm({ title: "", description: "", imageUrl: "", date: new Date().toISOString().slice(0, 10), status: "draft" });
    setPreviewImage("");
    setIsEditorVisible(false);
  };

  const handleSave = async (status: "draft" | "published") => {
  try {
    const postData = {
      title: form.title,
      description: form.description,
      imageUrl: form.imageUrl,
      status,
      date: new Date().toISOString(),
    };

    if (editingPostId) {
      await updateDoc(doc(db, "Posts", editingPostId), postData);
    } else {
      await addDoc(collection(db, "Posts"), postData);
    }

    fetchPosts();
    resetForm();
  } catch (err) {
    console.error("Error saving:", err);
    alert("Error saving. Check console.");
  }
};

  const handleEdit = (p: Post) => {
    setEditingPostId(p.id!);
    setForm({ ...p });
    setPreviewImage(p.imageUrl || "");
    setIsEditorVisible(true);
  };

  const handleDelete = async (postId: string) => {
    if (!confirm("Delete?")) return;
    try {
      await deleteDoc(doc(db, "Posts", postId));
      fetchPosts();
    } catch (err) {
      console.error("delete error", err);
      alert("Delete failed.");
    }
  };

  const handleNewPost = () => { resetForm(); setIsEditorVisible(true); };

  return (
    <div className="space-y-8">
      {/* Header */}
      <Card>
        <CardHeader className="flex items-center justify-between">
          <div>
            <CardTitle>Manage Posts & News</CardTitle>
            <CardDescription>Create and manage news articles and blog posts</CardDescription>
          </div>
          <Button onClick={handleNewPost} className="bg-brand-green hover:bg-brand-green-dark text-white">
            <Plus className="w-4 h-4 mr-2" /> New Post
          </Button>
        </CardHeader>

        {isEditorVisible && (
          <CardContent>
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Editor */}
              <div className="flex-1 space-y-4 border p-4 rounded-lg bg-white">
                <div className="space-y-2"><Label>Title</Label><Input value={form.title} onChange={(e)=>handleChange("title", e.target.value)} /></div>
                <div className="space-y-2"><Label>Description</Label><Textarea value={form.description} onChange={(e)=>handleChange("description", e.target.value)} rows={6} /></div>
                <div className="space-y-2">
                  <Label>Upload Image</Label>
                  <div className="flex items-center gap-2">
                    <Input type="file" accept="image/*" onChange={handleImageChange} />
                    <Upload className="w-5 h-5 text-muted-foreground" />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={resetForm}>Cancel</Button>
                  <Button onClick={()=>handleSave("draft")} className="bg-brand-green text-white">Save Draft</Button>
                  <Button onClick={()=>handleSave("published")} className="bg-brand-green text-white">Publish</Button>
                </div>
              </div>

              {/* Preview */}
              <div className="flex-1 border p-4 rounded-lg bg-white">
                {previewImage && <img src={previewImage} className="w-full max-h-64 object-cover rounded mb-4" />}
                <h2 className="text-2xl font-bold mb-2">{form.title || "Post Title"}</h2>
                <span className="text-xs text-muted-foreground mb-2 block">{form.date}</span>
                <p>{form.description || "Post description preview..."}</p>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Posts list */}
      <Card>
        <CardContent>
          <div className="space-y-4">
            {posts.map(p => (
              <div key={p.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-semibold">{p.title}</h4>
                  <div className="flex items-center gap-3 mt-2">
                    <Badge variant="outline" className="text-xs">{p.status}</Badge>
                    <span className="text-xs text-muted-foreground">{String(p.date)?.slice(0,10)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={()=>handleEdit(p)}><Edit className="w-4 h-4"/></Button>
                  <Button variant="ghost" size="sm" className="text-destructive" onClick={()=>p.id && handleDelete(p.id)}><Trash2 className="w-4 h-4"/></Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
