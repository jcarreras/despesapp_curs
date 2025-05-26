import { useState, useEffect } from "react";
import { onGetCollection } from "../firebase/firebase";
import { QuerySnapshot } from "firebase/firestore";

export const useCollection = (collectionName)=>{
    const [documents, setDocuments] = useState(null);
    useEffect(()=>{
        const unsubscribe = onGetCollection(collectionName, (QuerySnapshot) => {
            let resultats = [];
            QuerySnapshot.docs.forEach((doc)=>{
                resultats.push({...doc.data(), id:doc.id});
            });
            setDocuments(resultats);
        });
        return ()=>unsubscribe();
    }, [collectionName]);
    return {documents};
}