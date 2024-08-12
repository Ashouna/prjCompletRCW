using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace prjRcwfinalserver.Models
{
    public class Personnel
    {
        [BsonId]
        public ObjectId Id { get; set; }
        public string Prenom { get; set; }
        public string Nom { get; set; }
        public string Role { get; set; }
    }
}
