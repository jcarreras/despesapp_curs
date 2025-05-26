
import { useState } from 'react';
import './Login.css';

export default function Login() {

  // const [email, validarEmail] = useState("");
  // const [contrasenya, validarPassword] = useState("");
  
  const resetForm = () => {
          // validarEmail("");
          // validarPassword("");
  }
  const validarLogin = (e) => {
        e.preventDefault();
        // const validacio = {
        //   email: email,
        //   contrasenya: contrasenya,
        // }
        // console.log(validacio);
        resetForm();
  };
  return (
      <form className='despesa-login-form' onSubmit={validarLogin}>
          <label>
              <span>Correu: </span>
              <input type="email" name="usuari"  />
          </label>
          <label>
              <span>Contrasenya: </span>
              <input type="password" name="contrasenya"  />
          </label>
          <button>Entrar</button>
      </form>
  )
}
