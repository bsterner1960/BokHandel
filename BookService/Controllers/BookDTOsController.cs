using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using BookService.Models;

namespace BookService.Controllers
{
    public class BookDTOsController : ApiController
    {
        private BookServiceContext db = new BookServiceContext();

        // GET api/BookDTOs
        public IQueryable<BookDTO> GetBookDTOes()
        {
            return db.BookDTOes;
        }

        // GET api/BookDTOs/5
        [ResponseType(typeof(BookDTO))]
        public IHttpActionResult GetBookDTO(int id)
        {
            BookDTO bookdto = db.BookDTOes.Find(id);
            if (bookdto == null)
            {
                return NotFound();
            }

            return Ok(bookdto);
        }

        // PUT api/BookDTOs/5
        public IHttpActionResult PutBookDTO(int id, BookDTO bookdto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != bookdto.Id)
            {
                return BadRequest();
            }

            db.Entry(bookdto).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookDTOExists(id))
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

        // POST api/BookDTOs
        [ResponseType(typeof(BookDTO))]
        public IHttpActionResult PostBookDTO(BookDTO bookdto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.BookDTOes.Add(bookdto);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = bookdto.Id }, bookdto);
        }

        // DELETE api/BookDTOs/5
        [ResponseType(typeof(BookDTO))]
        public IHttpActionResult DeleteBookDTO(int id)
        {
            BookDTO bookdto = db.BookDTOes.Find(id);
            if (bookdto == null)
            {
                return NotFound();
            }

            db.BookDTOes.Remove(bookdto);
            db.SaveChanges();

            return Ok(bookdto);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BookDTOExists(int id)
        {
            return db.BookDTOes.Count(e => e.Id == id) > 0;
        }
    }
}