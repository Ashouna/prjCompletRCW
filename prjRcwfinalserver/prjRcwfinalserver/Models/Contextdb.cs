using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace prjRcwfinalserver.Models
{
    public class Contextdb
    {
        private readonly IMongoDatabase _database; 
        public Contextdb() { var client = new MongoClient("mongodb+srv://laura:2003@hopitaldb.bpo0jvo.mongodb.net/"); 
            _database = client.GetDatabase("hopitaldb"); }
        public IMongoCollection<Patient> Patients => _database.GetCollection<Patient>("Patients"); 
        public IMongoCollection<Adresse> Adresses => _database.GetCollection<Adresse>("Adresses");
        public IMongoCollection<Medecin> Medecins => _database.GetCollection<Medecin>("Medecins");
        public IMongoCollection<RendezVous> RendezVous => _database.GetCollection<RendezVous>("RendezVous");
        public IMongoCollection<Infirmier> Infirmiers => _database.GetCollection<Infirmier>("Infirmiers");
        public IMongoCollection<Personnel> Personnels => _database.GetCollection<Personnel>("Personnels");
        public IMongoCollection<Lit> Lits => _database.GetCollection<Lit>("Lits");
        public IMongoCollection<Departement> Departements => _database.GetCollection<Departement>("Departements");
        public IMongoCollection<Consultation> Consultations => _database.GetCollection<Consultation>("Consultations");
        public IMongoCollection<Traitement> Traitements => _database.GetCollection<Traitement>("Traitements");

    }
}