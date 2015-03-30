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
    public class SearchController : ApiController
    {
        private BookServiceContext db = new BookServiceContext();
    
        // GET api/Search/5
        [ResponseType(typeof(SearchDTO))]
        public IHttpActionResult GetBook(string searchType, string searchPhrase)
        {
            var bookResult = new List<BookDetailDTOtemp>();
            var authorResult = new List<Author>();

            if (searchType == "books")
            {
                 bookResult = from b in db.Books
                        where b.Title.Contains(searchPhrase) || b.Description.Contains(searchPhrase)
                        select new BookDetailDTOtemp()
                        {
                            Id = b.Id,
                            Title = b.Title,
                            Description = b.Description,
                            Year = b.Year,
                            Price = b.Price,
                            StockBalance = b.StockBalance,
                            ISBN = b.ISBN,
                            //Authors = b.Authors,
                            //Genres = b.Genres
                        };

                 var result = new SearchDTO()
                 {

                 };
            }
            //return NotFound();
            //return Ok(searchResult);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BookExists(int id)
        {
            return db.Books.Count(e => e.Id == id) > 0;
        }
    }
}