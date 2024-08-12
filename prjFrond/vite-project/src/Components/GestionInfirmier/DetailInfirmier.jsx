import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DetailInfirmier = () => {
    const { id } = useParams();
    const [infirmier, setInfirmier] = useState(null);

    useEffect(() => {
        const fetchInfirmier = async () => {
            try {
                const response = await axios.get(`http://localhost:3305/api/infirmiers/${id}`);
                setInfirmier(response.data);
            } catch (error) {
                console.error("Il y a eu une erreur lors de la récupération de l'infirmier !", error);
            }
        };

        fetchInfirmier();
    }, [id]);

    if (!infirmier) {
        return <p>Chargement...</p>;
    }

    return (
        <div>
            <h2>Détails de l'Infirmier</h2>
            <p><strong>Prénom:</strong> {infirmier.Prenom}</p>
            <p><strong>Nom:</strong> {infirmier.Nom}</p>
            <p><strong>Département:</strong> {infirmier.Departement}</p>
            {infirmier.Adresse ? (
                <div>
                    <h3>Adresse</h3>
                    <p><strong>Rue:</strong> {infirmier.Adresse.Rue}</p>
                    <p><strong>Ville:</strong> {infirmier.Adresse.Ville}</p>
                    <p><strong>Code Postal:</strong> {infirmier.Adresse.CodePostal}</p>
                    <p><strong>Province:</strong> {infirmier.Adresse.Province}</p>
                    <p><strong>Pays:</strong> {infirmier.Adresse.Pays}</p>
                </div>
            ) : (
                <p>Aucune adresse disponible</p>
            )}
            {infirmier.Disponibilites && infirmier.Disponibilites.length > 0 ? (
                <div>
                    <h3>Disponibilités</h3>
                    {infirmier.Disponibilites.map((disponibilite, index) => (
                        <div key={index}>
                            <p><strong>Jour:</strong> {disponibilite.jour}</p>
                            <p><strong>Heure de début:</strong> {disponibilite.heureDebut}</p>
                            <p><strong>Heure de fin:</strong> {disponibilite.heureFin}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Aucune disponibilité disponible</p>
            )}
        </div>
    );
};

export default DetailInfirmier;
