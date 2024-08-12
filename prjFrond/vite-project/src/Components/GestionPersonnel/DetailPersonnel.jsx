import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DetailPersonnel = () => {
    const { id } = useParams();
    const [personnel, setPersonnel] = useState(null);

    useEffect(() => {
        const fetchPersonnel = async () => {
            try {
                const response = await axios.get(`http://localhost:3305/api/personnel/${id}`);
                setPersonnel(response.data);
            } catch (error) {
                console.error("Il y a eu une erreur lors de la récupération du personnel !", error);
            }
        };

        fetchPersonnel();
    }, [id]);

    if (!personnel) {
        return <p>Chargement...</p>;
    }

    return (
        <div>
            <h2>Détails du Personnel</h2>
            <p><strong>Prénom:</strong> {personnel.Prenom}</p>
            <p><strong>Nom:</strong> {personnel.Nom}</p>
            <p><strong>Rôle:</strong> {personnel.Role}</p>
        </div>
    );
};

export default DetailPersonnel;
