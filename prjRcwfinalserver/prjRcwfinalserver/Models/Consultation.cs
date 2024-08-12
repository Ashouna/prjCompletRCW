using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System;
using System.Collections.Generic;

namespace prjRcwfinalserver.Models
{
    public class Consultation
    {
        [BsonId]
        public ObjectId IdConsultation { get; set; }

        public ObjectId IdPatient { get; set; }

        public DateTime DateConsultation { get; set; }

        public string Motif { get; set; }

        public string Observations { get; set; }

        // Relation avec Traitement
        public List<ObjectId> IdTraitements { get; set; } = new List<ObjectId>();

        public virtual List<Traitement> Traitements { get; set; } = new List<Traitement>();
    }
}
