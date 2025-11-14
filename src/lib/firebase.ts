import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Check if Firebase credentials are properly configured
const isFirebaseConfigured = 
  firebaseConfig.apiKey && 
  firebaseConfig.apiKey !== 'undefined' &&
  firebaseConfig.authDomain && 
  firebaseConfig.projectId &&
  firebaseConfig.apiKey.length > 10;

// Initialize Firebase only if properly configured
let app: FirebaseApp | undefined;
let db: Firestore | undefined;

if (isFirebaseConfigured && typeof window !== 'undefined') {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    db = getFirestore(app);
  } catch (error) {
    console.warn('Firebase initialization failed. Please configure Firebase environment variables.');
  }
}

// Export a function to get auth dynamically (only when needed)
export const getAuthInstance = async () => {
  if (!isFirebaseConfigured || !app) {
    throw new Error('Firebase not configured');
  }
  const { getAuth } = await import('firebase/auth');
  return getAuth(app);
};

export { app, db, isFirebaseConfigured };