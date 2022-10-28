import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDC_0gx21rB01pnSh_795f2uiTaKV48maQ",
  authDomain: "crud-users-9de3f.firebaseapp.com",
  projectId: "crud-users-9de3f",
  storageBucket: "crud-users-9de3f.appspot.com",
  messagingSenderId: "41672791999",
  appId: "1:41672791999:web:7db6862e1a1fc3431a330a",
  measurementId: "G-L5XGWL57T4"
};

const app = initializeApp(firebaseConfig);
export const FirebaseDatabase = getFirestore(app);
