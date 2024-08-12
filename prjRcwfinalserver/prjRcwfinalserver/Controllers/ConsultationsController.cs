using prjRcwfinalserver.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Threading.Tasks;
using System.Web.Http;
using System;

namespace prjRcwfinalserver.Controllers
{
    [RoutePrefix("api/consultations")]
    public class ConsultationsController : ApiController
    {
        private readonly Contextdb _context;

        public ConsultationsController()
        {
            _context = new Contextdb();
        }

        [HttpGet]
        [Route("")]
        public async Task<IHttpActionResult> Get()
        {
            var consultations = await _context.Consultations.Find(_ => true).ToListAsync();
            return Ok(consultations);
        }

        [HttpGet]
        [Route("{id:length(24)}")]
        public async Task<IHttpActionResult> Get(string id)
        {
            var consultation = await _context.Consultations.Find(c => c.IdConsultation == new ObjectId(id)).FirstOrDefaultAsync();
            if (consultation == null) return NotFound();
            return Ok(consultation);
        }

        [HttpPost]
        [Route("")]
        public async Task<IHttpActionResult> Create(Consultation consultation)
        {
            if (consultation == null) return BadRequest("Consultation data is null");

            await _context.Consultations.InsertOneAsync(consultation);
            return Ok(consultation);
        }

        [HttpPut]
        [Route("{id:length(24)}")]
        public async Task<IHttpActionResult> Update(string id, Consultation consultationIn)
        {
            var result = await _context.Consultations.ReplaceOneAsync(c => c.IdConsultation == new ObjectId(id), consultationIn);
            if (result.IsAcknowledged && result.ModifiedCount > 0) return Ok(consultationIn);
            return NotFound();
        }

        [HttpDelete]
        [Route("{id:length(24)}")]
        public async Task<IHttpActionResult> Delete(string id)
        {
            var result = await _context.Consultations.DeleteOneAsync(c => c.IdConsultation == new ObjectId(id));
            if (result.IsAcknowledged && result.DeletedCount > 0) return Ok();
            return NotFound();
        }
    }
}
