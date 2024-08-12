import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './ModifierLit.css';

const ModifierLit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [lit, setLit] = useState({
        numeroLit: '',
        estOccupe: false,
        patientId: '',
        departementNom: ''
    });
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLit = async () => {
            try {
                const response = await axios.get(`http://localhost:3305/api/lits/${id}`);
                console.log("Réponse de l'API :", response.data);
                const litData = response.data;

                const updatedLit = {
                    numeroLit: litData.numeroLit || '',
                    estOccupe: litData.estOccupe || false,
                    patientId: litData.patientId || '',
                    departementNom: litData.departementNom || ''
                };

                console.log("Lit Data to be set: ", updatedLit);
                setLit(updatedLit);
                setLoading(false);
            } catch (error) {
                console.error("Il y a eu une erreur lors de la récupération du lit !", error);
                setLoading(false);
            }
        };

        const fetchPatients = async () => {
            try {
                const response = await axios.get('http://localhost:3305/api/patients');
                setPatients(response.data);
            } catch (error) {
                console.error("Il y a eu une erreur lors de la récupération des patients !", error);
            }
        };

        fetchLit();
        fetchPatients();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLit(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCheckboxChange = (e) => {
        setLit(prevState => ({
            ...prevState,
            estOccupe: e.target.checked,
            patientId: e.target.checked ? prevState.patientId : ''
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const litData = {
            numeroLit: lit.numeroLit || '',
            estOccupe: lit.estOccupe,
            patientId: lit.estOccupe ? lit.patientId : null,
            departementNom: lit.departementNom || ''
        };

        console.log("Lit Data to be sent: ", litData);

        try {
            await axios.put(`http://localhost:3305/api/lits/${id}`, litData);
            console.log("Réponse de l'API :", litData);
            alert('Lit mis à jour avec succès');
            navigate('/lits');
        } catch (error) {
            console.error("Il y a eu une erreur lors de la mise à jour du lit !", error);
        }
    };

    if (loading) {
        return <p>Chargement...</p>;
    }

    return (
        <div className="modifier-lit-container">
            <h2>Mettre à jour le Lit</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Numéro du Lit:</label>
                    <input
                        type="text"
                        name="numeroLit"
                        value={lit.numeroLit}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Est Occupé:</label>
                    <input
                        type="checkbox"
                        name="estOccupe"
                        checked={lit.estOccupe}
                        onChange={handleCheckboxChange}
                    />
                </div>
                {lit.estOccupe && (
                    <div className="form-group">
                        <label>Patient:</label>
                        <select
                            name="patientId"
                            value={lit.patientId}
                            onChange={handleChange}
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
                        name="departementNom"
                        value={lit.departementNom}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Mettre à jour</button>
            </form>
        </div>
    );
};

export default ModifierLit;
