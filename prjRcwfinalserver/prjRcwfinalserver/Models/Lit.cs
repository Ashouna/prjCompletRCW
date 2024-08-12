using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace prjRcwfinalserver.Models
{
    public class Lit
    {
        [BsonId]
        public ObjectId Id { get; set; }
        public string NumeroLit { get; set; }
        public bool EstOccupe { get; set; }
        public ObjectId PatientId { get; set; }

        // Relation avec Departement via le nom
        public string DepartementNom { get; set; }
    }
}
