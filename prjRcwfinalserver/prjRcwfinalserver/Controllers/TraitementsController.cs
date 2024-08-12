using prjRcwfinalserver.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Threading.Tasks;
using System.Web.Http;
using System;

namespace prjRcwfinalserver.Controllers
{
    [RoutePrefix("api/traitements")]
    public class TraitementsController : ApiController
    {
        private readonly Contextdb _context;

        public TraitementsController()
        {
            _context = new Contextdb();
        }

        [HttpGet]
        [Route("")]
        public async Task<IHttpActionResult> Get()
        {
            var traitements = await _context.Traitements.Find(_ => true).ToListAsync();
            return Ok(traitements);
        }

        [HttpGet]
        [Route("{id:length(24)}")]
        public async Task<IHttpActionResult> Get(string id)
        {
            var traitement = await _context.Traitements.Find(t => t.IdTraitement == new ObjectId(id)).FirstOrDefaultAsync();
            if (traitement == null) return NotFound();
            return Ok(traitement);
        }

        [HttpPost]
        [Route("")]
        public async Task<IHttpActionResult> Create(Traitement traitement)
        {
            if (traitement == null) return BadRequest("Traitement data is null");

            await _context.Traitements.InsertOneAsync(traitement);
            return Ok(traitement);
        }

        [HttpPut]
        [Route("{id:length(24)}")]
        public async Task<IHttpActionResult> Update(string id, Traitement traitementIn)
        {
            var result = await _context.Traitements.ReplaceOneAsync(t => t.IdTraitement == new ObjectId(id), traitementIn);
            if (result.IsAcknowledged && result.ModifiedCount > 0) return Ok(traitementIn);
            return NotFound();
        }

        [HttpDelete]
        [Route("{id:length(24)}")]
        public async Task<IHttpActionResult> Delete(string id)
        {
            var result = await _context.Traitements.DeleteOneAsync(t => t.IdTraitement == new ObjectId(id));
            if (result.IsAcknowledged && result.DeletedCount > 0) return Ok();
            return NotFound();
        }
    }
}
