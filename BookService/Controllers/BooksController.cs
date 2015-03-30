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

namespace BookService.Controllers
{
    public class BooksController : ApiController
    {
        private BookServiceContext db = new BookServiceContext();

        // GET api/Books
        //public IQueryable<Book> GetBooks()
        //{
        //    return db.Books;
        //}

        // GET api/Books
        public List<BookDTO> GetBooks()
        {
            var books = from b in db.Books
                        select new BookDTOtemp()
                        {
                            Id = b.Id,
                            Title = b.Title,
                           // Authors = b.Authors
                        };

            var books2 = new List<BookDTO>();
            foreach (var book in books)
            {
                books2.Add(
                    new BookDTO()
                    {
                        Id = book.Id,
                        Title = book.Title,
                        //AuthorNames = getAuthorNames(book.Authors)
                    }

                );
            }

            return books2;
        }


        // GET api/Books/5
        [ResponseType(typeof(BookDetailDTO))]
       // public async Task<IHttpActionResult> GetBook(int id)
            
        public IHttpActionResult GetBook(int id)
        {


            var books = from b in db.Books
                        where b.Id == id
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
            if (books == null)
            {
                return NotFound();
            }

            var rawbook = books.First();
            var book2 = new BookDetailDTO()
                     {
                         Id = rawbook.Id,
                         Title = rawbook.Title,
                         Description = rawbook.Description,
                         Year = rawbook.Year,
                         StockBalance = rawbook.StockBalance,
                         ISBN = rawbook.ISBN,
                         Price = rawbook.Price,
                         AuthorNIs = getAuthorNIs(rawbook.Authors),
                         GenreNIs = getGenreNIs(rawbook.Genres)
                     };

            return Ok(book2);
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

        // PUT api/Books/5
        //public async Task<IHttpActionResult> PutBook(int id, NewBookDTO )
        public async Task<IHttpActionResult> PutBook( NewBookDTO changedBook)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //if (id != book.Id)
            //{
            //    return BadRequest();
            //}

           Book book = new Book();

            book.Id = changedBook.Id;
            book.Title = changedBook.Title;
            book.Description = changedBook.Description;
            book.Price = changedBook.Price;
            book.Year = changedBook.Year;
            book.StockBalance = changedBook.StockBalance;
            book.ISBN = changedBook.ISBN;

            foreach(int aId in changedBook.AuthorIds)
            {  
                Author author = await db.Authors.FindAsync(aId);
                if (author != null)
                {
                    book.Authors.Add(author);

                }
            }

            foreach (int gId in changedBook.GenreIds)
            {
                Genre genre = await db.Genres.FindAsync(gId);
                if (genre != null)
                {
                    book.Genres.Add(genre);

                }
            }
            
            db.Entry(book).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookExists(changedBook.Id))
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

        // POST api/Books
        [ResponseType(typeof(Book))]
        public async Task<IHttpActionResult> PostBook(NewBookDTO newBookDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Book book = new Book();

            //book.Id = 99;
            book.Title = newBookDTO.Title;
            book.Description = newBookDTO.Description;
            book.Price = newBookDTO.Price;
            book.Year = newBookDTO.Year;
            book.StockBalance = newBookDTO.StockBalance;
            book.ISBN = newBookDTO.ISBN;

            foreach(int aId in newBookDTO.AuthorIds)
            {
                Author author = await db.Authors.FindAsync(aId);
                if (author != null)
                {
                    book.Authors.Add(author);

                }
            }

            foreach (int gId in newBookDTO.GenreIds)
            {
                Genre genre = await db.Genres.FindAsync(gId);
                if (genre != null)
                {
                    book.Genres.Add(genre);

                }
            }

            db.Books.Add(book);
            await db.SaveChangesAsync();

            //return CreatedAtRoute("DefaultApi", new { id = book.Id }, book);
            return Ok();
        }

        // DELETE api/Books/5
        [ResponseType(typeof(Book))]
        public async Task<IHttpActionResult> DeleteBook(int id)
        {
            Book book = await db.Books.FindAsync(id);
            if (book == null)
            {
                return NotFound();
            }

            db.Books.Remove(book);
            await db.SaveChangesAsync();

            return Ok(book);
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