import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ListLit.css';

const ListLit = () => {
    const [lits, setLits] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLits = async () => {
            try {
                const response = await axios.get('http://localhost:3305/api/lits');
                console.log("Lits récupérés :", response.data); // Journaliser les données reçues
                setLits(response.data);
            } catch (error) {
                console.error("Il y a eu une erreur lors de la récupération des lits !", error);
            }
        };

        fetchLits();
    }, []);

    const handleView = (id) => {
        navigate(`/viewlit/${id}`);
    };

    const handleEdit = (id) => {
        navigate(`/updatelit/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3305/api/lits/${id}`);
            setLits(lits.filter(lit => lit.Id !== id));
            alert('Lit supprimé avec succès');
        } catch (error) {
            console.error("Il y a eu une erreur lors de la suppression du lit !", error);
        }
    };

    return (
        <div className="list-lit-container">
            <h2>Liste des Lits</h2>
            {lits.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Numéro du Lit</th>
                            <th>Est Occupé</th>
                            {/* <th>ID du Patient</th> */}
                            <th>Nom du Département</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lits.map(lit => (
                            <tr key={lit.Id}>
                                <td>{lit.NumeroLit}</td>
                                <td>{lit.EstOccupe ? 'Oui' : 'Non'}</td>
                                {/* <td>{lit.PatientId}</td> */}
                                <td>{lit.DepartementNom}</td>
                                <td>
                                    <button onClick={() => handleView(lit.Id)}>Voir</button>
                                    <button onClick={() => handleEdit(lit.Id)}>Modifier</button>
                                    <button onClick={() => handleDelete(lit.Id)}>Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Aucun lit trouvé.</p>
            )}
        </div>
    );
};

export default ListLit;
