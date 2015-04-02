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
    public class AuthorsController : ApiController
    {
        private BookServiceContext db = new BookServiceContext();

        // GET api/Authors
        //public IQueryable<Author> GetAuthors()
        //{
        //    return db.Authors;
        //}
        // GET api/authors
        public List<AuthorDTO> GetAuthors()
        {
            var authors = (from a in db.Authors
                         select new AuthorDTO()
                         {
                             Id = a.Id,
                             Name = a.Name
                         }).ToList();


            return authors;
        }

        // GET api/Authors/5
        [ResponseType(typeof(AuthorDTO))]
        public async Task<IHttpActionResult> GetAuthor(int id)
        {
            Author author = await db.Authors.FindAsync(id);
            if (author == null)
            {
                return NotFound();
            }

            AuthorDTO aDTO = new AuthorDTO()
            {
                Id = author.Id,
                Name = author.Name
            };

            return Ok(aDTO);
        }

        // PUT api/Authors/5
        public async Task<IHttpActionResult> PutAuthor( AuthorDTO authorDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //if (id != author.Id)
            //{
            //    return BadRequest();
            //}

            Author author = new Author()
            {
                Id = authorDTO.Id,
                Name = authorDTO.Name
            };

            db.Entry(author).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AuthorExists(authorDTO.Id))
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

        // POST api/Authors
        [ResponseType(typeof(AuthorDTO))]
        public async Task<IHttpActionResult> PostAuthor(AuthorDTO authorDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Author author = new Author()
            {
                Id = authorDTO.Id,
                Name = authorDTO.Name
            };

            db.Authors.Add(author);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = author.Id }, authorDTO);
        }

        // DELETE api/Authors/5
        [ResponseType(typeof(AuthorDTO))]
        public async Task<IHttpActionResult> DeleteAuthor(int id)
        {
            Author author = await db.Authors.FindAsync(id);
            if (author == null)
            {
                return NotFound();
            }
            AuthorDTO authorDTO = new AuthorDTO()
            {
                Id = author.Id,
                Name = author.Name
            };

            db.Authors.Remove(author);
            await db.SaveChangesAsync();

            return Ok(authorDTO);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AuthorExists(int id)
        {
            return db.Authors.Count(e => e.Id == id) > 0;
        }
    }
}