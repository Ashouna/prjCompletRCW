import React, { useState } from 'react';
import axios from 'axios';

const AjoutInfirmier = () => {
    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');
    const [departement, setDepartement] = useState('');
    const [rue, setRue] = useState('');
    const [ville, setVille] = useState('');
    const [province, setProvince] = useState('');
    const [codePostal, setCodePostal] = useState('');
    const [pays, setPays] = useState('');
    const [disponibilites, setDisponibilites] = useState([{ jour: '', heureDebut: '', heureFin: '' }]);

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

        const newInfirmier = {
            prenom,
            nom,
            departement,
            adresse: {
                rue,
                ville,
                codePostal,
                province,
                pays,
            },
            disponibilites
        };

        console.log("Envoi des données de l'infirmier :", newInfirmier);

        try {
            const response = await axios.post('http://localhost:3305/api/infirmiers', newInfirmier);
            console.log("Réponse de l'API :", response.data);

            setPrenom('');
            setNom('');
            setDepartement('');
            setRue('');
            setVille('');
            setCodePostal('');
            setProvince('');
            setPays('');
            setDisponibilites([{ jour: '', heureDebut: '', heureFin: '' }]);
        } catch (error) {
            console.error("Il y a eu une erreur!", error);
        }
    };

    return (
        <div>
            <h2>Ajouter un Infirmier</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Prénom:</label>
                    <input
                        type="text"
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Nom:</label>
                    <input
                        type="text"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Département:</label>
                    <input
                        type="text"
                        value={departement}
                        onChange={(e) => setDepartement(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Rue:</label>
                    <input
                        type="text"
                        value={rue}
                        onChange={(e) => setRue(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Ville:</label>
                    <input
                        type="text"
                        value={ville}
                        onChange={(e) => setVille(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Code Postal:</label>
                    <input
                        type="text"
                        value={codePostal}
                        onChange={(e) => setCodePostal(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Province:</label>
                    <input
                        type="text"
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Pays:</label>
                    <input
                        type="text"
                        value={pays}
                        onChange={(e) => setPays(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Disponibilités:</label>
                    {disponibilites.map((disponibilite, index) => (
                        <div key={index}>
                            <div>
                                <label>Jour:</label>
                                <input
                                    type="text"
                                    value={disponibilite.jour}
                                    onChange={(e) => handleDisponibiliteChange(index, 'jour', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label>Heure de début:</label>
                                <input
                                    type="time"
                                    value={disponibilite.heureDebut}
                                    onChange={(e) => handleDisponibiliteChange(index, 'heureDebut', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
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
                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
};

export default AjoutInfirmier;
