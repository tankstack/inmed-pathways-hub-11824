import { getAuth, signInWithEmailAndPassword, connectAuthEmulator } from "firebase/auth";
import { app } from "./config";

export const auth = getAuth(app);

// If running the Firebase emulator locally, set VITE_USE_FIREBASE_EMULATOR=true
if (import.meta.env.VITE_USE_FIREBASE_EMULATOR === "true") {
  // default emulator host/port for auth emulator
  connectAuthEmulator(auth, "http://localhost:9099");
}

export const signIn = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};
