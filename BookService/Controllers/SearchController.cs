﻿using System;
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
using System.IO;
using System.Diagnostics;


namespace BookService.Controllers
{
    public class SearchController : ApiController
    {
        private BookServiceContext db = new BookServiceContext();

        // GET api/Search
        public string GetBooks(int id)
        {
            return db.Books.ToString();
            Debug.WriteLine("från books");
        }
        //    var books = from b in db.Books
        //                where b.Id == id
        //                select new BookDetailDTOtemp()
        //                {
        //                    Id = b.Id,
        //                    Title = b.Title,
        //                    Description = b.Description,
        //                    Year = b.Year,
        //                    Price = b.Price,
        //                    StockBalance = b.StockBalance,
        //                    Authors = b.Authors,
        //                    Genres = b.Genres
        //                };
        //    if (books == null)
        //    {
        //        return NotFound();
        //    }


           

           //
        }
        //public IQueryable<SearchDTO> GetSearchDTOes()
        //{
        //    return db.SearchDTOes;
        //}

        // GET api/Search/5
        //[ResponseType(typeof(SearchDTO))]
        //public async Task<IHttpActionResult> GetSearchDTO(int id)
        //{
        //    SearchDTO searchdto = await db.SearchDTOes.FindAsync(id);
        //    if (searchdto == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(searchdto);
        //}
        // PUT api/Search/5

        public async Task<IHttpActionResult> PutSearchDTO(int id, SearchDTO searchdto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != searchdto.Id)
            {
                return BadRequest();
            }

            db.Entry(searchdto).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                //if (!SearchDTOExists(id))
                //{
                //    return NotFound();
                //}
                //else
                //{
                //    throw;
                //}
                }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST api/Search
        //[ResponseType(typeof(SearchDTO))]
        //public async Task<IHttpActionResult> PostSearchDTO(SearchDTO searchdto)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    db.SearchDTOes.Add(searchdto);
        //    await db.SaveChangesAsync();
        //    return CreatedAtRoute("DefaultApi", new { id = searchdto.Id }, searchdto);
        //}

        // DELETE api/Search/5
        //[ResponseType(typeof(SearchDTO))]
        //public async Task<IHttpActionResult> DeleteSearchDTO(int id)
        //{
        //    SearchDTO searchdto = await db.SearchDTOes.FindAsync(id);
        //    if (searchdto == null)
        //    {
        //        return NotFound();
        //    }
        //    db.SearchDTOes.Remove(searchdto);
        //    await db.SaveChangesAsync();
        //    return Ok(searchdto);
        //}

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }

            base.Dispose(disposing);
        }
        //private bool SearchDTOExists(int id)
        //{
        //    return db.SearchDTOes.Count(e => e.Id == id) > 0;
        //}
    }
}