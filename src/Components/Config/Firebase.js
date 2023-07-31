import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyC1S5ORyxx0_8W2hED1x_GMV6EDdsbXyhk",
  authDomain: "kz-cars-7cb6d.firebaseapp.com",
  projectId: "kz-cars-7cb6d",
  storageBucket: "kz-cars-7cb6d.appspot.com",
  messagingSenderId: "979744204594",
  appId: "1:979744204594:web:08845bfd2d45b4136b192b",
  measurementId: "G-PTSX6SEGZS"
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const database = getFirestore(app)