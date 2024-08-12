import React from 'react';
import '../styles/Navbar.css'
const Navigation = () => {
    return (
        <nav className="navbarprin navbar-light colprin">
            <ul className="navprin-list">
                <li><a href="/">Accueil</a></li>
                <li><a href="/login">Se connecter</a></li>
                <li><a href="#">À propos</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </nav>
    );
};

export default Navigation;
