import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyBv75hoKiGhaBF1iqEfstET9w7Ozghw0uM",
  authDomain: "kz-cars-e83fa.firebaseapp.com",
  projectId: "kz-cars-e83fa",
  storageBucket: "kz-cars-e83fa.appspot.com",
  messagingSenderId: "861130910360",
  appId: "1:861130910360:web:be181f55af03c4e9273eed",
  measurementId: "G-KKVMFFS0NM"
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const database = getFirestore(app)
export const storage = getStorage(app)