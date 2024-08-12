import React from 'react';
import Navigation from '../composant/Navigation';
import Carrousel from '../composant/Carrousel';
import '../styles/acceuil.css';

function Acceuil() {
    return (
        <div style={{ backgroundColor: 'whitesmoke' }}>
            <div>
                <Carrousel />
            </div>
            <div className="card-container">
                <div className="card">
                    <img src="../img1.jpg" alt="Image 1" width={800} height={300} />
                    <div className="card-content">
                        <h3>Qui sommes-nous</h3>
                        <p>Présentation de l'équipe médicale et de notre mission.</p>
                    </div>
                </div>
                <div className="card">
                    <img src="../doctor1.jpg" alt="Image 1" width={800} height={300} />
                    <div className="card-content">
                        <h3>Dr. Steve Ataky</h3>
                        <p>Cardiologue avec 20 ans d'expérience.</p>
                    </div>
                </div>
                <div className="card">
                    <img src="../department3.jpg" alt="Image 1" width={800} height={300} />
                    <div className="card-content">
                        <h3>Département de Cardiologie</h3>
                        <p>Offrant des soins de qualité pour les maladies cardiovasculaires.</p>
                    </div>
                </div>
                {/* Ajoutez plus de cartes ici selon vos besoins */}
            </div>
        </div>
    );
}

export default Acceuil;
