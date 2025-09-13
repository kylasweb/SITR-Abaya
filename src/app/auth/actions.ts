// The directive tells the Next.js runtime that it should only be executed on the server.
'use server';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { redirect } from 'next/navigation';

export type FormState = {
  message: string;
  success: boolean;
  timestamp: number;
};

// --- SIGN UP ACTION ---
export async function signupWithEmailAndPasswordAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!name || !email || !password) {
    return {
      message: 'Name, email, and password are required.',
      success: false,
      timestamp: Date.now(),
    };
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Create a corresponding user document in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      name: name,
      email: user.email,
      createdAt: new Date(),
    });

  } catch (error: any) {
    let message = 'An unexpected error occurred.';
    if (error.code === 'auth/email-already-in-use') {
      message = 'This email address is already in use.';
    } else if (error.code === 'auth/weak-password') {
      message = 'The password is too weak.';
    }
    console.error('Signup Error:', error);
    return { message, success: false, timestamp: Date.now() };
  }

  // On success, redirect to the profile page
  redirect('/account/profile');
}


// --- LOGIN ACTION ---
export async function loginWithEmailAndPasswordAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return {
      message: 'Email and password are required.',
      success: false,
      timestamp: Date.now(),
    };
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    let message = 'An unexpected error occurred.';
    if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        message = 'Invalid email or password. Please try again.';
    }
    console.error('Login Error:', error);
    return { message, success: false, timestamp: Date.now() };
  }

  // On success, redirect to the profile page
  redirect('/account/profile');
}


// --- LOGOUT ACTION ---
export async function logoutAction() {
    await signOut(auth);
    redirect('/');
}
