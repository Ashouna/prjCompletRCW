using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System;

namespace prjRcwfinalserver.Models
{
    public class Traitement
    {
        [BsonId]
        public ObjectId IdTraitement { get; set; }

        public ObjectId IdConsultation { get; set; }

        public string Description { get; set; }

        public DateTime DateDebut { get; set; }

        public DateTime DateFin { get; set; }
    }
}
