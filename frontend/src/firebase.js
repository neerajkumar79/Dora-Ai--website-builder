import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDOUnpdafsp2q8HBrDgLvu3NC0K9MdVTpc",
  authDomain: "dora-ai-23321.firebaseapp.com",
  projectId: "dora-ai-23321",
  storageBucket: "dora-ai-23321.firebasestorage.app",
  messagingSenderId: "964991660545",
  appId: "1:964991660545:web:8a43488d5b1b72b8b74600"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.addScope("email");
provider.addScope("profile");

export { auth, provider };