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
using System.IO;

namespace BookService.Controllers
{
    public class SearchController : ApiController
    {
        private BookServiceContext db = new BookServiceContext();

        [ResponseType(typeof(SearchDTO))]
        //public IHttpActionResult GetBook(string searchValue, int priceFrom, int priceTo, int[] genreId);
        // GET: Search/Books
        public List<BookDetailDTO> GetBooks([FromUri] int[] genreId = null, int priceFrom = 0, int priceTo = 0, string searchValue = "")
        {
            //var bookDetailDTOresult = new IQueryable<BookDetailDTO>();
             
                var NewBooks = from b in db.Books
                            where b.Title.Contains(searchValue) || b.Description.Contains(searchValue)
                            select new BookDetailDTOtemp()
                            {
                                Id = b.Id,
                                Title = b.Title,
                                Description = b.Description,
                                Year = b.Year,
                                Price = b.Price,
                                StockBalance = b.StockBalance,
                                ISBN = b.ISBN,
                                Authors = b.Authors,
                                Genres = b.Genres
                            };

                var booksResult = new List<BookDetailDTO>();

                foreach (var book in NewBooks)
                {
                    booksResult.Add (new BookDetailDTO
                    {
                        Id = book.Id,
                        Title = book.Title,
                        Description = book.Description,
                        Year = book.Year,
                        StockBalance = book.StockBalance,
                        ISBN = book.ISBN,
                        Price = book.Price,
                        AuthorNames = getAuthorNames(book.Authors),
                        GenreNames = getGenreNames(book.Genres)
                    });
                };

                return (booksResult);
        }

        private List<string> getGenreNames(ICollection<Genre> genres)
        {
            var gNames = new List<string>();
            foreach (var genre in genres)
            {
                gNames.Add(genre.Name);
            }
            return gNames;
        }

        private List<string> getAuthorNames(ICollection<Author> authors)
        {
            var aNames = new List<string>();
            foreach (var author in authors)
            {
                aNames.Add(author.Name);
            }
            return aNames;
        }

        //private List<string> getBookNames(ICollection<Book> books)
        //{
        //    var bNames = new List<string>();
        //    foreach (var book in books)
        //    {
        //        bNames.Add(book.Name);
        //    }
        //    return bNames;
        //}
    
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
