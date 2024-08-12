import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ModifierPersonnel = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [personnel, setPersonnel] = useState({
        prenom: '',
        nom: '',
        role: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPersonnel = async () => {
            try {
                const response = await axios.get(`http://localhost:3305/api/personnel/${id}`);
                console.log("Réponse de l'API :", response.data);
                const personnelData = response.data;

                const updatedPersonnel = {
                    prenom: personnelData.Prenom || '',
                    nom: personnelData.Nom || '',
                    role: personnelData.Role || ''
                };

                console.log("Personnel Data to be set: ", updatedPersonnel);
                setPersonnel(updatedPersonnel);
                setLoading(false);
            } catch (error) {
                console.error("Il y a eu une erreur lors de la récupération du personnel !", error);
                setLoading(false);
            }
        };

        fetchPersonnel();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPersonnel(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const personnelData = {
            prenom: personnel.prenom || '',
            nom: personnel.nom || '',
            role: personnel.role || ''
        };

        console.log("Personnel Data to be sent: ", personnelData);

        try {
            await axios.put(`http://localhost:3305/api/personnel/${id}`, personnelData);
            console.log("Réponse de l'API :", personnelData);
            alert('Personnel mis à jour avec succès');
            navigate('/personnels');
        } catch (error) {
            console.error("Il y a eu une erreur lors de la mise à jour du personnel !", error);
        }
    };

    if (loading) {
        return <p>Chargement...</p>;
    }

    return (
        <div>
            <h2>Mettre à jour le Personnel</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Prénom:</label>
                    <input
                        type="text"
                        name="prenom"
                        value={personnel.prenom}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Nom:</label>
                    <input
                        type="text"
                        name="nom"
                        value={personnel.nom}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Rôle:</label>
                    <input
                        type="text"
                        name="role"
                        value={personnel.role}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Mettre à jour</button>
            </form>
        </div>
    );
};

export default ModifierPersonnel;
