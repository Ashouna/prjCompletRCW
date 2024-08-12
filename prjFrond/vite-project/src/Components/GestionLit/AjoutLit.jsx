import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AjoutLit.css';

const AjoutLit = () => {
    const [numeroLit, setNumeroLit] = useState('');
    const [estOccupe, setEstOccupe] = useState(false);
    const [patientId, setPatientId] = useState('');
    const [departementNom, setDepartementNom] = useState('');
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get('http://localhost:3305/api/patients');
                setPatients(response.data);
            } catch (error) {
                console.error("Il y a eu une erreur lors de la récupération des patients !", error);
            }
        };

        fetchPatients();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newLit = {
            numeroLit,
            estOccupe,
            patientId: estOccupe ? patientId : null,
            departementNom
        };

        console.log("Envoi des données du lit :", newLit);

        try {
            const response = await axios.post('http://localhost:3305/api/lits', newLit);
            console.log("Réponse de l'API :", response.data);

            setNumeroLit('');
            setEstOccupe(false);
            setPatientId('');
            setDepartementNom('');
        } catch (error) {
            console.error("Il y a eu une erreur!", error);
            if (error.response) {
                console.log("Erreur serveur :", error.response.data);
            }
        }
    };

    return (
        <div className="ajout-lit-container">
            <h2>Ajouter un Lit</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Numéro du Lit:</label>
                    <input
                        type="text"
                        value={numeroLit}
                        onChange={(e) => setNumeroLit(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Est Occupé:</label>
                    <input
                        type="checkbox"
                        checked={estOccupe}
                        onChange={(e) => setEstOccupe(e.target.checked)}
                    />
                </div>
                {estOccupe && (
                    <div className="form-group">
                        <label>Patient:</label>
                        <select
                            value={patientId}
                            onChange={(e) => setPatientId(e.target.value)}
                            required
                        >
                            <option value="">Sélectionner un patient</option>
                            {patients.map(patient => (
                                <option key={patient.Id} value={patient.Id}>
                                    {patient.Prenom} {patient.Nom}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                <div className="form-group">
                    <label>Nom du Département:</label>
                    <input
                        type="text"
                        value={departementNom}
                        onChange={(e) => setDepartementNom(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
};

export default AjoutLit;
