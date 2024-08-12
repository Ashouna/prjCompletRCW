using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Threading.Tasks;
using System.Web.Http;
using Newtonsoft.Json;
using prjRcwfinalserver.Models;
using Microsoft.Ajax.Utilities;

namespace prjRcwfinalserver.Controllers
{
    [RoutePrefix("api/medecins")]
    public class MedecinsController : ApiController
    {
        private readonly Contextdb _context;

        public MedecinsController()
        {
            _context = new Contextdb();
        }

        [HttpGet]
        [Route("")]
        public async Task<IHttpActionResult> Get()
        {
            var medecins = await _context.Medecins.Find(_ => true).ToListAsync();
            return Ok(medecins);
        }

        [HttpGet]
        [Route("{id:length(24)}")]
        public async Task<IHttpActionResult> Get(string id)
        {
            var medecin = await _context.Medecins.Find(m => m.Id == new ObjectId(id)).FirstOrDefaultAsync();
            if (medecin == null) return NotFound();
            return Ok(medecin);
        }

        [HttpPost]
        [Route("")]
        public async Task<IHttpActionResult> Create(Medecin medecin)
        {
            try
            {
                Console.WriteLine("Requête reçue : " + JsonConvert.SerializeObject(medecin));

                if (string.IsNullOrWhiteSpace(medecin.DepartementNom))
                {
                    Console.WriteLine("DepartementNom est vide.");
                    return BadRequest("DepartementNom is required.");
                }

                // Validate DepartementNom exists
                var departement = await _context.Departements.Find(d => d.Nom == medecin.DepartementNom).FirstOrDefaultAsync();
                if (departement == null)
                {
                    Console.WriteLine("DepartementNom invalide.");
                    return BadRequest("Invalid DepartementNom.");
                }

                await _context.Medecins.InsertOneAsync(medecin);
                Console.WriteLine("Médecin ajouté avec succès.");
                return Ok(medecin);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Erreur lors de la création du médecin : " + ex.Message);
                return InternalServerError(ex);
            }
        }

        [HttpPut]
        [Route("{id:length(24)}")]
        public async Task<IHttpActionResult> Update(string id, Medecin medecinIn)
        {
            try
            {
                var objectId = new ObjectId(id);
                var existingMedecin = await _context.Medecins.Find(m => m.Id == objectId).FirstOrDefaultAsync();
                if (existingMedecin == null) return NotFound();

                if (string.IsNullOrWhiteSpace(medecinIn.DepartementNom))
                {
                    return BadRequest("DepartementNom is required.");
                }

                var update = Builders<Medecin>.Update
                    .Set(m => m.Prenom, medecinIn.Prenom)
                    .Set(m => m.Nom, medecinIn.Nom)
                    .Set(m => m.Specialite, medecinIn.Specialite)
                    .Set(m => m.DepartementNom, medecinIn.DepartementNom)
                    .Set(m => m.Disponibilites, medecinIn.Disponibilites);

                var result = await _context.Medecins.UpdateOneAsync(m => m.Id == objectId, update);
                if (result.IsAcknowledged && result.ModifiedCount > 0) return Ok(medecinIn);
                return NotFound();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Erreur lors de la mise à jour du médecin : " + ex.Message);
                return InternalServerError(ex);
            }
        }


        [HttpDelete]
        [Route("{id:length(24)}")]
        public async Task<IHttpActionResult> Delete(string id)
        {
            try
            {
                var result = await _context.Medecins.DeleteOneAsync(m => m.Id == new ObjectId(id));
                if (result.IsAcknowledged && result.DeletedCount > 0) return Ok();
                return NotFound();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Erreur lors de la suppression du médecin : " + ex.Message);
                return InternalServerError(ex);
            }
        }
    }
}
