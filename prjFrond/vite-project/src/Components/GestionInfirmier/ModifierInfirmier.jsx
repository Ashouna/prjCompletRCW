import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ModifierInfirmier = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [infirmier, setInfirmier] = useState({
        prenom: '',
        nom: '',
        departement: '',
        adresse: {
            rue: '',
            ville: '',
            codePostal: '',
            province: '',
            pays: ''
        },
        disponibilites: [{ jour: '', heureDebut: '', heureFin: '' }]
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInfirmier = async () => {
            try {
                const response = await axios.get(`http://localhost:3305/api/infirmiers/${id}`);
                console.log("Réponse de l'API :", response.data);
                const infirmierData = response.data;

                const adresse = {
                    rue: infirmierData.Adresse?.Rue || '',
                    ville: infirmierData.Adresse?.Ville || '',
                    codePostal: infirmierData.Adresse?.CodePostal || '',
                    province: infirmierData.Adresse?.Province || '',
                    pays: infirmierData.Adresse?.Pays || ''
                };

                const updatedInfirmier = {
                    prenom: infirmierData.Prenom || '',
                    nom: infirmierData.Nom || '',
                    departement: infirmierData.Departement || '',
                    adresse: adresse,
                    disponibilites: infirmierData.Disponibilites || [{ jour: '', heureDebut: '', heureFin: '' }]
                };

                console.log("Infirmier Data to be set: ", updatedInfirmier);
                setInfirmier(updatedInfirmier);
                setLoading(false);
            } catch (error) {
                console.error("Il y a eu une erreur lors de la récupération de l'infirmier !", error);
                setLoading(false);
            }
        };

        fetchInfirmier();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInfirmier(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setInfirmier(prevState => ({
            ...prevState,
            adresse: {
                ...prevState.adresse,
                [name]: value
            }
        }));
    };

    const handleDisponibiliteChange = (index, field, value) => {
        const newDisponibilites = [...infirmier.disponibilites];
        newDisponibilites[index][field] = value;
        setInfirmier(prevState => ({
            ...prevState,
            disponibilites: newDisponibilites
        }));
    };

    const handleAddDisponibilite = () => {
        setInfirmier(prevState => ({
            ...prevState,
            disponibilites: [...prevState.disponibilites, { jour: '', heureDebut: '', heureFin: '' }]
        }));
    };

    const handleRemoveDisponibilite = (index) => {
        const newDisponibilites = infirmier.disponibilites.filter((_, i) => i !== index);
        setInfirmier(prevState => ({
            ...prevState,
            disponibilites: newDisponibilites
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const infirmierData = {
            prenom: infirmier.prenom || '',
            nom: infirmier.nom || '',
            departement: infirmier.departement || '',
            adresse: {
                rue: infirmier.adresse.rue || '',
                ville: infirmier.adresse.ville || '',
                codePostal: infirmier.adresse.codePostal || '',
                province: infirmier.adresse.province || '',
                pays: infirmier.adresse.pays || ''
            },
            disponibilites: infirmier.disponibilites
        };

        console.log("Infirmier Data to be sent: ", infirmierData);

        try {
            await axios.put(`http://localhost:3305/api/infirmiers/${id}`, infirmierData);
            console.log("Réponse de l'API :", infirmierData);
            alert('Infirmier mis à jour avec succès');
            navigate('/infirmiers');
        } catch (error) {
            console.error("Il y a eu une erreur lors de la mise à jour de l'infirmier !", error);
        }
    };

    if (loading) {
        return <p>Chargement...</p>;
    }

    return (
        <div>
            <h2>Mettre à jour l'Infirmier</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Prénom:</label>
                    <input
                        type="text"
                        name="prenom"
                        value={infirmier.prenom}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Nom:</label>
                    <input
                        type="text"
                        name="nom"
                        value={infirmier.nom}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Département:</label>
                    <input
                        type="text"
                        name="departement"
                        value={infirmier.departement}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Rue:</label>
                    <input
                        type="text"
                        name="rue"
                        value={infirmier.adresse.rue}
                        onChange={handleAddressChange}
                        required
                    />
                </div>
                <div>
                    <label>Ville:</label>
                    <input
                        type="text"
                        name="ville"
                        value={infirmier.adresse.ville}
                        onChange={handleAddressChange}
                        required
                    />
                </div>
                <div>
                    <label>Code Postal:</label>
                    <input
                        type="text"
                        name="codePostal"
                        value={infirmier.adresse.codePostal}
                        onChange={handleAddressChange}
                        required
                    />
                </div>
                <div>
                    <label>Province:</label>
                    <input
                        type="text"
                        name="province"
                        value={infirmier.adresse.province}
                        onChange={handleAddressChange}
                        required
                    />
                </div>
                <div>
                    <label>Pays:</label>
                    <input
                        type="text"
                        name="pays"
                        value={infirmier.adresse.pays}
                        onChange={handleAddressChange}
                        required
                    />
                </div>
                <div>
                    <label>Disponibilités:</label>
                    {infirmier.disponibilites.map((disponibilite, index) => (
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
                <button type="submit">Mettre à jour</button>
            </form>
        </div>
    );
};

export default ModifierInfirmier;
