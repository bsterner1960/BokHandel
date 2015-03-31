using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using BookService.Models;

namespace BookService.Controllers
{
    public class GenresController : ApiController
    {
        private BookServiceContext db = new BookServiceContext();

        // GET api/Genres
        //public IQueryable<Genre> GetGenres()
        //{
        //    return db.Genres;
        //}
        ////// GET api/authors
        public List<GenreDTO> GetGenres()
        {
            var genres = (from g in db.Genres
                           select new GenreDTO()
                           {
                               Id = g.Id,
                               Name = g.Name,
                               Description = g.Description
                           }).ToList();


            return genres;
        }


        // GET api/Genres/5
        [ResponseType(typeof(GenreDTO))]
        public async Task<IHttpActionResult> GetGenre(int id)
        {
            Genre genre = await db.Genres.FindAsync(id);
            if (genre == null)
            {
                return NotFound();
            }
 
            GenreDTO gDTO = new GenreDTO()
            {
                Id = genre.Id,
                Name = genre.Name,
                Description = genre.Description
            };

            return Ok(gDTO);
        }

        // PUT api/Genres/5
        public async Task<IHttpActionResult> PutGenre( GenreDTO genreDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //if (id != genre.Id)
            //{
            //    return BadRequest();
            //}

            Genre genre = new Genre()
            {
                Id = genreDTO.Id,
                Name = genreDTO.Name,
                Description = genreDTO.Description
            };


            db.Entry(genre).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GenreExists(genreDTO.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST api/Genres
        [ResponseType(typeof(GenreDTO))]
        public async Task<IHttpActionResult> PostGenre(GenreDTO genreDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Genre genre = new Genre()
            {
                Id = genreDTO.Id,
                Name = genreDTO.Name,
                Description = genreDTO.Description
            };

            db.Genres.Add(genre);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = genre.Id }, genreDTO);
        }

        // DELETE api/Genres/5
        [ResponseType(typeof(GenreDTO))]
        public async Task<IHttpActionResult> DeleteGenre(int id)
        {
            Genre genre = await db.Genres.FindAsync(id);
            if (genre == null)
            {
                return NotFound();
            }

            GenreDTO genreDTO = new GenreDTO()
            {
                Id = genre.Id,
                Name = genre.Name,
                Description = genre.Description
            };

            db.Genres.Remove(genre);
            await db.SaveChangesAsync();

            return Ok(genreDTO);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool GenreExists(int id)
        {
            return db.Genres.Count(e => e.Id == id) > 0;
        }
    }
}