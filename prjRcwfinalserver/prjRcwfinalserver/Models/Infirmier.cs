using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace prjRcwfinalserver.Models
{
    public class Infirmier
    {
        [BsonId]
        public ObjectId Id { get; set; }
        public string Prenom { get; set; }
        public string Nom { get; set; }
        public ObjectId DepartementId { get; set; }
        public virtual Departement Departement { get; set; }
        public ObjectId IdAdresse { get; set; }
        public virtual Adresse Adresse { get; set; }
        public List<Disponibilite> Disponibilites { get; set; } // Ajout des disponibilités
    }

    public class Disponibilite
    {
        public DayOfWeek Jour { get; set; }
        public TimeSpan HeureDebut { get; set; }
        public TimeSpan HeureFin { get; set; }
    }
}
