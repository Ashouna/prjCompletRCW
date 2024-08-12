using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace prjRcwfinalserver.Models
{
    public class Medecin
    {
        [BsonId]
        public ObjectId Id { get; set; }
        public string Prenom { get; set; }
        public string Nom { get; set; }
        public string Specialite { get; set; }
        public string DepartementNom { get; set; }  // Assurez-vous que c'est de type ObjectId
        public List<Disponibilite> Disponibilites { get; set; } // Ajout des disponibilités
    }



}
