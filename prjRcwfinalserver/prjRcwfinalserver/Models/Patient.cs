﻿using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MongoDB.Driver;
using System.Threading.Tasks;

namespace prjRcwfinalserver.Models
{
    public class Patient
    {
        [BsonId]
        public ObjectId IdPatient { get; set; }
        public string Prenom { get; set; }
        public string Nom { get; set; }
        public string Telephone { get; set; }
        public DateTime DateNaissance { get; set; }

        //Relation avec Adresse 
        public ObjectId IdAdresse { get; set; }
        public virtual Adresse Adresse { get; set; }

    }
}