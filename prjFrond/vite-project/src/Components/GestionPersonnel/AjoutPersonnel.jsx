import React, { useState } from 'react';
import axios from 'axios';

const AjoutPersonnel = () => {
    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPersonnel = {
            prenom,
            nom,
            role
        };

        console.log("Envoi des données du personnel :", newPersonnel);

        try {
            const response = await axios.post('http://localhost:3305/api/personnel', newPersonnel);
            console.log("Réponse de l'API :", response.data);

            setPrenom('');
            setNom('');
            setRole('');
        } catch (error) {
            console.error("Il y a eu une erreur!", error);
        }
    };

    return (
        <div>
            <h2>Ajouter un Personnel</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Prénom:</label>
                    <input
                        type="text"
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Nom:</label>
                    <input
                        type="text"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Rôle:</label>
                    <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
};

export default AjoutPersonnel;
