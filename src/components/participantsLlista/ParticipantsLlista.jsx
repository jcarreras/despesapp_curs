import React from 'react';
import { Link } from 'react-router-dom';
import estils from './ParticipantsLlista.module.css';

export default function ParticipantsLlista(participants, eliminarParticipant) {
  return (
    <div>
        {
            participants.map((participant, index) => (
                <div className={estils.targeta} key={participant.id}>
                    <Link to={`/participant/${participant.id}`}>
                    <h2>{index + 1} - {participant.nom}</h2>
                    </Link>
                    <button onClick={() => eliminarParticipant(participant.id)}>Eliminar Participant</button>
                </div>
            ))
        }
    </div>
  )
}

