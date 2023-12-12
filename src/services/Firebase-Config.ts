import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCHNC19WMChhyuwrSCO0tOoFh6zJ3ydEzk",
  authDomain: "usersapp-63b84.firebaseapp.com",
  projectId: "usersapp-63b84",
  storageBucket: "usersapp-63b84.appspot.com",
  messagingSenderId: "1059949275265",
  appId: "1:1059949275265:web:6082c8ce0c94cf56f88580"
};

const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const storage = 
