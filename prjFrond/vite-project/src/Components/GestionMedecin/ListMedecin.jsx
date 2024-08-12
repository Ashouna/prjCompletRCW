import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ListMedecin.css';

const ListMedecin = () => {
    const [medecins, setMedecins] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMedecins = async () => {
            try {
                const response = await axios.get('http://localhost:3305/api/medecins');
                setMedecins(response.data);
            } catch (error) {
                console.error("Il y a eu une erreur lors de la récupération des médecins !", error);
            }
        };

        fetchMedecins();
    }, []);

    const handleView = (id) => {
        navigate(`/viewmedecin/${id}`);
    };

    const handleEdit = (id) => {
        navigate(`/updatemedecin/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3305/api/medecins/${id}`);
            setMedecins(medecins.filter(medecin => medecin.Id !== id));
            alert('Médecin supprimé avec succès');
        } catch (error) {
            console.error("Il y a eu une erreur lors de la suppression du médecin !", error);
        }
    };

    return (
        <div className="list-medecin-container">
            <h2>Liste des Médecins</h2>
            {medecins.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Prénom</th>
                            <th>Nom</th>
                            <th>Spécialité</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medecins.map(medecin => (
                            <tr key={medecin.Id}>
                                <td>{medecin.Prenom}</td>
                                <td>{medecin.Nom}</td>
                                <td>{medecin.Specialite}</td>
                                <td>
                                    <button onClick={() => handleView(medecin.Id)}>Voir</button>
                                    <button onClick={() => handleEdit(medecin.Id)}>Modifier</button>
                                    <button className="delete-button" onClick={() => handleDelete(medecin.Id)}>Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Aucun médecin trouvé.</p>
            )}
        </div>
    );
};

export default ListMedecin;
