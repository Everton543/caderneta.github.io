import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBw_KKM84bEDpTpKFwCQqvFOXgO0XlBIXk",
  authDomain: "caderneta-428b5.firebaseapp.com",
  projectId: "caderneta-428b5",
  storageBucket: "caderneta-428b5.appspot.com",
  messagingSenderId: "256754749095",
  appId: "1:256754749095:web:9175328e4300e1cc275582",
  measurementId: "G-V87LP8KZ3X"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);

export default app;