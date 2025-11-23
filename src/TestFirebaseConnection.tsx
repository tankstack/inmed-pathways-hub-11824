import { db, storage } from "@/Firebase/FirebaseConfig.js";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

export default function TestFirebaseConnection() {
  const testWrite = async () => {
    try {
      await setDoc(doc(db, "testCollection", "testDoc"), {
        message: "Hello Firebase!"
      });
      console.log("Firestore write SUCCESS");
    } catch (e) {
      console.error("Firestore write FAILED:", e);
    }
  };

  const testUpload = async () => {
    const fileRef = ref(storage, "test-folder/test.txt");
    const blob = new Blob(["Firebase storage test"], { type: "text/plain" });

    try {
      await uploadBytes(fileRef, blob);
      console.log("Storage upload SUCCESS");
    } catch (e) {
      console.error("Storage upload FAILED:", e);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Firebase Connection Test</h1>

      <button
        onClick={testWrite}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Test Firestore Write
      </button>

      <button
        onClick={testUpload}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Test Storage Upload
      </button>
    </div>
  );
}
