import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './DetailPatient.css';

const DetailPatient = () => {
    const { id } = useParams();
    const [patient, setPatient] = useState(null);

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const response = await axios.get(`http://localhost:3305/api/patients/${id}`);
                setPatient(response.data);
            } catch (error) {
                console.error("Il y a eu une erreur lors de la récupération du patient !", error);
            }
        };

        fetchPatient();
    }, [id]);

    if (!patient) {
        return <p>Chargement...</p>;
    }

    return (
        <div className="detail-patient-container">
            <h2>Détails du Patient</h2>
            <p><strong>Prénom:</strong> {patient.prenom}</p>
            <p><strong>Nom:</strong> {patient.nom}</p>
            <p><strong>Date de Naissance:</strong> {new Date(patient.dateNaissance).toLocaleDateString()}</p>
            <p><strong>Téléphone:</strong> {patient.telephone}</p>
            {patient.adresse ? (
                <div className="address-section">
                    <h3>Adresse</h3>
                    <p><strong>Rue:</strong> {patient.adresse.rue}</p>
                    <p><strong>Ville:</strong> {patient.adresse.ville}</p>
                    <p><strong>Code Postal:</strong> {patient.adresse.codePostal}</p>
                    <p><strong>Province:</strong> {patient.adresse.province}</p>
                    <p><strong>Pays:</strong> {patient.adresse.pays}</p>
                </div>
            ) : (
                <p>Aucune adresse disponible</p>
            )}
        </div>
    );
};

export default DetailPatient;
