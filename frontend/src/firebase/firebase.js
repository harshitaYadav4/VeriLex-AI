import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "XXXX",
  appId: "XXXX"
};


const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider();

export const provider = new GoogleAuthProvider()

export const loginWithGoogle = () => signInWithPopup(auth, provider)

export const signup = (email, password) =>
createUserWithEmailAndPassword(auth, email, password)

export const login = (email, password) =>
signInWithEmailAndPassword(auth, email, password)

export const logout = () => signOut(auth)