using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Vinyl.Models;
using Vinyl.Contexts;
using Vinyl.Repository;
using System.Transactions;
using Microsoft.AspNetCore.JsonPatch;
using System.Web.Http.Cors;

namespace Vinyl.Controllers
{
    [Route("api/[controller]")]
    [ApiController]    
    public class SongController : ControllerBase
    {

        private readonly ISongRepository _songRepository;

        public SongController(ISongRepository songRepository)
        {
            _songRepository = songRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var songs = _songRepository.GetSongs();
            return new OkObjectResult(songs);
        }

        [HttpGet("{id}", Name = "Get")]
        public IActionResult Get(int id)
        {
            var song = _songRepository.GetSongByID(id);
            return new OkObjectResult(song);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Song song)
        {
            using (var scope = new TransactionScope())
            {
                _songRepository.InsertSong(song);
                scope.Complete();
                return CreatedAtAction(nameof(Get), new { id = song.vId }, song);
            }
        }

        [HttpPut]
        public IActionResult Put([FromBody] Song song)
        {
            if (song != null)
            {
                using (var scope = new TransactionScope())
                {
                    _songRepository.UpdateSong(song);
                    scope.Complete();
                    return new OkResult();
                }
            }
            return new NoContentResult();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _songRepository.DeleteSong(id);
            return new OkResult();
        }
    }
}