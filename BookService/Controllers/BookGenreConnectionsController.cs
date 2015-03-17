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
    public class BookGenreConnectionsController : ApiController
    {
        private BookServiceContext db = new BookServiceContext();

        // GET api/BookGenreConnections
        public IQueryable<BookGenreConnection> GetBookGenreConnections()
        {
            return db.BookGenreConnections;
        }

        // GET api/BookGenreConnections/5
        [ResponseType(typeof(BookGenreConnection))]
        public IHttpActionResult GetBookGenreConnection(int id)
        {
            BookGenreConnection bookgenreconnection = db.BookGenreConnections.Find(id);
            if (bookgenreconnection == null)
            {
                return NotFound();
            }

            return Ok(bookgenreconnection);
        }

        // PUT api/BookGenreConnections/5
        public IHttpActionResult PutBookGenreConnection(int id, BookGenreConnection bookgenreconnection)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != bookgenreconnection.Id)
            {
                return BadRequest();
            }

            db.Entry(bookgenreconnection).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookGenreConnectionExists(id))
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

        // POST api/BookGenreConnections
        [ResponseType(typeof(BookGenreConnection))]
        public IHttpActionResult PostBookGenreConnection(BookGenreConnection bookgenreconnection)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.BookGenreConnections.Add(bookgenreconnection);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = bookgenreconnection.Id }, bookgenreconnection);
        }

        // DELETE api/BookGenreConnections/5
        [ResponseType(typeof(BookGenreConnection))]
        public IHttpActionResult DeleteBookGenreConnection(int id)
        {
            BookGenreConnection bookgenreconnection = db.BookGenreConnections.Find(id);
            if (bookgenreconnection == null)
            {
                return NotFound();
            }

            db.BookGenreConnections.Remove(bookgenreconnection);
            db.SaveChanges();

            return Ok(bookgenreconnection);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BookGenreConnectionExists(int id)
        {
            return db.BookGenreConnections.Count(e => e.Id == id) > 0;
        }
    }
}