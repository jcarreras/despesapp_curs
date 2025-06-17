import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import estils from './ProjectesLlista.module.css';
import { isUserLoggedIn } from '../../firebase/firebase';


export default function ProjectesLlista({projectes, eliminarProjecte}) {

    useEffect(()=> {
        isUserLoggedIn((res)=>{
            console.log(res.auth);
        })
    }, []);

    return (
        <div>
            {
                projectes.map((projecte, index) => (
                    <div className={estils.targeta} key={projecte.id}>
                        <Link to={`/projecte/${projecte.id}`}>
                        <h2>{index + 1} - {projecte.nom}</h2>
                        </Link>
                        <button onClick={() => eliminarProjecte(projecte.id)}>Eliminar Projecte</button>
                    </div>
                ))
            }
        </div>
    )
};