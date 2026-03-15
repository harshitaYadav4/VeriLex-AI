/**
 * Auth service – sign up, login (email + Google), backend sync.
 * All requests go through apiService. Stores Firebase id token in localStorage for API calls.
 */

import { request } from "./apiService";
import { auth, googleProvider } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

async function syncTokenToStorage(user) {
  if (!user || typeof window === "undefined") return;
  const token = await user.getIdToken();
  localStorage.setItem("token", token);
}

export async function signupWithEmail(email, password) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  const idToken = await cred.user.getIdToken();
  await request("/auth/signup", {
    method: "POST",
    body: { email, firebase_uid: cred.user.uid },
    headers: { Authorization: `Bearer ${idToken}` },
  });
  await syncTokenToStorage(cred.user);
  return cred.user;
}

export async function loginWithEmail(email, password) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  const idToken = await cred.user.getIdToken();
  await request("/auth/login", {
    method: "POST",
    body: { email, firebase_uid: cred.user.uid },
    headers: { Authorization: `Bearer ${idToken}` },
  });
  await syncTokenToStorage(cred.user);
  return cred.user;
}

export async function loginWithGoogle() {
  const cred = await signInWithPopup(auth, googleProvider);
  const idToken = await cred.user.getIdToken();
  await request("/auth/login", {
    method: "POST",
    body: { email: cred.user.email, firebase_uid: cred.user.uid },
    headers: { Authorization: `Bearer ${idToken}` },
  });
  await syncTokenToStorage(cred.user);
  return cred.user;
}
