﻿using System;
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

        [ResponseType(typeof(BookDetailDTO))]
        // GET: Search/Books
        public List<BookDetailDTO> GetBooks([FromUri] int[] genreId = null, int priceFrom = 0, int priceTo = 0, string searchValue = null)
        {

            int priceLow = 0;
            int priceHigh = 9999999;

            if (priceFrom > 0)
            {
                priceLow = priceFrom;
            }

            if (priceTo > 0)
            {
                priceHigh = priceTo;
            }

            List<BookDetailDTOtemp> NewBooks;

            if (searchValue == null)
            {
                // sök utan söksträng med pris intervall
                NewBooks = (from b in db.Books
                           where (b.Price >= priceLow && b.Price <= priceHigh)

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
                           }).ToList();
            }

            else
            { 
                // Sökning på ISBN med prisintervall
                NewBooks = (from b in db.Books
                           where b.ISBN.Contains(searchValue) &&
                                    b.Price >= priceLow && b.Price <= priceHigh

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
                           }).ToList();

                if (NewBooks.Count() == 0)
                {
                    // Sökning på Titel/Beskrivning med prisintervall
                    //
                    NewBooks = (from b in db.Books
                                   where (b.Title.Contains(searchValue) || b.Description.Contains(searchValue)) &&
                                            b.Price >= priceLow && b.Price <= priceHigh
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
                               }).ToList();

                     if (NewBooks.Count() == 0)
                     {
                         // Sökning på Författare med prisintervall
                         //  - sök först ut alla böcker för prisintervallet
                         NewBooks = (from b in db.Books
                                where b.Price >= priceLow && b.Price <= priceHigh
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
                                   }).ToList();

                         if (NewBooks.Count() > 0)
                         {
                          //  - gå igenom och se efter om sökt författare finns på bok 
                             var NewBooksForAuthors = new List<BookDetailDTOtemp>();
                             foreach (var nBook in NewBooks )
                             {

                                foreach (var nAuthor in nBook.Authors)
                                {
                                     if(nAuthor.Name.Contains(searchValue))
                                     {
                                         NewBooksForAuthors.Add(nBook);
                                         break;
                                     }
                                }

                             }
                             NewBooks = NewBooksForAuthors;

                         }

                     }
                
                }

            }

            var booksResult = new List<BookDetailDTO>();

            // filtrera ut de böcker som har rätt Genre
            foreach (var book in NewBooks)
            {
                bool genreCheck = false;

                if (genreId.Count() == 0)
                {
                    genreCheck = true;
                }
                else
                {
                    foreach (var genre in book.Genres)
                    {
                        if (genreId.Contains(genre.Id))
                        {
                            genreCheck = true;
                        }
                    }
                }

                if (genreCheck)
                {
                    booksResult.Add(new BookDetailDTO
                    {
                        Id = book.Id,
                        Title = book.Title,
                        Description = book.Description,
                        Year = book.Year,
                        StockBalance = book.StockBalance,
                        ISBN = book.ISBN,
                        Price = book.Price,
                        AuthorNIs = getAuthorNIs(book.Authors),
                        GenreNIs = getGenreNIs(book.Genres)
                    });
                }
            }

            return (booksResult);
        }

        private List<AuthorNI> getAuthorNIs(ICollection<Author> authors)
        {
            var aNIs = new List<AuthorNI>();
            foreach (var author in authors)
            {
                aNIs.Add(new AuthorNI
                {
                    Name = author.Name,
                    Id = author.Id
                });
            }
            return aNIs;
        }
        private List<GenreNI> getGenreNIs(ICollection<Genre> genres)
        {
            var gNIs = new List<GenreNI>();
            foreach (var genre in genres)
            {
                gNIs.Add(new GenreNI
                {
                    Name = genre.Name,
                    Id = genre.Id
                });
            }
            return gNIs;
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
