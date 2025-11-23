// src/api/getFeaturedProjects.ts
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "@/Firebase/firestore";

export interface Project {
  title: string;
  description: string;
  imageUrl?: string;
  linkUrl?: string;
  order?: number;
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const q = query(
    collection(db, "FeaturedProjects"),
    where("Featured", "==", true),
    orderBy("Order", "asc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      title: data.Title ?? "Untitled",
      description: data.Description ?? "",
      imageUrl: data.ImageUrl,
      linkUrl: data.LinkUrl,
      order: data.Order,
    };
  });
}

