import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { FirebaseDatabase } from "../firebaseConfig";
// import { FirebaseDatabase } from "../../firebaseConfig";

const usersRef=collection(FirebaseDatabase,"users");

class UsersFireStoreService{
    addUsers=(newUsersData)=>{
        return addDoc(usersRef,newUsersData);
    }
    getUsers=()=>{
        return getDocs(usersRef);
    }
    deleteUsers=(id)=>{
        const userDetail=doc(FirebaseDatabase,"users",id);
        return deleteDoc(userDetail);
    }
    updateUser=(id,updateUserData)=>{
        const userDetail=doc(FirebaseDatabase,"users",id);
        return updateDoc(userDetail,updateUserData);
    }
    getSingleUser=(id)=>{
        const userDetail=doc(FirebaseDatabase,"users",id);
        return getDoc(userDetail);
    }
};

export default new UsersFireStoreService();
