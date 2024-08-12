import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AjoutMedecin.css';

const joursDeLaSemaine = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

const AjoutMedecin = () => {
    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');
    const [specialite, setSpecialite] = useState('');
    const [departementNom, setDepartementNom] = useState('');
    const [disponibilites, setDisponibilites] = useState([{ jour: '', heureDebut: '', heureFin: '' }]);
    const [departements, setDepartements] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDepartements = async () => {
            try {
                const response = await axios.get('http://localhost:3305/api/departements');
                setDepartements(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des départements :", error);
            }
        };
        fetchDepartements();
    }, []);

    const handleDisponibiliteChange = (index, field, value) => {
        const newDisponibilites = [...disponibilites];
        newDisponibilites[index][field] = value;
        setDisponibilites(newDisponibilites);
    };

    const handleAddDisponibilite = () => {
        setDisponibilites([...disponibilites, { jour: '', heureDebut: '', heureFin: '' }]);
    };

    const handleRemoveDisponibilite = (index) => {
        const newDisponibilites = disponibilites.filter((_, i) => i !== index);
        setDisponibilites(newDisponibilites);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        for (let dispo of disponibilites) {
            if (!dispo.jour || !dispo.heureDebut || !dispo.heureFin) {
                setError("Tous les champs de disponibilité doivent être remplis.");
                return;
            }
        }

        const newMedecin = {
            prenom,
            nom,
            specialite,
            departementNom,
            disponibilites
        };

        console.log("Données envoyées : ", JSON.stringify(newMedecin, null, 2));

        try {
            const response = await axios.post('http://localhost:3305/api/medecins', newMedecin);
            console.log("Réponse de l'API :", response.data);

            setPrenom('');
            setNom('');
            setSpecialite('');
            setDepartementNom('');
            setDisponibilites([{ jour: '', heureDebut: '', heureFin: '' }]);
            setError('');
        } catch (error) {
            console.error("Erreur lors de l'envoi de la requête :", error);
            if (error.response) {
                setError(error.response.data.message || "Il y a eu une erreur lors de l'ajout du médecin.");
            } else {
                setError("Il y a eu une erreur lors de l'ajout du médecin.");
            }
        }
    };

    return (
        <div className="ajout-medecin-container">
            <h2>Ajouter un Médecin</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Prénom:</label>
                    <input
                        type="text"
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Nom:</label>
                    <input
                        type="text"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Spécialité:</label>
                    <input
                        type="text"
                        value={specialite}
                        onChange={(e) => setSpecialite(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Département:</label>
                    <select
                        value={departementNom}
                        onChange={(e) => setDepartementNom(e.target.value)}
                        required
                    >
                        <option value="">Sélectionner un département</option>
                        {departements.map((dept) => (
                            <option key={dept.Nom} value={dept.Nom}>{dept.Nom}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Disponibilités:</label>
                    {disponibilites.map((disponibilite, index) => (
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
                {error && <div className="error-message">{error}</div>}
                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
};

export default AjoutMedecin;