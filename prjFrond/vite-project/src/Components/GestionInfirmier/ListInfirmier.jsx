import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ListInfirmier = () => {
    const [infirmiers, setInfirmiers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInfirmiers = async () => {
            try {
                const response = await axios.get('http://localhost:3305/api/infirmiers');
                setInfirmiers(response.data);
            } catch (error) {
                console.error("Il y a eu une erreur lors de la récupération des infirmiers !", error);
            }
        };

        fetchInfirmiers();
    }, []);

    const handleView = (id) => {
        navigate(`/viewinfirmier/${id}`);
    };

    const handleEdit = (id) => {
        navigate(`/updateinfirmier/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3305/api/infirmiers/${id}`);
            setInfirmiers(infirmiers.filter(infirmier => infirmier.Id !== id));
            alert('Infirmier supprimé avec succès');
        } catch (error) {
            console.error("Il y a eu une erreur lors de la suppression de l'infirmier !", error);
        }
    };

    return (
        <div>
            <h2>Liste des Infirmiers</h2>
            {infirmiers.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Prénom</th>
                            <th>Nom</th>
                            <th>Département</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {infirmiers.map(infirmier => (
                            <tr key={infirmier.Id}>
                                <td>{infirmier.Prenom}</td>
                                <td>{infirmier.Nom}</td>
                                <td>{infirmier.Departement}</td>
                                <td>
                                    <button onClick={() => handleView(infirmier.Id)}>Voir</button>
                                    <button onClick={() => handleEdit(infirmier.Id)}>Modifier</button>
                                    <button onClick={() => handleDelete(infirmier.Id)}>Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Aucun infirmier trouvé.</p>
            )}
        </div>
    );
};

export default ListInfirmier;
