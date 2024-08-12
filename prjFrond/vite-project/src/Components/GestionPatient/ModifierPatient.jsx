import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './ModifierPatient.css';

const ModifierPatient = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [patient, setPatient] = useState({
        prenom: '',
        nom: '',
        dateNaissance: '',
        telephone: '',
        adresse: {
            rue: '',
            ville: '',
            codePostal: '',
            province: '',
            pays: ''
        }
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const response = await axios.get(`http://localhost:3305/api/patients/${id}`);
                console.log("Réponse de l'API :", response.data);
                const patientData = response.data;

                const adresse = {
                    rue: patientData.Adresse?.Rue || '',
                    ville: patientData.Adresse?.Ville || '',
                    codePostal: patientData.Adresse?.CodePostal || '',
                    province: patientData.Adresse?.Province || '',
                    pays: patientData.Adresse?.Pays || ''
                };

                const updatedPatient = {
                    prenom: patientData.Prenom || '',
                    nom: patientData.Nom || '',
                    dateNaissance: patientData.DateNaissance ? patientData.DateNaissance.split('T')[0] : '',
                    telephone: patientData.Telephone || '',
                    adresse: adresse
                };

                console.log("Patient Data to be set: ", updatedPatient);
                setPatient(updatedPatient);
                setLoading(false);
            } catch (error) {
                console.error("Il y a eu une erreur lors de la récupération du patient !", error);
                setLoading(false);
            }
        };

        fetchPatient();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPatient(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setPatient(prevState => ({
            ...prevState,
            adresse: {
                ...prevState.adresse,
                [name]: value
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const patientData = {
            prenom: patient.prenom || '',
            nom: patient.nom || '',
            dateNaissance: patient.dateNaissance || '',
            telephone: patient.telephone || '',
            adresse: {
                rue: patient.adresse.rue || '',
                ville: patient.adresse.ville || '',
                codePostal: patient.adresse.codePostal || '',
                province: patient.adresse.province || '',
                pays: patient.adresse.pays || ''
            }
        };

        console.log("Patient Data to be sent: ", patientData);

        try {
            await axios.put(`http://localhost:3305/api/patients/${id}`, patientData);
            console.log("Réponse de l'API :", patientData);
            alert('Patient mis à jour avec succès');
            navigate('/');
        } catch (error) {
            console.error("Il y a eu une erreur lors de la mise à jour du patient !", error);
        }
    };

    if (loading) {
        return <p>Chargement...</p>;
    }

    return (
        <div className="modifier-patient-container">
            <h2>Mettre à jour le Patient</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Prénom:</label>
                    <input
                        type="text"
                        name="prenom"
                        value={patient.prenom}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Nom:</label>
                    <input
                        type="text"
                        name="nom"
                        value={patient.nom}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Date de Naissance:</label>
                    <input
                        type="date"
                        name="dateNaissance"
                        value={patient.dateNaissance}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Téléphone:</label>
                    <input
                        type="text"
                        name="telephone"
                        value={patient.telephone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Rue:</label>
                    <input
                        type="text"
                        name="rue"
                        value={patient.adresse.rue}
                        onChange={handleAddressChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Ville:</label>
                    <input
                        type="text"
                        name="ville"
                        value={patient.adresse.ville}
                        onChange={handleAddressChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Code Postal:</label>
                    <input
                        type="text"
                        name="codePostal"
                        value={patient.adresse.codePostal}
                        onChange={handleAddressChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Province:</label>
                    <input
                        type="text"
                        name="province"
                        value={patient.adresse.province}
                        onChange={handleAddressChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Pays:</label>
                    <input
                        type="text"
                        name="pays"
                        value={patient.adresse.pays}
                        onChange={handleAddressChange}
                        required
                    />
                </div>
                <button type="submit">Mettre à jour</button>
            </form>
        </div>
    );
};

export default ModifierPatient;
