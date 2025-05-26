import { firebaseConfig } from "./config";
import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection, getDocs, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { } from 'firebase/auth'; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//Noves i generals
export const saveCollection = async (collectionName)=>{
  console.log(collectionName);
  const docRef=await addDoc(collection(db,"despeses"),collectionName);
  return docRef.id;
}
export const getCollection = (collectionName) =>
  getDocs(collection(db, collectionName));
export const onGetCollection = (collectionName, callback) =>
  onSnapshot(collection(db, collectionName), callback);
export const deleteCollection = async (collectionName, id) =>
  deleteDoc(doc(db, collectionName, id));

//Antigues
export const saveDespesa = async (despesa) => {
  console.log(despesa);
  const docRef = await addDoc(collection(db, "despeses"), despesa);
  return docRef.id;   
}
export const getDespeses = () => 
  getDocs(collection(db, "despeses"));
export const onGetDespesa = (id, callback) =>
  onSnapshot(doc(db, "despeses", id), callback);
export const deleteDespesa = async (id) =>
  deleteDoc(doc(db, "despeses", id));
