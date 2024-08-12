import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Login.css';
import Navigation from '../composant/Navigation';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const url = 'http://127.0.0.1:5000/api';

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [pswd, setPswd] = useState('');
    const [username, setUsername] = useState('');
    const [confPswd, setConfPswd] = useState('');
    const [sexe, setSexe] = useState('');
    const [telephone, setPhone] = useState('');
    const [msg, setMsg] = useState('');
    const [date, setDate] = useState('');

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const creation = async (e) => {
        e.preventDefault();
        if (!email || !pswd || !confPswd || !telephone || !sexe || !date || !username) {
            setMsg('Veuillez remplir tous les champs.');
            return;
        }
        if (pswd !== confPswd) {
            setMsg('Les mots de passe ne correspondent pas.');
            return;
        }

        const newUser = {
            nom: name,
            prenom: username,
            password: pswd,
            email: email,
            telephone: telephone,
            sexe: sexe,
            date: date
        };

        try {
            const response = await axios.post(`${url}/register`, newUser);
            if (response.data.success === 'False') {
                setMsg('Utilisateur existant déjà.');
            } else {
                navigate('/login');
            }
        } catch (error) {
            setMsg('Erreur lors de la création : ' + error.message);
        }
    };

    return (
        <div>
            <Navigation />
            <div>
                <img src="../titre.png" alt="chat" width="200" height="90" />
            </div>
            <div className="login-page" style={{ marginTop: 190 }}>
                <div className="login-box">
                    <h2>Inscription</h2>
                    <p style={{ color: 'red' }}>{msg}</p>
                    <form onSubmit={creation}>
                        <div className="user-box">
                            <label>Nom</label>
                            <input type="text" required onChange={handleInputChange(setName)} />
                        </div>
                        <div className="user-box">
                            <label>Prénom</label>
                            <input type="text" required onChange={handleInputChange(setUsername)} />
                        </div>
                        <div className="user-box">
                            <label>Date de Naissance</label>
                            <input type="date" required onChange={handleInputChange(setDate)} />
                        </div>
                        <div className="user-box">
                            <label>Email</label>
                            <input type="email" required onChange={handleInputChange(setEmail)} />
                        </div>
                        <div className="user-box">
                            <label>Sexe</label>
                            <label>Homme  <input type="radio" name="sexe" value="Homme" required onChange={handleInputChange(setSexe)} /> </label>&nbsp;&nbsp;
                            <label>Femme <input type="radio" value="Femme" name="sexe" required onChange={handleInputChange(setSexe)} /> </label>
                        </div>
                        <div className="user-box">
                            <label>Téléphone</label>
                            <input type="text" required onChange={handleInputChange(setPhone)} />
                        </div>
                        <div className="user-box">
                            <label>Mot de passe</label>
                            <input type="password" required onChange={handleInputChange(setPswd)} />
                        </div>
                        <div className="user-box">
                            <label>Confirmer Mot de passe</label>
                            <input type="password" required onChange={handleInputChange(setConfPswd)} />
                        </div>
                        <button className="butonlogin" type="submit">Inscription</button>
                    </form>
                    <a href="/login">se connecter?</a>
                </div>
            </div>
        </div>
    );
}

export default Register;
