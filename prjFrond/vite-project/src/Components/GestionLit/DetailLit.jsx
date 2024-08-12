import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './DetailLit.css';

const DetailLit = () => {
    const { id } = useParams();
    const [lit, setLit] = useState(null);
    const [patient, setPatient] = useState(null);

    useEffect(() => {
        const fetchLit = async () => {
            try {
                const response = await axios.get(`http://localhost:3305/api/lits/${id}`);
                setLit(response.data);
                if (response.data.estOccupe) {
                    fetchPatient(response.data.patientId);
                }
            } catch (error) {
                console.error("Il y a eu une erreur lors de la récupération du lit !", error);
            }
        };

        const fetchPatient = async (patientId) => {
            try {
                const response = await axios.get(`http://localhost:3305/api/patients/${patientId}`);
                setPatient(response.data);
            } catch (error) {
                console.error("Il y a eu une erreur lors de la récupération du patient !", error);
            }
        };

        fetchLit();
    }, [id]);

    if (!lit) {
        return <p>Chargement...</p>;
    }

    return (
        <div className="detail-lit-container">
            <h2>Détails du Lit</h2>
            <p><strong>Numéro du Lit:</strong> {lit.numeroLit}</p>
            <p><strong>Est Occupé:</strong> {lit.estOccupe ? 'Oui' : 'Non'}</p>
            {lit.estOccupe && patient && (
                <p><strong>Patient:</strong> {patient.Prenom} {patient.Nom}</p>
            )}
            <p><strong>Nom du Département:</strong> {lit.departementNom}</p>
        </div>
    );
};

export default DetailLit;
