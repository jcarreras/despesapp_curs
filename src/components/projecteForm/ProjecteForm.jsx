import { useState } from 'react';
import './ProjecteForm.css';

export default function ProjecteForm(afegirProjecte) {
  const [nom, setNom] = useState("");
  const [participants, setParticipants] = useState("joan");
  const [despeses, setDespeses] = useState("");
  const resetForm = () => {
    setNom("");
    setParticipants("");
    setDespeses("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const projecte = {
      nom: nom,
      participants: participants,
      despeses: despeses,
    };
    afegirProjecte(projecte);
    resetForm();
  };
  return (
    <form className='projecte-form' onSubmit={handleSubmit}>
        <label>
            <span>Nom: </span>
            <input type="text" onChange={(e) => setNom(e.target.value)} value={nom} />
        </label>
        <label>
            <span>Participants: </span>
            <input type="text" onChange={(e) => setParticipants(e.target.value)} value={participants} />
        </label>
        <label>
            <span>Despeses: </span>
             <input type="text" onChange={(e) => setDespeses(e.target.value)} value={despeses} />           
        </label>
        <button>Afegir</button>
    </form>
  )
}
