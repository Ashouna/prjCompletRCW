import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ListPersonnel = () => {
    const [personnels, setPersonnels] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPersonnels = async () => {
            try {
                const response = await axios.get('http://localhost:3305/api/personnel');
                setPersonnels(response.data);
            } catch (error) {
                console.error("Il y a eu une erreur lors de la récupération du personnel !", error);
            }
        };

        fetchPersonnels();
    }, []);

    const handleView = (id) => {
        navigate(`/viewpersonnel/${id}`);
    };

    const handleEdit = (id) => {
        navigate(`/updatepersonnel/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3305/api/personnel/${id}`);
            setPersonnels(personnels.filter(personnel => personnel.Id !== id));
            alert('Personnel supprimé avec succès');
        } catch (error) {
            console.error("Il y a eu une erreur lors de la suppression du personnel !", error);
        }
    };

    return (
        <div>
            <h2>Liste du Personnel</h2>
            {personnels.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Prénom</th>
                            <th>Nom</th>
                            <th>Rôle</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {personnels.map(personnel => (
                            <tr key={personnel.Id}>
                                <td>{personnel.Prenom}</td>
                                <td>{personnel.Nom}</td>
                                <td>{personnel.Role}</td>
                                <td>
                                    <button onClick={() => handleView(personnel.Id)}>Voir</button>
                                    <button onClick={() => handleEdit(personnel.Id)}>Modifier</button>
                                    <button onClick={() => handleDelete(personnel.Id)}>Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Aucun personnel trouvé.</p>
            )}
        </div>
    );
};

export default ListPersonnel;
