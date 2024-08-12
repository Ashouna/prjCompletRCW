import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './ModifierMedecin.css';

const joursDeLaSemaine = [
    'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'
];

const ModifierMedecin = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [medecin, setMedecin] = useState({
        prenom: '',
        nom: '',
        specialite: '',
        departementNom: '',  // Ajout du champ DepartementNom
        disponibilites: [{ jour: '', heureDebut: '', heureFin: '' }]
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMedecin = async () => {
            try {
                const response = await axios.get(`http://localhost:3305/api/medecins/${id}`);
                console.log("Réponse de l'API :", response.data);
                const medecinData = response.data;

                const updatedMedecin = {
                    prenom: medecinData.Prenom || '',
                    nom: medecinData.Nom || '',
                    specialite: medecinData.Specialite || '',
                    departementNom: medecinData.DepartementNom || '',
                    disponibilites: medecinData.Disponibilites || [{ jour: '', heureDebut: '', heureFin: '' }]
                };

                console.log("Medecin Data to be set: ", updatedMedecin);
                setMedecin(updatedMedecin);
                setLoading(false);
            } catch (error) {
                console.error("Il y a eu une erreur lors de la récupération du médecin !", error);
                setLoading(false);
            }
        };

        fetchMedecin();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMedecin(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDisponibiliteChange = (index, field, value) => {
        const newDisponibilites = [...medecin.disponibilites];
        newDisponibilites[index][field] = value;
        setMedecin(prevState => ({
            ...prevState,
            disponibilites: newDisponibilites
        }));
    };

    const handleAddDisponibilite = () => {
        setMedecin(prevState => ({
            ...prevState,
            disponibilites: [...prevState.disponibilites, { jour: '', heureDebut: '', heureFin: '' }]
        }));
    };

    const handleRemoveDisponibilite = (index) => {
        const newDisponibilites = medecin.disponibilites.filter((_, i) => i !== index);
        setMedecin(prevState => ({
            ...prevState,
            disponibilites: newDisponibilites
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const medecinData = {
            prenom: medecin.prenom || '',
            nom: medecin.nom || '',
            specialite: medecin.specialite || '',
            departementNom: medecin.departementNom || '',
            disponibilites: medecin.disponibilites
        };

        console.log("Medecin Data to be sent: ", JSON.stringify(medecinData, null, 2));

        try {
            await axios.put(`http://localhost:3305/api/medecins/${id}`, medecinData);
            console.log("Réponse de l'API :", medecinData);
            alert('Médecin mis à jour avec succès');
            navigate('/medecins');
        } catch (error) {
            console.error("Il y a eu une erreur lors de la mise à jour du médecin !", error);
        }
    };

    if (loading) {
        return <p>Chargement...</p>;
    }

    return (
        <div className="modifier-medecin-container">
            <h2>Mettre à jour le Médecin</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Prénom:</label>
                    <input
                        type="text"
                        name="prenom"
                        value={medecin.prenom}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Nom:</label>
                    <input
                        type="text"
                        name="nom"
                        value={medecin.nom}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Spécialité:</label>
                    <input
                        type="text"
                        name="specialite"
                        value={medecin.specialite}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Département:</label>
                    <input
                        type="text"
                        name="departementNom"
                        value={medecin.departementNom}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Disponibilités:</label>
                    {medecin.disponibilites.map((disponibilite, index) => (
                        <div key={index} className="disponibilite-group">
                            <div className="form-group">
                                <label>Jour:</label>
                                <select
                                    value={disponibilite.jour}
                                    onChange={(e) => handleDisponibiliteChange(index, 'jour', e.target.value)}
                                    required
                                >
                                    <option value="">Sélectionner un jour</option>
                                    {joursDeLaSemaine.map((jour, idx) => (
                                        <option key={idx} value={jour}>{jour}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Heure de début:</label>
                                <input
                                    type="time"
                                    value={disponibilite.heureDebut}
                                    onChange={(e) => handleDisponibiliteChange(index, 'heureDebut', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Heure de fin:</label>
                                <input
                                    type="time"
                                    value={disponibilite.heureFin}
                                    onChange={(e) => handleDisponibiliteChange(index, 'heureFin', e.target.value)}
                                    required
                                />
                            </div>
                            <button type="button" onClick={() => handleRemoveDisponibilite(index)}>Supprimer cette disponibilité</button>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddDisponibilite}>Ajouter une disponibilité</button>
                </div>
                <button type="submit">Mettre à jour</button>
            </form>
        </div>
    );
};

export default ModifierMedecin;
