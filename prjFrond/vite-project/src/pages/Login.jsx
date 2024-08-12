import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import Navigation from '../composant/Navigation';

function Login() {
    const navigate = useNavigate();
    const url = 'http://127.0.0.1:5000/api'
    //creation d'un usestate pour chaque attribut d'un user 
    const [email, setemail] = useState('')
    const [pswd, setpswd] = useState('')
    const [msg, setmsg] = useState('')
    //fonction qui permet de modifier la valeur du email
    const emailchange = (e) => {
        setemail(e.target.value)
    }
    //fonction qui permet de modifier la valeur du mot de passe 
    const pswdchange = (e) => {
        setpswd(e.target.value)
    }
    const login = async (e) => {
        try {
            e.preventDefault()
            if (email === "") {
                setmsg("email ivalid")
                return
            }
            if (pswd === "") {
                setmsg("mot de passe ivalid")
                return
            }

            const newuser = {
                'password': pswd,
                'email': email
            }

            const response = await axios.post(`${url}/login`, newuser);
            // console.log(response)

            // Vérifiez la réponse du serveur et réagissez en conséquence
            if (response.data.success === 'True') {
                console.log(response.data.data)
                const val_id = response.data.data.patient_id
                const val_prenom_nom = response.data.data.prenom + " " + response.data.data.nom
                const val_email = response.data.data.email
                const val_nom = response.data.data.nom
                const val_prenom = response.data.data.prenom

                sessionStorage.setItem('val_id', val_id)
                sessionStorage.setItem('val_prenom_nom', val_prenom_nom)
                sessionStorage.setItem('val_mail', val_email)
                sessionStorage.setItem('val_nom', val_nom)
                sessionStorage.setItem('val_prenom', val_prenom)
                navigate('/dashboard')
            }
            else {
                setmsg('email ou mot de passe invalid')
            }
        } catch (error) {
            setmsg('Erreur du serveur  ', error);
        }
    }
    return (
        <div>
            <Navigation />

            <div className="login-page bodylogin">
                <img src="../titre.png" alt="chat" width="200" height="90"></img>
                <div className="login-box">
                    <h2>Connexion</h2>
                    <p style={{ color: 'red' }}>{msg}</p>
                    <form onSubmit={login}>
                        <div className="user-box">
                            <label>Email</label>
                            <input type="email" required="" onChange={emailchange} />
                        </div>
                        <div className="user-box">
                            <label>Mot de passe</label>
                            <input type="password" required="" onChange={pswdchange} />
                        </div>
                        <button className='butonlogin' type='submit'>Connexion</button>
                    </form>
                    <a href='/register'>vous n'avez pas de Compte?</a>
                </div>

            </div>
            <br>
            </br>
            <br>
            </br>
        </div>
    );
}

export default Login;
