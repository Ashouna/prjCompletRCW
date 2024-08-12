using prjRcwfinalserver.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Threading.Tasks;
using System.Web.Http;

namespace prjRcwfinalserver.Controllers
{
    [RoutePrefix("api/departements")]
    public class DepartementsController : ApiController
    {
        private readonly Contextdb _context;

        public DepartementsController()
        {
            _context = new Contextdb();
        }

        [HttpGet]
        [Route("")]
        public async Task<IHttpActionResult> Get()
        {
            var departements = await _context.Departements.Find(_ => true).ToListAsync();
            return Ok(departements);
        }
    }
}