import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { onGetParticipant } from '../../firebase/firebase';

export default function ParticipantsDetall() {
    const { id } = useParams();
    const [participant, setParticipant] = useState(null);  
    useEffect(()=> {
        const unsubscribe = onGetParticipant(id, (docSnap)=> {
            if(docSnap.exists()) {
                setParticipant({...docSnap.data(), id:docSnap.id})
            } else {
                setParticipant(null);
            }
        });
        return ()=> unsubscribe();
    }, [id]);
    if(!participant) return <p>Participant no trobat...</p>
  return (
       <div>
        <h2>Dades del participant</h2>
        <p><strong>uid:</strong>{participant.uid}</p>
        <p><strong>nom:</strong>{participant.nom}</p>
        <p><strong>correu:</strong>{participant.correu}</p>
        <p><strong>contrasenya:</strong>{participant.pwd}</p>
    </div>
  )
};