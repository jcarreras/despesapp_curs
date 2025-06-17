import { Link } from "react-router-dom"
import './Navbar.css'
import { logoutUser, isUserLoggedIn } from "../../firebase/firebase";
import { useEffect, useState } from "react";

export default function Navbar() {

  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const logout = ()=>{
    console.log("logout");
    logoutUser()
      .then(
        setUserLoggedIn(false)
        //nagigate /home
      );
  };

 
  useEffect(()=> {
      isUserLoggedIn((user)=>{
        if(user){
          // console.log(user.uid);
          // console.log(user.email);
          setUserLoggedIn(true);
        }
          
      })
  }, []);

  return (
    <nav className="navbar">
        <ul>
        <li className="titol"><Link to="/">Benvingut a la meva App de despeses</Link></li>
        <li><Link to="/">Projectes</Link></li>
        <li><Link to="/gestioparticipants">Participants</Link></li>
        <li><Link to="/gestiodespeses">Despeses</Link></li>
        {!userLoggedIn &&
          (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Registrar-se</Link></li>
            </>
          )
        }
        
        {userLoggedIn &&
          (
            <>
              <li><Link to="/register">Registrar-se</Link></li>
              <li><Link onClick={ ()=> logout()}>Tancar sessió</Link></li>
            </>
          )
        }
        </ul>
    </nav>
  )
}
