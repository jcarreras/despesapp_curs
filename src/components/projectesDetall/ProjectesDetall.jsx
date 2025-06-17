import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { onGetProjecte } from '../../firebase/firebase';

export default function ProjectesDetall() {
    const { id } = useParams();
    const [projecte, setProjecte] = useState(null);
    useEffect(()=> {
        const unsubscribe = onGetProjecte(id, (docSnap)=> {
            if(docSnap.exists()) {
                setProjecte({...docSnap.data(), id:docSnap.id})
            } else {
                setProjecte(null);
            }
        });
        return ()=> unsubscribe();
    }, [id]);
    if(!projecte) return <p>Projecte no trobat...</p>
  return (
    <div>
        <h2>Detall del projecte </h2>
        <p><strong>Nom:</strong>{projecte.nom}</p>
        <p><strong>Participants:</strong>{projecte.participants}</p>
        <p><strong>Despeses:</strong>{projecte.despeses}</p>
    </div>
  )
};
