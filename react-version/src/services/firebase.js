import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBsvJDAnhmoBTlirzlVYsCmk6y9veloiGc",
  authDomain: "caligo-ecommerce.firebaseapp.com",
  projectId: "caligo-ecommerce",
  storageBucket: "caligo-ecommerce.firebasestorage.app",
  messagingSenderId: "478452914773",
  appId: "1:478452914773:web:359e6b0949b3cbb7cb92dc"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);