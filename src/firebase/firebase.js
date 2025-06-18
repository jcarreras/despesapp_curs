// Importacions
import { firebaseConfig } from "./config";
import { initializeApp } from "firebase/app";
import { updateDoc, getFirestore, addDoc, collection, getDocs, getDoc, onSnapshot, doc, deleteDoc, query, where } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'; 
import { useId } from "react";

// https://firebase.google.com/docs/web/setup#available-libraries

// Inicialitzacions de Firebase
const app  = initializeApp(firebaseConfig);
export const db   = getFirestore(app);
export const auth = getAuth(app);

// Funcions Firebase senzilles i genèriques
export const saveCollection = async (collectionName, item) => 
  await addDoc(collection(db, collectionName), item);

export const deleteCollection = async (collectionName, id) => 
  await deleteDoc(doc(db, collectionName, id));

export const updateCollection = async (collectionName, id, data) => {
  const ref = doc(db, collectionName, id);
  await updateDoc(ref, data);
};

export const getCollection = async (collectionName) => 
  await getDocs(collection(db, collectionName));
  
export const onGetCollection = (collectionName, callback) =>
  onSnapshot(collection(db, collectionName), callback);

// Antiga, però la deixo per tal que tot funcioni
export const onGetDespesa = (id, callback) =>
  onSnapshot(doc(db, "despeses", id), callback);
export const onGetProjecte = (id, callback) =>
  onSnapshot(doc(db, "projectes", id), callback);
export const onGetParticipant = (id, callback) =>
  onSnapshot(doc(db, "participants", id), callback);

// Participants
export const RetornaParticipants = async ()=>{
  const q = query(collection(db, "participants"));
  const snapshot = await getDocs(q);
  const results = snapshot.docs.map(doc => ({id: doc.id,...doc.data(),}));
  return results;
};
export const RetornaInfoParticipant = async (id) =>{
  const ref = doc(db, "participants", id);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    return snap.data();
  }else{
    return "";
  }
};
export const RetornaNomParticipant = async (uid)=>{
  const q=query(collection(db,"participants"), where("uid", "==", uid));
  const snapshot = await getDocs(q);
  if(!snapshot.empty){
    const doc = snapshot.docs[0];
    const name = doc.data().name;
    return name;
  }
  return "";
};

// Projectes
export const RetornaProjectes = async (uid)=>{
  const q = query(collection(db, "projectes"), where("owner", "==", uid));
  const snapshot = await getDocs(q);
  const results = snapshot.docs.map(doc => ({id: doc.id,...doc.data(),}));
  return results;
};
export const RetornaDocProjecte = async (id) =>{
  const ref = doc(db, "projectes", id);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    return snap.data();
  }else{
    return "";
  }
};
export const RetornaInfoProjecte = async (id) =>{
  const ref = doc(db, "projectes", id);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    return snap.data();
  }else{
    return "";
  }
};
export const RetornaInfoProjecte2 = async (idProjecte) => {
  const q = query(collection(db, "projectes"), where("id", "==", idProjecte));
  const snapshot = await getDocs(q);
  if (!snapshot.empty) {
    console.log(snapshot.docs[0].data());
    return snapshot.docs[0].data();
  }
  return "";
};
// Despeses
export const RetornaDespeses = async ()=>{
  const q = query(collection(db, "despeses"));
  const snapshot = await getDocs(q);
  const results = snapshot.docs.map(doc => ({id: doc.id,...doc.data(),}));
  return results;
};
export const RetornaInfoDespesa=async (id)=>{
  const ref = doc(db, "despeses", id);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    return snap.data();
  }else{
    return "";
  }
};

// Funcions d'autenticació
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.log(error.code);
    console.log(error.message);
    let missatge = error.message;
    switch (error.code) {
      case "auth/invalid-email":
        missatge = "Email no vàlid";
        break;
      case "auth/weak-password":
        missatge = "La contrasenya és massa feble";
        break;
      case "auth/email-already-in-use":
        missatge = "Aquest email ja està en ús";
        break;
      default:
        missatge = "Error en el registre";
    }
    return { success: false, error: missatge, code: error.code };
  }
};
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    let missatge = error.message;
    switch (error.code) {
      case "auth/invalid-email":
        missatge = "Email no vàlid";
        break;
      case "auth/invalid-credential":
        missatge = "Email o contrasenya erronis";
        break;
      case "auth/user-not-found":
        missatge = "Usuari no trobat";
        break;
      case "auth/wrong-password":
        missatge = "Contrasenya incorrecta";
        break;
      default:
        missatge = "Error en l'inici de sessió";
    }
    return { success: false, error: missatge, code: error.code };
  }
};
export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error("Error en tancar sessió:", error);
    return { success: false, error: error.message };
  }
};
 export const getCurrentUser = () => {
  return auth.currentUser;
};
export const isUserLoggedIn = (callback) => {
  return onAuthStateChanged(auth, callback);
};
