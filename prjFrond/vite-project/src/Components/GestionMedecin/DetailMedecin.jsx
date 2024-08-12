import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './DetailMedecin.css';

// Mapping des valeurs numériques aux noms des jours
const joursDeLaSemaine = [
    'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'
];

const DetailMedecin = () => {
    const { id } = useParams();
    const [medecin, setMedecin] = useState(null);

    useEffect(() => {
        const fetchMedecin = async () => {
            try {
                const response = await axios.get(`http://localhost:3305/api/medecins/${id}`);
                setMedecin(response.data);
            } catch (error) {
                console.error("Il y a eu une erreur lors de la récupération du médecin !", error);
            }
        };

        fetchMedecin();
    }, [id]);

    if (!medecin) {
        return <p>Chargement...</p>;
    }

    return (
        <div className="detail-medecin-container">
            <h2>Détails du Médecin</h2>
            <p><strong>Prénom:</strong> {medecin.Prenom}</p>
            <p><strong>Nom:</strong> {medecin.Nom}</p>
            <p><strong>Spécialité:</strong> {medecin.Specialite}</p>
            {medecin.Disponibilites && medecin.Disponibilites.length > 0 ? (
                <div className="disponibilites">
                    <h3>Disponibilités</h3>
                    {medecin.Disponibilites.map((disponibilite, index) => (
                        <div key={index} className="disponibilite-item">
                            <p><strong>Jour:</strong> {joursDeLaSemaine[disponibilite.Jour]}</p>
                            <p><strong>Heure de début:</strong> {disponibilite.HeureDebut}</p>
                            <p><strong>Heure de fin:</strong> {disponibilite.HeureFin}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Aucune disponibilité disponible</p>
            )}
        </div>
    );
};

export default DetailMedecin;
