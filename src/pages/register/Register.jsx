import React from 'react'
import './Register.css';

export default function Register() {
  const registrarse = (e) => {
        // e.preventDefault();
        // const validacio = {
        //   email: email,
        //   contrasenya: contrasenya,
        // }
        // console.log(validacio);
        // resetForm();
  };
  return (
    <form className='despesa-register-form' onSubmit={registrarse}>
        <label>
            <span>Nom: </span>
            <input type="text" required />
        </label>
        <label>
            <span>Email: </span>
            <input type="email" required  />
        </label>
        <label>
            <span>Contrasenya: </span>
            <input type="password" required  />
        </label>
        <label>
            <span>Repeteix la contrasenya: </span>
            <input type="password" required  />
        </label>
        <button>Enviar</button>
    </form>
  )
}
