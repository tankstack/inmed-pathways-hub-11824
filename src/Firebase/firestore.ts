import { app } from "@/Firebase/config"; // <-- must match export exactly
import { getFirestore } from "firebase/firestore";

export const db = getFirestore(app);

