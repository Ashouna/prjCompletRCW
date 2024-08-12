using prjRcwfinalserver.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Threading.Tasks;
using System.Web.Http;

namespace prjRcwfinalserver.Controllers
{
    [RoutePrefix("api/personnels")]
    public class PersonnelsController : ApiController
    {
        private readonly Contextdb _context;

        public PersonnelsController()
        {
            _context = new Contextdb();
        }

        [HttpGet]
        [Route("")]
        public async Task<IHttpActionResult> Get()
        {
            var personnels = await _context.Personnels.Find(_ => true).ToListAsync();
            return Ok(personnels);
        }

        [HttpGet]
        [Route("{id:length(24)}")]
        public async Task<IHttpActionResult> Get(string id)
        {
            var personnel = await _context.Personnels.Find(p => p.Id == new ObjectId(id)).FirstOrDefaultAsync();
            if (personnel == null) return NotFound();
            return Ok(personnel);
        }

        [HttpPost]
        [Route("")]
        public async Task<IHttpActionResult> Create(Personnel personnel)
        {
            await _context.Personnels.InsertOneAsync(personnel);
            return Ok(personnel);
        }

        [HttpPut]
        [Route("{id:length(24)}")]
        public async Task<IHttpActionResult> Update(string id, Personnel personnelIn)
        {
            var result = await _context.Personnels.ReplaceOneAsync(p => p.Id == new ObjectId(id), personnelIn);
            if (result.IsAcknowledged && result.ModifiedCount > 0) return Ok(personnelIn);
            return NotFound();
        }

        [HttpDelete]
        [Route("{id:length(24)}")]
        public async Task<IHttpActionResult> Delete(string id)
        {
            var result = await _context.Personnels.DeleteOneAsync(p => p.Id == new ObjectId(id));
            if (result.IsAcknowledged && result.DeletedCount > 0) return Ok();
            return NotFound();
        }
    }
}

