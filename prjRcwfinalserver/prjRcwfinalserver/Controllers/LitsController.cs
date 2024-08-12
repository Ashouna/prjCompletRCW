using prjRcwfinalserver.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Threading.Tasks;
using System.Web.Http;
using Newtonsoft.Json;

namespace prjRcwfinalserver.Controllers
{
    [RoutePrefix("api/lits")]
    public class LitsController : ApiController
    {
        private readonly Contextdb _context;

        public LitsController()
        {
            _context = new Contextdb();
        }

        [HttpGet]
        [Route("")]
        public async Task<IHttpActionResult> Get()
        {
            var lits = await _context.Lits.Find(_ => true).ToListAsync();
            return Ok(lits);
        }

        [HttpGet]
        [Route("{id:length(24)}")]
        public async Task<IHttpActionResult> Get(string id)
        {
            var lit = await _context.Lits.Find(l => l.Id == new ObjectId(id)).FirstOrDefaultAsync();
            if (lit == null) return NotFound();
            return Ok(lit);
        }

        [HttpPost]
        [Route("")]
        public async Task<IHttpActionResult> Create(Lit lit)
        {
            try
            {
                Console.WriteLine("Requête reçue : " + JsonConvert.SerializeObject(lit));

                if (string.IsNullOrWhiteSpace(lit.DepartementNom))
                {
                    Console.WriteLine("DepartementNom est vide.");
                    return BadRequest("DepartementNom is required.");
                }

                var departement = await _context.Departements.Find(d => d.Nom == lit.DepartementNom).FirstOrDefaultAsync();
                if (departement == null)
                {
                    Console.WriteLine("DepartementNom invalide.");
                    return BadRequest("Invalid DepartementNom.");
                }

                await _context.Lits.InsertOneAsync(lit);
                Console.WriteLine("Lit ajouté avec succès.");
                return Ok(lit);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Erreur lors de la création du lit : " + ex.Message);
                return InternalServerError(ex);
            }
        }

        [HttpPut]
        [Route("{id:length(24)}")]
        public async Task<IHttpActionResult> Update(string id, Lit litIn)
        {
            try
            {
                var existingLit = await _context.Lits.Find(l => l.Id == new ObjectId(id)).FirstOrDefaultAsync();
                if (existingLit == null) return NotFound();

                if (string.IsNullOrWhiteSpace(litIn.DepartementNom))
                {
                    return BadRequest("DepartementNom is required.");
                }

                var departement = await _context.Departements.Find(d => d.Nom == litIn.DepartementNom).FirstOrDefaultAsync();
                if (departement == null)
                {
                    return BadRequest("Invalid DepartementNom.");
                }

                var update = Builders<Lit>.Update
                    .Set(l => l.NumeroLit, litIn.NumeroLit)
                    .Set(l => l.EstOccupe, litIn.EstOccupe)
                    .Set(l => l.PatientId, litIn.PatientId)
                    .Set(l => l.DepartementNom, litIn.DepartementNom);

                var result = await _context.Lits.UpdateOneAsync(l => l.Id == new ObjectId(id), update);
                if (result.IsAcknowledged && result.ModifiedCount > 0) return Ok(litIn);
                return NotFound();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Erreur lors de la mise à jour du lit : " + ex.Message);
                return InternalServerError(ex);
            }
        }

        [HttpDelete]
        [Route("{id:length(24)}")]
        public async Task<IHttpActionResult> Delete(string id)
        {
            try
            {
                var result = await _context.Lits.DeleteOneAsync(l => l.Id == new ObjectId(id));
                if (result.IsAcknowledged && result.DeletedCount > 0) return Ok();
                return NotFound();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Erreur lors de la suppression du lit : " + ex.Message);
                return InternalServerError(ex);
            }
        }
    }
}
