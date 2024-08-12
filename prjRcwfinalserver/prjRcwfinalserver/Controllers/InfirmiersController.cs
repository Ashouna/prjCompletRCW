using prjRcwfinalserver.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Threading.Tasks;
using System.Web.Http;

namespace prjRcwfinalserver.Controllers
{
    [RoutePrefix("api/infirmiers")]
    public class InfirmiersController : ApiController
    {
        private readonly Contextdb _context;

        public InfirmiersController()
        {
            _context = new Contextdb();
        }

        [HttpGet]
        [Route("")]
        public async Task<IHttpActionResult> Get()
        {
            var infirmiers = await _context.Infirmiers.Find(_ => true).ToListAsync();
            return Ok(infirmiers);
        }

        [HttpGet]
        [Route("{id:length(24)}")]
        public async Task<IHttpActionResult> Get(string id)
        {
            var infirmier = await _context.Infirmiers.Find(i => i.Id == new ObjectId(id)).FirstOrDefaultAsync();
            if (infirmier == null) return NotFound();
            return Ok(infirmier);
        }

        [HttpPost]
        [Route("")]
        public async Task<IHttpActionResult> Create(Infirmier infirmier)
        {
            await _context.Infirmiers.InsertOneAsync(infirmier);
            return Ok(infirmier);
        }

        [HttpPut]
        [Route("{id:length(24)}")]
        public async Task<IHttpActionResult> Update(string id, Infirmier infirmierIn)
        {
            var result = await _context.Infirmiers.ReplaceOneAsync(i => i.Id == new ObjectId(id), infirmierIn);
            if (result.IsAcknowledged && result.ModifiedCount > 0) return Ok(infirmierIn);
            return NotFound();
        }

        [HttpDelete]
        [Route("{id:length(24)}")]
        public async Task<IHttpActionResult> Delete(string id)
        {
            var result = await _context.Infirmiers.DeleteOneAsync(i => i.Id == new ObjectId(id));
            if (result.IsAcknowledged && result.DeletedCount > 0) return Ok();
            return NotFound();
        }
    }
}

